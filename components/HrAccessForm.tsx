"use client";

import { useState } from "react";
import { Lock, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";

const REASONS = [
  { value: "recruitment", label: "Rekrutierungsprozess" },
  { value: "document_check", label: "Dokumentenprüfung" },
  { value: "interview", label: "Vorstellungsgespräch" },
  { value: "other", label: "Sonstiges" },
] as const;

export function HrAccessForm() {
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [reason, setReason] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!company.trim() || !contactName.trim() || !workEmail.trim() || !reason) {
      setStatus("error");
      setErrorMsg("Bitte füllen Sie alle Felder aus.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/hr-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, contactName, workEmail, reason }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Anfrage fehlgeschlagen.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-green">
          <CheckCircle2 size={22} />
        </div>
        <p className="text-[15px] font-bold text-text">Anfrage gesendet</p>
        <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-text-faint">
          Wir prüfen Ihre Anfrage. Bei Genehmigung erhalten Sie einen sicheren Zugangslink per E-Mail
          an {workEmail}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-1 flex items-center gap-2 text-[13px] font-bold tracking-wide text-text">
        <Lock size={14} className="text-red" />
        ZUGRIFF ANFORDERN
      </div>
      <p className="mb-5 text-[12.5px] leading-relaxed text-text-faint">
        Bitte füllen Sie das Formular aus, um Zugriff auf vertrauliche Dokumente zu beantragen.
      </p>

      <div className="space-y-4">
        <Field label="Unternehmen">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Ihr Unternehmen"
            className="input"
            required
          />
        </Field>
        <Field label="Ihr Name">
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Ihr vollständiger Name"
            className="input"
            required
          />
        </Field>
        <Field label="Geschäftliche E-Mail">
          <input
            type="email"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            placeholder="ihre.email@unternehmen.com"
            className="input"
            required
          />
        </Field>
        <Field label="Grund der Anfrage">
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input appearance-none"
            required
          >
            <option value="" disabled>
              Zweck auswählen
            </option>
            {REASONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {status === "error" && <p className="mt-3 text-[12.5px] font-medium text-red">{errorMsg}</p>}

      <Button type="submit" disabled={status === "submitting"} className="mt-5 w-full">
        <Send size={14} />
        {status === "submitting" ? "Wird gesendet…" : "Anfrage senden"}
      </Button>

      <div className="mt-4 flex items-start gap-2 text-[11.5px] leading-relaxed text-text-faint">
        <ShieldCheck size={14} className="mt-0.5 shrink-0" />
        Wir prüfen Ihre Anfrage und senden Ihnen bei Genehmigung einen sicheren Zugang per E-Mail.
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold text-text-muted">{label}</span>
      {children}
    </label>
  );
}
