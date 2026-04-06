export type FormaLetra = "V" | "E" | "P";

export type FilaTabla = {
  posicion: number;
  equipo_id: number;
  equipo: string;
  /** Omitido por Jackson si es null en BD. */
  logo_url?: string;
  partidos_jugados: number;
  partidos_ganados: number;
  partidos_empatados: number;
  partidos_perdidos: number;
  goles_a_favor: number;
  goles_en_contra: number;
  diferencia_goles: number;
  puntos: number;
  forma: FormaLetra[];
};

export type TablaResponse = { tabla: FilaTabla[] };

export type ProblemDetails = {
  status?: number;
  title?: string;
  detail?: string;
};
