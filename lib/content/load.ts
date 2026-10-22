import {
  contentSchemas,
  type AktualityContent,
  type DokumentyTlacivaContent,
  type DomovyPoriadokContent,
  type ElektronickeDorucovanieContent,
  type HistoriaContent,
  type HomepageContent,
  type KablovaTvContent,
  type KontaktyContent,
  type OrganyContent,
  type SiteContent,
  type StanovyContent,
} from "@/lib/content/schema";

import siteJson from "../../content/site.json";
import homepageJson from "../../content/homepage.json";
import aktualityJson from "../../content/aktuality.json";
import kontaktyJson from "../../content/kontakty.json";
import organyJson from "../../content/organy.json";
import historiaJson from "../../content/historia.json";
import stanovyJson from "../../content/stanovy.json";
import dokumentyTlacivaJson from "../../content/dokumenty-tlaciva.json";
import domovyPoriadokJson from "../../content/domovy-poriadok.json";
import kablovaTvJson from "../../content/kablova-tv.json";
import elektronickeDorucovanieJson from "../../content/elektronicke-dorucovanie.json";

/**
 * Public content is imported from deployed JSON (bundled at build).
 * No GitHub calls on visitor requests. After CMS save + Vercel redeploy,
 * new JSON is baked into the next build.
 */
export function loadSite(): SiteContent {
  return contentSchemas["site.json"].parse(siteJson);
}

export function loadHomepage(): HomepageContent {
  return contentSchemas["homepage.json"].parse(homepageJson);
}

export function loadAktuality(): AktualityContent {
  return contentSchemas["aktuality.json"].parse(aktualityJson);
}

export function loadPublicAktuality(): AktualityContent {
  const data = loadAktuality();
  return {
    ...data,
    items: data.items.filter((item) => item.active),
  };
}

export function loadKontakty(): KontaktyContent {
  return contentSchemas["kontakty.json"].parse(kontaktyJson);
}

export function loadOrgany(): OrganyContent {
  return contentSchemas["organy.json"].parse(organyJson);
}

export function loadHistoria(): HistoriaContent {
  return contentSchemas["historia.json"].parse(historiaJson);
}

export function loadStanovy(): StanovyContent {
  return contentSchemas["stanovy.json"].parse(stanovyJson);
}

export function loadDokumentyTlaciva(): DokumentyTlacivaContent {
  return contentSchemas["dokumenty-tlaciva.json"].parse(dokumentyTlacivaJson);
}

export function loadDomovyPoriadok(): DomovyPoriadokContent {
  return contentSchemas["domovy-poriadok.json"].parse(domovyPoriadokJson);
}

export function loadKablovaTv(): KablovaTvContent {
  return contentSchemas["kablova-tv.json"].parse(kablovaTvJson);
}

export function loadElektronickeDorucovanie(): ElektronickeDorucovanieContent {
  return contentSchemas["elektronicke-dorucovanie.json"].parse(
    elektronickeDorucovanieJson,
  );
}
