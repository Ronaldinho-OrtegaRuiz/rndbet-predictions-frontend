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
    rival: "Manchester City",
    created_at: "2025-04-17T19:30:00.000Z",
    expected_home_goals: 2.0,
    expected_away_goals: 1.4,
    prob_home_win: 0.46,
    prob_draw: 0.26,
    prob_away_win: 0.28,
    predicted_shots: 20,
    predicted_shots_on_target: 8,
    predicted_saves: 5,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 11,
    predicted_fouls: 21,
    predicted_offsides: 2,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "Bayern Munich",
    rival: "Arsenal",
    matchKickoffLabel: "Mié 24 abr 2025 · 21:00",
    created_at: "2025-04-16T10:00:00.000Z",
    expected_home_goals: 1.9,
    expected_away_goals: 1.5,
    prob_home_win: 0.42,
    prob_draw: 0.27,
    prob_away_win: 0.31,
    predicted_shots: 17,
    predicted_shots_on_target: 7,
    predicted_saves: 4,
    predicted_yellow_cards: 3,
    predicted_red_cards: 0,
    predicted_corners: 10,
    predicted_fouls: 20,
    predicted_offsides: 3,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "Barcelona",
    rival: "Paris Saint-Germain",
    matchKickoffLabel: "Jue 25 abr 2025 · 21:00",
    created_at: "2025-04-15T08:00:00.000Z",
    expected_home_goals: 1.8,
    expected_away_goals: 1.6,
    prob_home_win: 0.38,
    prob_draw: 0.28,
    prob_away_win: 0.34,
    predicted_shots: 16,
    predicted_shots_on_target: 6,
    predicted_saves: 5,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 9,
    predicted_fouls: 22,
    predicted_offsides: 2,
  },
];
