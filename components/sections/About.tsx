"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { aboutSection } from "@/lib/content/home";
import { aboutSource } from "@/lib/content/osbd-source";
import { cn } from "@/lib/utils";

export function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id={aboutSource.id}
      className="section-pad scroll-mt-24 bg-warm-white"
      aria-labelledby="about-heading"
    >
      <div className="container-site">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-14">
          <Reveal className="order-1">
            <div className="media-frame aspect-[4/5] max-h-[28rem] border border-[var(--border-subtle)] lg:max-h-[32rem]">
              <div className="img-zoom relative h-full w-full">
                <Image
                  src="/images/about-osbd-hq.png"
                  alt={aboutSection.imageSlot.description}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-[center_18%] sm:object-[center_20%] lg:object-center"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="order-2 lg:border-l lg:border-forest/12 lg:pl-9" delayMs={60}>
            <h2
              id="about-heading"
              className="font-semibold tracking-[-0.022em] text-forest text-[clamp(2.15rem,3.4vw,2.85rem)] leading-[1.12]"
            >
              {aboutSource.eyebrow}
            </h2>
            <p className="mt-5 text-[1.15rem] font-semibold leading-snug tracking-tight text-ink sm:text-[1.25rem]">
              {aboutSource.leadTitle}
            </p>
            <div className="prose-measure prose-body mt-5 space-y-4 text-ink">
              {aboutSource.introParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div
              id="about-more"
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                expanded
                  ? "mt-4 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
              aria-hidden={!expanded}
            >
              <div className="overflow-hidden">
                <div className="prose-measure prose-body space-y-4 text-ink">
                  {aboutSource.bodyParagraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex min-h-10 items-center border-b border-forest/35 pb-0.5 text-[0.95rem] font-semibold text-forest transition-colors hover:border-forest hover:text-green"
              aria-expanded={expanded}
              aria-controls="about-more"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? "Zobraziť menej" : "Čítať viac"}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
