"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { ImageAttachment } from "@/components/admin/ImageAttachment";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { HomepageContent } from "@/lib/content/schema";

const DEFAULT_HERO_SRC = "/images/hero-cadca-kysuce.png";
const DEFAULT_ABOUT_SRC = "/images/about-osbd-hq.png";
const DEFAULT_BANNER_SRC = "/images/banner-elektronicke-dorucovanie.png";
const DEFAULT_SERVICE_SRCS = [
  "/images/service-technicka.png",
  "/images/service-ekonomicka.png",
  "/images/service-obnova.png",
  "/images/service-poradenstvo.png",
] as const;

export default function AdminUvodnaStrankaPage() {
  const editor = useContentEditor<HomepageContent>("homepage.json");
  const data = editor.data;
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  async function uploadImage(options: {
    key: string;
    file: File;
    baseName: string;
    apply: (url: string) => void;
  }) {
    setUploadingKey(options.key);
    try {
      const uploaded = await editor.uploadFile({
        file: options.file,
        kind: "image",
        folder: "homepage",
        baseName: options.baseName,
      });
      if (!uploaded) return;
      options.apply(uploaded.url);
    } finally {
      setUploadingKey(null);
    }
  }

  return (
    <AdminShell title="Úvodná stránka">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <div className="space-y-5">
          <p className="text-[0.9rem] text-ink-muted">
            Upravujte texty a fotografie úvodnej stránky. Fotografie môžete
            nahrať, vymeniť alebo vrátiť na pôvodné.
          </p>

          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">Hero</h2>
            <div className="mt-3 grid gap-3">
              <Field label="Malý nadpis nad hlavným textom">
                <input
                  className={inputClass}
                  value={data.hero.eyebrow}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      hero: { ...data.hero, eyebrow: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Nadpis">
                <input
                  className={inputClass}
                  value={data.hero.headline}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      hero: { ...data.hero, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Podpora">
                <textarea
                  className={textareaClass}
                  value={data.hero.support}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      hero: { ...data.hero, support: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="CTA 1 — text">
                <input
                  className={inputClass}
                  value={data.hero.primaryCta.label}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      hero: {
                        ...data.hero,
                        primaryCta: {
                          ...data.hero.primaryCta,
                          label: e.target.value,
                        },
                      },
                    })
                  }
                />
              </Field>
              <Field label="CTA 2 — text">
                <input
                  className={inputClass}
                  value={data.hero.secondaryCta.label}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      hero: {
                        ...data.hero,
                        secondaryCta: {
                          ...data.hero.secondaryCta,
                          label: e.target.value,
                        },
                      },
                    })
                  }
                />
              </Field>
              <Field label="Popis hero fotky (alt)">
                <input
                  className={inputClass}
                  value={data.hero.imageSlot.description}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      hero: {
                        ...data.hero,
                        imageSlot: {
                          ...data.hero.imageSlot,
                          description: e.target.value,
                        },
                      },
                    })
                  }
                />
              </Field>
              <ImageAttachment
                label="Hero fotografia"
                helper="Veľká fotografia na pozadí úvodného banneru."
                src={data.hero.imageSlot.src}
                uploading={uploadingKey === "hero"}
                onUpload={(file) =>
                  void uploadImage({
                    key: "hero",
                    file,
                    baseName: "hero",
                    apply: (url) =>
                      editor.setData({
                        ...data,
                        hero: {
                          ...data.hero,
                          imageSlot: { ...data.hero.imageSlot, src: url },
                        },
                      }),
                  })
                }
                onClear={() =>
                  editor.setData({
                    ...data,
                    hero: {
                      ...data.hero,
                      imageSlot: {
                        ...data.hero.imageSlot,
                        src: DEFAULT_HERO_SRC,
                      },
                    },
                  })
                }
                clearLabel="Obnoviť pôvodnú fotografiu"
              />
            </div>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Banner elektronického doručovania
            </h2>
            <div className="mt-3 grid gap-3">
              <Field label="Popis fotky (alt)">
                <input
                  className={inputClass}
                  value={data.electronicDeliveryBanner.alt}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      electronicDeliveryBanner: {
                        ...data.electronicDeliveryBanner,
                        alt: e.target.value,
                      },
                    })
                  }
                />
              </Field>
              <ImageAttachment
                label="Banner fotografia"
                src={data.electronicDeliveryBanner.src}
                uploading={uploadingKey === "banner"}
                onUpload={(file) =>
                  void uploadImage({
                    key: "banner",
                    file,
                    baseName: "banner-elektronicke-dorucovanie",
                    apply: (url) =>
                      editor.setData({
                        ...data,
                        electronicDeliveryBanner: {
                          ...data.electronicDeliveryBanner,
                          src: url,
                        },
                      }),
                  })
                }
                onClear={() =>
                  editor.setData({
                    ...data,
                    electronicDeliveryBanner: {
                      ...data.electronicDeliveryBanner,
                      src: DEFAULT_BANNER_SRC,
                    },
                  })
                }
                clearLabel="Obnoviť pôvodnú fotografiu"
              />
            </div>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Rýchly prístup (4 karty)
            </h2>
            <div className="mt-3 grid gap-3">
              <Field label="Nadpis sekcie">
                <input
                  className={inputClass}
                  value={data.quickAccess.headline}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      quickAccess: {
                        ...data.quickAccess,
                        headline: e.target.value,
                      },
                    })
                  }
                />
              </Field>
              {data.quickAccess.items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid gap-2 rounded-md border border-forest/8 bg-[#faf9f6] p-3 sm:grid-cols-2"
                >
                  <Field label="Názov">
                    <input
                      className={inputClass}
                      value={item.title}
                      onChange={(e) => {
                        const items = [...data.quickAccess.items];
                        items[index] = { ...item, title: e.target.value };
                        editor.setData({
                          ...data,
                          quickAccess: { ...data.quickAccess, items },
                        });
                      }}
                    />
                  </Field>
                  <Field label="Popis">
                    <input
                      className={inputClass}
                      value={item.description}
                      onChange={(e) => {
                        const items = [...data.quickAccess.items];
                        items[index] = {
                          ...item,
                          description: e.target.value,
                        };
                        editor.setData({
                          ...data,
                          quickAccess: { ...data.quickAccess, items },
                        });
                      }}
                    />
                  </Field>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">O nás</h2>
            <Field label="Malý nadpis nad hlavným textom" className="mt-3">
              <input
                className={inputClass}
                value={data.about.eyebrow}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    about: { ...data.about, eyebrow: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Nadpis" className="mt-3">
              <input
                className={inputClass}
                value={data.about.leadTitle}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    about: { ...data.about, leadTitle: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Úvodné odseky" className="mt-3">
              <textarea
                className={textareaClass}
                value={data.about.introParagraphs.join("\n\n")}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    about: {
                      ...data.about,
                      introParagraphs: e.target.value
                        .split(/\n\s*\n/)
                        .map((p) => p.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </Field>
            <Field label="Ďalšie odseky" className="mt-3">
              <textarea
                className={textareaClass}
                value={data.about.bodyParagraphs.join("\n\n")}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    about: {
                      ...data.about,
                      bodyParagraphs: e.target.value
                        .split(/\n\s*\n/)
                        .map((p) => p.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </Field>
            <Field label="Popis fotky (alt)" className="mt-3">
              <input
                className={inputClass}
                value={data.about.image.alt}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    about: {
                      ...data.about,
                      image: { ...data.about.image, alt: e.target.value },
                    },
                  })
                }
              />
            </Field>
            <div className="mt-3">
              <ImageAttachment
                label="Fotografia pri texte O nás"
                src={data.about.image.src}
                uploading={uploadingKey === "about"}
                onUpload={(file) =>
                  void uploadImage({
                    key: "about",
                    file,
                    baseName: "about",
                    apply: (url) =>
                      editor.setData({
                        ...data,
                        about: {
                          ...data.about,
                          image: { ...data.about.image, src: url },
                        },
                      }),
                  })
                }
                onClear={() =>
                  editor.setData({
                    ...data,
                    about: {
                      ...data.about,
                      image: {
                        ...data.about.image,
                        src: DEFAULT_ABOUT_SRC,
                      },
                    },
                  })
                }
                clearLabel="Obnoviť pôvodnú fotografiu"
              />
            </div>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Prečo OSBD (6)
            </h2>
            <Field label="Nadpis" className="mt-3">
              <input
                className={inputClass}
                value={data.whyOsbd.headline}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    whyOsbd: { ...data.whyOsbd, headline: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Intro" className="mt-3">
              <textarea
                className={textareaClass}
                value={data.whyOsbd.intro}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    whyOsbd: { ...data.whyOsbd, intro: e.target.value },
                  })
                }
              />
            </Field>
            <ul className="mt-3 space-y-3">
              {data.whyOsbd.benefits.map((benefit, index) => (
                <li
                  key={benefit.number}
                  className="grid gap-2 rounded-md border border-forest/8 bg-[#faf9f6] p-3 sm:grid-cols-2"
                >
                  <Field label="Názov">
                    <input
                      className={inputClass}
                      value={benefit.title}
                      onChange={(e) => {
                        const benefits = [...data.whyOsbd.benefits];
                        benefits[index] = {
                          ...benefit,
                          title: e.target.value,
                        };
                        editor.setData({
                          ...data,
                          whyOsbd: { ...data.whyOsbd, benefits },
                        });
                      }}
                    />
                  </Field>
                  <Field label="Popis">
                    <input
                      className={inputClass}
                      value={benefit.description}
                      onChange={(e) => {
                        const benefits = [...data.whyOsbd.benefits];
                        benefits[index] = {
                          ...benefit,
                          description: e.target.value,
                        };
                        editor.setData({
                          ...data,
                          whyOsbd: { ...data.whyOsbd, benefits },
                        });
                      }}
                    />
                  </Field>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Služby (4)
            </h2>
            <Field label="Nadpis sekcie" className="mt-3">
              <input
                className={inputClass}
                value={data.services.headline}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    services: { ...data.services, headline: e.target.value },
                  })
                }
              />
            </Field>
            <ul className="mt-3 space-y-3">
              {data.services.categories.map((cat, index) => (
                <li
                  key={`${cat.title}-${index}`}
                  className="rounded-md border border-forest/8 bg-[#faf9f6] p-3"
                >
                  <Field label="Názov">
                    <input
                      className={inputClass}
                      value={cat.title}
                      onChange={(e) => {
                        const categories = [...data.services.categories];
                        categories[index] = { ...cat, title: e.target.value };
                        editor.setData({
                          ...data,
                          services: { ...data.services, categories },
                        });
                      }}
                    />
                  </Field>
                  <Field label="Popis" className="mt-2">
                    <textarea
                      className={textareaClass}
                      value={cat.description}
                      onChange={(e) => {
                        const categories = [...data.services.categories];
                        categories[index] = {
                          ...cat,
                          description: e.target.value,
                        };
                        editor.setData({
                          ...data,
                          services: { ...data.services, categories },
                        });
                      }}
                    />
                  </Field>
                  <Field label="Popis fotky (alt)" className="mt-2">
                    <input
                      className={inputClass}
                      value={cat.image.alt}
                      onChange={(e) => {
                        const categories = [...data.services.categories];
                        categories[index] = {
                          ...cat,
                          image: { ...cat.image, alt: e.target.value },
                        };
                        editor.setData({
                          ...data,
                          services: { ...data.services, categories },
                        });
                      }}
                    />
                  </Field>
                  <div className="mt-2">
                    <ImageAttachment
                      label={`Fotografia — ${cat.title}`}
                      src={cat.image.src}
                      uploading={uploadingKey === `service-${index}`}
                      onUpload={(file) =>
                        void uploadImage({
                          key: `service-${index}`,
                          file,
                          baseName: cat.title || `service-${index}`,
                          apply: (url) => {
                            const categories = [...data.services.categories];
                            categories[index] = {
                              ...cat,
                              image: { ...cat.image, src: url },
                            };
                            editor.setData({
                              ...data,
                              services: { ...data.services, categories },
                            });
                          },
                        })
                      }
                      onClear={() => {
                        const categories = [...data.services.categories];
                        categories[index] = {
                          ...cat,
                          image: {
                            ...cat.image,
                            src:
                              DEFAULT_SERVICE_SRCS[index] ??
                              DEFAULT_SERVICE_SRCS[0],
                          },
                        };
                        editor.setData({
                          ...data,
                          services: { ...data.services, categories },
                        });
                      }}
                      clearLabel="Obnoviť pôvodnú fotografiu"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Ponuka správy
            </h2>
            <Field label="Nadpis" className="mt-3">
              <input
                className={inputClass}
                value={data.managementOffer.headline}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    managementOffer: {
                      ...data.managementOffer,
                      headline: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Podnadpis" className="mt-3">
              <input
                className={inputClass}
                value={data.managementOffer.subheading}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    managementOffer: {
                      ...data.managementOffer,
                      subheading: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Odseky" className="mt-3">
              <textarea
                className={textareaClass}
                value={data.managementOffer.paragraphs.join("\n\n")}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    managementOffer: {
                      ...data.managementOffer,
                      paragraphs: e.target.value
                        .split(/\n\s*\n/)
                        .map((p) => p.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </Field>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Hlavné prednosti
            </h2>
            <Field label="Nadpis" className="mt-3">
              <input
                className={inputClass}
                value={data.mainAdvantages.headline}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    mainAdvantages: {
                      ...data.mainAdvantages,
                      headline: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Položky (jeden riadok = jedna)" className="mt-3">
              <textarea
                className={`${textareaClass} min-h-[14rem]`}
                value={data.mainAdvantages.items.join("\n")}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    mainAdvantages: {
                      ...data.mainAdvantages,
                      items: e.target.value
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </Field>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Trust statement
            </h2>
            <Field label="Veta" className="mt-3">
              <textarea
                className={textareaClass}
                value={data.trustStatement.sentence}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    trustStatement: { sentence: e.target.value },
                  })
                }
              />
            </Field>
          </section>

          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            label="Uložiť úvodnú stránku"
            onSave={() =>
              void editor.save(data, "cms: homepage — úprava obsahu")
            }
          />
        </div>
      )}
    </AdminShell>
  );
}
