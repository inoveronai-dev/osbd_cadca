"use client";

import { btnPrimary } from "@/components/admin/admin-ui";

export function SaveBar({
  saving,
  message,
  hint,
  error,
  onSave,
  label = "Uložiť",
}: {
  saving: boolean;
  message?: string | null;
  hint?: string | null;
  error?: string | null;
  onSave: () => void;
  label?: string;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-8 border-t border-forest/10 bg-[#f3f1ea]/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-[2.5rem]">
          {error ? (
            <p className="text-[0.92rem] font-medium text-red-700">{error}</p>
          ) : null}
          {message ? (
            <p className="text-[0.92rem] font-medium text-forest">
              ✓ {message}
            </p>
          ) : null}
          {hint && !message ? (
            <p className="text-[0.84rem] text-ink-muted">{hint}</p>
          ) : null}
          {hint && message ? (
            <p className="text-[0.84rem] text-ink-muted">{hint}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className={btnPrimary}
        >
          {saving ? "Ukladá sa…" : label}
        </button>
      </div>
    </div>
  );
}
