"use client";

import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[0.72rem] font-semibold tracking-wide uppercase",
        active
          ? "bg-forest/10 text-forest"
          : "bg-[#eceae4] text-ink-muted",
      )}
    >
      {active ? "Aktívna" : "Skrytá"}
    </span>
  );
}

export function KindBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded border border-forest/12 bg-white px-2 py-0.5 text-[0.72rem] font-medium text-ink-muted">
      {label}
    </span>
  );
}

export function ListRow({
  title,
  meta,
  onEdit,
  menuItems,
}: {
  title: string;
  meta: React.ReactNode;
  onEdit: () => void;
  menuItems?: { label: string; onClick: () => void; danger?: boolean }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <li className="rounded-lg border border-forest/10 bg-white transition-colors hover:border-forest/20">
      <div className="flex items-stretch gap-1">
        <button
          type="button"
          onClick={onEdit}
          className="min-w-0 flex-1 px-4 py-3.5 text-left sm:px-5"
        >
          <p className="text-[1.02rem] font-semibold leading-snug tracking-tight text-ink">
            {title}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {meta}
          </div>
        </button>
        <div className="flex items-center gap-1 pr-2 sm:pr-3">
          {menuItems && menuItems.length > 0 ? (
            <div className="relative" ref={ref}>
              <button
                type="button"
                aria-label="Ďalšie akcie"
                className="inline-flex size-10 items-center justify-center rounded-md text-ink-muted hover:bg-[#f3f1ea] hover:text-ink"
                onClick={() => setOpen((v) => !v)}
              >
                <MoreVertical className="size-4" />
              </button>
              {open ? (
                <div className="absolute top-full right-0 z-20 mt-1 min-w-[11rem] overflow-hidden rounded-md border border-forest/10 bg-white py-1 shadow-[0_8px_24px_rgba(7,35,26,0.1)]">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className={cn(
                        "block w-full px-3.5 py-2.5 text-left text-[0.9rem]",
                        item.danger
                          ? "text-red-700 hover:bg-red-50"
                          : "text-ink hover:bg-[#f3f1ea]",
                      )}
                      onClick={() => {
                        setOpen(false);
                        item.onClick();
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          <button
            type="button"
            onClick={onEdit}
            className="hidden min-h-10 items-center rounded-md px-3 text-[0.9rem] font-semibold text-forest hover:bg-soft-sage sm:inline-flex"
          >
            Upraviť
          </button>
        </div>
      </div>
    </li>
  );
}
