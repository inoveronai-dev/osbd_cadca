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
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-14">
          <Reveal className="order-1">
            <div className="media-frame aspect-[4/5] max-h-[28rem] border border-[var(--border-subtle)] lg:max-h-[32rem]">
              <div className="img-zoom relative h-full w-full">
                <Image
                  src="/images/about-osbd-hq.png"
                  alt={aboutSection.imageSlot.description}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-[center_18%] sm:object-[center_20%] lg:object-center"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="order-2 lg:border-l lg:border-forest/12 lg:pl-9" delayMs={60}>
            <p className="eyebrow">{aboutSource.eyebrow}</p>
            <h2 id="about-lead-title" className="section-heading mt-3">
              {aboutSource.leadTitle}
            </h2>
            <div className="prose-measure prose-body mt-6 space-y-4 text-ink">
              {aboutSource.introParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={90} className="mt-10 lg:mt-12">
          <div className="prose-wide prose-body mx-auto space-y-4 text-ink">
            {aboutSource.bodyParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={120} className="mt-10 lg:mt-12">
          <blockquote className="border-l-[3px] border-forest pl-5 sm:pl-6">
            <p className="max-w-3xl text-[1.15rem] leading-snug font-medium tracking-tight text-forest sm:text-[1.25rem]">
              {aboutSource.closingStatement}
            </p>
          </blockquote>
        </Reveal>

        <div className="mt-8 border-t border-[var(--border-subtle)] pt-5">
          <PendingLink
            label={aboutSource.link.label}
            href={aboutSource.link.href}
            status={aboutSource.link.status}
            className="inline-flex min-h-10 items-center gap-2 text-[0.98rem] font-semibold text-forest transition-colors hover:text-green"
            pendingClassName="inline-flex min-h-10 items-center gap-2 text-[0.98rem] font-semibold text-ink-muted"
          />
          {aboutSource.link.status !== "pending" ? (
            <ArrowRight className="ml-1 inline size-4 text-forest" aria-hidden />
          ) : null}
        </div>
      </div>
    </section>
  );
}
