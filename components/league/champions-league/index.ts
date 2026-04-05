export { ChampionsLeagueScreen } from "./ChampionsLeagueScreen";
export { ChampionsLeagueMatchDetailScreen } from "./match/ChampionsLeagueMatchDetailScreen";
export { getMatchDetailBySlug } from "./mocks/uclMatchDetailMock";
export type {
  MatchDetailMock,
  MatchEventMock,
  PredictionEvaluationMock,
  PredictionRowMock,
  TeamMatchStatsMock,
} from "./mocks/uclMatchDetailMock";
export {
  matchSlugFromTeams,
  slugifyTeamName,
  tryParseMatchSlug,
} from "./lib/uclMatchSlug";
export type { UclSectionId } from "./constants/uclSections";
