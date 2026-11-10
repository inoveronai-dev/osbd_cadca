import "server-only";

import {
  loadDokumentyTlaciva,
  loadDomovyPoriadok,
  loadKablovaTv,
  loadStanovy,
} from "@/lib/content/load";
import { withPdfAvailability } from "@/lib/content/pdf-availability";
import type { DocumentGroup, PdfDocument } from "@/lib/content/document-types";

export type { DocumentGroup, PdfDocument } from "@/lib/content/document-types";

function withGroupAvailability(groups: DocumentGroup[]): DocumentGroup[] {
  return groups.map((group) => ({
    ...group,
    documents: group.documents.map((doc) => withPdfAvailability(doc)),
  }));
}

export function getStanovyGroups() {
  return withGroupAvailability(loadStanovy().groups);
}

export function getDokumentyTlacivaGroups() {
  return withGroupAvailability(loadDokumentyTlaciva().groups);
}

export function getDomovyPoriadokDocument() {
  return withPdfAvailability(loadDomovyPoriadok().document);
}

export function getKablovaTv() {
  const data = loadKablovaTv();
  return {
    ...data,
    documentGroups: withGroupAvailability(data.documentGroups),
  };
}

export const stanovyGroups = getStanovyGroups();
export const dokumentyTlacivaGroups = getDokumentyTlacivaGroups();
export const domovyPoriadokDocument = getDomovyPoriadokDocument();
export const kablovaBenefits = getKablovaTv().benefits;
export const kablovaDocumentGroups = getKablovaTv().documentGroups;
