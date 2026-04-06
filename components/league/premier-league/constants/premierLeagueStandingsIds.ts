/** IDs del backend (competitions.id / seasons.id). Configurar con NEXT_PUBLIC_EPL_COMPETITION_ID y NEXT_PUBLIC_EPL_SEASON_ID. */
export const PREMIER_LEAGUE_COMPETITION_ID = Number(
  process.env.NEXT_PUBLIC_EPL_COMPETITION_ID ?? 1,
);

export const PREMIER_LEAGUE_SEASON_ID = Number(
  process.env.NEXT_PUBLIC_EPL_SEASON_ID ?? 1,
);
