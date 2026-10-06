import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { PendingLink } from "@/components/ui/PendingLink";
import { aboutSection } from "@/lib/content/home";

export function About() {
  return (
    <section
      id={aboutSection.id}
      className="section-pad scroll-mt-24 bg-paper"
      aria-labelledby="about-heading"
    >
      <div className="container-site grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-20">
        <Reveal className="order-2 lg:order-1 lg:sticky lg:top-28">
          <div className="group media-frame aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
            <div className="img-zoom h-full">
              <ImagePlaceholder
                slotId={aboutSection.imageSlot.id}
                label={aboutSection.imageSlot.label}
                description={aboutSection.imageSlot.description}
                className="h-full rounded-[var(--radius)]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2 lg:pt-6" delayMs={80}>
          <p className="eyebrow">{aboutSection.eyebrow}</p>
          <h2 id="about-heading" className="section-heading mt-4">
            {aboutSection.headline}
          </h2>
          <div className="prose-measure mt-8 space-y-5 text-lg leading-[1.75] text-ink">
            {aboutSection.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-[var(--border-subtle)] pt-6">
            <PendingLink
              label={aboutSection.link.label}
              href={aboutSection.link.href}
              status={aboutSection.link.status}
              className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-forest transition-colors hover:text-green"
              pendingClassName="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-ink-muted"
            />
            {aboutSection.link.status !== "pending" ? (
              <ArrowRight
                className="ml-1 inline size-4 text-forest"
                aria-hidden
              />
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
