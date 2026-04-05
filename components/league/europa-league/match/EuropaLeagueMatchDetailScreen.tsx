"use client";

import Link from "next/link";
import uelLogo from "@/svgs/competitions/tournaments_uefa-europa-league.football-logos.cc.svg";
import {
  UEL_BG_DEEP,
  UEL_BG_SURFACE,
  UEL_LOGO_FILTER,
  uelAccentOrange,
} from "../constants/uelTheme";
import type { MatchDetailMock } from "../mocks/uelMatchDetailMock";
import { EuropaLeagueMatchDetailView } from "./EuropaLeagueMatchDetailView";

function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 15.699 8.707"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill={uelAccentOrange}
        points="15.699,3.854 1.914,3.854 5.061,0.707 4.354,0 0,4.354 4.354,8.707 5.061,8 1.914,4.854 15.699,4.854"
      />
    </svg>
  );
}

export function EuropaLeagueMatchDetailScreen({ detail }: { detail: MatchDetailMock }) {
  return (
    <div className="min-h-screen text-[#f5f5f7]" style={{ backgroundColor: UEL_BG_DEEP }}>
      <header
        className="sticky top-0 z-10 border-b-2"
        style={{
          backgroundColor: UEL_BG_SURFACE,
          borderColor: uelAccentOrange,
        }}
      >
        <div className="flex w-full min-h-[4.5rem] items-center sm:min-h-[5.25rem]">
          <Link
            href="/league/europa-league"
            className="flex h-full min-h-[inherit] shrink-0 items-center justify-center pl-3 pr-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff6900]/40 sm:pl-4 sm:pr-3"
            aria-label="Volver a Europa League"
          >
            <span className="flex size-11 items-center justify-center sm:size-12">
              <BackArrowIcon className="h-[15px] w-[27px] shrink-0 sm:h-[17px] sm:w-[31px]" />
            </span>
          </Link>

          <div className="flex min-h-[inherit] min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2 py-2 pr-3 sm:gap-x-6 sm:pr-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-[4.5rem] sm:w-[4.5rem]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static SVG import */}
              <img
                src={uelLogo.src}
                alt="Europa League"
                width={116}
                height={116}
                draggable={false}
                className="h-auto w-auto max-h-[1.9rem] max-w-full object-contain object-center sm:max-h-[2.45rem]"
                style={{ filter: UEL_LOGO_FILTER }}
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#f5f5f7]/55 sm:text-sm">Partido</p>
              <h1 className="truncate text-base font-bold text-[#f5f5f7] sm:text-lg md:text-xl">
                {detail.homeTeam} <span className="font-normal text-[#f5f5f7]/45">vs</span>{" "}
                {detail.awayTeam}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main style={{ backgroundColor: UEL_BG_DEEP }}>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
          <EuropaLeagueMatchDetailView detail={detail} />
        </div>
      </main>
    </div>
  );
}
