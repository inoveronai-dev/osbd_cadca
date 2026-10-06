import { Reveal } from "@/components/motion/Reveal";
import { whyOsbd } from "@/lib/content/home";
import { cn } from "@/lib/utils";

export function WhyOsbd() {
  return (
    <section
      className="section-pad bg-white"
      aria-labelledby="why-osbd-heading"
    >
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <h2 id="why-osbd-heading" className="section-heading">
            {whyOsbd.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted sm:text-xl">
            {whyOsbd.intro}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-px bg-[var(--border-strong)] md:grid-cols-2 lg:grid-cols-12">
          {whyOsbd.benefits.map((benefit, index) => {
            const featured = index === 0 || index === 3;
            const span =
              index === 0
                ? "lg:col-span-7"
                : index === 1
                  ? "lg:col-span-5"
                  : index === 2
                    ? "lg:col-span-4"
                    : index === 3
                      ? "lg:col-span-8"
                      : "lg:col-span-6";

            return (
              <Reveal
                key={benefit.number}
                as="li"
                delayMs={index * 45}
                className={cn(span)}
              >
                <article
                  className={cn(
                    "flex h-full min-h-[12.25rem] flex-col px-5 py-7 sm:px-8 sm:py-9",
                    featured ? "bg-forest text-white" : "bg-white text-ink",
                  )}
                >
                  <p
                    className={cn(
                      "font-mono text-[1.1rem] font-semibold tracking-[0.18em]",
                      featured ? "text-white/55" : "text-green",
                    )}
                  >
                    {benefit.number}
                  </p>
                  <h3
                    className={cn(
                      "mt-5 text-xl font-semibold tracking-tight text-balance sm:text-2xl",
                      featured ? "text-white" : "text-ink",
                    )}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-w-md text-[1.02rem] leading-relaxed",
                      featured ? "text-white/84" : "text-ink-muted",
                    )}
                  >
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
