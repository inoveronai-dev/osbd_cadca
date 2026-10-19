import { loadKontakty } from "@/lib/content/load";

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

export const faultContacts = loadKontakty().faultContacts;
