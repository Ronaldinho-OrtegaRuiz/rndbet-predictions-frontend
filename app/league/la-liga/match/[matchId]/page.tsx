import {
  getMatchDetailBySlug,
  LaLigaMatchDetailScreen,
  tryParseMatchSlug,
} from "@/components/league/la-liga";
import type { MatchDetailMock } from "@/components/league/la-liga/mocks/laLigaMatchDetailMock";
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
      title: `${parsed.homeTeam} vs ${parsed.awayTeam} | La Liga | RND Predictions`,
      description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
    };
  }
  return generateApiLeagueMatchMetadata("la-liga", matchId, sp.round, sp.season);
}

export default async function LaLigaMatchPage({ params, searchParams }: Props) {
  const { matchId } = await params;
  const sp = await searchParams;

  const resolved = await resolveApiLeagueMatchPage(
    "la-liga",
    matchId,
    sp.round,
    sp.season,
  );
  if (resolved === "auth") {
    authRedirectForMatch(
      "la-liga",
      matchId,
      Number(sp.round),
      parseSeasonYear(sp.season) ?? defaultSeasonYear(),
    );
  }
  if (resolved !== "notfound") {
    return (
      <LaLigaMatchDetailScreen
        detail={resolved.detail as unknown as MatchDetailMock}
        statTargetsApi={resolved.statTargetsApi}
      />
    );
  }

  const detail = getMatchDetailBySlug(matchId);
  if (!detail) notFound();
  return <LaLigaMatchDetailScreen detail={detail} />;
}
