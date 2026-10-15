export type OrganMember = {
  name: string;
  role: string;
};

export const predstavenstvo: OrganMember[] = [
  { name: "Ing. Marián Sihelník", role: "predseda predstavenstva" },
  { name: "Marián Baranec", role: "podpredseda predstavenstva" },
  { name: "Vladimír Ďurana", role: "člen predstavenstva" },
  { name: "Eva Hrčková", role: "členka predstavenstva" },
  { name: "Lenka Malicherová", role: "členka predstavenstva" },
  { name: "Ing. Miroslav Poništ", role: "člen predstavenstva" },
  { name: "Jaroslav Zachar", role: "člen predstavenstva" },
];

export const kontrolnaKomisia: OrganMember[] = [
  { name: "Ing. Alojz Kozoň", role: "predseda kontrolnej komisie" },
  { name: "František Miženko", role: "podpredseda kontrolnej komisie" },
  { name: "Ľubor Čimbora", role: "člen kontrolnej komisie" },
  { name: "Marián Pištek", role: "člen kontrolnej komisie" },
  { name: "Alena Chrenšťová", role: "člen kontrolnej komisie" },
];

export const organsClosingText =
  "Všetky orgány družstva ako aj pracovníci OSBD pracujú v zmysle stanovených úloh a plánu práce pre nasledovné obdobie, čím je zabezpečený riadny a stabilný chod organizácie.";
