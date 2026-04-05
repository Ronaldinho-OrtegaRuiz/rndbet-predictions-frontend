import {
  UEL_BG_DEEP,
  UEL_BG_SURFACE,
  UEL_BORDER,
  uelAccentOrange,
} from "../constants/uelTheme";

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
  "Liverpool",
  "Bayer Leverkusen",
  "Brighton",
  "West Ham United",
  "Atalanta",
  "Villarreal",
  "Sporting CP",
  "Roma",
  "Sevilla",
  "Marseille",
  "SC Freiburg",
  "Fiorentina",
  "Ajax",
  "Rangers",
  "Olympiakos",
  "Club Brugge",
  "SL Benfica",
  "Qarabag FK",
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
  const gf = 13 - i;
  const gc = 5 + Math.floor(i * 0.55);
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

export function EuropaLeagueStandingsTable() {
  return (
    <div
      className="overflow-x-auto rounded-2xl border shadow-sm"
      style={{
        borderColor: UEL_BORDER,
        backgroundColor: UEL_BG_SURFACE,
      }}
    >
      <table className="w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm text-[#f5f5f7]/90">
        <thead>
          <tr
            className="text-xs font-bold uppercase tracking-wide text-[#f5f5f7] sm:text-sm"
            style={{ backgroundColor: UEL_BORDER }}
          >
            <th
              scope="col"
              className="rounded-tl-2xl border-b px-2 py-3.5 pl-4 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              Posición
            </th>
            <th
              scope="col"
              className="min-w-[10.5rem] border-b px-2 py-3.5 sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="size-7 shrink-0 sm:size-8" aria-hidden />
                Equipo
              </div>
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              PJ
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              PG
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              PE
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              PP
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              GF
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              GC
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              GD
            </th>
            <th
              scope="col"
              className="border-b px-2 py-3.5 text-center font-bold text-[#f5f5f7] sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              Puntos
            </th>
            <th
              scope="col"
              className="rounded-tr-2xl border-b px-2 py-3.5 pr-4 text-center sm:px-3"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              Forma
            </th>
          </tr>
        </thead>
        <tbody>
          {MOCK_STANDINGS.map((row, index) => {
            const isLast = index === MOCK_STANDINGS.length - 1;
            const rowBorder = !isLast ? "border-b" : "";
            const borderStyle = { borderColor: UEL_BORDER };
            return (
              <tr
                key={row.team}
                className="transition-colors hover:bg-[#2c2c2e]"
                style={{ backgroundColor: UEL_BG_SURFACE }}
              >
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f5f5f7]/75 sm:px-3 sm:py-3 ${rowBorder} ${isLast ? "rounded-bl-2xl pl-4" : "pl-4"}`}
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
                        borderColor: UEL_BORDER,
                        backgroundColor: UEL_BG_DEEP,
                      }}
                      aria-hidden
                    />
                    <span className="font-medium text-[#f5f5f7]">{row.team}</span>
                  </div>
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f5f5f7]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.pj}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f5f5f7]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.pg}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f5f5f7]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.pe}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f5f5f7]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.pp}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f5f5f7]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.gf}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f5f5f7]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.gc}
                </td>
                <td
                  className={`px-2 py-2.5 text-center tabular-nums text-[#f5f5f7]/75 sm:px-3 sm:py-3 ${rowBorder}`}
                  style={!isLast ? borderStyle : undefined}
                >
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </td>
                <td
                  className={`px-2 py-2.5 text-center text-base font-bold tabular-nums sm:px-3 sm:py-3 ${rowBorder}`}
                  style={
                    !isLast
                      ? { ...borderStyle, color: uelAccentOrange }
                      : { color: uelAccentOrange }
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
