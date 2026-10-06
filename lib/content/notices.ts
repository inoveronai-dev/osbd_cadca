/**
 * Typed notices — ready for CMS/API later.
 * Do not invent publication dates when unavailable.
 */
export type Notice = {
  id: string;
  title: string;
  /** ISO date string when known; omit when unknown */
  publishedAt?: string;
  href?: string | null;
  status?: "ready" | "pending";
};

export const latestNotices: Notice[] = [
  {
    id: "elektricke-zariadenia",
    title:
      "Zmena dodávateľa odborných prehliadok a odborných skúšok elektrických zariadení",
    status: "pending",
  },
  {
    id: "energopomoc",
    title: "ENERGOPOMOC",
    status: "pending",
  },
  {
    id: "vodne-stocne-2026",
    title:
      "Zmena ceny vodného a stočného od 05. 01. 2026 – SEVAK, a.s. Žilina",
    status: "pending",
  },
];
