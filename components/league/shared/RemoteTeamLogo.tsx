"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { UiTone } from "./themes";

export type RemoteTeamLogoVariant = "standings" | "fixture" | "detail";

const imageShell: Record<
  RemoteTeamLogoVariant,
  { box: string; sizes: string }
> = {
  standings: {
    box: "relative h-7 w-7 shrink-0 sm:h-8 sm:w-8",
    sizes: "(min-width: 640px) 32px, 28px",
  },
  fixture: {
    box: "relative h-11 w-11 shrink-0 sm:h-12 sm:w-12",
    sizes: "(min-width: 640px) 48px, 44px",
  },
  detail: {
    box: "relative h-14 w-14 shrink-0 sm:h-16 md:h-[4.5rem] md:w-[4.5rem]",
    sizes: "72px",
  },
};

const placeholderDark: Record<RemoteTeamLogoVariant, string> = {
  standings: "inline-block h-7 w-7 shrink-0 sm:h-8 sm:w-8",
  fixture:
    "flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.06] sm:size-12",
  detail:
    "flex size-14 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] sm:size-16 md:size-[4.5rem]",
};

const placeholderLight: Record<RemoteTeamLogoVariant, string> = {
  standings:
    "inline-block h-7 w-7 shrink-0 rounded border border-slate-200 bg-white sm:h-8 sm:w-8",
  fixture:
    "flex size-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm sm:size-12",
  detail:
    "flex size-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm sm:size-16 md:size-[4.5rem]",
};

/** Muestra `logoUrl` remoto; si falta o falla la carga, placeholder según tono UI. */
export function RemoteTeamLogo({
  logoUrl,
  variant,
  label,
  tone = "dark",
}: {
  logoUrl?: string | null;
  variant: RemoteTeamLogoVariant;
  label: string;
  tone?: UiTone;
}) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);

  const src = logoUrl?.trim() || undefined;
  const placeholders = tone === "light" ? placeholderLight : placeholderDark;

  if (!src || failed) {
    return (
      <span className={placeholders[variant]} aria-hidden title={label} />
    );
  }

  const s = imageShell[variant];
  return (
    <div className={s.box} aria-hidden title={label}>
      <Image
        src={src}
        alt=""
        fill
        className="object-contain"
        sizes={s.sizes}
        unoptimized
        onError={onError}
      />
    </div>
  );
}
