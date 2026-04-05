import { matchSlugFromTeams, tryParseMatchSlug } from "../lib/ligue1MatchSlug";
import { MATCHDAY_1, type FixtureStatus } from "./ligue1MatchdayMock";

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

const PSG_OM_SLUG = matchSlugFromTeams("Paris Saint-Germain", "Olympique Marseille");

const CLASSIQUE_EVENTS: MatchEventMock[] = [
  {
    id: 1,
    match_id: 501,
    team_id: null,
    player_id: null,
    minute: 0,
    event_type: "kickoff",
    extra_data: { note: "Coup d'envoi" },
    created_at: "2025-03-16T20:00:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 2,
    match_id: 501,
    team_id: 2,
    player_id: null,
    minute: 11,
    event_type: "yellow_card",
    extra_data: null,
    created_at: "2025-03-16T20:11:00.000Z",
    side: "away",
    playerLabel: "Chancel Mbemba",
  },
  {
    id: 3,
    match_id: 501,
    team_id: 1,
    player_id: null,
    minute: 24,
    event_type: "goal",
    extra_data: { assist: "Ousmane Dembélé" },
    created_at: "2025-03-16T20:24:00.000Z",
    side: "home",
    playerLabel: "Kylian Mbappé",
  },
  {
    id: 4,
    match_id: 501,
    team_id: 2,
    player_id: null,
    minute: 38,
    event_type: "goal",
    extra_data: { assist: "Pierre-Emerick Aubameyang" },
    created_at: "2025-03-16T20:38:00.000Z",
    side: "away",
    playerLabel: "Jonathan Clauss",
  },
  {
    id: 5,
    match_id: 501,
    team_id: null,
    player_id: null,
    minute: 46,
    event_type: "halftime",
    extra_data: null,
    created_at: "2025-03-16T20:50:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 6,
    match_id: 501,
    team_id: 1,
    player_id: null,
    minute: 62,
    event_type: "goal",
    extra_data: { assist: "Vitinha" },
    created_at: "2025-03-16T21:02:00.000Z",
    side: "home",
    playerLabel: "Randal Kolo Muani",
  },
  {
    id: 7,
    match_id: 501,
    team_id: 1,
    player_id: null,
    minute: 78,
    event_type: "substitution",
    extra_data: { off: "Warren Zaïre-Emery", on: "Manuel Ugarte" },
    created_at: "2025-03-16T21:18:00.000Z",
    side: "home",
    playerLabel: null,
  },
  {
    id: 8,
    match_id: 501,
    team_id: 1,
    player_id: null,
    minute: 89,
    event_type: "goal",
    extra_data: { assist: "Bradley Barcola" },
    created_at: "2025-03-16T21:29:00.000Z",
    side: "home",
    playerLabel: "Gonçalo Ramos",
  },
  {
    id: 9,
    match_id: 501,
    team_id: null,
    player_id: null,
    minute: 90,
    event_type: "fulltime",
    extra_data: { score: "3-1" },
    created_at: "2025-03-16T21:35:00.000Z",
    side: "home",
    playerLabel: null,
  },
];

const CLASSIQUE_PREDICTION: PredictionRowMock = {
  id: 9801,
  match_id: 501,
  created_at: "2025-03-16T17:30:00.000Z",
  expected_home_goals: 2.4,
  expected_away_goals: 1.0,
  prob_home_win: 0.55,
  prob_draw: 0.24,
  prob_away_win: 0.21,
  predicted_shots: 18,
  predicted_shots_on_target: 7,
  predicted_saves: 5,
  predicted_yellow_cards: 4,
  predicted_red_cards: 0,
  predicted_corners: 11,
  predicted_fouls: 21,
  predicted_offsides: 2,
};

const CLASSIQUE_EVALUATION: PredictionEvaluationMock = {
  id: 9901,
  prediction_id: 9801,
  actual_home_goals: 3,
  actual_away_goals: 1,
  actual_shots: 17,
  actual_shots_on_target: 8,
  actual_saves: 4,
  actual_yellow_cards: 3,
  actual_red_cards: 0,
  actual_corners: 10,
  actual_fouls: 19,
  actual_offsides: 2,
  error_goals: 0.35,
  error_shots: 0.15,
  error_corners: 0.25,
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

function buildParisMarseilleDetail(): MatchDetailMock {
  const homeTeam = "Paris Saint-Germain";
  const awayTeam = "Olympique Marseille";

  const home: TeamMatchStatsMock = {
    id: 701,
    match_id: 501,
    team_id: 1,
    is_home: true,
    goals: 3,
    possession: 58,
    shots: 17,
    shots_on_target: 8,
    saves: 2,
    yellow_cards: 1,
    red_cards: 0,
    corners: 8,
    fouls: 10,
    offsides: 2,
    teamName: homeTeam,
  };

  const away: TeamMatchStatsMock = {
    id: 702,
    match_id: 501,
    team_id: 2,
    is_home: false,
    goals: 1,
    possession: 42,
    shots: 10,
    shots_on_target: 3,
    saves: 5,
    yellow_cards: 2,
    red_cards: 0,
    corners: 3,
    fouls: 15,
    offsides: 1,
    teamName: awayTeam,
  };

  return {
    slug: PSG_OM_SLUG,
    homeTeam,
    awayTeam,
    status: "finished",
    homeScore: 3,
    awayScore: 1,
    dateLabel: "16 mar 2025",
    events: CLASSIQUE_EVENTS,
    homeStats: home,
    awayStats: away,
    prediction: CLASSIQUE_PREDICTION,
    evaluation: CLASSIQUE_EVALUATION,
    statsFootnote:
      "[Demo Ligue 1 — PSG vs OM] Estadísticas mock; con el back vendrán datos reales.",
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
  if (slug === PSG_OM_SLUG) return buildParisMarseilleDetail();
  return buildGenericDetail(slug, parsed.homeTeam, parsed.awayTeam, parsed.pairIndex);
}
