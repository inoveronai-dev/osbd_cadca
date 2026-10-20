"use client";

import { MoreVertical } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
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

export type MenuItem = {
  label: string;
  onClick: () => void;
  danger?: boolean;
};

/** Fixed-position menu rendered in a portal so overflow/stacking never clips it. */
export function RowMenu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const updatePosition = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const menuWidth = 176;
    const estimatedHeight = items.length * 42 + 8;
    let left = rect.right - menuWidth;
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
    let top = rect.bottom + 4;
    if (top + estimatedHeight > window.innerHeight - 8) {
      top = Math.max(8, rect.top - estimatedHeight - 4);
    }
    setPos({ top, left });
  }, [items.length]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (buttonRef.current?.contains(t) || menuRef.current?.contains(t)) {
        return;
      }
      setOpen(false);
    };
    const onScroll = () => updatePosition();
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open, updatePosition]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Ďalšie akcie"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex size-10 items-center justify-center rounded-md text-ink-muted hover:bg-[#f3f1ea] hover:text-ink"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <MoreVertical className="size-4" />
      </button>
      {open && pos && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              className="fixed z-[100] min-w-[11rem] overflow-hidden rounded-md border border-forest/10 bg-white py-1 shadow-[0_12px_32px_rgba(7,35,26,0.16)]"
              style={{ top: pos.top, left: pos.left }}
            >
              {items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
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
            </div>,
            document.body,
          )
        : null}
    </>
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
  menuItems?: MenuItem[];
}) {
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
            <RowMenu items={menuItems} />
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
