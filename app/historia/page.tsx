import type { Metadata } from "next";
import { HistoriaProse } from "@/components/sections/HistoriaProse";
import { SubpageHero } from "@/components/sections/SubpageHero";

export const metadata: Metadata = {
  title: "História OSBD Čadca",
  description: "História bytového družstevníctva a OSBD Čadca na Kysuciach.",
};

export default function HistoriaPage() {
  return (
    <main id="obsah" className="bg-ivory">
      <SubpageHero
        title="História OSBD Čadca"
        headingId="historia-hero-heading"
      />

      <section className="border-b border-forest/8 pt-8 pb-12 sm:pt-9 sm:pb-14 md:pt-10 md:pb-16">
        <div className="mx-auto w-full max-w-[48rem] px-5 sm:px-6 lg:px-8">
          <HistoriaProse />
        </div>
      </section>
    </main>
  );
}
