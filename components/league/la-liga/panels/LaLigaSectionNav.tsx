"use client";

import { laLigaAccent } from "../constants/laLigaAccent";
import { LA_LIGA_SECTIONS, type LaLigaSectionId } from "../constants/laLigaSections";

type Props = {
  className?: string;
  active: LaLigaSectionId;
  onActiveChange: (id: LaLigaSectionId) => void;
};

export type { LaLigaSectionId };

export function LaLigaSectionNav({
  className = "",
  active,
  onActiveChange,
}: Props) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4 ${className}`}
      aria-label="Secciones"
    >
      {LA_LIGA_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onActiveChange(id)}
            aria-current={isActive ? "page" : undefined}
            style={isActive ? { color: laLigaAccent } : undefined}
            className={`rounded-md px-3 py-2 text-base font-bold transition-colors sm:px-4 sm:py-2.5 sm:text-lg ${
              isActive ? "" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
