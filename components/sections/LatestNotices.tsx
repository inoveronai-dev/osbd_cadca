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
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="notices-heading"
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
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

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {noticesSection.items.map((notice, index) => (
            <Reveal key={notice.id} as="li" delayMs={index * 70}>
              <article className="flex h-full flex-col border-t-2 border-forest bg-paper px-5 py-6 sm:px-6">
                <p className="text-xs font-semibold tracking-[0.1em] text-green uppercase">
                  Oznam
                </p>
                <h3 className="mt-4 text-xl leading-snug font-semibold tracking-tight text-ink text-balance">
                  {notice.title}
                </h3>
                {/* Dates intentionally omitted — not supplied */}
                <div className="mt-auto pt-8">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted">
                    Detail oznamu
                    <span className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] tracking-wide uppercase">
                      pripravujeme
                    </span>
                    <ArrowRight className="size-4 opacity-40" aria-hidden />
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
