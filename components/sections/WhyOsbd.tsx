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
          <h2
            id="why-osbd-heading"
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {whyOsbd.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted sm:text-xl">
            {whyOsbd.intro}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
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
                delayMs={index * 50}
                className={cn(span)}
              >
                <article
                  className={cn(
                    "flex h-full min-h-[11.5rem] flex-col rounded-[var(--radius-lg)] border border-border p-6 sm:p-7",
                    featured
                      ? "bg-forest text-white"
                      : "bg-paper text-ink",
                  )}
                >
                  <p
                    className={cn(
                      "font-mono text-sm font-semibold tracking-wider",
                      featured ? "text-white/55" : "text-green",
                    )}
                  >
                    {benefit.number}
                  </p>
                  <h3
                    className={cn(
                      "mt-4 text-xl font-semibold tracking-tight text-balance sm:text-2xl",
                      featured ? "text-white" : "text-ink",
                    )}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-[1.02rem] leading-relaxed",
                      featured ? "text-white/82" : "text-ink-muted",
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
