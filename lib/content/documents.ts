export type PdfDocument = {
  title: string;
  href: string;
  /** Optional validity / date line already supplied by OSBD. */
  meta?: string;
};

export type DocumentGroup = {
  id: string;
  title: string;
  /** When true, category starts expanded (native details). */
  defaultOpen?: boolean;
  documents: PdfDocument[];
};

export const stanovyGroups: DocumentGroup[] = [
  {
    id: "stanovy",
    title: "Stanovy OSBD Čadca",
    documents: [
      {
        title: "Stanovy platné od 19. 06. 2023",
        href: "https://osbdcadca.sk/wp-content/uploads/2024/06/STANOVY-od-19.06.2023.pdf",
      },
    ],
  },
  {
    id: "rokovaci-poriadok",
    title: "Rokovací poriadok",
    documents: [
      {
        title: "Rokovací poriadok platný od 18. 06. 2018",
        href: "https://osbdcadca.sk/wp-content/uploads/2024/06/Rokovac%C3%AD-poriadok-od-18.06.2018.pdf",
      },
    ],
  },
  {
    id: "volebny-poriadok",
    title: "Volebný poriadok OSBD Čadca",
    documents: [
      {
        title: "Volebný poriadok platný od 10. 06. 2019",
        href: "https://osbdcadca.sk/wp-content/uploads/2024/06/Volebn%C3%BD-poriadok-od-10.06.2019.pdf",
      },
    ],
  },
];

export const dokumentyTlacivaGroups: DocumentGroup[] = [
  {
    id: "cennik",
    title: "Cenník služieb",
    defaultOpen: true,
    documents: [
      {
        title:
          "Cenník poplatkov za služby nad rámec zmluvy o výkone správy platný od 01. 02. 2026",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/07/cenn%C3%ADk_2026_01.02.2026.pdf",
      },
    ],
  },
  {
    id: "elektronicke-dorucovanie",
    title: "Elektronické doručovanie dokumentov",
    defaultOpen: true,
    documents: [
      {
        title: "Dohoda o elektronickom doručovaní dokumentov",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/07/Dohoda-o-elektronickom-doru%C4%8Dovan%C3%AD.pdf",
      },
      {
        title: "Informácia k elektronickému doručovaniu dokumentov",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/07/Inform%C3%A1cia-k-elektronick%C3%A9mu-doru%C4%8Dovaniu-dokumentov_.pdf",
      },
    ],
  },
  {
    id: "pisomne-hlasovanie",
    title: "Písomné hlasovanie na bytovom dome – vchode",
    defaultOpen: true,
    documents: [
      {
        title: "Žiadosť o elektronické hlasovanie na písomnom hlasovaní",
        href: "https://osbdcadca.sk/wp-content/uploads/2025/02/%C5%BDiados%C5%A5-o-elektronick%C3%A9-p%C3%ADsomn%C3%A9-hlasovanie.pdf",
      },
    ],
  },
  {
    id: "dokumenty-tlaciva",
    title: "Dokumenty a tlačivá",
    defaultOpen: false,
    documents: [
      {
        title: "Odpočty meračov studenej a teplej vody",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/07/Odpo%C4%8Dty-mera%C4%8Dov-studenej-a-teplej-vody.pdf",
      },
      {
        title: "Čestné prehlásenie o počte bývajúcich v byte",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/04/%C4%8Cestn%C3%A9-prehl%C3%A1senie-o-po%C4%8Dte-b%C3%BDvaj%C3%BAcich-v-byte.pdf",
      },
      {
        title: "Čestné prehlásenie o nevykonávaní činnosti počas PN",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/estn_prehlsenie.pdf",
      },
      {
        title: "Výkaz činností výťahára.pdf",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Vkaz_innost_vahra.pdf",
      },
      {
        title: "Žiadanka na vykonanie prác v družstevnom byte",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/iadanka_na_vykonanie_prc_v_drustevnom_byte.pdf",
      },
      {
        title: "Reklamačný poriadok",
        href: "https://osbdcadca.sk/wp-content/uploads/2023/10/Reklama%C4%8Dn%C3%BD-poriadok-xxxxx.pdf",
      },
      {
        title: "Zákon č. 182/1993 – novelizácia.pdf",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/ZZ_1993_182_20190101.pdf",
      },
      {
        title: "Metodický list pre ZV k novele zákona č.182/1993.pdf",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Metodicklist_pre_ZV_k_novele_zkona_182-1993.pdf",
      },
      {
        title: "Vyhláška č.358/2009.pdf",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/vyhlaska_358_rok_2009_rozpocet_tepla.pdf",
      },
      {
        title: "Vyhláška č.630/2005.pdf",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/vyhl_630-2005.pdf",
      },
      {
        title: "Zákon o energetickej efektívnosti č.321/2014.pdf",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/z_321_2014.pdf",
      },
      {
        title: "Zákon č. 657/2004.pdf",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/kz_657_2004_01-12-2014.pdf",
      },
      {
        title: "Zákon č.476/2008.pdf",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Zkon_.476-2008.pdf",
      },
    ],
  },
  {
    id: "postup-obstaravania",
    title: "Postup obstarávania tovarov a služieb",
    defaultOpen: false,
    documents: [
      {
        title: "Postup obstarávania tovarov a služieb",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Postup_obst_tov_a_sl_CA.pdf",
      },
    ],
  },
];

