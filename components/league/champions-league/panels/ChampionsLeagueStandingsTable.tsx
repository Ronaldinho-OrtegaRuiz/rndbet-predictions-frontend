import {
  UCL_BG_DEEP,
  UCL_BG_SURFACE,
  UCL_BORDER,
  uclAccentBlue,
  uclAccentCyan,
} from "../constants/uclTheme";

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

const TEAM_NAMES = [
  "Real Madrid",
  "Manchester City",
  "Bayern Munich",
  "Arsenal",
  "Barcelona",
  "Paris Saint-Germain",
  "Liverpool",
  "Inter Milan",
  "Atletico Madrid",
  "Borussia Dortmund",
  "Juventus",
  "FC Porto",
  "SL Benfica",
  "PSV Eindhoven",
  "Celtic",
  "RB Leipzig",
  "Galatasaray",
  "Sporting CP",
] as const;

const FORM_ROTATIONS: FormResult[][] = [
  ["W", "W", "D", "W", "W"],
  ["W", "D", "W", "L", "W"],
  ["L", "W", "W", "D", "W"],
  ["D", "W", "L", "W", "D"],
  ["W", "L", "D", "D", "W"],
  ["W", "D", "L", "W", "D"],
];

const MOCK_STANDINGS: StandingRow[] = TEAM_NAMES.map((team, i) => {
  const pj = 6;
  const pg = Math.max(1, 5 - Math.floor(i * 0.35));
  const pe = Math.min(3, 1 + (i % 3));
  const pp = Math.max(0, pj - pg - pe);
  const gf = 14 - i;
  const gc = 4 + Math.floor(i * 0.6);
  const gd = gf - gc;
  const points = pg * 3 + pe;
  return {
    position: i + 1,
    team,
    pj,
    pg,
    pe,
    pp,
    gf,
    gc,
    gd,
    points,
    form: FORM_ROTATIONS[i % FORM_ROTATIONS.length]!,
  };
});

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
    className: "bg-[#4a5568] text-white",
  },
  L: {
    label: "D",
    className: "bg-rose-500/90 text-white",
  },
};

export function ChampionsLeagueStandingsTable() {
  return (
    <div
      className="overflow-x-auto rounded-2xl border shadow-sm"
      style={{
        borderColor: UCL_BORDER,
        backgroundColor: UCL_BG_SURFACE,
      }}
    >
      <table className="w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm text-[#f1f3f8]/90">
        <thead>
          <tr
            className="text-xs font-bold uppercase tracking-wide text-[#f1f3f8] sm:text-sm"
            style={{ backgroundColor: uclAccentBlue }}
          >
            <th
              scope="col"
              className="rounded-tl-2xl border-b px-2 py-3.5 pl-4 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              Posición
            </th>
            <th
              scope="col"
              className="min-w-[10.5rem] border-b px-2 py-3.5 sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="size-7 shrink-0 sm:size-8" aria-hidden />
                Equipo
              </div>
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              PJ
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              PG
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              PE
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              PP
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              GF
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              GC
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              GD
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center font-bold text-[#f1f3f8] sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              Puntos
            </th>
            <th
              scope="col"
              className="rounded-tr-2xl border-b px-2 py-3.5 pr-4 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              Forma
            </th>
          </tr>
        </thead>
        <tbody>
          {MOCK_STANDINGS.map((row, index) => {
            const isLast = index === MOCK_STANDINGS.length - 1;
            const rowBorder = !isLast ? "border-b" : "";
            const borderStyle = { borderColor: UCL_BORDER };
            return (
              <tr
                key={row.team}
                className="transition-colors hover:bg-[#051a7a]"
                style={{ backgroundColor: UCL_BG_SURFACE }}
              >
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f1f3f8]/75 sm:px-3 sm:py-3 ${rowBorder} ${isLast ? "rounded-bl-2xl pl-4" : "pl-4"}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.position}
                </td>
                <td
                  className={`px-2 py-2.5 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="size-7 shrink-0 rounded-md border sm:size-8"
                      style={{
                        borderColor: UCL_BORDER,
                        backgroundColor: UCL_BG_DEEP,
                      }}
                      aria-hidden
                    />
                    <span className="font-medium text-[#f1f3f8]">{row.team}</span>
                  </div>
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f1f3f8]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.pj}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f1f3f8]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.pg}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f1f3f8]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.pe}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f1f3f8]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.pp}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f1f3f8]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.gf}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f1f3f8]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.gc}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f1f3f8]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </td>
                <td
                  className={`px-2 py-2.5 text-center text-base font-bold tabular-nums sm:px-3 sm:py-3 ${rowBorder}`}
                  style={
                    !isLast
                      ? { ...borderStyle, color: uclAccentCyan }
                      : { color: uclAccentCyan }
                  }
                >
                  {row.points}
                </td>
                <td
                  className={`px-2 py-2.5 pr-4 sm:px-3 sm:py-3 ${rowBorder} ${isLast ? "rounded-br-2xl" : ""}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  <div
                    className="flex justify-center gap-1"
                    aria-label={`Forma: ${row.form.join(", ")}`}
                  >
                    {row.form.map((f, j) => (
                      <span
                        key={`${row.team}-f-${j}`}
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
