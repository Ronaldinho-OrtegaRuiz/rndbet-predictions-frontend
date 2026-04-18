"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  createStatTarget,
  deleteStatTarget,
  fetchStatTargets,
  normalizeTargetRow,
  patchStatTargetThreshold,
} from "@/lib/api/stat-targets-client";
import type {
  ModalApiStat,
  StatTargetsApiContext,
  StatTargetScopeApi,
  StatTargetStateApi,
  UserStatTargetDto,
} from "@/lib/api/stat-targets-types";
import { MODAL_STAT_SPECS } from "@/lib/api/stat-targets-types";
import {
  type DesiredStatsLeagueId,
  getDesiredStatsModalLeagueTheme,
} from "./desiredStatsModalLeagueThemes";

const BUTTON_LABEL = "Estadisticas Deseadas +";
const MODAL_TITLE = "Estadisticas Deseadas";

type ScopeField = "global" | "home" | "away";

const SCOPE_TO_API: Record<ScopeField, StatTargetScopeApi> = {
  global: "GLOBAL",
  home: "HOME",
  away: "AWAY",
};

type Cell = {
  value: string;
  targetId: number | null;
  state: StatTargetStateApi | null;
};

type CellsState = Record<ModalApiStat, Record<ScopeField, Cell>>;

function emptyCells(): CellsState {
  const row = (): Record<ScopeField, Cell> => ({
    global: { value: "", targetId: null, state: null },
    home: { value: "", targetId: null, state: null },
    away: { value: "", targetId: null, state: null },
  });
  const o = {} as CellsState;
  for (const { apiStat } of MODAL_STAT_SPECS) {
    o[apiStat] = row();
  }
  return o;
}

function cloneCells(c: CellsState): CellsState {
  const n = emptyCells();
  for (const { apiStat } of MODAL_STAT_SPECS) {
    for (const sf of ["global", "home", "away"] as const) {
      n[apiStat][sf] = { ...c[apiStat][sf] };
    }
  }
  return n;
}

/** Solo dígitos (enteros no negativos); vacío permitido. */
function sanitizeNonNegativeInteger(raw: string): string {
  if (raw === "") return "";
  return raw.replace(/\D/g, "");
}

