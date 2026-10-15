import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { noticesSection } from "@/lib/content/home";

export const metadata: Metadata = {
  title: "Aktuality",
  description: noticesSection.support,
};

export default function AktualityPage() {
  return (
    <main id="obsah" className="bg-ivory">
      <section className="border-b border-forest/8 pt-[calc(var(--header-h)+2rem)] pb-12 md:pb-14">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow text-forest">OSBD Čadca</p>
            <h1 className="mt-2 font-semibold tracking-[-0.02em] text-forest text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.12]">
              {noticesSection.headline}
            </h1>
            <p className="mt-3.5 max-w-xl text-[0.98rem] leading-relaxed text-ink-muted">
              {noticesSection.support}
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-3.5">
            {noticesSection.items.map((item, index) => (
              <Reveal key={item.id} as="li" delayMs={Math.min(index * 30, 180)}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card-lift flex h-full items-start justify-between gap-4 rounded-[0.5rem] border border-forest/10 bg-warm-white px-5 py-5 transition-colors hover:border-forest/25 sm:px-6 sm:py-6"
                >
                  <span className="min-w-0">
                    <span className="block text-[0.68rem] font-semibold tracking-[0.1em] text-forest uppercase">
                      Aktuality
                    </span>
                    <span className="mt-2 block text-[1.05rem] leading-snug font-semibold tracking-tight text-ink transition-colors group-hover:text-forest sm:text-[1.1rem]">
                      {item.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-forest/55 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest"
                    aria-hidden
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
