import "server-only";
import { Resend } from "resend";

function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set.");
  return new Resend(key);
}

function fromAddress() {
  // Must be a verified sender/domain in the Resend dashboard.
  return process.env.HR_EMAIL_FROM ?? "Senmas Studio <hr@senmas.studio>";
}

export async function sendRequestReceivedEmail(to: string, company: string) {
  await client().emails.send({
    from: fromAddress(),
    to,
    subject: "Ihre Anfrage wurde empfangen — Senmas Studio",
    html: `
      <p>Hallo,</p>
      <p>vielen Dank für Ihre Anfrage im Namen von <strong>${escapeHtml(company)}</strong> zum Zugriff auf
      vertrauliche HR-Dokumente von Ataullah Senmas.</p>
      <p>Ihre Anfrage wird geprüft. Sobald sie genehmigt wurde, erhalten Sie einen sicheren,
      einmalig gültigen Zugangslink per E-Mail. Der Zugang ist danach 7 Tage lang gültig.</p>
      <p>Mit freundlichen Grüßen<br/>Senmas Studio</p>
    `,
  });
}

export async function sendOwnerReviewEmail(params: {
  ownerEmail: string;
  requestId: string;
  company: string;
  contactName: string;
  workEmail: string;
  reason: string;
  approveUrl: string;
  denyUrl: string;
}) {
  const { ownerEmail, company, contactName, workEmail, reason, approveUrl, denyUrl } = params;
  await client().emails.send({
    from: fromAddress(),
    to: ownerEmail,
    subject: `Neue HR-Zugriffsanfrage von ${company}`,
    html: `
      <p>Neue Anfrage für den Zugriff auf vertrauliche HR-Dokumente:</p>
      <ul>
        <li><strong>Unternehmen:</strong> ${escapeHtml(company)}</li>
        <li><strong>Name:</strong> ${escapeHtml(contactName)}</li>
        <li><strong>E-Mail:</strong> ${escapeHtml(workEmail)}</li>
        <li><strong>Grund:</strong> ${escapeHtml(reason)}</li>
      </ul>
      <p>
        <a href="${approveUrl}" style="background:#C41D20;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;">Genehmigen</a>
        &nbsp;&nbsp;
        <a href="${denyUrl}" style="color:#8b93a1;text-decoration:underline;">Ablehnen</a>
      </p>
      <p style="color:#8b93a1;font-size:12px;">Dieser Link ist 48 Stunden gültig.</p>
    `,
  });
}

export async function sendMagicLinkEmail(to: string, magicLinkUrl: string) {
  await client().emails.send({
    from: fromAddress(),
    to,
    subject: "Ihr sicherer Zugang zu den vertraulichen Dokumenten",
    html: `
      <p>Hallo,</p>
      <p>Ihre Anfrage wurde genehmigt. Klicken Sie auf den folgenden Link, um auf die
      vertraulichen HR-Dokumente zuzugreifen:</p>
      <p><a href="${magicLinkUrl}" style="background:#C41D20;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;">Zugang öffnen</a></p>
      <p style="color:#8b93a1;font-size:12px;">
        Dieser Link ist einmalig gültig und läuft nach 7 Tagen automatisch ab.
        Bitte leiten Sie ihn nicht weiter.
      </p>
      <p>Mit freundlichen Grüßen<br/>Senmas Studio</p>
    `,
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
