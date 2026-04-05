export type BundesligaSectionId = "tabla" | "partidos" | "predicciones";

export const BUNDESLIGA_SECTIONS: {
  id: BundesligaSectionId;
  label: string;
}[] = [
  { id: "tabla", label: "Tabla" },
  { id: "partidos", label: "Partidos" },
  { id: "predicciones", label: "Predicciones" },
];
