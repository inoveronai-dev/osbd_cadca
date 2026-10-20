"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { EditPanel } from "@/components/admin/EditPanel";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ListRow, RowMenu } from "@/components/admin/ListRow";
import { PdfAttachment } from "@/components/admin/PdfAttachment";
import { SaveBar } from "@/components/admin/SaveBar";
import {
  btnPrimary,
  helperClass,
} from "@/components/admin/admin-ui";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { KablovaTvContent } from "@/lib/content/schema";

type DocDraft = {
  groupIndex: number;
  docIndex: number | null;
  title: string;
  href: string;
};

type GroupDraft = {
  mode: "create" | "rename";
  groupIndex: number | null;
  title: string;
};

type PendingDelete =
  | { kind: "doc"; groupIndex: number; docIndex: number; title: string }
  | { kind: "group"; groupIndex: number; title: string; count: number };

function docsLabel(n: number) {
  if (n === 1) return "1 dokument";
  if (n >= 2 && n <= 4) return `${n} dokumenty`;
  return `${n} dokumentov`;
}

export default function AdminKablovaPage() {
  const editor = useContentEditor<KablovaTvContent>("kablova-tv.json");
  const data = editor.data;
  const [openGroup, setOpenGroup] = useState<number | null>(0);
  const [draft, setDraft] = useState<DocDraft | null>(null);
  const [groupDraft, setGroupDraft] = useState<GroupDraft | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(
    null,
  );

  function openCreateDoc(groupIndex: number) {
    setDraft({ groupIndex, docIndex: null, title: "", href: "" });
    setFormError(null);
    editor.setMessage(null);
    editor.setError(null);
  }

  function openEditDoc(groupIndex: number, docIndex: number) {
    if (!data) return;
    const doc = data.documentGroups[groupIndex].documents[docIndex];
    setDraft({
      groupIndex,
      docIndex,
      title: doc.title,
      href: doc.href,
    });
    setFormError(null);
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
        folder: "kablova-tv",
        baseName: draft.title || "kablova",
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
    const documentGroups = [...data.documentGroups];
    const group = documentGroups[draft.groupIndex];
    const documents = [...group.documents];
    const row = { title, href: draft.href };
    if (draft.docIndex === null) documents.push(row);
    else documents[draft.docIndex] = { ...documents[draft.docIndex], ...row };
    documentGroups[draft.groupIndex] = { ...group, documents };
    const next = { ...data, documentGroups };
    editor.setData(next);
    const ok = await editor.save(next, "cms: kablova-tv — dokument");
    if (ok) setDraft(null);
  }

  async function saveGroup() {
    if (!data || !groupDraft) return;
    const title = groupDraft.title.trim();
    if (!title) {
      setFormError("Zadajte názov skupiny.");
      return;
    }
    setFormError(null);
    const documentGroups = [...data.documentGroups];
    if (groupDraft.mode === "create") {
      documentGroups.push({
        id: `skupina-${Date.now()}`,
        title,
        defaultOpen: true,
        documents: [],
      });
      const next = { ...data, documentGroups };
      editor.setData(next);
      const ok = await editor.save(next, "cms: kablova-tv — nová skupina");
      if (ok) {
        setGroupDraft(null);
        setOpenGroup(documentGroups.length - 1);
      }
      return;
    }
    if (groupDraft.groupIndex === null) return;
    documentGroups[groupDraft.groupIndex] = {
      ...documentGroups[groupDraft.groupIndex],
      title,
    };
    const next = { ...data, documentGroups };
    editor.setData(next);
    const ok = await editor.save(next, "cms: kablova-tv — premenovanie");
    if (ok) setGroupDraft(null);
  }

  function moveGroup(index: number, dir: -1 | 1) {
    if (!data) return;
    const target = index + dir;
    if (target < 0 || target >= data.documentGroups.length) return;
    const documentGroups = [...data.documentGroups];
    const [row] = documentGroups.splice(index, 1);
    documentGroups.splice(target, 0, row);
    const next = { ...data, documentGroups };
    editor.setData(next);
    setOpenGroup((cur) => {
      if (cur === index) return target;
      if (cur === target) return index;
      return cur;
    });
    void editor.save(next, "cms: kablova-tv — poradie skupín");
  }

  async function confirmPendingDelete() {
    if (!data || !pendingDelete) return;
    if (pendingDelete.kind === "doc") {
      const documentGroups = [...data.documentGroups];
      const group = documentGroups[pendingDelete.groupIndex];
      documentGroups[pendingDelete.groupIndex] = {
        ...group,
        documents: group.documents.filter(
          (_, i) => i !== pendingDelete.docIndex,
        ),
      };
      const next = { ...data, documentGroups };
      editor.setData(next);
      await editor.save(next, "cms: kablova-tv — zmazanie dokumentu");
      setDraft(null);
    } else {
      const documentGroups = data.documentGroups.filter(
        (_, i) => i !== pendingDelete.groupIndex,
      );
      const next = { ...data, documentGroups };
      editor.setData(next);
      await editor.save(next, "cms: kablova-tv — zmazanie skupiny");
      setOpenGroup(null);
    }
    setPendingDelete(null);
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
              saving={editor.saving && !draft && !groupDraft}
              message={!draft && !groupDraft ? editor.message : null}
              hint={!draft && !groupDraft ? editor.hint : null}
              error={!draft && !groupDraft ? editor.error : null}
              label="Uložiť text"
              onSave={() => void editor.save(data, "cms: kablova-tv — text")}
            />
          </section>

          <section className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[1.05rem] font-semibold text-ink">
                  Dokumenty
                </h2>
                <p className="mt-1 max-w-xl text-[0.92rem] text-ink-muted">
                  Dokumenty sú zoradené podľa skupín. Nahrajte PDF zo svojho
                  počítača — odkaz nemusíte zadávať.
                </p>
              </div>
              <button
                type="button"
                className={btnPrimary}
                onClick={() => {
                  setGroupDraft({ mode: "create", groupIndex: null, title: "" });
                  setFormError(null);
                }}
              >
                + Pridať skupinu
              </button>
            </div>

            {editor.message && !draft && !groupDraft ? (
              <p className="mt-4 text-[0.92rem] font-medium text-forest">
                ✓ {editor.message}
              </p>
            ) : null}
            {editor.error && !draft && !groupDraft ? (
              <p className="mt-4 text-[0.92rem] font-medium text-red-700">
                {editor.error}
              </p>
            ) : null}

            <ul className="mt-6 space-y-3">
              {data.documentGroups.map((group, gIndex) => {
                const isOpen = openGroup === gIndex;
                return (
                  <li
                    key={group.id}
                    className="rounded-lg border border-forest/10 bg-white"
                  >
                    <div className="flex items-center gap-1 px-2 sm:px-3">
                      <button
                        type="button"
                        className="min-w-0 flex-1 px-3 py-4 text-left"
                        onClick={() =>
                          setOpenGroup(isOpen ? null : gIndex)
                        }
                      >
                        <p className="text-[1.05rem] font-semibold text-ink">
                          {group.title}
                        </p>
                        <p className={helperClass}>
                          {docsLabel(group.documents.length)}
                        </p>
                      </button>
                      <RowMenu
                        items={[
                          {
                            label: isOpen ? "Skryť" : "Otvoriť",
                            onClick: () =>
                              setOpenGroup(isOpen ? null : gIndex),
                          },
                          {
                            label: "Premenovať",
                            onClick: () => {
                              setGroupDraft({
                                mode: "rename",
                                groupIndex: gIndex,
                                title: group.title,
                              });
                              setFormError(null);
                            },
                          },
                          {
                            label: "Presunúť vyššie",
                            onClick: () => moveGroup(gIndex, -1),
                          },
                          {
                            label: "Presunúť nižšie",
                            onClick: () => moveGroup(gIndex, 1),
                          },
                          {
                            label: "Vymazať",
                            danger: true,
                            onClick: () =>
                              setPendingDelete({
                                kind: "group",
                                groupIndex: gIndex,
                                title: group.title,
                                count: group.documents.length,
                              }),
                          },
                        ]}
                      />
                    </div>

                    {isOpen ? (
                      <div className="border-t border-forest/8 px-4 py-4 sm:px-5">
                        <div className="mb-3 flex justify-end">
                          <button
                            type="button"
                            className={btnPrimary}
                            onClick={() => openCreateDoc(gIndex)}
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
                                key={`${group.id}-${dIndex}-${doc.href}`}
                                title={doc.title}
                                onEdit={() => openEditDoc(gIndex, dIndex)}
                                meta={
                                  <span className="text-[0.84rem] text-ink-muted">
                                    PDF
                                  </span>
                                }
                                menuItems={[
                                  {
                                    label: "Upraviť",
                                    onClick: () =>
                                      openEditDoc(gIndex, dIndex),
                                  },
                                  {
                                    label: "Vymazať",
                                    danger: true,
                                    onClick: () =>
                                      setPendingDelete({
                                        kind: "doc",
                                        groupIndex: gIndex,
                                        docIndex: dIndex,
                                        title: doc.title,
                                      }),
                                  },
                                ]}
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
          </section>

          <EditPanel
            open={!!groupDraft}
            title={
              groupDraft?.mode === "create"
                ? "Nová skupina"
                : "Premenovať skupinu"
            }
            onClose={() => setGroupDraft(null)}
            primaryLabel={
              editor.saving
                ? "Ukladá sa…"
                : groupDraft?.mode === "create"
                  ? "Pridať skupinu"
                  : "Uložiť názov"
            }
            primaryDisabled={editor.saving}
            onPrimary={() => void saveGroup()}
            error={formError || editor.error}
            message={editor.message}
          >
            {groupDraft ? (
              <Field label="Názov skupiny">
                <input
                  className={inputClass}
                  value={groupDraft.title}
                  onChange={(e) =>
                    setGroupDraft({ ...groupDraft, title: e.target.value })
                  }
                  placeholder="Napr. Nové cenníky"
                />
              </Field>
            ) : null}
          </EditPanel>

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
                <button
                  type="button"
                  className="text-[0.9rem] font-semibold text-red-700 hover:underline"
                  onClick={() =>
                    setPendingDelete({
                      kind: "doc",
                      groupIndex: draft.groupIndex,
                      docIndex: draft.docIndex!,
                      title: draft.title || "dokument",
                    })
                  }
                >
                  Vymazať dokument
                </button>
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

          <ConfirmDialog
            open={!!pendingDelete}
            title="Vymazať?"
            message={
              pendingDelete?.kind === "group"
                ? pendingDelete.count > 0
                  ? `Táto skupina obsahuje ${docsLabel(pendingDelete.count)}. Vymazaním skupiny sa vymažú aj tieto položky.`
                  : "Naozaj chcete túto skupinu vymazať?"
                : "Naozaj chcete túto položku vymazať?"
            }
            onCancel={() => setPendingDelete(null)}
            onConfirm={() => void confirmPendingDelete()}
          />
        </>
      )}
    </AdminShell>
  );
}
