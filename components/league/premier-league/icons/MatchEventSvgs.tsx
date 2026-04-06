"use client";

import { useId } from "react";
import { premierLeagueAccent } from "../constants/premierLeagueAccent";
import { RedCardSvg } from "./RedCardMark";

/** Color para gol y penalti anotado (pedido). */
export const MATCH_EVENT_GOAL_CYAN = "#00eeff";

export function YellowCardSvg({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <title>Tarjeta amarilla</title>
      <path fill="#D9AF00" fillRule="evenodd" d="M3 1h10v14H3z" />
    </svg>
  );
}

export function SecondYellowRedSvg({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <title>2ª amarilla (roja)</title>
      <path d="M6 1V4.66667V12H9.81818H13V1H6Z" className="fill-red-600" />
      <path d="M5 13V11.3333V4H3V15H10V13H6.18182H5Z" fill="#D9AF00" />
    </svg>
  );
}

function PenaltyGoalSvgInner({ size = 16, className = "" }: { size?: number; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "") || "p";
  const clipId = `penalty-clip-${uid}`;
  const fill = MATCH_EVENT_GOAL_CYAN;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <title>Penalti anotado</title>
      <defs>
        <clipPath id={clipId}>
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="m8.78 8.43-1.88.68v2.06l1.41.55 1.42-1.56z"
          fill={fill}
        />
        <path
          d="M7.07 4.45c-2.63 0-4.77 2.14-4.77 4.77s2.14 4.77 4.77 4.77 4.77-2.14 4.77-4.77S9.7 4.45 7.07 4.45m0 8.37c-.66 0-1.28-.18-1.82-.5l.17-.94-1.06-1.18-.64.33c-.16-.4-.24-.84-.24-1.29v-.12l1.37-.49.45-1.69-.63-.37c.64-.57 1.47-.92 2.39-.92h.2l-.2.73 1.86.78.6-.55c.7.66 1.14 1.58 1.14 2.62 0 1.98-1.61 3.59-3.59 3.59"
          fill={fill}
        />
        <path d="M14 6.75h-1.5V1.5h-11v5.25H0V0h14z" fill={fill} />
      </g>
    </svg>
  );
}

function GoalSvgInner({ size = 16, className = "" }: { size?: number; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "") || "g";
  const clipId = `goal-clip-${uid}`;
  const fill = MATCH_EVENT_GOAL_CYAN;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <title>Gol</title>
      <defs>
        <clipPath id={clipId}>
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="m9.5 5.83-2.76 1v3.02l2.08.81 2.07-2.29z"
          fill={fill}
        />
        <path
          d="M7 0C3.14 0 0 3.14 0 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7m0 12.26c-.97 0-1.88-.27-2.66-.73l.25-1.38-1.55-1.73-.94.48A5.2 5.2 0 0 1 1.74 7v-.17l2.01-.72.66-2.48-.92-.55a5.24 5.24 0 0 1 3.5-1.35c.1 0 .19 0 .29.01l-.29 1.07 2.72 1.15.88-.81c1.02.96 1.67 2.32 1.67 3.83 0 2.9-2.36 5.27-5.26 5.27z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export const PenaltyGoalSvg = PenaltyGoalSvgInner;
export const GoalSvg = GoalSvgInner;

export type TimelineGlyphSide = "home" | "away" | "neutral";

export type EventGlyphKind =
  | "red"
  | "yellow"
  | "second_yellow"
  | "penalty_goal"
  | "goal"
  | "dot";

function eventTypeKey(type: string | null): string {
  return (type ?? "").trim().toLowerCase().replace(/\s+/g, "_");
}

export function resolveEventGlyphKind(eventType: string | null): EventGlyphKind {
  const t = eventTypeKey(eventType);
  if (
    t.includes("second_yellow") ||
    t.includes("2nd_yellow") ||
    t.includes("yellow_red") ||
    (t.includes("second") && t.includes("yellow"))
  ) {
    return "second_yellow";
  }
  if (
    t === "red_card" ||
    t === "redcard" ||
    t.endsWith("_red_card") ||
    t.includes("red_card") ||
    t.includes("tarjeta_roja")
  ) {
    return "red";
  }
  if (
    t === "yellow_card" ||
    (t.includes("yellow_card") && !t.includes("second")) ||
    (t.includes("amarilla") && !t.includes("roja") && !t.includes("second"))
  ) {
    return "yellow";
  }
  if (
    t.includes("penalti") ||
    t === "penalty_goal" ||
    t === "goal_penalty" ||
    (t.includes("penalty") &&
      (t.includes("goal") || t.includes("gol") || t.includes("scored")))
  ) {
    return "penalty_goal";
  }
  if (
    t === "goal" ||
    t === "gol" ||
    t === "own_goal" ||
    (t.includes("goal") && !t.includes("penalt") && !t.includes("penalty"))
  ) {
    return "goal";
  }
  return "dot";
}

export function TimelineEventGlyph({
  eventType,
  side,
  size = 20,
}: {
  eventType: string | null;
  side: TimelineGlyphSide;
  size?: number;
}) {
  const kind = resolveEventGlyphKind(eventType);
  const shadow = "drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]";

  switch (kind) {
    case "second_yellow":
      return <SecondYellowRedSvg size={size} className={shadow} />;
    case "red":
      return (
        <RedCardSvg
          size={size}
          className="drop-shadow-[0_1px_0_rgba(0,0,0,0.3)]"
        />
      );
    case "yellow":
      return <YellowCardSvg size={size} className={shadow} />;
    case "penalty_goal":
      return <PenaltyGoalSvgInner size={size} className={shadow} />;
    case "goal":
      return <GoalSvgInner size={size} className={shadow} />;
    default:
      return (
        <span
          className="size-2.5 shrink-0 self-center rounded-full ring-2 ring-[#28002b]/80"
          style={{
            backgroundColor:
              side === "home"
                ? `${premierLeagueAccent}cc`
                : side === "away"
                  ? "rgba(255,255,255,0.35)"
                  : "rgba(255,255,255,0.3)",
          }}
          aria-hidden
        />
      );
  }
}
