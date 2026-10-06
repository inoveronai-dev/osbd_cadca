import { contact, officeHours } from "./contact";
import { latestNotices } from "./notices";

export const brand = {
  name: "OSBD Čadca",
  legalName: "Okresné stavebné bytové družstvo so sídlom v Čadci",
  positioning:
    "Dlhoročné bytové družstvo so sídlom v Čadci, ktoré zabezpečuje správu bytových domov v regióne Kysúc.",
} as const;

export const hero = {
  eyebrow: "Správa bytových domov • Čadca",
  headline: "Pomáhame lepšie bývať.",
  support:
    "Už viac ako 60 rokov zabezpečujeme odbornú a spoľahlivú správu bytových domov v regióne Kysúc.",
  primaryCta: {
    label: "Ponuka správy bytových domov",
    href: "#sprava",
  },
  secondaryCta: {
    label: "Kontaktovať nás",
    href: "#kontakt",
  },
  proof: [
    { value: 60, suffix: "+", label: "rokov skúseností" },
    { value: 3200, suffix: "+", label: "spravovaných bytov", format: "sk" },
    {
      valueLabel: "Komplexná správa",
      label: "pod jednou strechou",
    },
  ],
  imageSlot: {
    id: "hero-cadca-kysuce",
    label: "hero-cadca-kysuce",
    description:
      "Široká autentická fotografia Čadce / Kysúc s bytovými domami a krajinou",
    aspect: "wide" as const,
  },
} as const;

export const quickAccess = {
  headline: "Čo potrebujete vybaviť?",
  support: "Najčastejšie hľadané informácie na jednom mieste.",
  items: [
    {
      id: "oznamy",
      title: "Oznamy",
      description: "Najnovšie informácie pre vlastníkov",
      href: "#oznamy",
      icon: "megaphone" as const,
    },
    {
      id: "dokumenty",
      title: "Dokumenty a tlačivá",
      description: "Potrebné dokumenty na jednom mieste",
      href: null,
      status: "pending" as const,
      icon: "file" as const,
    },
    {
      id: "hodiny",
      title: "Stránkové hodiny",
      description: "Pozrite si, kedy nás môžete navštíviť",
      href: "#strankove-hodiny",
      icon: "clock" as const,
    },
    {
      id: "kontakty",
      title: "Kontakty",
      description: "Nájdite správny kontakt",
      href: "#kontakt",
      icon: "phone" as const,
    },
  ],
} as const;

export const aboutSection = {
  id: "o-nas",
  eyebrow: "O nás",
  headline: "Viac ako 60 rokov skúseností so správou bývania.",
  paragraphs: [
    "Okresné stavebné bytové družstvo so sídlom v Čadci patrí medzi dlhoročných správcov bytových domov v regióne Kysúc. Spravujeme viac ako 3 200 bytov a našim klientom poskytujeme odborné zázemie v technickej, ekonomickej aj právnej oblasti.",
    "Našou prioritou je kvalitná a transparentná správa založená na spolupráci s vlastníkmi bytov.",
  ],
  link: {
    label: "Viac o OSBD Čadca",
    href: null,
    status: "pending" as const,
  },
  imageSlot: {
    id: "about-osbd-hq",
    label: "about-osbd-hq",
    description:
      "Fotografia sídla OSBD Čadca alebo autentická fotografia zamestnancov",
    aspect: "portrait" as const,
  },
} as const;

export const whyOsbd = {
  headline: "Prečo OSBD Čadca",
  intro:
    "Správa domu nie je iba administratíva. Je to dlhodobá starostlivosť o spoločný majetok, financie aj kvalitu bývania.",
  benefits: [
    {
      number: "01",
      title: "Viac ako 60 rokov skúseností",
      description:
        "Dlhodobá prax so správou bytových domov v regióne Kysúc.",
    },
    {
      number: "02",
      title: "Transparentné hospodárenie",
      description:
        "Prehľadné vedenie financií a účtov bytového domu.",
    },
    {
      number: "03",
      title: "Individuálny prístup",
      description:
        "Riešenia podľa potrieb konkrétneho domu a jeho vlastníkov.",
    },
    {
      number: "04",
      title: "Odborné zázemie",
      description:
        "Technická, ekonomická a právna odbornosť pod jednou strechou.",
    },
    {
      number: "05",
      title: "Komplexná správa",
      description:
        "Od každodennej prevádzky až po obnovu a väčšie investičné projekty.",
    },
    {
      number: "06",
      title: "Partnerstvo s vlastníkmi",
      description: "Vlastníci rozhodujú. OSBD zabezpečuje, radí a pomáha.",
    },
  ],
} as const;

export const services = {
  id: "sprava",
  headline: "O váš dom sa staráme komplexne.",
  categories: [
    {
      title: "Technická správa",
      description:
        "Údržba, opravy, technické zariadenia a prevádzka domu.",
    },
    {
      title: "Ekonomická správa",
      description:
        "Finančné a ekonomické záležitosti spojené so správou domu.",
    },
    {
      title: "Obnova a modernizácia",
      description:
        "Rekonštrukcie, zateplenie, meranie, regulácia a ďalšie investície.",
    },
    {
      title: "Odborné poradenstvo",
      description:
        "Pomoc pri správe domu, legislatíve a väčších investičných projektoch.",
    },
  ],
  imageSlot: {
    id: "services-renovation",
    label: "services-renovation",
    description:
      "Zrekonštruovaný bytový dom v Čadci / na Kysuciach",
    aspect: "landscape" as const,
  },
} as const;

export const managementCta = {
  headline: "Hľadáte spoľahlivého správcu pre váš bytový dom?",
  copy: "Dlhoročné skúsenosti, odborné zázemie a komplexná starostlivosť nám umožňujú riešiť každodennú správu aj väčšie investičné projekty.",
  cta: {
    label: "Pozrieť ponuku správy",
    href: "#sprava",
  },
  imageSlot: {
    id: "cta-detail",
    label: "cta-detail",
    description:
      "Budova OSBD alebo autentický detail bytového domu",
    aspect: "landscape" as const,
  },
} as const;

export const noticesSection = {
  id: "oznamy",
  headline: "Najnovšie články",
  categoryLink: {
    label: "Aktuality",
    href: "https://www.osbdcadca.sk/category/aktuality/",
  },
  allLink: {
    label: "Všetky oznamy",
    href: "https://www.osbdcadca.sk/category/aktuality/",
    status: "ready" as const,
  },
  items: latestNotices,
} as const;

export const contactSection = {
  id: "kontakt",
  headline: "Kontakty",
  support: "Sme tu pre vlastníkov bytov aj záujemcov o správu.",
  contact,
  officeHours,
  officeHoursAnchor: "strankove-hodiny",
} as const;

export const imageSlots = [
  hero.imageSlot,
  aboutSection.imageSlot,
  services.imageSlot,
  managementCta.imageSlot,
] as const;
