import { Reveal } from "@/components/motion/Reveal";
import { whyOsbd } from "@/lib/content/home";

export function WhyOsbd() {
  return (
    <section
      className="relative section-pad bg-soft-sage"
      aria-labelledby="why-osbd-heading"
    >
      <div className="relative container-site">
        <Reveal className="mx-auto max-w-[42rem] text-center">
          <h2 id="why-osbd-heading" className="section-heading text-forest">
            {whyOsbd.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-[40rem] text-[0.98rem] leading-[1.7] text-ink-muted sm:text-[1.02rem]">
            {whyOsbd.intro}
          </p>
        </Reveal>

        <ul className="mx-auto mt-10 grid max-w-[64rem] border-t border-l border-forest/12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {whyOsbd.benefits.map((benefit, index) => (
            <Reveal key={benefit.number} as="li" delayMs={index * 90}>
              <article className="group why-benefit h-full border-r border-b border-forest/12 px-5 py-6 sm:px-6 sm:py-7 lg:px-7">
                <p className="font-mono text-[2.15rem] leading-none font-medium tracking-[0.04em] text-green/40 transition-colors duration-200 group-hover:text-green/70 sm:text-[2.45rem]">
                  {benefit.number}
                </p>
                <h3 className="mt-4 text-[1.1rem] font-semibold tracking-tight text-ink transition-transform duration-200 group-hover:translate-x-0.5 sm:text-[1.2rem]">
                  {benefit.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-[1.7] text-ink-muted sm:text-[0.98rem]">
                  {benefit.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
