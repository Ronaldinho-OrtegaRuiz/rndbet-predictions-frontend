import { Ligue1Screen } from "@/components/league/ligue-1";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ligue 1 | RND Predictions",
  description: "Predicciones y datos — Ligue 1",
};

export default function Ligue1Page() {
  return <Ligue1Screen />;
}
