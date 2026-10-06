export type NavStatus = "ready" | "pending" | "anchor";

export type NavItem = {
  label: string;
  /** In-page hash or path when ready; null when pending */
  href: string | null;
  status: NavStatus;
};

/**
 * Primary navigation. Pending destinations must not invent empty pages.
 * Use status: "pending" until a real route exists.
 */
export const primaryNav: NavItem[] = [
  { label: "O nás", href: "#o-nas", status: "anchor" },
  { label: "Správa bytových domov", href: "#sprava", status: "anchor" },
  { label: "Pre vlastníkov", href: null, status: "pending" },
  { label: "Dokumenty", href: null, status: "pending" },
  { label: "Aktuality", href: "#oznamy", status: "anchor" },
  { label: "Kontakty", href: "#kontakt", status: "anchor" },
];

export const footerNavGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "O spoločnosti",
    items: [
      { label: "O nás", href: "#o-nas", status: "anchor" },
      { label: "Správa bytových domov", href: "#sprava", status: "anchor" },
      { label: "Aktuality", href: "#oznamy", status: "anchor" },
    ],
  },
  {
    title: "Pre vlastníkov",
    items: [
      { label: "Dokumenty", href: null, status: "pending" },
      { label: "Oznamy", href: "#oznamy", status: "anchor" },
      { label: "Kontakty", href: "#kontakt", status: "anchor" },
    ],
  },
];

export const officeHoursCta = {
  label: "Stránkové hodiny",
  href: "#strankove-hodiny",
  status: "anchor" as const,
};
