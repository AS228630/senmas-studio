import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Preise — Senmas Studio",
  description: "Klare Pakete, transparente Preise, flexible Ratenzahlung.",
};

const PLANS = [
  {
    name: "Starter",
    price: "ab 890 €",
    tagline: "Für Einzelunternehmer und kleine Websites",
    features: [
      "Bis zu 5 Seiten",
      "Responsive Design (Mobil & Desktop)",
      "Kontaktformular",
      "Grundlegende SEO-Einrichtung",
      "1 Sprache",
    ],
  },
  {
    name: "Business",
    price: "ab 2.400 €",
    tagline: "Für wachsende Unternehmen",
    highlighted: true,
    features: [
      "Bis zu 15 Seiten",
      "Individuelles Design nach Ihrer Marke",
      "CMS für eigenständige Inhaltspflege",
      "Mehrsprachigkeit (bis zu 3 Sprachen)",
      "Erweiterte SEO-Optimierung",
      "Terminbuchung oder Formular-Automatisierung",
    ],
  },
  {
    name: "Individuell",
    price: "auf Anfrage",
    tagline: "Web-Apps, E-Commerce, KI-Integrationen",
    features: [
      "Vollständige Web-Anwendung",
      "Datenbank & Nutzerkonten",
      "Zahlungsintegration (Stripe, PayPal, Klarna)",
      "KI-Funktionen nach Bedarf",
      "Individuelle Architektur & Skalierung",
    ],
  },
];

export default function PreisePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1280px] px-6 py-16">
        <p className="text-xs font-bold tracking-[0.14em] text-red">PREISE</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-text sm:text-4xl">
          Klare Pakete, keine versteckten Kosten
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-muted">
          Sie wissen von Anfang an, womit Sie rechnen. Zahlung in Raten über 3, 5 oder 12 Monate möglich.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                plan.highlighted ? "border-red bg-card" : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-3 w-fit rounded-full bg-red-soft px-2.5 py-1 text-[10.5px] font-bold text-red">
                  BELIEBT
                </span>
              )}
              <h2 className="font-display text-lg font-bold text-text">{plan.name}</h2>
              <p className="mt-1 text-[13px] text-text-faint">{plan.tagline}</p>
              <p className="mt-4 font-display text-2xl font-extrabold text-text">{plan.price}</p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-text-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-red" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button href="/#kontakt" variant={plan.highlighted ? "primary" : "secondary"} className="mt-6">
                Kostenlos anfragen
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
          <PricingNote title="Ratenzahlung" desc="Flexibel über 3, 5 oder 12 Monate, ganz nach Ihren Möglichkeiten." />
          <PricingNote title="Feste Preise" desc="Der vereinbarte Preis ändert sich nicht während der Umsetzung." />
          <PricingNote title="Volle Rechteübertragung" desc="Nach der letzten Rate gehört die Website vollständig Ihnen." />
        </div>

        <p className="mt-6 text-[11.5px] text-text-faint">
          Alle Preise sind Nettopreise. Gem. § 19 UStG wird keine Umsatzsteuer ausgewiesen. Nur für B2B.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}

function PricingNote({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <p className="text-[13px] font-bold text-text">{title}</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-text-faint">{desc}</p>
    </div>
  );
}
