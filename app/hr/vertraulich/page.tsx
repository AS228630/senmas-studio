import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifySession, HR_SESSION_COOKIE } from "@/lib/hrAccess";
import { HR_CATEGORIES } from "@/lib/hrDocuments";
import { Logo } from "@/components/Logo";
import { VertraulichDocumentList } from "@/components/VertraulichDocumentList";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Vertrauliche HR-Dokumente — Senmas Studio",
  robots: { index: false, follow: false, nocache: true },
};

export default async function VertraulichPage() {
  const cookieStore = await cookies();
  const session = verifySession(cookieStore.get(HR_SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/mohammad/hr-zugang");
  }

  const db = supabaseAdmin();
  const { data: request } = await db
    .from("hr_access_requests")
    .select("company, status, token_expires_at")
    .eq("id", session.requestId)
    .single();

  if (!request || request.status !== "approved") {
    redirect("/mohammad/hr-zugang");
  }

  return (
    <main className="mx-auto max-w-[720px] px-4 py-8 sm:px-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-green/10 px-3 py-1.5 text-[11.5px] font-semibold text-green">
          <ShieldCheck size={13} /> Verifizierter Zugriff
        </div>
        <Logo size={26} />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs font-bold tracking-[0.14em] text-text-faint">HR BEREICH (NACH FREIGABE)</p>
        <h1 className="mt-2 font-display text-xl font-extrabold text-text">Vertrauliche HR-Dokumente</h1>
        <p className="mt-1.5 text-[12.5px] text-text-faint">
          Zugriff freigegeben für {request.company}. Dieser Bereich ist nur für autorisierte
          Personalabteilungen zugänglich — jede Ansicht und jeder Download wird protokolliert.
        </p>

        <div className="mt-5">
          <VertraulichDocumentList categories={HR_CATEGORIES} />
        </div>
      </div>
    </main>
  );
}
