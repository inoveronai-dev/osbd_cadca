import {
  loadDokumentyTlaciva,
  loadDomovyPoriadok,
  loadKablovaTv,
  loadStanovy,
} from "@/lib/content/load";

export type PdfDocument = {
  title: string;
  href: string;
  meta?: string;
};

export type DocumentGroup = {
  id: string;
  title: string;
  defaultOpen?: boolean;
  documents: PdfDocument[];
};

export function getStanovyGroups() {
  return loadStanovy().groups;
}

export function getDokumentyTlacivaGroups() {
  return loadDokumentyTlaciva().groups;
}

export function getDomovyPoriadokDocument() {
  return loadDomovyPoriadok().document;
}

export function getKablovaTv() {
  return loadKablovaTv();
}

export const stanovyGroups = loadStanovy().groups;
export const dokumentyTlacivaGroups = loadDokumentyTlaciva().groups;
export const domovyPoriadokDocument = loadDomovyPoriadok().document;
export const kablovaBenefits = loadKablovaTv().benefits;
export const kablovaDocumentGroups = loadKablovaTv().documentGroups;
