import type { ProblemDetails, TablaResponse } from "./standings-types";
import { parseProblemDetails } from "./parse-problem-details";

function standingsPath(competitionId: number, seasonId: number): string {
  return `/spring-api/v1/competitions/${competitionId}/seasons/${seasonId}/standings`;
}

export type FetchTablaResult =
  | { ok: true; data: TablaResponse }
  | { ok: false; status: number; problem?: ProblemDetails };

/**
 * Clasificación vía proxy Next (`/spring-api/...` → BACKEND_API_BASE_URL en next.config).
 */
export async function fetchTablaStandings(
  competitionId: number,
  seasonId: number,
): Promise<FetchTablaResult> {
  const res = await fetch(standingsPath(competitionId, seasonId), {
    cache: "no-store",
  });

  if (res.ok) {
    const data: unknown = await res.json();
    if (
      data &&
      typeof data === "object" &&
      "tabla" in data &&
      Array.isArray((data as TablaResponse).tabla)
    ) {
      return { ok: true, data: data as TablaResponse };
    }
    return {
      ok: false,
      status: res.status,
      problem: { detail: "Respuesta inválida del servidor" },
    };
  }

  const problem = await parseProblemDetails(res);
  return { ok: false, status: res.status, problem };
}
