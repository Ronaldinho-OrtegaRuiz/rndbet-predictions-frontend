import { laLigaAccent } from "../constants/laLigaAccent";
import {
  MOCK_PREDICTIONS,
  type PredictionCardMock,
} from "../mocks/laLigaPredictionsMock";

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function LogoSlot({ label }: { label: string }) {
  return (
    <span
      className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm sm:size-12"
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
    <div className="flex flex-col gap-0.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <span className="text-[0.65rem] font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="text-sm font-semibold tabular-nums text-slate-900 sm:text-base">
        {value}
      </span>
    </div>
  );
}

function PredictionCard({ row }: { row: PredictionCardMock }) {
  const isLive = row.matchStatus === "live";
  const isScheduled = row.matchStatus === "scheduled";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
          <span
            className="shrink-0 rounded-full px-3 py-1 text-xs font-bold sm:text-sm"
            style={{
              backgroundColor: isLive ? `${laLigaAccent}18` : "rgba(15, 23, 42, 0.06)",
              color: isLive ? laLigaAccent : "rgba(51, 65, 85, 0.95)",
            }}
          >
            {isLive ? "En vivo" : "Por jugar"}
          </span>
        </div>

        {isScheduled && row.matchKickoffLabel ? (
          <p className="mb-3 text-center text-sm font-medium text-slate-600 sm:text-base">
            {row.matchKickoffLabel}
          </p>
        ) : null}

        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <LogoSlot label={row.teamForPrediction} />
            <span className="max-w-[5.5rem] text-center text-[11px] font-medium leading-snug text-slate-600 sm:max-w-[6.5rem] sm:text-xs">
              {row.teamForPrediction}
            </span>
          </div>
          <span className="shrink-0 text-sm font-bold tracking-wide text-slate-400 sm:text-base">
            VS
          </span>
          <div className="flex flex-col items-center gap-1.5">
            <LogoSlot label={row.rival} />
            <span className="max-w-[5.5rem] text-center text-[11px] font-medium leading-snug text-slate-600 sm:max-w-[6.5rem] sm:text-xs">
              {row.rival}
            </span>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-slate-500 sm:text-sm">
          Predicción asociada a{" "}
          <span className="font-bold text-slate-900">{row.teamForPrediction}</span>
        </p>
      </div>

      <p className="mb-4 text-xs text-slate-500">
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

export function LaLigaPredictionsPanel() {
  return (
    <div className="space-y-8">
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Predicciones</h2>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          Aquí verás las <strong className="text-slate-900">predicciones por equipo</strong>{" "}
          para los partidos que tengan modelo disponible. Solo aplican a encuentros{" "}
          <strong className="text-slate-900">por jugar</strong> o{" "}
          <strong className="text-slate-900">en vivo</strong>: los partidos{" "}
          <strong className="text-slate-900">ya jugados no aparecen en esta lista</strong>.
          Las predicciones de partidos <strong className="text-slate-900">ya jugados</strong>{" "}
          se verán en la <strong className="text-slate-900">vista propia de cada partido</strong>.
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
