import { ArrowRight } from "lucide-react";

const PROJECTS = [
  { name: "E-Commerce Plattform", tag: "E-Commerce", desc: "Moderne Online-Plattform mit Zahlungssystem, Admin Panel und Analytics." },
  { name: "Banking App", tag: "FinTech", desc: "Sichere mobile Banking-App für iOS und Android mit biometrischer Authentifizierung." },
  { name: "KI Chat Assistant", tag: "KI", desc: "KI-gestützter Assistent für Unternehmen, integriert mit OpenAI API." },
  { name: "Business Dashboard", tag: "Dashboard", desc: "Echtzeit-Dashboard für KPIs, Analysen und Berichte mit interaktiven Visualisierungen." },
  { name: "Healthcare System", tag: "Healthcare", desc: "Patientenmanagement, Terminplanung und sichere Datenverwaltung." },
];

export function ProjectsSection() {
  return (
    <section id="projekte" className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-7 flex items-end justify-between">
          <h2 className="font-display text-2xl font-extrabold text-text sm:text-3xl">Ausgewählte Projekte</h2>
          <a href="#" className="flex items-center gap-1 text-sm font-semibold text-red hover:text-red-hover">
            Alle Projekte ansehen <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {PROJECTS.map((p) => (
            <div key={p.name} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-text-faint">
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-bg-raised to-bg text-[10px] font-semibold uppercase tracking-wide text-text-faint">
                {p.tag}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3.5">
                <p className="text-[13px] font-bold text-text">{p.name}</p>
                <p className="line-clamp-2 flex-1 text-[11.5px] leading-relaxed text-text-faint">{p.desc}</p>
                <a href="#" className="flex items-center gap-1 text-[11.5px] font-semibold text-red">
                  Mehr ansehen <ArrowRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
