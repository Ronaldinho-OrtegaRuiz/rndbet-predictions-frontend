import {
  getMatchDetailBySlug,
  PremierLeagueMatchDetailScreen,
  tryParseMatchSlug,
} from "@/components/league/premier-league";
import { PREMIER_LEAGUE_COMPETITION_ID, PREMIER_LEAGUE_SEASON_ID } from "@/components/league/premier-league/constants/premierLeagueStandingsIds";
import { mapMatchDetailApiToMock } from "@/components/league/premier-league/lib/mapMatchDetailApi";
import { fetchMatchDetailFromBackend } from "@/lib/api/fetch-match-detail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ matchId: string }>;
  searchParams: Promise<{ round?: string }>;
};

const NUMERIC_ID = /^\d+$/;

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { matchId } = await params;
  const sp = await searchParams;

  if (NUMERIC_ID.test(matchId)) {
    const round = Number(sp.round);
    if (Number.isFinite(round) && round >= 1) {
      const result = await fetchMatchDetailFromBackend(
        PREMIER_LEAGUE_COMPETITION_ID,
        PREMIER_LEAGUE_SEASON_ID,
        round,
        Number(matchId),
      );
      if (result.ok) {
        const d = result.data;
        return {
          title: `${d.equipo_local} vs ${d.equipo_visitante} | Premier League | RND Predictions`,
          description: `Detalle: ${d.equipo_local} contra ${d.equipo_visitante}.`,
        };
      }
    }
    return { title: "Partido | Premier League | RND Predictions" };
  }

  const parsed = tryParseMatchSlug(matchId);
  if (!parsed) {
    return { title: "Partido | Premier League | RND Predictions" };
  }
  return {
    title: `${parsed.homeTeam} vs ${parsed.awayTeam} | Premier League | RND Predictions`,
    description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
  };
}

export default async function PremierLeagueMatchPage({ params, searchParams }: Props) {
  const { matchId } = await params;
  const sp = await searchParams;

  if (NUMERIC_ID.test(matchId)) {
    const round = Number(sp.round);
    if (!Number.isFinite(round) || round < 1) {
      notFound();
    }
    const result = await fetchMatchDetailFromBackend(
      PREMIER_LEAGUE_COMPETITION_ID,
      PREMIER_LEAGUE_SEASON_ID,
      round,
      Number(matchId),
    );
    if (!result.ok) {
      notFound();
    }
    const detail = mapMatchDetailApiToMock(result.data, matchId);
    return <PremierLeagueMatchDetailScreen detail={detail} />;
  }

  const detail = getMatchDetailBySlug(matchId);
  if (!detail) notFound();
  return <PremierLeagueMatchDetailScreen detail={detail} />;
}
