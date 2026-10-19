"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { EditPanel } from "@/components/admin/EditPanel";
import { ListRow } from "@/components/admin/ListRow";
import { PdfAttachment } from "@/components/admin/PdfAttachment";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { KablovaTvContent } from "@/lib/content/schema";

export default function AdminKablovaPage() {
  const editor = useContentEditor<KablovaTvContent>("kablova-tv.json");
  const data = editor.data;
  const [edit, setEdit] = useState<{
    gIndex: number;
    dIndex: number;
    title: string;
    href: string;
  } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function uploadPdf(file: File) {
    if (!edit) return;
    setUploading(true);
    try {
      const uploaded = await editor.uploadFile({
        file,
        kind: "pdf",
        folder: "kablova-tv",
        baseName: edit.title || "kablova",
      });
      if (!uploaded) return;
      setEdit({ ...edit, href: uploaded.url });
    } finally {
      setUploading(false);
    }
  }

  async function saveDoc() {
    if (!data || !edit) return;
    if (!edit.title.trim() || !edit.href.trim()) {
      setFormError("Vyplňte názov a nahrajte PDF.");
      return;
    }
    setFormError(null);
    const documentGroups = [...data.documentGroups];
    const group = documentGroups[edit.gIndex];
    const documents = [...group.documents];
    documents[edit.dIndex] = {
      ...documents[edit.dIndex],
      title: edit.title.trim(),
      href: edit.href,
    };
    documentGroups[edit.gIndex] = { ...group, documents };
    const next = { ...data, documentGroups };
    editor.setData(next);
    const ok = await editor.save(next, "cms: kablova-tv — dokument");
    if (ok) setEdit(null);
  }

  return (
    <AdminShell title="Káblová TV a internet">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <section className="max-w-2xl rounded-lg border border-forest/10 bg-white p-5">
            <h2 className="text-[1.05rem] font-semibold text-ink">Úvodný text</h2>
            <div className="mt-4 space-y-4">
              <Field label="Nadpis">
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
              <Field
                label="Text"
                helper="Odseky oddelte prázdnym riadkom."
              >
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
              <Field label="Nadpis výhod">
                <input
                  className={inputClass}
                  value={data.benefitsTitle}
                  onChange={(e) =>
                    editor.setData({ ...data, benefitsTitle: e.target.value })
                  }
                />
              </Field>
              <Field
                label="Výhody"
                helper="Každý riadok = jedna výhoda."
              >
                <textarea
                  className={`${textareaClass} min-h-[10rem]`}
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
            </div>
            <SaveBar
              saving={editor.saving && !edit}
              message={!edit ? editor.message : null}
              hint={!edit ? editor.hint : null}
              error={!edit ? editor.error : null}
              label="Uložiť text"
              onSave={() => void editor.save(data, "cms: kablova-tv — text")}
            />
          </section>

          <section className="mt-8">
            <h2 className="text-[1.05rem] font-semibold text-ink">Dokumenty</h2>
            <p className="mt-1 text-[0.92rem] text-ink-muted">
              Nahraďte PDF bez zadávania odkazov.
            </p>
            <ul className="mt-4 space-y-6">
              {data.documentGroups.map((group, gIndex) => (
                <li key={group.id}>
                  <h3 className="mb-2 text-[0.84rem] font-semibold tracking-[0.08em] text-ink-muted uppercase">
                    {group.title}
                  </h3>
                  <ul className="space-y-2">
                    {group.documents.map((doc, dIndex) => (
                      <ListRow
                        key={`${doc.href}-${dIndex}`}
                        title={doc.title}
                        onEdit={() => {
                          setEdit({
                            gIndex,
                            dIndex,
                            title: doc.title,
                            href: doc.href,
                          });
                          setFormError(null);
                        }}
                        meta={
                          <span className="text-[0.84rem] text-ink-muted">
                            PDF
                          </span>
                        }
                      />
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <EditPanel
            open={!!edit}
            title="Upraviť dokument"
            onClose={() => setEdit(null)}
            primaryLabel={editor.saving ? "Ukladá sa…" : "Uložiť dokument"}
            primaryDisabled={editor.saving || uploading}
            onPrimary={() => void saveDoc()}
            error={formError || editor.error}
            message={editor.message}
          >
            {edit ? (
              <div className="space-y-5">
                <Field label="Názov dokumentu">
                  <input
                    className={inputClass}
                    value={edit.title}
                    onChange={(e) =>
                      setEdit({ ...edit, title: e.target.value })
                    }
                  />
                </Field>
                <PdfAttachment
                  href={edit.href}
                  uploading={uploading}
                  onUpload={(file) => void uploadPdf(file)}
                  allowExternalLink
                  onSetExternalLink={(url) => setEdit({ ...edit, href: url })}
                />
              </div>
            ) : null}
          </EditPanel>
        </>
      )}
    </AdminShell>
  );
}
