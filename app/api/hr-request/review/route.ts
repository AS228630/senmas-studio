import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdminAction, generateAccessToken, HR_SESSION_TTL_SECONDS } from "@/lib/hrAccess";
import { sendMagicLinkEmail } from "@/lib/hrEmail";

// Reached by clicking "Genehmigen" / "Ablehnen" in the owner's review
// email. The HMAC-signed token in the URL is the only credential — no
// admin login exists, by design, to keep this a zero-maintenance flow.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const verified = verifyAdminAction(token);

  if (!verified) {
    return htmlResponse("Dieser Link ist ungültig oder abgelaufen.", 400);
  }

  const db = supabaseAdmin();
  const { data: request, error: fetchError } = await db
    .from("hr_access_requests")
    .select("id, status, work_email, company")
    .eq("id", verified.requestId)
    .single();

  if (fetchError || !request) {
    return htmlResponse("Diese Anfrage wurde nicht gefunden.", 404);
  }

  if (request.status !== "pending") {
    return htmlResponse(`Diese Anfrage wurde bereits bearbeitet (Status: ${request.status}).`, 200);
  }

  if (verified.action === "deny") {
    await db.from("hr_access_requests").update({ status: "denied", reviewed_at: new Date().toISOString() }).eq("id", request.id);
    return htmlResponse(`Anfrage von ${request.company} wurde abgelehnt.`, 200);
  }

  // Approve: issue a one-time token, store only its hash, email the raw
  // token as a magic link to the requester.
  const { raw, hash } = generateAccessToken();
  const tokenExpiresAt = new Date(Date.now() + HR_SESSION_TTL_SECONDS * 1000).toISOString();

  const { error: updateError } = await db
    .from("hr_access_requests")
    .update({
      status: "approved",
      reviewed_at: new Date().toISOString(),
      access_token_hash: hash,
      token_expires_at: tokenExpiresAt,
    })
    .eq("id", request.id);

  if (updateError) {
    console.error("hr_access_requests approve update failed", updateError);
    return htmlResponse("Fehler beim Genehmigen der Anfrage.", 500);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const magicLinkUrl = `${appUrl}/hr/verify?token=${encodeURIComponent(raw)}`;

  try {
    await sendMagicLinkEmail(request.work_email, magicLinkUrl);
  } catch (e) {
    console.error("magic link email dispatch failed", e);
    return htmlResponse(
      `Anfrage genehmigt, aber die E-Mail an ${request.work_email} konnte nicht gesendet werden. Bitte prüfen Sie die Resend-Konfiguration.`,
      200
    );
  }

  return htmlResponse(`Anfrage von ${request.company} wurde genehmigt. Der Zugangslink wurde per E-Mail versendet.`, 200);
}

function htmlResponse(message: string, status: number) {
  return new NextResponse(
    `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Senmas Studio — HR-Zugriff</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body{background:#080f19;color:#e7eaef;font-family:system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px;}
        .card{max-width:420px;background:#131a24;border:1px solid #1d2733;border-radius:16px;padding:28px;text-align:center;}
      </style>
    </head><body><div class="card"><p>${escapeHtml(message)}</p></div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
