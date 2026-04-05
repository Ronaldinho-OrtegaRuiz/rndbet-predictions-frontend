"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type RefObject,
} from "react";
import englandEpl from "@/svgs/competitions/england_english-premier-league.football-logos.cc.svg";
import franceLigue1 from "@/svgs/competitions/france_ligue-1.football-logos.cc.svg";
import germanyBundesliga from "@/svgs/competitions/germany_bundesliga.football-logos.cc.svg";
import italySerieA from "@/svgs/competitions/italy_serie-a.football-logos.cc.svg";
import spainLaLiga from "@/svgs/competitions/spain_la-liga.football-logos.cc.svg";
import uefaChampions from "@/svgs/competitions/tournaments_uefa-champions-league.football-logos.cc.svg";
import uefaEuropa from "@/svgs/competitions/tournaments_uefa-europa-league.football-logos.cc.svg";

const LOGOS = [
  englandEpl,
  spainLaLiga,
  italySerieA,
  germanyBundesliga,
  franceLigue1,
  uefaChampions,
  uefaEuropa,
] as const;

const LOGO_PX = 48;
const COLS = 21;

/**
 * Tres capas por columna (misma X): cada una arranca 1/3 del recorrido después
 * de la anterior → hasta ~3 “rondas” visibles y bucle continuo sin hueco largo.
 */
const SLOTS_PER_COL = 3;
const TOTAL_SLOTS = COLS * SLOTS_PER_COL;

const FALL_SEC = 10.5;

const SPAWN_STAGGER_SEC = 0.1;

/** Tiempo entre arranque de capa 0 → 1 → 2 en la misma columna (= ~33 % del trayecto). */
const SLOT_TIME_STRIDE_SEC = FALL_SEC / SLOTS_PER_COL;

/** Casi nada abajo antes de repetir el ciclo de esa capa (evita “pantalla vacía”). */
const REPEAT_TAIL_SEC = 0.02;

const LOGO_PERIOD = FALL_SEC + REPEAT_TAIL_SEC;

type HorizCurve = "lin" | "front" | "late";

type FallItem = {
  logoIndex: number;
  leftPct: number;
  delaySec: number;
  driftVw: number;
  wobbleVw: number;
  horizCurve: HorizCurve;
  rotSign: 1 | -1;
  rotMaxDeg: number;
  z: number;
};

function horizProgress(p: number, curve: HorizCurve): number {
  const x = Math.min(1, Math.max(0, p));
  switch (curve) {
    case "lin":
      return x;
    case "front":
      return Math.pow(x, 0.34);
    case "late":
      return Math.pow(x, 1.78);
    default:
      return x;
  }
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j]!;
    arr[j] = tmp!;
  }
}

/** Repite el bloque base `times` veces y baraja (p. ej. 21×3 → 63). */
function repeatShuffle<T>(base: T[], times: number, rng: () => number): T[] {
  const out: T[] = [];
  for (let t = 0; t < times; t++) out.push(...base);
  shuffleInPlace(out, rng);
  return out;
}

