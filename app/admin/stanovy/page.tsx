"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { StanovyContent } from "@/lib/content/schema";

export default function AdminStanovyPage() {
  const editor = useContentEditor<StanovyContent>("stanovy.json");
  const data = editor.data;

  return (
    <AdminShell title="Stanovy OSBD">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam z GitHub…</p>
      ) : (
        <>
          <ul className="space-y-4">
            {data.groups.map((group, gIndex) => (
              <li
                key={group.id}
                className="rounded-lg border border-forest/10 bg-white p-4"
              >
                <Field label="Názov sekcie">
                  <input
                    className={inputClass}
                    value={group.title}
                    onChange={(e) => {
                      const groups = [...data.groups];
                      groups[gIndex] = { ...group, title: e.target.value };
                      editor.setData({ ...data, groups });
                    }}
                  />
                </Field>
                {group.documents.map((doc, dIndex) => (
                  <div key={`${doc.href}-${dIndex}`} className="mt-3 space-y-2">
                    <Field label="Názov dokumentu">
                      <input
                        className={inputClass}
                        value={doc.title}
                        onChange={(e) => {
                          const groups = [...data.groups];
                          const documents = [...group.documents];
                          documents[dIndex] = {
                            ...doc,
                            title: e.target.value,
                          };
                          groups[gIndex] = { ...group, documents };
                          editor.setData({ ...data, groups });
                        }}
                      />
                    </Field>
                    <Field label="PDF URL">
                      <input
                        className={inputClass}
                        value={doc.href}
                        onChange={(e) => {
                          const groups = [...data.groups];
                          const documents = [...group.documents];
                          documents[dIndex] = { ...doc, href: e.target.value };
                          groups[gIndex] = { ...group, documents };
                          editor.setData({ ...data, groups });
                        }}
                      />
                    </Field>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const uploaded = await editor.uploadFile({
                          file,
                          kind: "pdf",
                          folder: "stanovy",
                          baseName: doc.title || group.id,
                        });
                        if (!uploaded) return;
                        const groups = [...data.groups];
                        const documents = [...group.documents];
                        documents[dIndex] = { ...doc, href: uploaded.url };
                        groups[gIndex] = { ...group, documents };
                        editor.setData({ ...data, groups });
                      }}
                    />
                  </div>
                ))}
              </li>
            ))}
          </ul>
          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            onSave={() => void editor.save(data, "cms: stanovy — úprava")}
          />
        </>
      )}
    </AdminShell>
  );
}
