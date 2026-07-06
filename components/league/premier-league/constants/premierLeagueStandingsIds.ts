import {
  getLeagueCompetitionId,
  getLeagueSeasonId,
} from "@/lib/leagues/config";

/** IDs del backend (competitions.id / seasons.id). */
export const PREMIER_LEAGUE_COMPETITION_ID =
  getLeagueCompetitionId("premier-league");

export const PREMIER_LEAGUE_SEASON_ID = getLeagueSeasonId("premier-league");
