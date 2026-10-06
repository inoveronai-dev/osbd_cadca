import { Reveal } from "@/components/motion/Reveal";
import { managementCta } from "@/lib/content/home";

export function ManagementCta() {
  return (
    <section
      className="relative isolate overflow-hidden bg-deep-forest text-white"
      aria-labelledby="management-cta-heading"
    >
      <div
        className="architect-grid pointer-events-none absolute inset-0 opacity-[0.28]"
        aria-hidden
      />

      <div className="relative container-site flex justify-center px-6 py-[clamp(3.75rem,7vw,5.25rem)] sm:px-8">
        <Reveal className="mx-auto w-full max-w-[48rem] text-center">
          <h2
            id="management-cta-heading"
            className="section-heading text-balance text-[#fcfbf7]"
          >
            {managementCta.headline}
          </h2>
          <p className="mx-auto mt-7 max-w-[42rem] text-[0.98rem] leading-[1.7] text-white/82 sm:mt-8 sm:text-[1.05rem]">
            {managementCta.copy}
          </p>
          <a
            href={managementCta.cta.href}
            className="mt-8 inline-flex min-h-10 items-center justify-center rounded-[var(--radius)] border border-white/30 bg-transparent px-5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10 sm:mt-9"
          >
            {managementCta.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
