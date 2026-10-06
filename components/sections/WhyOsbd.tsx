import { Reveal } from "@/components/motion/Reveal";
import { whyOsbd } from "@/lib/content/home";

export function WhyOsbd() {
  return (
    <section
      className="section-pad bg-white"
      aria-labelledby="why-osbd-heading"
    >
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="why-osbd-heading" className="section-heading">
            {whyOsbd.headline}
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-[1.75] text-ink-muted sm:text-xl">
            {whyOsbd.intro}
          </p>
        </Reveal>

        <ul className="border-t border-[var(--border-strong)]">
          {whyOsbd.benefits.map((benefit, index) => (
            <Reveal key={benefit.number} as="li" delayMs={index * 40}>
              <article className="group border-b border-[var(--border-strong)] py-7 transition-colors hover:bg-soft-sage/55 sm:py-8">
                <div className="grid gap-4 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
                  <p className="font-mono text-[2rem] leading-none font-medium tracking-[0.08em] text-green/55 sm:text-[2.35rem]">
                    {benefit.number}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-[1.35rem]">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-ink-muted">
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
