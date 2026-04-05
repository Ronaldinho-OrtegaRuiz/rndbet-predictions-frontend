export type PremierLeagueSectionId = "tabla" | "partidos" | "predicciones";

export const PREMIER_LEAGUE_SECTIONS: {
  id: PremierLeagueSectionId;
  label: string;
}[] = [
  { id: "tabla", label: "Tabla" },
  { id: "partidos", label: "Partidos" },
  { id: "predicciones", label: "Predicciones" },
];
