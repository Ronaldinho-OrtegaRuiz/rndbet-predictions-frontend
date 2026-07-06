import type { LeagueSlug } from "@/lib/leagues/config";
import { laLigaAccent } from "@/components/league/la-liga/constants/laLigaAccent";
import { serieAAccent } from "@/components/league/serie-a/constants/serieAAccents";
import { bundesligaAccent } from "@/components/league/bundesliga/constants/bundesligaTheme";
import { ligue1AccentBlue } from "@/components/league/ligue-1/constants/ligue1Theme";
import { premierLeagueAccent } from "@/components/league/premier-league/constants/premierLeagueAccent";
import { uclAccentCyan } from "@/components/league/champions-league/constants/uclTheme";

export type UiTone = "dark" | "light";

export type StandingsTheme = {
  tone: UiTone;
  accent: string;
  loadingText: string;
  emptyText: string;
  errorBorder: string;
  errorBg: string;
  errorText: string;
  tableWrapper: string;
  tableText: string;
  headerRow: string;
  bodyRow: string;
  bodyRowHover: string;
  cellBorder: string;
  formaWin: string;
  formaDraw: string;
  formaLoss: string;
};

export type MatchdayTheme = {
  tone: UiTone;
  accent: string;
  focusRing: string;
  loadingText: string;
  emptyText: string;
  errorBorder: string;
  errorBg: string;
  errorText: string;
  seasonBanner: string;
  headingText: string;
  mutedText: string;
  select: string;
  navButton: string;
  card: string;
  cardHover: string;
  statusBadge: string;
  dateText: string;
  vsText: string;
  teamNameText: string;
};

const darkStandingsBase: Omit<StandingsTheme, "accent"> = {
  tone: "dark",
  loadingText: "text-white/70",
  emptyText: "text-white/70",
  errorBorder: "border-rose-500/40",
  errorBg: "bg-rose-950/40",
  errorText: "text-rose-100",
  tableWrapper:
    "overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#1e0021]/35 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-[2px]",
  tableText: "text-white/95",
  headerRow:
    "bg-[#1e0021] text-xs font-bold uppercase tracking-wide text-white/75 sm:text-sm",
  bodyRow: "bg-[#28002b] transition-colors",
  bodyRowHover: "hover:bg-[#37003c]",
  cellBorder: "border-b border-white/[0.04]",
  formaWin: "bg-emerald-500/85 text-white",
  formaDraw: "bg-white/35 text-white",
  formaLoss: "bg-rose-500/90 text-white",
};

const lightStandingsBase: Omit<StandingsTheme, "accent"> = {
  tone: "light",
  loadingText: "text-slate-500",
  emptyText: "text-slate-500",
  errorBorder: "border-rose-200",
  errorBg: "bg-rose-50",
  errorText: "text-rose-800",
  tableWrapper:
    "overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm",
  tableText: "text-slate-900",
  headerRow:
    "bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-600 sm:text-sm",
  bodyRow: "bg-white transition-colors",
  bodyRowHover: "hover:bg-slate-50",
  cellBorder: "border-b border-slate-100",
  formaWin: "bg-emerald-500 text-white",
  formaDraw: "bg-slate-300 text-slate-800",
  formaLoss: "bg-rose-500 text-white",
};

const darkMatchdayBase: Omit<MatchdayTheme, "accent" | "focusRing"> = {
  tone: "dark",
  loadingText: "text-white/70",
  emptyText: "text-white/70",
  errorBorder: "border-rose-500/40",
  errorBg: "bg-rose-950/40",
  errorText: "text-rose-100",
  seasonBanner:
    "rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-center text-sm text-white/80",
  headingText: "text-white",
  mutedText: "text-white/80",
  select:
    "cursor-pointer rounded-xl border border-white/[0.12] bg-[#28002b] px-4 py-2.5 text-base font-semibold text-white shadow-inner outline-none transition-colors hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50",
  navButton:
    "rounded-lg border border-white/[0.12] bg-[#28002b] px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-40",
  card: "relative block rounded-2xl border border-white/[0.08] bg-[#28002b] px-4 py-4 shadow-[0_6px_24px_rgba(0,0,0,0.18)] sm:px-5 sm:py-5",
  cardHover:
    "transition-colors hover:border-white/[0.12] focus-visible:outline-none",
  statusBadge:
    "rounded-full border border-white/[0.14] bg-white/[0.07] px-3 py-1 text-xs font-semibold tracking-wide text-white/90",
  dateText: "text-sm text-white/65 sm:text-base",
  vsText: "text-sm font-bold tracking-wide text-white/35 sm:text-base",
  teamNameText:
    "w-full text-center text-[11px] font-medium leading-snug text-white/55 sm:text-xs",
};

