import { MapPin, Clock3, Download } from "lucide-react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { PROFILE } from "@/lib/profileData";

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 8.5h3v11h-3v-11zM6 3.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10 8.5h2.9v1.5h.04c.4-.76 1.4-1.56 2.9-1.56 3.1 0 3.66 2 3.66 4.68v6.38h-3v-5.66c0-1.35-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.76h-3v-11z" />
    </svg>
  );
}

export function ProfileHeader() {
  const initials = PROFILE.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          {/* Real photo goes here — placeholder initials avatar until the
              owner provides one, per the "no fake data" project rule. */}
          <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red/25 to-bg-raised font-display text-xl font-extrabold text-text">
            {initials}
          </div>
          <div>
            <h1 className="font-display text-xl font-extrabold text-text sm:text-2xl">{PROFILE.name}</h1>
            <p className="mt-0.5 text-sm font-semibold text-red">{PROFILE.role}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-text-faint">
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {PROFILE.location}
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1">
                <Clock3 size={12} /> {PROFILE.experience}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-1.5 text-[10px] text-text-faint sm:flex">
          Powered by <Logo size={16} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PROFILE.tags.map((t) => (
          <span key={t} className="rounded-full border border-border px-3 py-1 text-[11.5px] font-medium text-text-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <Button size="sm">
          <Download size={14} /> CV herunterladen
        </Button>
        <Button size="sm" variant="secondary" href={PROFILE.links.github}>
          <GithubIcon /> GitHub
        </Button>
        <Button size="sm" variant="secondary" href={PROFILE.links.linkedin}>
          <LinkedinIcon /> LinkedIn
        </Button>
      </div>
    </div>
  );
}
