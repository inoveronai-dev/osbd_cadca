import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const imagePositions = [
  "object-[center_20%]",
  "object-[center_45%]",
  "object-center",
  "object-[center_30%]",
] as const;

export function Services() {
  return (
    <section
      id={services.id}
      className="scroll-mt-24 bg-transparent pt-8 pb-[clamp(3.5rem,6vw,5rem)] md:pt-10"
      aria-labelledby="services-heading"
    >
      <div className="container-site">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <h2
            id="services-heading"
            className="font-semibold tracking-[-0.022em] text-balance text-forest text-[clamp(2.35rem,3.4vw,2.85rem)] leading-[1.14]"
          >
            {services.headline}
          </h2>
        </Reveal>

        <ul className="mt-9 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-11 lg:gap-7">
          {services.categories.map((category, index) => (
            <Reveal key={category.title} as="li" delayMs={index * 55}>
              <article className="group card-lift flex h-full flex-col overflow-hidden rounded-[0.5rem] border border-forest/12 bg-white shadow-[0_8px_28px_-18px_rgba(10,56,44,0.22)] transition-[border-color,box-shadow,transform] duration-300 hover:border-forest/28 hover:shadow-[0_14px_34px_-16px_rgba(10,56,44,0.28)]">
                <div className="relative h-[11rem] w-full shrink-0 overflow-hidden sm:h-[10.5rem] lg:h-[11.25rem]">
                  <div className="img-zoom relative h-full w-full">
                    <Image
                      src={category.image.src}
                      alt={category.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                      className={cn("object-cover", imagePositions[index])}
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-5 lg:px-6 lg:py-6">
                  <p className="font-mono text-[0.8rem] font-semibold tracking-[0.12em] text-green/65">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-[1.25rem] font-semibold tracking-tight text-ink sm:text-[1.35rem]">
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
