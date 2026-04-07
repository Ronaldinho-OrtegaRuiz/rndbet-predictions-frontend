const LOGIN_PATH = "/spring-api/v1/auth/login";

export type LoginResult =
  | { ok: true; accessToken: string; expiresIn: number }
  | { ok: false; status: number; message: string };

function isLoginPayload(x: unknown): x is {
  accessToken: string;
  expiresIn: number;
  tokenType?: string;
} {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.accessToken === "string" &&
    typeof o.expiresIn === "number" &&
    Number.isFinite(o.expiresIn)
  );
}

/**
 * POST /api/v1/auth/login vía proxy Next (`/spring-api`).
 * No guarda nada: quien llama debe usar `persistClientSession` si ok.
 */
export async function requestLogin(
  username: string,
  password: string,
): Promise<LoginResult> {
  const res = await fetch(LOGIN_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    let message = "No se pudo iniciar sesión";
    try {
      const text = await res.text();
      const j: unknown = JSON.parse(text);
      if (j && typeof j === "object") {
        const o = j as Record<string, unknown>;
        const d = o.detail ?? o.message ?? o.title;
        if (typeof d === "string" && d.trim()) message = d;
      }
    } catch {
      /* ignore */
    }
    return { ok: false, status: res.status, message };
  }

  const data: unknown = await res.json();
  if (!isLoginPayload(data)) {
    return { ok: false, status: res.status, message: "Respuesta inválida" };
  }

  return {
    ok: true,
    accessToken: data.accessToken,
    expiresIn: data.expiresIn,
  };
}
