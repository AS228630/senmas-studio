import { Download, FileText } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { PUBLIC_DOCUMENTS } from "@/lib/profileData";

export function PublicDocumentsSection() {
  return (
    <ProfileCard title="Öffentliche Dokumente">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {PUBLIC_DOCUMENTS.map((d) => (
          <button
            key={d.key}
            className="flex items-center gap-2.5 rounded-lg border border-border p-3 text-left transition-colors hover:border-text-faint focus-ring"
          >
            <FileText size={16} className="shrink-0 text-text-faint" />
            <span className="flex-1 text-[12px] font-semibold text-text-muted">
              {d.label}
              <span className="mt-0.5 block text-[10.5px] font-normal text-text-faint">{d.meta}</span>
            </span>
            <Download size={14} className="shrink-0 text-text-faint" />
          </button>
        ))}
      </div>
    </ProfileCard>
  );
}
