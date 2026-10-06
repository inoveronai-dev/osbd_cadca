import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PendingLink } from "@/components/ui/PendingLink";
import { noticesSection } from "@/lib/content/home";

export function LatestNotices() {
  return (
    <section
      id={noticesSection.id}
      className="section-pad scroll-mt-24 bg-white"
      aria-labelledby="notices-heading"
    >
      <div className="container-site">
        <Reveal className="flex flex-col gap-5 border-b border-[var(--border-subtle)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="notices-heading" className="section-heading">
            {noticesSection.headline}
          </h2>
          <PendingLink
            label={noticesSection.allLink.label}
            href={noticesSection.allLink.href}
            status={noticesSection.allLink.status}
            className="inline-flex items-center gap-2 text-base font-semibold text-forest hover:text-green"
            pendingClassName="inline-flex items-center gap-2 text-base font-semibold text-ink-muted"
          />
        </Reveal>

        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {noticesSection.items.map((notice, index) => (
            <Reveal key={notice.id} as="li" delayMs={index * 70}>
              <article className="group flex h-full flex-col border-t-[3px] border-forest bg-transparent pt-6">
                <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-green uppercase">
                  Oznam
                </p>
                <h3 className="mt-5 text-[1.2rem] leading-snug font-semibold tracking-tight text-balance text-ink sm:text-xl">
                  {notice.title}
                </h3>
                <div className="mt-auto pt-10">
                  <span className="inline-flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-muted">
                    Detail oznamu
                    <span className="rounded-[var(--radius-sm)] border border-border px-1.5 py-0.5 text-[0.65rem] tracking-wide uppercase">
                      pripravujeme
                    </span>
                    <ArrowRight
                      className="arrow-shift size-4 opacity-50"
                      aria-hidden
                    />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
