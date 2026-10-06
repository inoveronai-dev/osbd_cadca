import { Reveal } from "@/components/motion/Reveal";
import { mainAdvantagesSource } from "@/lib/content/osbd-source";

export function MainAdvantages() {
  return (
    <section
      id={mainAdvantagesSource.id}
      className="relative section-pad scroll-mt-24 bg-white"
      aria-labelledby="main-advantages-heading"
    >
      <div
        className="structure-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      />
      <div className="relative container-site flex justify-center">
        <div className="w-full max-w-[52rem]">
          <Reveal>
            <h2
              id="main-advantages-heading"
              className="section-heading mx-auto max-w-[36rem] text-center"
            >
              {mainAdvantagesSource.headline}
            </h2>
          </Reveal>

          <ul className="mt-7 grid gap-x-7 gap-y-0 border-t border-[var(--border-subtle)] lg:grid-cols-2">
            {mainAdvantagesSource.items.map((item, index) => (
              <Reveal key={item} as="li" delayMs={(index % 6) * 25}>
                <article className="flex gap-3 border-b border-[var(--border-subtle)] py-3.5 sm:gap-3.5">
                  <span className="mt-0.5 w-6 shrink-0 font-mono text-[0.75rem] font-semibold tracking-[0.08em] text-green/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="min-w-0 text-[0.95rem] leading-[1.7] text-ink">
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
