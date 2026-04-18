"use client";

import { useState } from "react";
import { DesiredStatsModalTrigger } from "@/components/match/DesiredStatsModalTrigger";
import {
  UEL_BG_DEEP,
  UEL_BG_SURFACE,
  UEL_BORDER,
  uelAccentMuted,
  uelAccentOrange,
} from "../constants/uelTheme";
import type {
  MatchDetailMock,
  MatchEventMock,
  PredictionEvaluationMock,
  PredictionRowMock,
  TeamMatchStatsMock,
} from "../mocks/uelMatchDetailMock";

function LogoSlot({ label }: { label: string }) {
  return (
    <span
      className="flex size-14 shrink-0 items-center justify-center rounded-xl border shadow-sm sm:size-16 md:size-[4.5rem]"
      style={{
        borderColor: UEL_BORDER,
        backgroundColor: UEL_BG_SURFACE,
      }}
      aria-hidden
      title={label}
    />
  );
}

function pct(n: number | null | undefined) {
  if (n == null) return "—";
  return `${Math.round(n * 100)}%`;
}

function eventLabel(type: string | null) {
  switch (type) {
    case "goal":
      return "Gol";
    case "yellow_card":
      return "Tarjeta amarilla";
    case "red_card":
      return "Tarjeta roja";
    case "substitution":
      return "Cambio";
    case "corner":
      return "Córner";
    case "kickoff":
      return "Inicio";
    case "halftime":
      return "Descanso";
    case "fulltime":
      return "Final";
    default:
      return type ?? "Evento";
  }
}

function formatExtra(extra: Record<string, unknown> | null, type: string | null) {
  if (!extra) return null;
  if (type === "substitution") {
    const off = extra.off;
    const on = extra.on;
    if (typeof off === "string" && typeof on === "string") return `${off} → ${on}`;
    return null;
  }
  if (type === "goal" && typeof extra.assist === "string") {
    return `Asistencia: ${extra.assist}`;
  }
  if (type === "kickoff" && typeof extra.note === "string") return extra.note;
  if (type === "fulltime" && typeof extra.score === "string") return `Marcador ${extra.score}`;
  return null;
}

