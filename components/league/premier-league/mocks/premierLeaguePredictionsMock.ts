/**
 * Mock alineado al modelo `predictions` + contexto de partido para UI.
 * (Sin `id`; `match_id` solo referencia interna si hiciera falta.)
 */
export type PredictionMatchStatus = "live" | "scheduled";

export type PredictionCardMock = {
  matchStatus: PredictionMatchStatus;
  /** Equipo al que pertenece esta vista de predicción */
  teamForPrediction: string;
  rival: string;
  /** Partidos por jugar: fecha (y hora) del encuentro para la card */
  matchKickoffLabel?: string;
  created_at: string;
  expected_home_goals: number;
  expected_away_goals: number;
  prob_home_win: number;
  prob_draw: number;
  prob_away_win: number;
  predicted_shots: number;
  predicted_shots_on_target: number;
  predicted_saves: number;
  predicted_yellow_cards: number;
  predicted_red_cards: number;
  predicted_corners: number;
  predicted_fouls: number;
  predicted_offsides: number;
};

export const MOCK_PREDICTIONS: PredictionCardMock[] = [
  {
    matchStatus: "live",
    teamForPrediction: "Liverpool",
    rival: "Arsenal",
    created_at: "2025-03-15T14:22:00.000Z",
    expected_home_goals: 2.2,
    expected_away_goals: 1.1,
    prob_home_win: 0.58,
    prob_draw: 0.24,
    prob_away_win: 0.18,
    predicted_shots: 16,
    predicted_shots_on_target: 6,
    predicted_saves: 4,
    predicted_yellow_cards: 3,
    predicted_red_cards: 0,
    predicted_corners: 11,
    predicted_fouls: 22,
    predicted_offsides: 3,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "Chelsea",
    rival: "Newcastle",
    matchKickoffLabel: "Dom 23 mar 2025 · 13:30",
    created_at: "2025-03-14T09:10:00.000Z",
    expected_home_goals: 1.4,
    expected_away_goals: 1.2,
    prob_home_win: 0.42,
    prob_draw: 0.31,
    prob_away_win: 0.27,
    predicted_shots: 13,
    predicted_shots_on_target: 5,
    predicted_saves: 5,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 9,
    predicted_fouls: 19,
    predicted_offsides: 2,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "Brighton",
    rival: "Crystal Palace",
    matchKickoffLabel: "Sáb 22 mar 2025 · 16:00",
    created_at: "2025-03-13T18:45:00.000Z",
    expected_home_goals: 1.8,
    expected_away_goals: 0.9,
    prob_home_win: 0.51,
    prob_draw: 0.28,
    prob_away_win: 0.21,
    predicted_shots: 15,
    predicted_shots_on_target: 5,
    predicted_saves: 4,
    predicted_yellow_cards: 3,
    predicted_red_cards: 1,
    predicted_corners: 10,
    predicted_fouls: 17,
    predicted_offsides: 4,
  },
];
