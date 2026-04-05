import {
  getMatchDetailBySlug,
  PremierLeagueMatchDetailScreen,
  tryParseMatchSlug,
} from "@/components/league/premier-league";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = tryParseMatchSlug(slug);
  if (!parsed) {
    return { title: "Partido | Premier League | RND Predictions" };
  }
  return {
    title: `${parsed.homeTeam} vs ${parsed.awayTeam} | Premier League | RND Predictions`,
    description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
  };
}

export default async function PremierLeagueMatchPage({ params }: Props) {
  const { slug } = await params;
  const detail = getMatchDetailBySlug(slug);
  if (!detail) notFound();
  return <PremierLeagueMatchDetailScreen detail={detail} />;
}
