"use client";

import Link from "next/link";
import serieALogo from "@/svgs/competitions/italy_serie-a-on-dark.svg";
import { serieAAccent } from "../constants/serieAAccents";
import type { MatchDetailMock } from "../mocks/serieAMatchDetailMock";
import { SerieAMatchDetailView } from "./SerieAMatchDetailView";

function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 15.699 8.707"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill={serieAAccent}
        points="15.699,3.854 1.914,3.854 5.061,0.707 4.354,0 0,4.354 4.354,8.707 5.061,8 1.914,4.854 15.699,4.854"
      />
    </svg>
  );
}

export function SerieAMatchDetailScreen({ detail }: { detail: MatchDetailMock }) {
  return (
    <div className="min-h-screen bg-[#0f2440] text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0f2440]">
        <div className="flex w-full min-h-[4.5rem] items-center sm:min-h-[5.25rem]">
          <Link
            href="/league/serie-a"
            className="flex h-full min-h-[inherit] shrink-0 items-center justify-center pl-3 pr-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/35 sm:pl-4 sm:pr-3"
            aria-label="Volver a Serie A"
          >
            <span className="flex size-11 items-center justify-center sm:size-12">
              <BackArrowIcon className="h-[15px] w-[27px] shrink-0 sm:h-[17px] sm:w-[31px]" />
            </span>
          </Link>

          <div className="flex min-h-[inherit] min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2 py-2 pr-3 sm:gap-x-6 sm:pr-5">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG import */}
            <img
              src={serieALogo.src}
              alt="Serie A"
              width={116}
              height={116}
              draggable={false}
              className="h-8 w-auto max-h-8 shrink-0 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] sm:h-9 sm:max-h-9"
            />
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/50 sm:text-sm">Partido</p>
              <h1 className="truncate text-base font-bold text-white sm:text-lg md:text-xl">
                {detail.homeTeam} <span className="font-normal text-white/40">vs</span> {detail.awayTeam}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <SerieAMatchDetailView detail={detail} />
      </main>
    </div>
  );
}
