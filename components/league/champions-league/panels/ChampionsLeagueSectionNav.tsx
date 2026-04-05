"use client";

import { uclAccentCyan } from "../constants/uclTheme";
import { UCL_SECTIONS, type UclSectionId } from "../constants/uclSections";

type Props = {
  className?: string;
  active: UclSectionId;
  onActiveChange: (id: UclSectionId) => void;
};

export type { UclSectionId };

export function ChampionsLeagueSectionNav({
  className = "",
  active,
  onActiveChange,
}: Props) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4 ${className}`}
      aria-label="Secciones"
    >
      {UCL_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onActiveChange(id)}
            aria-current={isActive ? "page" : undefined}
            style={isActive ? { color: uclAccentCyan } : undefined}
            className={`rounded-md px-3 py-2 text-base font-bold transition-colors sm:px-4 sm:py-2.5 sm:text-lg ${
              isActive ? "" : "text-[#f1f3f8]/85 hover:bg-[#01035a] hover:text-[#f1f3f8]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
