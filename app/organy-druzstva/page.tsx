import type { Metadata } from "next";
import { OrganDirectory } from "@/components/sections/OrganDirectory";
import { SubpageHero } from "@/components/sections/SubpageHero";
import {
  kontrolnaKomisia,
  organsClosingText,
  predstavenstvo,
} from "@/lib/content/organs";

export const metadata: Metadata = {
  title: "Orgány družstva",
  description: "Predstavenstvo a kontrolná komisia OSBD Čadca.",
};

export default function OrganyDruzstvaPage() {
  return (
    <main id="obsah" className="bg-ivory">
      <SubpageHero title="Orgány družstva" headingId="organy-hero-heading" />

      <section className="border-b border-forest/8 pt-8 pb-10 sm:pt-9 sm:pb-12 md:pt-10 md:pb-14">
        <div className="mx-auto w-full max-w-[48rem] space-y-11 px-5 sm:space-y-12 sm:px-6 lg:px-8">
          <OrganDirectory
            title="PREDSTAVENSTVO OSBD Čadca"
            members={predstavenstvo}
            headingId="predstavenstvo-heading"
          />

          <OrganDirectory
            title="KONTROLNÁ KOMISIA OSBD Čadca"
            members={kontrolnaKomisia}
            headingId="kontrolna-komisia-heading"
          />

          <p className="border-t border-forest/10 pt-7 text-[0.98rem] leading-relaxed text-ink-muted sm:pt-8 sm:text-[1.02rem]">
            {organsClosingText}
          </p>
        </div>
      </section>
    </main>
  );
}
