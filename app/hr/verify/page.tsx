import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { hashToken, signSession, HR_SESSION_COOKIE, HR_SESSION_TTL_SECONDS } from "@/lib/hrAccess";

export const metadata = { robots: { index: false, follow: false } };

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <Message text="Ungültiger Zugangslink." />;
  }

  const db = supabaseAdmin();
  const hash = hashToken(token);

  const { data: request, error } = await db
    .from("hr_access_requests")
    .select("id, status, token_expires_at, token_used_at")
    .eq("access_token_hash", hash)
    .single();

  if (error || !request) {
    return <Message text="Dieser Zugangslink ist ungültig." />;
  }

  if (request.status !== "approved") {
    return <Message text="Dieser Zugang ist nicht mehr aktiv." />;
  }

  if (request.token_used_at) {
    return <Message text="Dieser Link wurde bereits verwendet. Jeder Zugangslink ist nur einmal gültig." />;
  }

  if (request.token_expires_at && new Date(request.token_expires_at) < new Date()) {
    return <Message text="Dieser Zugangslink ist abgelaufen." />;
  }

  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Single-use: mark the token as redeemed the moment it's validated,
  // before revealing any content.
  const now = new Date();
  await db
    .from("hr_access_requests")
    .update({ token_used_at: now.toISOString(), access_ip: ip })
    .eq("id", request.id);

  const expiresAt = now.getTime() + HR_SESSION_TTL_SECONDS * 1000;
  const sessionValue = signSession(request.id, expiresAt);

  const cookieStore = await cookies();
  cookieStore.set(HR_SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: HR_SESSION_TTL_SECONDS,
    path: "/",
  });

  redirect("/hr/vertraulich");
}

function Message({ text }: { text: string }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-sm rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-[13.5px] leading-relaxed text-text-muted">{text}</p>
      </div>
    </main>
  );
}
