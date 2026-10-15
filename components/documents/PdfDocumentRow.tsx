import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PdfDocument } from "@/lib/content/documents";

type PdfDocumentRowProps = {
  document: PdfDocument;
  /** CTA label on the right */
  actionLabel?: "Zobraziť PDF" | "Otvoriť PDF";
  /** Larger padding / emphasis for single featured docs */
  prominent?: boolean;
  className?: string;
};

export function PdfDocumentRow({
  document,
  actionLabel = "Otvoriť PDF",
  prominent = false,
  className,
}: PdfDocumentRowProps) {
  return (
    <a
      href={document.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-start gap-3 rounded-[0.3rem] border border-forest/10 bg-warm-white transition-[border-color,background-color,box-shadow] duration-200 hover:border-forest/28 hover:bg-white hover:shadow-[0_8px_22px_-18px_rgba(10,56,44,0.4)] sm:items-center sm:gap-4",
        prominent
          ? "px-4 py-4 sm:px-5 sm:py-5"
          : "px-3.5 py-3 sm:px-4 sm:py-3.5",
        className,
      )}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex shrink-0 items-center justify-center rounded-[0.25rem] border border-forest/12 bg-forest/[0.05] text-forest sm:mt-0",
          prominent ? "size-11" : "size-9",
        )}
        aria-hidden
      >
        <FileText className={prominent ? "size-5" : "size-4"} />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block font-semibold tracking-tight text-ink transition-colors group-hover:text-forest",
            prominent
              ? "text-[1.05rem] leading-snug sm:text-[1.12rem]"
              : "text-[0.95rem] leading-snug sm:text-[1rem]",
          )}
        >
          {document.title}
        </span>
        {document.meta ? (
          <span className="mt-1 block text-[0.82rem] text-ink-muted sm:text-[0.86rem]">
            {document.meta}
          </span>
        ) : null}
      </span>

      <span
        className={cn(
          "shrink-0 self-center text-[0.82rem] font-semibold text-forest/80 transition-colors group-hover:text-forest sm:text-[0.88rem]",
          "max-sm:sr-only",
        )}
      >
        {actionLabel}
      </span>
    </a>
  );
}
