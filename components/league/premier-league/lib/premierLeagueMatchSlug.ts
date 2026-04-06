import { PREMIER_FIXTURE_PAIRS } from "../mocks/premierLeagueMatchdayMock";

/** Slug estable por nombre de club (luego se reemplazará por id). */
export function slugifyTeamName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

export function matchSlugFromTeams(homeTeam: string, awayTeam: string): string {
  return `${slugifyTeamName(homeTeam)}-vs-${slugifyTeamName(awayTeam)}`;
}

/** Etiqueta legible mínima desde un segmento de slug (p. ej. `chelsea` → `Chelsea`). */
export function slugPartToLabel(part: string): string {
  const s = part.trim().toLowerCase();
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const SLUG_SEGMENT = /^[a-z0-9]+$/;

export function tryParseMatchSlug(
  slug: string,
): { homeTeam: string; awayTeam: string; pairIndex: number } | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const [homeSlug, awaySlug] = parts;
  if (!homeSlug || !awaySlug) return null;
  const h = homeSlug.toLowerCase();
  const a = awaySlug.toLowerCase();
  if (!SLUG_SEGMENT.test(h) || !SLUG_SEGMENT.test(a)) return null;

  const idx = PREMIER_FIXTURE_PAIRS.findIndex(
    (p) =>
      slugifyTeamName(p.home) === h && slugifyTeamName(p.away) === a,
  );
  if (idx !== -1) {
    const p = PREMIER_FIXTURE_PAIRS[idx]!;
    return { homeTeam: p.home, awayTeam: p.away, pairIndex: idx };
  }

  return {
    homeTeam: slugPartToLabel(h),
    awayTeam: slugPartToLabel(a),
    pairIndex: -1,
  };
}
