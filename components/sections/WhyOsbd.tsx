"use client";

import {
  Building2,
  FileBarChart2,
  Handshake,
  History,
  ShieldCheck,
  UserRoundCog,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { whyOsbd } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const benefitIcons: LucideIcon[] = [
  History,
  FileBarChart2,
  UserRoundCog,
  ShieldCheck,
  Building2,
  Handshake,
];

type Benefit = (typeof whyOsbd.benefits)[number];

function BenefitFlipCard({
  benefit,
  Icon,
  open,
  onToggle,
  reduceMotion,
}: {
  benefit: Benefit;
  Icon: LucideIcon;
  open: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  return (
    <div
      className={cn(
        "why-flip group relative h-[13.5rem] sm:h-[14.5rem]",
        !reduceMotion && "why-flip--3d",
      )}
      data-open={open ? "true" : "false"}
    >
      <button
        type="button"
        className="absolute inset-0 z-20 cursor-pointer rounded-[var(--radius)] focus-visible:outline-offset-4"
        aria-expanded={open}
        aria-label={
          open
            ? `Skryť popis: ${benefit.title}`
            : `Zobraziť popis: ${benefit.title}`
        }
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        }}
      />

      <div
        className={cn(
          "why-flip-inner relative h-full w-full",
          open && "is-flipped",
        )}
      >
        {/* Front */}
        <div
          className={cn(
            "why-flip-face why-flip-front absolute inset-0 flex flex-col items-start justify-center rounded-[var(--radius)] border border-forest/12 bg-[#fcfcf9] px-6 py-7 shadow-[0_1px_0_rgba(15,74,55,0.03)] transition-[box-shadow,transform] duration-300 sm:px-7 sm:py-8",
            open && "pointer-events-none",
            !reduceMotion &&
              "group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_30px_rgba(20,60,45,0.08)]",
          )}
        >
          <Icon
            className="size-11 text-forest/65 transition-colors duration-300 group-hover:text-forest sm:size-12"
            strokeWidth={1.5}
            aria-hidden
          />
          <h3 className="mt-5 max-w-[14rem] text-[1.2rem] font-semibold tracking-tight text-ink sm:text-[1.3rem]">
            {benefit.title}
          </h3>
        </div>

        {/* Back */}
        <div
          className={cn(
            "why-flip-face why-flip-back absolute inset-0 flex flex-col justify-center rounded-[var(--radius)] border border-forest/18 bg-[#fcfcf9] px-6 py-7 sm:px-7 sm:py-8",
            !open && "pointer-events-none",
          )}
          aria-hidden={!open}
        >
          <Icon
            className="mb-3 size-5 text-forest/50"
            strokeWidth={1.5}
            aria-hidden
          />
          <span
            className="mb-3 h-px w-8 bg-forest/35"
            aria-hidden
          />
          <h3 className="text-[1.05rem] font-semibold tracking-tight text-forest sm:text-[1.12rem]">
            {benefit.title}
          </h3>
          <p className="mt-2.5 text-[0.95rem] leading-[1.7] text-ink-muted sm:text-[0.98rem]">
            {benefit.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function WhyOsbd() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setReduceMotion(motion.matches);
      setCanHover(hover.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    hover.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      hover.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section
      className="relative bg-[#eff3ef] pt-[clamp(3.5rem,6vw,5rem)] pb-10 md:pb-12"
      aria-labelledby="why-osbd-heading"
    >
      <div className="relative container-site">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <h2 id="why-osbd-heading" className="section-heading text-forest">
            {whyOsbd.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-[40rem] text-[0.98rem] leading-[1.7] text-ink-muted sm:text-[1.02rem]">
            {whyOsbd.intro}
          </p>
        </Reveal>

        <ul className="mx-auto mt-10 grid max-w-[64rem] gap-5 sm:mt-11 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-7">
          {whyOsbd.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index];
            const open = openIndex === index;

            return (
              <Reveal key={benefit.number} as="li" delayMs={index * 70}>
                <div
                  onMouseEnter={() => {
                    if (canHover) setOpenIndex(index);
                  }}
                  onMouseLeave={() => {
                    if (canHover) setOpenIndex(null);
                  }}
                >
                  <BenefitFlipCard
                    benefit={benefit}
                    Icon={Icon}
                    open={open}
                    reduceMotion={reduceMotion}
                    onToggle={() => {
                      setOpenIndex((current) =>
                        current === index ? null : index,
                      );
                    }}
                  />
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
