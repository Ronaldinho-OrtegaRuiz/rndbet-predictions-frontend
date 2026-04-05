import { matchSlugFromTeams, tryParseMatchSlug } from "../lib/uclMatchSlug";
import { MATCHDAY_1, type FixtureStatus } from "./uclMatchdayMock";

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

const RM_MC_SLUG = matchSlugFromTeams("Real Madrid", "Manchester City");

const FINAL_EVENTS: MatchEventMock[] = [
  {
    id: 1,
    match_id: 801,
    team_id: null,
    player_id: null,
    minute: 0,
    event_type: "kickoff",
    extra_data: { note: "Kick-off" },
    created_at: "2025-04-17T19:00:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 2,
    match_id: 801,
    team_id: 1,
    player_id: null,
    minute: 18,
    event_type: "goal",
    extra_data: { assist: "Toni Kroos" },
    created_at: "2025-04-17T19:18:00.000Z",
    side: "home",
    playerLabel: "Vinicius Junior",
  },
  {
    id: 3,
    match_id: 801,
    team_id: 2,
    player_id: null,
    minute: 31,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-04-17T19:31:00.000Z",
    side: "away",
    playerLabel: "Rodri",
  },
  {
    id: 4,
    match_id: 801,
    team_id: 2,
    player_id: null,
    minute: 37,
    event_type: "goal",
    extra_data: { assist: "Kevin De Bruyne" },
    created_at: "2025-04-17T19:37:00.000Z",
    side: "away",
    playerLabel: "Erling Haaland",
  },
  {
    id: 5,
    match_id: 801,
    team_id: null,
    player_id: null,
    minute: 46,
    event_type: "halftime",
    extra_data: null,
    created_at: "2025-04-17T19:46:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 6,
    match_id: 801,
    team_id: 1,
    player_id: null,
    minute: 68,
    event_type: "goal",
    extra_data: { assist: "Federico Valverde" },
    created_at: "2025-04-17T20:08:00.000Z",
    side: "home",
    playerLabel: "Jude Bellingham",
  },
  {
    id: 7,
    match_id: 801,
    team_id: 2,
    player_id: null,
    minute: 74,
    event_type: "substitution",
    extra_data: { off: "Phil Foden", on: "Jeremy Doku" },
    created_at: "2025-04-17T20:14:00.000Z",
    side: "away",
    playerLabel: null,
  },
  {
    id: 8,
    match_id: 801,
    team_id: null,
    player_id: null,
    minute: 90,
    event_type: "fulltime",
    extra_data: { score: "2-1" },
    created_at: "2025-04-17T20:35:00.000Z",
    side: "home",
    playerLabel: null,
  },
];

const FINAL_PREDICTION: PredictionRowMock = {
  id: 9101,
  match_id: 801,
  created_at: "2025-04-17T16:00:00.000Z",
  expected_home_goals: 2.0,
  expected_away_goals: 1.3,
  prob_home_win: 0.44,
  prob_draw: 0.27,
  prob_away_win: 0.29,
  predicted_shots: 19,
  predicted_shots_on_target: 7,
  predicted_saves: 5,
  predicted_yellow_cards: 4,
  predicted_red_cards: 0,
  predicted_corners: 10,
  predicted_fouls: 20,
  predicted_offsides: 2,
};

const FINAL_EVALUATION: PredictionEvaluationMock = {
  id: 9201,
  prediction_id: 9101,
  actual_home_goals: 2,
  actual_away_goals: 1,
  actual_shots: 18,
  actual_shots_on_target: 8,
  actual_saves: 4,
  actual_yellow_cards: 3,
  actual_red_cards: 0,
  actual_corners: 9,
  actual_fouls: 19,
  actual_offsides: 2,
  error_goals: 0.22,
  error_shots: 0.18,
  error_corners: 0.3,
  error_cards: 0.35,
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

function buildRealMadridCityDetail(): MatchDetailMock {
  const homeTeam = "Real Madrid";
  const awayTeam = "Manchester City";

  const home: TeamMatchStatsMock = {
    id: 801,
    match_id: 801,
    team_id: 1,
    is_home: true,
    goals: 2,
    possession: 51,
    shots: 15,
    shots_on_target: 8,
    saves: 4,
    yellow_cards: 2,
    red_cards: 0,
    corners: 6,
    fouls: 12,
    offsides: 1,
    teamName: homeTeam,
  };

  const away: TeamMatchStatsMock = {
    id: 802,
    match_id: 801,
    team_id: 2,
    is_home: false,
    goals: 1,
    possession: 49,
    shots: 14,
    shots_on_target: 5,
    saves: 6,
    yellow_cards: 3,
    red_cards: 0,
    corners: 5,
    fouls: 11,
    offsides: 2,
    teamName: awayTeam,
  };

  return {
    slug: RM_MC_SLUG,
    homeTeam,
    awayTeam,
    status: "finished",
    homeScore: 2,
    awayScore: 1,
    dateLabel: "17 abr 2025",
    events: FINAL_EVENTS,
    homeStats: home,
    awayStats: away,
    prediction: FINAL_PREDICTION,
    evaluation: FINAL_EVALUATION,
    statsFootnote:
      "[Demo UCL — Real Madrid vs Man City] Estadísticas mock; con el back vendrán datos reales.",
    predictionFootnote:
      "[Demo] Comparación predicción vs resultado; integración futura con API.",
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
    pairIndex + 3,
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
  if (slug === RM_MC_SLUG) return buildRealMadridCityDetail();
  return buildGenericDetail(slug, parsed.homeTeam, parsed.awayTeam, parsed.pairIndex);
}
