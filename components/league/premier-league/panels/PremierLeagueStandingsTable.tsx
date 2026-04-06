"use client";

import { useEffect, useState } from "react";
import { fetchTablaStandings } from "@/lib/api/fetch-standings";
import type { FilaTabla, FormaLetra } from "@/lib/api/standings-types";
import {
  PREMIER_LEAGUE_COMPETITION_ID,
  PREMIER_LEAGUE_SEASON_ID,
} from "../constants/premierLeagueStandingsIds";

const formaBadge: Record<
  FormaLetra,
  { label: string; className: string; title: string }
> = {
  V: {
    label: "V",
    className: "bg-emerald-500/85 text-white",
    title: "Victoria",
  },
  E: {
    label: "E",
    className: "bg-white/35 text-white",
    title: "Empate",
  },
  P: {
    label: "D",
    className: "bg-rose-500/90 text-white",
    title: "Derrota",
  },
};

function StandingsTableBody({ rows }: { rows: FilaTabla[] }) {
  return (
    <tbody>
      {rows.map((row, index) => {
        const isLast = index === rows.length - 1;
        return (
          <tr
            key={row.equipo_id}
            className="bg-[#28002b] transition-colors hover:bg-[#37003c]"
          >
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""} ${isLast ? "rounded-bl-2xl border-b border-transparent pl-4" : "pl-4"}`}
            >
              {row.posicion}
            </td>
            <td
              className={`px-2 py-2.5 sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="size-7 shrink-0 rounded-md border border-white/[0.12] bg-white/[0.06] sm:size-8"
                  aria-hidden
                />
                <span className="font-medium">{row.equipo}</span>
              </div>
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
            >
              {row.partidos_jugados}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
            >
              {row.partidos_ganados}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
            >
              {row.partidos_empatados}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
            >
              {row.partidos_perdidos}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
            >
              {row.goles_a_favor}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
            >
              {row.goles_en_contra}
            </td>
            <td
              className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
            >
              {row.diferencia_goles > 0
                ? `+${row.diferencia_goles}`
                : row.diferencia_goles}
            </td>
            <td
              className={`px-2 py-2.5 text-center text-base font-bold tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
            >
              {row.puntos}
            </td>
            <td
              className={`px-2 py-2.5 pr-4 sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""} ${isLast ? "rounded-br-2xl border-b border-transparent" : ""}`}
            >
              <div
                className="flex justify-center gap-1"
                aria-label={`Forma: ${row.forma.join(", ")}`}
              >
                {row.forma.map((f, i) => (
                  <span
                    key={`${row.equipo_id}-f-${i}`}
                    className={`flex size-6 items-center justify-center rounded-full text-[0.65rem] font-bold ${formaBadge[f].className}`}
                    title={formaBadge[f].title}
                  >
                    {formaBadge[f].label}
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

export function PremierLeagueStandingsTable() {
  const [rows, setRows] = useState<FilaTabla[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const result = await fetchTablaStandings(
        PREMIER_LEAGUE_COMPETITION_ID,
        PREMIER_LEAGUE_SEASON_ID,
      );

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
            : `Error al cargar la tabla (${result.status})`);
        setError(msg);
      }
      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      {loading && (
        <p className="text-center text-sm text-white/70">Cargando tabla…</p>
      )}
      {!loading && error && (
        <p
          className="rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-3 text-center text-sm text-rose-100"
          role="alert"
        >
          {error}
        </p>
      )}
      {!loading && !error && rows && rows.length === 0 && (
        <p className="text-center text-sm text-white/70">
          Aún no hay partidos con resultado en esta temporada.
        </p>
      )}
      {rows && rows.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#1e0021]/35 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-[2px]">
          <table className="w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm text-white/95">
            <thead>
              <tr className="bg-[#1e0021] text-xs font-bold uppercase tracking-wide text-white/75 sm:text-sm">
                <th
                  scope="col"
                  className="rounded-tl-2xl border-b border-white/[0.06] px-2 py-3.5 pl-4 text-center sm:px-3"
                >
                  Posición
                </th>
                <th
                  scope="col"
                  className="min-w-[10.5rem] border-b border-white/[0.06] px-2 py-3.5 sm:px-3"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="size-7 shrink-0 sm:size-8"
                      aria-hidden
                    />
                    Equipo
                  </div>
                </th>
                <th
                  scope="col"
                  className="border-b border-white/[0.06] px-2 py-3.5 text-center sm:px-3"
                >
                  PJ
                </th>
                <th
                  scope="col"
                  className="border-b border-white/[0.06] px-2 py-3.5 text-center sm:px-3"
                >
                  PG
                </th>
                <th
                  scope="col"
                  className="border-b border-white/[0.06] px-2 py-3.5 text-center sm:px-3"
                >
                  PE
                </th>
                <th
                  scope="col"
                  className="border-b border-white/[0.06] px-2 py-3.5 text-center sm:px-3"
                >
                  PP
                </th>
                <th
                  scope="col"
                  className="border-b border-white/[0.06] px-2 py-3.5 text-center sm:px-3"
                >
                  GF
                </th>
                <th
                  scope="col"
                  className="border-b border-white/[0.06] px-2 py-3.5 text-center sm:px-3"
                >
                  GC
                </th>
                <th
                  scope="col"
                  className="border-b border-white/[0.06] px-2 py-3.5 text-center sm:px-3"
                >
                  GD
                </th>
                <th
                  scope="col"
                  className="border-b border-white/[0.06] px-2 py-3.5 text-center font-bold text-white/95 sm:px-3"
                >
                  Puntos
                </th>
                <th
                  scope="col"
                  className="rounded-tr-2xl border-b border-white/[0.06] px-2 py-3.5 pr-4 text-center sm:px-3"
                >
                  Forma
                </th>
              </tr>
            </thead>
            <StandingsTableBody rows={rows} />
          </table>
        </div>
      )}
    </div>
  );
}