function Timeline({ events, homeTeam, awayTeam }: { events: MatchEventMock[]; homeTeam: string; awayTeam: string }) {
  const sorted = [...events].sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0));

  if (sorted.length === 0) {
    return (
      <div
        className="rounded-2xl border p-4 text-sm text-[#f5f5f7]/65 sm:p-5"
        style={{ borderColor: UEL_BORDER, backgroundColor: UEL_BG_SURFACE }}
      >
        No hay eventos en el mock para este partido. Con el back, aquí aparecerá la línea de tiempo desde{" "}
        <code className="text-[#f5f5f7]/90">match_events</code>.
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border p-4 shadow-sm sm:p-5"
      style={{ borderColor: UEL_BORDER, backgroundColor: UEL_BG_SURFACE }}
    >
      <h3 className="mb-4 text-sm font-bold text-[#f5f5f7] sm:text-base">Eventos</h3>
      <div className="relative pl-8">
        <span
          className="absolute bottom-2 left-[0.65rem] top-2 w-px"
          style={{ backgroundColor: UEL_BORDER }}
          aria-hidden
        />
        <ul className="m-0 list-none p-0">
        {sorted.map((ev) => {
          const team = ev.side === "home" ? homeTeam : awayTeam;
          const sub = formatExtra(ev.extra_data, ev.event_type);
          return (
            <li key={ev.id} className="relative pb-6 last:pb-0">
              <span
                className="absolute left-0 top-1.5 flex size-5 items-center justify-center rounded-full border-2 shadow-sm sm:top-2"
                style={{
                  borderColor: UEL_BG_SURFACE,
                  backgroundColor:
                    ev.side === "home" ? `${uelAccentOrange}99` : uelAccentMuted,
                }}
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-xs font-bold tabular-nums text-[#f5f5f7]/50 sm:text-sm">
                  {ev.minute != null ? `${ev.minute}'` : "—"}
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-[#f5f5f7]/80 sm:text-sm">
                  {eventLabel(ev.event_type)}
                </span>
                <span className="text-[11px] text-[#f5f5f7]/55 sm:text-xs">· {team}</span>
              </div>
              {ev.playerLabel ? (
                <p className="mt-1 text-sm font-medium text-[#f5f5f7]">{ev.playerLabel}</p>
              ) : null}
              {sub ? <p className="mt-0.5 text-xs text-[#f5f5f7]/65">{sub}</p> : null}
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}

const STAT_ROWS: { key: keyof TeamMatchStatsMock; label: string; format?: "pct" | "int" }[] = [
  { key: "possession", label: "Posesión", format: "pct" },
  { key: "shots", label: "Tiros", format: "int" },
  { key: "shots_on_target", label: "A puerta", format: "int" },
  { key: "saves", label: "Paradas", format: "int" },
  { key: "yellow_cards", label: "Amarillas", format: "int" },
  { key: "red_cards", label: "Rojas", format: "int" },
  { key: "corners", label: "Córners", format: "int" },
  { key: "fouls", label: "Faltas", format: "int" },
  { key: "offsides", label: "Fueras de juego", format: "int" },
];

function formatStatValue(v: number | null | undefined, format?: "pct" | "int") {
  if (v == null) return "—";
  if (format === "pct") return `${v}%`;
  return String(v);
}

function StatsCompare({ home, away }: { home: TeamMatchStatsMock; away: TeamMatchStatsMock }) {
  return (
    <div className="space-y-1">
      <div className="mb-3 grid grid-cols-[1fr_auto_1fr] gap-2 text-center text-xs font-bold text-[#f5f5f7]/50 sm:text-sm">
        <span className="truncate text-right text-[#f5f5f7]">{home.teamName}</span>
        <span className="shrink-0 px-1" />
        <span className="truncate text-left text-[#f5f5f7]">{away.teamName}</span>
      </div>
      {STAT_ROWS.map(({ key, label, format }) => {
        const hv = home[key];
        const av = away[key];
        const hn = typeof hv === "number" ? hv : null;
        const an = typeof av === "number" ? av : null;
        const max = Math.max(hn ?? 0, an ?? 0, 1);
        const hw = max ? ((hn ?? 0) / max) * 100 : 50;
        const aw = max ? ((an ?? 0) / max) * 100 : 50;
        return (
          <div
            key={String(key)}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-1 rounded-lg border px-2 py-2 sm:px-3"
            style={{ borderColor: UEL_BORDER, backgroundColor: UEL_BG_DEEP }}
          >
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold tabular-nums text-[#f5f5f7] sm:text-base">
                {formatStatValue(hn, format)}
              </span>
              <div
                className="h-1 w-full max-w-[6rem] overflow-hidden rounded-full"
                style={{ backgroundColor: UEL_BORDER }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${hw}%`, backgroundColor: uelAccentOrange }}
                />
              </div>
            </div>
            <span className="min-w-[5.5rem] text-center text-[0.65rem] font-medium uppercase tracking-wide text-[#f5f5f7]/50 sm:min-w-[6.5rem] sm:text-xs">
              {label}
            </span>
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-semibold tabular-nums text-[#f5f5f7] sm:text-base">
                {formatStatValue(an, format)}
              </span>
              <div
                className="h-1 w-full max-w-[6rem] overflow-hidden rounded-full"
                style={{ backgroundColor: UEL_BORDER }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${aw}%`, backgroundColor: uelAccentMuted }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PredictionBlock({
  prediction,
  evaluation,
}: {
  prediction: PredictionRowMock;
  evaluation: PredictionEvaluationMock | null;
}) {
  const box = "rounded-lg border px-3 py-2";
  const boxStyle = { borderColor: UEL_BORDER, backgroundColor: UEL_BG_DEEP };
  return (
    <div className="space-y-6">
      <section>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#f5f5f7]/50">Predicción</h4>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className={box} style={boxStyle}>
            <span className="text-[0.65rem] font-medium uppercase text-[#f5f5f7]/50">Goles esperados</span>
            <p className="text-sm font-semibold text-[#f5f5f7]">
              Local {prediction.expected_home_goals?.toFixed(1) ?? "—"} · Visit{" "}
              {prediction.expected_away_goals?.toFixed(1) ?? "—"}
            </p>
          </div>
          <div className={box} style={boxStyle}>
            <span className="text-[0.65rem] font-medium uppercase text-[#f5f5f7]/50">1X2</span>
            <p className="text-sm font-semibold text-[#f5f5f7]">
              {pct(prediction.prob_home_win)} / {pct(prediction.prob_draw)} /{" "}
              {pct(prediction.prob_away_win)}
            </p>
          </div>
          <div className={`${box} sm:col-span-2`} style={boxStyle}>
            <span className="text-[0.65rem] font-medium uppercase text-[#f5f5f7]/50">Conteos previstos</span>
            <p className="mt-1 text-xs leading-relaxed text-[#f5f5f7]/75 sm:text-sm">
              Tiros {prediction.predicted_shots ?? "—"} ({prediction.predicted_shots_on_target ?? "—"} a
              puerta) · Paradas {prediction.predicted_saves ?? "—"} · Amarillas{" "}
              {prediction.predicted_yellow_cards ?? "—"} · Rojas {prediction.predicted_red_cards ?? "—"} ·
              Córners {prediction.predicted_corners ?? "—"} · Faltas {prediction.predicted_fouls ?? "—"} ·
              FJ {prediction.predicted_offsides ?? "—"}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-[#f5f5f7]/50">
          Creada:{" "}
          {prediction.created_at
            ? new Date(prediction.created_at).toLocaleString("es", {
                dateStyle: "short",
                timeStyle: "short",
              })
            : "—"}
        </p>
      </section>

      {evaluation ? (
        <section>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#f5f5f7]/50">Evaluación</h4>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className={box} style={boxStyle}>
              <span className="text-[0.65rem] font-medium uppercase text-[#f5f5f7]/50">Marcador real</span>
              <p className="text-sm font-semibold text-[#f5f5f7]">
                {evaluation.actual_home_goals ?? "—"} — {evaluation.actual_away_goals ?? "—"}
              </p>
            </div>
            <div className={box} style={boxStyle}>
              <span className="text-[0.65rem] font-medium uppercase text-[#f5f5f7]/50">Resultado acertado</span>
              <p className="text-sm font-semibold text-[#f5f5f7]">
                {evaluation.correct_result == null
                  ? "—"
                  : evaluation.correct_result
                    ? "Sí"
                    : "No"}
              </p>
            </div>
            <div className={`${box} sm:col-span-2`} style={boxStyle}>
              <span className="text-[0.65rem] font-medium uppercase text-[#f5f5f7]/50">Valores reales</span>
              <p className="mt-1 text-xs leading-relaxed text-[#f5f5f7]/75 sm:text-sm">
                Tiros {evaluation.actual_shots ?? "—"} ({evaluation.actual_shots_on_target ?? "—"} a puerta)
                · Paradas {evaluation.actual_saves ?? "—"} · Amarillas {evaluation.actual_yellow_cards ?? "—"}{" "}
                · Rojas {evaluation.actual_red_cards ?? "—"} · Córners {evaluation.actual_corners ?? "—"} ·
                Faltas {evaluation.actual_fouls ?? "—"} · FJ {evaluation.actual_offsides ?? "—"}
              </p>
            </div>
            <div className={`${box} sm:col-span-2`} style={boxStyle}>
              <span className="text-[0.65rem] font-medium uppercase text-[#f5f5f7]/50">Errores agregados</span>
              <p className="mt-1 text-xs text-[#f5f5f7]/75 sm:text-sm">
                Goles Δ {evaluation.error_goals ?? "—"} · Tiros Δ {evaluation.error_shots ?? "—"} · Córners Δ{" "}
                {evaluation.error_corners ?? "—"} · Tarjetas Δ {evaluation.error_cards ?? "—"}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-sm text-[#f5f5f7]/65">
          Sin fila en <code className="text-[#f5f5f7]/90">prediction_evaluations</code> en el mock; con el back se
          mostrará la comparación automática.
        </p>
      )}
    </div>
  );
}

type SideTab = "stats" | "predictions";

export function EuropaLeagueMatchDetailView({ detail }: { detail: MatchDetailMock }) {
  const [sideTab, setSideTab] = useState<SideTab>("stats");
  const { homeTeam, awayTeam, status, homeScore, awayScore, dateLabel, minute } = detail;

  const top =
    status === "live" ? (
      <div className="flex items-center justify-center gap-2 text-sm font-semibold sm:text-base">
        <span style={{ color: uelAccentOrange }}>En vivo</span>
        <span className="tabular-nums text-[#f5f5f7]/90">{minute}</span>
      </div>
    ) : status === "scheduled" ? (
      <p className="text-center text-sm text-[#f5f5f7]/65 sm:text-base">{dateLabel ?? "Fecha por confirmar"}</p>
    ) : (
      <p className="text-center text-sm text-[#f5f5f7]/55 sm:text-base">{dateLabel ?? "Finalizado"}</p>
    );

  const showScore = status !== "scheduled";

  const cardStyle = { borderColor: UEL_BORDER, backgroundColor: UEL_BG_SURFACE };

  return (
    <div className="space-y-8">
      <article className="rounded-2xl border p-4 shadow-sm sm:p-6 md:p-8" style={cardStyle}>
        <div className="mb-6 min-h-[1.5rem]">{top}</div>
        <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-8 md:gap-12">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
            <LogoSlot label={homeTeam} />
            <p className="text-center text-sm font-bold text-[#f5f5f7] sm:text-base md:text-lg">{homeTeam}</p>
            <p className="text-4xl font-bold tabular-nums text-[#f5f5f7] sm:text-5xl">
              {showScore ? homeScore ?? "—" : "—"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 pt-4 sm:pt-8">
            <span
              className="text-lg font-bold tracking-[0.2em] sm:text-xl"
              style={{ color: uelAccentOrange }}
            >
              VS
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
            <LogoSlot label={awayTeam} />
            <p className="text-center text-sm font-bold text-[#f5f5f7] sm:text-base md:text-lg">{awayTeam}</p>
            <p className="text-4xl font-bold tabular-nums text-[#f5f5f7] sm:text-5xl">
              {showScore ? awayScore ?? "—" : "—"}
            </p>
          </div>
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start">
        <div className="order-2 lg:order-1">
          <Timeline events={detail.events} homeTeam={homeTeam} awayTeam={awayTeam} />
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <div className="rounded-2xl border p-4 shadow-sm sm:p-6" style={cardStyle}>
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="mr-0 text-xs font-medium text-[#f5f5f7]/50 sm:mr-2 sm:text-sm">Ver:</span>
              <div
                className="inline-flex rounded-full border p-1"
                style={{ borderColor: UEL_BORDER, backgroundColor: UEL_BG_DEEP }}
              >
                <button
                  type="button"
                  onClick={() => setSideTab("stats")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
                    sideTab === "stats"
                      ? "text-white shadow-sm"
                      : "text-[#f5f5f7]/55 hover:text-[#f5f5f7]"
                  }`}
                  style={
                    sideTab === "stats"
                      ? { backgroundColor: uelAccentOrange }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Estadísticas
                </button>
                <button
                  type="button"
                  onClick={() => setSideTab("predictions")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
                    sideTab === "predictions"
                      ? "text-white shadow-sm"
                      : "text-[#f5f5f7]/55 hover:text-[#f5f5f7]"
                  }`}
                  style={
                    sideTab === "predictions"
                      ? { backgroundColor: uelAccentOrange }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Predicciones
                </button>
              </div>
              {sideTab === "stats" ? (
                <DesiredStatsModalTrigger
                  league="europa-league"
                  homeTeam={homeTeam}
                  awayTeam={awayTeam}
                  accentBackground={uelAccentOrange}
                  accentForeground="#ffffff"
                />
              ) : null}
            </div>

            {sideTab === "stats" ? (
              <>
                <h3 className="mb-4 text-base font-bold text-[#f5f5f7] sm:text-lg">Estadísticas del partido</h3>
                <StatsCompare home={detail.homeStats} away={detail.awayStats} />
                <footer
                  className="mt-6 rounded-xl border border-dashed p-4 text-sm leading-relaxed text-[#f5f5f7]/65"
                  style={{ borderColor: UEL_BORDER, backgroundColor: UEL_BG_DEEP }}
                >
                  {detail.statsFootnote}
                </footer>
              </>
            ) : (
              <>
                <h3 className="mb-4 text-base font-bold text-[#f5f5f7] sm:text-lg">Predicción y evaluación</h3>
                {detail.prediction ? (
                  <PredictionBlock prediction={detail.prediction} evaluation={detail.evaluation} />
                ) : (
                  <p className="text-sm text-[#f5f5f7]/65">
                    No hay predicción en el mock para este encuentro. Con el back, los datos vendrán de{" "}
                    <code className="text-[#f5f5f7]/90">predictions</code> y{" "}
                    <code className="text-[#f5f5f7]/90">prediction_evaluations</code>.
                  </p>
                )}
                <footer
                  className="mt-6 rounded-xl border border-dashed p-4 text-sm leading-relaxed text-[#f5f5f7]/65"
                  style={{ borderColor: UEL_BORDER, backgroundColor: UEL_BG_DEEP }}
                >
                  {detail.predictionFootnote}
                </footer>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
