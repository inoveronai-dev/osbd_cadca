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
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
        <Reveal className="order-2 lg:order-1">
          <h2 id="services-heading" className="section-heading max-w-lg">
            {services.headline}
          </h2>
          <ul className="relative mt-8 border-l border-forest/15 pl-5 sm:pl-6">
            {services.categories.map((category, index) => (
              <li
                key={category.title}
                className="group border-t border-forest/12 py-5 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="flex gap-3.5 sm:gap-4">
                  <p className="mt-0.5 w-7 shrink-0 font-mono text-[0.8rem] font-semibold tracking-[0.1em] text-green">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-[1.05rem] font-semibold tracking-tight text-ink sm:text-[1.12rem]">
                      {category.title}
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">
                      {category.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={80} className="group order-1 lg:order-2">
          <div className="media-frame aspect-[4/5] max-h-[26rem] border border-[var(--border-subtle)] lg:max-h-[30rem]">
            <div className="img-zoom relative h-full w-full">
              <Image
                src="/images/services-renovation.png"
                alt={services.imageSlot.description}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_30%] sm:object-[center_28%]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
