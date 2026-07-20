import { ProfileCard } from "@/components/ProfileCard";
import { SKILLS, EXPERIENCE } from "@/lib/profileData";

export function SkillsAndExperienceSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ProfileCard title="Fähigkeiten">
        <div className="flex flex-wrap gap-1.5">
          {SKILLS.map((s) => (
            <span key={s} className="rounded-md bg-input px-2.5 py-1 text-[11.5px] font-medium text-text-muted">
              {s}
            </span>
          ))}
        </div>
      </ProfileCard>

      <ProfileCard title="Berufserfahrung">
        <ol className="space-y-4">
          {EXPERIENCE.map((e) => (
            <li key={e.title} className="relative border-l-2 border-red pl-3.5">
              <p className="text-[11.5px] font-semibold text-red">{e.period}</p>
              <p className="mt-0.5 text-[13px] font-bold text-text">{e.title}</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-text-faint">{e.desc}</p>
            </li>
          ))}
        </ol>
      </ProfileCard>
    </div>
  );
}
