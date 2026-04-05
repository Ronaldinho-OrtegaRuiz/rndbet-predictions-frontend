import { MATCHDAY_1, type FixtureStatus } from "./laLigaMatchdayMock";
import { matchSlugFromTeams, tryParseMatchSlug } from "../lib/laLigaMatchSlug";

export type MatchEventMock = {
  id: number;
  match_id: number | null;
  team_id: number | null;
  player_id: number | null;
  minute: number | null;
  event_type: string | null;
  extra_data: Record<string, unknown> | null;
  created_at: string | null;
  side: "home" | "away";
  playerLabel: string | null;
};

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
  statsFootnote: string;
  predictionFootnote: string;
};

const REAL_MADRID_BARCELONA_SLUG = matchSlugFromTeams("Real Madrid", "Barcelona");

const CLASICO_EVENTS: MatchEventMock[] = [
  {
    id: 1,
    match_id: 201,
    team_id: null,
    player_id: null,
    minute: 0,
    event_type: "kickoff",
    extra_data: { note: "Inicio del partido" },
    created_at: "2025-03-16T17:00:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 2,
    match_id: 201,
    team_id: 2,
    player_id: 301,
    minute: 9,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-16T17:09:00.000Z",
    side: "away",
    playerLabel: "Ronald Araujo",
  },
  {
    id: 3,
    match_id: 201,
    team_id: 1,
    player_id: 102,
    minute: 14,
    event_type: "goal",
    extra_data: { assist: "Jude Bellingham" },
    created_at: "2025-03-16T17:14:00.000Z",
    side: "home",
    playerLabel: "Vinicius Jr",
  },
  {
    id: 4,
    match_id: 201,
    team_id: 2,
    player_id: null,
    minute: 22,
    event_type: "corner",
    extra_data: null,
    created_at: "2025-03-16T17:22:00.000Z",
    side: "away",
    playerLabel: null,
  },
  {
    id: 5,
    match_id: 201,
    team_id: 1,
    player_id: 103,
    minute: 31,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-16T17:31:00.000Z",
    side: "home",
    playerLabel: "Aurélien Tchouaméni",
  },
  {
    id: 6,
    match_id: 201,
    team_id: 2,
    player_id: 302,
    minute: 38,
    event_type: "goal",
    extra_data: { assist: "Pedri" },
    created_at: "2025-03-16T17:38:00.000Z",
    side: "away",
    playerLabel: "Robert Lewandowski",
  },
  {
    id: 7,
    match_id: 201,
    team_id: null,
    player_id: null,
    minute: 46,
    event_type: "halftime",
    extra_data: null,
    created_at: "2025-03-16T17:52:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 8,
    match_id: 201,
    team_id: 1,
    player_id: null,
    minute: 58,
    event_type: "substitution",
    extra_data: { off: "Rodrygo", on: "Brahim Díaz" },
    created_at: "2025-03-16T18:01:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 9,
    match_id: 201,
    team_id: 2,
    player_id: null,
    minute: 64,
    event_type: "substitution",
    extra_data: { off: "Lamine Yamal", on: "Ferran Torres" },
    created_at: "2025-03-16T18:07:00.000Z",
    side: "away",
    playerLabel: null,
  },
  {
    id: 10,
    match_id: 201,
    team_id: 1,
    player_id: 105,
    minute: 76,
    event_type: "goal",
    extra_data: { assist: "Federico Valverde" },
    created_at: "2025-03-16T18:19:00.000Z",
    side: "home",
    playerLabel: "Joselu",
  },
  {
    id: 11,
    match_id: 201,
    team_id: 2,
    player_id: 303,
    minute: 87,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-16T18:30:00.000Z",
    side: "away",
    playerLabel: "Frenkie de Jong",
  },
  {
    id: 12,
    match_id: 201,
    team_id: null,
    player_id: null,
    minute: 90,
    event_type: "fulltime",
    extra_data: { score: "2-1" },
    created_at: "2025-03-16T18:33:00.000Z",
    side: "home",
    playerLabel: null,
  },
];

const CLASICO_PREDICTION: PredictionRowMock = {
  id: 9201,
  match_id: 201,
  created_at: "2025-03-16T14:00:00.000Z",
  expected_home_goals: 2.1,
  expected_away_goals: 1.0,
  prob_home_win: 0.49,
  prob_draw: 0.27,
  prob_away_win: 0.24,
  predicted_shots: 27,
  predicted_shots_on_target: 10,
  predicted_saves: 5,
  predicted_yellow_cards: 4,
  predicted_red_cards: 0,
  predicted_corners: 11,
  predicted_fouls: 21,
  predicted_offsides: 3,
};

const CLASICO_EVALUATION: PredictionEvaluationMock = {
  id: 9301,
  prediction_id: 9201,
  actual_home_goals: 2,
  actual_away_goals: 1,
  actual_shots: 28,
  actual_shots_on_target: 10,
  actual_saves: 4,
  actual_yellow_cards: 3,
  actual_red_cards: 0,
  actual_corners: 12,
  actual_fouls: 20,
  actual_offsides: 2,
  error_goals: 0.12,
  error_shots: 0.28,
  error_corners: 0.45,
  error_cards: 0.33,
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

function buildClasicoDetail(): MatchDetailMock {
  const homeTeam = "Real Madrid";
  const awayTeam = "Barcelona";

  const home: TeamMatchStatsMock = {
    id: 401,
    match_id: 201,
    team_id: 1,
    is_home: true,
    goals: 2,
    possession: 53,
    shots: 16,
    shots_on_target: 6,
    saves: 4,
    yellow_cards: 1,
    red_cards: 0,
    corners: 7,
    fouls: 12,
    offsides: 1,
    teamName: homeTeam,
  };

  const away: TeamMatchStatsMock = {
    id: 402,
    match_id: 201,
    team_id: 2,
    is_home: false,
    goals: 1,
    possession: 47,
    shots: 12,
    shots_on_target: 4,
    saves: 4,
    yellow_cards: 2,
    red_cards: 0,
    corners: 5,
    fouls: 8,
    offsides: 1,
    teamName: awayTeam,
  };

  return {
    slug: REAL_MADRID_BARCELONA_SLUG,
    homeTeam,
    awayTeam,
    status: "finished",
    homeScore: 2,
    awayScore: 1,
    dateLabel: "16 mar 2025",
    events: CLASICO_EVENTS,
    homeStats: home,
    awayStats: away,
    prediction: CLASICO_PREDICTION,
    evaluation: CLASICO_EVALUATION,
    statsFootnote:
      "[Demo La Liga — Real Madrid vs Barcelona] Resumen de estadísticas (mock); con el back vendrá texto o highlights.",
    predictionFootnote:
      "[Demo] Predicción vs resultado: victoria local acertada; desviaciones leves en conteos. Resumen final vía API.",
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
      "Sin predicción en el mock para este encuentro. Con el back: `predictions` y `prediction_evaluations`.",
  };
}

export function getMatchDetailBySlug(slug: string): MatchDetailMock | null {
  const parsed = tryParseMatchSlug(slug);
  if (!parsed) return null;
  if (slug === REAL_MADRID_BARCELONA_SLUG) return buildClasicoDetail();
  return buildGenericDetail(slug, parsed.homeTeam, parsed.awayTeam, parsed.pairIndex);
}
