export type LaLigaSectionId = "tabla" | "partidos" | "predicciones";

export const LA_LIGA_SECTIONS: {
  id: LaLigaSectionId;
  label: string;
}[] = [
  { id: "tabla", label: "Tabla" },
  { id: "partidos", label: "Partidos" },
  { id: "predicciones", label: "Predicciones" },
];
