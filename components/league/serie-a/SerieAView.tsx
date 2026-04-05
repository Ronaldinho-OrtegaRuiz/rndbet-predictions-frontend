"use client";

import Link from "next/link";
import { useState } from "react";
import serieALogo from "@/svgs/competitions/italy_serie-a-on-dark.svg";
import { serieAAccent } from "./constants/serieAAccents";
import type { SerieASectionId } from "./constants/serieASections";
import { SerieASectionNav } from "./panels/SerieASectionNav";
import { SerieAMatchdayPanel } from "./panels/SerieAMatchdayPanel";
import { SerieAPredictionsPanel } from "./panels/SerieAPredictionsPanel";
import { SerieAStandingsTable } from "./panels/SerieAStandingsTable";

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

export function SerieAView() {
  const [section, setSection] = useState<SerieASectionId>("tabla");

  return (
    <div className="min-h-screen bg-[#0f2440] text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0f2440]">
        <div className="flex w-full min-h-[4.5rem] items-center sm:min-h-[5.25rem]">
          <Link
            href="/inicio"
            className="flex h-full min-h-[inherit] shrink-0 items-center justify-center pl-3 pr-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/35 sm:pl-4 sm:pr-3"
            aria-label="Volver al inicio"
          >
            <span className="flex size-11 items-center justify-center sm:size-12">
              <BackArrowIcon className="h-[15px] w-[27px] shrink-0 sm:h-[17px] sm:w-[31px]" />
            </span>
          </Link>

          <div className="flex min-h-[inherit] min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2 py-2 pl-[20%] pr-3 sm:gap-x-7 sm:pr-5 md:gap-x-9">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG import */}
            <img
              src={serieALogo.src}
              alt="Serie A"
              width={116}
              height={116}
              draggable={false}
              className="h-9 w-auto max-h-9 shrink-0 object-contain object-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] sm:h-10 sm:max-h-10 md:h-11 md:max-h-11"
            />

            <SerieASectionNav
              className="shrink-0"
              active={section}
              onActiveChange={setSection}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        {section === "tabla" && <SerieAStandingsTable />}
        {section === "partidos" && <SerieAMatchdayPanel />}
        {section === "predicciones" && <SerieAPredictionsPanel />}
      </main>
    </div>
  );
}
