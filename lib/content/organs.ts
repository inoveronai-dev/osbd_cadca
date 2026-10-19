import { loadOrgany } from "@/lib/content/load";

export type OrganMember = {
  name: string;
  role: string;
};

export function getOrgany() {
  return loadOrgany();
}

export const predstavenstvo = loadOrgany().predstavenstvo;
export const kontrolnaKomisia = loadOrgany().kontrolnaKomisia;
export const organsClosingText = loadOrgany().closingText;
