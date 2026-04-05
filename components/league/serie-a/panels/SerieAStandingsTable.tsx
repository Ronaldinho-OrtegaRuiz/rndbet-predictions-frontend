export type FormResult = "W" | "D" | "L";

export type StandingRow = {
  position: number;
  team: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  gd: number;
  points: number;
  form: FormResult[];
};

const MOCK_STANDINGS: StandingRow[] = [
  {
    position: 1,
    team: "Inter",
    pj: 28,
    pg: 20,
    pe: 5,
    pp: 3,
    gf: 64,
    gc: 28,
    gd: 36,
    points: 65,
    form: ["W", "W", "D", "W", "L"],
  },
  {
    position: 2,
    team: "Juventus",
    pj: 28,
    pg: 18,
    pe: 6,
    pp: 4,
    gf: 58,
    gc: 30,
    gd: 28,
    points: 60,
    form: ["W", "D", "W", "W", "W"],
  },
  {
    position: 3,
    team: "AC Milan",
    pj: 28,
    pg: 17,
    pe: 6,
    pp: 5,
    gf: 62,
    gc: 32,
    gd: 30,
    points: 57,
    form: ["L", "W", "W", "D", "W"],
  },
  {
    position: 4,
    team: "Napoli",
    pj: 28,
    pg: 15,
    pe: 7,
    pp: 6,
    gf: 48,
    gc: 35,
    gd: 13,
    points: 52,
    form: ["D", "W", "L", "W", "D"],
  },
  {
    position: 5,
    team: "Atalanta",
    pj: 28,
    pg: 14,
    pe: 8,
    pp: 6,
    gf: 44,
    gc: 38,
    gd: 6,
    points: 50,
    form: ["W", "L", "D", "D", "W"],
  },
  {
    position: 6,
    team: "Roma",
    pj: 28,
    pg: 13,
    pe: 7,
    pp: 8,
    gf: 42,
    gc: 40,
    gd: 2,
    points: 46,
    form: ["W", "D", "L", "W", "D"],
  },
  {
    position: 7,
    team: "Lazio",
    pj: 28,
    pg: 12,
    pe: 9,
    pp: 7,
    gf: 45,
    gc: 42,
    gd: 3,
    points: 45,
    form: ["D", "W", "D", "L", "W"],
  },
  {
    position: 8,
    team: "Fiorentina",
    pj: 28,
    pg: 12,
    pe: 6,
    pp: 10,
    gf: 50,
    gc: 48,
    gd: 2,
    points: 42,
    form: ["L", "W", "W", "L", "D"],
  },
  {
    position: 9,
    team: "Bologna",
    pj: 28,
    pg: 11,
    pe: 8,
    pp: 9,
    gf: 40,
    gc: 44,
    gd: -4,
    points: 41,
    form: ["D", "L", "W", "D", "W"],
  },
  {
    position: 10,
    team: "Torino",
    pj: 28,
    pg: 11,
    pe: 7,
    pp: 10,
    gf: 38,
    gc: 46,
    gd: -8,
    points: 40,
    form: ["W", "D", "L", "L", "W"],
  },
  {
    position: 11,
    team: "Genoa",
    pj: 28,
    pg: 10,
    pe: 9,
    pp: 9,
    gf: 41,
    gc: 43,
    gd: -2,
    points: 39,
    form: ["L", "D", "W", "D", "L"],
  },
  {
    position: 12,
    team: "Monza",
    pj: 28,
    pg: 10,
    pe: 8,
    pp: 10,
    gf: 36,
    gc: 40,
    gd: -4,
    points: 38,
    form: ["D", "W", "L", "D", "D"],
  },
  {
    position: 13,
    team: "Verona",
    pj: 28,
    pg: 9,
    pe: 10,
    pp: 9,
    gf: 34,
    gc: 38,
    gd: -4,
    points: 37,
    form: ["W", "D", "D", "L", "W"],
  },
  {
    position: 14,
    team: "Lecce",
    pj: 28,
    pg: 9,
    pe: 8,
    pp: 11,
    gf: 32,
    gc: 42,
    gd: -10,
    points: 35,
    form: ["L", "W", "D", "L", "D"],
  },
  {
    position: 15,
    team: "Sassuolo",
    pj: 28,
    pg: 8,
    pe: 9,
    pp: 11,
    gf: 39,
    gc: 48,
    gd: -9,
    points: 33,
    form: ["D", "L", "W", "L", "D"],
  },
  {
    position: 16,
    team: "Cagliari",
    pj: 28,
    pg: 7,
    pe: 10,
    pp: 11,
    gf: 31,
    gc: 45,
    gd: -14,
    points: 31,
    form: ["L", "D", "D", "W", "L"],
  },
  {
    position: 17,
    team: "Parma",
    pj: 28,
    pg: 7,
    pe: 8,
    pp: 13,
    gf: 30,
    gc: 50,
    gd: -20,
    points: 29,
    form: ["L", "L", "D", "W", "D"],
  },
  {
    position: 18,
    team: "Empoli",
    pj: 28,
    pg: 6,
    pe: 6,
    pp: 16,
    gf: 28,
    gc: 54,
    gd: -26,
    points: 24,
    form: ["L", "L", "D", "L", "W"],
  },
  {
    position: 19,
    team: "Venezia",
    pj: 28,
    pg: 4,
    pe: 8,
    pp: 16,
    gf: 26,
    gc: 58,
    gd: -32,
    points: 20,
    form: ["D", "L", "L", "D", "L"],
  },
  {
    position: 20,
    team: "Udinese",
    pj: 28,
    pg: 3,
    pe: 5,
    pp: 20,
    gf: 22,
    gc: 62,
    gd: -40,
    points: 14,
    form: ["L", "L", "L", "D", "L"],
  },
];

