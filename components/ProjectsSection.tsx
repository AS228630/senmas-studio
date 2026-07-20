import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { REAL_PROJECTS } from "@/lib/portfolioData";

export function ProjectsSection() {
  return (
    <section id="projekte" className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-7 flex items-end justify-between">
          <h2 className="font-display text-2xl font-extrabold text-text sm:text-3xl">Ausgewählte Projekte</h2>
          <Link href="/projekte" className="flex items-center gap-1 text-sm font-semibold text-red hover:text-red-hover">
            Alle Projekte ansehen <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {REAL_PROJECTS.map((p) => (
            <a
              key={p.slug}
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors hover:border-text-faint"
            >
              <div className="flex items-start justify-between">
                <p className="text-[10.5px] font-semibold uppercase tracking-wide text-text-faint">{p.industry}</p>
                <ArrowUpRight size={15} className="text-text-faint transition-colors group-hover:text-red" />
              </div>
              <p className="mt-1.5 text-[15px] font-bold text-text">{p.name}</p>
              <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-text-faint">{p.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