function buildItems(): FallItem[] {
  const rng = mulberry32(0xc0ffee42);

  const logoOrder: number[] = [];
  for (let L = 0; L < LOGOS.length; L++) {
    for (let k = 0; k < TOTAL_SLOTS / LOGOS.length; k++) {
      logoOrder.push(L);
    }
  }
  shuffleInPlace(logoOrder, rng);

  const drift21 = [
    -38, -32, -26, -20, -14, -8,
    10, 16, 22, 28, 34, 40,
    -36, -18, 12, 24, -10, 15, -24, 30, -16, 20, 8,
  ];
  const driftVwPool = repeatShuffle(drift21, SLOTS_PER_COL, rng);

  const wobble21 = [
    0, 1, -1, 2, -2, 3, -3, 0, 1.5, -1.5, 2.5, -2.5, 0, 2, -2, 0, 1, -1, 3, -3,
    0,
  ];
  const wobblePool = repeatShuffle(wobble21, SLOTS_PER_COL, rng);

  const curves21: HorizCurve[] = [
    "lin",
    "lin",
    "lin",
    "lin",
    "lin",
    "lin",
    "lin",
    "front",
    "front",
    "front",
    "front",
    "front",
    "front",
    "front",
    "late",
    "late",
    "late",
    "late",
    "late",
    "late",
    "late",
  ];
  const curves = repeatShuffle(curves21, SLOTS_PER_COL, rng);

  const rotSigns21: (1 | -1)[] = [
    1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, 1, -1,
  ];
  const rotSigns = repeatShuffle(rotSigns21, SLOTS_PER_COL, rng);

  const rotMax21 = [
    55, 70, 85, 100, 120, 140, 165, 190, 60, 95, 110, 135, 155, 75, 125, 175,
    80, 105, 145, 130, 115,
  ];
  const rotMaxPool = repeatShuffle(rotMax21, SLOTS_PER_COL, rng);

  const zs21 = Array.from({ length: COLS }, (_, i) => i + 1);
  shuffleInPlace(zs21, rng);
  const zsBase = repeatShuffle(zs21, SLOTS_PER_COL, rng);

  const startDelays = Array.from(
    { length: COLS },
    (_, i) => i * SPAWN_STAGGER_SEC,
  );
  shuffleInPlace(startDelays, rng);

  const out: FallItem[] = [];
  let poolIdx = 0;

  for (let col = 0; col < COLS; col++) {
    const leftPct = Math.round(((col + 0.5) / COLS) * 1000) / 10;
    const baseDelay = startDelays[col]!;

    for (let slot = 0; slot < SLOTS_PER_COL; slot++) {
      const delaySec = baseDelay + slot * SLOT_TIME_STRIDE_SEC;

      out.push({
        logoIndex: logoOrder[poolIdx]!,
        leftPct,
        delaySec,
        driftVw: driftVwPool[poolIdx]!,
        wobbleVw: wobblePool[poolIdx]!,
        horizCurve: curves[poolIdx]!,
        rotSign: rotSigns[poolIdx]!,
        rotMaxDeg: rotMaxPool[poolIdx]!,
        z: zsBase[poolIdx]! + slot,
      });
      poolIdx++;
    }
  }

  return out;
}

const ITEMS: FallItem[] = buildItems();

const OPACITY = 0.24;

function useFallingMotion(refs: RefObject<(HTMLDivElement | null)[]>) {
  const startMs = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    startMs.current = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startMs.current) / 1000;
      const list = refs.current;
      const vwPx =
        typeof window !== "undefined" ? window.innerWidth / 100 : 19.2;

      for (let i = 0; i < ITEMS.length; i++) {
        const el = list[i];
        if (!el) continue;
        const item = ITEMS[i];
        const lt = elapsed - item.delaySec;

        let pAnim: number;
        if (lt < 0) {
          pAnim = -0.08;
        } else {
          const phase = lt % LOGO_PERIOD;
          if (phase < FALL_SEC) {
            pAnim = phase / FALL_SEC;
          } else {
            pAnim = 1.08;
          }
        }

        let yVh: number;
        let xDriftPx: number;
        let rot: number;

        if (pAnim < 0) {
          yVh = -18 + pAnim * 130;
          xDriftPx = 0;
          rot = 0;
        } else if (pAnim <= 1) {
          const p = pAnim;
          yVh = -18 + p * 130;
          const hx = horizProgress(p, item.horizCurve);
          const main = item.driftVw * vwPx * hx;
          const wobble =
            item.wobbleVw *
            vwPx *
            Math.sin(Math.PI * Math.min(1, Math.max(0, p)));
          xDriftPx = main + wobble;
          rot = p * item.rotMaxDeg * item.rotSign;
        } else {
          yVh = 128;
          const hx1 = horizProgress(1, item.horizCurve);
          xDriftPx =
            item.driftVw * vwPx * hx1 +
            item.wobbleVw * vwPx * Math.sin(Math.PI);
          rot = item.rotMaxDeg * item.rotSign;
        }

        el.style.transform = `translateX(calc(-50% + ${xDriftPx}px)) translateY(${yVh}vh) rotate(${rot}deg)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [refs]);
}

export function FallingLogos() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useFallingMotion(refs);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    refs.current[index] = el;
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {ITEMS.map((item, i) => {
        const base: CSSProperties = {
          left: `${item.leftPct}%`,
          width: LOGO_PX,
          zIndex: item.z,
          opacity: OPACITY,
          transform: "translateX(-50%) translateY(-18vh) rotate(0deg)",
        };
        return (
          <div
            key={i}
            ref={setRef(i)}
            className="absolute top-0"
            style={base}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG assets from /svgs */}
            <img
              src={LOGOS[item.logoIndex].src}
              alt=""
              width={LOGO_PX}
              height={LOGO_PX}
              className="h-[48px] w-[48px] select-none object-contain"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
