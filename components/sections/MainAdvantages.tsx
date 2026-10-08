"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { mainAdvantagesSource } from "@/lib/content/osbd-source";

type Point = { x: number; y: number };

function buildConnectorPath(points: Point[]) {
  if (points.length < 2) return "";

  let d = `M ${points[0].x} ${points[0].y}`;
  const radius = 10;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;

    // Same column (mostly vertical) or same row (mostly horizontal)
    if (Math.abs(dx) < 8 || Math.abs(dy) < 8) {
      d += ` L ${curr.x} ${curr.y}`;
      continue;
    }

    // Soft L-turn: horizontal then vertical, or vertical then horizontal
    const goingDownRight = dx > 0 && dy > 0;
    const goingDownLeft = dx < 0 && dy > 0;

    if (goingDownRight || goingDownLeft) {
      const midY = prev.y + dy * 0.5;
      const r = Math.min(radius, Math.abs(dx) / 2, Math.abs(dy) / 2);
      const dir = goingDownLeft ? -1 : 1;

      d += ` L ${prev.x} ${midY - r}`;
      d += ` Q ${prev.x} ${midY} ${prev.x + dir * r} ${midY}`;
      d += ` L ${curr.x - dir * r} ${midY}`;
      d += ` Q ${curr.x} ${midY} ${curr.x} ${midY + r}`;
      d += ` L ${curr.x} ${curr.y}`;
    } else {
      d += ` L ${curr.x} ${curr.y}`;
    }
  }

  return d;
}

export function MainAdvantages() {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const listRect = list.getBoundingClientRect();
      const next: Point[] = [];

      itemRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        next.push({
          x: rect.left - listRect.left + 2,
          y: rect.top - listRect.top + rect.height / 2,
        });
      });

      setPoints(next);
      setSize({ w: list.offsetWidth, h: list.offsetHeight });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    window.addEventListener("resize", measure);
    // Re-measure after reveals settle
    const t1 = window.setTimeout(measure, 400);
    const t2 = window.setTimeout(measure, 900);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const path = buildConnectorPath(points);

  return (
    <section
      id={mainAdvantagesSource.id}
      className="relative isolate overflow-hidden scroll-mt-24 bg-warm-white pt-[clamp(3.25rem,6vw,4.75rem)] pb-[clamp(3.5rem,7vw,5.25rem)]"
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
        <div className="w-full max-w-[54rem]">
          <Reveal>
            <h2
              id="main-advantages-heading"
              className="mx-auto max-w-[36rem] text-center font-semibold tracking-[-0.022em] text-balance text-forest text-[clamp(1.75rem,2.6vw,2.35rem)] leading-[1.18]"
            >
              {mainAdvantagesSource.headline}
            </h2>
          </Reveal>

          <div className="relative mt-8 sm:mt-9 lg:mt-10">
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
                  stroke="rgba(47, 118, 91, 0.38)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {points.map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="2.25"
                    fill="rgba(47, 118, 91, 0.45)"
                  />
                ))}
              </svg>
            ) : null}

            <ul
              ref={listRef}
              className="relative z-[1] grid gap-4 sm:grid-cols-2 sm:gap-5"
            >
              {mainAdvantagesSource.items.map((item, index) => (
                <Reveal key={item} as="li" delayMs={(index % 7) * 70}>
                  <article
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    className="group advantage-row relative flex h-full gap-3 overflow-hidden rounded-[0.5rem] border border-forest/10 bg-white/90 px-3.5 py-3 shadow-[0_4px_16px_-12px_rgba(15,74,55,0.18)] transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-forest/28 hover:bg-white hover:shadow-[0_12px_30px_-14px_rgba(15,74,55,0.28),inset_0_0_0_1px_rgba(47,118,91,0.06)] sm:gap-3.5 sm:px-4 sm:py-3.5"
                  >
                    <span
                      className="absolute inset-y-2.5 left-0 w-[3.5px] rounded-full bg-forest/45 transition-[background-color,box-shadow,width,opacity] duration-300 group-hover:w-[4px] group-hover:bg-green group-hover:shadow-[0_0_14px_rgba(47,118,91,0.55),0_0_4px_rgba(47,118,91,0.4)]"
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_50%,rgba(47,118,91,0.07),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                    <span className="relative mt-px w-6 shrink-0 pl-1.5 font-mono text-[0.72rem] font-semibold tracking-[0.1em] text-green/70 transition-colors duration-300 group-hover:text-forest">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="relative min-w-0 text-[0.88rem] leading-[1.55] text-ink/90 transition-colors duration-300 group-hover:text-ink sm:text-[0.9rem]">
                      {item}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