export const domovyPoriadokDocument: PdfDocument = {
  title: "Domový poriadok OSBD Čadca",
  href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Domov_poriadok_OSBD_adca_.pdf",
};

export const kablovaBenefits = [
  "televízne programy môžete sledovať kdekoľvek a kedykoľvek",
  "televízia v mobile, či v tablete",
  "funguje s internetom od ľubovoľného poskytovateľa",
  "ponúka Vám pohodlie a komfort",
  "nemusíte nič vŕtať, búrať, ani zložito montovať",
  "stačí zadať do Vášho smart televízora, tabletu alebo mobilného telefónu prihlasovacie údaje a okamžite môžete sledovať svoje obľúbené programy",
  "zriadenie služby bez akéhokoľvek čakania",
  "balíčky televíznych programov v OTT službe sú tie isté ako pre digitálnu televíziu podľa ponuky /viď programová štruktúra digitálnej televízie od 01. 02. 2024/",
] as const;

export const kablovaDocumentGroups: DocumentGroup[] = [
  {
    id: "cennik-programova",
    title:
      "Cenník digitálnej televízie a internetu, programová štruktúra digitálnej televízie",
    defaultOpen: true,
    documents: [
      {
        title: "Základný cenník televízie a internetu od 01. 01. 2017",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Cennik_TV__INT__od_1.1.2017-aktualizovan_002-upraven.pdf",
      },
      {
        title: "Akciový cenník služieb platný od 01. 01. 2025",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/08/Akciov%C3%BD-cenn%C3%ADk-slu%C5%BEieb-platn%C3%BD-od-1.-1.-2025-%E2%80%93-zmena-DPH-23-1.pdf",
      },
      {
        title:
          "Programová štruktúra digitálnej televízie platná od 15. 08. 2026",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/08/Programova-struktura-DIGI-TKR-od-15.-08.-2026-nov%C3%A9-n%C3%A1zvy-Arena-Sport.pdf",
      },
    ],
  },
  {
    id: "oznam-zmena-ceny",
    title: "Oznam o zmene ceny televízie a internetu",
    defaultOpen: true,
    documents: [
      {
        title:
          "Zmena ceny televízie a internetu od 01. 01. 2025 – zmena výšky DPH",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/07/Oznam-o-zv%C3%BD%C5%A1en%C3%AD-DPH.pdf",
      },
      {
        title: "Zmena ceny televízie a internetu od 01. 02. 2023",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/08/ZMENA-CENY-DIGITAL-a-INTERNET-od-01.-02.-2023.pdf",
      },
    ],
  },
  {
    id: "dalsie-clanky",
    title: "Ďalšie články a oznamy",
    defaultOpen: false,
    documents: [
      {
        title:
          "Odporúčaný postup naladenia TV prijímača pre príjem digitálneho vysielania",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/04/Postup-naladenia-CAM-modulu-x.pdf",
      },
      {
        title:
          "Technické parametre pre naladenie digitálneho príjmu v pásme DVB-C",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/TECHNICK_PARAMETRE_PRE_NALADENIE_DIGITLNHO_PRJMU_V_PSME_DVB_C.pdf",
      },
      {
        title: "Zmena poradia televíznych programov spoločnosti JOJ GROUP",
        href: "https://osbdcadca.sk/wp-content/uploads/2024/07/Zmena-poradia-TV-programov-JOJ.pdf",
      },
      {
        title:
          "Zmena vysielania TV programov CS Film, CS History, CS Mystery, CS Horror",
        href: "https://osbdcadca.sk/wp-content/uploads/2023/10/Zmena-TV-bal%C3%ADku-programov-CS-Film-2x.pdf",
      },
      {
        title:
          "Prechod analógového vysielania na digitálne vysielanie od 01. 09. 2019",
        href: "https://osbdcadca.sk/wp-content/uploads/2026/08/Ozn%C3%A1menie-o-ukon%C4%8Den%C3%AD-anal%C3%B3gov%C3%A9ho-vysielania-list-FIN%C3%81L-%E2%80%93-oprava.pdf",
      },
      {
        title: "Všeobecné obchodné podmienky TKR",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Veobecn_obchodn_podmienky_TKR.pdf",
      },
      {
        title: "Všeobecné zmluvné podmienky pre službu INTERNET OSBD",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Veobecn_zmluvn_podmienky_pre__slubu_INTERNET_OSBD_-_5a.pdf",
      },
      {
        title: "Reklamačný poriadok pre koncové zariadenia",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Reklaman_poriadok_-_internet.pdf",
      },
      {
        title: "Prevádzkový poriadok INTERNETU OSBD",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Prevdzkov_poriadok_INTERNETU_OSBD.pdf",
      },
      {
        title: "Rozhranie OSBD Čadca – internet",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/Rozhranie_OSBD_adca_-_internet.pdf",
      },
      {
        title:
          "Informácie o nariadeniach Európskeho parlamentu a Rady 2015/2120",
        href: "http://osbdcadca.sk/wp-content/uploads/2020/02/INFORMCIE__o_nariadeniach_Europskho_parlamentu__a_Rady_2015-2120.pdf",
      },
    ],
  },
];
