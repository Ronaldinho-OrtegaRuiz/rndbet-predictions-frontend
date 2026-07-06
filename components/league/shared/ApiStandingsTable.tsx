"use client";

import { useEffect, useState } from "react";
import { fetchTablaStandings } from "@/lib/api/fetch-standings";
import type { FilaTabla, FormaLetra } from "@/lib/api/standings-types";
import { isClientSessionValid } from "@/lib/auth/client-session";
import { RNDBET_SESSION_READY_EVENT } from "@/lib/auth/constants";
import {
  type LeagueSlug,
} from "@/lib/leagues/config";
import { useLeagueSeasonSelection } from "@/lib/leagues/useLeagueSeasonSelection";
import { RemoteTeamLogo } from "./RemoteTeamLogo";
import { SeasonYearSelector } from "./SeasonYearSelector";
import { getStandingsTheme, type StandingsTheme } from "./themes";

const formaBadgeKeys: Record<
  FormaLetra,
  keyof Pick<StandingsTheme, "formaWin" | "formaDraw" | "formaLoss">
> = {
  V: "formaWin",
  E: "formaDraw",
  P: "formaLoss",
};

const formaLabels: Record<FormaLetra, { label: string; title: string }> = {
  V: { label: "V", title: "Victoria" },
  E: { label: "E", title: "Empate" },
  P: { label: "D", title: "Derrota" },
};

