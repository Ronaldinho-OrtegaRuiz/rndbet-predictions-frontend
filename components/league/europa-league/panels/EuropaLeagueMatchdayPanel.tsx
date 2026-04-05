"use client";

import Link from "next/link";
import { useState } from "react";
import {
  UEL_BG_DEEP,
  UEL_BG_SURFACE,
  UEL_BORDER,
  uelAccentOrange,
} from "../constants/uelTheme";
import { matchSlugFromTeams } from "../lib/uelMatchSlug";
import { MATCHDAYS } from "../mocks/uelMatchdayMock";
import type { FixtureMatch } from "../mocks/uelMatchdayMock";

function LogoSlot({ label }: { label: string }) {
  return (
    <span
      className="flex size-11 shrink-0 items-center justify-center rounded-lg border shadow-sm sm:size-12"
      style={{
        borderColor: UEL_BORDER,
        backgroundColor: UEL_BG_DEEP,
      }}
      aria-hidden
      title={label}
    />
  );
}

function RedCardIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-6 w-[0.95rem] shrink-0 rounded-[3px] bg-red-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-red-950/50 ${className}`}
      aria-label="Tarjeta roja"
      title="Tarjeta roja"
    />
  );
}

const redSlotClass = "flex h-6 w-[0.95rem] shrink-0 items-center justify-center";

function HomeSideBlock({
  homeTeam,
  homeScore,
  status,
  redCard,
}: {
  homeTeam: string;
  homeScore?: number;
  status: FixtureMatch["status"];
  redCard?: "home" | "away";
}) {
  const showScore = status !== "scheduled";
  return (
    <div className="inline-grid grid-cols-[auto_auto_auto] items-center gap-x-2 gap-y-2">
      <div className={`${redSlotClass} row-start-1`}>
        {redCard === "home" ? (
          <RedCardIcon />
        ) : (
          <span className="inline-block h-6 w-[0.95rem]" aria-hidden />
        )}
      </div>
      <div className="row-start-1">
        <LogoSlot label={homeTeam} />
      </div>
      <div className="row-start-1 flex min-h-[2.75rem] min-w-[1.75rem] items-center justify-center self-center text-2xl font-bold tabular-nums text-[#f5f5f7] sm:min-h-12 sm:text-3xl">
        {showScore ? homeScore : null}
      </div>
      <p className="col-start-2 row-start-2 w-11 text-center text-[11px] font-medium leading-snug text-[#f5f5f7]/60 sm:w-12 sm:text-xs">
        {homeTeam}
      </p>
    </div>
  );
}

function AwaySideBlock({
  awayTeam,
  awayScore,
  status,
  redCard,
}: {
  awayTeam: string;
  awayScore?: number;
  status: FixtureMatch["status"];
  redCard?: "home" | "away";
}) {
  const showScore = status !== "scheduled";
  return (
    <div className="inline-grid grid-cols-[auto_auto_auto] items-center gap-x-2 gap-y-2">
      <div className="row-start-1 flex min-h-[2.75rem] min-w-[1.75rem] items-center justify-center self-center text-2xl font-bold tabular-nums text-[#f5f5f7] sm:min-h-12 sm:text-3xl">
        {showScore ? awayScore : null}
      </div>
      <div className="row-start-1">
        <LogoSlot label={awayTeam} />
      </div>
      <div className={`${redSlotClass} row-start-1`}>
        {redCard === "away" ? (
          <RedCardIcon />
        ) : (
          <span className="inline-block h-6 w-[0.95rem]" aria-hidden />
        )}
      </div>
      <p className="col-start-2 row-start-2 w-11 text-center text-[11px] font-medium leading-snug text-[#f5f5f7]/60 sm:w-12 sm:text-xs">
        {awayTeam}
      </p>
    </div>
  );
}

function FixtureCard({ match }: { match: FixtureMatch }) {
  const { status, homeTeam, awayTeam, homeScore, awayScore, dateLabel, minute, redCard } =
    match;

  const top =
    status === "live" ? (
      <div className="flex items-center justify-center gap-2.5 text-sm font-semibold sm:text-base">
        <span style={{ color: uelAccentOrange }}>En vivo</span>
        <span className="tabular-nums text-[#f5f5f7]/90">{minute}</span>
      </div>
    ) : (
      <p className="text-center text-sm text-[#f5f5f7]/65 sm:text-base">{dateLabel}</p>
    );

  const href = `/league/europa-league/match/${matchSlugFromTeams(homeTeam, awayTeam)}`;

  return (
    <Link
      href={href}
      className="relative block rounded-2xl border px-4 py-4 shadow-sm transition-colors hover:bg-[#2c2c2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6900]/45 sm:px-5 sm:py-5"
      style={{
        borderColor: UEL_BORDER,
        backgroundColor: UEL_BG_SURFACE,
      }}
    >
      <div className="mb-4 min-h-[1.5rem]">{top}</div>

      <div className="flex items-start justify-center gap-2 sm:gap-4">
        <div className="flex min-w-0 flex-1 justify-end">
          <HomeSideBlock
            homeTeam={homeTeam}
            homeScore={homeScore}
            status={status}
            redCard={redCard}
          />
        </div>

        <span
          className="shrink-0 px-1 pt-2.5 text-sm font-bold tracking-wide sm:px-2 sm:pt-3 sm:text-base"
          style={{ color: uelAccentOrange }}
        >
          VS
        </span>

        <div className="flex min-w-0 flex-1 justify-start">
          <AwaySideBlock
            awayTeam={awayTeam}
            awayScore={awayScore}
            status={status}
            redCard={redCard}
          />
        </div>
      </div>
    </Link>
  );
}

export function EuropaLeagueMatchdayPanel() {
  const [round, setRound] = useState<1 | 2 | 3>(1);
  const matches = MATCHDAYS[round];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="uel-matchday" className="text-sm font-bold text-[#f5f5f7]">
          Jornada
        </label>
        <select
          id="uel-matchday"
          value={round}
          onChange={(e) => setRound(Number(e.target.value) as 1 | 2 | 3)}
          className="cursor-pointer rounded-xl border px-4 py-2.5 text-base font-semibold text-[#f5f5f7] shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6900]/50"
          style={{
            borderColor: UEL_BORDER,
            backgroundColor: UEL_BG_SURFACE,
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {matches.map((m) => (
          <FixtureCard key={`${round}-${m.id}`} match={m} />
        ))}
      </div>
    </div>
  );
}
