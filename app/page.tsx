import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { WhyUsSection } from "@/components/WhyUsSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProjectsSection />
        <WhyUsSection />
      </main>
      <SiteFooter />
    </>
  );
}
