export type UelSectionId = "tabla" | "partidos" | "predicciones";

export const UEL_SECTIONS: {
  id: UelSectionId;
  label: string;
}[] = [
  { id: "tabla", label: "Tabla" },
  { id: "partidos", label: "Partidos" },
  { id: "predicciones", label: "Predicciones" },
];
