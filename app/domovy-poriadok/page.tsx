import type { Metadata } from "next";
import { PdfDocumentRow } from "@/components/documents/PdfDocumentRow";
import { SubpageHero } from "@/components/sections/SubpageHero";
import { domovyPoriadokDocument } from "@/lib/content/documents";

export const metadata: Metadata = {
  title: "Domový poriadok",
  description: "Domový poriadok OSBD Čadca.",
};

export default function DomovyPoriadokPage() {
  return (
    <main id="obsah" className="bg-ivory">
      <SubpageHero
        title="Domový poriadok"
        headingId="domovy-poriadok-hero-heading"
      />

      <section className="border-b border-forest/8 pt-8 pb-10 sm:pt-9 sm:pb-12 md:pt-10 md:pb-14">
        <div className="mx-auto w-full max-w-[48rem] px-5 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(1.2rem,2.2vw,1.5rem)] font-semibold tracking-tight text-forest">
            Domový poriadok OSBD Čadca
          </h2>
          <div className="mt-4 sm:mt-5">
            <PdfDocumentRow
              document={domovyPoriadokDocument}
              actionLabel="Otvoriť PDF"
              prominent
            />
          </div>
        </div>
      </section>
    </main>
  );
}
