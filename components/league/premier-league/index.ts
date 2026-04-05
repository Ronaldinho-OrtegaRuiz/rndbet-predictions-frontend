/** Punto de entrada de la feature Premier League (pantallas, mocks y utilidades de ruta). */

export { PremierLeagueScreen } from "./PremierLeagueScreen";
export { PremierLeagueMatchDetailScreen } from "./match/PremierLeagueMatchDetailScreen";
export { getMatchDetailBySlug } from "./mocks/premierLeagueMatchDetailMock";
export type {
  MatchDetailMock,
  MatchEventMock,
  PredictionEvaluationMock,
  PredictionRowMock,
  TeamMatchStatsMock,
} from "./mocks/premierLeagueMatchDetailMock";
export {
  matchSlugFromTeams,
  slugifyTeamName,
  tryParseMatchSlug,
} from "./lib/premierLeagueMatchSlug";
export type { PremierLeagueSectionId } from "./constants/premierLeagueSections";
