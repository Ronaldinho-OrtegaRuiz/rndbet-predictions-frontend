import { ChampionsLeagueScreen } from "@/components/league/champions-league";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Champions League | RND Predictions",
  description: "Predicciones y datos — UEFA Champions League",
};

export default function ChampionsLeaguePage() {
  return <ChampionsLeagueScreen />;
}
