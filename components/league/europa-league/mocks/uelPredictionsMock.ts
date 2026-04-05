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
    teamForPrediction: "Sevilla",
    rival: "Roma",
    created_at: "2025-04-11T19:45:00.000Z",
    expected_home_goals: 1.7,
    expected_away_goals: 1.2,
    prob_home_win: 0.48,
    prob_draw: 0.28,
    prob_away_win: 0.24,
    predicted_shots: 18,
    predicted_shots_on_target: 7,
    predicted_saves: 4,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 10,
    predicted_fouls: 22,
    predicted_offsides: 2,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "West Ham United",
    rival: "Bayer Leverkusen",
    matchKickoffLabel: "Jue 18 abr 2025 · 21:00",
    created_at: "2025-04-10T09:00:00.000Z",
    expected_home_goals: 1.5,
    expected_away_goals: 1.6,
    prob_home_win: 0.36,
    prob_draw: 0.29,
    prob_away_win: 0.35,
    predicted_shots: 16,
    predicted_shots_on_target: 6,
    predicted_saves: 5,
    predicted_yellow_cards: 3,
    predicted_red_cards: 0,
    predicted_corners: 9,
    predicted_fouls: 19,
    predicted_offsides: 3,
  },
  {
    matchStatus: "scheduled",
    teamForPrediction: "Sporting CP",
    rival: "Atalanta",
    matchKickoffLabel: "Jue 18 abr 2025 · 18:45",
    created_at: "2025-04-09T12:00:00.000Z",
    expected_home_goals: 1.6,
    expected_away_goals: 1.5,
    prob_home_win: 0.4,
    prob_draw: 0.3,
    prob_away_win: 0.3,
    predicted_shots: 17,
    predicted_shots_on_target: 7,
    predicted_saves: 4,
    predicted_yellow_cards: 4,
    predicted_red_cards: 0,
    predicted_corners: 11,
    predicted_fouls: 21,
    predicted_offsides: 2,
  },
];
