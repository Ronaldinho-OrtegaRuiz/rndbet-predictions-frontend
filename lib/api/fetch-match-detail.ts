import { headers } from "next/headers";
import type { FetchMatchDetailResult, MatchDetailApiResponse } from "./match-detail-types";
import { parseProblemDetails } from "./parse-problem-details";

function matchDetailSpringPath(
  competitionId: number,
  seasonId: number,
  round: number,
  matchId: number,
): string {
  return `/spring-api/v1/competitions/${competitionId}/seasons/${seasonId}/rounds/${round}/matches/${matchId}`;
}

/**
 * URL absoluta al mismo origen Next → `/spring-api/...` → rewrite a Spring (misma regla que el cliente).
 * Así no dependemos de que el proceso Node alcance `localhost:8080` aparte del `next dev`.
 */
async function matchDetailRequestUrl(
  competitionId: number,
  seasonId: number,
  round: number,
  matchId: number,
): Promise<string> {
  const path = matchDetailSpringPath(competitionId, seasonId, round, matchId);
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (host) {
    return `${proto}://${host}${path}`;
  }
  const port = process.env.PORT ?? "3000";
  return `http://127.0.0.1:${port}${path}`;
}

function isMatchDetailResponse(x: unknown): x is MatchDetailApiResponse {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  const idOk = typeof o.id === "number" || typeof o.id === "string";
  return (
    idOk &&
    typeof o.estado === "string" &&
    typeof o.equipo_local === "string" &&
    typeof o.equipo_visitante === "string"
  );
}

/**
 * Detalle de partido en Server Components / metadata: fetch vía proxy Next (`/spring-api` → `next.config` rewrites).
 */
export async function fetchMatchDetailFromBackend(
  competitionId: number,
  seasonId: number,
  round: number,
  matchId: number,
): Promise<FetchMatchDetailResult> {
  const url = await matchDetailRequestUrl(competitionId, seasonId, round, matchId);
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const problem = await parseProblemDetails(res);
    return { ok: false, status: res.status, problem };
  }

  const data: unknown = await res.json();
  if (!isMatchDetailResponse(data)) {
    return {
      ok: false,
      status: res.status,
      problem: { detail: "Respuesta inválida del servidor" },
    };
  }

  return { ok: true, data: data as MatchDetailApiResponse };
}
