"use client";

import { useState } from "react";
import { Folder, ChevronDown, Download, Loader2, FileWarning } from "lucide-react";

type Category = { key: string; label: string };
type SignedFile = { name: string; url: string };

export function VertraulichDocumentList({ categories }: { categories: readonly Category[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [filesByCategory, setFilesByCategory] = useState<Record<string, SignedFile[]>>({});
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function toggle(key: string) {
    if (openKey === key) {
      setOpenKey(null);
      return;
    }
    setOpenKey(key);
    setErrorKey(null);

    if (filesByCategory[key]) return; // already fetched this session

    setLoadingKey(key);
    try {
      const res = await fetch(`/api/hr-documents/${key}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFilesByCategory((prev) => ({ ...prev, [key]: data.files ?? [] }));
    } catch {
      setErrorKey(key);
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <div className="space-y-2">
      {categories.map((c) => {
        const isOpen = openKey === c.key;
        const files = filesByCategory[c.key];
        return (
          <div key={c.key} className="overflow-hidden rounded-xl border border-border">
            <button
              onClick={() => toggle(c.key)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-bg-raised focus-ring"
            >
              <span className="flex items-center gap-2.5 text-[13px] font-semibold text-text">
                <Folder size={15} className="text-red" />
                {c.label}
              </span>
              <ChevronDown size={15} className={`text-text-faint transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="border-t border-border bg-bg-raised px-4 py-3">
                {loadingKey === c.key && (
                  <div className="flex items-center gap-2 text-[12px] text-text-faint">
                    <Loader2 size={13} className="animate-spin" /> Dokumente werden geladen…
                  </div>
                )}
                {errorKey === c.key && (
                  <div className="flex items-center gap-2 text-[12px] text-red">
                    <FileWarning size={13} /> Dokumente konnten nicht geladen werden. Ihre Sitzung ist
                    möglicherweise abgelaufen.
                  </div>
                )}
                {files && files.length === 0 && (
                  <p className="text-[12px] text-text-faint">Noch keine Dokumente in dieser Kategorie hochgeladen.</p>
                )}
                {files && files.length > 0 && (
                  <ul className="space-y-1.5">
                    {files.map((f) => (
                      <li key={f.name}>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-[12.5px] text-text-muted transition-colors hover:bg-card"
                        >
                          {f.name}
                          <Download size={13} className="shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
