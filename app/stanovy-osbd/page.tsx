import type { Metadata } from "next";
import { DocumentCategory } from "@/components/documents/DocumentCategory";
import { SubpageHero } from "@/components/sections/SubpageHero";
import { stanovyGroups } from "@/lib/content/documents";

export const metadata: Metadata = {
  title: "Stanovy OSBD",
  description: "Stanovy, rokovací poriadok a volebný poriadok OSBD Čadca.",
};

export default function StanovyOsbdPage() {
  return (
    <main id="obsah" className="bg-ivory">
      <SubpageHero title="Stanovy OSBD" headingId="stanovy-hero-heading" />

      <section className="border-b border-forest/8 pt-8 pb-10 sm:pt-9 sm:pb-12 md:pt-10 md:pb-14">
        <div className="mx-auto w-full max-w-[48rem] space-y-9 px-5 sm:space-y-10 sm:px-6 lg:px-8">
          {stanovyGroups.map((group) => (
            <DocumentCategory
              key={group.id}
              group={group}
              collapsible={false}
              actionLabel="Zobraziť PDF"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
