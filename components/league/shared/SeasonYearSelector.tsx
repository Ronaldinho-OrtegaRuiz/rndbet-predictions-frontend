"use client";

import type { LeagueSlug } from "@/lib/leagues/config";
import { useLeagueSeasonSelection } from "@/lib/leagues/useLeagueSeasonSelection";
import { seasonLabel, type SeasonYear } from "@/lib/leagues/seasons";
import { getMatchdayTheme } from "./themes";

export function SeasonYearSelector({ leagueSlug }: { leagueSlug: LeagueSlug }) {
  const { seasonYear, setSeasonYear, availableYears } =
    useLeagueSeasonSelection(leagueSlug);
  const theme = getMatchdayTheme(leagueSlug);
  const selectId = `${leagueSlug}-season`;

  if (availableYears.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label
        htmlFor={selectId}
        className={`text-sm font-bold ${theme.mutedText}`}
      >
        Temporada
      </label>
      <select
        id={selectId}
        value={seasonYear}
        onChange={(e) => setSeasonYear(Number(e.target.value) as SeasonYear)}
        className={`${theme.select} focus-visible:ring-2 ${theme.focusRing}`}
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {seasonLabel(year)}
          </option>
        ))}
      </select>
    </div>
  );
}
