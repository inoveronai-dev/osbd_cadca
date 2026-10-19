import "server-only";

import {
  MAX_IMAGE_BYTES,
  MAX_PDF_BYTES,
  UPLOAD_PREFIXES,
} from "@/lib/content/paths";
import { assertAllowedRepoPath, joinUploadPath } from "@/lib/cms/allowlist";

export type UploadKind = "image" | "pdf";

const IMAGE_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function sniffPdf(bytes: Uint8Array): boolean {
  return (
    bytes.length >= 5 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  );
}

function sniffImage(bytes: Uint8Array): "jpg" | "png" | "webp" | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "png";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }
  return null;
}

export function validateUpload(options: {
  kind: UploadKind;
  mime: string;
  bytes: Uint8Array;
  originalName: string;
}): { ext: string; maxBytes: number } {
  if (options.kind === "pdf") {
    if (options.bytes.byteLength > MAX_PDF_BYTES) {
      throw new Error(`PDF je príliš veľký (max ${MAX_PDF_BYTES / (1024 * 1024)} MB).`);
    }
    if (options.mime !== "application/pdf" || !sniffPdf(options.bytes)) {
      throw new Error("Neplatný PDF súbor.");
    }
    if (!options.originalName.toLowerCase().endsWith(".pdf")) {
      throw new Error("PDF musí mať príponu .pdf.");
    }
    return { ext: "pdf", maxBytes: MAX_PDF_BYTES };
  }

  if (options.bytes.byteLength > MAX_IMAGE_BYTES) {
    throw new Error(`Obrázok je príliš veľký (max ${MAX_IMAGE_BYTES / (1024 * 1024)} MB).`);
  }
  const sniffed = sniffImage(options.bytes);
  const mapped = IMAGE_TYPES.get(options.mime);
  if (!sniffed || !mapped || sniffed !== mapped) {
    throw new Error("Neplatný obrázok (povolené: JPG, PNG, WEBP).");
  }
  return { ext: sniffed, maxBytes: MAX_IMAGE_BYTES };
}

export function buildUploadRepoPath(options: {
  folder:
    | "aktuality"
    | "stanovy"
    | "dokumenty-tlaciva"
    | "domovy-poriadok"
    | "kablova-tv"
    | "homepage";
  kind: UploadKind;
  baseName: string;
  ext: string;
}): string {
  const slug = options.baseName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  const stamp = Date.now().toString(36);
  const fileName = `${slug || "subor"}-${stamp}.${options.ext}`;

  if (options.kind === "image") {
    const prefix = UPLOAD_PREFIXES.find((p) =>
      p.includes("images/homepage"),
    )!;
    return joinUploadPath(prefix, fileName);
  }

  const prefix = UPLOAD_PREFIXES.find((p) =>
    p.includes(`documents/${options.folder}`),
  );
  if (!prefix) {
    throw new Error("Unknown upload folder");
  }
  return assertAllowedRepoPath(`${prefix}${fileName}`);
}
