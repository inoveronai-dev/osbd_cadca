/** Confirmed contact information and office hours. */
export const contact = {
  phoneDisplay: "041/433 33 90",
  phoneHref: "tel:+421414333390",
  email: "osbdcadca@osbdcadca.sk",
  addressLines: ["Gočárova 252", "022 47 Čadca"],
  addressFull: "Gočárova 252, 022 47 Čadca",
} as const;

export const officeHours = {
  status: "ready" as const,
  title: "Stránkové hodiny",
  schedule: [
    { day: "Pondelok", hours: "7:00 – 11:00 / 12:00 – 17:00" },
    { day: "Utorok", hours: "nestránkový deň" },
    { day: "Streda", hours: "7:00 – 11:00 / 12:00 – 17:00" },
    { day: "Štvrtok", hours: "nestránkový deň" },
    { day: "Piatok", hours: "7:00 – 11:00" },
  ],
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
