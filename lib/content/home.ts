import {
  loadHomepage,
  loadKontakty,
  loadPublicAktuality,
  loadSite,
} from "@/lib/content/load";

export function getBrand() {
  return loadSite().brand;
}

export function getHero() {
  return loadHomepage().hero;
}

export function getQuickAccess() {
  return loadHomepage().quickAccess;
}

export function getWhyOsbd() {
  return loadHomepage().whyOsbd;
}

export function getServices() {
  return loadHomepage().services;
}

export function getNoticesSection() {
  const aktuality = loadPublicAktuality();
  return {
    headline: aktuality.headline,
    support: aktuality.support,
    items: aktuality.items,
  };
}

export function getContactSection() {
  const kontakty = loadKontakty();
  return {
    id: "kontakt" as const,
    headline: kontakty.headline,
    support: kontakty.support,
    contact: loadSite().contact,
    officeHours: kontakty.officeHours,
    officeHoursAnchor: "strankove-hodiny" as const,
  };
}

export const brand = getBrand();
export const hero = getHero();
export const quickAccess = getQuickAccess();
export const whyOsbd = getWhyOsbd();
export const services = getServices();
export const noticesSection = getNoticesSection();
export const contactSection = getContactSection();

export const aboutSection = {
  id: "o-nas" as const,
  eyebrow: loadHomepage().about.eyebrow,
  headline: loadHomepage().about.leadTitle,
  paragraphs: loadHomepage().about.introParagraphs,
  link: loadHomepage().about.link,
  imageSlot: {
    id: "about-osbd-hq",
    label: "about-osbd-hq",
    description:
      "Fotografia sídla OSBD Čadca alebo autentická fotografia zamestnancov",
    aspect: "portrait" as const,
  },
};

export const imageSlots = [
  hero.imageSlot,
  aboutSection.imageSlot,
  services.imageSlot,
] as const;
