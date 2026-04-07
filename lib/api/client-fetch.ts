import {
  clearClientSession,
  getClientAccessToken,
  getClientExpiresAtMs,
} from "@/lib/auth/client-session";
import { RNDBET_SESSION_ENDED_EVENT } from "@/lib/auth/constants";

function redirectToLogin(): void {
  if (typeof window === "undefined") return;
  const path = window.location.pathname + window.location.search;
  const qs =
    path !== "/login" && !path.startsWith("/login?")
      ? `?next=${encodeURIComponent(path)}`
      : "";
  window.location.assign(`/login${qs}`);
}

function onUnauthorizedOrForbidden(): void {
  if (typeof window === "undefined") return;
  clearClientSession();
  window.dispatchEvent(new CustomEvent(RNDBET_SESSION_ENDED_EVENT));
  redirectToLogin();
}

/**
 * Fetch en el navegador: Bearer desde localStorage, sin request si el token ya venció,
 * y en 401 o 403 limpia sesión + evento global + redirección a login.
 * (Varios backends usan 403 para JWT inválido / sin permiso en lugar de 401.)
 */
export function clientApiFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("clientApiFetch solo puede usarse en el navegador"),
    );
  }

  const exp = getClientExpiresAtMs();
  if (exp != null && Date.now() >= exp) {
    onUnauthorizedOrForbidden();
    return Promise.reject(new Error("Sesión vencida"));
  }

  const token = getClientAccessToken();
  const headers = new Headers(init?.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (
    !headers.has("Content-Type") &&
    init?.body != null &&
    typeof init.body === "string"
  ) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(input, {
    ...init,
    headers,
    cache: init?.cache ?? "no-store",
  }).then((res) => {
    if (res.status === 401 || res.status === 403) {
      onUnauthorizedOrForbidden();
    }
    return res;
  });
}
