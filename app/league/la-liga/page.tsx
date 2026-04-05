import { LaLigaScreen } from "@/components/league/la-liga";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Liga | RND Predictions",
  description: "Predicciones y datos — La Liga",
};

export default function LaLigaPage() {
  return <LaLigaScreen />;
}
