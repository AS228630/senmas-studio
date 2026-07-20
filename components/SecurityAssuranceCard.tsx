import { CheckCircle2, ShieldCheck } from "lucide-react";

const POINTS = [
  "Einmaliger, zeitlich begrenzter Zugriff (7 Tage)",
  "Zugriff nur nach Genehmigung",
  "E-Mail-Verifizierung",
  "Daten und Downloads protokolliert",
  "Höchste Sicherheitsstandards",
];

export function SecurityAssuranceCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="mb-4 text-[13px] font-bold tracking-wide text-text">SICHERHEIT</p>
      <ul className="space-y-2.5">
        {POINTS.map((p) => (
          <li key={p} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-text-muted">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red/30 bg-red-soft text-red">
          <ShieldCheck size={26} />
        </div>
      </div>
    </div>
  );
}
