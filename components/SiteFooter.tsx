import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

// SECURITY / PRIVACY PRINCIPLE — do not change without re-reading PROJECT_GUIDE.md:
// This public footer must never link to the professional profile (/mohammad) or
// any HR/recruitment-related page. The public site only presents the Senmas
// Studio brand. The profile is reachable exclusively via its direct URL.

const LEISTUNGEN = ["Webentwicklung", "Mobile Apps", "KI & Automatisierung", "Cloud-Lösungen"];
const UNTERNEHMEN = ["Über uns", "Unsere Projekte", "Prozess", "Kontakt"];

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-text-faint">
              Digitale Lösungen. Echter Mehrwert.
            </p>
            <p className="mt-4 text-[11.5px] text-text-faint">
              © {new Date().getFullYear()} Senmas Studio.
              <br />
              Alle Rechte vorbehalten.
            </p>
          </div>

          <FooterCol title="Leistungen" items={LEISTUNGEN} />
          <FooterCol title="Unternehmen" items={UNTERNEHMEN} />

          <div>
            <p className="mb-3 text-[13px] font-bold text-text">Kontakt</p>
            <ul className="space-y-2 text-[13px] text-text-faint">
              <li className="flex items-center gap-2">
                <Mail size={13} /> hallo@senmas.studio
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} /> +49 152 12345678
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={13} /> Berlin, Deutschland
              </li>
            </ul>
            <div className="mt-4 flex gap-2.5">
              <SocialIcon label="LinkedIn">
                <path d="M4.5 8.5h3v11h-3v-11zM6 3.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10 8.5h2.9v1.5h.04c.4-.76 1.4-1.56 2.9-1.56 3.1 0 3.66 2 3.66 4.68v6.38h-3v-5.66c0-1.35-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.76h-3v-11z" />
              </SocialIcon>
              <SocialIcon label="GitHub">
                <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
              </SocialIcon>
              <SocialIcon label="Instagram">
                <path d="M12 2.2c2.7 0 3 0 4.1.06 1.05.05 1.6.22 2 .37.5.2.85.42 1.22.8.38.37.6.72.8 1.22.15.4.32.95.37 2 .05 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.05-.22 1.6-.37 2-.2.5-.42.85-.8 1.22-.37.38-.72.6-1.22.8-.4.15-.95.32-2 .37-1.1.05-1.4.06-4.1.06s-3 0-4.1-.06c-1.05-.05-1.6-.22-2-.37a3.3 3.3 0 0 1-1.22-.8 3.3 3.3 0 0 1-.8-1.22c-.15-.4-.32-.95-.37-2C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1.05.22-1.6.37-2 .2-.5.42-.85.8-1.22.37-.38.72-.6 1.22-.8.4-.15.95-.32 2-.37C7.8 3.4 8.1 3.4 8.1 3.4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0z" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      {/* Honest, visible confirmation of the no-hidden-links principle — mirrors the mockup */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 text-[11.5px] text-text-faint">
          <span>Keine versteckten Links.</span>
          <span>Kein Hinweis auf Jobs.</span>
          <span>Kein Profil im Menü oder Footer.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-3 text-[13px] font-bold text-text">{title}</p>
      <ul className="space-y-2 text-[13px] text-text-faint">
        {items.map((i) => (
          <li key={i} className="cursor-pointer hover:text-text-muted">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-faint transition-colors hover:border-text-faint hover:text-text"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        {children}
      </svg>
    </div>
  );
}
