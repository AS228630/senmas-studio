import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifySession, HR_SESSION_COOKIE } from "@/lib/hrAccess";
import { HR_STORAGE_BUCKET, isValidCategory } from "@/lib/hrDocuments";

const SIGNED_URL_TTL_SECONDS = 5 * 60; // short-lived on purpose

export async function GET(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!isValidCategory(category)) {
    return NextResponse.json({ error: "Unbekannte Kategorie." }, { status: 400 });
  }

  // Re-validate the session on every single request — never trust a
  // cached "is authorized" flag from an earlier request.
  const cookieStore = await cookies();
  const session = verifySession(cookieStore.get(HR_SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Sitzung abgelaufen oder ungültig." }, { status: 401 });
  }

  const db = supabaseAdmin();

  // Confirm the underlying request is still approved (an owner could
  // revoke by flipping status after the session cookie was issued).
  const { data: request, error: reqError } = await db
    .from("hr_access_requests")
    .select("id, status")
    .eq("id", session.requestId)
    .single();

  if (reqError || !request || request.status !== "approved") {
    return NextResponse.json({ error: "Zugriff nicht mehr gültig." }, { status: 401 });
  }

  const { data: files, error: listError } = await db.storage
    .from(HR_STORAGE_BUCKET)
    .list(category, { limit: 100, sortBy: { column: "name", order: "asc" } });

  if (listError) {
    console.error("hr storage list failed", listError);
    return NextResponse.json({ error: "Dokumente konnten nicht geladen werden." }, { status: 500 });
  }

  const realFiles = (files ?? []).filter((f) => f.id !== null); // exclude folder placeholders

  const signed = await Promise.all(
    realFiles.map(async (f) => {
      const path = `${category}/${f.name}`;
      const { data, error } = await db.storage
        .from(HR_STORAGE_BUCKET)
        .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
      return { name: f.name, url: error ? null : data?.signedUrl ?? null };
    })
  );

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  await db.from("hr_document_access_log").insert({
    request_id: request.id,
    document_key: category,
    action: "view",
    ip,
  });

  return NextResponse.json({ files: signed.filter((f) => f.url) });
}
