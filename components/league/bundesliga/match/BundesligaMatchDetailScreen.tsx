"use client";

import Link from "next/link";
import bundesligaLogo from "@/svgs/competitions/germany_bundesliga.football-logos.cc.svg";
import {
  BUNDESLIGA_BG_CONTENT,
  BUNDESLIGA_BORDER,
  bundesligaAccent,
} from "../constants/bundesligaTheme";
import type { StatTargetsApiContext } from "@/lib/api/stat-targets-types";
import type { MatchDetailMock } from "../mocks/bundesligaMatchDetailMock";
import { BundesligaMatchDetailView } from "./BundesligaMatchDetailView";

function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 15.699 8.707"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill={bundesligaAccent}
        points="15.699,3.854 1.914,3.854 5.061,0.707 4.354,0 0,4.354 4.354,8.707 5.061,8 1.914,4.854 15.699,4.854"
      />
    </svg>
  );
}

export function BundesligaMatchDetailScreen({
  detail,
  statTargetsApi,
}: {
  detail: MatchDetailMock;
  statTargetsApi?: StatTargetsApiContext | null;
}) {
  return (
    <div className="min-h-screen bg-[#000e14] text-white">
      <header
        className="sticky top-0 z-10 border-b bg-[#191e24]"
        style={{ borderColor: BUNDESLIGA_BORDER }}
      >
        <div className="flex w-full min-h-[4.5rem] items-center sm:min-h-[5.25rem]">
          <Link
            href="/league/bundesliga"
            className="flex h-full min-h-[inherit] shrink-0 items-center justify-center pl-3 pr-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/25 sm:pl-4 sm:pr-3"
            aria-label="Volver a Bundesliga"
          >
            <span className="flex size-11 items-center justify-center sm:size-12">
              <BackArrowIcon className="h-[15px] w-[27px] shrink-0 sm:h-[17px] sm:w-[31px]" />
            </span>
          </Link>

          <div className="flex min-h-[inherit] min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2 py-2 pr-3 sm:gap-x-6 sm:pr-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-[4.5rem] sm:w-[4.5rem]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static SVG import */}
              <img
                src={bundesligaLogo.src}
                alt="Bundesliga"
                width={116}
                height={116}
                draggable={false}
                className="h-auto w-auto max-h-[1.9rem] max-w-full object-contain object-center sm:max-h-[2.45rem]"
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

      <main
        className="text-slate-200"
        style={{ backgroundColor: BUNDESLIGA_BG_CONTENT }}
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
          <BundesligaMatchDetailView detail={detail} statTargetsApi={statTargetsApi} />
        </div>
      </main>
    </div>
  );
}
