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

export const BUNDESLIGA_FIXTURE_PAIRS: { home: string; away: string }[] = [
  { home: "Bayern Munich", away: "Borussia Dortmund" },
  { home: "RB Leipzig", away: "Bayer Leverkusen" },
  { home: "Eintracht Frankfurt", away: "VfL Wolfsburg" },
  { home: "Union Berlin", away: "SC Freiburg" },
  { home: "VfB Stuttgart", away: "TSG Hoffenheim" },
  { home: "Werder Bremen", away: "1. FSV Mainz 05" },
  { home: "FC Augsburg", away: "1. FC Heidenheim" },
  { home: "Borussia Mönchengladbach", away: "VfL Bochum" },
  { home: "Holstein Kiel", away: "FC St. Pauli" },
  { home: "Hamburger SV", away: "1. FC Köln" },
];

function base(
  i: number,
  overrides: Partial<FixtureMatch> & { status: FixtureStatus },
): FixtureMatch {
  const p = BUNDESLIGA_FIXTURE_PAIRS[i]!;
  return {
    id: `m${i + 1}`,
    homeTeam: p.home,
    awayTeam: p.away,
    ...overrides,
  };
}

export const MATCHDAY_1: FixtureMatch[] = BUNDESLIGA_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "finished",
    dateLabel: "15 mar 2025",
    homeScore: [2, 1, 3, 0, 2, 1, 1, 2, 0, 1][i],
    awayScore: [1, 1, 2, 0, 1, 2, 1, 1, 1, 1][i],
    redCard: i === 4 ? "away" : i === 6 ? "home" : undefined,
  }),
);

export const MATCHDAY_2: FixtureMatch[] = BUNDESLIGA_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "live",
    minute: `${12 + i * 4}'`,
    homeScore: [1, 0, 1, 2, 0, 1, 0, 1, 0, 2][i],
    awayScore: [1, 1, 1, 1, 0, 1, 1, 0, 0, 1][i],
    redCard: i === 1 ? "home" : i === 7 ? "away" : undefined,
  }),
);

export const MATCHDAY_3: FixtureMatch[] = BUNDESLIGA_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "scheduled",
    dateLabel: "22 mar 2025",
    redCard: i === 3 ? "away" : i === 8 ? "home" : undefined,
  }),
);

export const MATCHDAYS: Record<1 | 2 | 3, FixtureMatch[]> = {
  1: MATCHDAY_1,
  2: MATCHDAY_2,
  3: MATCHDAY_3,
};
