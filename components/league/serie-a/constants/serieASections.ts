export type SerieASectionId = "tabla" | "partidos" | "predicciones";

export const SERIE_A_SECTIONS: {
  id: SerieASectionId;
  label: string;
}[] = [
  { id: "tabla", label: "Tabla" },
  { id: "partidos", label: "Partidos" },
  { id: "predicciones", label: "Predicciones" },
];
