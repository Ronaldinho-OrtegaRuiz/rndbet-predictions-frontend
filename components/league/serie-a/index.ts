export { SerieAScreen } from "./SerieAScreen";
export { SerieAMatchDetailScreen } from "./match/SerieAMatchDetailScreen";
export { getMatchDetailBySlug } from "./mocks/serieAMatchDetailMock";
export type {
  MatchDetailMock,
  MatchEventMock,
  PredictionEvaluationMock,
  PredictionRowMock,
  TeamMatchStatsMock,
} from "./mocks/serieAMatchDetailMock";
export {
  matchSlugFromTeams,
  slugifyTeamName,
  tryParseMatchSlug,
} from "./lib/serieAMatchSlug";
export type { SerieASectionId } from "./constants/serieASections";
