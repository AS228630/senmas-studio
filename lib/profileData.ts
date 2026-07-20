// Central place for the profile's real content. Nothing here should ever be
// invented — every field is either the real data the project owner provided,
// or an honest placeholder clearly marked as such. See PROJECT_GUIDE.md.

export const PROFILE = {
  name: "Ataullah Senmas",
  role: "Software Engineer",
  location: "Berlin, Deutschland",
  experience: "5+ Jahre Erfahrung",
  tags: ["Full Stack", "Cloud", "KI", "Automatisierung"],
  about:
    "Erfahrener Software Engineer mit über 5 Jahren Erfahrung in der Entwicklung skalierbarer Webanwendungen, mobiler Apps, Automatisierungssysteme und KI-Lösungen. Leidenschaft für sauberen Code, Performance und moderne Architekturen.",
  links: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
};

export const SKILLS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "C#", ".NET", "Docker", "AWS", "Azure",
  "PostgreSQL", "MongoDB", "Redis", "Linux",
  "Git", "Tailwind CSS", "REST API", "GraphQL", "CI/CD",
];

export const EXPERIENCE = [
  {
    period: "2023 – Heute",
    title: "Software Engineer (Freelance)",
    desc: "Entwicklung von Webanwendungen, KI-Lösungen und Automatisierungssystemen.",
  },
  {
    period: "2021 – 2023",
    title: "Full Stack Developer",
    desc: "Entwicklung von Webanwendungen und Cloud-basierten Systemen.",
  },
  {
    period: "2020 – 2021",
    title: "IT Support Specialist",
    desc: "IT Support und Systemadministration.",
  },
];

export const PROJECTS = [
  { name: "E-Commerce Plattform" },
  { name: "Banking App" },
  { name: "KI Chat Assistant" },
  { name: "Business Dashboard" },
  { name: "Healthcare System" },
];

export const CERTIFICATES = [
  { name: "Microsoft AZ-104" },
  { name: "CompTIA Security+" },
  { name: "ITIL 4 Foundation" },
  { name: "Goethe Deutsch B2" },
];

export const LANGUAGES = [
  { name: "Deutsch", level: "B2", pct: 65 },
  { name: "Englisch", level: "C1", pct: 85 },
  { name: "Persisch", level: "Muttersprache", pct: 100 },
];

export const PUBLIC_DOCUMENTS = [
  { key: "cv", label: "Lebenslauf (PDF)", meta: "PDF" },
  { key: "portfolio", label: "Portfolio (PDF)", meta: "PDF" },
  { key: "reference", label: "Empfehlungsschreiben", meta: "PDF" },
];

// Sensitive documents are intentionally NOT listed here with files —
// only their category names and counts are public. The actual files live
// in a private Supabase Storage bucket and are only reachable through a
// signed URL issued after HR access has been approved.
export const HR_DOCUMENT_CATEGORIES = [
  { key: "identity", label: "Identitätsdokumente", count: 2 },
  { key: "education", label: "Bildungsnachweise", count: 3 },
  { key: "recognition", label: "Anerkennung Deutschland", count: 1 },
  { key: "references", label: "Arbeitszeugnisse", count: 3 },
  { key: "other", label: "Weitere Nachweise", count: 2 },
  { key: "certificates_full", label: "Zertifikate (Vollständig)", count: 8 },
];
