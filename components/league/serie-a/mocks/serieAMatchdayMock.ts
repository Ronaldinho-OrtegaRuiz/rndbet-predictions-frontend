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

export const SERIE_A_FIXTURE_PAIRS: { home: string; away: string }[] = [
  { home: "Juventus", away: "Inter" },
  { home: "AC Milan", away: "Napoli" },
  { home: "Atalanta", away: "Roma" },
  { home: "Lazio", away: "Fiorentina" },
  { home: "Bologna", away: "Torino" },
  { home: "Genoa", away: "Monza" },
  { home: "Verona", away: "Lecce" },
  { home: "Sassuolo", away: "Cagliari" },
  { home: "Parma", away: "Empoli" },
  { home: "Venezia", away: "Udinese" },
];

function base(
  i: number,
  overrides: Partial<FixtureMatch> & { status: FixtureStatus },
): FixtureMatch {
  const p = SERIE_A_FIXTURE_PAIRS[i]!;
  return {
    id: `m${i + 1}`,
    homeTeam: p.home,
    awayTeam: p.away,
    ...overrides,
  };
}

export const MATCHDAY_1: FixtureMatch[] = SERIE_A_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "finished",
    dateLabel: "17 mar 2025",
    homeScore: [1, 2, 0, 3, 1, 2, 1, 0, 1, 2][i],
    awayScore: [1, 1, 0, 1, 2, 0, 1, 0, 1, 1][i],
    redCard: i === 3 ? "away" : i === 7 ? "home" : undefined,
  }),
);

export const MATCHDAY_2: FixtureMatch[] = SERIE_A_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "live",
    minute: `${13 + i * 5}'`,
    homeScore: [1, 0, 2, 1, 0, 1, 0, 1, 0, 1][i],
    awayScore: [1, 1, 1, 2, 0, 1, 1, 0, 0, 1][i],
    redCard: i === 2 ? "home" : i === 8 ? "away" : undefined,
  }),
);

export const MATCHDAY_3: FixtureMatch[] = SERIE_A_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "scheduled",
    dateLabel: "24 mar 2025",
    redCard: i === 5 ? "away" : i === 9 ? "home" : undefined,
  }),
);

export const MATCHDAYS: Record<1 | 2 | 3, FixtureMatch[]> = {
  1: MATCHDAY_1,
  2: MATCHDAY_2,
  3: MATCHDAY_3,
};
