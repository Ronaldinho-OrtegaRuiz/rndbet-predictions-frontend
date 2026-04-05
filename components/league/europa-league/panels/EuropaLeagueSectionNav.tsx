"use client";

import { uelAccentOrange } from "../constants/uelTheme";
import { UEL_SECTIONS, type UelSectionId } from "../constants/uelSections";

type Props = {
  className?: string;
  active: UelSectionId;
  onActiveChange: (id: UelSectionId) => void;
};

export type { UelSectionId };

export function EuropaLeagueSectionNav({
  className = "",
  active,
  onActiveChange,
}: Props) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4 ${className}`}
      aria-label="Secciones"
    >
      {UEL_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onActiveChange(id)}
            aria-current={isActive ? "page" : undefined}
            style={isActive ? { color: uelAccentOrange } : undefined}
            className={`rounded-md px-3 py-2 text-base font-bold transition-colors sm:px-4 sm:py-2.5 sm:text-lg ${
              isActive
                ? ""
                : "text-[#f5f5f7]/85 hover:bg-[#2c2c2e] hover:text-[#f5f5f7]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
