import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { mainAdvantagesSource } from "@/lib/content/osbd-source";

export function MainAdvantages() {
  return (
    <section
      id={mainAdvantagesSource.id}
      className="section-pad scroll-mt-24 bg-warm-white"
      aria-labelledby="main-advantages-heading"
    >
      <div className="container-site">
        <Reveal className="max-w-4xl">
          <h2 id="main-advantages-heading" className="section-heading">
            {mainAdvantagesSource.headline}
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-x-10 gap-y-0 lg:grid-cols-2">
          {mainAdvantagesSource.items.map((item, index) => (
            <Reveal key={item} as="li" delayMs={(index % 6) * 35}>
              <article className="flex gap-4 border-t border-[var(--border-strong)] py-6 sm:gap-5 sm:py-7">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center font-mono text-sm font-semibold text-green/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <Check
                    className="mb-2 size-4 text-green"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  <p className="text-[1.02rem] leading-[1.72] text-ink sm:text-[1.05rem]">
                    {item}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
