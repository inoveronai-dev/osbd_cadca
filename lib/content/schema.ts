import { z } from "zod";

export const pdfDocumentSchema = z.object({
  title: z.string().min(1),
  href: z.string().min(1),
  meta: z.string().optional(),
});

export const documentGroupSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  defaultOpen: z.boolean().optional(),
  documents: z.array(pdfDocumentSchema),
});

export const noticeAttachmentSchema = z.object({
  title: z.string().min(1),
  href: z.string().min(1),
});

export const noticePdfSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("pdf"),
  title: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  pdfHref: z.string().min(1),
  active: z.boolean(),
});

export const noticeArticleSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("article"),
  title: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  body: z.array(z.string()),
  attachments: z.array(noticeAttachmentSchema).optional(),
  linkifyPhones: z.boolean().optional(),
  active: z.boolean(),
});

export const noticeSchema = z.discriminatedUnion("kind", [
  noticePdfSchema,
  noticeArticleSchema,
]);

export const aktualitySchema = z.object({
  headline: z.string().min(1),
  support: z.string().min(1),
  items: z.array(noticeSchema),
});

export const siteSchema = z.object({
  brand: z.object({
    name: z.string().min(1),
    legalName: z.string().min(1),
    positioning: z.string().min(1),
  }),
  contact: z.object({
    orgName: z.string().min(1),
    phoneDisplay: z.string().min(1),
    phoneHref: z.string().min(1),
    email: z.string().email(),
    ico: z.string().min(1),
    addressLines: z.tuple([z.string(), z.string()]),
    addressFull: z.string().min(1),
    mapsUrl: z.string().min(1),
    mapsLat: z.number(),
    mapsLng: z.number(),
    mapsZoom: z.number().int().positive(),
  }),
  emergencyCta: z.object({
    label: z.string().min(1),
    phoneDisplay: z.string().min(1),
    href: z.string().min(1),
  }),
  map: z.object({
    mapsUrl: z.string().min(1),
    mapsLat: z.number(),
    mapsLng: z.number(),
    mapsZoom: z.number().int().positive(),
  }),
});

export const officeHoursSchema = z.object({
  status: z.literal("ready"),
  title: z.string().min(1),
  schedule: z.array(
    z.object({
      day: z.string().min(1),
      hours: z.union([z.string(), z.array(z.string())]),
    }),
  ),
  lunchBreak: z.object({
    title: z.string().min(1),
    detail: z.string().min(1),
  }),
  extras: z.array(
    z.object({
      title: z.string().min(1),
      detail: z.string().min(1),
    }),
  ),
  emergency: z.object({
    title: z.string().min(1),
    lines: z.array(z.string()),
  }),
});

export const staffPersonSchema = z.object({
  name: z.string().min(1),
  room: z.string().optional(),
  phones: z.array(z.string()).optional(),
  emails: z.array(z.string()).optional(),
});

export const staffGroupSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  people: z.array(staffPersonSchema),
});

export const faultBlockSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  person: z.string().optional(),
  phones: z.array(z.string()).optional(),
  emails: z.array(z.string()).optional(),
  phoneNotes: z.array(z.string()).optional(),
  providers: z
    .array(
      z.object({
        name: z.string().min(1),
        phones: z.array(z.string()).optional(),
        note: z.string().optional(),
      }),
    )
    .optional(),
  schedule: z
    .array(z.object({ day: z.string(), hours: z.string() }))
    .optional(),
  primary: z.boolean().optional(),
  icon: z.enum([
    "droplets",
    "tv",
    "elevator",
    "waves",
    "flame",
    "zap",
    "gas",
    "key",
  ]),
});

export const kontaktySchema = z.object({
  headline: z.string().min(1),
  support: z.string().min(1),
  officeHours: officeHoursSchema,
  staffDirectory: z.object({
    sectionId: z.string().min(1),
    headline: z.string().min(1),
    groups: z.array(staffGroupSchema),
  }),
  faultContacts: z.object({
    sectionId: z.string().min(1),
    headline: z.string().min(1),
    support: z.string().min(1),
    blocks: z.array(faultBlockSchema),
  }),
});

