import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content/home";

export function Services() {
  return (
    <section
      id={services.id}
      className="section-pad scroll-mt-24 bg-sage/60"
      aria-labelledby="services-heading"
    >
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
        <Reveal>
          <h2
            id="services-heading"
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {services.headline}
          </h2>
          <ul className="mt-8 space-y-5">
            {services.categories.map((category, index) => (
              <li
                key={category.title}
                className="border-t border-forest/15 pt-5 first:border-t-0 first:pt-0"
              >
                <p className="font-mono text-xs font-semibold tracking-[0.14em] text-green uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
                  {category.title}
                </h3>
                <p className="mt-2 text-[1.05rem] leading-relaxed text-ink-muted">
                  {category.description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={100} className="group">
          <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)]">
            <div className="img-zoom h-full">
              <ImagePlaceholder
                slotId={services.imageSlot.id}
                label={services.imageSlot.label}
                description={services.imageSlot.description}
                className="h-full rounded-[var(--radius-xl)]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
