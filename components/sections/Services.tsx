import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content/home";

export function Services() {
  return (
    <section
      id={services.id}
      className="section-pad scroll-mt-24 bg-soft-sage"
      aria-labelledby="services-heading"
    >
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <h2 id="services-heading" className="section-heading-lg max-w-xl">
            {services.headline}
          </h2>
          <ul className="relative mt-12 border-l border-forest/20 pl-6 sm:pl-8">
            {services.categories.map((category, index) => (
              <li
                key={category.title}
                className="group border-t border-forest/15 py-7 first:border-t-0 first:pt-0 last:pb-0 transition-colors hover:bg-white/35 sm:py-8"
              >
                <div className="flex gap-4 sm:gap-5">
                  <p className="mt-1 w-8 shrink-0 font-mono text-base font-semibold tracking-[0.12em] text-green">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-[1.4rem]">
                      {category.title}
                    </h3>
                    <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-muted">
                      {category.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delayMs={100}
          className="group order-1 lg:sticky lg:top-28 lg:order-2"
        >
          <div className="media-frame aspect-[4/5] border border-[var(--border-subtle)] shadow-[0_22px_48px_-32px_rgba(10,56,44,0.32)]">
            <div className="img-zoom relative h-full w-full">
              <Image
                src="/images/services-renovation.png"
                alt={services.imageSlot.description}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-[center_30%] sm:object-[center_28%]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
