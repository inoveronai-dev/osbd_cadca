"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { DomovyPoriadokContent } from "@/lib/content/schema";

export default function AdminDomovyPoriadokPage() {
  const editor = useContentEditor<DomovyPoriadokContent>("domovy-poriadok.json");
  const data = editor.data;

  return (
    <AdminShell title="Domový poriadok">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam z GitHub…</p>
      ) : (
        <div className="rounded-lg border border-forest/10 bg-white p-4">
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
          <Field label="PDF URL" className="mt-3">
            <input
              className={inputClass}
              value={data.document.href}
              onChange={(e) =>
                editor.setData({
                  ...data,
                  document: { ...data.document, href: e.target.value },
                })
              }
            />
          </Field>
          <input
            className="mt-3"
            type="file"
            accept="application/pdf,.pdf"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
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
            }}
          />
          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            onSave={() =>
              void editor.save(data, "cms: domovy-poriadok — úprava")
            }
          />
        </div>
      )}
    </AdminShell>
  );
}
