import {
  ChampionsLeagueMatchDetailScreen,
  getMatchDetailBySlug,
  tryParseMatchSlug,
} from "@/components/league/champions-league";
import type { MatchDetailMock } from "@/components/league/champions-league/mocks/uclMatchDetailMock";
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
      title: `${parsed.homeTeam} vs ${parsed.awayTeam} | Champions League | RND Predictions`,
      description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
    };
  }
  return generateApiLeagueMatchMetadata(
    "champions-league",
    matchId,
    sp.round,
    sp.season,
  );
}

export default async function ChampionsLeagueMatchPage({
  params,
  searchParams,
}: Props) {
  const { matchId } = await params;
  const sp = await searchParams;

  const resolved = await resolveApiLeagueMatchPage(
    "champions-league",
    matchId,
    sp.round,
    sp.season,
  );
  if (resolved === "auth") {
    authRedirectForMatch(
      "champions-league",
      matchId,
      Number(sp.round),
      parseSeasonYear(sp.season) ?? defaultSeasonYear(),
    );
  }
  if (resolved !== "notfound") {
    return (
      <ChampionsLeagueMatchDetailScreen
        detail={resolved.detail as unknown as MatchDetailMock}
        statTargetsApi={resolved.statTargetsApi}
      />
    );
  }

  const detail = getMatchDetailBySlug(matchId);
  if (!detail) notFound();
  return <ChampionsLeagueMatchDetailScreen detail={detail} />;
}
