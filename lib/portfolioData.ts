// Portfolio data for Senmas Studio.
//
// IMPORTANT — honesty principle (see PROJECT_GUIDE.md):
// Only projects that were actually built and are actually live/public
// belong in REAL_PROJECTS. Never add a project here that doesn't exist
// or wasn't really delivered — that would be portfolio fraud.
//
// FUTURE_ROADMAP is a working list of real projects planned for the
// future. They are built one at a time, for real, over time — not
// faked. Move an entry from FUTURE_ROADMAP to REAL_PROJECTS only once
// it actually exists and is live.

export type Project = {
  slug: string;
  name: string;
  industry: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
};

export const REAL_PROJECTS: Project[] = [
  {
    slug: "certcoach",
    name: "CertCoach",
    industry: "Bildung / E-Learning",
    description:
      "Lernplattform für internationale IT-Zertifizierungen (Microsoft, AWS, Google Cloud u.a.) mit echten Prüfungsfragen, Fortschrittsverfolgung, KI-Lernbegleiter und mehrsprachiger Oberfläche (9 Sprachen).",
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    liveUrl: "https://www.certcoach.de",
    githubUrl: "https://github.com/AS228630/certnova-app",
  },
  {
    slug: "outlet-moebel",
    name: "Outlet Möbel",
    industry: "E-Commerce / Einzelhandel",
    description:
      "Online-Shop für ein reales Möbel-Outlet-Unternehmen mit vollständigem Produktkatalog, Kategorieseiten, Warenkorb und einem auf Wettbewerbsniveau (Otto, XXXLutz, Höffner) ausgelegten Einkaufserlebnis.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    liveUrl: "https://outlet-moebel-shop.vercel.app",
    githubUrl: "https://github.com/AS228630/outlet-moebel-shop",
  },
];

// Roadmap of real projects to build over time, one at a time, covering
// the industries that most commonly need a professional website. Each
// one will be a genuinely built, working project — not a mockup.
export const FUTURE_ROADMAP: { industry: string; note: string }[] = [
  { industry: "Gastronomie", note: "Restaurant mit Online-Reservierung und Speisekarte" },
  { industry: "Gesundheit / Arztpraxis", note: "Praxis-Website mit Terminbuchung" },
  { industry: "Immobilien", note: "Maklerseite mit Objektsuche und Filterfunktion" },
  { industry: "Fitness / Gym", note: "Studio-Website mit Kursplan und Mitgliedschaft" },
  { industry: "Recht / Kanzlei", note: "Anwaltskanzlei mit Rechtsgebieten und Mandantenformular" },
  { industry: "Beauty / Friseursalon", note: "Salon-Website mit Online-Terminbuchung" },
  { industry: "Handwerk / Bauunternehmen", note: "Referenzprojekte, Angebotsanfrage" },
  { industry: "Fotografie", note: "Portfolio-lastige Website mit Galerien und Buchung" },
  { industry: "Beratung / Consulting", note: "Unternehmensberatung mit Leistungsübersicht" },
  { industry: "Verein / Non-Profit", note: "Vereins-Website mit Spendenfunktion und Terminen" },
];
