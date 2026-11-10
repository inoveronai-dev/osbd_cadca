import "server-only";

import { existsSync } from "fs";
import path from "path";
import { PDF_OFFICE_MESSAGE } from "@/lib/content/pdf-copy";

export { PDF_OFFICE_MESSAGE };

/**
 * Map a CMS PDF href to a path under /public, if it is a site upload.
 * Absolute osbdcadca.sk /wp-content/uploads and /uploads links are supported.
 */
export function publicPathForPdfHref(href: string): string | null {
  if (!href?.trim()) return null;
  try {
    const pathname = href.startsWith("http")
      ? new URL(href).pathname
      : href.split("?")[0] ?? href;
    if (
      !pathname.startsWith("/wp-content/uploads/") &&
      !pathname.startsWith("/uploads/")
    ) {
      return null;
    }
    return decodeURIComponent(pathname);
  } catch {
    return null;
  }
}

export function isPdfAvailable(href: string): boolean {
  const publicPath = publicPathForPdfHref(href);
  if (!publicPath) {
    // External / unknown host — leave the link as-is.
    return true;
  }
  const filePath = path.join(process.cwd(), "public", publicPath);
  return existsSync(filePath);
}

/** Prefer same-origin static path when the file is present under /public. */
export function resolvePdfHref(href: string): string {
  const publicPath = publicPathForPdfHref(href);
  if (publicPath && isPdfAvailable(href)) return publicPath;
  return href;
}

export function withPdfAvailability<T extends { href: string }>(
  doc: T,
): T & { available: boolean; href: string } {
  const available = isPdfAvailable(doc.href);
  return {
    ...doc,
    available,
    href: available ? resolvePdfHref(doc.href) : doc.href,
  };
}
