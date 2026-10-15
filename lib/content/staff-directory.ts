export type StaffPerson = {
  name: string;
  room?: string;
  phones?: readonly string[];
  emails?: readonly string[];
};

export type StaffGroup = {
  id: string;
  title: string;
  people: readonly StaffPerson[];
};

export const staffDirectory: {
  sectionId: string;
  headline: string;
  groups: StaffGroup[];
} = {
  sectionId: "kontakty-druzstva",
  headline: "Kontakty družstva",
  groups: [
    {
      id: "predstavenstvo",
      title: "Predstavenstvo",
      people: [
        {
          name: "predseda predstavenstva Ing. Marián Sihelník",
          emails: ["predsedapredstavenstva@osbdcadca.sk"],
        },
      ],
    },
    {
      id: "kontrolna-komisia",
      title: "Kontrolná komisia",
      people: [
        {
          name: "predseda kontrolnej komisie Ing. Alojz Kozoň",
          emails: ["kontrolnakomisia@osbdcadca.sk"],
        },
      ],
    },
    {
      id: "riaditelka",
      title: "Riaditeľka OSBD Čadca",
      people: [
        {
          name: "Bc. Alena Gužíková",
          room: "č. dverí 201",
          phones: ["0907 620 118"],
          emails: ["riaditel@osbdcadca.sk", "ekonom@osbdcadca.sk"],
        },
      ],
    },
    {
      id: "sekretariat",
      title: "Sekretariát, bytový referát, členské vzťahy",
      people: [
        {
          name: "Mgr. Adela Truchliková",
          room: "č. dverí 202",
          phones: ["0905 300 722"],
          emails: ["bytreferent@osbdcadca.sk"],
        },
      ],
    },
    {
      id: "kablovka",
      title:
        "Káblová televízia a internet, faktúry údržby, odpočty bytových vodomerov",
      people: [
        {
          name: "Mária Jurišová",
          room: "č. dverí 204",
          phones: ["0948 871 744", "041/432 29 32"],
          emails: ["kablovka@osbdcadca.sk"],
        },
      ],
    },
    {
      id: "udrzba",
      title: "Zástupca riaditeľa, vedúci údržby, revízie, poruchy",
      people: [
        {
          name: "Ing. Ján Šurlák",
          room: "č. dverí 205",
          phones: ["0907 269 023"],
          emails: ["udrzba@osbdcadca.sk"],
        },
      ],
    },
    {
      id: "energetik",
      title: "Energetik, výťahy, závady elektro, stavebné úpravy v bytoch",
      people: [
        {
          name: "Ing. Pavol Klimek",
          room: "č. dverí 206",
          phones: ["0915 835 160"],
          emails: ["energetik@osbdcadca.sk"],
        },
      ],
    },
    {
      id: "najomne",
      title: "Oddelenie nájomného, pokladňa",
      people: [
        {
          name: "Mgr. Monika Poláčková",
          room: "č. dverí 207",
          phones: ["0918 803 243"],
          emails: ["pokladna@osbdcadca.sk"],
        },
        {
          name: "Marcela Slováková",
          room: "č. dverí 207",
          phones: ["0918 803 243"],
          emails: ["najomne@osbdcadca.sk"],
        },
      ],
    },
    {
      id: "uctaren",
      title:
        "Účtáreň, fond prevádzky údržby a opráv, dodávateľské faktúry, poistné udalosti",
      people: [
        {
          name: "Bc. Štefánia Minarčíková",
          room: "č. dverí 208",
          phones: ["0905 791 760"],
          emails: ["finuctaren@osbdcadca.sk"],
        },
        {
          name: "Eva Gregušová",
          room: "č. dverí 208",
          phones: ["0905 791 760"],
          emails: ["fondyoprav@osbdcadca.sk"],
        },
      ],
    },
  ],
};
