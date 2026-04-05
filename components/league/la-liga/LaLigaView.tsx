"use client";

import Link from "next/link";
import { useState } from "react";
import laLigaLogo from "@/svgs/competitions/spain_la-liga.football-logos.cc.svg";
import { laLigaAccent } from "./constants/laLigaAccent";
import type { LaLigaSectionId } from "./constants/laLigaSections";
import { LaLigaSectionNav } from "./panels/LaLigaSectionNav";
import { LaLigaMatchdayPanel } from "./panels/LaLigaMatchdayPanel";
import { LaLigaPredictionsPanel } from "./panels/LaLigaPredictionsPanel";
import { LaLigaStandingsTable } from "./panels/LaLigaStandingsTable";

function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 15.699 8.707"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill={laLigaAccent}
        points="15.699,3.854 1.914,3.854 5.061,0.707 4.354,0 0,4.354 4.354,8.707 5.061,8 1.914,4.854 15.699,4.854"
      />
    </svg>
  );
}

export function LaLigaView() {
  const [section, setSection] = useState<LaLigaSectionId>("tabla");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="flex w-full min-h-[4.5rem] items-center sm:min-h-[5.25rem]">
          <Link
            href="/inicio"
            className="flex h-full min-h-[inherit] shrink-0 items-center justify-center pl-3 pr-2 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff4b44]/40 sm:pl-4 sm:pr-3"
            aria-label="Volver al inicio"
          >
            <span className="flex size-11 items-center justify-center sm:size-12">
              <BackArrowIcon className="h-[15px] w-[27px] shrink-0 sm:h-[17px] sm:w-[31px]" />
            </span>
          </Link>

          <div className="flex min-h-[inherit] min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2 py-2 pl-[20%] pr-3 sm:gap-x-7 sm:pr-5 md:gap-x-9">
            {/* Hueco = Premier; el SVG de La Liga llena el cuadrado — cap de altura para alinear con el wordmark EPL */}
            <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center sm:h-[6.5rem] sm:w-[6.5rem] md:h-[7.25rem] md:w-[7.25rem]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static SVG import */}
              <img
                src={laLigaLogo.src}
                alt="La Liga"
                width={116}
                height={116}
                draggable={false}
                className="h-auto w-auto max-w-full object-contain object-center max-h-[2.45rem] sm:max-h-[3.35rem] md:max-h-[3.85rem]"
              />
            </div>

            <LaLigaSectionNav
              className="shrink-0"
              active={section}
              onActiveChange={setSection}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl bg-slate-50/50 px-4 py-8 sm:px-8">
        {section === "tabla" && <LaLigaStandingsTable />}
        {section === "partidos" && <LaLigaMatchdayPanel />}
        {section === "predicciones" && <LaLigaPredictionsPanel />}
      </main>
    </div>
  );
}
