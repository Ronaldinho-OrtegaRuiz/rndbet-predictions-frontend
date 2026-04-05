import { BUNDESLIGA_FIXTURE_PAIRS } from "../mocks/bundesligaMatchdayMock";

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

export function tryParseMatchSlug(
  slug: string,
): { homeTeam: string; awayTeam: string; pairIndex: number } | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const [homeSlug, awaySlug] = parts;
  const idx = BUNDESLIGA_FIXTURE_PAIRS.findIndex(
    (p) =>
      slugifyTeamName(p.home) === homeSlug && slugifyTeamName(p.away) === awaySlug,
  );
  if (idx === -1) return null;
  const p = BUNDESLIGA_FIXTURE_PAIRS[idx]!;
  return { homeTeam: p.home, awayTeam: p.away, pairIndex: idx };
}
