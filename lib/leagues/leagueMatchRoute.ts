import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { mapMatchDetailApiToMock } from "@/components/league/premier-league/lib/mapMatchDetailApi";
import type { MatchDetailMock } from "@/components/league/premier-league/mocks/premierLeagueMatchDetailMock";
import { fetchMatchDetailFromBackend } from "@/lib/api/fetch-match-detail";
import type { StatTargetsApiContext } from "@/lib/api/stat-targets-types";
import {
  getLeagueCompetitionId,
  getLeagueConfig,
  resolveSeasonIdForLeague,
  type LeagueSlug,
} from "./config";
import { defaultSeasonYear, parseSeasonYear, type SeasonYear } from "./seasons";

const NUMERIC_ID = /^\d+$/;

export function isNumericMatchId(id: string): boolean {
  return NUMERIC_ID.test(id);
}

function resolveSeasonYearFromParam(seasonParam?: string): SeasonYear {
  return parseSeasonYear(seasonParam) ?? defaultSeasonYear();
}

export async function generateApiLeagueMatchMetadata(
  slug: LeagueSlug,
  matchId: string,
  roundParam?: string,
  seasonParam?: string,
): Promise<Metadata> {
  const cfg = getLeagueConfig(slug);
  if (!isNumericMatchId(matchId)) {
    return { title: `Partido | ${cfg.title} | RND Predictions` };
  }
  const round = Number(roundParam);
  if (!Number.isFinite(round) || round < cfg.roundMin) {
    return { title: `Partido | ${cfg.title} | RND Predictions` };
  }
  const seasonYear = resolveSeasonYearFromParam(seasonParam);
  const seasonId = resolveSeasonIdForLeague(slug, seasonYear);
  const result = await fetchMatchDetailFromBackend(
    getLeagueCompetitionId(slug),
    seasonId,
    round,
    Number(matchId),
  );
  if (result.ok) {
    const d = result.data;
    return {
      title: `${d.equipo_local} vs ${d.equipo_visitante} | ${cfg.title} | RND Predictions`,
      description: `Detalle: ${d.equipo_local} contra ${d.equipo_visitante}.`,
    };
  }
  return { title: `Partido | ${cfg.title} | RND Predictions` };
}

export type ApiMatchPagePayload = {
  detail: MatchDetailMock;
  statTargetsApi: StatTargetsApiContext;
};

export async function resolveApiLeagueMatchPage(
  slug: LeagueSlug,
  matchId: string,
  roundParam?: string,
  seasonParam?: string,
): Promise<ApiMatchPagePayload | "notfound" | "auth"> {
  if (!isNumericMatchId(matchId)) return "notfound";
  const cfg = getLeagueConfig(slug);
  const round = Number(roundParam);
  if (!Number.isFinite(round) || round < cfg.roundMin) return "notfound";

  const seasonYear = resolveSeasonYearFromParam(seasonParam);
  const seasonId = resolveSeasonIdForLeague(slug, seasonYear);

  const result = await fetchMatchDetailFromBackend(
    getLeagueCompetitionId(slug),
    seasonId,
    round,
    Number(matchId),
  );
  if (!result.ok) {
    if (result.status === 401 || result.status === 403) return "auth";
    return "notfound";
  }
  return {
    detail: mapMatchDetailApiToMock(result.data, matchId),
    statTargetsApi: {
      competitionId: getLeagueCompetitionId(slug),
      seasonId,
      round,
      matchId: Number(matchId),
    },
  };
}

export function authRedirectForMatch(
  slug: LeagueSlug,
  matchId: string,
  round: number,
  seasonYear?: SeasonYear,
): never {
  const cfg = getLeagueConfig(slug);
  const season = seasonYear ?? defaultSeasonYear();
  const nextPath = `${cfg.routePrefix}/match/${matchId}?round=${round}&season=${season}`;
  redirect(`/login?next=${encodeURIComponent(nextPath)}`);
}

export function assertApiMatchRound(slug: LeagueSlug, roundParam?: string): number {
  const cfg = getLeagueConfig(slug);
  const round = Number(roundParam);
  if (!Number.isFinite(round) || round < cfg.roundMin) notFound();
  return round;
}
