import { Reveal } from "@/components/motion/Reveal";
import { NewsCarousel } from "@/components/sections/NewsCarousel";
import { noticesSection } from "@/lib/content/home";

export function LatestNotices() {
  return (
    <section
      id={noticesSection.id}
      className="section-pad scroll-mt-24 overflow-x-clip bg-forest"
      aria-labelledby="notices-heading"
    >
      <div className="container-site">
        <Reveal>
          <a
            href={noticesSection.categoryLink.href}
            className="eyebrow inline-flex text-sage transition-colors hover:text-white"
          >
            {noticesSection.categoryLink.label}
          </a>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="notices-heading" className="section-heading text-warm-white">
              {noticesSection.headline}
            </h2>
            <a
              href={noticesSection.allLink.href}
              className="inline-flex min-h-11 items-center text-base font-semibold text-sage transition-colors hover:text-white"
            >
              {noticesSection.allLink.label}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 md:mt-14">
        <Reveal>
          <NewsCarousel items={noticesSection.items} variant="dark" />
        </Reveal>
      </div>
    </section>
  );
}
