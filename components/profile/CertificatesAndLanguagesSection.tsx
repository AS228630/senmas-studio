import { ArrowRight, Award } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { CERTIFICATES, LANGUAGES } from "@/lib/profileData";

export function CertificatesAndLanguagesSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ProfileCard
        title="Zertifikate (Öffentlich)"
        action={
          <a href="#" className="flex items-center gap-1 text-[12px] font-semibold text-red">
            Alle Zertifikate ansehen <ArrowRight size={12} />
          </a>
        }
      >
        <div className="grid grid-cols-2 gap-2.5">
          {CERTIFICATES.map((c) => (
            <div key={c.name} className="flex items-center gap-2 rounded-lg border border-border p-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-input text-red">
                <Award size={14} />
              </div>
              <p className="text-[11px] font-semibold leading-tight text-text-muted">{c.name}</p>
            </div>
          ))}
        </div>
      </ProfileCard>

      <ProfileCard title="Sprachen">
        <div className="space-y-3.5">
          {LANGUAGES.map((l) => (
            <div key={l.name}>
              <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                <span className="font-semibold text-text">{l.name}</span>
                <span className="text-text-faint">{l.level}</span>
              </div>
              <div className="h-1.5 rounded-full bg-input">
                <div className="h-full rounded-full bg-red" style={{ width: `${l.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </ProfileCard>
    </div>
  );
}
