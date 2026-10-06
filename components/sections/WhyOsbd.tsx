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
      <div className="relative container-site grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-14">
        <Reveal className="lg:self-start">
          <h2 id="why-osbd-heading" className="section-heading">
            {whyOsbd.headline}
          </h2>
          <p className="mt-4 max-w-sm text-[0.98rem] leading-[1.7] text-ink-muted">
            {whyOsbd.intro}
          </p>
        </Reveal>

        <ul className="border-t border-[var(--border-subtle)]">
          {whyOsbd.benefits.map((benefit, index) => (
            <Reveal key={benefit.number} as="li" delayMs={index * 30}>
              <article className="border-b border-[var(--border-subtle)] py-5 transition-colors hover:bg-soft-sage/40">
                <div className="grid gap-2 sm:grid-cols-[3.25rem_1fr] sm:gap-5">
                  <p className="font-mono text-[1.65rem] leading-none font-medium tracking-[0.06em] text-green/50 sm:text-[1.85rem]">
                    {benefit.number}
                  </p>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold tracking-tight text-ink sm:text-[1.1rem]">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-[0.95rem] leading-relaxed text-ink-muted">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
