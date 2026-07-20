import { Lock, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/Button";

export function HrAccessCallout() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-2xl border border-red/30 bg-red-soft p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red/15 text-red">
            <Lock size={16} />
          </div>
          <div>
            <p className="text-[13.5px] font-bold text-text">Vertrauliche HR-Dokumente</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-text-faint">
              Einige Dokumente enthalten personenbezogene Informationen.
              <br className="hidden sm:block" />
              Zugang nur für autorisierte Personalabteilungen.
            </p>
          </div>
        </div>
        <Button href="/mohammad/hr-zugang" className="shrink-0">
          Zugriff anfordern <ArrowRight size={14} />
        </Button>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-[11.5px] text-text-faint">
        <Info size={13} className="shrink-0" />
        Diese Seite ist ausschließlich über einen direkten Link erreichbar und dient der
        beruflichen Vorstellung gegenüber Unternehmen.
      </div>
    </div>
  );
}