function StandingsTableBody({
  rows,
  theme,
}: {
  rows: FilaTabla[];
  theme: StandingsTheme;
}) {
  return (
    <tbody>
      {rows.map((row, index) => {
        const isLast = index === rows.length - 1;
        return (
          <tr
            key={row.equipo_id}
            className={`${theme.bodyRow} ${theme.bodyRowHover}`}
          >
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""} ${isLast ? "rounded-bl-2xl border-b border-transparent pl-4" : "pl-4"}`}
            >
              {row.posicion}
            </td>
            <td
              className={`px-2 py-2.5 sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""}`}
            >
              <div className="flex items-center gap-2.5">
                <RemoteTeamLogo
                  logoUrl={row.logo_url}
                  variant="standings"
                  label={row.equipo}
                  tone={theme.tone}
                />
                <span className="font-medium">{row.equipo}</span>
              </div>
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""}`}
            >
              {row.partidos_jugados}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""}`}
            >
              {row.partidos_ganados}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""}`}
            >
              {row.partidos_empatados}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""}`}
            >
              {row.partidos_perdidos}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""}`}
            >
              {row.goles_a_favor}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""}`}
            >
              {row.goles_en_contra}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""}`}
            >
              {row.diferencia_goles > 0
                ? `+${row.diferencia_goles}`
                : row.diferencia_goles}
            </td>
            <td
              className={`px-2 py-2.5 text-center text-base font-bold tabular-nums sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""}`}
            >
              {row.puntos}
            </td>
            <td
              className={`px-2 py-2.5 pr-4 sm:px-3 sm:py-3 ${!isLast ? theme.cellBorder : ""} ${isLast ? "rounded-br-2xl border-b border-transparent" : ""}`}
            >
              <div
                className="flex justify-center gap-1"
                aria-label={`Forma: ${row.forma.join(", ")}`}
              >
                {row.forma.map((f, i) => (
                  <span
                    key={`${row.equipo_id}-f-${i}`}
                    className={`flex size-6 items-center justify-center rounded-full text-[0.65rem] font-bold ${theme[formaBadgeKeys[f]]}`}
                    title={formaLabels[f].title}
                  >
                    {formaLabels[f].label}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export function ApiStandingsTable({ leagueSlug }: { leagueSlug: LeagueSlug }) {
  const theme = getStandingsTheme(leagueSlug);
  const { seasonId, competitionId } = useLeagueSeasonSelection(leagueSlug);
  const [rows, setRows] = useState<FilaTabla[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isClientSessionValid()) {
        const returnTo = window.location.pathname + window.location.search;
        window.location.assign(`/login?next=${encodeURIComponent(returnTo)}`);
        return;
      }

      setLoading(true);
      setError(null);

      const result = await fetchTablaStandings(competitionId, seasonId);

      if (cancelled) return;

      if (result.ok) {
        setRows(result.data.tabla);
        setError(null);
      } else {
        setRows(null);
        const msg =
          result.problem?.detail ??
          result.problem?.title ??
          (result.status === 404
            ? "Temporada no encontrada"
            : result.status === 401
              ? "Sesión expirada. Inicia sesión de nuevo."
              : `Error al cargar la tabla (${result.status})`);
        setError(msg);
      }
      setLoading(false);
    }

    void load();

    function onSessionReady() {
      if (!cancelled) void load();
    }
    window.addEventListener(RNDBET_SESSION_READY_EVENT, onSessionReady);

    return () => {
      cancelled = true;
      window.removeEventListener(RNDBET_SESSION_READY_EVENT, onSessionReady);
    };
  }, [competitionId, leagueSlug, seasonId]);

  const headerBorder =
    theme.tone === "dark" ? "border-b border-white/[0.06]" : "border-b border-slate-200";

  return (
    <div className="space-y-4">
      <SeasonYearSelector leagueSlug={leagueSlug} />
      {loading && (
        <p className={`text-center text-sm ${theme.loadingText}`}>Cargando tabla…</p>
      )}
      {!loading && error && (
        <p
          className={`rounded-xl border px-4 py-3 text-center text-sm ${theme.errorBorder} ${theme.errorBg} ${theme.errorText}`}
          role="alert"
        >
          {error}
        </p>
      )}
      {!loading && !error && rows && rows.length === 0 && (
        <p className={`text-center text-sm ${theme.emptyText}`}>
          Aún no hay partidos con resultado en esta temporada.
        </p>
      )}
      {rows && rows.length > 0 && (
        <div className={theme.tableWrapper}>
          <table
            className={`w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm ${theme.tableText}`}
          >
            <thead>
              <tr className={theme.headerRow}>
                <th
                  scope="col"
                  className={`rounded-tl-2xl ${headerBorder} px-2 py-3.5 pl-4 text-center sm:px-3`}
                >
                  Posición
                </th>
                <th
                  scope="col"
                  className={`min-w-[10.5rem] ${headerBorder} px-2 py-3.5 sm:px-3`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-7 shrink-0 sm:size-8" aria-hidden />
                    Equipo
                  </div>
                </th>
                <th scope="col" className={`${headerBorder} px-2 py-3.5 text-center sm:px-3`}>
                  PJ
                </th>
                <th scope="col" className={`${headerBorder} px-2 py-3.5 text-center sm:px-3`}>
                  PG
                </th>
                <th scope="col" className={`${headerBorder} px-2 py-3.5 text-center sm:px-3`}>
                  PE
                </th>
                <th scope="col" className={`${headerBorder} px-2 py-3.5 text-center sm:px-3`}>
                  PP
                </th>
                <th scope="col" className={`${headerBorder} px-2 py-3.5 text-center sm:px-3`}>
                  GF
                </th>
                <th scope="col" className={`${headerBorder} px-2 py-3.5 text-center sm:px-3`}>
                  GC
                </th>
                <th scope="col" className={`${headerBorder} px-2 py-3.5 text-center sm:px-3`}>
                  GD
                </th>
                <th
                  scope="col"
                  className={`${headerBorder} px-2 py-3.5 text-center font-bold sm:px-3`}
                >
                  Puntos
                </th>
                <th
                  scope="col"
                  className={`rounded-tr-2xl ${headerBorder} px-2 py-3.5 pr-4 text-center sm:px-3`}
                >
                  Forma
                </th>
              </tr>
            </thead>
            <StandingsTableBody rows={rows} theme={theme} />
          </table>
        </div>
      )}
    </div>
  );
}
