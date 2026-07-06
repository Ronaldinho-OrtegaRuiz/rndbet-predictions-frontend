"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchCurrentRoundMatches,
  fetchRoundMatches,
} from "@/lib/api/fetch-round-matches";
import type { RoundMatchesResponse } from "@/lib/api/matches-types";
import {
  getLeagueConfig,
  type LeagueSlug,
} from "@/lib/leagues/config";
import type { SeasonYear } from "@/lib/leagues/seasons";
import { useLeagueSeasonSelection } from "@/lib/leagues/useLeagueSeasonSelection";
import { mapPartidoApiToFixture } from "@/components/league/premier-league/lib/mapPartidoApi";
import type { FixtureMatch } from "@/components/league/premier-league/mocks/premierLeagueMatchdayMock";
import { RedCardMarkersRow } from "@/components/league/premier-league/icons/RedCardMark";
import { RemoteTeamLogo } from "./RemoteTeamLogo";
import { SeasonYearSelector } from "./SeasonYearSelector";
import { getMatchdayTheme, type MatchdayTheme } from "./themes";

function TeamShieldColumn({
  teamName,
  logoTitle,
  logoUrl,
  theme,
}: {
  teamName: string;
  logoTitle: string;
  logoUrl?: string | null;
  theme: MatchdayTheme;
}) {
  return (
    <div className="flex w-11 shrink-0 flex-col items-center gap-1.5 sm:w-12">
      <RemoteTeamLogo
        logoUrl={logoUrl}
        variant="fixture"
        label={logoTitle}
        tone={theme.tone}
      />
      <p className={theme.teamNameText}>{teamName}</p>
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
  theme,
}: {
  homeTeam: string;
  homeScore?: number;
  status: FixtureMatch["status"];
  tarjetasRojasLocal?: number;
  homeLogoUrl?: string | null;
  theme: MatchdayTheme;
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
          theme={theme}
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
  theme,
}: {
  awayTeam: string;
  awayScore?: number;
  status: FixtureMatch["status"];
  tarjetasRojasVisitante?: number;
  awayLogoUrl?: string | null;
  theme: MatchdayTheme;
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
          theme={theme}
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

function FixtureCard({
  match,
  round,
  routePrefix,
  theme,
  seasonYear,
}: {
  match: FixtureMatch;
  round: number;
  routePrefix: string;
  theme: MatchdayTheme;
  seasonYear: SeasonYear;
}) {
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

  const estadoTexto = estadoLabelEs?.trim() || estadoFallbackPorStatus(status);
  const href = `${routePrefix}/match/${encodeURIComponent(match.id)}?round=${round}&season=${seasonYear}`;

  return (
    <Link
      href={href}
      className={`${theme.card} ${theme.cardHover} focus-visible:ring-2 ${theme.focusRing}`}
    >
      <div className="mb-4 flex min-h-[3.25rem] flex-col items-center justify-center gap-2 text-center sm:min-h-[3.5rem]">
        <span className={theme.statusBadge}>{estadoTexto}</span>
        {status === "live" ? (
          minute ? (
            <p
              className="text-sm font-semibold tabular-nums sm:text-base"
              style={{ color: theme.accent }}
            >
              {minute}
            </p>
          ) : null
        ) : (
          <p className={theme.dateText}>{dateLabel ?? "Fecha por confirmar"}</p>
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
            theme={theme}
          />
        </div>

        <div className="flex shrink-0 items-start justify-center px-1 pt-6 sm:px-2 sm:pt-7">
          <span className={theme.vsText}>VS</span>
        </div>

        <div className="flex min-w-0 flex-1 justify-start">
          <AwaySideBlock
            awayTeam={awayTeam}
            awayScore={awayScore}
            status={status}
            tarjetasRojasVisitante={tarjetasRojasVisitante ?? 0}
            awayLogoUrl={logoUrlVisitante}
            theme={theme}
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

export function ApiMatchdayPanel({ leagueSlug }: { leagueSlug: LeagueSlug }) {
  const cfg = getLeagueConfig(leagueSlug);
  const theme = getMatchdayTheme(leagueSlug);
  const { seasonId, competitionId, seasonYear } =
    useLeagueSeasonSelection(leagueSlug);

  const [round, setRound] = useState(cfg.roundMin);
  const [matches, setMatches] = useState<FixtureMatch[]>([]);
  const [temporadaCompletada, setTemporadaCompletada] = useState<
    boolean | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const roundLabel = cfg.roundLabel === "fase" ? "Fase" : "Jornada";

  const roundOptions = useMemo(
    () =>
      Array.from(
        { length: cfg.maxRound - cfg.roundMin + 1 },
        (_, i) => cfg.roundMin + i,
      ),
    [cfg.maxRound, cfg.roundMin],
  );

  const applyOkResponse = useCallback(
    (data: RoundMatchesResponse, preserveTemporadaFlag: boolean) => {
      const partidos = data.partidos ?? [];
      setMatches(partidos.map(mapPartidoApiToFixture));
      const j = data.jornada;
      if (typeof j === "number" && Number.isFinite(j) && j >= cfg.roundMin) {
        setRound(j);
      }
      if (preserveTemporadaFlag) {
        setTemporadaCompletada(data.temporada_completada);
      }
    },
    [cfg.roundMin],
  );

  useEffect(() => {
    setRound(cfg.roundMin);
    setReady(false);
    setTemporadaCompletada(undefined);
  }, [cfg.roundMin, seasonYear]);

  useEffect(() => {
    let cancelled = false;

    async function loadCurrent() {
      setLoading(true);
      setError(null);
      const result = await fetchCurrentRoundMatches(competitionId, seasonId);
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
  }, [applyOkResponse, competitionId, seasonId]);

  const changeRound = useCallback(
    async (newRound: number) => {
      if (newRound < cfg.roundMin || newRound > cfg.maxRound) return;
      setRound(newRound);
      setLoading(true);
      setError(null);
      const result = await fetchRoundMatches(
        competitionId,
        seasonId,
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
    [applyOkResponse, cfg.maxRound, cfg.roundMin, competitionId, seasonId],
  );

  const selectId = `${leagueSlug}-matchday`;

  return (
    <div className="space-y-6">
      <SeasonYearSelector leagueSlug={leagueSlug} />
      {temporadaCompletada === true && (
        <p className={theme.seasonBanner}>
          Temporada finalizada. Mostrando la última {roundLabel.toLowerCase()}{" "}
          con todos los partidos cerrados.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <h2 className={`text-base font-bold sm:text-lg ${theme.headingText}`}>
          {roundLabel} {round}
        </h2>
        <span className={theme.tone === "dark" ? "text-white/30" : "text-slate-300"} aria-hidden>
          ·
        </span>
        <label htmlFor={selectId} className={`text-sm font-bold ${theme.mutedText}`}>
          Ir a
        </label>
        <select
          id={selectId}
          value={round}
          disabled={!ready || loading}
          onChange={(e) => {
            const v = Number(e.target.value);
            void changeRound(v);
          }}
          className={`${theme.select} focus-visible:ring-2 ${theme.focusRing}`}
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
            disabled={!ready || loading || round <= cfg.roundMin}
            onClick={() => void changeRound(round - 1)}
            className={theme.navButton}
            aria-label={`${roundLabel} anterior`}
          >
            ←
          </button>
          <button
            type="button"
            disabled={!ready || loading || round >= cfg.maxRound}
            onClick={() => void changeRound(round + 1)}
            className={theme.navButton}
            aria-label={`${roundLabel} siguiente`}
          >
            →
          </button>
        </div>
      </div>

      {loading && (
        <p className={`text-center text-sm ${theme.loadingText}`}>
          Cargando partidos…
        </p>
      )}
      {error && (
        <p
          className={`rounded-xl border px-4 py-3 text-center text-sm ${theme.errorBorder} ${theme.errorBg} ${theme.errorText}`}
          role="alert"
        >
          {error}
        </p>
      )}
      {!loading && !error && matches.length === 0 && (
        <p className={`text-center text-sm ${theme.emptyText}`}>
          No hay partidos en esta {roundLabel.toLowerCase()}.
        </p>
      )}
      {matches.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {matches.map((m) => (
            <FixtureCard
              key={m.id}
              match={m}
              round={round}
              routePrefix={cfg.routePrefix}
              theme={theme}
              seasonYear={seasonYear}
            />
          ))}
        </div>
      )}
    </div>
  );
}
