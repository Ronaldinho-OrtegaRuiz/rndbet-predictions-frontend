export type Ligue1SectionId = "tabla" | "partidos" | "predicciones";

export const LIGUE1_SECTIONS: {
  id: Ligue1SectionId;
  label: string;
}[] = [
  { id: "tabla", label: "Tabla" },
  { id: "partidos", label: "Partidos" },
  { id: "predicciones", label: "Predicciones" },
];
