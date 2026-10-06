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
      <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <Reveal className="order-2 lg:order-1">
          <div className="group aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] sm:aspect-[5/6]">
            <div className="img-zoom h-full">
              <ImagePlaceholder
                slotId={aboutSection.imageSlot.id}
                label={aboutSection.imageSlot.label}
                description={aboutSection.imageSlot.description}
                className="h-full rounded-[var(--radius-xl)]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delayMs={80}>
          <p className="eyebrow">{aboutSection.eyebrow}</p>
          <h2
            id="about-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {aboutSection.headline}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/90">
            {aboutSection.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <PendingLink
              label={aboutSection.link.label}
              href={aboutSection.link.href}
              status={aboutSection.link.status}
              className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-forest transition-colors hover:text-green"
              pendingClassName="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-ink-muted"
            />
            {aboutSection.link.status !== "pending" ? (
              <ArrowRight className="ml-1 inline size-4 text-forest" aria-hidden />
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
