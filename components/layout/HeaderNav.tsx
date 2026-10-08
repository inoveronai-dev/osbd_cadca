"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { primaryNav, type NavItem, type PrimaryNavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type HeaderNavProps = {
  scrolled: boolean;
};

function canNavigate(item: NavItem) {
  return Boolean(item.href) && item.status !== "pending";
}

function NavChildList({
  items,
  onSelect,
}: {
  items: NavItem[];
  onSelect?: () => void;
}) {
  return (
    <ul className="py-1.5">
      {items.map((child) => {
        const active = canNavigate(child);
        return (
          <li key={child.label}>
            {active ? (
              <a
                href={child.href!}
                onClick={onSelect}
                className="block px-3.5 py-2 text-[0.9rem] text-ink transition-colors hover:bg-sage hover:text-forest"
              >
                {child.label}
              </a>
            ) : (
              <span
                className="block cursor-default px-3.5 py-2 text-[0.9rem] text-ink/70"
                aria-disabled="true"
              >
                {child.label}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function DesktopDropdown({
  item,
  scrolled,
}: {
  item: PrimaryNavItem;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const children = item.children ?? [];
  const triggerNavigates = canNavigate(item);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerClass = cn(
    "inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.92rem] font-medium transition-colors xl:px-3 xl:text-[0.95rem]",
    scrolled
      ? "text-ink hover:bg-sage hover:text-forest"
      : "text-white/92 hover:bg-white/10 hover:text-white",
    open && (scrolled ? "bg-sage text-forest" : "bg-white/10 text-white"),
  );

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {triggerNavigates ? (
        <a
          href={item.href!}
          className={triggerClass}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          onFocus={() => setOpen(true)}
        >
          {item.label}
          <ChevronDown
            className={cn("size-3.5 opacity-80 transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </a>
      ) : (
        <button
          type="button"
          className={triggerClass}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {item.label}
          <ChevronDown
            className={cn("size-3.5 opacity-80 transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </button>
      )}

      <div
        id={menuId}
        hidden={!open}
        className={cn(
          "absolute top-full left-0 z-50 min-w-[13.5rem] pt-1.5",
          !open && "pointer-events-none",
        )}
      >
        <div className="overflow-hidden rounded-md border border-forest/10 bg-warm-white shadow-[0_10px_28px_rgba(7,35,26,0.12)]">
          <NavChildList items={children} onSelect={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}

function DesktopLink({
  item,
  scrolled,
}: {
  item: PrimaryNavItem;
  scrolled: boolean;
}) {
  if (!canNavigate(item)) {
    return (
      <span
        className={cn(
          "rounded-md px-2.5 py-2 text-[0.92rem] font-medium xl:px-3 xl:text-[0.95rem]",
          scrolled ? "text-ink/60" : "text-white/60",
        )}
        aria-disabled="true"
      >
        {item.label}
      </span>
    );
  }

  return (
    <a
      href={item.href!}
      className={cn(
        "rounded-md px-2.5 py-2 text-[0.92rem] font-medium transition-colors xl:px-3 xl:text-[0.95rem]",
        scrolled
          ? "text-ink hover:bg-sage hover:text-forest"
          : "text-white/92 hover:bg-white/10 hover:text-white",
      )}
    >
      {item.label}
    </a>
  );
}

export function DesktopHeaderNav({ scrolled }: HeaderNavProps) {
  return (
    <nav
      className="hidden min-w-0 items-center gap-0.5 xl:gap-1 lg:flex"
      aria-label="Hlavná navigácia"
    >
      {primaryNav.map((item) =>
        item.children?.length ? (
          <DesktopDropdown key={item.label} item={item} scrolled={scrolled} />
        ) : (
          <DesktopLink key={item.label} item={item} scrolled={scrolled} />
        ),
      )}
    </nav>
  );
}

export function MobileHeaderNav({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Mobilná navigácia">
      {primaryNav.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isOpen = expanded === item.label;

        if (!hasChildren) {
          if (!canNavigate(item)) {
            return (
              <span
                key={item.label}
                className="min-h-14 rounded-md px-4 py-3 text-lg font-medium text-ink/55"
                aria-disabled="true"
              >
                {item.label}
              </span>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href!}
              onClick={onNavigate}
              className="min-h-14 rounded-md px-4 py-3 text-lg font-medium text-ink hover:bg-sage"
            >
              {item.label}
            </a>
          );
        }

        return (
          <div key={item.label} className="rounded-md">
            <div className="flex min-h-14 items-stretch">
              {canNavigate(item) ? (
                <a
                  href={item.href!}
                  onClick={onNavigate}
                  className="flex flex-1 items-center rounded-md px-4 py-3 text-lg font-medium text-ink hover:bg-sage"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  className="flex flex-1 items-center rounded-md px-4 py-3 text-left text-lg font-medium text-ink hover:bg-sage"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setExpanded((current) =>
                      current === item.label ? null : item.label,
                    )
                  }
                >
                  {item.label}
                </button>
              )}
              <button
                type="button"
                className="inline-flex w-12 items-center justify-center rounded-md text-ink hover:bg-sage"
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Zbaliť" : "Rozbaliť"} ${item.label}`}
                onClick={() =>
                  setExpanded((current) =>
                    current === item.label ? null : item.label,
                  )
                }
              >
                <ChevronDown
                  className={cn(
                    "size-5 transition-transform",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </div>

            {isOpen ? (
              <ul className="mb-1 ml-2 border-l border-forest/10 py-1 pl-2">
                {item.children!.map((child) => {
                  const active = canNavigate(child);
                  return (
                    <li key={child.label}>
                      {active ? (
                        <a
                          href={child.href!}
                          onClick={onNavigate}
                          className="block rounded-md px-3 py-2.5 text-[1.02rem] text-ink hover:bg-sage hover:text-forest"
                        >
                          {child.label}
                        </a>
                      ) : (
                        <span
                          className="block rounded-md px-3 py-2.5 text-[1.02rem] text-ink/60"
                          aria-disabled="true"
                        >
                          {child.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
