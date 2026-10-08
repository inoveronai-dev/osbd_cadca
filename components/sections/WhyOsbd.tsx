import {
  Building2,
  FileBarChart2,
  Handshake,
  History,
  ShieldCheck,
  UserRoundCog,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { whyOsbd } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const benefitIcons = [
  History,
  FileBarChart2,
  UserRoundCog,
  ShieldCheck,
  Building2,
  Handshake,
] as const;

const cardTones = [
  "bg-ivory border-[color-mix(in_srgb,var(--forest)_12%,transparent)]",
  "bg-soft-sage border-forest/12",
  "bg-warm-white border-[color-mix(in_srgb,var(--ink)_10%,transparent)]",
  "bg-soft-sage border-forest/12",
  "bg-ivory border-[color-mix(in_srgb,var(--forest)_12%,transparent)]",
  "bg-warm-white border-[color-mix(in_srgb,var(--ink)_10%,transparent)]",
] as const;

export function WhyOsbd() {
  return (
    <section
      className="relative section-pad bg-[color-mix(in_srgb,var(--ivory)_72%,var(--sage))]"
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

            return (
              <Reveal key={benefit.number} as="li" delayMs={index * 85}>
                <article
                  className={cn(
                    "group card-lift flex h-full flex-col rounded-[var(--radius)] border px-6 py-7 transition-[border-color,box-shadow,background-color] duration-200 hover:border-forest/30 hover:shadow-[0_10px_28px_-22px_rgba(10,56,44,0.3)] sm:px-7 sm:py-8",
                    cardTones[index],
                  )}
                >
                  <Icon
                    className="size-10 text-forest/70 transition-colors duration-200 group-hover:text-forest sm:size-11"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="mt-5 text-[1.2rem] font-semibold tracking-tight text-ink sm:text-[1.3rem]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-[1.7] text-ink-muted transition-colors duration-200 group-hover:text-ink/80 sm:text-[0.98rem]">
                    {benefit.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
