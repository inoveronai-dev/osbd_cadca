import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { hero } from "@/lib/content/home";

export function Hero() {
  return (
    <section
      className="hero-section relative isolate min-h-[100svh] overflow-x-clip bg-forest text-white md:min-h-[max(700px,min(88vh,920px))]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cadca-kysuce.png"
          alt={hero.imageSlot.description}
          fill
          priority
          sizes="100vw"
          className="hero-bg-image object-cover object-[40%_42%] sm:object-[55%_center]"
        />

        {/* Desktop: left-weighted forest overlay — right side stays photographically open */}
        <div
          className="absolute inset-0 max-md:hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,55,42,0.93) 0%, rgba(15,55,42,0.86) 16%, rgba(15,55,42,0.70) 32%, rgba(15,55,42,0.38) 48%, rgba(15,55,42,0.16) 58%, rgba(15,55,42,0.05) 72%, rgba(15,55,42,0) 100%)",
          }}
          aria-hidden
        />
        {/* Mobile: denser wash behind copy, still lets hills read through */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,55,42,0.72) 0%, rgba(15,55,42,0.68) 45%, rgba(15,55,42,0.86) 100%)",
          }}
          aria-hidden
        />
        {/* Soft bottom support for the trust strip only */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 md:h-40"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(12,45,34,0.28) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative container-site flex min-h-[100svh] flex-col pb-5 pt-[calc(var(--header-h)+1.25rem)] md:min-h-[max(700px,min(88vh,920px))] md:pb-8 md:pt-[calc(var(--header-h)+2rem)]">
        <div className="flex flex-1 flex-col justify-center md:justify-center">
          <div className="w-full max-w-[40.5rem] md:max-w-[41rem]">
            <Reveal>
              <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-white/80 uppercase sm:text-[0.8rem]">
                {hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delayMs={70}>
              <h1
                id="hero-heading"
                className="mt-3.5 text-[clamp(2.8rem,12.5vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance text-[#f7f7f2] md:mt-5 md:text-[clamp(3.5rem,5.8vw,5.6rem)] md:leading-[0.98]"
              >
                {hero.headline}
              </h1>
            </Reveal>

            <Reveal delayMs={130}>
              <p className="mt-4 max-w-[34rem] text-[1.05rem] leading-[1.55] text-white/[0.88] sm:mt-6 sm:text-[1.125rem] md:max-w-[36rem] md:text-[1.2rem]">
                {hero.support}
              </p>
            </Reveal>

            <Reveal delayMs={190}>
              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
                <a
                  href={hero.primaryCta.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius)] bg-[#f7f7f2] px-7 text-base font-semibold text-forest transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-sage"
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius)] border border-white/40 bg-transparent px-7 text-base font-semibold text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-px hover:border-white/65 hover:bg-white/10"
                >
                  {hero.secondaryCta.label}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delayMs={240} className="mt-8 md:mt-10">
          <div
            className="grid grid-cols-3 gap-3 border border-white/15 bg-[rgba(12,45,34,0.34)] px-3.5 py-3.5 backdrop-blur-[3px] sm:gap-8 sm:px-6 sm:py-5 md:px-7"
            aria-label="Dôveryhodnosť OSBD Čadca"
          >
            {hero.proof.map((item) => (
              <div key={item.label} className="min-w-0">
                {"value" in item && item.value !== undefined ? (
                  <p className="text-[1.45rem] font-semibold tracking-tight text-white sm:text-3xl md:text-[2.45rem]">
                    <CountUp
                      value={item.value}
                      suffix={item.suffix ?? ""}
                      format={
                        "format" in item && item.format === "sk"
                          ? "sk"
                          : "plain"
                      }
                    />
                  </p>
                ) : (
                  <p className="text-[0.92rem] font-semibold tracking-tight text-white sm:text-xl md:text-[1.65rem]">
                    {"valueLabel" in item ? item.valueLabel : null}
                  </p>
                )}
                <p className="mt-1 text-[0.66rem] leading-snug break-words text-white/75 sm:mt-1.5 sm:text-[0.92rem]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
