import {
  getMatchDetailBySlug,
  LaLigaMatchDetailScreen,
  tryParseMatchSlug,
} from "@/components/league/la-liga";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = tryParseMatchSlug(slug);
  if (!parsed) {
    return { title: "Partido | La Liga | RND Predictions" };
  }
  return {
    title: `${parsed.homeTeam} vs ${parsed.awayTeam} | La Liga | RND Predictions`,
    description: `Detalle del partido ${parsed.homeTeam} contra ${parsed.awayTeam}.`,
  };
}

export default async function LaLigaMatchPage({ params }: Props) {
  const { slug } = await params;
  const detail = getMatchDetailBySlug(slug);
  if (!detail) notFound();
  return <LaLigaMatchDetailScreen detail={detail} />;
}
