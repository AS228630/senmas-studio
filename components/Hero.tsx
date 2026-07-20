import { ArrowRight, Code2, Smartphone, Bot, Cloud } from "lucide-react";
import { Button } from "@/components/Button";

const SERVICES = [
  { icon: Code2, title: "Webentwicklung", desc: "Modern & Skalierbar" },
  { icon: Smartphone, title: "Mobile Apps", desc: "iOS & Android" },
  { icon: Bot, title: "KI & Automatisierung", desc: "Intelligente Lösungen" },
  { icon: Cloud, title: "Cloud-Lösungen", desc: "Sicher & Zuverlässig" },
];

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-14 lg:pb-20 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-red">WIR ENTWICKELN DIGITALE LÖSUNGEN</p>
            <h1 className="mt-4 font-display text-[2.75rem] font-extrabold leading-[1.08] text-text sm:text-5xl">
              Digitale Lösungen,
              <br />
              die Ihr Unternehmen{" "}
              <span className="text-red">voranbringen.</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-muted">
              Wir entwickeln moderne Webanwendungen, mobile Apps, KI-gestützte Systeme und
              Automatisierungen, die Prozesse optimieren und Wachstum fördern.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/#kontakt">
                Projekt anfragen <ArrowRight size={16} />
              </Button>
              <Button href="/#projekte" variant="secondary">
                Unsere Projekte ansehen
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {SERVICES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-soft text-red">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text">{title}</p>
                    <p className="text-[11.5px] text-text-faint">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-card to-bg p-10">
      <div className="w-full max-w-[360px] rounded-xl border border-border bg-bg-raised shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-red/60" />
          <span className="h-2 w-2 rounded-full bg-text-faint/40" />
          <span className="h-2 w-2 rounded-full bg-text-faint/40" />
        </div>
        <div className="space-y-3 p-4">
          <div className="h-3 w-2/3 rounded bg-border" />
          <div className="h-16 rounded-lg bg-card" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-10 rounded-lg bg-card" />
            <div className="h-10 rounded-lg bg-card" />
          </div>
        </div>
      </div>
    </div>
  );
}
