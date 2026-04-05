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

export const LA_LIGA_FIXTURE_PAIRS: { home: string; away: string }[] = [
  { home: "Real Madrid", away: "Barcelona" },
  { home: "Atlético Madrid", away: "Sevilla" },
  { home: "Real Sociedad", away: "Villarreal" },
  { home: "Athletic Club", away: "Valencia" },
  { home: "Betis", away: "Osasuna" },
  { home: "Girona", away: "Mallorca" },
  { home: "Celta", away: "Getafe" },
  { home: "Rayo", away: "Las Palmas" },
  { home: "Alavés", away: "Leganés" },
  { home: "Espanyol", away: "Valladolid" },
];

function base(
  i: number,
  overrides: Partial<FixtureMatch> & { status: FixtureStatus },
): FixtureMatch {
  const p = LA_LIGA_FIXTURE_PAIRS[i]!;
  return {
    id: `m${i + 1}`,
    homeTeam: p.home,
    awayTeam: p.away,
    ...overrides,
  };
}

export const MATCHDAY_1: FixtureMatch[] = LA_LIGA_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "finished",
    dateLabel: "16 mar 2025",
    homeScore: [2, 1, 0, 2, 1, 3, 1, 0, 2, 1][i],
    awayScore: [1, 1, 0, 1, 2, 1, 1, 0, 2, 1][i],
    redCard: i === 2 ? "away" : i === 6 ? "home" : undefined,
  }),
);

export const MATCHDAY_2: FixtureMatch[] = LA_LIGA_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "live",
    minute: `${14 + i * 6}'`,
    homeScore: [1, 0, 2, 1, 1, 0, 0, 1, 0, 2][i],
    awayScore: [1, 0, 1, 1, 2, 1, 0, 1, 0, 1][i],
    redCard: i === 1 ? "home" : i === 8 ? "away" : undefined,
  }),
);

export const MATCHDAY_3: FixtureMatch[] = LA_LIGA_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "scheduled",
    dateLabel: "23 mar 2025",
    redCard: i === 4 ? "away" : i === 9 ? "home" : undefined,
  }),
);

export const MATCHDAYS: Record<1 | 2 | 3, FixtureMatch[]> = {
  1: MATCHDAY_1,
  2: MATCHDAY_2,
  3: MATCHDAY_3,
};
