import { matchSlugFromTeams, tryParseMatchSlug } from "../lib/bundesligaMatchSlug";
import { MATCHDAY_1, type FixtureStatus } from "./bundesligaMatchdayMock";

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

const BAYERN_DORTMUND_SLUG = matchSlugFromTeams("Bayern Munich", "Borussia Dortmund");

const KLASSIKER_EVENTS: MatchEventMock[] = [
  {
    id: 1,
    match_id: 401,
    team_id: null,
    player_id: null,
    minute: 0,
    event_type: "kickoff",
    extra_data: { note: "Anpfiff" },
    created_at: "2025-03-15T18:30:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 2,
    match_id: 401,
    team_id: 2,
    player_id: 501,
    minute: 8,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-15T18:38:00.000Z",
    side: "away",
    playerLabel: "Emre Can",
  },
  {
    id: 3,
    match_id: 401,
    team_id: 1,
    player_id: 102,
    minute: 19,
    event_type: "goal",
    extra_data: { assist: "Jamal Musiala" },
    created_at: "2025-03-15T18:49:00.000Z",
    side: "home",
    playerLabel: "Harry Kane",
  },
  {
    id: 4,
    match_id: 401,
    team_id: 2,
    player_id: null,
    minute: 28,
    event_type: "corner",
    extra_data: null,
    created_at: "2025-03-15T18:58:00.000Z",
    side: "away",
    playerLabel: null,
  },
  {
    id: 5,
    match_id: 401,
    team_id: 1,
    player_id: 103,
    minute: 37,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-15T19:07:00.000Z",
    side: "home",
    playerLabel: "Joshua Kimmich",
  },
  {
    id: 6,
    match_id: 401,
    team_id: 2,
    player_id: 502,
    minute: 42,
    event_type: "goal",
    extra_data: { assist: "Julian Brandt" },
    created_at: "2025-03-15T19:12:00.000Z",
    side: "away",
    playerLabel: "Karim Adeyemi",
  },
  {
    id: 7,
    match_id: 401,
    team_id: null,
    player_id: null,
    minute: 46,
    event_type: "halftime",
    extra_data: null,
    created_at: "2025-03-15T19:20:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 8,
    match_id: 401,
    team_id: 1,
    player_id: null,
    minute: 56,
    event_type: "substitution",
    extra_data: { off: "Leroy Sané", on: "Kingsley Coman" },
    created_at: "2025-03-15T19:30:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 9,
    match_id: 401,
    team_id: 2,
    player_id: null,
    minute: 64,
    event_type: "substitution",
    extra_data: { off: "Marco Reus", on: "Gio Reyna" },
    created_at: "2025-03-15T19:38:00.000Z",
    side: "away",
    playerLabel: null,
  },
  {
    id: 10,
    match_id: 401,
    team_id: 1,
    player_id: 105,
    minute: 71,
    event_type: "goal",
    extra_data: { assist: "Alphonso Davies" },
    created_at: "2025-03-15T19:45:00.000Z",
    side: "home",
    playerLabel: "Thomas Müller",
  },
  {
    id: 11,
    match_id: 401,
    team_id: 2,
    player_id: 503,
    minute: 84,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-15T19:58:00.000Z",
    side: "away",
    playerLabel: "Nico Schlotterbeck",
  },
  {
    id: 12,
    match_id: 401,
    team_id: null,
    player_id: null,
    minute: 90,
    event_type: "fulltime",
    extra_data: { score: "2-1" },
    created_at: "2025-03-15T20:03:00.000Z",
    side: "home",
    playerLabel: null,
  },
];

const KLASSIKER_PREDICTION: PredictionRowMock = {
  id: 9601,
  match_id: 401,
  created_at: "2025-03-15T16:00:00.000Z",
  expected_home_goals: 2.0,
  expected_away_goals: 1.1,
  prob_home_win: 0.5,
  prob_draw: 0.25,
  prob_away_win: 0.25,
  predicted_shots: 28,
  predicted_shots_on_target: 10,
  predicted_saves: 5,
  predicted_yellow_cards: 4,
  predicted_red_cards: 0,
  predicted_corners: 12,
  predicted_fouls: 21,
  predicted_offsides: 2,
};

const KLASSIKER_EVALUATION: PredictionEvaluationMock = {
  id: 9701,
  prediction_id: 9601,
  actual_home_goals: 2,
  actual_away_goals: 1,
  actual_shots: 27,
  actual_shots_on_target: 9,
  actual_saves: 4,
  actual_yellow_cards: 3,
  actual_red_cards: 0,
  actual_corners: 11,
  actual_fouls: 20,
  actual_offsides: 2,
  error_goals: 0.12,
  error_shots: 0.2,
  error_corners: 0.4,
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

function buildBayernDortmundDetail(): MatchDetailMock {
  const homeTeam = "Bayern Munich";
  const awayTeam = "Borussia Dortmund";

  const home: TeamMatchStatsMock = {
    id: 601,
    match_id: 401,
    team_id: 1,
    is_home: true,
    goals: 2,
    possession: 54,
    shots: 16,
    shots_on_target: 7,
    saves: 3,
    yellow_cards: 1,
    red_cards: 0,
    corners: 7,
    fouls: 11,
    offsides: 2,
    teamName: homeTeam,
  };

  const away: TeamMatchStatsMock = {
    id: 602,
    match_id: 401,
    team_id: 2,
    is_home: false,
    goals: 1,
    possession: 46,
    shots: 11,
    shots_on_target: 4,
    saves: 5,
    yellow_cards: 2,
    red_cards: 0,
    corners: 4,
    fouls: 14,
    offsides: 1,
    teamName: awayTeam,
  };

  return {
    slug: BAYERN_DORTMUND_SLUG,
    homeTeam,
    awayTeam,
    status: "finished",
    homeScore: 2,
    awayScore: 1,
    dateLabel: "15 mar 2025",
    events: KLASSIKER_EVENTS,
    homeStats: home,
    awayStats: away,
    prediction: KLASSIKER_PREDICTION,
    evaluation: KLASSIKER_EVALUATION,
    statsFootnote:
      "[Demo Bundesliga — Bayern vs Dortmund] Estadísticas mock; con el back vendrán datos reales.",
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
  if (slug === BAYERN_DORTMUND_SLUG) return buildBayernDortmundDetail();
  return buildGenericDetail(slug, parsed.homeTeam, parsed.awayTeam, parsed.pairIndex);
}
