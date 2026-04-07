import type { PartidoApi, RoundMatchesResponse } from "./matches-types";
import type { ProblemDetails } from "./standings-types";
import { clientApiFetch } from "./client-fetch";
import { parseProblemDetails } from "./parse-problem-details";

function currentRoundPath(competitionId: number, seasonId: number): string {
  return `/spring-api/v1/competitions/${competitionId}/seasons/${seasonId}/rounds/current/matches`;
}

function roundPath(
  competitionId: number,
  seasonId: number,
  round: number,
): string {
  return `/spring-api/v1/competitions/${competitionId}/seasons/${seasonId}/rounds/${round}/matches`;
}

function isPartidoApi(x: unknown): x is PartidoApi {
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

function normalizeRoundMatchesBody(data: unknown): RoundMatchesResponse | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const raw = o.partidos;
  const partidos: PartidoApi[] = Array.isArray(raw)
    ? raw.filter(isPartidoApi)
    : [];

  const jornada =
    typeof o.jornada === "number" && Number.isFinite(o.jornada)
      ? o.jornada
      : undefined;
  const temporada_completada =
    typeof o.temporada_completada === "boolean"
      ? o.temporada_completada
      : undefined;

  return { jornada, temporada_completada, partidos };
}

export type FetchRoundMatchesResult =
  | { ok: true; data: RoundMatchesResponse }
  | { ok: false; status: number; problem?: ProblemDetails };

export async function fetchCurrentRoundMatches(
  competitionId: number,
  seasonId: number,
): Promise<FetchRoundMatchesResult> {
  let res: Response;
  try {
    res = await clientApiFetch(currentRoundPath(competitionId, seasonId), {
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      status: 401,
      problem: { detail: "Sesión cerrada o expirada" },
    };
  }

  if (!res.ok) {
    const problem = await parseProblemDetails(res);
    return { ok: false, status: res.status, problem };
  }

  const data: unknown = await res.json();
  const normalized = normalizeRoundMatchesBody(data);
  if (!normalized) {
    return {
      ok: false,
      status: res.status,
      problem: { detail: "Respuesta inválida del servidor" },
    };
  }
  return { ok: true, data: normalized };
}

export async function fetchRoundMatches(
  competitionId: number,
  seasonId: number,
  round: number,
): Promise<FetchRoundMatchesResult> {
  let res: Response;
  try {
    res = await clientApiFetch(roundPath(competitionId, seasonId, round), {
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      status: 401,
      problem: { detail: "Sesión cerrada o expirada" },
    };
  }

  if (!res.ok) {
    const problem = await parseProblemDetails(res);
    return { ok: false, status: res.status, problem };
  }

  const data: unknown = await res.json();
  const normalized = normalizeRoundMatchesBody(data);
  if (!normalized) {
    return {
      ok: false,
      status: res.status,
      problem: { detail: "Respuesta inválida del servidor" },
    };
  }
  const withJornada: RoundMatchesResponse = {
    ...normalized,
    jornada: typeof normalized.jornada === "number" ? normalized.jornada : round,
  };
  return { ok: true, data: withJornada };
}
