import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content/home";

export function Services() {
  return (
    <section
      id={services.id}
      className="section-pad scroll-mt-24 bg-sage/55"
      aria-labelledby="services-heading"
    >
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <h2 id="services-heading" className="section-heading max-w-xl">
            {services.headline}
          </h2>
          <ul className="mt-10">
            {services.categories.map((category, index) => (
              <li
                key={category.title}
                className="group border-t border-forest/18 py-6 first:border-t-0 first:pt-0 last:pb-0 transition-colors"
              >
                <div className="flex gap-4 sm:gap-5">
                  <p className="mt-1 w-8 shrink-0 font-mono text-sm font-semibold tracking-[0.14em] text-green">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="min-w-0 border-l-2 border-transparent pl-0 transition-[border-color,padding] duration-200 group-hover:border-green group-hover:pl-4">
                    <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-[1.35rem]">
                      {category.title}
                    </h3>
                    <p className="mt-2.5 text-[1.05rem] leading-relaxed text-ink-muted">
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
          <div className="media-frame aspect-[4/5] border border-[var(--border-subtle)] shadow-[0_18px_40px_-28px_rgba(23,32,28,0.35)]">
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
