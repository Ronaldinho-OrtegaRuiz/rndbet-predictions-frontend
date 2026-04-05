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

export const UCL_FIXTURE_PAIRS: { home: string; away: string }[] = [
  { home: "Real Madrid", away: "Manchester City" },
  { home: "Bayern Munich", away: "Arsenal" },
  { home: "Barcelona", away: "Paris Saint-Germain" },
  { home: "Liverpool", away: "Inter Milan" },
  { home: "Atletico Madrid", away: "Borussia Dortmund" },
  { home: "Juventus", away: "FC Porto" },
  { home: "SL Benfica", away: "PSV Eindhoven" },
  { home: "Celtic", away: "RB Leipzig" },
];

function base(
  i: number,
  overrides: Partial<FixtureMatch> & { status: FixtureStatus },
): FixtureMatch {
  const p = UCL_FIXTURE_PAIRS[i]!;
  return {
    id: `m${i + 1}`,
    homeTeam: p.home,
    awayTeam: p.away,
    ...overrides,
  };
}

export const MATCHDAY_1: FixtureMatch[] = UCL_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "finished",
    dateLabel: "17 abr 2025",
    homeScore: [2, 3, 1, 2, 0, 2, 1, 1][i],
    awayScore: [1, 2, 2, 1, 0, 1, 1, 2][i],
    redCard: i === 2 ? "away" : i === 5 ? "home" : undefined,
  }),
);

export const MATCHDAY_2: FixtureMatch[] = UCL_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "live",
    minute: `${16 + i * 2}'`,
    homeScore: [1, 0, 1, 1, 0, 1, 0, 2][i],
    awayScore: [1, 1, 0, 1, 0, 1, 1, 1][i],
    redCard: i === 4 ? "home" : i === 7 ? "away" : undefined,
  }),
);

export const MATCHDAY_3: FixtureMatch[] = UCL_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "scheduled",
    dateLabel: "24 abr 2025",
    redCard: i === 1 ? "away" : i === 6 ? "home" : undefined,
  }),
);

export const MATCHDAYS: Record<1 | 2 | 3, FixtureMatch[]> = {
  1: MATCHDAY_1,
  2: MATCHDAY_2,
  3: MATCHDAY_3,
};
