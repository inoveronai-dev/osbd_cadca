import { Reveal } from "@/components/motion/Reveal";
import { whyOsbd } from "@/lib/content/home";

export function WhyOsbd() {
  return (
    <section
      className="relative section-pad bg-white"
      aria-labelledby="why-osbd-heading"
    >
      <div
        className="structure-grid pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
      />
      <div className="relative container-site flex justify-center">
        <div className="mx-auto grid w-full max-w-[56rem] gap-7 lg:grid-cols-[minmax(0,15.75rem)_minmax(0,26.5rem)] lg:justify-between lg:gap-8">
          <Reveal className="lg:self-start">
            <h2 id="why-osbd-heading" className="section-heading">
              {whyOsbd.headline}
            </h2>
            <p className="mt-5 max-w-[17.5rem] text-[0.95rem] leading-[1.7] text-ink-muted">
              {whyOsbd.intro}
            </p>
          </Reveal>

          <ul className="border-t border-[var(--border-subtle)]">
            {whyOsbd.benefits.map((benefit, index) => (
              <Reveal key={benefit.number} as="li" delayMs={index * 30}>
                <article className="border-b border-[var(--border-subtle)] py-4 transition-colors hover:bg-soft-sage/40 sm:py-[1.05rem]">
                  <div className="grid gap-1.5 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-4">
                    <p className="font-mono text-[1.45rem] leading-none font-medium tracking-[0.06em] text-green/50 sm:text-[1.6rem]">
                      {benefit.number}
                    </p>
                    <div className="min-w-0">
                      <h3 className="text-[1rem] font-semibold tracking-tight text-ink sm:text-[1.05rem]">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-muted">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
