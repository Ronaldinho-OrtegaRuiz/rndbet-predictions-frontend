import type { ProblemDetails } from "./standings-types";

/** Evento en detalle de partido (API). */
export type MatchEventoApi = {
  tipo: string;
  minuto?: number;
  jugador?: string;
  lado?: "local" | "visitante";
};

/** Estadísticas por equipo en detalle (claves snake_case típicas de team_match_stats sin goles). */
export type EstadisticasEquipoApi = Record<string, unknown>;

export type MatchDetailApiResponse = {
  id: number | string;
  fecha?: string | null;
  estado: string;
  equipo_local: string;
  equipo_visitante: string;
  /** Omitidos si null (NON_NULL). */
  logo_url_local?: string;
  logo_url_visitante?: string;
  goles_local?: number | null;
  goles_visitante?: number | null;
  estadisticas_local?: EstadisticasEquipoApi | null;
  estadisticas_visitante?: EstadisticasEquipoApi | null;
  eventos?: MatchEventoApi[] | null;
};

export type FetchMatchDetailResult =
  | { ok: true; data: MatchDetailApiResponse }
  | { ok: false; status: number; problem?: ProblemDetails };
