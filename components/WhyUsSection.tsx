import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";

const REASONS = [
  "Erfahrenes Team",
  "Moderne Technologien",
  "Transparenter Prozess",
  "Pünktliche Lieferung",
  "Skalierbare Lösungen",
  "Langfristige Partnerschaft",
];

export function WhyUsSection() {
  return (
    <section id="kontakt" className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-10">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-red">FÜR UNTERNEHMEN</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
              Sie haben ein Projekt? Lassen Sie uns gemeinsam etwas Großartiges entwickeln.
            </p>
            <Button href="#kontakt-formular" variant="ghost" className="mt-4 px-0">
              Projekt anfragen →
            </Button>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.14em] text-text-muted">WARUM SENMAS STUDIO?</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {REASONS.map((r) => (
                <div key={r} className="flex items-center gap-2 text-[13px] text-text">
                  <CheckCircle2 size={15} className="shrink-0 text-red" />
                  {r}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden justify-self-end opacity-20 lg:block">
            <Logo withText={false} size={90} />
          </div>
        </div>
      </div>
    </section>
  );
}
