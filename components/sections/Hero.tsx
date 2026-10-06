import { CountUp } from "@/components/motion/CountUp";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { hero } from "@/lib/content/home";

export function Hero() {
  return (
    <section
      className="relative isolate min-h-[78vh] overflow-x-clip bg-forest text-white md:min-h-[88vh]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <ImagePlaceholder
          slotId={hero.imageSlot.id}
          label={hero.imageSlot.label}
          description={hero.imageSlot.description}
          objectPosition="center"
          quiet
          className="h-full rounded-none"
        />
        {/*
          Controlled forest overlay:
          - dense on the left for copy readability
          - opens toward center/right so the future photo stays visible
        */}
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(24,77,58,0.94)_0%,rgba(24,77,58,0.82)_28%,rgba(24,77,58,0.48)_52%,rgba(24,77,58,0.22)_72%,rgba(24,77,58,0.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(24,77,58,0.88)_0%,rgba(24,77,58,0.78)_42%,rgba(24,77,58,0.84)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,77,58,0.28)_0%,transparent_26%,transparent_68%,rgba(24,77,58,0.42)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative container-site flex min-h-[78vh] flex-col justify-end pb-9 pt-[calc(var(--header-h)+3.25rem)] md:min-h-[88vh] md:pb-12 md:pt-[calc(var(--header-h)+4.75rem)]">
        <div className="max-w-2xl">
          <p className="text-[0.8rem] font-semibold tracking-[0.12em] text-white/82 uppercase">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-[2.15rem] leading-[1.14] font-semibold tracking-tight text-balance text-white sm:text-5xl md:text-[3.4rem] md:leading-[1.1]"
          >
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/92 sm:text-xl">
            {hero.support}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={hero.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius)] bg-white px-6 text-base font-semibold text-forest transition-colors hover:bg-sage"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius)] border border-white/45 bg-transparent px-6 text-base font-semibold text-white transition-colors hover:bg-white/12"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div
          className="mt-11 grid grid-cols-3 gap-3 border-t border-white/25 pt-5 sm:mt-14 sm:gap-10 sm:pt-7 md:mt-16"
          aria-label="Dôveryhodnosť OSBD Čadca"
        >
          {hero.proof.map((item) => (
            <div key={item.label} className="min-w-0">
              {"value" in item && item.value !== undefined ? (
                <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-[2.65rem]">
                  <CountUp
                    value={item.value}
                    suffix={item.suffix ?? ""}
                    format={
                      "format" in item && item.format === "sk" ? "sk" : "plain"
                    }
                  />
                </p>
              ) : (
                <p className="text-base font-semibold tracking-tight text-white sm:text-2xl md:text-[1.85rem]">
                  {"valueLabel" in item ? item.valueLabel : null}
                </p>
              )}
              <p className="mt-1.5 text-[0.7rem] leading-snug break-words text-white/78 sm:text-[0.95rem]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
