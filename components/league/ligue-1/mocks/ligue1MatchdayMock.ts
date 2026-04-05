export type FixtureStatus = "finished" | "live" | "scheduled";

export type FixtureMatch = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  status: FixtureStatus;
  homeScore?: number;
  awayScore?: number;
  dateLabel?: string;
  minute?: string;
  redCard?: "home" | "away";
};

export const LIGUE1_FIXTURE_PAIRS: { home: string; away: string }[] = [
  { home: "Paris Saint-Germain", away: "Olympique Marseille" },
  { home: "AS Monaco", away: "Olympique Lyonnais" },
  { home: "Lille OSC", away: "RC Lens" },
  { home: "Stade Rennais", away: "OGC Nice" },
  { home: "RC Strasbourg", away: "FC Nantes" },
  { home: "Montpellier HSC", away: "Stade Brestois" },
  { home: "Stade de Reims", away: "Toulouse FC" },
  { home: "Le Havre AC", away: "Angers SCO" },
  { home: "AJ Auxerre", away: "AS Saint-Étienne" },
];

function base(
  i: number,
  overrides: Partial<FixtureMatch> & { status: FixtureStatus },
): FixtureMatch {
  const p = LIGUE1_FIXTURE_PAIRS[i]!;
  return {
    id: `m${i + 1}`,
    homeTeam: p.home,
    awayTeam: p.away,
    ...overrides,
  };
}

export const MATCHDAY_1: FixtureMatch[] = LIGUE1_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "finished",
    dateLabel: "16 mar 2025",
    homeScore: [3, 2, 1, 0, 2, 1, 1, 2, 0][i],
    awayScore: [1, 2, 1, 0, 1, 2, 1, 1, 1][i],
    redCard: i === 3 ? "away" : i === 5 ? "home" : undefined,
  }),
);

export const MATCHDAY_2: FixtureMatch[] = LIGUE1_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "live",
    minute: `${14 + i * 3}'`,
    homeScore: [1, 0, 1, 2, 0, 1, 0, 1, 0][i],
    awayScore: [1, 1, 1, 1, 0, 1, 1, 0, 0][i],
    redCard: i === 2 ? "home" : i === 6 ? "away" : undefined,
  }),
);

export const MATCHDAY_3: FixtureMatch[] = LIGUE1_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "scheduled",
    dateLabel: "23 mar 2025",
    redCard: i === 4 ? "away" : i === 7 ? "home" : undefined,
  }),
);

export const MATCHDAYS: Record<1 | 2 | 3, FixtureMatch[]> = {
  1: MATCHDAY_1,
  2: MATCHDAY_2,
  3: MATCHDAY_3,
};