const lightMatchdayBase: Omit<MatchdayTheme, "accent" | "focusRing"> = {
  tone: "light",
  loadingText: "text-slate-500",
  emptyText: "text-slate-500",
  errorBorder: "border-rose-200",
  errorBg: "bg-rose-50",
  errorText: "text-rose-800",
  seasonBanner:
    "rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-600",
  headingText: "text-slate-900",
  mutedText: "text-slate-600",
  select:
    "cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base font-semibold text-slate-900 shadow-sm outline-none transition-colors hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50",
  navButton:
    "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40",
  card: "relative block rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5",
  cardHover:
    "transition-colors hover:border-slate-300 hover:shadow-md focus-visible:outline-none",
  statusBadge:
    "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700",
  dateText: "text-sm text-slate-500 sm:text-base",
  vsText: "text-sm font-bold tracking-wide text-slate-300 sm:text-base",
  teamNameText:
    "w-full text-center text-[11px] font-medium leading-snug text-slate-500 sm:text-xs",
};

export const STANDINGS_THEMES: Record<LeagueSlug, StandingsTheme> = {
  "premier-league": { ...darkStandingsBase, accent: premierLeagueAccent },
  "champions-league": {
    ...darkStandingsBase,
    accent: uclAccentCyan,
    bodyRow: "bg-[#0a0f2e] transition-colors",
    bodyRowHover: "hover:bg-[#121a45]",
    tableWrapper:
      "overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#060b24]/60 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-[2px]",
    headerRow:
      "bg-[#060b24] text-xs font-bold uppercase tracking-wide text-[#f1f3f8]/75 sm:text-sm",
  },
  "la-liga": { ...lightStandingsBase, accent: laLigaAccent },
  "serie-a": { ...lightStandingsBase, accent: serieAAccent },
  bundesliga: { ...lightStandingsBase, accent: bundesligaAccent },
  "ligue-1": { ...lightStandingsBase, accent: ligue1AccentBlue },
  "europa-league": { ...lightStandingsBase, accent: "#ff6900" },
};

export const MATCHDAY_THEMES: Record<LeagueSlug, MatchdayTheme> = {
  "premier-league": {
    ...darkMatchdayBase,
    accent: premierLeagueAccent,
    focusRing: "focus-visible:ring-[#ff2882]/60",
  },
  "champions-league": {
    ...darkMatchdayBase,
    accent: uclAccentCyan,
    focusRing: "focus-visible:ring-[#00eeff]/60",
    card: "relative block rounded-2xl border border-white/[0.08] bg-[#0a0f2e] px-4 py-4 shadow-[0_6px_24px_rgba(0,0,0,0.22)] sm:px-5 sm:py-5",
    select:
      "cursor-pointer rounded-xl border border-white/[0.12] bg-[#0a0f2e] px-4 py-2.5 text-base font-semibold text-white shadow-inner outline-none transition-colors hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50",
    navButton:
      "rounded-lg border border-white/[0.12] bg-[#0a0f2e] px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-40",
  },
  "la-liga": {
    ...lightMatchdayBase,
    accent: laLigaAccent,
    focusRing: "focus-visible:ring-[#ff4b44]/40",
  },
  "serie-a": {
    ...lightMatchdayBase,
    accent: serieAAccent,
    focusRing: "focus-visible:ring-[#008fd7]/40",
  },
  bundesliga: {
    ...lightMatchdayBase,
    accent: bundesligaAccent,
    focusRing: "focus-visible:ring-[#d10214]/40",
  },
  "ligue-1": {
    ...lightMatchdayBase,
    accent: ligue1AccentBlue,
    focusRing: "focus-visible:ring-[#085fff]/40",
  },
  "europa-league": {
    ...lightMatchdayBase,
    accent: "#ff6900",
    focusRing: "focus-visible:ring-[#ff6900]/40",
  },
};

export function getStandingsTheme(slug: LeagueSlug): StandingsTheme {
  return STANDINGS_THEMES[slug];
}

export function getMatchdayTheme(slug: LeagueSlug): MatchdayTheme {
  return MATCHDAY_THEMES[slug];
}
