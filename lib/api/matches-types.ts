/** Partido tal como viene del API (campos opcionales si el backend omite nulls). */
export type PartidoApi = {
  id: number | string;
  fecha?: string | null;
  estado: string;
  equipo_local: string;
  equipo_visitante: string;
  /** Omitidos si null. */
  logo_url_local?: string;
  logo_url_visitante?: string;
  goles_local?: number | null;
  goles_visitante?: number | null;
  tarjetas_rojas_local?: number | null;
  tarjetas_rojas_visitante?: number | null;
};

export type RoundMatchesResponse = {
  jornada?: number;
  temporada_completada?: boolean;
  partidos?: PartidoApi[] | null;
};
