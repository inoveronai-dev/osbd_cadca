import { SageAtmosphere } from "@/components/layout/SageAtmosphere";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { LatestNotices } from "@/components/sections/LatestNotices";
import { MainAdvantages } from "@/components/sections/MainAdvantages";
import { ManagementOffer } from "@/components/sections/ManagementOffer";
import { QuickAccess } from "@/components/sections/QuickAccess";
import { Services } from "@/components/sections/Services";
import { TrustStatement } from "@/components/sections/TrustStatement";
import { WhyOsbd } from "@/components/sections/WhyOsbd";

export default function HomePage() {
  return (
    <main id="obsah">
      <Hero />
      <QuickAccess />
      <About />
      <SageAtmosphere>
        <WhyOsbd />
        <Services />
      </SageAtmosphere>
      <ManagementOffer />
      <TrustStatement />
      <MainAdvantages />
      <LatestNotices />
      <Contact />
    </main>
  );
}
