/** Confirmed contact information and office hours. */
export const contact = {
  orgName: "Okresné stavebné bytové družstvo Čadca",
  phoneDisplay: "041/433 33 90",
  phoneHref: "tel:+421414333390",
  email: "osbdcadca@osbdcadca.sk",
  ico: "31 622 704",
  addressLines: ["Gočárova 252", "022 47 ČADCA"],
  addressFull: "Gočárova 252, 022 47 Čadca",
  /** Official OSBD place pin on Google Maps. */
  mapsUrl: "https://maps.app.goo.gl/ejPbEpvCDgjfsWvNA",
  /**
   * Exact building coordinates for the embed.
   * Address-only queries can resolve to the street instead of OSBD.
   */
  mapsLat: 49.4374479,
  mapsLng: 18.7796565,
  mapsZoom: 17,
} as const;

export type OfficeHoursRow = {
  day: string;
  hours: string | readonly string[];
};

export const officeHours = {
  status: "ready" as const,
  title: "Stránkové hodiny",
  schedule: [
    { day: "Pondelok", hours: ["7:00 – 11:00", "12:00 – 17:00"] },
    { day: "Utorok", hours: "nestránkový deň" },
    { day: "Streda", hours: ["7:00 – 11:00", "12:00 – 17:00"] },
    { day: "Štvrtok", hours: "nestránkový deň" },
    { day: "Piatok", hours: "7:00 – 11:00" },
  ] as const satisfies readonly OfficeHoursRow[],
  lunchBreak: {
    title: "Obedná prestávka",
    detail: "od 11:00 hod. – do 12:00 hod.",
  },
  extras: [
    {
      title: "Stránkový deň – predseda predstavenstva",
      detail: "Streda: 13:00 – 15:00",
    },
    {
      title: "Stránkový deň – právnik",
      detail: "Streda: 13:00 – 16:00",
    },
  ],
  emergency: {
    title: "Havarijná služba",
    lines: [
      "Piatok: 14:00 – 21:00",
      "Sobota, nedeľa, sviatok: 7:00 – 21:00",
    ],
  },
} as const;

/** Build a tel: href from a display number (spaces and slashes stripped). */
export function telHref(display: string): string {
  const digits = display.replace(/[^\d+]/g, "");
  if (digits.startsWith("0") && !digits.startsWith("00")) {
    return `tel:+421${digits.slice(1)}`;
  }
  return `tel:${digits}`;
}
