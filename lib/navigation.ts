export type NavStatus = "ready" | "pending" | "anchor";

export type NavItem = {
  label: string;
  /** In-page hash or path when ready; null when pending */
  href: string | null;
  status: NavStatus;
};

export type PrimaryNavItem = NavItem & {
  /** Dropdown structure only — children never open new pages */
  children?: NavItem[];
};

/**
 * Primary header navigation. Pending destinations must not invent empty pages.
 * Use status: "pending" until a real in-page section or route exists.
 */
export const primaryNav: PrimaryNavItem[] = [
  {
    label: "O nás",
    href: "#o-nas",
    status: "anchor",
    children: [
      { label: "O nás", href: "#o-nas", status: "anchor" },
      { label: "História", href: "/historia", status: "ready" },
      { label: "Orgány družstva", href: "/organy-druzstva", status: "ready" },
      { label: "Stanovy OSBD", href: "/stanovy-osbd", status: "ready" },
    ],
  },
  {
    label: "Správa bytových domov",
    href: "#sprava",
    status: "anchor",
  },
  {
    label: "Pre vlastníkov",
    href: null,
    status: "ready",
    children: [
      {
        label: "Dokumenty a tlačivá",
        href: "/dokumenty-tlaciva",
        status: "ready",
      },
      { label: "Domový poriadok", href: "/domovy-poriadok", status: "ready" },
      {
        label: "Káblová TV a internet",
        href: "/kablova-tv-internet",
        status: "ready",
      },
    ],
  },
  { label: "Aktuality", href: "/aktuality", status: "ready" },
  { label: "Kontakty", href: "/kontakty", status: "ready" },
];

export const footerNavGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "O spoločnosti",
    items: [
      { label: "O nás", href: "#o-nas", status: "anchor" },
      { label: "História", href: "/historia", status: "ready" },
      { label: "Orgány družstva", href: "/organy-druzstva", status: "ready" },
      { label: "Stanovy OSBD", href: "/stanovy-osbd", status: "ready" },
      { label: "Aktuality", href: "/aktuality", status: "ready" },
    ],
  },
  {
    title: "Pre vlastníkov",
    items: [
      {
        label: "Dokumenty a tlačivá",
        href: "/dokumenty-tlaciva",
        status: "ready",
      },
      { label: "Domový poriadok", href: "/domovy-poriadok", status: "ready" },
      {
        label: "Káblová TV a internet",
        href: "/kablova-tv-internet",
        status: "ready",
      },
      { label: "Kontakty", href: "/kontakty", status: "ready" },
    ],
  },
];

export const emergencyCta = {
  label: "Havarijná služba",
  phoneDisplay: "0905 713 605",
  href: "tel:0905713605",
} as const;

/** @deprecated Use emergencyCta — kept alias during migration */
export const officeHoursCta = emergencyCta;
