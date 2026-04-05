import {
  getMatchDetailBySlug,
  Ligue1MatchDetailScreen,
  tryParseMatchSlug,
} from "@/components/league/ligue-1";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = tryParseMatchSlug(slug);
  if (!parsed) {
    return { title: "Partido | Ligue 1 | RND Predictions" };
  }
  return {
    title: `${parsed.homeTeam} vs ${parsed.awayTeam} | Ligue 1 | RND Predictions`,
    description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
  };
}

export default async function Ligue1MatchPage({ params }: Props) {
  const { slug } = await params;
  const detail = getMatchDetailBySlug(slug);
  if (!detail) notFound();
  return <Ligue1MatchDetailScreen detail={detail} />;
}
