import {
  RNDBET_ACCESS_COOKIE,
  RNDBET_ACCESS_TOKEN_KEY,
  RNDBET_EXPIRES_AT_MS_KEY,
  RNDBET_SESSION_READY_EVENT,
} from "./constants";

export function getClientAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(RNDBET_ACCESS_TOKEN_KEY);
}

export function getClientExpiresAtMs(): number | null {
  if (typeof window === "undefined") return null;
  const s = localStorage.getItem(RNDBET_EXPIRES_AT_MS_KEY);
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Token presente y no vencido según `rndbet_tokenExpiresAtMs`. */
export function isClientSessionValid(): boolean {
  const token = getClientAccessToken();
  if (!token?.trim()) return false;
  const exp = getClientExpiresAtMs();
  if (exp != null && Date.now() >= exp) return false;
  return true;
}

export function persistClientSession(
  accessToken: string,
  expiresInSeconds: number,
): void {
  if (typeof window === "undefined") return;
  const expiresAtMs = Date.now() + expiresInSeconds * 1000;
  localStorage.setItem(RNDBET_ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(RNDBET_EXPIRES_AT_MS_KEY, String(expiresAtMs));
  setAccessCookie(accessToken, expiresInSeconds);
  window.dispatchEvent(new CustomEvent(RNDBET_SESSION_READY_EVENT));
}

export function clearClientSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(RNDBET_ACCESS_TOKEN_KEY);
  localStorage.removeItem(RNDBET_EXPIRES_AT_MS_KEY);
  clearAccessCookie();
}

function setAccessCookie(token: string, maxAgeSeconds: number): void {
  const secure =
    typeof location !== "undefined" && location.protocol === "https:";
  const enc = encodeURIComponent(token);
  document.cookie = `${RNDBET_ACCESS_COOKIE}=${enc}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure ? "; Secure" : ""}`;
}

function clearAccessCookie(): void {
  document.cookie = `${RNDBET_ACCESS_COOKIE}=; Path=/; Max-Age=0`;
}
