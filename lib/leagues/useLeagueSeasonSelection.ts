"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getLeagueCompetitionId,
  getLeagueConfig,
  resolveSeasonIdForLeague,
  type LeagueSlug,
} from "@/lib/leagues/config";
import {
  availableSeasonYears,
  defaultSeasonYear,
  parseSeasonYear,
  type SeasonYear,
} from "@/lib/leagues/seasons";

export type LeagueSeasonSelection = {
  leagueSlug: LeagueSlug;
  seasonYear: SeasonYear;
  seasonId: number;
  competitionId: number;
  availableYears: SeasonYear[];
  setSeasonYear: (year: SeasonYear) => void;
};

/** Temporada activa sincronizada vía `?season=2024` en la URL de la liga. */
export function useLeagueSeasonSelection(
  leagueSlug: LeagueSlug,
): LeagueSeasonSelection {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cfg = getLeagueConfig(leagueSlug);
  const availableYears = useMemo(
    () => availableSeasonYears(cfg.competitionId),
    [cfg.competitionId],
  );

  const seasonYear = useMemo(() => {
    const fromUrl = parseSeasonYear(searchParams.get("season"));
    if (fromUrl && availableYears.includes(fromUrl)) return fromUrl;
    const fallback = defaultSeasonYear();
    if (availableYears.includes(fallback)) return fallback;
    return availableYears[availableYears.length - 1] ?? 2024;
  }, [searchParams, availableYears]);

  const competitionId = getLeagueCompetitionId(leagueSlug);
  const seasonId = resolveSeasonIdForLeague(leagueSlug, seasonYear);

  const setSeasonYear = useCallback(
    (year: SeasonYear) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("season", String(year));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return {
    leagueSlug,
    seasonYear,
    seasonId,
    competitionId,
    availableYears,
    setSeasonYear,
  };
}
