import { Reveal } from "@/components/motion/Reveal";
import { managementCta } from "@/lib/content/home";

export function ManagementCta() {
  return (
    <section
      className="relative isolate overflow-hidden bg-deep-forest text-white"
      aria-labelledby="management-cta-heading"
    >
      <div
        className="architect-grid pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,56,44,0.15)_0%,rgba(10,56,44,0.92)_100%)]"
        aria-hidden
      />

      <div className="relative container-site section-pad py-[clamp(5rem,10vw,7.5rem)]">
        <Reveal className="max-w-3xl">
          <h2
            id="management-cta-heading"
            className="section-heading-lg text-[#fcfbf7]"
          >
            {managementCta.headline}
          </h2>
          <p className="mt-8 max-w-2xl text-[1.05rem] leading-[1.75] text-white/86 sm:text-xl">
            {managementCta.copy}
          </p>
          <a
            href={managementCta.cta.href}
            className="mt-10 inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-white/35 bg-transparent px-6 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {managementCta.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
