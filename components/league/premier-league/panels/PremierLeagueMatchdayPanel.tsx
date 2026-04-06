"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  fetchCurrentRoundMatches,
  fetchRoundMatches,
} from "@/lib/api/fetch-round-matches";
import type { RoundMatchesResponse } from "@/lib/api/matches-types";
import { premierLeagueAccent } from "../constants/premierLeagueAccent";
import { PREMIER_LEAGUE_MAX_JORNADAS } from "../constants/premierLeagueMaxJornadas";
import {
  PREMIER_LEAGUE_COMPETITION_ID,
  PREMIER_LEAGUE_SEASON_ID,
} from "../constants/premierLeagueStandingsIds";
import { RedCardMarkersRow } from "../icons/RedCardMark";
import { RemoteTeamLogo } from "../components/RemoteTeamLogo";
import { mapPartidoApiToFixture } from "../lib/mapPartidoApi";
import type { FixtureMatch } from "../mocks/premierLeagueMatchdayMock";

/** Solo escudo + nombre: ancho fijo alineado al logo (sin rojas aquí). */
function TeamShieldColumn({
  teamName,
  logoTitle,
  logoUrl,
}: {
  teamName: string;
  logoTitle: string;
  logoUrl?: string | null;
}) {
  return (
    <div className="flex w-11 shrink-0 flex-col items-center gap-1.5 sm:w-12">
      <RemoteTeamLogo
        logoUrl={logoUrl}
        variant="fixture"
        label={logoTitle}
      />
      <p className="w-full text-center text-[11px] font-medium leading-snug text-white/55 sm:text-xs">
        {teamName}
      </p>
    </div>
  );
}

const scoreBoxClass =
  "flex min-h-[2.75rem] min-w-[1.75rem] shrink-0 items-center justify-center self-start text-2xl font-bold tabular-nums sm:min-h-12 sm:pt-0.5 sm:text-3xl";

function HomeSideBlock({
  homeTeam,
  homeScore,
  status,
  tarjetasRojasLocal = 0,
  homeLogoUrl,
}: {
  homeTeam: string;
  homeScore?: number;
  status: FixtureMatch["status"];
  tarjetasRojasLocal?: number;
  homeLogoUrl?: string | null;
}) {
  const showScore = status !== "scheduled";
  return (
    <div className="inline-flex flex-col items-end">
      <div className="flex items-start gap-1.5 sm:gap-2">
        {tarjetasRojasLocal > 0 ? (
          <div className="flex shrink-0 items-center self-start pt-1 sm:pt-1.5">
            <RedCardMarkersRow count={tarjetasRojasLocal} size={13} />
          </div>
        ) : null}
        <TeamShieldColumn
          teamName={homeTeam}
          logoTitle={homeTeam}
          logoUrl={homeLogoUrl}
        />
        <div className={scoreBoxClass}>{showScore ? homeScore : null}</div>
      </div>
    </div>
  );
}

