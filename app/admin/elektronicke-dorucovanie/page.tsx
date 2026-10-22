"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { PdfAttachment } from "@/components/admin/PdfAttachment";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { ElektronickeDorucovanieContent } from "@/lib/content/schema";

export default function AdminElektronickeDorucovaniePage() {
  const editor = useContentEditor<ElektronickeDorucovanieContent>(
    "elektronicke-dorucovanie.json",
  );
  const data = editor.data;
  const [uploading, setUploading] = useState(false);

  return (
    <AdminShell title="Elektronické doručovanie">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <div className="max-w-2xl space-y-6">
          <p className="text-[0.95rem] text-ink-muted">
            Upravujte text podstránky „Informácia o elektronickom doručovaní“.
            Odseky oddelte prázdnym riadkom.
          </p>

          <section className="rounded-lg border border-forest/10 bg-white p-5 sm:p-6">
            <h2 className="text-[1.05rem] font-semibold text-ink">
              Banner stránky
            </h2>
            <div className="mt-4 space-y-4">
              <Field label="Nadpis v baneri">
                <input
                  className={inputClass}
                  value={data.heroTitle}
                  onChange={(e) =>
                    editor.setData({ ...data, heroTitle: e.target.value })
                  }
                />
              </Field>
              <Field label="Podnadpis v baneri">
                <input
                  className={inputClass}
                  value={data.heroSupport}
                  onChange={(e) =>
                    editor.setData({ ...data, heroSupport: e.target.value })
                  }
                />
              </Field>
            </div>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-5 sm:p-6">
            <h2 className="text-[1.05rem] font-semibold text-ink">Text</h2>
            <div className="mt-4 space-y-4">
              <Field label="Nadpis textu">
                <input
                  className={inputClass}
                  value={data.heading}
                  onChange={(e) =>
                    editor.setData({ ...data, heading: e.target.value })
                  }
                />
              </Field>
              <Field label="Oslovenie">
                <input
                  className={inputClass}
                  value={data.greeting}
                  onChange={(e) =>
                    editor.setData({ ...data, greeting: e.target.value })
                  }
                />
              </Field>
              <Field
                label="Odseky"
                helper="Každý odsek oddelte prázdnym riadkom."
              >
                <textarea
                  className={`${textareaClass} min-h-[18rem]`}
                  value={data.paragraphs.join("\n\n")}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      paragraphs: e.target.value
                        .split(/\n\s*\n/)
                        .map((p) => p.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
              <Field label="Záver (napr. S úctou)">
                <input
                  className={inputClass}
                  value={data.closingLead}
                  onChange={(e) =>
                    editor.setData({ ...data, closingLead: e.target.value })
                  }
                />
              </Field>
              <Field label="Meno">
                <input
                  className={inputClass}
                  value={data.closingName}
                  onChange={(e) =>
                    editor.setData({ ...data, closingName: e.target.value })
                  }
                />
              </Field>
              <Field label="Funkcia">
                <input
                  className={inputClass}
                  value={data.closingRole}
                  onChange={(e) =>
                    editor.setData({ ...data, closingRole: e.target.value })
                  }
                />
              </Field>
            </div>
          </section>

          <section className="rounded-lg border border-forest/10 bg-white p-5 sm:p-6">
            <h2 className="text-[1.05rem] font-semibold text-ink">
              PDF na stiahnutie
            </h2>
            <div className="mt-4 space-y-4">
              <Field label="Nadpis sekcie">
                <input
                  className={inputClass}
                  value={data.pdfSectionTitle}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      pdfSectionTitle: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Názov odkazu">
                <input
                  className={inputClass}
                  value={data.pdf.title}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      pdf: { ...data.pdf, title: e.target.value },
                    })
                  }
                />
              </Field>
              <PdfAttachment
                href={data.pdf.href}
                uploading={uploading}
                onUpload={async (file) => {
                  setUploading(true);
                  try {
                    const uploaded = await editor.uploadFile({
                      file,
                      kind: "pdf",
                      folder: "elektronicke-dorucovanie",
                      baseName: data.pdf.title || "dohoda",
                    });
                    if (!uploaded) return;
                    editor.setData({
                      ...data,
                      pdf: { ...data.pdf, href: uploaded.url },
                    });
                  } finally {
                    setUploading(false);
                  }
                }}
                allowExternalLink
                onSetExternalLink={(url) =>
                  editor.setData({
                    ...data,
                    pdf: { ...data.pdf, href: url },
                  })
                }
              />
            </div>
          </section>

          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            label="Uložiť stránku"
            onSave={() =>
              void editor.save(
                data,
                "cms: elektronicke-dorucovanie — úprava",
              )
            }
          />
        </div>
      )}
    </AdminShell>
  );
}