function parsePositiveInt(v: string): number | null {
  if (v === "") return null;
  const n = parseInt(v, 10);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function stripBackground(cell: Cell): string {
  const hasTarget = cell.targetId != null;
  const st = cell.state ?? (hasTarget ? "PENDING" : null);
  if (!hasTarget) return "rgba(148, 163, 184, 0.35)";
  if (st === "PENDING") return "#eab308";
  if (st === "FULFILLED") return "#22c55e";
  if (st === "FAILED") return "#ef4444";
  return "rgba(148, 163, 184, 0.35)";
}

type DesiredStatsModalTriggerProps = {
  league: DesiredStatsLeagueId;
  homeTeam: string;
  awayTeam: string;
  accentBackground: string;
  accentForeground: string;
  statTargetsApi?: StatTargetsApiContext | null;
  className?: string;
  buttonStyle?: CSSProperties;
};

export function DesiredStatsModalTrigger({
  league,
  homeTeam,
  awayTeam,
  accentBackground,
  accentForeground,
  statTargetsApi,
  className,
  buttonStyle,
}: DesiredStatsModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const [cells, setCells] = useState<CellsState>(emptyCells);
  const [baseline, setBaseline] = useState<CellsState>(emptyCells);
  const [loadingTargets, setLoadingTargets] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const titleId = useId();
  const theme = getDesiredStatsModalLeagueTheme(league);

  const close = useCallback(() => setOpen(false), []);

  const mergeTargetsIntoCells = useCallback((list: UserStatTargetDto[]) => {
    const next = emptyCells();
    for (const raw of list) {
      const row = normalizeTargetRow(raw);
      if (!row) continue;
      const scopeKey: ScopeField =
        row.scope === "GLOBAL" ? "global" : row.scope === "HOME" ? "home" : "away";
      next[row.stat][scopeKey] = {
        value: String(row.threshold),
        targetId: row.id,
        state: row.state,
      };
    }
    setCells(next);
    setBaseline(cloneCells(next));
  }, []);

  useEffect(() => {
    if (!open || !statTargetsApi) return;
    let cancelled = false;
    setLoadError(null);
    setLoadingTargets(true);
    fetchStatTargets(statTargetsApi)
      .then((list) => {
        if (!cancelled) mergeTargetsIntoCells(list);
      })
      .catch((e: unknown) => {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : "Error al cargar objetivos");
      })
      .finally(() => {
        if (!cancelled) setLoadingTargets(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, statTargetsApi, mergeTargetsIntoCells]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openModal = () => {
    setCells(emptyCells());
    setBaseline(emptyCells());
    setLoadError(null);
    setSaveError(null);
    setOpen(true);
  };

  const setCellValue = (stat: ModalApiStat, scope: ScopeField, raw: string) => {
    const value = sanitizeNonNegativeInteger(raw);
    setCells((prev) => ({
      ...prev,
      [stat]: {
        ...prev[stat],
        [scope]: { ...prev[stat][scope], value },
      },
    }));
  };

  const errBannerClass = useMemo(
    () =>
      league === "la-liga"
        ? "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        : "rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-200",
    [league],
  );

  const infoBannerClass = useMemo(
    () =>
      league === "la-liga"
        ? "rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
        : "rounded-lg border border-amber-500/25 bg-amber-950/30 px-3 py-2 text-sm text-amber-100",
    [league],
  );

  const handleSave = async () => {
    if (!statTargetsApi) return;
    setSaveError(null);
    setSaving(true);
    try {
      type Op =
        | { type: "delete"; id: number }
        | { type: "patch"; id: number; umbral: number }
        | { type: "post"; estadistica: ModalApiStat; ambito: StatTargetScopeApi; umbral: number };

      const ops: Op[] = [];

      for (const { apiStat } of MODAL_STAT_SPECS) {
        for (const scope of ["global", "home", "away"] as const) {
          const c = cells[apiStat][scope];
          const b = baseline[apiStat][scope];
          const want = parsePositiveInt(c.value);
          const baseThr = parsePositiveInt(b.value);

          if (want == null) {
            if (b.targetId != null) ops.push({ type: "delete", id: b.targetId });
            continue;
          }

          if (b.targetId == null) {
            ops.push({
              type: "post",
              estadistica: apiStat,
              ambito: SCOPE_TO_API[scope],
              umbral: want,
            });
            continue;
          }

          if (want === baseThr) continue;

          if (b.state === "FULFILLED" || b.state === "FAILED") {
            throw new Error(
              "Un objetivo ya evaluado no se puede cambiar desde aquí. Solo se pueden editar objetivos en estado pendiente.",
            );
          }

          ops.push({ type: "patch", id: b.targetId, umbral: want });
        }
      }

      const deletes = ops.filter((o): o is Extract<Op, { type: "delete" }> => o.type === "delete");
      const patches = ops.filter((o): o is Extract<Op, { type: "patch" }> => o.type === "patch");
      const posts = ops.filter((o): o is Extract<Op, { type: "post" }> => o.type === "post");

      for (const o of deletes) {
        await deleteStatTarget(statTargetsApi, o.id);
      }
      for (const o of patches) {
        await patchStatTargetThreshold(statTargetsApi, o.id, o.umbral);
      }
      for (const o of posts) {
        await createStatTarget(statTargetsApi, {
          estadistica: o.estadistica,
          ambito: o.ambito,
          umbral: o.umbral,
        });
      }

      const fresh = await fetchStatTargets(statTargetsApi);
      mergeTargetsIntoCells(fresh);
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const renderInput = (stat: ModalApiStat, scope: ScopeField, ariaLabel: string) => {
    const cell = cells[stat][scope];
    const readOnly =
      cell.targetId != null && (cell.state === "FULFILLED" || cell.state === "FAILED");
    return (
      <div className={`flex min-h-0 min-w-0 ${theme.inputShellClass}`}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          readOnly={readOnly}
          className={theme.inputFieldClass}
          value={cell.value}
          onChange={(e) => setCellValue(stat, scope, e.target.value)}
          placeholder="—"
          aria-label={ariaLabel}
        />
        <div
          className="w-2 shrink-0 self-stretch sm:w-2.5"
          style={{ backgroundColor: stripBackground(cell) }}
          aria-hidden
        />
      </div>
    );
  };

  const modal =
    open ? (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-5 sm:p-6" role="presentation">
        <button
          type="button"
          className={`absolute inset-0 ${theme.overlayClass}`}
          aria-label="Cerrar"
          onClick={close}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={theme.panelClass}
        >
          <div className="flex items-start justify-between gap-4 sm:gap-5">
            <h2 id={titleId} className={`min-w-0 flex-1 pr-2 ${theme.titleClass}`}>
              {MODAL_TITLE}
            </h2>
            <button type="button" className={theme.closeButtonClass} onClick={close} aria-label="Cerrar">
              <span className="block translate-y-px" aria-hidden>
                ×
              </span>
            </button>
          </div>

          {!statTargetsApi ? (
            <p className={`mt-4 ${infoBannerClass}`}>
              Los objetivos de estadística solo están disponibles en partidos cargados desde el servidor con
              sesión iniciada.
            </p>
          ) : null}

          {loadError ? <p className={`mt-4 ${errBannerClass}`}>{loadError}</p> : null}
          {saveError ? <p className={`mt-4 ${errBannerClass}`}>{saveError}</p> : null}

          <div className={theme.tableWrapClass}>
            {loadingTargets ? (
              <p className={`py-8 text-center text-sm sm:text-base ${theme.titleClass}`}>Cargando…</p>
            ) : (
              <table className={theme.tableClass}>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "26.67%" }} />
                  <col style={{ width: "26.67%" }} />
                  <col style={{ width: "26.66%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className={theme.thClass}>Estadistica</th>
                    <th className={theme.thClass}>Global</th>
                    <th className={theme.thClass} title={homeTeam}>
                      <span className="line-clamp-2 break-words">{homeTeam}</span>
                    </th>
                    <th className={`${theme.thClass} last:pr-0`} title={awayTeam}>
                      <span className="line-clamp-2 break-words">{awayTeam}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MODAL_STAT_SPECS.map(({ apiStat, label }) => (
                    <tr key={apiStat}>
                      <td className={theme.labelCellClass}>{label}</td>
                      <td className={theme.labelCellClass}>
                        {renderInput(apiStat, "global", `${label}, Global`)}
                      </td>
                      <td className={theme.labelCellClass}>
                        {renderInput(apiStat, "home", `${label}, ${homeTeam}`)}
                      </td>
                      <td className={`${theme.labelCellClass} last:pr-0`}>
                        {renderInput(apiStat, "away", `${label}, ${awayTeam}`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 sm:mt-9 sm:gap-4">
            <button type="button" className={theme.cancelButtonClass} onClick={close} disabled={saving}>
              Cancelar
            </button>
            <button
              type="button"
              className="rounded-full px-6 py-2.5 text-sm font-bold shadow-sm transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:px-7 sm:py-3 sm:text-base"
              style={{ backgroundColor: accentBackground, color: accentForeground }}
              disabled={!statTargetsApi || loadingTargets || saving}
              onClick={() => void handleSave()}
            >
              {saving ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        className={`rounded-full px-4 py-2 text-xs font-bold shadow-sm transition-opacity hover:opacity-90 sm:text-sm${className ? ` ${className}` : ""}`}
        style={{ backgroundColor: accentBackground, color: accentForeground, ...buttonStyle }}
        onClick={openModal}
      >
        {BUTTON_LABEL}
      </button>
      {typeof document !== "undefined" && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
