import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senmas Studio — Digitale Lösungen für Ihr Unternehmen",
  description:
    "Wir entwickeln moderne Webanwendungen, mobile Apps, KI-gestützte Systeme und Automatisierungen, die Prozesse optimieren und Wachstum fördern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
