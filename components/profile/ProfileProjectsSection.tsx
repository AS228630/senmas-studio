import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProfileCard } from "@/components/ProfileCard";
import { PROJECTS } from "@/lib/profileData";

export function ProfileProjectsSection() {
  return (
    <ProfileCard
      title="Projekte"
      action={
        <Link href="/#projekte" className="flex items-center gap-1 text-[12px] font-semibold text-red">
          Alle Projekte ansehen <ArrowRight size={12} />
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {PROJECTS.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-lg border border-border">
            <div className="flex h-16 items-center justify-center bg-gradient-to-br from-bg-raised to-bg" />
            <p className="p-2 text-center text-[10.5px] font-semibold leading-tight text-text-muted">{p.name}</p>
          </div>
        ))}
      </div>
    </ProfileCard>
  );
}
