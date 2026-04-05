import {
  BUNDESLIGA_BG_CARD,
  BUNDESLIGA_BG_CONTENT,
  BUNDESLIGA_BORDER,
  bundesligaAccent,
} from "../constants/bundesligaTheme";

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
  "Bayern Munich",
  "Bayer Leverkusen",
  "VfB Stuttgart",
  "RB Leipzig",
  "Borussia Dortmund",
  "Eintracht Frankfurt",
  "TSG Hoffenheim",
  "1. FC Heidenheim",
  "Werder Bremen",
  "SC Freiburg",
  "FC Augsburg",
  "VfL Wolfsburg",
  "Borussia Mönchengladbach",
  "Union Berlin",
  "1. FSV Mainz 05",
  "VfL Bochum",
  "Holstein Kiel",
  "FC St. Pauli",
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
  const pj = 26;
  const pg = Math.max(4, 18 - Math.floor(i * 0.75));
  const pe = Math.min(8, 2 + (i % 5));
  const pp = Math.max(0, pj - pg - pe);
  const gf = 62 - i * 2;
  const gc = 24 + Math.floor(i * 1.5);
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

export function BundesligaStandingsTable() {
  return (
    <div
      className="overflow-x-auto rounded-2xl border shadow-sm"
      style={{
        borderColor: BUNDESLIGA_BORDER,
        backgroundColor: BUNDESLIGA_BG_CARD,
      }}
    >
      <table className="w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm text-slate-200">
        <thead>
          <tr className="bg-[#191e24] text-xs font-bold uppercase tracking-wide text-white/90 sm:text-sm">
            <th
              scope="col"
              className="rounded-tl-2xl border-b border-[#34383c] px-2 py-3.5 pl-4 text-center sm:px-3"
            >
              Posición
            </th>
            <th
              scope="col"
              className="min-w-[10.5rem] border-b border-[#34383c] px-2 py-3.5 sm:px-3"
            >
              <div className="flex items-center gap-2.5">
                <span className="size-7 shrink-0 sm:size-8" aria-hidden />
                Equipo
              </div>
            </th>
            <th
              scope="col"
              className="border-b border-[#34383c] px-2 py-3.5 text-center sm:px-3"
            >
              PJ
            </th>
            <th
              scope="col"
              className="border-b border-[#34383c] px-2 py-3.5 text-center sm:px-3"
            >
              PG
            </th>
            <th
              scope="col"
              className="border-b border-[#34383c] px-2 py-3.5 text-center sm:px-3"
            >
              PE
            </th>
            <th
              scope="col"
              className="border-b border-[#34383c] px-2 py-3.5 text-center sm:px-3"
            >
              PP
            </th>
            <th
              scope="col"
              className="border-b border-[#34383c] px-2 py-3.5 text-center sm:px-3"
            >
              GF
            </th>
            <th
              scope="col"
              className="border-b border-[#34383c] px-2 py-3.5 text-center sm:px-3"
            >
              GC
            </th>
            <th
              scope="col"
              className="border-b border-[#34383c] px-2 py-3.5 text-center sm:px-3"
            >
              GD
            </th>
            <th
              scope="col"
              className="border-b border-[#34383c] px-2 py-3.5 text-center font-bold text-white sm:px-3"
            >
              Puntos
            </th>
            <th
              scope="col"
              className="rounded-tr-2xl border-b border-[#34383c] px-2 py-3.5 pr-4 text-center sm:px-3"
            >
              Forma
            </th>
          </tr>
        </thead>
        <tbody>
          {MOCK_STANDINGS.map((row, index) => {
            const isLast = index === MOCK_STANDINGS.length - 1;
            const rowBorder = !isLast ? "border-b border-[#34383c]" : "";
            return (
              <tr
                key={row.team}
                className="bg-[#1a2128] transition-colors hover:bg-[#222a32]"
              >
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-slate-300 sm:px-3 sm:py-3 ${rowBorder} ${isLast ? "rounded-bl-2xl pl-4" : "pl-4"}`}
                >
                  {row.position}
                </td>
                <td
                  className={`px-2 py-2.5 sm:px-3 sm:py-3 ${rowBorder}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="size-7 shrink-0 rounded-md border sm:size-8"
                      style={{
                        borderColor: BUNDESLIGA_BORDER,
                        backgroundColor: BUNDESLIGA_BG_CONTENT,
                      }}
                      aria-hidden
                    />
                    <span className="font-medium text-slate-100">{row.team}</span>
                  </div>
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-slate-300 sm:px-3 sm:py-3 ${rowBorder}`}
                >
                  {row.pj}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-slate-300 sm:px-3 sm:py-3 ${rowBorder}`}
                >
                  {row.pg}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-slate-300 sm:px-3 sm:py-3 ${rowBorder}`}
                >
                  {row.pe}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-slate-300 sm:px-3 sm:py-3 ${rowBorder}`}
                >
                  {row.pp}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-slate-300 sm:px-3 sm:py-3 ${rowBorder}`}
                >
                  {row.gf}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-slate-300 sm:px-3 sm:py-3 ${rowBorder}`}
                >
                  {row.gc}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-slate-300 sm:px-3 sm:py-3 ${rowBorder}`}
                >
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </td>
                <td
                  className={`px-2 py-2.5 text-center text-base font-bold tabular-nums sm:px-3 sm:py-3 ${rowBorder}`}
                  style={{ color: bundesligaAccent }}
                >
                  {row.points}
                </td>
                <td
                  className={`px-2 py-2.5 pr-4 sm:px-3 sm:py-3 ${rowBorder} ${isLast ? "rounded-br-2xl" : ""}`}
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
