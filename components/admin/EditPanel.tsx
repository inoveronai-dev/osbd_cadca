"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { btnPrimary, btnSecondary } from "@/components/admin/admin-ui";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  secondaryLabel?: string;
  footerExtra?: React.ReactNode;
  error?: string | null;
  message?: string | null;
};

/**
 * Full-screen overlay edit panel — calm, focused, mobile-friendly.
 */
export function EditPanel({
  open,
  title,
  onClose,
  children,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  secondaryLabel = "Zrušiť",
  footerExtra,
  error,
  message,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Zavrieť"
        className="absolute inset-0 bg-ink/35"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-edit-title"
        className="relative z-[81] flex max-h-[92vh] w-full max-w-xl flex-col rounded-t-2xl bg-white shadow-[0_-8px_40px_rgba(7,35,26,0.12)] sm:rounded-2xl sm:shadow-[0_16px_48px_rgba(7,35,26,0.14)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-forest/8 px-5 py-4 sm:px-6">
          <h2
            id="admin-edit-title"
            className="text-[1.15rem] font-semibold tracking-tight text-ink"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-md text-ink-muted hover:bg-[#f3f1ea] hover:text-ink"
            aria-label="Zavrieť"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {children}
        </div>

        <div className="border-t border-forest/8 px-5 py-4 sm:px-6">
          {(error || message) && (
            <div className="mb-3 min-h-[1.25rem]">
              {error ? (
                <p className="text-[0.9rem] font-medium text-red-700">{error}</p>
              ) : null}
              {message ? (
                <p className="text-[0.9rem] font-medium text-forest">
                  ✓ {message}
                </p>
              ) : null}
            </div>
          )}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>{footerExtra}</div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" className={btnSecondary} onClick={onClose}>
                {secondaryLabel}
              </button>
              <button
                type="button"
                className={btnPrimary}
                disabled={primaryDisabled}
                onClick={onPrimary}
              >
                {primaryLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
