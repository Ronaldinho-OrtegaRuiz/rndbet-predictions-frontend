import {
  getMatchDetailBySlug,
  SerieAMatchDetailScreen,
  tryParseMatchSlug,
} from "@/components/league/serie-a";
import type { MatchDetailMock } from "@/components/league/serie-a/mocks/serieAMatchDetailMock";
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
      title: `${parsed.homeTeam} vs ${parsed.awayTeam} | Serie A | RND Predictions`,
      description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
    };
  }
  return generateApiLeagueMatchMetadata("serie-a", matchId, sp.round, sp.season);
}

export default async function SerieAMatchPage({ params, searchParams }: Props) {
  const { matchId } = await params;
  const sp = await searchParams;

  const resolved = await resolveApiLeagueMatchPage(
    "serie-a",
    matchId,
    sp.round,
    sp.season,
  );
  if (resolved === "auth") {
    authRedirectForMatch(
      "serie-a",
      matchId,
      Number(sp.round),
      parseSeasonYear(sp.season) ?? defaultSeasonYear(),
    );
  }
  if (resolved !== "notfound") {
    return (
      <SerieAMatchDetailScreen
        detail={resolved.detail as unknown as MatchDetailMock}
        statTargetsApi={resolved.statTargetsApi}
      />
    );
  }

  const detail = getMatchDetailBySlug(matchId);
  if (!detail) notFound();
  return <SerieAMatchDetailScreen detail={detail} />;
}
