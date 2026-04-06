"use client";

import { useState } from "react";
import { premierLeagueAccent } from "../constants/premierLeagueAccent";
import {
  resolveEventGlyphKind,
  TimelineEventGlyph,
} from "../icons/MatchEventSvgs";
import { RedCardMarkersRow } from "../icons/RedCardMark";
import type {
  MatchDetailMock,
  MatchEventMock,
  PredictionEvaluationMock,
  PredictionRowMock,
  TeamMatchStatsMock,
} from "../mocks/premierLeagueMatchDetailMock";

function LogoSlot({ label }: { label: string }) {
  return (
    <span
      className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] sm:size-16 md:size-[4.5rem]"
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
  const t = (type ?? "").toLowerCase();
  switch (t) {
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
      return type?.trim() ? type : "Evento";
  }
}

function eventTypeKey(type: string | null): string {
  return (type ?? "").trim().toLowerCase().replace(/\s+/g, "_");
}

function isRedCardEventType(type: string | null): boolean {
  const t = eventTypeKey(type);
  return (
    t === "red_card" ||
    t === "redcard" ||
    t.endsWith("_red_card") ||
    t.includes("red_card") ||
    t.includes("tarjeta_roja")
  );
}

function isNeutralTimelineEvent(ev: MatchEventMock): boolean {
  const t = eventTypeKey(ev.event_type);
  return (
    t === "kickoff" ||
    t === "halftime" ||
    t === "fulltime" ||
    t === "match_start" ||
    t === "match_end"
  );
}

function countRedCardsInEvents(events: MatchEventMock[], side: "home" | "away"): number {
  return events.filter(
    (e) => isRedCardEventType(e.event_type) && e.side === side,
  ).length;
}

/** Rojas junto al escudo: si hay cifra en stats se usa; si no, se cuentan eventos red_card con `lado`. */
function effectiveRedCards(
  statsValue: number | null | undefined,
  events: MatchEventMock[],
  side: "home" | "away",
): number {
  const fromEvents = countRedCardsInEvents(events, side);
  if (statsValue != null && statsValue > 0) {
    return statsValue;
  }
  if (fromEvents > 0) {
    return fromEvents;
  }
  return Math.max(0, statsValue ?? 0);
}

function formatExtra(extra: Record<string, unknown> | null, type: string | null) {
  if (!extra) return null;
  const t = (type ?? "").toLowerCase();
  if (t === "substitution") {
    const off = extra.off;
    const on = extra.on;
    if (typeof off === "string" && typeof on === "string") return `${off} → ${on}`;
    return null;
  }
  if (t === "goal" && typeof extra.assist === "string") {
    return `Asistencia: ${extra.assist}`;
  }
  if (t === "kickoff" && typeof extra.note === "string") return extra.note;
  if (t === "fulltime" && typeof extra.score === "string") return `Marcador ${extra.score}`;
  return null;
}

const timelineScrollClass =
  "min-h-0 max-h-[min(36rem,52svh)] flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:max-h-[min(42rem,min(52svh,calc(100svh-13rem)))]";

