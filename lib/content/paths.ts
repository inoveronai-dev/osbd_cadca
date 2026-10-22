/** Allowlisted CMS content filenames (under /content). */
export const CONTENT_FILES = [
  "site.json",
  "homepage.json",
  "aktuality.json",
  "kontakty.json",
  "organy.json",
  "historia.json",
  "stanovy.json",
  "dokumenty-tlaciva.json",
  "domovy-poriadok.json",
  "kablova-tv.json",
  "elektronicke-dorucovanie.json",
] as const;

export type ContentFileName = (typeof CONTENT_FILES)[number];

export const UPLOAD_PREFIXES = [
  "public/uploads/images/homepage/",
  "public/uploads/documents/aktuality/",
  "public/uploads/documents/stanovy/",
  "public/uploads/documents/dokumenty-tlaciva/",
  "public/uploads/documents/domovy-poriadok/",
  "public/uploads/documents/kablova-tv/",
  "public/uploads/documents/elektronicke-dorucovanie/",
] as const;

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_PDF_BYTES = 12 * 1024 * 1024;
