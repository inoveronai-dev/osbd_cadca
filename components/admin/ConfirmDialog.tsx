"use client";

import { useEffect } from "react";
import { btnDanger, btnSecondary } from "@/components/admin/admin-ui";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Vymazať",
  cancelLabel = "Zrušiť",
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-5">
      <button
        type="button"
        aria-label="Zavrieť"
        className="absolute inset-0 bg-ink/35"
        onClick={onCancel}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="relative z-[91] w-full max-w-md rounded-xl bg-white p-5 shadow-[0_16px_48px_rgba(7,35,26,0.16)] sm:p-6"
      >
        <h2
          id="confirm-title"
          className="text-[1.1rem] font-semibold tracking-tight text-ink"
        >
          {title}
        </h2>
        <p
          id="confirm-message"
          className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted"
        >
          {message}
        </p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" className={btnSecondary} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`${btnDanger} min-h-11 rounded-md bg-red-700 px-5 font-semibold text-white hover:bg-red-800`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
