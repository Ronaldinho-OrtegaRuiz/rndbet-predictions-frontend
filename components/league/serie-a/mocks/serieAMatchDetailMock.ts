import { MATCHDAY_1, type FixtureStatus } from "./serieAMatchdayMock";
import { matchSlugFromTeams, tryParseMatchSlug } from "../lib/serieAMatchSlug";

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

const JUVENTUS_INTER_SLUG = matchSlugFromTeams("Juventus", "Inter");

const DERBY_EVENTS: MatchEventMock[] = [
  {
    id: 1,
    match_id: 301,
    team_id: null,
    player_id: null,
    minute: 0,
    event_type: "kickoff",
    extra_data: { note: "Inicio del partido" },
    created_at: "2025-03-17T18:00:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 2,
    match_id: 301,
    team_id: 2,
    player_id: 401,
    minute: 11,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-17T18:11:00.000Z",
    side: "away",
    playerLabel: "Nicolò Barella",
  },
  {
    id: 3,
    match_id: 301,
    team_id: 1,
    player_id: 102,
    minute: 23,
    event_type: "goal",
    extra_data: { assist: "Federico Chiesa" },
    created_at: "2025-03-17T18:23:00.000Z",
    side: "home",
    playerLabel: "Dušan Vlahović",
  },
  {
    id: 4,
    match_id: 301,
    team_id: 2,
    player_id: null,
    minute: 31,
    event_type: "corner",
    extra_data: null,
    created_at: "2025-03-17T18:31:00.000Z",
    side: "away",
    playerLabel: null,
  },
  {
    id: 5,
    match_id: 301,
    team_id: 1,
    player_id: 103,
    minute: 40,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-17T18:40:00.000Z",
    side: "home",
    playerLabel: "Manuel Locatelli",
  },
  {
    id: 6,
    match_id: 301,
    team_id: 2,
    player_id: 402,
    minute: 44,
    event_type: "goal",
    extra_data: { assist: "Hakan Çalhanoğlu" },
    created_at: "2025-03-17T18:44:00.000Z",
    side: "away",
    playerLabel: "Lautaro Martínez",
  },
  {
    id: 7,
    match_id: 301,
    team_id: null,
    player_id: null,
    minute: 46,
    event_type: "halftime",
    extra_data: null,
    created_at: "2025-03-17T18:52:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 8,
    match_id: 301,
    team_id: 1,
    player_id: null,
    minute: 58,
    event_type: "substitution",
    extra_data: { off: "Weston McKennie", on: "Fabio Miretti" },
    created_at: "2025-03-17T19:01:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 9,
    match_id: 301,
    team_id: 2,
    player_id: null,
    minute: 66,
    event_type: "substitution",
    extra_data: { off: "Marcus Thuram", on: "Marko Arnautović" },
    created_at: "2025-03-17T19:09:00.000Z",
    side: "away",
    playerLabel: null,
  },
  {
    id: 10,
    match_id: 301,
    team_id: 1,
    player_id: 105,
    minute: 79,
    event_type: "goal",
    extra_data: { assist: "Andrea Cambiaso" },
    created_at: "2025-03-17T19:22:00.000Z",
    side: "home",
    playerLabel: "Kenan Yıldız",
  },
  {
    id: 11,
    match_id: 301,
    team_id: 2,
    player_id: 403,
    minute: 88,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-17T19:31:00.000Z",
    side: "away",
    playerLabel: "Francesco Acerbi",
  },
  {
    id: 12,
    match_id: 301,
    team_id: null,
    player_id: null,
    minute: 90,
    event_type: "fulltime",
    extra_data: { score: "2-1" },
    created_at: "2025-03-17T19:33:00.000Z",
    side: "home",
    playerLabel: null,
  },
];

const DERBY_PREDICTION: PredictionRowMock = {
  id: 9401,
  match_id: 301,
  created_at: "2025-03-17T15:30:00.000Z",
  expected_home_goals: 1.5,
  expected_away_goals: 1.2,
  prob_home_win: 0.39,
  prob_draw: 0.31,
  prob_away_win: 0.3,
  predicted_shots: 26,
  predicted_shots_on_target: 9,
  predicted_saves: 5,
  predicted_yellow_cards: 4,
  predicted_red_cards: 0,
  predicted_corners: 10,
  predicted_fouls: 22,
  predicted_offsides: 2,
};

const DERBY_EVALUATION: PredictionEvaluationMock = {
  id: 9501,
  prediction_id: 9401,
  actual_home_goals: 2,
  actual_away_goals: 1,
  actual_shots: 27,
  actual_shots_on_target: 9,
  actual_saves: 4,
  actual_yellow_cards: 3,
  actual_red_cards: 0,
  actual_corners: 11,
  actual_fouls: 21,
  actual_offsides: 2,
  error_goals: 0.22,
  error_shots: 0.31,
  error_corners: 0.5,
  error_cards: 0.4,
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

function buildJuventusInterDetail(): MatchDetailMock {
  const homeTeam = "Juventus";
  const awayTeam = "Inter";

  const home: TeamMatchStatsMock = {
    id: 501,
    match_id: 301,
    team_id: 1,
    is_home: true,
    goals: 2,
    possession: 48,
    shots: 14,
    shots_on_target: 6,
    saves: 3,
    yellow_cards: 1,
    red_cards: 0,
    corners: 6,
    fouls: 13,
    offsides: 1,
    teamName: homeTeam,
  };

  const away: TeamMatchStatsMock = {
    id: 502,
    match_id: 301,
    team_id: 2,
    is_home: false,
    goals: 1,
    possession: 52,
    shots: 13,
    shots_on_target: 5,
    saves: 4,
    yellow_cards: 2,
    red_cards: 0,
    corners: 5,
    fouls: 8,
    offsides: 1,
    teamName: awayTeam,
  };

  return {
    slug: JUVENTUS_INTER_SLUG,
    homeTeam,
    awayTeam,
    status: "finished",
    homeScore: 2,
    awayScore: 1,
    dateLabel: "17 mar 2025",
    events: DERBY_EVENTS,
    homeStats: home,
    awayStats: away,
    prediction: DERBY_PREDICTION,
    evaluation: DERBY_EVALUATION,
    statsFootnote:
      "[Demo Serie A — Juventus vs Inter] Resumen de estadísticas (mock); con el back vendrá texto o highlights.",
    predictionFootnote:
      "[Demo] Predicción vs resultado: acierto en 1X2; desviaciones leves en conteos. Resumen final vía API.",
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
  if (slug === JUVENTUS_INTER_SLUG) return buildJuventusInterDetail();
  return buildGenericDetail(slug, parsed.homeTeam, parsed.awayTeam, parsed.pairIndex);
}