const formBadge: Record<
  FormResult,
  { label: string; className: string }
> = {
  W: {
    label: "V",
    className: "bg-emerald-500/85 text-white",
  },
  D: {
    label: "E",
    className: "bg-white/35 text-white",
  },
  L: {
    label: "D",
    className: "bg-rose-500/90 text-white",
  },
};

export function SerieAStandingsTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0f2440]/35 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-[2px]">
      <table className="w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm text-white/95">
        <thead>
          <tr className="bg-[#0f2440] text-xs font-bold uppercase tracking-wide text-white/75 sm:text-sm">
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
        <tbody>
          {MOCK_STANDINGS.map((row, index) => {
            const isLast = index === MOCK_STANDINGS.length - 1;
            return (
              <tr
                key={row.team}
                className="bg-[#15365a] transition-colors hover:bg-[#1c4570]"
              >
                <td
                  className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""} ${isLast ? "rounded-bl-2xl border-b border-transparent pl-4" : "pl-4"}`}
                >
                  {row.position}
                </td>
                <td
                  className={`px-2 py-2.5 sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="size-7 shrink-0 rounded-md border border-white/[0.12] bg-white/[0.06] sm:size-8"
                      aria-hidden
                    />
                    <span className="font-medium">{row.team}</span>
                  </div>
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                >
                  {row.pj}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                >
                  {row.pg}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                >
                  {row.pe}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                >
                  {row.pp}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                >
                  {row.gf}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                >
                  {row.gc}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                >
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </td>
                <td
                  className={`px-2 py-2.5 text-center text-base font-bold tabular-nums sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""}`}
                >
                  {row.points}
                </td>
                <td
                  className={`px-2 py-2.5 pr-4 sm:px-3 sm:py-3 ${!isLast ? "border-b border-white/[0.04]" : ""} ${isLast ? "rounded-br-2xl border-b border-transparent" : ""}`}
                >
                  <div
                    className="flex justify-center gap-1"
                    aria-label={`Forma: ${row.form.join(", ")}`}
                  >
                    {row.form.map((f, i) => (
                      <span
                        key={`${row.team}-f-${i}`}
                        className={`flex size-6 items-center justify-center rounded-full text-[0.65rem] font-bold ${formBadge[f].className}`}
                        title={
                          f === "W"
                            ? "Victoria"
                            : f === "D"
                              ? "Empate"
                              : "Derrota"
                        }
                      >
                        {formBadge[f].label}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
