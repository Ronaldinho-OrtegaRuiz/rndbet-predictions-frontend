import type { PartidoApi } from "@/lib/api/matches-types";
import type { FixtureMatch, FixtureStatus } from "../mocks/premierLeagueMatchdayMock";

export function resolveFixtureStatus(estado: string): FixtureStatus {
  const e = estado.trim().toLowerCase();
  if (
    e.includes("live") ||
    e.includes("playing") ||
    e === "in_progress" ||
    e === "en_curso"
  ) {
    return "live";
  }
  if (
    e.includes("finish") ||
    e === "ft" ||
    e === "ended" ||
    e === "finalizado" ||
    e === "finished"
  ) {
    return "finished";
  }
  return "scheduled";
}

/** Texto en español para el campo `estado` del API (tal cual en BD + variantes habituales). */
export function estadoApiATextoEspanol(estado: string): string {
  const raw = estado.trim();
  if (!raw) return "—";
  const e = raw.toLowerCase().replace(/\s+/g, "_");

  const map: Record<string, string> = {
    finished: "Finalizado",
    finalizado: "Finalizado",
    ft: "Finalizado",
    ended: "Finalizado",
    full_time: "Finalizado",
    fulltime: "Finalizado",
    schedule: "Programado",
    scheduled: "Programado",
    fixture: "Programado",
    programmed: "Programado",
    not_started: "Programado",
    pending: "Programado",
    live: "En vivo",
    in_progress: "En vivo",
    playing: "En vivo",
    en_curso: "En vivo",
    started: "En vivo",
    postponed: "Aplazado",
    delayed: "Aplazado",
    cancelled: "Cancelado",
    canceled: "Cancelado",
    suspended: "Suspendido",
    abandoned: "Abandonado",
    halftime: "Descanso",
    half_time: "Descanso",
    walkover: "Walkover",
  };

  if (map[e]) return map[e];

  return raw
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toLocaleUpperCase("es"));
}

function formatFechaMatch(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("es", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}

function positiveInt(n: unknown): number | undefined {
  if (typeof n !== "number" || !Number.isFinite(n)) return undefined;
  const v = Math.floor(n);
  return v > 0 ? v : undefined;
}

export function mapPartidoApiToFixture(p: PartidoApi): FixtureMatch {
  const status = resolveFixtureStatus(p.estado);
  const gl = p.goles_local;
  const gv = p.goles_visitante;

  return {
    id: String(p.id),
    homeTeam: p.equipo_local,
    awayTeam: p.equipo_visitante,
    logoUrlLocal: p.logo_url_local,
    logoUrlVisitante: p.logo_url_visitante,
    status,
    homeScore: gl ?? undefined,
    awayScore: gv ?? undefined,
    dateLabel:
      p.fecha && status !== "live" ? formatFechaMatch(p.fecha) : undefined,
    estadoLabelEs: estadoApiATextoEspanol(p.estado),
    tarjetasRojasLocal: positiveInt(p.tarjetas_rojas_local),
    tarjetasRojasVisitante: positiveInt(p.tarjetas_rojas_visitante),
  };
}
