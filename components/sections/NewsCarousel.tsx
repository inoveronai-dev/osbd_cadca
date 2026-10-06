"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Notice } from "@/lib/content/notices";
import { cn } from "@/lib/utils";

type NewsCarouselProps = {
  items: readonly Notice[];
  variant?: "light" | "dark";
};

export function NewsCarousel({ items, variant = "light" }: NewsCarouselProps) {
  const dark = variant === "dark";
  const viewportRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const drag = useRef<{
    active: boolean;
    moved: boolean;
    startX: number;
    scrollLeft: number;
    pointerId: number | null;
  }>({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: null,
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || reducedMotion || paused) return;

    let frame = 0;
    let last = performance.now();
    const loopSeconds = window.matchMedia("(max-width: 640px)").matches
      ? 70
      : 55;

    const tick = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      const half = el.scrollWidth / 2;
      if (half > 0) {
        const pxPerMs = half / (loopSeconds * 1000);
        el.scrollLeft += pxPerMs * dt;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, reducedMotion, items]);

  const pause = () => setPaused(true);
  const resume = () => {
    if (!drag.current.active) setPaused(false);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: el.scrollLeft,
      pointerId: event.pointerId,
    };
    pause();
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 6) {
      drag.current.moved = true;
      el.scrollLeft = drag.current.scrollLeft - delta;
    }
  };

  const endDrag = () => {
    const el = viewportRef.current;
    if (el && drag.current.pointerId !== null) {
      try {
        el.releasePointerCapture(drag.current.pointerId);
      } catch {
        /* already released */
      }
    }
    drag.current.active = false;
    drag.current.pointerId = null;
    resume();
  };

  const loopItems = reducedMotion ? [...items] : [...items, ...items];

  return (
    <div
      className="news-carousel relative"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          resume();
        }
      }}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-14 md:w-16",
          dark
            ? "bg-gradient-to-r from-forest to-transparent"
            : "bg-gradient-to-r from-white to-transparent",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-14 md:w-16",
          dark
            ? "bg-gradient-to-l from-forest to-transparent"
            : "bg-gradient-to-l from-white to-transparent",
        )}
      />

      <div
        ref={viewportRef}
        className={cn(
          "overflow-x-auto overscroll-x-contain px-4 pb-1 sm:px-6 md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          !reducedMotion && "cursor-grab active:cursor-grabbing",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <ul className="flex w-max gap-4 sm:gap-5">
          {loopItems.map((item, index) => {
            const duplicate = !reducedMotion && index >= items.length;
            return (
              <li
                key={`${item.id}-${index}`}
                className="w-[min(86vw,400px)] shrink-0 sm:w-[360px] md:w-[380px] lg:w-[400px]"
                aria-hidden={duplicate || undefined}
              >
                <a
                  href={item.href}
                  tabIndex={duplicate ? -1 : undefined}
                  draggable={false}
                  onClick={(event) => {
                    if (drag.current.moved) {
                      event.preventDefault();
                      drag.current.moved = false;
                    }
                  }}
                  className={cn(
                    "group/card flex h-full min-h-[11.75rem] flex-col rounded-[var(--radius)] border px-5 py-5 transition-[transform,border-color,background-color,box-shadow] duration-200 hover:-translate-y-[2px] focus-visible:outline-offset-4 sm:min-h-[12.75rem] sm:px-6 sm:py-6",
                    dark
                      ? "border-forest/25 bg-ivory hover:border-green/40 hover:bg-warm-white hover:shadow-[0_12px_28px_-20px_rgba(0,0,0,0.35)] focus-visible:border-sage"
                      : "border-[var(--border-strong)] bg-paper hover:border-green/35 hover:bg-white hover:shadow-[0_12px_28px_-20px_rgba(24,77,58,0.35)] focus-visible:border-green",
                  )}
                >
                  <span className="text-[0.7rem] font-semibold tracking-[0.12em] text-green uppercase">
                    Aktuality
                  </span>
                  <h3 className="mt-4 text-[1.05rem] leading-snug font-semibold tracking-tight text-balance text-ink sm:text-[1.15rem]">
                    {item.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-forest">
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover/card:translate-x-[5px] group-focus-visible/card:translate-x-[5px]"
                      aria-hidden
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
