"use client";

import { cn } from "@/lib/utils";

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[0.84rem] font-medium text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-forest/15 bg-white px-3 py-2 text-[0.95rem] outline-none focus:border-forest/40";

export const textareaClass = `${inputClass} min-h-[6rem]`;
