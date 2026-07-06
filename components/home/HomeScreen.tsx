import Link from "next/link";
import { COMPETITIONS } from "./competitions";
import { BundesligaLogo } from "./logos/BundesligaLogo";
import { SerieALogo } from "./logos/SerieALogo";

const logoSvgClass =
  "h-[72px] w-[72px] object-contain sm:h-[88px] sm:w-[88px]";

const articleClassName =
  "relative aspect-square overflow-hidden rounded-xl border border-neutral-200/70 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] hover:border-transparent hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]";

export function HomeScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {COMPETITIONS.map((c) => {
            const logo = (
              <>
                <div
                  className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-[clip-path] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:duration-[1350ms] [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]"
                  style={{ backgroundColor: c.hoverBg }}
                  aria-hidden
                />
                <div className="relative z-10 flex h-full items-center justify-center px-4 py-6">
                  {c.id === "serie-a" ? (
                    <SerieALogo className={logoSvgClass} />
                  ) : c.id === "bundesliga" ? (
                    <BundesligaLogo className={logoSvgClass} />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element -- static SVG imports */
                    <img
                      src={c.logo.src}
                      alt=""
                      width={88}
                      height={88}
                      draggable={false}
                      className={`${c.logoClassName ?? logoSvgClass} transition-[filter,transform] duration-300 ease-out ${
                        c.logoHover === "white"
                          ? "group-hover:brightness-0 group-hover:invert"
                          : "group-hover:scale-[1.04] group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                      }`}
                    />
                  )}
                </div>
              </>
            );

            const badge = c.badgeLabel ? (
              <span className="absolute right-2 top-2 z-20 rounded-full bg-neutral-800/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white sm:text-[10px]">
                {c.badgeLabel}
              </span>
            ) : null;

            return (
              <li key={c.id}>
                {c.leagueHref ? (
                  <Link
                    href={c.leagueHref}
                    className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
                  >
                    <article className={articleClassName} aria-label={c.title}>
                      {badge}
                      {logo}
                    </article>
                  </Link>
                ) : (
                  <article
                    className={`group ${articleClassName}`}
                    aria-label={c.title}
                  >
                    {badge}
                    {logo}
                  </article>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
