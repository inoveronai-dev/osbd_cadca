"use client";

import { cn } from "@/lib/utils";
import { helperClass } from "@/components/admin/admin-ui";

export function Field({
  label,
  children,
  className,
  helper,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  helper?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[0.9rem] font-medium text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
      {helper ? <p className={helperClass}>{helper}</p> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-forest/15 bg-white px-3.5 py-2.5 text-[0.98rem] outline-none focus:border-forest/40";

export const textareaClass = `${inputClass} min-h-[8.5rem] leading-relaxed`;
