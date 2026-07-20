import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { HrAccessForm } from "@/components/HrAccessForm";
import { SecurityAssuranceCard } from "@/components/SecurityAssuranceCard";

export const metadata: Metadata = {
  title: "HR-Zugriff anfordern — Senmas Studio",
  robots: { index: false, follow: false, nocache: true },
};

export default function HrZugangPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 py-8 sm:px-5">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/mohammad" className="flex items-center gap-1.5 text-[12.5px] text-text-faint hover:text-text-muted">
          <ChevronLeft size={14} /> Zurück zum Profil
        </Link>
        <Logo size={26} />
      </div>

      <div className="space-y-4">
        <HrAccessForm />
        <SecurityAssuranceCard />
      </div>
    </main>
  );
}
