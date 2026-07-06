import {
  defaultSeasonYear,
  seasonIdForCompetition,
  type SeasonYear,
} from "./seasons";

export type LeagueSlug =
  | "premier-league"
  | "la-liga"
  | "serie-a"
  | "bundesliga"
  | "ligue-1"
  | "champions-league"
  | "europa-league";

export type LeagueApiConfig = {
  slug: LeagueSlug;
  title: string;
  competitionId: number;
  /** Jornada/fase mínima (0 en Champions League). */
  roundMin: number;
  /** Jornada/fase máxima inclusive. */
  maxRound: number;
  routePrefix: string;
  hasBackendData: boolean;
  /** Etiqueta en UI del selector de jornada. */
  roundLabel: "jornada" | "fase";
  /** Env opcional: NEXT_PUBLIC_{KEY}_SEASON_ID */
  seasonEnvKey?: string;
};

export const LEAGUES: Record<LeagueSlug, LeagueApiConfig> = {
  "premier-league": {
    slug: "premier-league",
    title: "Premier League",
    competitionId: 1,
    roundMin: 1,
    maxRound: 38,
    routePrefix: "/league/premier-league",
    hasBackendData: true,
    roundLabel: "jornada",
    seasonEnvKey: "EPL",
  },
  "la-liga": {
    slug: "la-liga",
    title: "La Liga",
    competitionId: 2,
    roundMin: 1,
    maxRound: 38,
    routePrefix: "/league/la-liga",
    hasBackendData: true,
    roundLabel: "jornada",
    seasonEnvKey: "LALIGA",
  },
  "serie-a": {
    slug: "serie-a",
    title: "Serie A",
    competitionId: 3,
    roundMin: 1,
    maxRound: 38,
    routePrefix: "/league/serie-a",
    hasBackendData: true,
    roundLabel: "jornada",
    seasonEnvKey: "SERIE_A",
  },
  bundesliga: {
    slug: "bundesliga",
    title: "Bundesliga",
    competitionId: 4,
    roundMin: 1,
    maxRound: 34,
    routePrefix: "/league/bundesliga",
    hasBackendData: true,
    roundLabel: "jornada",
    seasonEnvKey: "BUNDESLIGA",
  },
  "ligue-1": {
    slug: "ligue-1",
    title: "Ligue 1",
    competitionId: 5,
    roundMin: 1,
    maxRound: 34,
    routePrefix: "/league/ligue-1",
    hasBackendData: true,
    roundLabel: "jornada",
    seasonEnvKey: "LIGUE_1",
  },
  "champions-league": {
    slug: "champions-league",
    title: "Champions League",
    competitionId: 6,
    roundMin: 0,
    maxRound: 8,
    routePrefix: "/league/champions-league",
    hasBackendData: true,
    roundLabel: "fase",
    seasonEnvKey: "CL",
  },
  "europa-league": {
    slug: "europa-league",
    title: "Europa League",
    competitionId: 0,
    roundMin: 1,
    maxRound: 0,
    routePrefix: "/league/europa-league",
    hasBackendData: false,
    roundLabel: "jornada",
  },
};

export function getLeagueConfig(slug: LeagueSlug): LeagueApiConfig {
  return LEAGUES[slug];
}

function readSeasonEnvOverride(envKey: string | undefined): number | undefined {
  if (!envKey) return undefined;
  const raw =
    envKey === "EPL"
      ? process.env.NEXT_PUBLIC_EPL_SEASON_ID
      : process.env[`NEXT_PUBLIC_${envKey}_SEASON_ID`];
  if (raw == null || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** Resuelve `seasonId` para una liga (env override → mapa año → fallback 2024). */
export function getLeagueSeasonId(
  slug: LeagueSlug,
  year: SeasonYear = defaultSeasonYear(),
): number {
  const cfg = getLeagueConfig(slug);
  const fromEnv = readSeasonEnvOverride(cfg.seasonEnvKey);
  if (fromEnv != null) return fromEnv;
  const fromMap = seasonIdForCompetition(cfg.competitionId, year);
  if (fromMap != null) return fromMap;
  return seasonIdForCompetition(cfg.competitionId, 2024) ?? 1;
}

export function getLeagueCompetitionId(slug: LeagueSlug): number {
  const envOverride =
    slug === "premier-league"
      ? Number(process.env.NEXT_PUBLIC_EPL_COMPETITION_ID ?? 1)
      : getLeagueConfig(slug).competitionId;
  return Number.isFinite(envOverride) ? envOverride : getLeagueConfig(slug).competitionId;
}

/** `seasonId` de BD para una liga y año (sin override de env). */
export function resolveSeasonIdForLeague(
  slug: LeagueSlug,
  year: SeasonYear,
): number {
  const cfg = getLeagueConfig(slug);
  const fromMap = seasonIdForCompetition(cfg.competitionId, year);
  if (fromMap != null) return fromMap;
  return seasonIdForCompetition(cfg.competitionId, 2024) ?? 1;
}
