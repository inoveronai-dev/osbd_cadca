import type { Metadata } from "next";
import { Check } from "lucide-react";
import { DocumentCategory } from "@/components/documents/DocumentCategory";
import { SubpageHero } from "@/components/sections/SubpageHero";
import {
  kablovaBenefits,
  kablovaDocumentGroups,
} from "@/lib/content/documents";

export const metadata: Metadata = {
  title: "Káblová TV a internet",
  description:
    "Digitálna televízia a internet od OSBD Čadca – OTT služba, cenníky a dokumenty.",
};

export default function KablovaTvInternetPage() {
  return (
    <main id="obsah" className="bg-ivory">
      <SubpageHero
        title="Káblová TV a internet"
        headingId="kablova-hero-heading"
      />

      <section className="border-b border-forest/8 pt-8 pb-10 sm:pt-9 sm:pb-12 md:pt-10 md:pb-14">
        <div className="mx-auto w-full max-w-[52rem] space-y-11 px-5 sm:space-y-12 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-[clamp(1.35rem,2.8vw,1.85rem)] font-semibold tracking-tight text-forest">
              DIGITÁLNA TELEVÍZIA od OSBD Čadca
            </h2>
            <h3 className="mt-3 text-[1.05rem] font-semibold tracking-tight text-ink sm:text-[1.12rem]">
              „OTT SLUŽBA“ – televízia cez internet
            </h3>
            <div className="mt-4 max-w-[42rem] space-y-3.5 text-[0.98rem] leading-relaxed text-ink-muted sm:mt-5 sm:text-[1.02rem]">
              <p>
                OSBD Čadca Vám prináša cez internet Vaše obľúbené televízne
                stanice bez ohľadu na to, kde sa práve nachádzate.
              </p>
              <p className="font-semibold text-ink">Čo k tomu potrebujete?</p>
              <p>
                Stačí mať len internetové pripojenie, mobilné alebo pevné a
                zariadenie, na ktorom budete televízne programy pozerať,
                napríklad Váš smartfón, tablet alebo smart televízor.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[clamp(1.2rem,2.2vw,1.5rem)] font-semibold tracking-tight text-forest">
              Výhody televízie cez internet
            </h2>
            <ul className="mt-4 divide-y divide-forest/8 border-y border-forest/10">
              {kablovaBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-3 py-3 text-[0.95rem] leading-relaxed text-ink sm:gap-3.5 sm:py-3.5 sm:text-[0.98rem]"
                >
                  <span
                    className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-forest/8 text-forest"
                    aria-hidden
                  >
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1 border-t border-forest/10 pt-8 sm:pt-9">
            {kablovaDocumentGroups.map((group) => (
              <DocumentCategory
                key={group.id}
                group={group}
                actionLabel="Otvoriť PDF"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
