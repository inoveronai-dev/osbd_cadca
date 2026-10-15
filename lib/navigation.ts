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
      { label: "História", href: null, status: "pending" },
      { label: "Orgány družstva", href: null, status: "pending" },
      { label: "Stanovy OSBD", href: null, status: "pending" },
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
    status: "pending",
    children: [
      { label: "Dokumenty, tlačivá", href: null, status: "pending" },
      { label: "Domový poriadok", href: null, status: "pending" },
      { label: "Káblová TV a internet", href: null, status: "pending" },
    ],
  },
  { label: "Aktuality", href: "/aktuality", status: "ready" },
  { label: "Kontakty", href: "#kontakt", status: "anchor" },
];

export const footerNavGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "O spoločnosti",
    items: [
      { label: "O nás", href: "#o-nas", status: "anchor" },
      { label: "Správa bytových domov", href: "#sprava", status: "anchor" },
      { label: "Aktuality", href: "/aktuality", status: "ready" },
    ],
  },
  {
    title: "Pre vlastníkov",
    items: [
      { label: "Dokumenty", href: null, status: "pending" },
      { label: "Aktuality", href: "/aktuality", status: "ready" },
      { label: "Kontakty", href: "#kontakt", status: "anchor" },
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
