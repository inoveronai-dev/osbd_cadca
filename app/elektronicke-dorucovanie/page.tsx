import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SubpageHero } from "@/components/sections/SubpageHero";
import { loadElektronickeDorucovanie } from "@/lib/content/load";

export const metadata: Metadata = {
  title: "Elektronické doručovanie",
  description:
    "Jednoduché informácie k elektronickému doručovaniu dokumentov.",
};

export default function ElektronickeDorucovaniePage() {
  const data = loadElektronickeDorucovanie();

  return (
    <main id="obsah" className="bg-ivory">
      <SubpageHero
        title={data.heroTitle}
        support={data.heroSupport || undefined}
        headingId="elektronicke-dorucovanie-hero-heading"
      />

      <section className="border-b border-forest/8 pt-8 pb-12 sm:pt-9 sm:pb-14 md:pt-10 md:pb-16">
        <div className="mx-auto w-full max-w-[48rem] px-5 sm:px-6 lg:px-8">
          <article className="rounded-xl border border-forest/10 bg-warm-white px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
            <h2 className="text-[clamp(1.35rem,2.8vw,1.75rem)] font-semibold tracking-tight text-forest leading-[1.25]">
              {data.heading}
            </h2>

            <div className="mt-6 space-y-5 text-[1.02rem] leading-[1.75] text-ink sm:text-[1.05rem] sm:leading-[1.8]">
              <p>{data.greeting}</p>
              {data.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              <div className="pt-2">
                <p>{data.closingLead}</p>
                <p className="mt-3 font-semibold text-forest">
                  {data.closingName}
                </p>
                <p className="text-[0.98rem] text-ink-muted">
                  {data.closingRole}
                </p>
              </div>
            </div>
          </article>

          <div className="mt-10 sm:mt-12">
            <h2 className="text-[1.15rem] font-semibold tracking-tight text-forest sm:text-[1.25rem]">
              {data.pdfSectionTitle}
            </h2>
            <a
              href={data.pdf.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center gap-4 rounded-xl border border-forest/12 bg-warm-white px-5 py-4 transition-[border-color,background-color,box-shadow] duration-200 hover:border-forest/28 hover:bg-white hover:shadow-[0_10px_28px_-20px_rgba(10,56,44,0.45)] sm:px-6 sm:py-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-forest/8 text-forest">
                <FileText className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.02rem] font-semibold leading-snug text-ink transition-colors group-hover:text-forest sm:text-[1.05rem]">
                  {data.pdf.title}
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
