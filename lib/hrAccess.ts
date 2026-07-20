import "server-only";
import { randomBytes, createHash, createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE = "hr_session";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days, matches the "Einmalig, zeitlich begrenzter Zugriff (7 Tage)" promise shown in the UI

// ── One-time access tokens (emailed as the Magic Link) ────────────────
// The raw token is only ever held in memory long enough to email it and
// put it in a redirect URL. The database only ever stores its hash.
export function generateAccessToken() {
  const raw = randomBytes(32).toString("base64url");
  return { raw, hash: hashToken(raw) };
}

export function hashToken(raw: string) {
  return createHash("sha256").update(raw).digest("hex");
}

// ── Admin action links (approve/deny buttons in the owner's email) ────
// HMAC-signed so the owner's approve/deny links can't be forged or
// replayed for a different request, without needing an admin login UI.
function adminSecret() {
  const secret = process.env.HR_ADMIN_ACTION_SECRET;
  if (!secret) throw new Error("HR_ADMIN_ACTION_SECRET is not set.");
  return secret;
}

export function signAdminAction(requestId: string, action: "approve" | "deny", expiresAt: number) {
  const payload = `admin_action:${requestId}.${action}.${expiresAt}`;
  const sig = createHmac("sha256", adminSecret()).update(payload).digest("hex");
  return `${requestId}.${action}.${expiresAt}.${sig}`;
}

export function verifyAdminAction(token: string): { requestId: string; action: "approve" | "deny" } | null {
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [requestId, action, expiresAtStr, sig] = parts;
  if (action !== "approve" && action !== "deny") return null;

  const payload = `admin_action:${requestId}.${action}.${expiresAtStr}`;
  const expected = createHmac("sha256", adminSecret()).update(payload).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

  return { requestId, action };
}

// ── Session cookie (issued after a valid magic link is redeemed) ──────
export const HR_SESSION_COOKIE = SESSION_COOKIE;
export const HR_SESSION_TTL_SECONDS = SESSION_TTL_SECONDS;

export function signSession(requestId: string, expiresAt: number) {
  const payload = `session:${requestId}.${expiresAt}`;
  const sig = createHmac("sha256", adminSecret()).update(payload).digest("hex");
  return `${requestId}.${expiresAt}.${sig}`;
}

export function verifySession(cookieValue: string | undefined): { requestId: string } | null {
  if (!cookieValue) return null;
  const parts = cookieValue.split(".");
  if (parts.length !== 3) return null;
  const [requestId, expiresAtStr, sig] = parts;

  const payload = `session:${requestId}.${expiresAtStr}`;
  const expected = createHmac("sha256", adminSecret()).update(payload).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

  return { requestId };
}
