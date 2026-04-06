import { MATCHDAY_1, type FixtureStatus } from "./premierLeagueMatchdayMock";
import { matchSlugFromTeams, tryParseMatchSlug } from "../lib/premierLeagueMatchSlug";

/** Alineado a `public.match_events` (+ nombres para UI hasta que venga el back). */
export type MatchEventMock = {
  id: number;
  match_id: number | null;
  team_id: number | null;
  player_id: number | null;
  minute: number | null;
  event_type: string | null;
  extra_data: Record<string, unknown> | null;
  created_at: string | null;
  /** Derivado UI; ausente si el API no envía `lado`. */
  side?: "home" | "away";
  playerLabel: string | null;
};

/** Alineado a `public.team_match_stats`. */
export type TeamMatchStatsMock = {
  id: number;
  match_id: number | null;
  team_id: number | null;
  is_home: boolean | null;
  goals: number | null;
  possession: number | null;
  shots: number | null;
  shots_on_target: number | null;
  saves: number | null;
  yellow_cards: number | null;
  red_cards: number | null;
  corners: number | null;
  fouls: number | null;
  offsides: number | null;
  teamName: string;
};

/** Alineado a `public.predictions`. */
export type PredictionRowMock = {
  id: number;
  match_id: number | null;
  created_at: string | null;
  expected_home_goals: number | null;
  expected_away_goals: number | null;
  prob_home_win: number | null;
  prob_draw: number | null;
  prob_away_win: number | null;
  predicted_shots: number | null;
  predicted_shots_on_target: number | null;
  predicted_saves: number | null;
  predicted_yellow_cards: number | null;
  predicted_red_cards: number | null;
  predicted_corners: number | null;
  predicted_fouls: number | null;
  predicted_offsides: number | null;
};

/** Alineado a `public.prediction_evaluations`. */
export type PredictionEvaluationMock = {
  id: number;
  prediction_id: number | null;
  actual_home_goals: number | null;
  actual_away_goals: number | null;
  actual_shots: number | null;
  actual_shots_on_target: number | null;
  actual_saves: number | null;
  actual_yellow_cards: number | null;
  actual_red_cards: number | null;
  actual_corners: number | null;
  actual_fouls: number | null;
  actual_offsides: number | null;
  error_goals: number | null;
  error_shots: number | null;
  error_corners: number | null;
  error_cards: number | null;
  correct_result: boolean | null;
};

export type MatchDetailMock = {
  slug: string;
  homeTeam: string;
  awayTeam: string;
  logoUrlLocal?: string;
  logoUrlVisitante?: string;
  status: FixtureStatus;
  homeScore?: number;
  awayScore?: number;
  dateLabel?: string;
  minute?: string;
  events: MatchEventMock[];
  homeStats: TeamMatchStatsMock;
  awayStats: TeamMatchStatsMock;
  prediction: PredictionRowMock | null;
  evaluation: PredictionEvaluationMock | null;
  /** Hueco tipo “resumen” bajo estadísticas (texto hasta API). */
  statsFootnote: string;
  /** Hueco bajo bloque predicción + evaluación. */
  predictionFootnote: string;
};

const LIVERPOOL_ARSENAL_SLUG = matchSlugFromTeams("Liverpool", "Arsenal");

