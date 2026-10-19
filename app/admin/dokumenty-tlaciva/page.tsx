"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { EditPanel } from "@/components/admin/EditPanel";
import { ListRow } from "@/components/admin/ListRow";
import { PdfAttachment } from "@/components/admin/PdfAttachment";
import { SaveBar } from "@/components/admin/SaveBar";
import {
  btnPrimary,
  helperClass,
} from "@/components/admin/admin-ui";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { DokumentyTlacivaContent } from "@/lib/content/schema";

type DocDraft = {
  groupIndex: number;
  docIndex: number | null; // null = create
  title: string;
  href: string;
};

export default function AdminDokumentyPage() {
  const editor = useContentEditor<DokumentyTlacivaContent>(
    "dokumenty-tlaciva.json",
  );
  const data = editor.data;
  const [openGroup, setOpenGroup] = useState<number | null>(0);
  const [draft, setDraft] = useState<DocDraft | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function openCreate(groupIndex: number) {
    setDraft({ groupIndex, docIndex: null, title: "", href: "" });
    setFormError(null);
    setConfirmDelete(false);
    editor.setMessage(null);
    editor.setError(null);
  }

  function openEdit(groupIndex: number, docIndex: number) {
    if (!data) return;
    const doc = data.groups[groupIndex].documents[docIndex];
    setDraft({
      groupIndex,
      docIndex,
      title: doc.title,
      href: doc.href,
    });
    setFormError(null);
    setConfirmDelete(false);
    editor.setMessage(null);
    editor.setError(null);
  }

  async function uploadPdf(file: File) {
    if (!draft) return;
    setUploading(true);
    try {
      const uploaded = await editor.uploadFile({
        file,
        kind: "pdf",
        folder: "dokumenty-tlaciva",
        baseName: draft.title || "dokument",
      });
      if (!uploaded) return;
      setDraft({ ...draft, href: uploaded.url });
    } finally {
      setUploading(false);
    }
  }

  async function saveDoc() {
    if (!data || !draft) return;
    const title = draft.title.trim();
    if (!title) {
      setFormError("Zadajte názov dokumentu.");
      return;
    }
    if (!draft.href.trim()) {
      setFormError("Nahrajte PDF súbor.");
      return;
    }
    setFormError(null);
    const groups = [...data.groups];
    const group = groups[draft.groupIndex];
    const documents = [...group.documents];
    const row = { title, href: draft.href };
    if (draft.docIndex === null) {
      documents.push(row);
    } else {
      documents[draft.docIndex] = {
        ...documents[draft.docIndex],
        ...row,
      };
    }
    groups[draft.groupIndex] = { ...group, documents };
    const next = { ...data, groups };
    editor.setData(next);
    const ok = await editor.save(next, "cms: dokumenty-tlaciva — dokument");
    if (ok) setDraft(null);
  }

  async function deleteDoc() {
    if (!data || !draft || draft.docIndex === null) return;
    const groups = [...data.groups];
    const group = groups[draft.groupIndex];
    groups[draft.groupIndex] = {
      ...group,
      documents: group.documents.filter((_, i) => i !== draft.docIndex),
    };
    const next = { ...data, groups };
    editor.setData(next);
    const ok = await editor.save(next, "cms: dokumenty-tlaciva — zmazanie");
    if (ok) setDraft(null);
  }

  return (
    <AdminShell title="Dokumenty a tlačivá">
      {editor.loading || !data ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <p className="max-w-xl text-[0.95rem] text-ink-muted">
            Dokumenty sú zoradené podľa skupín. Nahrajte PDF zo svojho počítača —
            odkaz nemusíte zadávať.
          </p>

          <ul className="mt-6 space-y-3">
            {data.groups.map((group, gIndex) => {
              const isOpen = openGroup === gIndex;
              return (
                <li
                  key={group.id}
                  className="overflow-hidden rounded-lg border border-forest/10 bg-white"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() =>
                      setOpenGroup(isOpen ? null : gIndex)
                    }
                  >
                    <div>
                      <p className="text-[1.05rem] font-semibold text-ink">
                        {group.title}
                      </p>
                      <p className={helperClass}>
                        {group.documents.length}{" "}
                        {group.documents.length === 1
                          ? "dokument"
                          : group.documents.length < 5
                            ? "dokumenty"
                            : "dokumentov"}
                      </p>
                    </div>
                    <span className="text-[0.9rem] font-semibold text-forest">
                      {isOpen ? "Skryť" : "Upraviť"}
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="border-t border-forest/8 px-4 py-4 sm:px-5">
                      <div className="mb-3 flex justify-end">
                        <button
                          type="button"
                          className={btnPrimary}
                          onClick={() => openCreate(gIndex)}
                        >
                          + Pridať dokument
                        </button>
                      </div>
                      {group.documents.length === 0 ? (
                        <p className="py-6 text-center text-[0.92rem] text-ink-muted">
                          V tejto skupine zatiaľ nie sú dokumenty.
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {group.documents.map((doc, dIndex) => (
                            <ListRow
                              key={`${doc.href}-${dIndex}`}
                              title={doc.title}
                              onEdit={() => openEdit(gIndex, dIndex)}
                              meta={
                                <span className="text-[0.84rem] text-ink-muted">
                                  PDF
                                </span>
                              }
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <SaveBar
            saving={editor.saving && !draft}
            message={!draft ? editor.message : null}
            hint={!draft ? editor.hint : null}
            error={!draft ? editor.error : null}
            label="Uložiť poradie skupín"
            onSave={() =>
              void editor.save(data, "cms: dokumenty-tlaciva — úprava")
            }
          />

          <EditPanel
            open={!!draft}
            title={
              draft?.docIndex === null ? "Nový dokument" : "Upraviť dokument"
            }
            onClose={() => setDraft(null)}
            primaryLabel={
              editor.saving
                ? "Ukladá sa…"
                : draft?.docIndex === null
                  ? "Pridať dokument"
                  : "Uložiť dokument"
            }
            primaryDisabled={editor.saving || uploading}
            onPrimary={() => void saveDoc()}
            error={formError || editor.error}
            message={editor.message}
            footerExtra={
              draft?.docIndex !== null && draft ? (
                confirmDelete ? (
                  <div className="flex flex-wrap gap-2 text-[0.84rem]">
                    <span className="text-red-700">Naozaj vymazať?</span>
                    <button
                      type="button"
                      className="font-semibold text-red-700"
                      onClick={() => void deleteDoc()}
                    >
                      Áno
                    </button>
                    <button
                      type="button"
                      className="text-ink-muted"
                      onClick={() => setConfirmDelete(false)}
                    >
                      Nie
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="text-[0.84rem] text-ink-muted hover:text-red-700 hover:underline"
                    onClick={() => setConfirmDelete(true)}
                  >
                    Vymazať dokument
                  </button>
                )
              ) : null
            }
          >
            {draft ? (
              <div className="space-y-5">
                <Field label="Názov dokumentu">
                  <input
                    className={inputClass}
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                  />
                </Field>
                <PdfAttachment
                  label="Súbor"
                  href={draft.href || null}
                  uploading={uploading}
                  onUpload={(file) => void uploadPdf(file)}
                  onClear={() => setDraft({ ...draft, href: "" })}
                  allowExternalLink
                  onSetExternalLink={(url) =>
                    setDraft({ ...draft, href: url })
                  }
                />
              </div>
            ) : null}
          </EditPanel>
        </>
      )}
    </AdminShell>
  );
}
