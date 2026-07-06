import { getLeagueConfig } from "@/lib/leagues/config";

/** Premier League: jornadas por temporada (configurable vía env). */
export const PREMIER_LEAGUE_MAX_JORNADAS = Number(
  process.env.NEXT_PUBLIC_EPL_MAX_JORNADAS ??
    getLeagueConfig("premier-league").maxRound,
);