export const organySchema = z.object({
  predstavenstvo: z.array(
    z.object({ name: z.string().min(1), role: z.string().min(1) }),
  ),
  kontrolnaKomisia: z.array(
    z.object({ name: z.string().min(1), role: z.string().min(1) }),
  ),
  closingText: z.string().min(1),
});

export const historiaSchema = z.object({
  paragraphs: z.array(z.string().min(1)),
});

export const stanovySchema = z.object({
  groups: z.array(documentGroupSchema),
});

export const dokumentyTlacivaSchema = z.object({
  groups: z.array(documentGroupSchema),
});

export const domovyPoriadokSchema = z.object({
  document: pdfDocumentSchema,
});

export const kablovaTvSchema = z.object({
  intro: z.object({
    heading: z.string().min(1),
    subheading: z.string().min(1),
    paragraphs: z.array(z.string()),
  }),
  benefitsTitle: z.string().min(1),
  benefits: z.array(z.string()),
  documentGroups: z.array(documentGroupSchema),
});

export const homepageSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    support: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() }),
    proof: z.array(
      z.union([
        z.object({
          value: z.number(),
          suffix: z.string().optional(),
          label: z.string(),
          format: z.string().optional(),
        }),
        z.object({
          valueLabel: z.string(),
          label: z.string(),
        }),
      ]),
    ),
    imageSlot: z.object({
      id: z.string(),
      label: z.string(),
      description: z.string(),
      aspect: z.string(),
    }),
  }),
  quickAccess: z.object({
    headline: z.string(),
    support: z.string(),
    items: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        href: z.string().nullable(),
        status: z.enum(["pending", "ready", "anchor"]).optional(),
        icon: z.enum(["megaphone", "file", "wrench", "phone"]),
      }),
    ),
  }),
  about: z.object({
    id: z.string(),
    eyebrow: z.string(),
    leadTitle: z.string(),
    introParagraphs: z.array(z.string()),
    bodyParagraphs: z.array(z.string()),
    closingStatement: z.string(),
    link: z.object({
      label: z.string(),
      href: z.string().nullable(),
      status: z.enum(["pending", "ready", "anchor"]),
    }),
  }),
  whyOsbd: z.object({
    headline: z.string(),
    intro: z.string(),
    benefits: z.array(
      z.object({
        number: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
  services: z.object({
    id: z.string(),
    headline: z.string(),
    categories: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.object({ src: z.string(), alt: z.string() }),
      }),
    ),
    imageSlot: z.object({
      id: z.string(),
      label: z.string(),
      description: z.string(),
      aspect: z.string(),
    }),
  }),
  managementOffer: z.object({
    id: z.string(),
    headline: z.string(),
    subheading: z.string(),
    paragraphs: z.array(z.string()),
  }),
  mainAdvantages: z.object({
    id: z.string(),
    headline: z.string(),
    items: z.array(z.string()),
  }),
  trustStatement: z.object({
    sentence: z.string(),
  }),
});

export const contentSchemas = {
  "site.json": siteSchema,
  "homepage.json": homepageSchema,
  "aktuality.json": aktualitySchema,
  "kontakty.json": kontaktySchema,
  "organy.json": organySchema,
  "historia.json": historiaSchema,
  "stanovy.json": stanovySchema,
  "dokumenty-tlaciva.json": dokumentyTlacivaSchema,
  "domovy-poriadok.json": domovyPoriadokSchema,
  "kablova-tv.json": kablovaTvSchema,
} as const;

export type SiteContent = z.infer<typeof siteSchema>;
export type HomepageContent = z.infer<typeof homepageSchema>;
export type AktualityContent = z.infer<typeof aktualitySchema>;
export type KontaktyContent = z.infer<typeof kontaktySchema>;
export type OrganyContent = z.infer<typeof organySchema>;
export type HistoriaContent = z.infer<typeof historiaSchema>;
export type StanovyContent = z.infer<typeof stanovySchema>;
export type DokumentyTlacivaContent = z.infer<typeof dokumentyTlacivaSchema>;
export type DomovyPoriadokContent = z.infer<typeof domovyPoriadokSchema>;
export type KablovaTvContent = z.infer<typeof kablovaTvSchema>;
export type Notice = z.infer<typeof noticeSchema>;
