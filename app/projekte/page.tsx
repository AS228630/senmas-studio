import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { REAL_PROJECTS } from "@/lib/portfolioData";

export const metadata: Metadata = {
  title: "Projekte — Senmas Studio",
  description: "Echte Projekte, die wir für echte Anforderungen gebaut haben.",
};

export default function ProjektePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1280px] px-6 py-16">
        <p className="text-xs font-bold tracking-[0.14em] text-red">UNSERE ARBEIT</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-text sm:text-4xl">Projekte</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-muted">
          Jedes Projekt hier ist real, live und öffentlich einsehbar — inklusive Quellcode.
          Kein Mockup, keine Demo-Daten.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {REAL_PROJECTS.map((p) => (
            <div
              key={p.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-text-faint"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">{p.industry}</p>
                  <h2 className="mt-1 font-display text-xl font-bold text-text">{p.name}</h2>
                </div>
                <ArrowUpRight size={18} className="shrink-0 text-text-faint transition-colors group-hover:text-red" />
              </div>

              <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-text-muted">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md bg-input px-2 py-1 text-[11px] font-medium text-text-faint">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-[12px] font-semibold">
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-red hover:text-red-hover">
                  Live ansehen ↗
                </a>
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text">
                  Quellcode ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-text-muted">
            Weitere Projekte entstehen laufend — jedes davon real und live, sobald fertig.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
