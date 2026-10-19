/** Shared admin UI helpers — presentation only; no CMS logic. */

export function formatDateSk(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-");
  return `${Number(d)}. ${Number(m)}. ${y}`;
}

export function fileNameFromHref(href: string): string {
  try {
    const path = href.startsWith("http")
      ? new URL(href).pathname
      : href.split("?")[0];
    const name = decodeURIComponent(path.split("/").pop() || "");
    return name || "Dokument PDF";
  } catch {
    return "Dokument PDF";
  }
}

export function isLocalUpload(href: string): boolean {
  return href.startsWith("/uploads/") || href.startsWith("/public/uploads/");
}

export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-forest px-5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[var(--forest-soft)] disabled:opacity-60";

export const btnSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-forest/15 bg-white px-5 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-[#f7f6f2] disabled:opacity-60";

export const btnGhost =
  "inline-flex min-h-10 items-center justify-center rounded-md px-3 text-[0.9rem] font-semibold text-forest/80 transition-colors hover:bg-soft-sage hover:text-forest";

export const btnDanger =
  "inline-flex min-h-10 items-center justify-center rounded-md px-3 text-[0.88rem] font-medium text-red-700/80 transition-colors hover:bg-red-50 hover:text-red-800";

export const cardClass =
  "rounded-lg border border-forest/10 bg-white";

export const helperClass = "mt-1.5 text-[0.84rem] leading-relaxed text-ink-muted";
