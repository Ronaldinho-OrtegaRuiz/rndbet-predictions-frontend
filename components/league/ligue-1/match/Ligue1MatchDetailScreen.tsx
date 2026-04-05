"use client";

import Link from "next/link";
import ligue1Logo from "@/svgs/competitions/france_ligue-1.football-logos.cc.svg";
import {
  LIGUE1_BG_DEEP,
  LIGUE1_BG_SURFACE,
  LIGUE1_LOGO_FILTER,
  LIGUE1_NAVY,
  ligue1AccentBlue,
} from "../constants/ligue1Theme";
import type { MatchDetailMock } from "../mocks/ligue1MatchDetailMock";
import { Ligue1MatchDetailView } from "./Ligue1MatchDetailView";

function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 15.699 8.707"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill={ligue1AccentBlue}
        points="15.699,3.854 1.914,3.854 5.061,0.707 4.354,0 0,4.354 4.354,8.707 5.061,8 1.914,4.854 15.699,4.854"
      />
    </svg>
  );
}

export function Ligue1MatchDetailScreen({ detail }: { detail: MatchDetailMock }) {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: LIGUE1_BG_DEEP }}>
      <header
        className="sticky top-0 z-10 border-b-2"
        style={{
          backgroundColor: LIGUE1_BG_SURFACE,
          borderColor: LIGUE1_NAVY,
        }}
      >
        <div className="flex w-full min-h-[4.5rem] items-center sm:min-h-[5.25rem]">
          <Link
            href="/league/ligue-1"
            className="flex h-full min-h-[inherit] shrink-0 items-center justify-center pl-3 pr-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#085fff]/40 sm:pl-4 sm:pr-3"
            aria-label="Volver a Ligue 1"
          >
            <span className="flex size-11 items-center justify-center sm:size-12">
              <BackArrowIcon className="h-[15px] w-[27px] shrink-0 sm:h-[17px] sm:w-[31px]" />
            </span>
          </Link>

          <div className="flex min-h-[inherit] min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2 py-2 pr-3 sm:gap-x-6 sm:pr-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-[4.5rem] sm:w-[4.5rem]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static SVG import */}
              <img
                src={ligue1Logo.src}
                alt="Ligue 1"
                width={116}
                height={116}
                draggable={false}
                className="h-auto w-auto max-h-[1.9rem] max-w-full object-contain object-center sm:max-h-[2.45rem]"
                style={{ filter: LIGUE1_LOGO_FILTER }}
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/55 sm:text-sm">Partido</p>
              <h1 className="truncate text-base font-bold text-white sm:text-lg md:text-xl">
                {detail.homeTeam} <span className="font-normal text-white/40">vs</span> {detail.awayTeam}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="text-slate-200" style={{ backgroundColor: LIGUE1_BG_DEEP }}>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
          <Ligue1MatchDetailView detail={detail} />
        </div>
      </main>
    </div>
  );
}
