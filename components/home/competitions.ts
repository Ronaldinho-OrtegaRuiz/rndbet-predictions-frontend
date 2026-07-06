import type { StaticImageData } from "next/image";
import englandEpl from "@/svgs/competitions/england_english-premier-league.football-logos.cc.svg";
import franceLigue1 from "@/svgs/competitions/france_ligue-1.football-logos.cc.svg";
import germanyBundesliga from "@/svgs/competitions/germany_bundesliga.football-logos.cc.svg";
import italySerieA from "@/svgs/competitions/italy_serie-a.football-logos.cc.svg";
import spainLaLiga from "@/svgs/competitions/spain_la-liga.football-logos.cc.svg";
import netherlandsEredivisie from "@/svgs/competitions/netherlands_eredivisie.football-logos.cc.svg";
import portugalPrimeiraLiga from "@/svgs/competitions/portugal_primeira-liga.football-logos.cc.webp";
import englandChampionship from "@/svgs/competitions/england_efl-championship.football-logos.cc.png";
import brazilSerieA from "@/svgs/competitions/brazil_brazilian-serie-a.football-logos.cc.svg";
import uefaChampions from "@/svgs/competitions/tournaments_uefa-champions-league.football-logos.cc.svg";
import uefaEuropa from "@/svgs/competitions/tournaments_uefa-europa-league.football-logos.cc.svg";

/** Logo en hover: blanco vía filtro, o colores originales (bandera / rojos del escudo). */
export type CompetitionLogoHover = "white" | "original";

/** Fuente de datos en la UI de liga. */
export type CompetitionDataSource = "api" | "mock";

export type Competition = {
  id: string;
  title: string;
  logo: StaticImageData;
  /** Color de marca (hex) para el fondo al hover. */
  hoverBg: string;
  logoHover: CompetitionLogoHover;
  /** Ruta interna de la liga (ej. /league/premier-league/). */
  leagueHref?: string;
  /** Badge opcional en la tarjeta del home (ej. ligas sin datos en backend). */
  badgeLabel?: string;
  dataSource?: CompetitionDataSource;
  /** Tamaño opcional del logo (p. ej. wordmarks horizontales). */
  logoClassName?: string;
};

export const COMPETITIONS: Competition[] = [
  {
    id: "epl",
    title: "Premier League",
    logo: englandEpl,
    hoverBg: "#37003c",
    logoHover: "white",
    logoClassName:
      "h-[76px] w-auto max-w-[130px] object-contain sm:h-[90px] sm:max-w-[154px]",
    leagueHref: "/league/premier-league/",
    dataSource: "api",
  },
  {
    id: "laliga",
    title: "La Liga",
    logo: spainLaLiga,
    hoverBg: "#ff4b44",
    logoHover: "white",
    leagueHref: "/league/la-liga/",
    dataSource: "api",
  },
  {
    id: "serie-a",
    title: "Serie A",
    logo: italySerieA,
    hoverBg: "#082040",
    logoHover: "original",
    leagueHref: "/league/serie-a/",
    dataSource: "api",
  },
  {
    id: "bundesliga",
    title: "Bundesliga",
    logo: germanyBundesliga,
    hoverBg: "#d10214",
    logoHover: "original",
    leagueHref: "/league/bundesliga/",
    dataSource: "api",
  },
  {
    id: "ligue-1",
    title: "Ligue 1",
    logo: franceLigue1,
    hoverBg: "#133a95",
    logoHover: "white",
    leagueHref: "/league/ligue-1/",
    dataSource: "api",
  },
  {
    id: "eredivisie",
    title: "Eredivisie",
    logo: netherlandsEredivisie,
    hoverBg: "#002F63",
    logoHover: "white",
    dataSource: "mock",
    badgeLabel: "COMING SOON",
  },
  {
    id: "primeira-liga",
    title: "Primeira Liga",
    logo: portugalPrimeiraLiga,
    hoverBg: "#002855",
    logoHover: "white",
    dataSource: "mock",
    badgeLabel: "COMING SOON",
  },
  {
    id: "championship",
    title: "Championship",
    logo: englandChampionship,
    hoverBg: "#D4A84B",
    logoHover: "original",
    dataSource: "mock",
    badgeLabel: "COMING SOON",
  },
  {
    id: "brasileirao",
    title: "Serie A (Brasil)",
    logo: brazilSerieA,
    hoverBg: "#009b3a",
    logoHover: "original",
    dataSource: "mock",
    badgeLabel: "COMING SOON",
  },
  {
    id: "ucl",
    title: "Champions League",
    logo: uefaChampions,
    hoverBg: "#022ae4",
    logoHover: "white",
    leagueHref: "/league/champions-league/",
    dataSource: "api",
  },
  {
    id: "uel",
    title: "Europa League",
    logo: uefaEuropa,
    hoverBg: "#ff6900",
    logoHover: "white",
    leagueHref: "/league/europa-league/",
    dataSource: "mock",
    badgeLabel: "COMING SOON",
  },
];
