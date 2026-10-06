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
      <div className="container-site">
        <Reveal>
          <h2 id="services-heading" className="section-heading max-w-2xl">
            {services.headline}
          </h2>
        </Reveal>

        <ul className="mt-9 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-11 lg:gap-7">
          {services.categories.map((category, index) => (
            <Reveal key={category.title} as="li" delayMs={index * 70}>
              <article className="group card-lift flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-forest/12 bg-warm-white transition-[border-color,box-shadow] duration-200 hover:border-forest/28 hover:shadow-[0_10px_28px_-22px_rgba(10,56,44,0.35)]">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <div className="img-zoom relative h-full w-full">
                    <Image
                      src={category.image.src}
                      alt={category.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                  <p className="font-mono text-[0.78rem] font-semibold tracking-[0.12em] text-green/65">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2.5 text-[1.12rem] font-semibold tracking-tight text-ink sm:text-[1.2rem]">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.7] text-ink-muted sm:text-[0.98rem]">
                    {category.description}
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
