import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";

const NAV_ITEMS = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Preise", href: "/preise" },
  { label: "Über uns", href: "/#ueber-uns" },
  { label: "Kontakt", href: "/#kontakt" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/#kontakt" size="sm">
          Projekt anfragen
        </Button>
      </div>
    </header>
  );
}
