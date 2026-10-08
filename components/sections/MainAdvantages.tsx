import { Reveal } from "@/components/motion/Reveal";
import { mainAdvantagesSource } from "@/lib/content/osbd-source";

export function MainAdvantages() {
  return (
    <section
      id={mainAdvantagesSource.id}
      className="relative isolate overflow-hidden scroll-mt-24 bg-warm-white pt-[clamp(3.75rem,7vw,5.5rem)] pb-[clamp(4rem,8vw,6rem)]"
      aria-labelledby="main-advantages-heading"
    >
      {/* Soft organic green reintroduction toward the lower portion */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(58%,28rem)] w-full sm:h-[min(52%,30rem)] lg:h-[min(48%,32rem)]"
        aria-hidden
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 520"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 520
               V220
               C 160 160, 320 90, 520 120
               C 760 160, 920 40, 1120 80
               C 1280 110, 1380 170, 1440 150
               V520
               Z"
            fill="#eff3ef"
          />
        </svg>
      </div>

      <div className="relative z-10 container-site flex justify-center">
        <div className="w-full max-w-[56rem]">
          <Reveal>
            <h2
              id="main-advantages-heading"
              className="mx-auto max-w-[38rem] text-center font-semibold tracking-[-0.022em] text-balance text-forest text-[clamp(1.85rem,2.8vw,2.55rem)] leading-[1.18]"
            >
              {mainAdvantagesSource.headline}
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:mt-11 sm:grid-cols-2 sm:gap-5 lg:mt-12">
            {mainAdvantagesSource.items.map((item, index) => (
              <Reveal key={item} as="li" delayMs={(index % 7) * 75}>
                <article className="group advantage-row relative flex h-full gap-3.5 overflow-hidden rounded-[0.5rem] border border-forest/8 bg-white/80 px-4 py-4 backdrop-blur-[1px] transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-forest/22 hover:bg-white hover:shadow-[0_10px_28px_-18px_rgba(15,74,55,0.22)] sm:gap-4 sm:px-5 sm:py-[1.15rem]">
                  <span
                    className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-forest/25 transition-[background-color,box-shadow,width] duration-300 group-hover:w-[3.5px] group-hover:bg-forest/70 group-hover:shadow-[0_0_12px_rgba(15,74,55,0.28)]"
                    aria-hidden
                  />
                  <span className="mt-0.5 w-7 shrink-0 pl-1.5 font-mono text-[0.78rem] font-semibold tracking-[0.1em] text-green/65 transition-colors duration-300 group-hover:text-forest">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="min-w-0 text-[0.95rem] leading-[1.72] text-ink/88 transition-colors duration-300 group-hover:text-ink sm:text-[0.98rem]">
                    {item}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
