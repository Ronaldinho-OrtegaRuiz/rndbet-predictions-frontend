import { PremierLeagueScreen } from "@/components/league/premier-league";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premier League | RND Predictions",
  description: "Predicciones y datos — Premier League",
};

export default function PremierLeaguePage() {
  return <PremierLeagueScreen />;
}
