"use client";

import { serieAAccent } from "../constants/serieAAccents";
import { SERIE_A_SECTIONS, type SerieASectionId } from "../constants/serieASections";

type Props = {
  className?: string;
  active: SerieASectionId;
  onActiveChange: (id: SerieASectionId) => void;
};

export type { SerieASectionId };

export function SerieASectionNav({
  className = "",
  active,
  onActiveChange,
}: Props) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4 ${className}`}
      aria-label="Secciones"
    >
      {SERIE_A_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onActiveChange(id)}
            aria-current={isActive ? "page" : undefined}
            style={isActive ? { color: serieAAccent } : undefined}
            className={`rounded-md px-3 py-2 text-base font-bold transition-colors sm:px-4 sm:py-2.5 sm:text-lg ${
              isActive ? "" : "text-white hover:bg-white/10"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
