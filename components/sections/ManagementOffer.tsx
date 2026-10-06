import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content/home";
import { managementOfferSource } from "@/lib/content/osbd-source";

export function ManagementOffer() {
  return (
    <section
      id={managementOfferSource.id}
      className="section-pad scroll-mt-24 bg-ivory"
      aria-labelledby="management-offer-heading"
    >
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16">
        <Reveal>
          <h2 id="management-offer-heading" className="section-heading-lg">
            {managementOfferSource.headline}
          </h2>
          <p className="mt-6 text-[1.15rem] font-semibold leading-snug text-forest sm:text-xl">
            {managementOfferSource.subheading}
          </p>
          <div className="prose-wide mt-8 space-y-6 text-[1.05rem] leading-[1.78] text-ink sm:text-lg">
            {managementOfferSource.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={90} className="group lg:sticky lg:top-28">
          <div className="media-frame aspect-[4/5] border border-[var(--border-subtle)] shadow-[0_22px_48px_-32px_rgba(10,56,44,0.32)]">
            <div className="img-zoom relative h-full w-full">
              <Image
                src="/images/services-renovation.png"
                alt={services.imageSlot.description}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-[center_30%]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
