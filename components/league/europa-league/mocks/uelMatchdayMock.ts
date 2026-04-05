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

export const UEL_FIXTURE_PAIRS: { home: string; away: string }[] = [
  { home: "Sevilla", away: "Roma" },
  { home: "West Ham United", away: "Bayer Leverkusen" },
  { home: "Sporting CP", away: "Atalanta" },
  { home: "Brighton", away: "Marseille" },
  { home: "Villarreal", away: "SC Freiburg" },
  { home: "Fiorentina", away: "Club Brugge" },
  { home: "Ajax", away: "Olympiakos" },
  { home: "Rangers", away: "SL Benfica" },
];

function base(
  i: number,
  overrides: Partial<FixtureMatch> & { status: FixtureStatus },
): FixtureMatch {
  const p = UEL_FIXTURE_PAIRS[i]!;
  return {
    id: `m${i + 1}`,
    homeTeam: p.home,
    awayTeam: p.away,
    ...overrides,
  };
}

export const MATCHDAY_1: FixtureMatch[] = UEL_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "finished",
    dateLabel: "11 abr 2025",
    homeScore: [2, 1, 2, 1, 3, 0, 2, 1][i],
    awayScore: [1, 2, 1, 1, 2, 1, 1, 2][i],
    redCard: i === 2 ? "away" : i === 5 ? "home" : undefined,
  }),
);

export const MATCHDAY_2: FixtureMatch[] = UEL_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "live",
    minute: `${14 + i * 2}'`,
    homeScore: [1, 0, 1, 1, 0, 1, 0, 2][i],
    awayScore: [1, 1, 0, 1, 0, 1, 1, 1][i],
    redCard: i === 4 ? "home" : i === 7 ? "away" : undefined,
  }),
);

export const MATCHDAY_3: FixtureMatch[] = UEL_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "scheduled",
    dateLabel: "18 abr 2025",
    redCard: i === 1 ? "away" : i === 6 ? "home" : undefined,
  }),
);

export const MATCHDAYS: Record<1 | 2 | 3, FixtureMatch[]> = {
  1: MATCHDAY_1,
  2: MATCHDAY_2,
  3: MATCHDAY_3,
};
