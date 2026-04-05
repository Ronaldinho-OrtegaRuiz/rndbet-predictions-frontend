import { BundesligaScreen } from "@/components/league/bundesliga";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bundesliga | RND Predictions",
  description: "Predicciones y datos — Bundesliga",
};

export default function BundesligaPage() {
  return <BundesligaScreen />;
}
