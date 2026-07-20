import { ProfileCard } from "@/components/ProfileCard";
import { PROFILE } from "@/lib/profileData";

export function AboutSection() {
  return (
    <ProfileCard title="Über mich">
      <p className="text-[13.5px] leading-relaxed text-text-muted">{PROFILE.about}</p>
    </ProfileCard>
  );
}