function Timeline({ events }: { events: MatchEventMock[] }) {
  const sorted = [...events].sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0));

  if (sorted.length === 0) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col rounded-2xl border border-white/[0.08] bg-[#28002b]/80 p-4 sm:p-5">
        <h3
          className="mb-3 shrink-0 text-sm font-bold sm:text-base"
          style={{ color: premierLeagueAccent }}
        >
          Eventos
        </h3>
        <div className={`${timelineScrollClass} text-sm text-white/55`}>
          No hay eventos en el mock para este partido. Con el back, aquí aparecerá la línea de tiempo desde{" "}
          <code className="text-white/70">match_events</code>.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col rounded-2xl border border-white/[0.08] bg-[#28002b]/80 p-4 sm:p-5">
      <h3
        className="mb-4 shrink-0 text-sm font-bold sm:text-base"
        style={{ color: premierLeagueAccent }}
      >
        Eventos
      </h3>
      <div className={timelineScrollClass}>
        <ul className="m-0 list-none divide-y divide-white/[0.06] p-0">
          {sorted.map((ev) => {
            const sub = formatExtra(ev.extra_data, ev.event_type);
            const glyphKind = resolveEventGlyphKind(ev.event_type);
            const showDedicatedIcon = glyphKind !== "dot";
            const minuteStr = ev.minute != null ? `${ev.minute}'` : "—";
            const minuteClass =
              "text-[11px] font-bold tabular-nums sm:text-xs shrink-0";

            const missingSide = ev.side !== "home" && ev.side !== "away";
            if (isNeutralTimelineEvent(ev) || missingSide) {
              return (
                <li key={ev.id} className="py-4">
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <span className={minuteClass} style={{ color: premierLeagueAccent }}>
                      {minuteStr}
                    </span>
                    {showDedicatedIcon ? (
                      <span className="sr-only">{eventLabel(ev.event_type)}</span>
                    ) : (
                      <span className="text-xs font-bold uppercase tracking-wide text-white/75">
                        {eventLabel(ev.event_type)}
                      </span>
                    )}
                    <div className="flex items-center justify-center gap-2">
                      <TimelineEventGlyph eventType={ev.event_type} side="neutral" size={22} />
                      {ev.playerLabel ? (
                        <p className="text-sm font-medium text-white/90">{ev.playerLabel}</p>
                      ) : null}
                    </div>
                    {sub ? <p className="max-w-md text-xs text-white/55">{sub}</p> : null}
                  </div>
                </li>
              );
            }

            const isHome = ev.side === "home";
            const isAway = ev.side === "away";

            return (
              <li
                key={ev.id}
                className="grid grid-cols-[minmax(0,1fr)_2.75rem_minmax(0,1fr)] items-start gap-x-1 py-4 sm:grid-cols-[minmax(0,1fr)_3.25rem_minmax(0,1fr)] sm:gap-x-2"
              >
                <div className="min-w-0 flex justify-end">
                  {isHome ? (
                    <div className="flex max-w-full flex-col items-end gap-1 text-right">
                      {!showDedicatedIcon ? (
                        <span className="text-xs font-bold uppercase tracking-wide text-white/70">
                          {eventLabel(ev.event_type)}
                        </span>
                      ) : (
                        <span className="sr-only">{eventLabel(ev.event_type)}</span>
                      )}
                      <div className="flex items-center justify-end gap-2">
                        {ev.playerLabel ? (
                          <p className="text-sm font-medium text-white/90">{ev.playerLabel}</p>
                        ) : null}
                        <TimelineEventGlyph eventType={ev.event_type} side="home" size={20} />
                      </div>
                      {sub ? <p className="text-xs text-white/55">{sub}</p> : null}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col items-center justify-center pt-1">
                  <span className={minuteClass} style={{ color: premierLeagueAccent }}>
                    {minuteStr}
                  </span>
                </div>

                <div className="min-w-0 flex justify-start">
                  {isAway ? (
                    <div className="flex max-w-full flex-col items-start gap-1 text-left">
                      {!showDedicatedIcon ? (
                        <span className="text-xs font-bold uppercase tracking-wide text-white/70">
                          {eventLabel(ev.event_type)}
                        </span>
                      ) : (
                        <span className="sr-only">{eventLabel(ev.event_type)}</span>
                      )}
                      <div className="flex items-center justify-start gap-2">
                        <TimelineEventGlyph eventType={ev.event_type} side="away" size={20} />
                        {ev.playerLabel ? (
                          <p className="text-sm font-medium text-white/90">{ev.playerLabel}</p>
                        ) : null}
                      </div>
                      {sub ? <p className="text-xs text-white/55">{sub}</p> : null}
                    </div>
                  ) : null}
                </div>
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
      <div className="mb-3 grid grid-cols-[1fr_auto_1fr] gap-2 text-center text-xs font-bold text-white/50 sm:text-sm">
        <span className="truncate text-right text-white/85">{home.teamName}</span>
        <span className="shrink-0 px-1" />
        <span className="truncate text-left text-white/85">{away.teamName}</span>
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
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-1 rounded-lg border border-white/[0.06] bg-[#1e0021]/40 px-2 py-2 sm:px-3"
          >
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold tabular-nums text-white sm:text-base">
                {formatStatValue(hn, format)}
              </span>
              <div className="h-1 w-full max-w-[6rem] overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${hw}%`, backgroundColor: premierLeagueAccent }}
                />
              </div>
            </div>
            <span className="min-w-[5.5rem] text-center text-[0.65rem] font-medium uppercase tracking-wide text-white/40 sm:min-w-[6.5rem] sm:text-xs">
              {label}
            </span>
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-semibold tabular-nums text-white sm:text-base">
                {formatStatValue(an, format)}
              </span>
              <div className="h-1 w-full max-w-[6rem] overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-white/35 transition-all"
                  style={{ width: `${aw}%` }}
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
  return (
    <div className="space-y-6">
      <section>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-white/45">Predicción</h4>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-white/[0.06] bg-[#1e0021]/40 px-3 py-2">
            <span className="text-[0.65rem] font-medium uppercase text-white/45">Goles esperados</span>
            <p className="text-sm font-semibold text-white">
              Local {prediction.expected_home_goals?.toFixed(1) ?? "—"} · Visit{" "}
              {prediction.expected_away_goals?.toFixed(1) ?? "—"}
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#1e0021]/40 px-3 py-2">
            <span className="text-[0.65rem] font-medium uppercase text-white/45">1X2</span>
            <p className="text-sm font-semibold text-white">
              {pct(prediction.prob_home_win)} / {pct(prediction.prob_draw)} /{" "}
              {pct(prediction.prob_away_win)}
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[#1e0021]/40 px-3 py-2 sm:col-span-2">
            <span className="text-[0.65rem] font-medium uppercase text-white/45">Conteos previstos</span>
            <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-sm">
              Tiros {prediction.predicted_shots ?? "—"} ({prediction.predicted_shots_on_target ?? "—"} a
              puerta) · Paradas {prediction.predicted_saves ?? "—"} · Amarillas{" "}
              {prediction.predicted_yellow_cards ?? "—"} · Rojas {prediction.predicted_red_cards ?? "—"} ·
              Córners {prediction.predicted_corners ?? "—"} · Faltas {prediction.predicted_fouls ?? "—"} ·
              FJ {prediction.predicted_offsides ?? "—"}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-white/40">
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
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-white/45">Evaluación</h4>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-white/[0.06] bg-[#1e0021]/40 px-3 py-2">
              <span className="text-[0.65rem] font-medium uppercase text-white/45">Marcador real</span>
              <p className="text-sm font-semibold text-white">
                {evaluation.actual_home_goals ?? "—"} — {evaluation.actual_away_goals ?? "—"}
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-[#1e0021]/40 px-3 py-2">
              <span className="text-[0.65rem] font-medium uppercase text-white/45">Resultado acertado</span>
              <p className="text-sm font-semibold text-white">
                {evaluation.correct_result == null
                  ? "—"
                  : evaluation.correct_result
                    ? "Sí"
                    : "No"}
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-[#1e0021]/40 px-3 py-2 sm:col-span-2">
              <span className="text-[0.65rem] font-medium uppercase text-white/45">Valores reales</span>
              <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-sm">
                Tiros {evaluation.actual_shots ?? "—"} ({evaluation.actual_shots_on_target ?? "—"} a puerta)
                · Paradas {evaluation.actual_saves ?? "—"} · Amarillas {evaluation.actual_yellow_cards ?? "—"}{" "}
                · Rojas {evaluation.actual_red_cards ?? "—"} · Córners {evaluation.actual_corners ?? "—"} ·
                Faltas {evaluation.actual_fouls ?? "—"} · FJ {evaluation.actual_offsides ?? "—"}
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-[#1e0021]/40 px-3 py-2 sm:col-span-2">
              <span className="text-[0.65rem] font-medium uppercase text-white/45">Errores agregados</span>
              <p className="mt-1 text-xs text-white/75 sm:text-sm">
                Goles Δ {evaluation.error_goals ?? "—"} · Tiros Δ {evaluation.error_shots ?? "—"} · Córners Δ{" "}
                {evaluation.error_corners ?? "—"} · Tarjetas Δ {evaluation.error_cards ?? "—"}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-sm text-white/55">
          Sin fila en <code className="text-white/70">prediction_evaluations</code> en el mock; con el back se
          mostrará la comparación automática.
        </p>
      )}
    </div>
  );
}

type SideTab = "stats" | "predictions";

export function PremierLeagueMatchDetailView({ detail }: { detail: MatchDetailMock }) {
  const [sideTab, setSideTab] = useState<SideTab>("stats");
  const { homeTeam, awayTeam, status, homeScore, awayScore, dateLabel, minute } = detail;

  const homeReds = effectiveRedCards(detail.homeStats.red_cards, detail.events, "home");
  const awayReds = effectiveRedCards(detail.awayStats.red_cards, detail.events, "away");

  const top =
    status === "live" ? (
      <div className="flex items-center justify-center gap-2 text-sm font-semibold sm:text-base">
        <span style={{ color: premierLeagueAccent }}>En vivo</span>
        <span className="tabular-nums text-white/90">{minute}</span>
      </div>
    ) : status === "scheduled" ? (
      <p className="text-center text-sm text-white/65 sm:text-base">{dateLabel ?? "Fecha por confirmar"}</p>
    ) : (
      <p className="text-center text-sm text-white/55 sm:text-base">{dateLabel ?? "Finalizado"}</p>
    );

  const showScore = status !== "scheduled";

  return (
    <div className="space-y-8">
      <article className="rounded-2xl border border-white/[0.08] bg-[#28002b] p-4 shadow-[0_6px_24px_rgba(0,0,0,0.18)] sm:p-6 md:p-8">
        <div className="mb-6 min-h-[1.5rem]">{top}</div>
        <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-8 md:gap-12">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              {homeReds > 0 ? (
                <div className="flex shrink-0 items-center pt-0.5">
                  <RedCardMarkersRow count={homeReds} size={15} className="justify-end sm:max-w-[6rem]" />
                </div>
              ) : null}
              <LogoSlot label={homeTeam} />
            </div>
            <p className="text-center text-sm font-bold text-white sm:text-base md:text-lg">{homeTeam}</p>
            <p className="text-4xl font-bold tabular-nums text-white sm:text-5xl">
              {showScore ? homeScore ?? "—" : "—"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 pt-4 sm:pt-8">
            <span className="text-lg font-bold tracking-[0.2em] text-white/35 sm:text-xl">VS</span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <LogoSlot label={awayTeam} />
              {awayReds > 0 ? (
                <div className="flex shrink-0 items-center pt-0.5">
                  <RedCardMarkersRow count={awayReds} size={15} className="justify-start sm:max-w-[6rem]" />
                </div>
              ) : null}
            </div>
            <p className="text-center text-sm font-bold text-white sm:text-base md:text-lg">{awayTeam}</p>
            <p className="text-4xl font-bold tabular-nums text-white sm:text-5xl">
              {showScore ? awayScore ?? "—" : "—"}
            </p>
          </div>
        </div>
      </article>

      <div className="grid min-h-0 gap-6 lg:grid-cols-2 lg:items-stretch">
        <div className="order-2 flex h-full min-h-0 min-w-0 flex-col lg:order-1">
          <Timeline events={detail.events} />
        </div>

        <div className="order-1 flex min-h-0 min-w-0 flex-col lg:order-2">
          <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/[0.08] bg-[#28002b]/90 p-4 shadow-[0_6px_24px_rgba(0,0,0,0.18)] sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="mr-0 text-xs font-medium text-white/45 sm:mr-2 sm:text-sm">Ver:</span>
              <div className="inline-flex rounded-full border border-white/[0.12] bg-[#1e0021]/60 p-1">
                <button
                  type="button"
                  onClick={() => setSideTab("stats")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
                    sideTab === "stats"
                      ? "text-[#1e0021]"
                      : "text-white/65 hover:text-white/90"
                  }`}
                  style={
                    sideTab === "stats"
                      ? { backgroundColor: premierLeagueAccent }
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
                      ? "text-[#1e0021]"
                      : "text-white/65 hover:text-white/90"
                  }`}
                  style={
                    sideTab === "predictions"
                      ? { backgroundColor: premierLeagueAccent }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Predicciones
                </button>
              </div>
            </div>

            {sideTab === "stats" ? (
              <>
                <h3 className="mb-4 text-base font-bold text-white sm:text-lg">Estadísticas del partido</h3>
                <StatsCompare home={detail.homeStats} away={detail.awayStats} />
                <footer className="mt-6 rounded-xl border border-dashed border-white/[0.12] bg-[#1e0021]/30 p-4 text-sm leading-relaxed text-white/60">
                  {detail.statsFootnote}
                </footer>
              </>
            ) : (
              <>
                <h3 className="mb-4 text-base font-bold text-white sm:text-lg">Predicción y evaluación</h3>
                {detail.prediction ? (
                  <PredictionBlock prediction={detail.prediction} evaluation={detail.evaluation} />
                ) : (
                  <p className="text-sm text-white/60">
                    No hay predicción en el mock para este encuentro. Con el back, los datos vendrán de{" "}
                    <code className="text-white/75">predictions</code> y{" "}
                    <code className="text-white/75">prediction_evaluations</code>.
                  </p>
                )}
                <footer className="mt-6 rounded-xl border border-dashed border-white/[0.12] bg-[#1e0021]/30 p-4 text-sm leading-relaxed text-white/60">
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
