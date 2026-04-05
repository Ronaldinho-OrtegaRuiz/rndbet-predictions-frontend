export type PredictionMatchStatus = "live" | "scheduled";

export type PredictionCardMock = {
  matchStatus: PredictionMatchStatus;
  teamForPrediction: string;
  rival: string;
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
    teamForPrediction: "Real Madrid",
    rival: "Barcelona",
    created_at: "2025-03-16T16:30:00.000Z",
    expected_home_goals: 2.0,
    expected_away_goals: 1.2,
    prob_home_win: 0.48,
    prob_draw: 0.26,
    prob_away_win: 0.26,
    predicted_shots: 17,
    predicted_shots_on_target: 7,
    predicted_saves: 5,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 11,
    predicted_fouls: 20,
    predicted_offsides: 3,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "Atlético Madrid",
    rival: "Sevilla",
    matchKickoffLabel: "Dom 24 mar 2025 · 18:30",
    created_at: "2025-03-15T10:00:00.000Z",
    expected_home_goals: 1.5,
    expected_away_goals: 0.9,
    prob_home_win: 0.54,
    prob_draw: 0.29,
    prob_away_win: 0.17,
    predicted_shots: 14,
    predicted_shots_on_target: 5,
    predicted_saves: 4,
    predicted_yellow_cards: 3,
    predicted_red_cards: 0,
    predicted_corners: 9,
    predicted_fouls: 18,
    predicted_offsides: 2,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "Real Sociedad",
    rival: "Villarreal",
    matchKickoffLabel: "Sáb 23 mar 2025 · 14:00",
    created_at: "2025-03-14T12:20:00.000Z",
    expected_home_goals: 1.3,
    expected_away_goals: 1.1,
    prob_home_win: 0.39,
    prob_draw: 0.32,
    prob_away_win: 0.29,
    predicted_shots: 13,
    predicted_shots_on_target: 5,
    predicted_saves: 5,
    predicted_yellow_cards: 3,
    predicted_red_cards: 0,
    predicted_corners: 8,
    predicted_fouls: 19,
    predicted_offsides: 3,
  },
];
