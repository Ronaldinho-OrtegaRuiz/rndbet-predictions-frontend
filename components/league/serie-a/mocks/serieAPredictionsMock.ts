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
    teamForPrediction: "Juventus",
    rival: "Inter",
    created_at: "2025-03-17T17:45:00.000Z",
    expected_home_goals: 1.4,
    expected_away_goals: 1.3,
    prob_home_win: 0.38,
    prob_draw: 0.31,
    prob_away_win: 0.31,
    predicted_shots: 15,
    predicted_shots_on_target: 6,
    predicted_saves: 4,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 10,
    predicted_fouls: 21,
    predicted_offsides: 2,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "AC Milan",
    rival: "Napoli",
    matchKickoffLabel: "Dom 25 mar 2025 · 20:45",
    created_at: "2025-03-16T11:00:00.000Z",
    expected_home_goals: 1.6,
    expected_away_goals: 1.1,
    prob_home_win: 0.44,
    prob_draw: 0.29,
    prob_away_win: 0.27,
    predicted_shots: 14,
    predicted_shots_on_target: 5,
    predicted_saves: 5,
    predicted_yellow_cards: 3,
    predicted_red_cards: 0,
    predicted_corners: 9,
    predicted_fouls: 19,
    predicted_offsides: 3,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "Atalanta",
    rival: "Roma",
    matchKickoffLabel: "Sáb 23 mar 2025 · 18:00",
    created_at: "2025-03-15T09:30:00.000Z",
    expected_home_goals: 1.7,
    expected_away_goals: 1.0,
    prob_home_win: 0.49,
    prob_draw: 0.28,
    prob_away_win: 0.23,
    predicted_shots: 16,
    predicted_shots_on_target: 6,
    predicted_saves: 4,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 11,
    predicted_fouls: 20,
    predicted_offsides: 2,
  },
];