function AwaySideBlock({
  awayTeam,
  awayScore,
  status,
  tarjetasRojasVisitante = 0,
  awayLogoUrl,
}: {
  awayTeam: string;
  awayScore?: number;
  status: FixtureMatch["status"];
  tarjetasRojasVisitante?: number;
  awayLogoUrl?: string | null;
}) {
  const showScore = status !== "scheduled";
  return (
    <div className="inline-flex flex-col items-start">
      <div className="flex items-start gap-1.5 sm:gap-2">
        <div className={scoreBoxClass}>{showScore ? awayScore : null}</div>
        <TeamShieldColumn
          teamName={awayTeam}
          logoTitle={awayTeam}
          logoUrl={awayLogoUrl}
        />
        {tarjetasRojasVisitante > 0 ? (
          <div className="flex shrink-0 items-center self-start pt-1 sm:pt-1.5">
            <RedCardMarkersRow count={tarjetasRojasVisitante} size={13} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function estadoFallbackPorStatus(status: FixtureMatch["status"]): string {
  if (status === "finished") return "Finalizado";
  if (status === "live") return "En vivo";
  return "Programado";
}

function FixtureCard({ match, round }: { match: FixtureMatch; round: number }) {
  const {
    status,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    dateLabel,
    minute,
    estadoLabelEs,
    tarjetasRojasLocal,
    tarjetasRojasVisitante,
    logoUrlLocal,
    logoUrlVisitante,
  } = match;

  const estadoTexto =
    estadoLabelEs?.trim() || estadoFallbackPorStatus(status);

  const href = `/league/premier-league/match/${encodeURIComponent(match.id)}?round=${round}`;

  return (
    <Link
      href={href}
      className="relative block rounded-2xl border border-white/[0.08] bg-[#28002b] px-4 py-4 shadow-[0_6px_24px_rgba(0,0,0,0.18)] transition-colors hover:border-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2882]/50 sm:px-5 sm:py-5"
    >
      <div className="mb-4 flex min-h-[3.25rem] flex-col items-center justify-center gap-2 text-center sm:min-h-[3.5rem]">
        <span className="rounded-full border border-white/[0.14] bg-white/[0.07] px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
          {estadoTexto}
        </span>
        {status === "live" ? (
          minute ? (
            <p
              className="text-sm font-semibold tabular-nums sm:text-base"
              style={{ color: premierLeagueAccent }}
            >
              {minute}
            </p>
          ) : null
        ) : (
          <p className="text-sm text-white/65 sm:text-base">
            {dateLabel ?? "Fecha por confirmar"}
          </p>
        )}
      </div>

      <div className="flex items-start justify-center gap-2 sm:gap-4">
        <div className="flex min-w-0 flex-1 justify-end">
          <HomeSideBlock
            homeTeam={homeTeam}
            homeScore={homeScore}
            status={status}
            tarjetasRojasLocal={tarjetasRojasLocal ?? 0}
            homeLogoUrl={logoUrlLocal}
          />
        </div>

        <div className="flex shrink-0 items-start justify-center px-1 pt-6 sm:px-2 sm:pt-7">
          <span className="text-sm font-bold tracking-wide text-white/35 sm:text-base">
            VS
          </span>
        </div>

        <div className="flex min-w-0 flex-1 justify-start">
          <AwaySideBlock
            awayTeam={awayTeam}
            awayScore={awayScore}
            status={status}
            tarjetasRojasVisitante={tarjetasRojasVisitante ?? 0}
            awayLogoUrl={logoUrlVisitante}
          />
        </div>
      </div>
    </Link>
  );
}

function errorMessage(status: number, detail?: string, title?: string): string {
  if (status === 503) {
    return (
      detail ??
      title ??
      "Servicio temporalmente no disponible. Inténtalo de nuevo en unos minutos."
    );
  }
  if (status === 404) {
    return detail ?? title ?? "Temporada no encontrada";
  }
  return detail ?? title ?? `Error al cargar los partidos (${status})`;
}

export function PremierLeagueMatchdayPanel() {
  const [round, setRound] = useState(1);
  const [matches, setMatches] = useState<FixtureMatch[]>([]);
  const [temporadaCompletada, setTemporadaCompletada] = useState<
    boolean | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const applyOkResponse = useCallback(
    (data: RoundMatchesResponse, preserveTemporadaFlag: boolean) => {
      const partidos = data.partidos ?? [];
      setMatches(partidos.map(mapPartidoApiToFixture));
      const j = data.jornada;
      if (typeof j === "number" && Number.isFinite(j) && j >= 1) {
        setRound(j);
      }
      if (preserveTemporadaFlag) {
        setTemporadaCompletada(data.temporada_completada);
      }
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadCurrent() {
      setLoading(true);
      setError(null);
      const result = await fetchCurrentRoundMatches(
        PREMIER_LEAGUE_COMPETITION_ID,
        PREMIER_LEAGUE_SEASON_ID,
      );
      if (cancelled) return;
      if (result.ok) {
        applyOkResponse(result.data, true);
        setError(null);
      } else {
        setMatches([]);
        setError(
          errorMessage(
            result.status,
            result.problem?.detail,
            result.problem?.title,
          ),
        );
      }
      setLoading(false);
      setReady(true);
    }

    void loadCurrent();
    return () => {
      cancelled = true;
    };
  }, [applyOkResponse]);

  const changeRound = useCallback(
    async (newRound: number) => {
      if (newRound < 1 || newRound > PREMIER_LEAGUE_MAX_JORNADAS) return;
      setRound(newRound);
      setLoading(true);
      setError(null);
      const result = await fetchRoundMatches(
        PREMIER_LEAGUE_COMPETITION_ID,
        PREMIER_LEAGUE_SEASON_ID,
        newRound,
      );
      if (result.ok) {
        applyOkResponse(result.data, false);
        setError(null);
      } else {
        setMatches([]);
        setError(
          errorMessage(
            result.status,
            result.problem?.detail,
            result.problem?.title,
          ),
        );
      }
      setLoading(false);
    },
    [applyOkResponse],
  );

  const roundOptions = Array.from(
    { length: PREMIER_LEAGUE_MAX_JORNADAS },
    (_, i) => i + 1,
  );

  return (
    <div className="space-y-6">
      {temporadaCompletada === true && (
        <p className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-center text-sm text-white/80">
          Temporada finalizada. Mostrando la última jornada con todos los
          partidos cerrados.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-base font-bold text-white sm:text-lg">
          Jornada {round}
        </h2>
        <span className="text-white/30" aria-hidden>
          ·
        </span>
        <label htmlFor="premier-matchday" className="text-sm font-bold text-white/80">
          Ir a
        </label>
        <select
          id="premier-matchday"
          value={round}
          disabled={!ready || loading}
          onChange={(e) => {
            const v = Number(e.target.value);
            void changeRound(v);
          }}
          className="cursor-pointer rounded-xl border border-white/[0.12] bg-[#28002b] px-4 py-2.5 text-base font-semibold text-white shadow-inner outline-none transition-colors hover:border-white/20 focus-visible:ring-2 focus-visible:ring-[#ff2882]/60 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {roundOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={!ready || loading || round <= 1}
            onClick={() => void changeRound(round - 1)}
            className="rounded-lg border border-white/[0.12] bg-[#28002b] px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Jornada anterior"
          >
            ←
          </button>
          <button
            type="button"
            disabled={
              !ready || loading || round >= PREMIER_LEAGUE_MAX_JORNADAS
            }
            onClick={() => void changeRound(round + 1)}
            className="rounded-lg border border-white/[0.12] bg-[#28002b] px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Jornada siguiente"
          >
            →
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-center text-sm text-white/70">Cargando partidos…</p>
      )}
      {error && (
        <p
          className="rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-3 text-center text-sm text-rose-100"
          role="alert"
        >
          {error}
        </p>
      )}
      {!loading && !error && matches.length === 0 && (
        <p className="text-center text-sm text-white/70">
          No hay partidos en esta jornada.
        </p>
      )}
      {matches.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {matches.map((m) => (
            <FixtureCard key={m.id} match={m} round={round} />
          ))}
        </div>
      )}
    </div>
  );
}
