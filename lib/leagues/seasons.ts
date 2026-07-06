/** Año de inicio de temporada (football-data.org / BD). */
export type SeasonYear = 2023 | 2024 | 2025 | 2026;

const ALL_SEASON_YEARS: SeasonYear[] = [2023, 2024, 2025, 2026];

export const SEASON_IDS_BY_COMPETITION: Record<
  number,
  Partial<Record<SeasonYear, number>>
> = {
  1: { 2023: 4, 2024: 5, 2025: 6, 2026: 7 },
  2: { 2023: 11, 2024: 12, 2025: 13, 2026: 14 },
  3: { 2023: 18, 2024: 19, 2025: 20, 2026: 21 },
  4: { 2023: 25, 2024: 26, 2025: 27, 2026: 28 },
  5: { 2023: 32, 2024: 33, 2025: 34, 2026: 35 },
  6: { 2023: 39, 2024: 40, 2025: 41 },
};

export function defaultSeasonYear(): SeasonYear {
  const raw = Number(process.env.NEXT_PUBLIC_DEFAULT_SEASON_YEAR ?? 2024);
  if (raw === 2023 || raw === 2024 || raw === 2025 || raw === 2026) {
    return raw;
  }
  return 2024;
}

export function seasonIdForCompetition(
  competitionId: number,
  year: SeasonYear = defaultSeasonYear(),
): number | undefined {
  return SEASON_IDS_BY_COMPETITION[competitionId]?.[year];
}

export function seasonLabel(year: SeasonYear): string {
  const next = (year + 1) % 100;
  return `${year}/${String(next).padStart(2, "0")}`;
}

export function parseSeasonYear(raw: string | null | undefined): SeasonYear | null {
  if (raw == null || raw === "") return null;
  const n = Number(raw);
  if (n === 2023 || n === 2024 || n === 2025 || n === 2026) return n;
  return null;
}

/** Temporadas con `seasonId` conocido en BD para una competición. */
export function availableSeasonYears(competitionId: number): SeasonYear[] {
  const map = SEASON_IDS_BY_COMPETITION[competitionId];
  if (!map) return [defaultSeasonYear()];
  return ALL_SEASON_YEARS.filter((y) => map[y] != null);
}
