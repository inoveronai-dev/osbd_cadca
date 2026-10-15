"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LogoMark } from "@/components/layout/LogoMark";
import {
  DesktopHeaderNav,
  MobileHeaderNav,
} from "@/components/layout/HeaderNav";
import { emergencyCta } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!onHome);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!onHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_var(--border)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-site flex min-h-[var(--header-h)] items-center justify-between gap-4 py-2.5 md:gap-5 md:py-3">
        <LogoMark variant="official" priority={onHome} />

        <DesktopHeaderNav scrolled={scrolled} />

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={emergencyCta.href}
            className={cn(
              "hidden h-11 items-center gap-2.5 rounded-md px-3.5 transition-colors sm:inline-flex",
              scrolled
                ? "bg-forest text-white hover:bg-[var(--forest-soft)]"
                : "border border-white/35 bg-white/12 text-white backdrop-blur-sm hover:bg-white/20",
            )}
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span className="flex flex-col leading-tight">
              <span className="text-[0.72rem] font-semibold tracking-wide uppercase opacity-85">
                {emergencyCta.label}
              </span>
              <span className="text-[0.95rem] font-semibold tabular-nums">
                {emergencyCta.phoneDisplay}
              </span>
            </span>
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
              <MobileHeaderNav onNavigate={() => setOpen(false)} />
              <div className="border-t border-border p-3">
                <a
                  href={emergencyCta.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-md bg-forest px-4 text-white hover:bg-[var(--forest-soft)]"
                >
                  <Phone className="size-5 shrink-0" aria-hidden />
                  <span className="flex flex-col leading-tight">
                    <span className="text-[0.75rem] font-semibold tracking-wide uppercase opacity-85">
                      {emergencyCta.label}
                    </span>
                    <span className="text-lg font-semibold tabular-nums">
                      {emergencyCta.phoneDisplay}
                    </span>
                  </span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
