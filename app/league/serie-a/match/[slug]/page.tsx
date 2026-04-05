import {
  getMatchDetailBySlug,
  SerieAMatchDetailScreen,
  tryParseMatchSlug,
} from "@/components/league/serie-a";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = tryParseMatchSlug(slug);
  if (!parsed) {
    return { title: "Partido | Serie A | RND Predictions" };
  }
  return {
    title: `${parsed.homeTeam} vs ${parsed.awayTeam} | Serie A | RND Predictions`,
    description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
  };
}

export default async function SerieAMatchPage({ params }: Props) {
  const { slug } = await params;
  const detail = getMatchDetailBySlug(slug);
  if (!detail) notFound();
  return <SerieAMatchDetailScreen detail={detail} />;
}