/** Demo fijo solo para `/match/liverpool-vs-arsenal` (eventos tipo `match_events`). */
const LIVERPOOL_ARSENAL_EVENTS: MatchEventMock[] = [
  {
    id: 1,
    match_id: 101,
    team_id: null,
    player_id: null,
    minute: 0,
    event_type: "kickoff",
    extra_data: { note: "Inicio del partido" },
    created_at: "2025-03-15T15:00:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 2,
    match_id: 101,
    team_id: 1,
    player_id: 101,
    minute: 7,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-15T15:07:00.000Z",
    side: "away",
    playerLabel: "Martin Ødegaard",
  },
  {
    id: 3,
    match_id: 101,
    team_id: 1,
    player_id: 102,
    minute: 12,
    event_type: "goal",
    extra_data: { assist: "Dominik Szoboszlai" },
    created_at: "2025-03-15T15:12:00.000Z",
    side: "home",
    playerLabel: "Mohamed Salah",
  },
  {
    id: 4,
    match_id: 101,
    team_id: 2,
    player_id: 201,
    minute: 24,
    event_type: "corner",
    extra_data: null,
    created_at: "2025-03-15T15:24:00.000Z",
    side: "away",
    playerLabel: null,
  },
  {
    id: 5,
    match_id: 101,
    team_id: 2,
    player_id: 202,
    minute: 34,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-15T15:34:00.000Z",
    side: "away",
    playerLabel: "William Saliba",
  },
  {
    id: 6,
    match_id: 101,
    team_id: 1,
    player_id: 103,
    minute: 41,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-15T15:41:00.000Z",
    side: "home",
    playerLabel: "Alexis Mac Allister",
  },
  {
    id: 7,
    match_id: 101,
    team_id: 2,
    player_id: 203,
    minute: 45,
    event_type: "goal",
    extra_data: { phase: "first_half" },
    created_at: "2025-03-15T15:50:00.000Z",
    side: "away",
    playerLabel: "Kai Havertz",
  },
  {
    id: 8,
    match_id: 101,
    team_id: null,
    player_id: null,
    minute: 46,
    event_type: "halftime",
    extra_data: null,
    created_at: "2025-03-15T15:52:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 9,
    match_id: 101,
    team_id: 1,
    player_id: null,
    minute: 58,
    event_type: "substitution",
    extra_data: { off: "Curtis Jones", on: "Wataru Endo" },
    created_at: "2025-03-15T16:01:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 10,
    match_id: 101,
    team_id: 2,
    player_id: null,
    minute: 63,
    event_type: "substitution",
    extra_data: { off: "Gabriel Jesus", on: "Leandro Trossard" },
    created_at: "2025-03-15T16:06:00.000Z",
    side: "away",
    playerLabel: null,
  },
  {
    id: 11,
    match_id: 101,
    team_id: 1,
    player_id: 105,
    minute: 78,
    event_type: "goal",
    extra_data: { assist: "Trent Alexander-Arnold" },
    created_at: "2025-03-15T16:21:00.000Z",
    side: "home",
    playerLabel: "Darwin Núñez",
  },
  {
    id: 12,
    match_id: 101,
    team_id: 2,
    player_id: 204,
    minute: 88,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-15T16:31:00.000Z",
    side: "away",
    playerLabel: "Declan Rice",
  },
  {
    id: 13,
    match_id: 101,
    team_id: null,
    player_id: null,
    minute: 90,
    event_type: "fulltime",
    extra_data: { score: "2-1" },
    created_at: "2025-03-15T16:33:00.000Z",
    side: "home",
    playerLabel: null,
  },
];

/** Demo fijo: fila `predictions`. */
const LIVERPOOL_ARSENAL_PREDICTION: PredictionRowMock = {
  id: 9001,
  match_id: 101,
  created_at: "2025-03-15T11:30:00.000Z",
  expected_home_goals: 2.2,
  expected_away_goals: 1.1,
  prob_home_win: 0.52,
  prob_draw: 0.27,
  prob_away_win: 0.21,
  predicted_shots: 28,
  predicted_shots_on_target: 11,
  predicted_saves: 5,
  predicted_yellow_cards: 4,
  predicted_red_cards: 0,
  predicted_corners: 12,
  predicted_fouls: 22,
  predicted_offsides: 3,
};

/** Demo fijo: fila `prediction_evaluations` (partido terminado 2-1). */
const LIVERPOOL_ARSENAL_EVALUATION: PredictionEvaluationMock = {
  id: 9101,
  prediction_id: 9001,
  actual_home_goals: 2,
  actual_away_goals: 1,
  actual_shots: 29,
  actual_shots_on_target: 11,
  actual_saves: 4,
  actual_yellow_cards: 4,
  actual_red_cards: 0,
  actual_corners: 13,
  actual_fouls: 20,
  actual_offsides: 2,
  error_goals: 0.18,
  error_shots: 0.35,
  error_corners: 0.82,
  error_cards: 0.25,
  correct_result: true,
};

function statsFromScores(
  homeTeam: string,
  awayTeam: string,
  homeGoals: number,
  awayGoals: number,
  seed: number,
): { home: TeamMatchStatsMock; away: TeamMatchStatsMock } {
  const base = (n: number) => 8 + ((seed + n) % 7);
  return {
    home: {
      id: seed * 2,
      match_id: seed,
      team_id: seed * 10,
      is_home: true,
      goals: homeGoals,
      possession: 52 + (seed % 5),
      shots: base(1) + 4,
      shots_on_target: base(2),
      saves: base(3) - 2,
      yellow_cards: (seed % 3) + 1,
      red_cards: 0,
      corners: base(4),
      fouls: 10 + (seed % 8),
      offsides: (seed % 4) + 1,
      teamName: homeTeam,
    },
    away: {
      id: seed * 2 + 1,
      match_id: seed,
      team_id: seed * 10 + 1,
      is_home: false,
      goals: awayGoals,
      possession: 48 - (seed % 5),
      shots: base(2) + 2,
      shots_on_target: base(1) - 1,
      saves: base(4),
      yellow_cards: seed % 4,
      red_cards: 0,
      corners: base(3) - 1,
      fouls: 12 + (seed % 6),
      offsides: seed % 3,
      teamName: awayTeam,
    },
  };
}

