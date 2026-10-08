"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { mainAdvantagesSource } from "@/lib/content/osbd-source";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

/** Continuous rounded cord: each segment bows through the center corridor. */
function buildCordPath(points: Point[], centerX: number) {
  if (points.length < 2) return "";

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    // Soft cubic through center — feels like one rounded cord, not a spine+branches
    d += ` C ${centerX.toFixed(1)} ${a.y.toFixed(1)}, ${centerX.toFixed(1)} ${b.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }

  return d;
}

function buildMobileCordPath(points: Point[]) {
  if (points.length < 2) return "";
  const x = 10;
  let d = `M ${x} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const midY = (a.y + b.y) / 2;
    d += ` C ${x} ${midY.toFixed(1)}, ${x} ${midY.toFixed(1)}, ${x} ${b.y.toFixed(1)}`;
  }
  return d;
}

export function MainAdvantages() {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const syncMedia = () => setIsDesktop(media.matches);
    syncMedia();
    media.addEventListener("change", syncMedia);
    return () => media.removeEventListener("change", syncMedia);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const desktop = window.matchMedia("(min-width: 640px)").matches;
      const listRect = list.getBoundingClientRect();
      const next: Point[] = [];

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const side = index % 2 === 0 ? "left" : "right";
        const y = rect.top - listRect.top + rect.height / 2;
        const x = desktop
          ? side === "left"
            ? rect.right - listRect.left
            : rect.left - listRect.left
          : rect.left - listRect.left + 2;
        next.push({ x, y });
      });

      setPoints(next);
      setSize({ w: list.offsetWidth, h: list.offsetHeight });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    window.addEventListener("resize", measure);
    const t1 = window.setTimeout(measure, 450);
    const t2 = window.setTimeout(measure, 1000);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const centerX = size.w / 2;
  const path = isDesktop
    ? buildCordPath(points, centerX)
    : buildMobileCordPath(points);

  return (
    <section
      id={mainAdvantagesSource.id}
      className="relative isolate overflow-hidden scroll-mt-24 bg-warm-white pt-[clamp(3rem,5.5vw,4.25rem)] pb-[clamp(3.25rem,6vw,4.75rem)]"
      aria-labelledby="main-advantages-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(78%,42rem)] w-full sm:h-[min(74%,44rem)] lg:h-[min(72%,46rem)]"
        aria-hidden
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 720"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 720
               V95
               C 180 40, 340 -10, 520 55
               C 740 130, 900 10, 1100 70
               C 1260 115, 1360 160, 1440 130
               V720
               Z"
            fill="#eff3ef"
          />
        </svg>
      </div>

      <div className="relative z-10 container-site flex justify-center">
        <div className="w-full max-w-[60rem]">
          <Reveal>
            <h2
              id="main-advantages-heading"
              className="mx-auto max-w-[36rem] text-center font-semibold tracking-[-0.022em] text-balance text-forest text-[clamp(1.75rem,2.6vw,2.35rem)] leading-[1.18]"
            >
              {mainAdvantagesSource.headline}
            </h2>
          </Reveal>

          <div className="relative mt-7 sm:mt-8 lg:mt-8">
            {size.w > 0 && path ? (
              <svg
                className="pointer-events-none absolute inset-0 z-0"
                width={size.w}
                height={size.h}
                viewBox={`0 0 ${size.w} ${size.h}`}
                aria-hidden
              >
                <path
                  d={path}
                  fill="none"
                  stroke="rgba(47, 118, 91, 0.4)"
                  strokeWidth="1.85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}

            <ul ref={listRef} className="relative z-[1] flex flex-col gap-4 sm:gap-0">
              {mainAdvantagesSource.items.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <Reveal
                    key={item}
                    as="li"
                    delayMs={(index % 7) * 70}
                    className={cn(
                      "flex w-full",
                      isLeft ? "sm:justify-start" : "sm:justify-end",
                      // Compact cascade — small downward step only
                      index > 0 && "sm:mt-2 md:mt-2.5",
                    )}
                  >
                    <article
                      ref={(node) => {
                        itemRefs.current[index] = node;
                      }}
                      className="group advantage-row relative flex w-full gap-2.5 overflow-hidden rounded-[0.5rem] border border-forest/10 bg-white/90 px-3 py-2.5 shadow-[0_4px_16px_-12px_rgba(15,74,55,0.18)] transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-forest/28 hover:bg-white hover:shadow-[0_12px_30px_-14px_rgba(15,74,55,0.28),inset_0_0_0_1px_rgba(47,118,91,0.06)] sm:w-[calc(50%-1.35rem)] sm:gap-3 sm:px-3.5 sm:py-3"
                    >
                      <span
                        className="absolute inset-y-2 left-0 w-[3.5px] rounded-full bg-forest/45 transition-[background-color,box-shadow,width,opacity] duration-300 group-hover:w-[4px] group-hover:bg-green group-hover:shadow-[0_0_14px_rgba(47,118,91,0.55),0_0_4px_rgba(47,118,91,0.4)]"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_50%,rgba(47,118,91,0.07),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      />
                      <span className="relative mt-px w-6 shrink-0 pl-1.5 font-mono text-[0.72rem] font-semibold tracking-[0.1em] text-green/70 transition-colors duration-300 group-hover:text-forest">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="relative min-w-0 text-[0.86rem] leading-[1.45] text-ink/90 transition-colors duration-300 group-hover:text-ink sm:text-[0.88rem]">
                        {item}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
