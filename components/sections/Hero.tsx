import { CountUp } from "@/components/motion/CountUp";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { hero } from "@/lib/content/home";

export function Hero() {
  return (
    <section
      className="relative isolate min-h-[78vh] overflow-hidden bg-forest text-white md:min-h-[85vh]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <ImagePlaceholder
          slotId={hero.imageSlot.id}
          label={hero.imageSlot.label}
          description={hero.imageSlot.description}
          objectPosition="center"
          className="h-full rounded-none"
        />
        {/* Stronger full-bleed tint on mobile; left-weighted forest wash on desktop */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,77,58,0.82)_0%,rgba(24,77,58,0.72)_45%,rgba(24,77,58,0.78)_100%)] md:bg-[linear-gradient(90deg,rgba(24,77,58,0.92)_0%,rgba(24,77,58,0.78)_38%,rgba(24,77,58,0.35)_62%,rgba(24,77,58,0.12)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,77,58,0.35)_0%,transparent_30%,transparent_70%,rgba(24,77,58,0.45)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative container-site flex min-h-[78vh] flex-col justify-end pb-8 pt-[calc(var(--header-h)+2.5rem)] md:min-h-[85vh] md:pb-10 md:pt-[calc(var(--header-h)+4rem)]">
        <div className="max-w-2xl">
          <p className="text-[0.8rem] font-semibold tracking-[0.1em] text-white/80 uppercase">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-[2.35rem] leading-[1.12] font-semibold tracking-tight text-balance text-white sm:text-5xl md:text-[3.35rem]"
          >
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {hero.support}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={hero.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 text-base font-semibold text-forest transition-colors hover:bg-sage"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/40 bg-transparent px-6 text-base font-semibold text-white transition-colors hover:bg-white/12"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div
          className="mt-12 grid gap-6 border-t border-white/20 pt-6 sm:grid-cols-3 sm:gap-8 md:mt-16"
          aria-label="Dôveryhodnosť OSBD Čadca"
        >
          {hero.proof.map((item) => (
            <div key={item.label} className="min-w-0">
              {"value" in item && item.value !== undefined ? (
                <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  <CountUp
                    value={item.value}
                    suffix={item.suffix ?? ""}
                    format={"format" in item && item.format === "sk" ? "sk" : "plain"}
                  />
                </p>
              ) : (
                <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {"valueLabel" in item ? item.valueLabel : null}
                </p>
              )}
              <p className="mt-1 text-[0.95rem] text-white/78">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
