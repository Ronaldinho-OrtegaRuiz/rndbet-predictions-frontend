/** Contexto de ruta Spring para objetivos de estadística del usuario en un partido. */
export type StatTargetsApiContext = {
  competitionId: number;
  seasonId: number;
  round: number;
  matchId: number;
};

/** Valores de `stat` / `estadistica` admitidos en el modal (alineado a `team_match_stats`, sin posesión). */
export const MODAL_STAT_SPECS = [
  { apiStat: "goals", label: "Goles" },
  { apiStat: "shots", label: "Tiros" },
  { apiStat: "shots_on_target", label: "A puerta" },
  { apiStat: "saves", label: "Paradas" },
  { apiStat: "yellow_cards", label: "Amarillas" },
  { apiStat: "red_cards", label: "Rojas" },
  { apiStat: "corners", label: "Córners" },
  { apiStat: "fouls", label: "Faltas" },
  { apiStat: "offsides", label: "Fuera de juego" },
] as const;

export type ModalApiStat = (typeof MODAL_STAT_SPECS)[number]["apiStat"];

export type StatTargetScopeApi = "GLOBAL" | "HOME" | "AWAY";

export type StatTargetStateApi = "PENDING" | "FULFILLED" | "FAILED";

export type UserStatTargetDto = {
  id?: number;
  estadistica?: string;
  stat?: string;
  ambito?: string;
  scope?: string;
  umbral?: number;
  threshold?: number;
  estado?: string;
  state?: string;
};

export function isModalApiStat(s: string): s is ModalApiStat {
  return (MODAL_STAT_SPECS as readonly { apiStat: string }[]).some((r) => r.apiStat === s);
}
