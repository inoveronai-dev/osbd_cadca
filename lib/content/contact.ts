import { loadKontakty, loadSite } from "@/lib/content/load";

export function getContact() {
  return loadSite().contact;
}

export function getOfficeHours() {
  return loadKontakty().officeHours;
}

export const contact = getContact();
export const officeHours = getOfficeHours();

export type OfficeHoursRow = {
  day: string;
  hours: string | readonly string[];
};

/** Build a tel: href from a display number (spaces and slashes stripped). */
export function telHref(display: string): string {
  const digits = display.replace(/[^\d+]/g, "");
  if (digits.startsWith("0") && !digits.startsWith("00")) {
    return `tel:+421${digits.slice(1)}`;
  }
  return `tel:${digits}`;
}
