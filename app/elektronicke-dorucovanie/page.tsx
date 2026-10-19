import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SubpageHero } from "@/components/sections/SubpageHero";

export const metadata: Metadata = {
  title: "Elektronické doručovanie",
  description:
    "Jednoduché informácie k elektronickému doručovaniu dokumentov.",
};

const PDF_HREF =
  "https://osbdcadca.sk/wp-content/uploads/2026/07/Dohoda-o-elektronickom-doru%C4%8Dovan%C3%AD.pdf";

export default function ElektronickeDorucovaniePage() {
  return (
    <main id="obsah" className="bg-ivory">
      <SubpageHero
        title="Informácia o elektronickom doručovaní"
        support="Jednoduché informácie k elektronickému doručovaniu dokumentov."
        headingId="elektronicke-dorucovanie-hero-heading"
      />

      <section className="border-b border-forest/8 pt-8 pb-12 sm:pt-9 sm:pb-14 md:pt-10 md:pb-16">
        <div className="mx-auto w-full max-w-[48rem] px-5 sm:px-6 lg:px-8">
          <article className="rounded-xl border border-forest/10 bg-warm-white px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
            <h2 className="text-[clamp(1.35rem,2.8vw,1.75rem)] font-semibold tracking-tight text-forest leading-[1.25]">
              Informácia o elektronickom doručovaní
            </h2>

            <div className="mt-6 space-y-5 text-[1.02rem] leading-[1.75] text-ink sm:text-[1.05rem] sm:leading-[1.8]">
              <p>Vážený vlastník/nájomca bytu,</p>
              <p>
                OSBD Čadca, ako správca Vášho bytového domu prevádzkuje rýchlejší
                a efektívnejší spôsob komunikácie a doručovania dokumentov
                vlastníkom/nájomcom bytov prostredníctvom elektronického
                doručovania dokumentov.
              </p>
              <p>
                Podmienkou elektronického doručovania je uzatvorenie „Dohody o
                elektronickom doručovaní“ (ďalej len „Dohoda“) medzi
                vlastníkom/nájomcom bytu a OSBD Čadca. Formulár „Dohody“:
              </p>
              <p>
                Je medzi dokumenty a tlačivá – Dohoda o elektronickom
                doručovaní dokumentov a Informácia k elektronickému doručovaniu
                dokumentov.
              </p>
              <p>
                Podpísanú dohodu, prosím, doručte na OSBD Čadca poštou alebo
                osobne na OSBD Čadca, Gočárova 252, 022 47 Čadca.
              </p>
              <p>
                Vážený vlastník/nájomca bytu, veríme, že využijete tento nový
                spôsob doručovania dokumentov a bude pre Vás, ale aj pre nás
                prínosom.
              </p>
              <div className="pt-2">
                <p>S úctou</p>
                <p className="mt-3 font-semibold text-forest">
                  Ing. Marián Sihelník
                </p>
                <p className="text-[0.98rem] text-ink-muted">
                  predseda predstavenstva OSBD Čadca
                </p>
              </div>
            </div>
          </article>

          <div className="mt-10 sm:mt-12">
            <h2 className="text-[1.15rem] font-semibold tracking-tight text-forest sm:text-[1.25rem]">
              Dohoda na stiahnutie
            </h2>
            <a
              href={PDF_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center gap-4 rounded-xl border border-forest/12 bg-warm-white px-5 py-4 transition-[border-color,background-color,box-shadow] duration-200 hover:border-forest/28 hover:bg-white hover:shadow-[0_10px_28px_-20px_rgba(10,56,44,0.45)] sm:px-6 sm:py-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-forest/8 text-forest">
                <FileText className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.02rem] font-semibold leading-snug text-ink transition-colors group-hover:text-forest sm:text-[1.05rem]">
                  Dohoda o elektronickom doručovaní dokumentov – Otvoriť PDF
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
