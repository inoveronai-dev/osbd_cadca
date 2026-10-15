import { SubpageHero } from "@/components/sections/SubpageHero";
import { contactSection } from "@/lib/content/home";

export function ContactPageHero() {
  return (
    <SubpageHero
      title={contactSection.headline}
      support={contactSection.support}
      headingId="kontakty-hero-heading"
    />
  );
}
