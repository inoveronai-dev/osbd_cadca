export type PdfDocument = {
  title: string;
  href: string;
  meta?: string;
  /** False when the file is missing under /public (avoid 404 downloads). */
  available?: boolean;
};

export type DocumentGroup = {
  id: string;
  title: string;
  defaultOpen?: boolean;
  documents: PdfDocument[];
};
