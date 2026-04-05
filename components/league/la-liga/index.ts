export { LaLigaScreen } from "./LaLigaScreen";
export { LaLigaMatchDetailScreen } from "./match/LaLigaMatchDetailScreen";
export { getMatchDetailBySlug } from "./mocks/laLigaMatchDetailMock";
export type {
  MatchDetailMock,
  MatchEventMock,
  PredictionEvaluationMock,
  PredictionRowMock,
  TeamMatchStatsMock,
} from "./mocks/laLigaMatchDetailMock";
export {
  matchSlugFromTeams,
  slugifyTeamName,
  tryParseMatchSlug,
} from "./lib/laLigaMatchSlug";
export type { LaLigaSectionId } from "./constants/laLigaSections";
