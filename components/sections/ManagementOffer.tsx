import { Reveal } from "@/components/motion/Reveal";
import { managementOfferSource } from "@/lib/content/osbd-source";

export function ManagementOffer() {
  return (
    <section
      id={managementOfferSource.id}
      className="relative section-pad scroll-mt-24 bg-warm-white"
      aria-labelledby="management-offer-heading"
    >
      <div
        className="structure-grid pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="relative container-site">
        <Reveal className="max-w-[58rem]">
          <h2 id="management-offer-heading" className="section-heading">
            {managementOfferSource.headline}
          </h2>

          <div className="mt-6 border-t border-[var(--border-subtle)] pt-6">
            <h3 className="section-heading-sm text-forest">
              {managementOfferSource.subheading}
            </h3>
          </div>

          <div className="prose-body mt-7 space-y-5 text-ink">
            {managementOfferSource.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
