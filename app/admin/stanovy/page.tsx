"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { EditPanel } from "@/components/admin/EditPanel";
import { ListRow } from "@/components/admin/ListRow";
import { PdfAttachment } from "@/components/admin/PdfAttachment";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { StanovyContent } from "@/lib/content/schema";

export default function AdminStanovyPage() {
  const editor = useContentEditor<StanovyContent>("stanovy.json");
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
        folder: "stanovy",
        baseName: edit.title || "stanovy",
      });
      if (!uploaded) return;
      setEdit({ ...edit, href: uploaded.url });
    } finally {
      setUploading(false);
    }
  }

  async function saveDoc() {
    if (!data || !edit) return;
    if (!edit.title.trim()) {
      setFormError("Zadajte názov dokumentu.");
      return;
    }
    if (!edit.href.trim()) {
      setFormError("Nahrajte PDF súbor.");
      return;
    }
    setFormError(null);
    const groups = [...data.groups];
    const group = groups[edit.gIndex];
    const documents = [...group.documents];
    documents[edit.dIndex] = {
      ...documents[edit.dIndex],
      title: edit.title.trim(),
      href: edit.href,
    };
    groups[edit.gIndex] = { ...group, documents };
    const next = { ...data, groups };
    editor.setData(next);
    const ok = await editor.save(next, "cms: stanovy — úprava");
    if (ok) setEdit(null);
  }

  return (
    <AdminShell title="Stanovy OSBD">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <p className="max-w-xl text-[0.95rem] text-ink-muted">
            Kliknite na dokument a nahraďte PDF zo svojho počítača.
          </p>
          <ul className="mt-6 space-y-6">
            {data.groups.map((group, gIndex) => (
              <li key={group.id}>
                <h2 className="mb-2.5 text-[0.84rem] font-semibold tracking-[0.08em] text-ink-muted uppercase">
                  {group.title}
                </h2>
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
                        editor.setError(null);
                        editor.setMessage(null);
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

          {editor.message && !edit ? (
            <p className="mt-4 text-[0.92rem] font-medium text-forest">
              ✓ {editor.message}
            </p>
          ) : null}

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
