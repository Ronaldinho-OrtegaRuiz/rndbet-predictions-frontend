"use client";

import Link from "next/link";
import { useState } from "react";
import uclLogo from "@/svgs/competitions/tournaments_uefa-champions-league.football-logos.cc.svg";
import {
  UCL_BG_DEEP,
  UCL_BG_SURFACE,
  UCL_LOGO_FILTER,
  uclAccentBlue,
  uclAccentCyan,
} from "./constants/uclTheme";
import type { UclSectionId } from "./constants/uclSections";
import { ChampionsLeagueSectionNav } from "./panels/ChampionsLeagueSectionNav";
import { ChampionsLeagueMatchdayPanel } from "./panels/ChampionsLeagueMatchdayPanel";
import { ChampionsLeaguePredictionsPanel } from "./panels/ChampionsLeaguePredictionsPanel";
import { ChampionsLeagueStandingsTable } from "./panels/ChampionsLeagueStandingsTable";

function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 15.699 8.707"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill={uclAccentBlue}
        points="15.699,3.854 1.914,3.854 5.061,0.707 4.354,0 0,4.354 4.354,8.707 5.061,8 1.914,4.854 15.699,4.854"
      />
    </svg>
  );
}

export function ChampionsLeagueView() {
  const [section, setSection] = useState<UclSectionId>("tabla");

  return (
    <div className="min-h-screen text-[#f1f3f8]" style={{ backgroundColor: UCL_BG_DEEP }}>
      <header
        className="sticky top-0 z-10 border-b-2"
        style={{
          backgroundColor: UCL_BG_SURFACE,
          borderColor: uclAccentCyan,
        }}
      >
        <div className="flex w-full min-h-[4.5rem] items-center sm:min-h-[5.25rem]">
          <Link
            href="/inicio"
            className="flex h-full min-h-[inherit] shrink-0 items-center justify-center pl-3 pr-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00eeff]/40 sm:pl-4 sm:pr-3"
            aria-label="Volver al inicio"
          >
            <span className="flex size-11 items-center justify-center sm:size-12">
              <BackArrowIcon className="h-[15px] w-[27px] shrink-0 sm:h-[17px] sm:w-[31px]" />
            </span>
          </Link>

          <div className="flex min-h-[inherit] min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2 py-2 pl-[20%] pr-3 sm:gap-x-7 sm:pr-5 md:gap-x-9">
            <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center sm:h-[6.5rem] sm:w-[6.5rem] md:h-[7.25rem] md:w-[7.25rem]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static SVG import */}
              <img
                src={uclLogo.src}
                alt="Champions League"
                width={116}
                height={116}
                draggable={false}
                className="h-auto w-auto max-h-[2.45rem] max-w-full object-contain object-center sm:max-h-[3.35rem] md:max-h-[3.85rem]"
                style={{ filter: UCL_LOGO_FILTER }}
              />
            </div>

            <ChampionsLeagueSectionNav
              className="shrink-0"
              active={section}
              onActiveChange={setSection}
            />
          </div>
        </div>
      </header>

      <main style={{ backgroundColor: UCL_BG_DEEP }}>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
          {section === "tabla" && <ChampionsLeagueStandingsTable />}
          {section === "partidos" && <ChampionsLeagueMatchdayPanel />}
          {section === "predicciones" && <ChampionsLeaguePredictionsPanel />}
        </div>
      </main>
    </div>
  );
}
