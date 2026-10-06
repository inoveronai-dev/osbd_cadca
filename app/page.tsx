import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { LatestNotices } from "@/components/sections/LatestNotices";
import { ManagementCta } from "@/components/sections/ManagementCta";
import { QuickAccess } from "@/components/sections/QuickAccess";
import { Services } from "@/components/sections/Services";
import { WhyOsbd } from "@/components/sections/WhyOsbd";

export default function HomePage() {
  return (
    <main id="obsah">
      <Hero />
      <QuickAccess />
      <About />
      <WhyOsbd />
      <Services />
      <ManagementCta />
      <LatestNotices />
      <Contact />
    </main>
  );
}
