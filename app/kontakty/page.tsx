import type { Metadata } from "next";
import { HashScroll } from "@/components/navigation/HashScroll";
import { Reveal } from "@/components/motion/Reveal";
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
      <section className="border-b border-forest/8 pt-[calc(var(--header-h)+2rem)] pb-10 md:pb-12">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow text-forest">OSBD Čadca</p>
            <h1 className="mt-2 font-semibold tracking-[-0.02em] text-forest text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.12]">
              {contactSection.headline}
            </h1>
            <p className="mt-3.5 max-w-xl text-[0.98rem] leading-relaxed text-ink-muted">
              {contactSection.support}
            </p>
          </Reveal>

          <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
            <StaffDirectory />
            <FaultContacts />
          </div>
        </div>
      </section>

      <LocationMap />
    </main>
  );
}
