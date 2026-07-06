import {
  getMatchDetailBySlug,
  Ligue1MatchDetailScreen,
  tryParseMatchSlug,
} from "@/components/league/ligue-1";
import type { MatchDetailMock } from "@/components/league/ligue-1/mocks/ligue1MatchDetailMock";
import {
  authRedirectForMatch,
  generateApiLeagueMatchMetadata,
  resolveApiLeagueMatchPage,
} from "@/lib/leagues/leagueMatchRoute";
import { defaultSeasonYear, parseSeasonYear } from "@/lib/leagues/seasons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ matchId: string }>;
  searchParams: Promise<{ round?: string; season?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { matchId } = await params;
  const sp = await searchParams;
  const parsed = tryParseMatchSlug(matchId);
  if (parsed) {
    return {
      title: `${parsed.homeTeam} vs ${parsed.awayTeam} | Ligue 1 | RND Predictions`,
      description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
    };
  }
  return generateApiLeagueMatchMetadata("ligue-1", matchId, sp.round, sp.season);
}

export default async function Ligue1MatchPage({ params, searchParams }: Props) {
  const { matchId } = await params;
  const sp = await searchParams;

  const resolved = await resolveApiLeagueMatchPage(
    "ligue-1",
    matchId,
    sp.round,
    sp.season,
  );
  if (resolved === "auth") {
    authRedirectForMatch(
      "ligue-1",
      matchId,
      Number(sp.round),
      parseSeasonYear(sp.season) ?? defaultSeasonYear(),
    );
  }
  if (resolved !== "notfound") {
    return (
      <Ligue1MatchDetailScreen
        detail={resolved.detail as unknown as MatchDetailMock}
        statTargetsApi={resolved.statTargetsApi}
      />
    );
  }

  const detail = getMatchDetailBySlug(matchId);
  if (!detail) notFound();
  return <Ligue1MatchDetailScreen detail={detail} />;
}
