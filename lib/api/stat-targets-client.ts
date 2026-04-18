import { clientApiFetch } from "@/lib/api/client-fetch";
import { parseProblemDetails } from "@/lib/api/parse-problem-details";
import type {
  ModalApiStat,
  StatTargetScopeApi,
  StatTargetsApiContext,
  StatTargetStateApi,
  UserStatTargetDto,
} from "@/lib/api/stat-targets-types";
import { isModalApiStat } from "@/lib/api/stat-targets-types";

function statTargetsCollectionPath(ctx: StatTargetsApiContext): string {
  return `/spring-api/v1/competitions/${ctx.competitionId}/seasons/${ctx.seasonId}/rounds/${ctx.round}/matches/${ctx.matchId}/stat-targets`;
}

function statTargetItemPath(ctx: StatTargetsApiContext, targetId: number): string {
  return `${statTargetsCollectionPath(ctx)}/${targetId}`;
}

function normalizeStat(t: UserStatTargetDto): string {
  const raw = (t.estadistica ?? t.stat ?? "").toString().trim().toLowerCase();
  return raw.replace(/-/g, "_");
}

function normalizeScope(t: UserStatTargetDto): StatTargetScopeApi | null {
  const raw = (t.ambito ?? t.scope ?? "").toString().trim().toUpperCase();
  if (raw === "GLOBAL" || raw === "HOME" || raw === "AWAY") return raw;
  return null;
}

function normalizeState(t: UserStatTargetDto): StatTargetStateApi | null {
  const raw = (t.estado ?? t.state ?? "").toString().trim().toUpperCase();
  if (raw === "PENDING" || raw === "FULFILLED" || raw === "FAILED") return raw;
  return null;
}

function thresholdOf(t: UserStatTargetDto): number | null {
  const u = t.umbral ?? t.threshold;
  if (typeof u === "number" && Number.isFinite(u)) return u;
  return null;
}

export function parseStatTargetsList(data: unknown): UserStatTargetDto[] {
  if (Array.isArray(data)) return data as UserStatTargetDto[];
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    for (const k of ["targets", "data", "objetivos", "items"]) {
      const v = o[k];
      if (Array.isArray(v)) return v as UserStatTargetDto[];
    }
  }
  return [];
}

export async function fetchStatTargets(ctx: StatTargetsApiContext): Promise<UserStatTargetDto[]> {
  const res = await clientApiFetch(statTargetsCollectionPath(ctx));
  if (!res.ok) {
    const p = await parseProblemDetails(res);
    throw new Error(p?.detail ?? `Error ${res.status} al cargar objetivos`);
  }
  const data: unknown = await res.json();
  return parseStatTargetsList(data);
}

export async function createStatTarget(
  ctx: StatTargetsApiContext,
  body: { estadistica: ModalApiStat; ambito: StatTargetScopeApi; umbral: number },
): Promise<UserStatTargetDto> {
  const res = await clientApiFetch(statTargetsCollectionPath(ctx), {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const p = await parseProblemDetails(res);
    throw new Error(p?.detail ?? `Error ${res.status} al crear objetivo`);
  }
  const text = await res.text();
  if (!text.trim()) return {};
  try {
    const data: unknown = JSON.parse(text);
    if (data && typeof data === "object") return data as UserStatTargetDto;
  } catch {
    /* ignore */
  }
  return {};
}

export async function patchStatTargetThreshold(
  ctx: StatTargetsApiContext,
  targetId: number,
  umbral: number,
): Promise<void> {
  const res = await clientApiFetch(statTargetItemPath(ctx, targetId), {
    method: "PATCH",
    body: JSON.stringify({ umbral }),
  });
  if (!res.ok) {
    const p = await parseProblemDetails(res);
    throw new Error(p?.detail ?? `Error ${res.status} al actualizar objetivo`);
  }
}

export async function deleteStatTarget(ctx: StatTargetsApiContext, targetId: number): Promise<void> {
  const res = await clientApiFetch(statTargetItemPath(ctx, targetId), { method: "DELETE" });
  if (!res.ok) {
    const p = await parseProblemDetails(res);
    throw new Error(p?.detail ?? `Error ${res.status} al eliminar objetivo`);
  }
}

export type NormalizedStatTarget = {
  id: number;
  stat: ModalApiStat;
  scope: StatTargetScopeApi;
  threshold: number;
  state: StatTargetStateApi | null;
};

export function normalizeTargetRow(t: UserStatTargetDto): NormalizedStatTarget | null {
  const id = typeof t.id === "number" && Number.isFinite(t.id) ? t.id : null;
  if (id == null) return null;
  const statRaw = normalizeStat(t);
  if (!statRaw || !isModalApiStat(statRaw)) return null;
  const stat = statRaw;
  const scope = normalizeScope(t);
  if (!scope) return null;
  const th = thresholdOf(t);
  if (th == null || !Number.isFinite(th)) return null;
  return {
    id,
    stat,
    scope,
    threshold: Math.trunc(th),
    state: normalizeState(t),
  };
}
