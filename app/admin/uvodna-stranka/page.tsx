"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { HomepageContent } from "@/lib/content/schema";

export default function AdminUvodnaStrankaPage() {
  const editor = useContentEditor<HomepageContent>("homepage.json");
  const data = editor.data;

  return (
    <AdminShell title="Úvodná stránka">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <div className="space-y-5">
          <p className="text-[0.9rem] text-ink-muted">
            Upravujte iba schválené texty a obrázky. Rozloženie, farby ani počet
            kariet sa tu nemenía.
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
                  key={cat.title}
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
                  <Field label="Obrázok URL" className="mt-2">
                    <input
                      className={inputClass}
                      value={cat.image.src}
                      onChange={(e) => {
                        const categories = [...data.services.categories];
                        categories[index] = {
                          ...cat,
                          image: { ...cat.image, src: e.target.value },
                        };
                        editor.setData({
                          ...data,
                          services: { ...data.services, categories },
                        });
                      }}
                    />
                  </Field>
                  <input
                    className="mt-2"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const uploaded = await editor.uploadFile({
                        file,
                        kind: "image",
                        folder: "homepage",
                        baseName: cat.title || `service-${index}`,
                      });
                      if (!uploaded) return;
                      const categories = [...data.services.categories];
                      categories[index] = {
                        ...cat,
                        image: { ...cat.image, src: uploaded.url },
                      };
                      editor.setData({
                        ...data,
                        services: { ...data.services, categories },
                      });
                    }}
                  />
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
