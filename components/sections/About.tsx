import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PendingLink } from "@/components/ui/PendingLink";
import { aboutSection } from "@/lib/content/home";
import { aboutSource } from "@/lib/content/osbd-source";

export function About() {
  return (
    <section
      id={aboutSource.id}
      className="section-pad scroll-mt-24 bg-warm-white"
      aria-labelledby="about-lead-title"
    >
      <div className="container-site">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16 xl:gap-20">
          <Reveal className="order-1 lg:sticky lg:top-28">
            <div className="media-frame aspect-[4/5] border border-[var(--border-subtle)] shadow-[0_22px_48px_-32px_rgba(10,56,44,0.35)] lg:aspect-[4/5]">
              <div className="img-zoom relative h-full w-full">
                <Image
                  src="/images/about-osbd-hq.png"
                  alt={aboutSection.imageSlot.description}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-[center_18%] sm:object-[center_20%] lg:object-center"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="order-2 lg:border-l lg:border-forest/15 lg:pl-10" delayMs={80}>
            <p className="eyebrow">{aboutSource.eyebrow}</p>
            <h2 id="about-lead-title" className="section-heading-lg mt-4">
              {aboutSource.leadTitle}
            </h2>
            <div className="prose-measure mt-8 space-y-5 text-[1.05rem] leading-[1.78] text-ink sm:text-lg">
              {aboutSource.introParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={120} className="mt-14 lg:mt-16">
          <div className="prose-wide mx-auto space-y-6 text-[1.05rem] leading-[1.78] text-ink sm:text-lg">
            {aboutSource.bodyParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={160} className="mt-14 lg:mt-16">
          <blockquote className="border-l-4 border-forest bg-soft-sage/70 px-6 py-7 sm:px-8 sm:py-8">
            <p className="section-heading-lg max-w-4xl text-forest">
              {aboutSource.closingStatement}
            </p>
          </blockquote>
        </Reveal>

        <div className="mt-10 border-t border-[var(--border-subtle)] pt-6">
          <PendingLink
            label={aboutSource.link.label}
            href={aboutSource.link.href}
            status={aboutSource.link.status}
            className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-forest transition-colors hover:text-green"
            pendingClassName="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-ink-muted"
          />
          {aboutSource.link.status !== "pending" ? (
            <ArrowRight className="ml-1 inline size-4 text-forest" aria-hidden />
          ) : null}
        </div>
      </div>
    </section>
  );
}
