import {
  getMatchDetailBySlug,
  BundesligaMatchDetailScreen,
  tryParseMatchSlug,
} from "@/components/league/bundesliga";
import type { MatchDetailMock } from "@/components/league/bundesliga/mocks/bundesligaMatchDetailMock";
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
      title: `${parsed.homeTeam} vs ${parsed.awayTeam} | Bundesliga | RND Predictions`,
      description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
    };
  }
  return generateApiLeagueMatchMetadata(
    "bundesliga",
    matchId,
    sp.round,
    sp.season,
  );
}

export default async function BundesligaMatchPage({
  params,
  searchParams,
}: Props) {
  const { matchId } = await params;
  const sp = await searchParams;

  const resolved = await resolveApiLeagueMatchPage(
    "bundesliga",
    matchId,
    sp.round,
    sp.season,
  );
  if (resolved === "auth") {
    authRedirectForMatch(
      "bundesliga",
      matchId,
      Number(sp.round),
      parseSeasonYear(sp.season) ?? defaultSeasonYear(),
    );
  }
  if (resolved !== "notfound") {
    return (
      <BundesligaMatchDetailScreen
        detail={resolved.detail as unknown as MatchDetailMock}
        statTargetsApi={resolved.statTargetsApi}
      />
    );
  }

  const detail = getMatchDetailBySlug(matchId);
  if (!detail) notFound();
  return <BundesligaMatchDetailScreen detail={detail} />;
}
