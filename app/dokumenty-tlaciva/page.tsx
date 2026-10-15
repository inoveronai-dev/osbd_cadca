import type { Metadata } from "next";
import { DocumentCategory } from "@/components/documents/DocumentCategory";
import { SubpageHero } from "@/components/sections/SubpageHero";
import { dokumentyTlacivaGroups } from "@/lib/content/documents";

export const metadata: Metadata = {
  title: "Dokumenty a tlačivá",
  description: "Dokumenty, tlačivá a formuláre OSBD Čadca.",
};

export default function DokumentyTlacivaPage() {
  return (
    <main id="obsah" className="bg-ivory">
      <SubpageHero
        title="Dokumenty a tlačivá"
        headingId="dokumenty-hero-heading"
      />

      <section className="border-b border-forest/8 pt-8 pb-10 sm:pt-9 sm:pb-12 md:pt-10 md:pb-14">
        <div className="mx-auto w-full max-w-[52rem] space-y-1 px-5 sm:px-6 lg:px-8">
          {dokumentyTlacivaGroups.map((group) => (
            <DocumentCategory
              key={group.id}
              group={group}
              actionLabel="Otvoriť PDF"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
