import type { Metadata } from "next";
import { AktualityFeed } from "@/components/sections/AktualityFeed";
import { SubpageHero } from "@/components/sections/SubpageHero";
import { noticesSection } from "@/lib/content/home";

export const metadata: Metadata = {
  title: "Aktuality",
  description: noticesSection.support,
};

export default function AktualityPage() {
  return (
    <main id="obsah" className="bg-ivory">
      <SubpageHero
        title={noticesSection.headline}
        support={noticesSection.support}
        headingId="aktuality-hero-heading"
      />

      <section className="border-b border-forest/8 pt-8 pb-10 sm:pt-9 sm:pb-12 md:pt-10 md:pb-14">
        <div className="mx-auto w-full max-w-[72rem] px-5 sm:px-6 lg:px-8">
          <AktualityFeed notices={noticesSection.items} />
        </div>
      </section>
    </main>
  );
}
