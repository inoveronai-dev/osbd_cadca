import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { managementCta } from "@/lib/content/home";

export function ManagementCta() {
  return (
    <section
      className="relative isolate overflow-hidden bg-forest text-white"
      aria-labelledby="management-cta-heading"
    >
      <div className="absolute inset-0 opacity-40" aria-hidden>
        <ImagePlaceholder
          slotId={managementCta.imageSlot.id}
          label={managementCta.imageSlot.label}
          description={managementCta.imageSlot.description}
          quiet
          className="h-full rounded-none"
        />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(24,77,58,0.97)_0%,rgba(24,77,58,0.9)_46%,rgba(47,118,91,0.78)_100%)]"
        aria-hidden
      />

      <div className="relative container-site section-pad">
        <Reveal className="max-w-2xl">
          <h2
            id="management-cta-heading"
            className="section-heading text-white"
          >
            {managementCta.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl">
            {managementCta.copy}
          </p>
          <a
            href={managementCta.cta.href}
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-[var(--radius)] bg-white px-6 text-base font-semibold text-forest transition-colors hover:bg-sage"
          >
            {managementCta.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
