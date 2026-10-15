export type FaultProvider = {
  name: string;
  phones?: readonly string[];
  note?: string;
};

export type FaultBlock = {
  id: string;
  title: string;
  subtitle?: string;
  person?: string;
  phones?: readonly string[];
  emails?: readonly string[];
  phoneNotes?: readonly string[];
  providers?: readonly FaultProvider[];
  schedule?: readonly { day: string; hours: string }[];
  primary?: boolean;
  icon:
    | "droplets"
    | "tv"
    | "elevator"
    | "waves"
    | "flame"
    | "zap"
    | "gas"
    | "key";
};

export const faultContacts: {
  sectionId: string;
  headline: string;
  support: string;
  blocks: FaultBlock[];
} = {
  sectionId: "poruchy-zavady",
  headline: "Kontakty na hlásenie závad a porúch",
  support:
    "Rýchle kontakty pre havárie a poruchy. Volajte podľa typu závady.",
  blocks: [
    {
      id: "havarijna-voda",
      title: "Havarijná služba – voda, kúrenie a kanalizácia",
      person: "Pavel Hrabec",
      phones: ["0905 713 605"],
      primary: true,
      icon: "droplets",
    },
    {
      id: "kablovka-pracovna",
      title: "Káblová televízia – počas pracovnej doby OSBD Čadca",
      person: "Mária Jurišová",
      phones: ["0948 871 744"],
      emails: ["kablovka@osbdcadca.sk"],
      schedule: [
        { day: "Pondelok", hours: "7:00 – 17:00" },
        { day: "Utorok", hours: "7:00 – 14:00" },
        { day: "Streda", hours: "7:00 – 17:00" },
        { day: "Štvrtok", hours: "7:00 – 14:00" },
        { day: "Piatok", hours: "7:00 – 13:00" },
      ],
      icon: "tv",
    },
    {
      id: "kablovka-mimo",
      title: "Káblová televízia – mimo pracovnej doby",
      emails: ["kablovka@osbdcadca.sk"],
      phones: ["041/432 29 32"],
      phoneNotes: ["odkazová služba"],
      icon: "tv",
    },
    {
      id: "vytahy",
      title: "Závady výťahov",
      person: "CA VÝŤAHY – p. Kubica",
      phones: ["0911 905 015", "0911 426 953", "0908 515 306", "0902 115 929"],
      icon: "elevator",
    },
    {
      id: "sevak",
      title: "SEVAK havarijná služba",
      subtitle: "závady kanalizácie v správe SeVaK, a.s.",
      phones: ["041/707 17 29", "041/700 31 50", "0905 575 347"],
      icon: "waves",
    },
    {
      id: "teplo-tuv",
      title: "Dodávatelia tepla a TÚV",
      providers: [
        {
          name: "Mestská teplárenská spol., a.s. Čadca",
          phones: ["041/432 68 58"],
        },
        {
          name: "Energetika Turzovka",
          phones: ["0915 668 379", "0915 668 398", "041/435 27 19"],
        },
        {
          name: "KRASBYT, Krásno nad Kysucou",
          phones: ["0948 319 027", "041/438 52 12"],
        },
      ],
      icon: "flame",
    },
    {
      id: "sse",
      title: "Stredoslovenské energetické závody",
      subtitle: "infolinka Žilina / havarijná služba",
      phones: ["0850 111 468", "0800 159 000"],
      icon: "zap",
    },
    {
      id: "elektro",
      title: "Závady elektroinštalácie",
      person: "Stanislav Chovanec – STAMI",
      phones: ["0918 082 772"],
      icon: "zap",
    },
    {
      id: "plyn",
      title: "Závady plynoinštalácie",
      providers: [
        { name: "SPP", phones: ["0850 111 727"] },
        { name: "p. Kajánek", phones: ["0903 826 468"] },
      ],
      icon: "gas",
    },
    {
      id: "klucova",
      title: "Kľúčová služba Čadca",
      subtitle: "núdzové otváranie dverí, servis dverí a zámkov",
      phones: ["0909 194 126"],
      icon: "key",
    },
  ],
};
