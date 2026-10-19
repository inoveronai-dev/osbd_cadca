"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { PdfAttachment } from "@/components/admin/PdfAttachment";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { DomovyPoriadokContent } from "@/lib/content/schema";

export default function AdminDomovyPoriadokPage() {
  const editor = useContentEditor<DomovyPoriadokContent>("domovy-poriadok.json");
  const data = editor.data;
  const [uploading, setUploading] = useState(false);

  return (
    <AdminShell title="Domový poriadok">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <div className="max-w-xl rounded-lg border border-forest/10 bg-white p-5 sm:p-6">
          <Field label="Názov dokumentu">
            <input
              className={inputClass}
              value={data.document.title}
              onChange={(e) =>
                editor.setData({
                  ...data,
                  document: { ...data.document, title: e.target.value },
                })
              }
            />
          </Field>
          <div className="mt-5">
            <PdfAttachment
              href={data.document.href}
              uploading={uploading}
              onUpload={async (file) => {
                setUploading(true);
                try {
                  const uploaded = await editor.uploadFile({
                    file,
                    kind: "pdf",
                    folder: "domovy-poriadok",
                    baseName: data.document.title || "domovy-poriadok",
                  });
                  if (!uploaded) return;
                  editor.setData({
                    ...data,
                    document: { ...data.document, href: uploaded.url },
                  });
                } finally {
                  setUploading(false);
                }
              }}
              allowExternalLink
              onSetExternalLink={(url) =>
                editor.setData({
                  ...data,
                  document: { ...data.document, href: url },
                })
              }
            />
          </div>
          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            label="Uložiť dokument"
            onSave={() =>
              void editor.save(data, "cms: domovy-poriadok — úprava")
            }
          />
        </div>
      )}
    </AdminShell>
  );
}
