import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { signAdminAction } from "@/lib/hrAccess";
import { sendRequestReceivedEmail, sendOwnerReviewEmail } from "@/lib/hrEmail";

const REASONS = ["recruitment", "document_check", "interview", "other"] as const;
const ADMIN_ACTION_TTL_MS = 48 * 60 * 60 * 1000; // 48h to approve/deny

// Basic in-memory rate limit per IP (best-effort; resets on redeploy).
// Good enough to blunt naive spam without adding infrastructure.
const recentSubmissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  recentSubmissions.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { company, contactName, workEmail, reason } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof company !== "string" || !company.trim() ||
    typeof contactName !== "string" || !contactName.trim() ||
    typeof workEmail !== "string" || !isValidEmail(workEmail) ||
    typeof reason !== "string" || !REASONS.includes(reason as (typeof REASONS)[number])
  ) {
    return NextResponse.json({ error: "Bitte füllen Sie alle Felder korrekt aus." }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("hr_access_requests")
    .insert({
      company: company.trim(),
      contact_name: contactName.trim(),
      work_email: workEmail.trim().toLowerCase(),
      reason,
      request_ip: ip,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("hr_access_requests insert failed", error);
    return NextResponse.json({ error: "Anfrage konnte nicht gespeichert werden." }, { status: 500 });
  }

  const requestId = data.id as string;
  const expiresAt = Date.now() + ADMIN_ACTION_TTL_MS;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const ownerEmail = process.env.HR_OWNER_EMAIL;

  if (ownerEmail) {
    const approveToken = signAdminAction(requestId, "approve", expiresAt);
    const denyToken = signAdminAction(requestId, "deny", expiresAt);
    try {
      await sendOwnerReviewEmail({
        ownerEmail,
        requestId,
        company: company.trim(),
        contactName: contactName.trim(),
        workEmail: workEmail.trim(),
        reason,
        approveUrl: `${appUrl}/api/hr-request/review?token=${encodeURIComponent(approveToken)}`,
        denyUrl: `${appUrl}/api/hr-request/review?token=${encodeURIComponent(denyToken)}`,
      });
      await sendRequestReceivedEmail(workEmail.trim(), company.trim());
    } catch (e) {
      // The request is safely stored either way — email delivery failure
      // must not be reported to the client as a hard error, but we do log
      // it so the owner can notice and approve manually if needed.
      console.error("hr-request email dispatch failed", e);
    }
  } else {
    console.warn("HR_OWNER_EMAIL not set — owner review email was not sent.");
  }

  return NextResponse.json({ ok: true });
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
