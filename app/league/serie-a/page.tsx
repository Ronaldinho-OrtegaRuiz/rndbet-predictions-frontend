import { SerieAScreen } from "@/components/league/serie-a";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serie A | RND Predictions",
  description: "Predicciones y datos — Serie A",
};

export default function SerieAPage() {
  return <SerieAScreen />;
}
