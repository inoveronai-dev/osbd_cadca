import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content/home";
import { cn } from "@/lib/utils";

/** Image left on 01 & 04; image right on 02 & 03 — editorial rhythm in the 2×2. */
const imageOnLeft = [true, false, false, true] as const;

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
      className="scroll-mt-24 bg-soft-sage pt-10 pb-[clamp(3.5rem,6vw,5rem)] md:pt-12"
      aria-labelledby="services-heading"
    >
      <div className="container-site">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <h2
            id="services-heading"
            className="font-semibold tracking-[-0.024em] text-balance text-forest text-[clamp(2.55rem,3.8vw,3.1rem)] leading-[1.12]"
          >
            {services.headline}
          </h2>
        </Reveal>

        <ul className="mt-11 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-[3.25rem]">
          {services.categories.map((category, index) => {
            const left = imageOnLeft[index];

            return (
              <Reveal key={category.title} as="li" delayMs={index * 60}>
                <article
                  className={cn(
                    "group card-lift flex h-full overflow-hidden rounded-[0.5rem] border border-forest/12 bg-[#fcfcf9] transition-[border-color,box-shadow] duration-300 hover:border-forest/28 hover:shadow-[0_10px_26px_-20px_rgba(10,56,44,0.28)]",
                    "flex-col sm:min-h-[13.5rem] sm:flex-row lg:min-h-[14.5rem]",
                    !left && "sm:flex-row-reverse",
                  )}
                >
                  <div className="relative h-[12rem] w-full shrink-0 overflow-hidden sm:h-auto sm:w-[40%]">
                    <div className="img-zoom relative h-full w-full">
                      <Image
                        src={category.image.src}
                        alt={category.image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 20vw, 280px"
                        className={cn("object-cover", imagePositions[index])}
                      />
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-5 sm:px-6 sm:py-6 lg:px-7">
                    <p className="font-mono text-[0.8rem] font-semibold tracking-[0.12em] text-green/65">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-[1.2rem] font-semibold tracking-tight text-ink sm:text-[1.3rem]">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.7] text-ink-muted sm:text-[0.98rem]">
                      {category.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
