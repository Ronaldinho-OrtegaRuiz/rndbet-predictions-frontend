import {
  UEL_BG_DEEP,
  UEL_BG_SURFACE,
  UEL_BORDER,
  uelAccentOrange,
} from "../constants/uelTheme";
import {
  MOCK_PREDICTIONS,
  type PredictionCardMock,
} from "../mocks/uelPredictionsMock";

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function LogoSlot({ label }: { label: string }) {
  return (
    <span
      className="flex size-11 shrink-0 items-center justify-center rounded-lg border shadow-sm sm:size-12"
      style={{
        borderColor: UEL_BORDER,
        backgroundColor: UEL_BG_DEEP,
      }}
      aria-hidden
      title={label}
    />
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="flex flex-col gap-0.5 rounded-lg border px-3 py-2"
      style={{
        borderColor: UEL_BORDER,
        backgroundColor: UEL_BG_DEEP,
      }}
    >
      <span className="text-[0.65rem] font-medium uppercase tracking-wide text-[#f5f5f7]/50">
        {label}
      </span>
      <span className="text-sm font-semibold tabular-nums text-[#f5f5f7] sm:text-base">
        {value}
      </span>
    </div>
  );
}

function PredictionCard({ row }: { row: PredictionCardMock }) {
  const isLive = row.matchStatus === "live";
  const isScheduled = row.matchStatus === "scheduled";

  return (
    <article
      className="rounded-2xl border p-4 shadow-sm sm:p-5"
      style={{
        borderColor: UEL_BORDER,
        backgroundColor: UEL_BG_SURFACE,
      }}
    >
      <div className="mb-4 border-b pb-3" style={{ borderColor: UEL_BORDER }}>
        <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
          <span
            className="shrink-0 rounded-full px-3 py-1 text-xs font-bold sm:text-sm"
            style={{
              backgroundColor: isLive ? "rgba(255,105,0,0.2)" : "rgba(245,245,247,0.08)",
              color: isLive ? uelAccentOrange : "rgba(245,245,247,0.88)",
            }}
          >
            {isLive ? "En vivo" : "Por jugar"}
          </span>
        </div>

        {isScheduled && row.matchKickoffLabel ? (
          <p className="mb-3 text-center text-sm font-medium text-[#f5f5f7]/65 sm:text-base">
            {row.matchKickoffLabel}
          </p>
        ) : null}

        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <LogoSlot label={row.teamForPrediction} />
            <span className="max-w-[5.5rem] text-center text-[11px] font-medium leading-snug text-[#f5f5f7]/60 sm:max-w-[6.5rem] sm:text-xs">
              {row.teamForPrediction}
            </span>
          </div>
          <span
            className="shrink-0 text-sm font-bold tracking-wide sm:text-base"
            style={{ color: uelAccentOrange }}
          >
            VS
          </span>
          <div className="flex flex-col items-center gap-1.5">
            <LogoSlot label={row.rival} />
            <span className="max-w-[5.5rem] text-center text-[11px] font-medium leading-snug text-[#f5f5f7]/60 sm:max-w-[6.5rem] sm:text-xs">
              {row.rival}
            </span>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-[#f5f5f7]/55 sm:text-sm">
          Predicción asociada a{" "}
          <span className="font-bold text-[#f5f5f7]">{row.teamForPrediction}</span>
        </p>
      </div>

      <p className="mb-4 text-xs text-[#f5f5f7]/50">
        Generada:{" "}
        {new Date(row.created_at).toLocaleString("es", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="Goles esperados (local)" value={row.expected_home_goals.toFixed(1)} />
        <Stat label="Goles esperados (visitante)" value={row.expected_away_goals.toFixed(1)} />
        <Stat label="Prob. victoria local" value={pct(row.prob_home_win)} />
        <Stat label="Prob. empate" value={pct(row.prob_draw)} />
        <Stat label="Prob. victoria visitante" value={pct(row.prob_away_win)} />
        <Stat label="Tiros" value={row.predicted_shots} />
        <Stat label="Tiros a puerta" value={row.predicted_shots_on_target} />
        <Stat label="Paradas" value={row.predicted_saves} />
        <Stat label="Amarillas" value={row.predicted_yellow_cards} />
        <Stat label="Rojas" value={row.predicted_red_cards} />
        <Stat label="Córners" value={row.predicted_corners} />
        <Stat label="Faltas" value={row.predicted_fouls} />
        <Stat label="Fueras de juego" value={row.predicted_offsides} />
      </div>
    </article>
  );
}

export function EuropaLeaguePredictionsPanel() {
  return (
    <div className="space-y-8">
      <div
        className="space-y-3 rounded-2xl border p-4 shadow-sm sm:p-6"
        style={{
          borderColor: UEL_BORDER,
          backgroundColor: UEL_BG_SURFACE,
        }}
      >
        <h2 className="text-lg font-bold text-[#f5f5f7] sm:text-xl">Predicciones</h2>
        <p className="text-sm leading-relaxed text-[#f5f5f7]/70 sm:text-base">
          Aquí verás las <strong className="text-[#f5f5f7]">predicciones por equipo</strong>{" "}
          para los partidos que tengan modelo disponible. Solo aplican a encuentros{" "}
          <strong className="text-[#f5f5f7]">por jugar</strong> o{" "}
          <strong style={{ color: uelAccentOrange }}>en vivo</strong>: los partidos{" "}
          <strong className="text-[#f5f5f7]">ya jugados no aparecen en esta lista</strong>.
          Las predicciones de partidos <strong className="text-[#f5f5f7]">ya jugados</strong>{" "}
          se verán en la <strong className="text-[#f5f5f7]">vista propia de cada partido</strong>.
          Cada tarjeta refleja la predicción desde la perspectiva de un equipo concreto
          frente a su rival (no es una única predicción “neutra” del partido).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MOCK_PREDICTIONS.map((row, i) => (
          <PredictionCard key={`${row.teamForPrediction}-${row.rival}-${i}`} row={row} />
        ))}
      </div>
    </div>
  );
}
