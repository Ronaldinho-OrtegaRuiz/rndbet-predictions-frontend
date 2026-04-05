import { EuropaLeagueScreen } from "@/components/league/europa-league";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Europa League | RND Predictions",
  description: "Predicciones y datos — UEFA Europa League",
};

export default function EuropaLeaguePage() {
  return <EuropaLeagueScreen />;
}
