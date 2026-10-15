import type { Metadata } from "next";
import { HashScroll } from "@/components/navigation/HashScroll";
import { ContactOfficeHoursCompact } from "@/components/sections/ContactOfficeHoursCompact";
import { ContactPageHero } from "@/components/sections/ContactPageHero";
import { FaultContacts } from "@/components/sections/FaultContacts";
import { LocationMap } from "@/components/sections/LocationMap";
import { StaffDirectory } from "@/components/sections/StaffDirectory";
import { contactSection } from "@/lib/content/home";

export const metadata: Metadata = {
  title: "Kontakty",
  description: contactSection.support,
};

export default function KontaktyPage() {
  return (
    <main id="obsah" className="bg-ivory">
      <HashScroll />
      <ContactPageHero />
      <ContactOfficeHoursCompact />

      <section className="border-b border-forest/8 pt-9 pb-5 sm:pt-10 sm:pb-6 md:pt-11 md:pb-7">
        <div className="container-site space-y-11 md:space-y-14">
          <StaffDirectory />
          <div className="border-t border-forest/10 pt-10 md:pt-12">
            <FaultContacts />
          </div>
        </div>
      </section>

      <LocationMap className="border-t border-forest/8 bg-warm-white pt-6 pb-[clamp(3.25rem,6vw,4.75rem)] sm:pt-7 md:pt-8" />
    </main>
  );
}
