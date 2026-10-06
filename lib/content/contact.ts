/** Confirmed contact information only — do not invent opening hours or extras. */
export const contact = {
  phoneDisplay: "041/433 33 90",
  phoneHref: "tel:+421414333390",
  email: "osbdcadca@osbdcadca.sk",
  addressLines: ["Gočárova 252", "022 47 Čadca"],
  addressFull: "Gočárova 252, 022 47 Čadca",
} as const;

/**
 * OPEN ITEM: Official stránkové hodiny are not yet supplied.
 * Do not invent times — surface this as pending in the UI.
 */
export const officeHours = {
  status: "pending" as const,
  note: "Presné stránkové hodiny budú doplnené.",
};
