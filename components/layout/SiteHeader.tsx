"use client";

import { useEffect, useState } from "react";
import { Clock, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LogoMark } from "@/components/layout/LogoMark";
import { PendingLink } from "@/components/ui/PendingLink";
import { officeHoursCta, primaryNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_var(--border)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-4">
        <LogoMark tone={scrolled ? "dark" : "light"} />

        <nav
          className="hidden min-w-0 items-center gap-0.5 xl:gap-1 lg:flex"
          aria-label="Hlavná navigácia"
        >
          {primaryNav.map((item) => (
            <PendingLink
              key={item.label}
              label={item.label}
              href={item.href}
              status={item.status}
              showBadge={false}
              className={cn(
                "rounded-md px-2.5 py-2 text-[0.92rem] font-medium transition-colors xl:px-3 xl:text-[0.95rem]",
                scrolled
                  ? "text-ink hover:bg-sage hover:text-forest"
                  : "text-white/92 hover:bg-white/10 hover:text-white",
              )}
              pendingClassName={cn(
                "rounded-md px-2.5 py-2 text-[0.92rem] font-medium xl:px-3 xl:text-[0.95rem]",
                scrolled ? "text-ink/60" : "text-white/60",
              )}
            />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={officeHoursCta.href}
            className={cn(
              "hidden h-11 items-center justify-center gap-2 rounded-md px-4 text-[0.95rem] font-semibold transition-colors sm:inline-flex",
              scrolled
                ? "bg-forest text-white hover:bg-[var(--forest-soft)]"
                : "border border-white/35 bg-white/12 text-white backdrop-blur-sm hover:bg-white/20",
            )}
          >
            <Clock className="size-4" aria-hidden />
            {officeHoursCta.label}
          </a>

          <button
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-md lg:hidden",
              scrolled
                ? "text-ink hover:bg-sage"
                : "text-white hover:bg-white/15",
            )}
            aria-label="Otvoriť menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-6" aria-hidden />
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent
              id="mobile-nav"
              side="right"
              className="w-[min(100%,22rem)] border-l border-border bg-paper p-0"
            >
              <SheetHeader className="border-b border-border px-5 py-5 text-left">
                <SheetTitle className="text-lg text-ink">
                  Navigácia
                </SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 p-3"
                aria-label="Mobilná navigácia"
              >
                {primaryNav.map((item) => (
                  <PendingLink
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    status={item.status}
                    onNavigate={() => setOpen(false)}
                    className="min-h-14 rounded-md px-4 py-3 text-lg font-medium text-ink hover:bg-sage"
                    pendingClassName="min-h-14 rounded-md px-4 py-3 text-lg font-medium text-ink/55"
                  />
                ))}
                <a
                  href={officeHoursCta.href}
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-forest px-4 text-lg font-semibold text-white hover:bg-[var(--forest-soft)]"
                >
                  <Clock className="size-5" aria-hidden />
                  {officeHoursCta.label}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
