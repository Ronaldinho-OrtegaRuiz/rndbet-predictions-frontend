export type FixtureStatus = "finished" | "live" | "scheduled";

export type FixtureMatch = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  status: FixtureStatus;
  homeScore?: number;
  awayScore?: number;
  /** Texto fecha (jugado / por jugar) */
  dateLabel?: string;
  /** Minutos en vivo, ej. "67'" */
  minute?: string;
  redCard?: "home" | "away";
};

export const PREMIER_FIXTURE_PAIRS: { home: string; away: string }[] = [
  { home: "Liverpool", away: "Arsenal" },
  { home: "Man City", away: "Chelsea" },
  { home: "Newcastle", away: "Aston Villa" },
  { home: "Brighton", away: "Tottenham" },
  { home: "Man Utd", away: "West Ham" },
  { home: "Brentford", away: "Fulham" },
  { home: "Crystal Palace", away: "Everton" },
  { home: "Bournemouth", away: "Wolves" },
  { home: "Nott'm Forest", away: "Leicester" },
  { home: "Ipswich", away: "Southampton" },
];

function base(
  i: number,
  overrides: Partial<FixtureMatch> & { status: FixtureStatus },
): FixtureMatch {
  const p = PREMIER_FIXTURE_PAIRS[i]!;
  return {
    id: `m${i + 1}`,
    homeTeam: p.home,
    awayTeam: p.away,
    ...overrides,
  };
}

/** Jornada 1: todos finalizados */
export const MATCHDAY_1: FixtureMatch[] = PREMIER_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "finished",
    dateLabel: "15 mar 2025",
    homeScore: [2, 1, 3, 0, 2, 1, 1, 2, 0, 1][i],
    awayScore: [1, 1, 2, 0, 2, 3, 1, 2, 0, 2][i],
    redCard: i === 2 ? "away" : i === 6 ? "home" : undefined,
  }),
);

/** Jornada 2: todos en vivo */
export const MATCHDAY_2: FixtureMatch[] = PREMIER_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "live",
    minute: `${12 + i * 7}'`,
    homeScore: [1, 0, 2, 1, 1, 0, 0, 1, 0, 2][i],
    awayScore: [1, 0, 1, 1, 2, 1, 0, 1, 0, 1][i],
    redCard: i === 1 ? "home" : i === 8 ? "away" : undefined,
  }),
);

/** Jornada 3: todos por jugar */
export const MATCHDAY_3: FixtureMatch[] = PREMIER_FIXTURE_PAIRS.map((_, i) =>
  base(i, {
    status: "scheduled",
    dateLabel: "22 mar 2025",
    redCard: i === 4 ? "away" : i === 9 ? "home" : undefined,
  }),
);

export const MATCHDAYS: Record<1 | 2 | 3, FixtureMatch[]> = {
  1: MATCHDAY_1,
  2: MATCHDAY_2,
  3: MATCHDAY_3,
};
