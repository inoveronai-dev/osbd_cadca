"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { KablovaTvContent } from "@/lib/content/schema";

export default function AdminKablovaPage() {
  const editor = useContentEditor<KablovaTvContent>("kablova-tv.json");
  const data = editor.data;

  return (
    <AdminShell title="Káblová TV a internet">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam z GitHub…</p>
      ) : (
        <>
          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">Úvod</h2>
            <div className="mt-3 grid gap-3">
              <Field label="Hlavný nadpis">
                <input
                  className={inputClass}
                  value={data.intro.heading}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      intro: { ...data.intro, heading: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Podnadpis">
                <input
                  className={inputClass}
                  value={data.intro.subheading}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      intro: { ...data.intro, subheading: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Odseky (prázdny riadok = nový odsek)">
                <textarea
                  className={textareaClass}
                  value={data.intro.paragraphs.join("\n\n")}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      intro: {
                        ...data.intro,
                        paragraphs: e.target.value
                          .split(/\n\s*\n/)
                          .map((p) => p.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                />
              </Field>
            </div>
          </section>

          <section className="mt-5 rounded-lg border border-forest/10 bg-white p-4">
            <Field label="Nadpis výhod">
              <input
                className={inputClass}
                value={data.benefitsTitle}
                onChange={(e) =>
                  editor.setData({ ...data, benefitsTitle: e.target.value })
                }
              />
            </Field>
            <Field label="Výhody (jeden riadok = jedna výhoda)" className="mt-3">
              <textarea
                className={`${textareaClass} min-h-[12rem]`}
                value={data.benefits.join("\n")}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    benefits: e.target.value
                      .split("\n")
                      .map((l) => l.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
          </section>

          <section className="mt-5 space-y-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Dokumenty
            </h2>
            {data.documentGroups.map((group, gIndex) => (
              <div
                key={group.id}
                className="rounded-lg border border-forest/10 bg-white p-4"
              >
                <Field label="Skupina">
                  <input
                    className={inputClass}
                    value={group.title}
                    onChange={(e) => {
                      const documentGroups = [...data.documentGroups];
                      documentGroups[gIndex] = {
                        ...group,
                        title: e.target.value,
                      };
                      editor.setData({ ...data, documentGroups });
                    }}
                  />
                </Field>
                <ul className="mt-3 space-y-3">
                  {group.documents.map((doc, dIndex) => (
                    <li
                      key={`${doc.href}-${dIndex}`}
                      className="rounded-md border border-forest/8 bg-[#faf9f6] p-3"
                    >
                      <Field label="Dokument">
                        <input
                          className={inputClass}
                          value={doc.title}
                          onChange={(e) => {
                            const documentGroups = [...data.documentGroups];
                            const documents = [...group.documents];
                            documents[dIndex] = {
                              ...doc,
                              title: e.target.value,
                            };
                            documentGroups[gIndex] = { ...group, documents };
                            editor.setData({ ...data, documentGroups });
                          }}
                        />
                      </Field>
                      <Field label="PDF URL" className="mt-2">
                        <input
                          className={inputClass}
                          value={doc.href}
                          onChange={(e) => {
                            const documentGroups = [...data.documentGroups];
                            const documents = [...group.documents];
                            documents[dIndex] = {
                              ...doc,
                              href: e.target.value,
                            };
                            documentGroups[gIndex] = { ...group, documents };
                            editor.setData({ ...data, documentGroups });
                          }}
                        />
                      </Field>
                      <input
                        className="mt-2"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const uploaded = await editor.uploadFile({
                            file,
                            kind: "pdf",
                            folder: "kablova-tv",
                            baseName: doc.title || group.id,
                          });
                          if (!uploaded) return;
                          const documentGroups = [...data.documentGroups];
                          const documents = [...group.documents];
                          documents[dIndex] = {
                            ...doc,
                            href: uploaded.url,
                          };
                          documentGroups[gIndex] = { ...group, documents };
                          editor.setData({ ...data, documentGroups });
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            onSave={() => void editor.save(data, "cms: kablova-tv — úprava")}
          />
        </>
      )}
    </AdminShell>
  );
}
