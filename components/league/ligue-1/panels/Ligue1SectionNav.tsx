"use client";

import { ligue1AccentBlue } from "../constants/ligue1Theme";
import {
  LIGUE1_SECTIONS,
  type Ligue1SectionId,
} from "../constants/ligue1Sections";

type Props = {
  className?: string;
  active: Ligue1SectionId;
  onActiveChange: (id: Ligue1SectionId) => void;
};

export type { Ligue1SectionId };

export function Ligue1SectionNav({
  className = "",
  active,
  onActiveChange,
}: Props) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4 ${className}`}
      aria-label="Secciones"
    >
      {LIGUE1_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onActiveChange(id)}
            aria-current={isActive ? "page" : undefined}
            style={isActive ? { color: ligue1AccentBlue } : undefined}
            className={`rounded-md px-3 py-2 text-base font-bold transition-colors sm:px-4 sm:py-2.5 sm:text-lg ${
              isActive ? "" : "text-white/80 hover:bg-[#161616] hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
