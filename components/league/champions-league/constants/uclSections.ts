export type UclSectionId = "tabla" | "partidos" | "predicciones";

export const UCL_SECTIONS: {
  id: UclSectionId;
  label: string;
}[] = [
  { id: "tabla", label: "Tabla" },
  { id: "partidos", label: "Partidos" },
  { id: "predicciones", label: "Predicciones" },
];
