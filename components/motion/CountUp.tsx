"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";

type CountUpProps = {
  value: number;
  suffix?: string;
  /** Slovak thousands separator for 3200 → "3 200" */
  format?: "plain" | "sk";
  className?: string;
  durationMs?: number;
};

function formatValue(value: number, format: "plain" | "sk") {
  if (format === "sk") {
    return new Intl.NumberFormat("sk-SK").format(Math.round(value));
  }
  return String(Math.round(value));
}

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function CountUp({
  value,
  suffix = "",
  format = "plain",
  className,
  durationMs = 1200,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (reducedMotion) {
          setDisplay(value);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(value * eased);
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs, reducedMotion]);

  return (
    <span ref={ref} className={cn("count-up tabular-nums", className)}>
      {formatValue(display, format)}
      {suffix}
    </span>
  );
}
