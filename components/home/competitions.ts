import type { StaticImageData } from "next/image";
import englandEpl from "@/svgs/competitions/england_english-premier-league.football-logos.cc.svg";
import franceLigue1 from "@/svgs/competitions/france_ligue-1.football-logos.cc.svg";
import germanyBundesliga from "@/svgs/competitions/germany_bundesliga.football-logos.cc.svg";
import italySerieA from "@/svgs/competitions/italy_serie-a.football-logos.cc.svg";
import spainLaLiga from "@/svgs/competitions/spain_la-liga.football-logos.cc.svg";
import uefaChampions from "@/svgs/competitions/tournaments_uefa-champions-league.football-logos.cc.svg";
import uefaEuropa from "@/svgs/competitions/tournaments_uefa-europa-league.football-logos.cc.svg";

/** Logo en hover: blanco vía filtro, o colores originales (bandera / rojos del escudo). */
export type CompetitionLogoHover = "white" | "original";

export type Competition = {
  id: string;
  title: string;
  logo: StaticImageData;
  /** Color de marca (hex) para el fondo al hover. */
  hoverBg: string;
  logoHover: CompetitionLogoHover;
  /** Ruta interna de la liga (ej. /league/premier-league/). */
  leagueHref?: string;
};

export const COMPETITIONS: Competition[] = [
  {
    id: "epl",
    title: "Premier League",
    logo: englandEpl,
    hoverBg: "#37003c",
    logoHover: "white",
    leagueHref: "/league/premier-league/",
  },
  {
    id: "laliga",
    title: "La Liga",
    logo: spainLaLiga,
    hoverBg: "#ff4b44",
    logoHover: "white",
    leagueHref: "/league/la-liga/",
  },
  {
    id: "serie-a",
    title: "Serie A",
    logo: italySerieA,
    hoverBg: "#082040",
    logoHover: "original",
  },
  {
    id: "bundesliga",
    title: "Bundesliga",
    logo: germanyBundesliga,
    hoverBg: "#d10214",
    logoHover: "original",
  },
  {
    id: "ligue-1",
    title: "Ligue 1",
    logo: franceLigue1,
    hoverBg: "#1a1a1a",
    logoHover: "white",
  },
  {
    id: "ucl",
    title: "Champions League",
    logo: uefaChampions,
    hoverBg: "#00004b",
    logoHover: "white",
  },
  {
    id: "uel",
    title: "Europa League",
    logo: uefaEuropa,
    hoverBg: "#ff6900",
    logoHover: "white",
  },
];
