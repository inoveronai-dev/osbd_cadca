import { loadHistoria } from "@/lib/content/load";

export function getHistoriaParagraphs() {
  return loadHistoria().paragraphs;
}

export const historiaParagraphs = loadHistoria().paragraphs;
