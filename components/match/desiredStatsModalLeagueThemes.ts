/** Identificador de liga para estilos del modal de estadísticas deseadas (alineado con cada `*MatchDetailView`). */
export type DesiredStatsLeagueId =
  | "la-liga"
  | "premier-league"
  | "serie-a"
  | "bundesliga"
  | "champions-league"
  | "europa-league"
  | "ligue-1";

export type DesiredStatsModalLeagueTheme = {
  overlayClass: string;
  panelClass: string;
  titleClass: string;
  closeButtonClass: string;
  tableWrapClass: string;
  tableClass: string;
  thClass: string;
  labelCellClass: string;
  /** Contenedor (borde + foco) del input y la franja de estado a la derecha. */
  inputShellClass: string;
  /** Campo de texto dentro del shell (sin borde propio). */
  inputFieldClass: string;
  cancelButtonClass: string;
};

export function getDesiredStatsModalLeagueTheme(league: DesiredStatsLeagueId): DesiredStatsModalLeagueTheme {
  switch (league) {
    case "la-liga":
      return {
        overlayClass: "bg-black/50",
        panelClass:
          "relative z-[1] w-full max-w-6xl sm:max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8",
        titleClass: "text-lg font-bold text-slate-900 sm:text-xl",
        closeButtonClass:
          "-m-1 flex size-11 shrink-0 items-center justify-center rounded-xl text-2xl font-light leading-none text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 sm:size-12 sm:text-3xl",
        tableWrapClass: "-mx-1 mt-5 overflow-x-auto sm:mt-6",
        tableClass: "w-full min-w-0 table-fixed border-collapse text-left text-sm sm:text-base",
        thClass: "border-b border-slate-200 pb-3 pr-3 font-bold text-slate-700 last:pr-0",
        labelCellClass: "border-b border-slate-100 py-2.5 pr-3 font-medium text-slate-700 last:pr-0 sm:py-3",
        inputShellClass:
          "flex min-w-0 overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-300",
        inputFieldClass:
          "min-h-0 min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm text-slate-900 tabular-nums outline-none placeholder:text-slate-400 read-only:cursor-not-allowed read-only:opacity-80 sm:min-h-[2.85rem] sm:px-3.5 sm:py-2.5 sm:text-base",
        cancelButtonClass:
          "rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:px-7 sm:py-3 sm:text-base",
      };
    case "premier-league":
      return {
        overlayClass: "bg-black/60",
        panelClass:
          "relative z-[1] w-full max-w-6xl sm:max-w-7xl rounded-2xl border border-white/[0.12] bg-[#28002b]/95 p-6 shadow-2xl sm:p-8",
        titleClass: "text-lg font-bold text-white sm:text-xl",
        closeButtonClass:
          "-m-1 flex size-11 shrink-0 items-center justify-center rounded-xl text-2xl font-light leading-none text-white/65 transition-colors hover:bg-white/10 hover:text-white sm:size-12 sm:text-3xl",
        tableWrapClass: "-mx-1 mt-5 overflow-x-auto sm:mt-6",
        tableClass: "w-full min-w-0 table-fixed border-collapse text-left text-sm sm:text-base",
        thClass: "border-b border-white/[0.12] pb-3 pr-3 font-bold text-white/85 last:pr-0",
        labelCellClass: "border-b border-white/[0.08] py-2.5 pr-3 font-medium text-white/80 last:pr-0 sm:py-3",
        inputShellClass:
          "flex min-w-0 overflow-hidden rounded-lg border border-white/[0.15] bg-[#1e0021]/80 focus-within:border-white/30 focus-within:ring-2 focus-within:ring-white/20",
        inputFieldClass:
          "min-h-0 min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm text-white tabular-nums outline-none placeholder:text-white/35 read-only:cursor-not-allowed read-only:opacity-80 sm:min-h-[2.85rem] sm:px-3.5 sm:py-2.5 sm:text-base",
        cancelButtonClass:
          "rounded-full border border-white/[0.2] bg-transparent px-6 py-2.5 text-sm font-bold text-white/85 shadow-sm transition-colors hover:bg-white/10 sm:px-7 sm:py-3 sm:text-base",
      };
    case "serie-a":
      return {
        overlayClass: "bg-black/60",
        panelClass:
          "relative z-[1] w-full max-w-6xl sm:max-w-7xl rounded-2xl border border-white/[0.1] bg-[#15365a]/95 p-6 shadow-2xl sm:p-8",
        titleClass: "text-lg font-bold text-white sm:text-xl",
        closeButtonClass:
          "-m-1 flex size-11 shrink-0 items-center justify-center rounded-xl text-2xl font-light leading-none text-white/65 transition-colors hover:bg-white/10 hover:text-white sm:size-12 sm:text-3xl",
        tableWrapClass: "-mx-1 mt-5 overflow-x-auto sm:mt-6",
        tableClass: "w-full min-w-0 table-fixed border-collapse text-left text-sm sm:text-base",
        thClass: "border-b border-white/[0.12] pb-3 pr-3 font-bold text-white/85 last:pr-0",
        labelCellClass: "border-b border-white/[0.08] py-2.5 pr-3 font-medium text-white/80 last:pr-0 sm:py-3",
        inputShellClass:
          "flex min-w-0 overflow-hidden rounded-lg border border-white/[0.15] bg-[#0f2440]/80 focus-within:border-white/30 focus-within:ring-2 focus-within:ring-white/20",
        inputFieldClass:
          "min-h-0 min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm text-white tabular-nums outline-none placeholder:text-white/35 read-only:cursor-not-allowed read-only:opacity-80 sm:min-h-[2.85rem] sm:px-3.5 sm:py-2.5 sm:text-base",
        cancelButtonClass:
          "rounded-full border border-white/[0.2] bg-transparent px-6 py-2.5 text-sm font-bold text-white/85 shadow-sm transition-colors hover:bg-white/10 sm:px-7 sm:py-3 sm:text-base",
      };
    case "bundesliga":
      return {
        overlayClass: "bg-black/60",
        panelClass:
          "relative z-[1] w-full max-w-6xl sm:max-w-7xl rounded-2xl border border-[#34383c] bg-[#1a2128] p-6 shadow-2xl sm:p-8",
        titleClass: "text-lg font-bold text-slate-100 sm:text-xl",
        closeButtonClass:
          "-m-1 flex size-11 shrink-0 items-center justify-center rounded-xl text-2xl font-light leading-none text-slate-400 transition-colors hover:bg-[#0f1419] hover:text-slate-100 sm:size-12 sm:text-3xl",
        tableWrapClass: "-mx-1 mt-5 overflow-x-auto sm:mt-6",
        tableClass: "w-full min-w-0 table-fixed border-collapse text-left text-sm sm:text-base",
        thClass: "border-b border-[#34383c] pb-3 pr-3 font-bold text-slate-300 last:pr-0",
        labelCellClass: "border-b border-[#34383c]/80 py-2.5 pr-3 font-medium text-slate-300 last:pr-0 sm:py-3",
        inputShellClass:
          "flex min-w-0 overflow-hidden rounded-lg border border-[#34383c] bg-[#0f1419] focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-600",
        inputFieldClass:
          "min-h-0 min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm text-slate-100 tabular-nums outline-none placeholder:text-slate-500 read-only:cursor-not-allowed read-only:opacity-80 sm:min-h-[2.85rem] sm:px-3.5 sm:py-2.5 sm:text-base",
        cancelButtonClass:
          "rounded-full border border-[#34383c] bg-[#0f1419] px-6 py-2.5 text-sm font-bold text-slate-200 transition-colors hover:border-slate-500 hover:text-white sm:px-7 sm:py-3 sm:text-base",
      };
    case "champions-league":
      return {
        overlayClass: "bg-black/60",
        panelClass:
          "relative z-[1] w-full max-w-6xl sm:max-w-7xl rounded-2xl border border-[#0c2478] bg-[#040a63]/95 p-6 shadow-2xl sm:p-8",
        titleClass: "text-lg font-bold text-[#f1f3f8] sm:text-xl",
        closeButtonClass:
          "-m-1 flex size-11 shrink-0 items-center justify-center rounded-xl text-2xl font-light leading-none text-[#f1f3f8]/65 transition-colors hover:bg-[#01035a]/80 hover:text-[#f1f3f8] sm:size-12 sm:text-3xl",
        tableWrapClass: "-mx-1 mt-5 overflow-x-auto sm:mt-6",
        tableClass: "w-full min-w-0 table-fixed border-collapse text-left text-sm sm:text-base",
        thClass: "border-b border-[#0c2478] pb-3 pr-3 font-bold text-[#f1f3f8]/85 last:pr-0",
        labelCellClass: "border-b border-[#0c2478]/70 py-2.5 pr-3 font-medium text-[#f1f3f8]/75 last:pr-0 sm:py-3",
        inputShellClass:
          "flex min-w-0 overflow-hidden rounded-lg border border-[#0c2478] bg-[#01035a]/80 focus-within:border-[#022ae4] focus-within:ring-2 focus-within:ring-[#022ae4]/40",
        inputFieldClass:
          "min-h-0 min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm text-[#f1f3f8] tabular-nums outline-none placeholder:text-[#f1f3f8]/35 read-only:cursor-not-allowed read-only:opacity-80 sm:min-h-[2.85rem] sm:px-3.5 sm:py-2.5 sm:text-base",
        cancelButtonClass:
          "rounded-full border border-[#0c2478] bg-[#01035a]/60 px-6 py-2.5 text-sm font-bold text-[#f1f3f8]/90 transition-colors hover:bg-[#01035a] sm:px-7 sm:py-3 sm:text-base",
      };
    case "europa-league":
      return {
        overlayClass: "bg-black/65",
        panelClass:
          "relative z-[1] w-full max-w-6xl sm:max-w-7xl rounded-2xl border border-[#333333] bg-[#1c1c1e]/95 p-6 shadow-2xl sm:p-8",
        titleClass: "text-lg font-bold text-[#f5f5f7] sm:text-xl",
        closeButtonClass:
          "-m-1 flex size-11 shrink-0 items-center justify-center rounded-xl text-2xl font-light leading-none text-[#f5f5f7]/65 transition-colors hover:bg-black/40 hover:text-[#f5f5f7] sm:size-12 sm:text-3xl",
        tableWrapClass: "-mx-1 mt-5 overflow-x-auto sm:mt-6",
        tableClass: "w-full min-w-0 table-fixed border-collapse text-left text-sm sm:text-base",
        thClass: "border-b border-[#333333] pb-3 pr-3 font-bold text-[#f5f5f7]/85 last:pr-0",
        labelCellClass: "border-b border-[#333333]/90 py-2.5 pr-3 font-medium text-[#f5f5f7]/75 last:pr-0 sm:py-3",
        inputShellClass:
          "flex min-w-0 overflow-hidden rounded-lg border border-[#333333] bg-black/50 focus-within:border-[#ff6900]/55 focus-within:ring-2 focus-within:ring-[#ff6900]/30",
        inputFieldClass:
          "min-h-0 min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm text-[#f5f5f7] tabular-nums outline-none placeholder:text-[#f5f5f7]/35 read-only:cursor-not-allowed read-only:opacity-80 sm:min-h-[2.85rem] sm:px-3.5 sm:py-2.5 sm:text-base",
        cancelButtonClass:
          "rounded-full border border-[#333333] bg-[#1c1c1e] px-6 py-2.5 text-sm font-bold text-[#f5f5f7]/90 transition-colors hover:bg-[#2c2c2e] sm:px-7 sm:py-3 sm:text-base",
      };
    case "ligue-1":
      return {
        overlayClass: "bg-black/60",
        panelClass:
          "relative z-[1] w-full max-w-6xl sm:max-w-7xl rounded-2xl border border-[#2e2e2e] bg-[#212120]/95 p-6 shadow-2xl sm:p-8",
        titleClass: "text-lg font-bold text-slate-100 sm:text-xl",
        closeButtonClass:
          "-m-1 flex size-11 shrink-0 items-center justify-center rounded-xl text-2xl font-light leading-none text-slate-400 transition-colors hover:bg-[#161616] hover:text-slate-100 sm:size-12 sm:text-3xl",
        tableWrapClass: "-mx-1 mt-5 overflow-x-auto sm:mt-6",
        tableClass: "w-full min-w-0 table-fixed border-collapse text-left text-sm sm:text-base",
        thClass: "border-b border-[#2e2e2e] pb-3 pr-3 font-bold text-slate-200 last:pr-0",
        labelCellClass: "border-b border-[#2e2e2e]/90 py-2.5 pr-3 font-medium text-slate-300 last:pr-0 sm:py-3",
        inputShellClass:
          "flex min-w-0 overflow-hidden rounded-lg border border-[#2e2e2e] bg-[#161616] focus-within:border-[#085fff]/55 focus-within:ring-2 focus-within:ring-[#085fff]/35",
        inputFieldClass:
          "min-h-0 min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm text-slate-100 tabular-nums outline-none placeholder:text-slate-500 read-only:cursor-not-allowed read-only:opacity-80 sm:min-h-[2.85rem] sm:px-3.5 sm:py-2.5 sm:text-base",
        cancelButtonClass:
          "rounded-full border border-[#2e2e2e] bg-[#161616] px-6 py-2.5 text-sm font-bold text-slate-200 transition-colors hover:bg-[#2a2a2a] sm:px-7 sm:py-3 sm:text-base",
      };
    default: {
      const _exhaustive: never = league;
      return _exhaustive;
    }
  }
}
