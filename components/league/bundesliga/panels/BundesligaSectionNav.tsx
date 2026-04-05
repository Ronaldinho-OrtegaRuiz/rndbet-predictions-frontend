"use client";

import { bundesligaAccent } from "../constants/bundesligaTheme";
import {
  BUNDESLIGA_SECTIONS,
  type BundesligaSectionId,
} from "../constants/bundesligaSections";

type Props = {
  className?: string;
  active: BundesligaSectionId;
  onActiveChange: (id: BundesligaSectionId) => void;
};

export type { BundesligaSectionId };

export function BundesligaSectionNav({
  className = "",
  active,
  onActiveChange,
}: Props) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4 ${className}`}
      aria-label="Secciones"
    >
      {BUNDESLIGA_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onActiveChange(id)}
            aria-current={isActive ? "page" : undefined}
            style={isActive ? { color: bundesligaAccent } : undefined}
            className={`rounded-md px-3 py-2 text-base font-bold transition-colors sm:px-4 sm:py-2.5 sm:text-lg ${
              isActive ? "" : "text-white/80 hover:bg-[#191e24] hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
