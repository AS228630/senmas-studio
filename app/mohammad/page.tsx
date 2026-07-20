import type { Metadata } from "next";
import { ProfileTopBar } from "@/components/ProfileTopBar";
import { ProfileHeader } from "@/components/ProfileHeader";
import { AboutSection } from "@/components/profile/AboutSection";
import { SkillsAndExperienceSection } from "@/components/profile/SkillsAndExperienceSection";
import { ProfileProjectsSection } from "@/components/profile/ProfileProjectsSection";
import { CertificatesAndLanguagesSection } from "@/components/profile/CertificatesAndLanguagesSection";
import { PublicDocumentsSection } from "@/components/profile/PublicDocumentsSection";
import { HrAccessCallout } from "@/components/profile/HrAccessCallout";

// This page must never be indexed by search engines or linked from the
// public site (see PROJECT_GUIDE.md — "no hidden links" principle).
// It is reachable exclusively via its direct URL.
export const metadata: Metadata = {
  title: "Ataullah Senmas — Software Engineer | Senmas Studio",
  robots: { index: false, follow: false, nocache: true },
};

export default function ProfilePage() {
  return (
    <>
      <ProfileTopBar />
      <main className="mx-auto max-w-[900px] space-y-4 px-4 py-6 sm:px-5">
        <ProfileHeader />
        <AboutSection />
        <SkillsAndExperienceSection />
        <ProfileProjectsSection />
        <CertificatesAndLanguagesSection />
        <PublicDocumentsSection />
        <HrAccessCallout />
      </main>
    </>
  );
}
