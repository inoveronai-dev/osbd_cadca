"use client";

import { useEffect, useRef, useState } from "react";

type LazyMapEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

/**
 * Defers iframe mount until near viewport so Maps does not block first paint.
 */
export function LazyMapEmbed({ src, title, className }: LazyMapEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || active) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div ref={ref} className={className}>
      {active ? (
        <iframe
          title={title}
          src={src}
          className="block h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div
          className="h-full w-full bg-[color-mix(in_srgb,var(--soft-sage)_55%,white)]"
          aria-hidden
        />
      )}
    </div>
  );
}
