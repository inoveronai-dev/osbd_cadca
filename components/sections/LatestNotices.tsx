import { Reveal } from "@/components/motion/Reveal";
import { NewsCarousel } from "@/components/sections/NewsCarousel";
import { noticesSection } from "@/lib/content/home";

export function LatestNotices() {
  return (
    <section
      id={noticesSection.id}
      className="section-pad scroll-mt-24 overflow-x-clip border-y border-[var(--border-subtle)] bg-ivory"
      aria-labelledby="notices-heading"
    >
      <div className="container-site">
        <Reveal>
          <a
            href={noticesSection.categoryLink.href}
            className="eyebrow inline-flex transition-colors hover:text-forest"
          >
            {noticesSection.categoryLink.label}
          </a>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="notices-heading" className="section-heading">
              {noticesSection.headline}
            </h2>
            <a
              href={noticesSection.allLink.href}
              className="inline-flex min-h-10 items-center text-[0.95rem] font-semibold text-forest transition-colors hover:text-green"
            >
              {noticesSection.allLink.label}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mt-8 md:mt-9">
        <Reveal>
          <NewsCarousel items={noticesSection.items} variant="light" />
        </Reveal>
      </div>
    </section>
  );
}
