import type {
  MatchDetailApiResponse,
  MatchEventoApi,
} from "@/lib/api/match-detail-types";
import type {
  MatchDetailMock,
  MatchEventMock,
  TeamMatchStatsMock,
} from "../mocks/premierLeagueMatchDetailMock";
import { resolveFixtureStatus } from "./mapPartidoApi";

function formatFecha(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("es", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}

function num(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  return null;
}

/** Posesión: fracción 0–1 o porcentaje 0–100. */
function possessionDisplay(v: unknown): number | null {
  const n = num(v);
  if (n == null) return null;
  if (n > 0 && n <= 1) return Math.round(n * 100);
  return Math.round(n);
}

function statsFromApi(
  raw: Record<string, unknown> | null | undefined,
  teamName: string,
  isHome: boolean,
  goals: number | null,
): TeamMatchStatsMock {
  const o = raw && typeof raw === "object" ? raw : {};
  return {
    id: 0,
    match_id: null,
    team_id: null,
    is_home: typeof o.is_home === "boolean" ? o.is_home : isHome,
    goals,
    possession: possessionDisplay(o.possession),
    shots: num(o.shots),
    shots_on_target: num(o.shots_on_target),
    saves: num(o.saves),
    yellow_cards: num(o.yellow_cards),
    red_cards: num(o.red_cards ?? o.tarjetas_rojas),
    corners: num(o.corners),
    fouls: num(o.fouls),
    offsides: num(o.offsides),
    teamName,
  };
}

function mapEvento(ev: MatchEventoApi, i: number): MatchEventMock {
  const side =
    ev.lado === "local" ? ("home" as const) : ev.lado === "visitante" ? ("away" as const) : undefined;
  return {
    id: i + 1,
    match_id: null,
    team_id: null,
    player_id: null,
    minute: typeof ev.minuto === "number" ? ev.minuto : null,
    event_type: ev.tipo ?? null,
    extra_data: null,
    created_at: null,
    side,
    playerLabel: ev.jugador ?? null,
  };
}

export function mapMatchDetailApiToMock(
  data: MatchDetailApiResponse,
  routeKey: string,
): MatchDetailMock {
  const status = resolveFixtureStatus(data.estado);
  const gl = data.goles_local;
  const gv = data.goles_visitante;
  const homeGoals = typeof gl === "number" && Number.isFinite(gl) ? gl : null;
  const awayGoals = typeof gv === "number" && Number.isFinite(gv) ? gv : null;

  const eventos = Array.isArray(data.eventos) ? [...data.eventos] : [];
  eventos.sort((a, b) => (a.minuto ?? 0) - (b.minuto ?? 0));

  return {
    slug: routeKey,
    homeTeam: data.equipo_local,
    awayTeam: data.equipo_visitante,
    logoUrlLocal: data.logo_url_local,
    logoUrlVisitante: data.logo_url_visitante,
    status,
    homeScore: homeGoals ?? undefined,
    awayScore: awayGoals ?? undefined,
    dateLabel:
      data.fecha && status !== "live" ? formatFecha(data.fecha) : undefined,
    minute: undefined,
    events: eventos.map(mapEvento),
    homeStats: statsFromApi(
      data.estadisticas_local ?? undefined,
      data.equipo_local,
      true,
      homeGoals,
    ),
    awayStats: statsFromApi(
      data.estadisticas_visitante ?? undefined,
      data.equipo_visitante,
      false,
      awayGoals,
    ),
    prediction: null,
    evaluation: null,
    statsFootnote:
      "Estadísticas del partido según datos del servidor. El marcador se muestra arriba; las filas vacías indican métricas no disponibles.",
    predictionFootnote:
      "Las predicciones y evaluaciones se mostrarán aquí cuando el API las exponga.",
  };
}
