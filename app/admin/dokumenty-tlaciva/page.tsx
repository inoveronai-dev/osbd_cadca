"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { DokumentyTlacivaContent } from "@/lib/content/schema";

export default function AdminDokumentyPage() {
  const editor = useContentEditor<DokumentyTlacivaContent>(
    "dokumenty-tlaciva.json",
  );
  const data = editor.data;

  return (
    <AdminShell title="Dokumenty a tlačivá">
      {editor.loading || !data ? (
        <p className="text-ink-muted">Načítavam z GitHub…</p>
      ) : (
        <>
          <button
            type="button"
            className="rounded-md border border-forest/20 bg-white px-3 py-2 text-[0.88rem] font-semibold text-forest"
            onClick={() =>
              editor.setData({
                ...data,
                groups: [
                  {
                    id: `skupina-${Date.now()}`,
                    title: "Nová skupina",
                    defaultOpen: true,
                    documents: [],
                  },
                  ...data.groups,
                ],
              })
            }
          >
            + Skupina
          </button>

          <ul className="mt-5 space-y-4">
            {data.groups.map((group, gIndex) => (
              <li
                key={group.id}
                className="rounded-lg border border-forest/10 bg-white p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Field label="Názov skupiny" className="min-w-[16rem] flex-1">
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
                  <label className="mt-6 inline-flex items-center gap-2 text-[0.88rem]">
                    <input
                      type="checkbox"
                      checked={group.defaultOpen ?? false}
                      onChange={(e) => {
                        const groups = [...data.groups];
                        groups[gIndex] = {
                          ...group,
                          defaultOpen: e.target.checked,
                        };
                        editor.setData({ ...data, groups });
                      }}
                    />
                    Otvorené
                  </label>
                  <button
                    type="button"
                    className="mt-6 text-[0.82rem] font-semibold text-red-700"
                    onClick={() =>
                      editor.setData({
                        ...data,
                        groups: data.groups.filter((_, i) => i !== gIndex),
                      })
                    }
                  >
                    Zmazať skupinu
                  </button>
                </div>

                <ul className="mt-4 space-y-3">
                  {group.documents.map((doc, dIndex) => (
                    <li
                      key={`${doc.href}-${dIndex}`}
                      className="rounded-md border border-forest/8 bg-[#faf9f6] p-3"
                    >
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
                      <Field label="PDF URL" className="mt-2">
                        <input
                          className={inputClass}
                          value={doc.href}
                          onChange={(e) => {
                            const groups = [...data.groups];
                            const documents = [...group.documents];
                            documents[dIndex] = {
                              ...doc,
                              href: e.target.value,
                            };
                            groups[gIndex] = { ...group, documents };
                            editor.setData({ ...data, groups });
                          }}
                        />
                      </Field>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const uploaded = await editor.uploadFile({
                              file,
                              kind: "pdf",
                              folder: "dokumenty-tlaciva",
                              baseName: doc.title || "dokument",
                            });
                            if (!uploaded) return;
                            const groups = [...data.groups];
                            const documents = [...group.documents];
                            documents[dIndex] = {
                              ...doc,
                              href: uploaded.url,
                            };
                            groups[gIndex] = { ...group, documents };
                            editor.setData({ ...data, groups });
                          }}
                        />
                        <button
                          type="button"
                          className="text-[0.82rem] font-semibold text-red-700"
                          onClick={() => {
                            const groups = [...data.groups];
                            groups[gIndex] = {
                              ...group,
                              documents: group.documents.filter(
                                (_, i) => i !== dIndex,
                              ),
                            };
                            editor.setData({ ...data, groups });
                          }}
                        >
                          Zmazať dokument
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="mt-3 text-[0.88rem] font-semibold text-forest"
                  onClick={() => {
                    const groups = [...data.groups];
                    groups[gIndex] = {
                      ...group,
                      documents: [
                        ...group.documents,
                        { title: "Nový dokument", href: "" },
                      ],
                    };
                    editor.setData({ ...data, groups });
                  }}
                >
                  + Dokument
                </button>
              </li>
            ))}
          </ul>

          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            onSave={() =>
              void editor.save(data, "cms: dokumenty-tlaciva — úprava")
            }
          />
        </>
      )}
    </AdminShell>
  );
}
