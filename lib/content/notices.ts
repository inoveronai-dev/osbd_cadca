/**
 * Latest articles for the homepage carousel.
 * Titles and URLs are locked to the live OSBD Čadca site.
 * Do not invent publication dates.
 */
export type Notice = {
  id: string;
  title: string;
  href: string;
};

export const latestNotices: Notice[] = [
  {
    id: "elektricke-zariadenia",
    title:
      "Zmena dodávateľa odborných prehliadok a odborných skúšok elektrických zariadení",
    href: "https://www.osbdcadca.sk/oznam-zmena-dodavatela-odbornych-prehliadok-a-odbornych-skusok-elektrickych-zariadeni/",
  },
  {
    id: "energopomoc",
    title: "ENERGOPOMOC",
    href: "https://www.osbdcadca.sk/oznam-energopomoc/",
  },
  {
    id: "vodne-stocne-2026",
    title:
      "Zmena ceny vodného a stočného od 05. 01. 2026 – SEVAK, a.s. Žilina",
    href: "https://www.osbdcadca.sk/oznam-zmena-ceny-vody-od-05-01-2026/",
  },
  {
    id: "vodne-stocne-do-2026",
    title: "Cena vodného a stočného do 04. 01. 2026 – SEVAK, a.s. Žilina",
    href: "https://www.osbdcadca.sk/oznam-o-zmene-ceny-vody/",
  },
  {
    id: "cena-tepla-2025-2026",
    title: "Jednozložková cena tepla roky 2025, 2026",
    href: "https://www.osbdcadca.sk/oznam-jednozlozkova-cena-tepla-roky-2025-2026/",
  },
  {
    id: "dph-zmena",
    title: "ZMENA ZÁKLADNEJ SADZBY DANE Z PRIDANEJ HODNOTY (DPH)",
    href: "https://www.osbdcadca.sk/oznam-o-zmene-zakladnej-sadzby-dane-z-pridanej-hodnoty-dph/",
  },
  {
    id: "vykurovanie",
    title: "VEĽKÉ ZMENY PRI VYKUROVANÍ",
    href: "https://www.osbdcadca.sk/velke-zmeny-pri-vykurovani-2/",
  },
  {
    id: "ochrana-udajov",
    title: "OCHRANA OSOBNÝCH ÚDAJOV",
    href: "https://www.osbdcadca.sk/ochrana-osobnych-udajov/",
  },
  {
    id: "zmluvy-sprava",
    title: "ZMLUVY O VÝKONE SPRÁVY (ZoVS)",
    href: "https://www.osbdcadca.sk/zmluvy-o-vykone-spravy/",
  },
  {
    id: "diagnostika-kamera",
    title: "Diagnostika kamerovým systémom",
    href: "https://www.osbdcadca.sk/diagnostika-kamerovym-systemom-2/",
  },
];