function buildLiverpoolArsenalDetail(): MatchDetailMock {
  const homeTeam = "Liverpool";
  const awayTeam = "Arsenal";

  const home: TeamMatchStatsMock = {
    id: 201,
    match_id: 101,
    team_id: 1,
    is_home: true,
    goals: 2,
    possession: 56,
    shots: 18,
    shots_on_target: 7,
    saves: 3,
    yellow_cards: 1,
    red_cards: 0,
    corners: 8,
    fouls: 11,
    offsides: 2,
    teamName: homeTeam,
  };

  const away: TeamMatchStatsMock = {
    id: 202,
    match_id: 101,
    team_id: 2,
    is_home: false,
    goals: 1,
    possession: 44,
    shots: 11,
    shots_on_target: 4,
    saves: 5,
    yellow_cards: 3,
    red_cards: 0,
    corners: 5,
    fouls: 9,
    offsides: 1,
    teamName: awayTeam,
  };

  return {
    slug: LIVERPOOL_ARSENAL_SLUG,
    homeTeam,
    awayTeam,
    status: "finished",
    homeScore: 2,
    awayScore: 1,
    dateLabel: "15 mar 2025",
    events: LIVERPOOL_ARSENAL_EVENTS,
    homeStats: home,
    awayStats: away,
    prediction: LIVERPOOL_ARSENAL_PREDICTION,
    evaluation: LIVERPOOL_ARSENAL_EVALUATION,
    statsFootnote:
      "[Demo fijo Liverpool vs Arsenal] Resumen de estadísticas: dominio local en la segunda mitad; texto final vendrá del back o de un resumen generado.",
    predictionFootnote:
      "[Demo fijo] Predicción vs realidad: acierto en 1X2 (victoria local); desviaciones leves en tiros y córners. Aquí irá el resumen automático cuando exista API.",
  };
}

function buildGenericDetail(
  slug: string,
  homeTeam: string,
  awayTeam: string,
  pairIndex: number,
): MatchDetailMock {
  const m = MATCHDAY_1[pairIndex]!;
  const { home, away } = statsFromScores(
    homeTeam,
    awayTeam,
    m.homeScore ?? 0,
    m.awayScore ?? 0,
    pairIndex + 2,
  );

  return {
    slug,
    homeTeam,
    awayTeam,
    status: "finished",
    homeScore: m.homeScore,
    awayScore: m.awayScore,
    dateLabel: m.dateLabel,
    events: [],
    homeStats: home,
    awayStats: away,
    prediction: null,
    evaluation: null,
    statsFootnote:
      "Resumen del partido: placeholder hasta que el back envíe texto o highlights agregados.",
    predictionFootnote:
      "Sin predicción almacenada para este partido en el mock. Cuando exista fila en `predictions` y `prediction_evaluations`, se mostrará aquí el resumen.",
  };
}

function seedFromSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return (h % 900) + 1;
}

/** Partido no listado en el mock de jornada (p. ej. datos reales del API): vista de detalle por defecto. */
function buildUnknownPairDetail(
  slug: string,
  homeTeam: string,
  awayTeam: string,
): MatchDetailMock {
  const seed = seedFromSlug(slug);
  const { home, away } = statsFromScores(homeTeam, awayTeam, 0, 0, seed);
  return {
    slug,
    homeTeam,
    awayTeam,
    status: "scheduled",
    dateLabel: undefined,
    events: [],
    homeStats: { ...home, goals: 0 },
    awayStats: { ...away, goals: 0 },
    prediction: null,
    evaluation: null,
    statsFootnote:
      "Vista de detalle genérica: cuando el backend exponga este partido, aquí irán estadísticas y resumen reales.",
    predictionFootnote:
      "Sin predicción en el cliente para este partido. Se conectará con el API cuando esté disponible.",
  };
}

export function getMatchDetailBySlug(slug: string): MatchDetailMock | null {
  const parsed = tryParseMatchSlug(slug);
  if (!parsed) return null;
  if (slug === LIVERPOOL_ARSENAL_SLUG) return buildLiverpoolArsenalDetail();
  if (parsed.pairIndex >= 0) {
    return buildGenericDetail(
      slug,
      parsed.homeTeam,
      parsed.awayTeam,
      parsed.pairIndex,
    );
  }
  return buildUnknownPairDetail(slug, parsed.homeTeam, parsed.awayTeam);
}
