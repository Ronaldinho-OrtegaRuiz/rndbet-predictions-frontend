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
    teamForPrediction: "Paris Saint-Germain",
    rival: "Olympique Marseille",
    created_at: "2025-03-16T18:00:00.000Z",
    expected_home_goals: 2.4,
    expected_away_goals: 1.1,
    prob_home_win: 0.58,
    prob_draw: 0.22,
    prob_away_win: 0.2,
    predicted_shots: 19,
    predicted_shots_on_target: 8,
    predicted_saves: 5,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 12,
    predicted_fouls: 22,
    predicted_offsides: 2,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "AS Monaco",
    rival: "Olympique Lyonnais",
    matchKickoffLabel: "Sáb 23 mar 2025 · 21:00",
    created_at: "2025-03-15T09:00:00.000Z",
    expected_home_goals: 1.7,
    expected_away_goals: 1.3,
    prob_home_win: 0.41,
    prob_draw: 0.28,
    prob_away_win: 0.31,
    predicted_shots: 16,
    predicted_shots_on_target: 6,
    predicted_saves: 4,
    predicted_yellow_cards: 3,
    predicted_red_cards: 0,
    predicted_corners: 10,
    predicted_fouls: 20,
    predicted_offsides: 3,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "Lille OSC",
    rival: "RC Lens",
    matchKickoffLabel: "Dom 24 mar 2025 · 17:05",
    created_at: "2025-03-14T11:20:00.000Z",
    expected_home_goals: 1.5,
    expected_away_goals: 1.2,
    prob_home_win: 0.39,
    prob_draw: 0.31,
    prob_away_win: 0.3,
    predicted_shots: 14,
    predicted_shots_on_target: 5,
    predicted_saves: 5,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 9,
    predicted_fouls: 21,
    predicted_offsides: 2,
  },
];
