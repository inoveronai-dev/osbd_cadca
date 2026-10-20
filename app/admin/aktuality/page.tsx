"use client";

import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { EditPanel } from "@/components/admin/EditPanel";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { KindBadge, ListRow, StatusBadge } from "@/components/admin/ListRow";
import { PdfAttachment } from "@/components/admin/PdfAttachment";
import {
  btnPrimary,
  formatDateSk,
  helperClass,
} from "@/components/admin/admin-ui";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { AktualityContent, Notice } from "@/lib/content/schema";

type Attachment = { title: string; href: string };

type Draft = {
  id: string;
  title: string;
  publishedAt: string;
  bodyText: string;
  attachments: Attachment[];
  active: boolean;
  linkifyPhones?: boolean;
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function noticeToDraft(item: Notice): Draft {
  if (item.kind === "pdf") {
    return {
      id: item.id,
      title: item.title,
      publishedAt: item.publishedAt,
      bodyText: "",
      attachments: item.pdfHref
        ? [{ title: "Príloha", href: item.pdfHref }]
        : [],
      active: item.active,
    };
  }
  return {
    id: item.id,
    title: item.title,
    publishedAt: item.publishedAt,
    bodyText: item.body.join("\n\n"),
    attachments: [...(item.attachments ?? [])],
    active: item.active,
    linkifyPhones: item.linkifyPhones,
  };
}

function emptyDraft(): Draft {
  return {
    id: `aktualita-${Date.now()}`,
    title: "",
    publishedAt: todayIso(),
    bodyText: "",
    attachments: [],
    active: true,
  };
}

/** Derive stored notice kind from form content — client never chooses type. */
function draftToNotice(draft: Draft): Notice | { error: string } {
  const title = draft.title.trim();
  if (!title) return { error: "Zadajte nadpis aktuality." };

  const body = draft.bodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const attachments = draft.attachments.filter((a) => a.href.trim());
  const hasBody = body.length > 0;
  const hasPdf = attachments.length > 0;

  if (!hasBody && !hasPdf) {
    return {
      error: "Pridajte text aktuality alebo PDF prílohu.",
    };
  }

  // PDF-only → public “Otvoriť oznámenie”
  if (!hasBody && attachments.length === 1) {
    return {
      id: draft.id,
      kind: "pdf",
      title,
      publishedAt: draft.publishedAt,
      pdfHref: attachments[0].href,
      active: draft.active,
    };
  }

  // Text and/or multiple PDFs → article
  return {
    id: draft.id,
    kind: "article",
    title,
    publishedAt: draft.publishedAt,
    body: hasBody ? body : [],
    attachments: hasPdf ? attachments : undefined,
    linkifyPhones: draft.linkifyPhones,
    active: draft.active,
  };
}

function kindLabel(item: Notice): string {
  if (item.kind === "pdf") return "PDF";
  const hasPdf = (item.attachments?.length ?? 0) > 0;
  const hasText = item.body.some((p) => p.trim());
  if (hasText && hasPdf) return "Text + PDF";
  if (hasPdf) return "PDF";
  return "Text";
}

export default function AdminAktualityPage() {
  const editor = useContentEditor<AktualityContent>("aktuality.json");
  const data = editor.data;

  const [mode, setMode] = useState<"closed" | "create" | "edit">("closed");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(
    null,
  );

  const items = data?.items ?? [];

  const panelTitle = useMemo(() => {
    if (mode === "create") return "Nová aktualita";
    return "Upraviť aktualitu";
  }, [mode]);

  function openCreate() {
    setDraft(emptyDraft());
    setEditIndex(null);
    setMode("create");
    setFormError(null);
    editor.setError(null);
    editor.setMessage(null);
  }

  function openEdit(index: number) {
    if (!data) return;
    setDraft(noticeToDraft(data.items[index]));
    setEditIndex(index);
    setMode("edit");
    setFormError(null);
    editor.setError(null);
    editor.setMessage(null);
  }

  function closePanel() {
    setMode("closed");
    setDraft(null);
    setEditIndex(null);
    setFormError(null);
  }

  function moveItem(index: number, dir: -1 | 1) {
    if (!data) return;
    const target = index + dir;
    if (target < 0 || target >= data.items.length) return;
    const next = [...data.items];
    const [row] = next.splice(index, 1);
    next.splice(target, 0, row);
    editor.setData({ ...data, items: next });
    void editor.save({ ...data, items: next }, "cms: aktuality — poradie");
  }

  async function uploadAttachment(file: File, replaceIndex?: number) {
    if (!draft) return;
    setUploading(true);
    setFormError(null);
    try {
      const uploaded = await editor.uploadFile({
        file,
        kind: "pdf",
        folder: "aktuality",
        baseName: draft.title || draft.id,
      });
      if (!uploaded) return;
      const att: Attachment = {
        title: file.name.replace(/\.pdf$/i, "") || "Príloha",
        href: uploaded.url,
      };
      setDraft((prev) => {
        if (!prev) return prev;
        if (typeof replaceIndex === "number") {
          const attachments = [...prev.attachments];
          attachments[replaceIndex] = att;
          return { ...prev, attachments };
        }
        return { ...prev, attachments: [...prev.attachments, att] };
      });
    } finally {
      setUploading(false);
    }
  }

  async function saveDraft() {
    if (!data || !draft) return;
    const result = draftToNotice(draft);
    if ("error" in result) {
      setFormError(result.error);
      return;
    }
    setFormError(null);
    const itemsNext = [...data.items];
    if (mode === "create") {
      itemsNext.unshift(result);
    } else if (editIndex !== null) {
      itemsNext[editIndex] = result;
    }
    const next = { ...data, items: itemsNext };
    editor.setData(next);
    const ok = await editor.save(
      next,
      mode === "create"
        ? "cms: aktuality — nová aktualita"
        : "cms: aktuality — úprava",
    );
    if (ok) closePanel();
  }

  async function confirmPendingDelete() {
    if (!data || pendingDeleteIndex === null) return;
    const index = pendingDeleteIndex;
    const itemsNext = data.items.filter((_, i) => i !== index);
    const next = { ...data, items: itemsNext };
    editor.setData(next);
    const ok = await editor.save(next, "cms: aktuality — zmazanie");
    setPendingDeleteIndex(null);
    if (ok && (mode === "edit" || mode === "create")) closePanel();
  }

  return (
    <AdminShell title="Aktuality">
      {editor.loading || !data ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[0.95rem] leading-relaxed text-ink-muted">
              Pridávajte oznamy pre vlastníkov. Stačí nadpis, dátum a voliteľne
              text alebo PDF.
            </p>
            <button type="button" className={btnPrimary} onClick={openCreate}>
              + Pridať aktualitu
            </button>
          </div>

          {editor.error && mode === "closed" ? (
            <p className="mt-4 text-[0.92rem] font-medium text-red-700">
              {editor.error}
            </p>
          ) : null}
          {editor.message && mode === "closed" ? (
            <p className="mt-4 text-[0.92rem] font-medium text-forest">
              ✓ {editor.message}
              {editor.hint ? (
                <span className="ml-1 font-normal text-ink-muted">
                  {editor.hint}
                </span>
              ) : null}
            </p>
          ) : null}

          {items.length === 0 ? (
            <div className="mt-8 rounded-lg border border-dashed border-forest/20 bg-white px-5 py-12 text-center">
              <p className="text-[1.05rem] font-semibold text-ink">
                Zatiaľ žiadne aktuality
              </p>
              <p className={helperClass}>
                Začnite prvou aktualitou tlačidlom vyššie.
              </p>
            </div>
          ) : (
            <ul className="mt-6 space-y-2.5">
              {items.map((item, index) => (
                <ListRow
                  key={item.id}
                  title={item.title}
                  onEdit={() => openEdit(index)}
                  meta={
                    <>
                      <span className="text-[0.88rem] text-ink-muted">
                        {formatDateSk(item.publishedAt)}
                      </span>
                      <KindBadge label={kindLabel(item)} />
                      <StatusBadge active={item.active} />
                    </>
                  }
                  menuItems={[
                    {
                      label: "Upraviť",
                      onClick: () => openEdit(index),
                    },
                    {
                      label: "Presunúť vyššie",
                      onClick: () => moveItem(index, -1),
                    },
                    {
                      label: "Presunúť nižšie",
                      onClick: () => moveItem(index, 1),
                    },
                    {
                      label: "Vymazať",
                      danger: true,
                      onClick: () => setPendingDeleteIndex(index),
                    },
                  ]}
                />
              ))}
            </ul>
          )}

          <EditPanel
            open={mode !== "closed" && !!draft}
            title={panelTitle}
            onClose={closePanel}
            primaryLabel={
              editor.saving
                ? "Ukladá sa…"
                : mode === "create"
                  ? "Uložiť aktualitu"
                  : "Uložiť zmeny"
            }
            primaryDisabled={editor.saving || uploading}
            onPrimary={() => void saveDraft()}
            error={formError || editor.error}
            message={editor.message}
            footerExtra={
              mode === "edit" && editIndex !== null ? (
                <button
                  type="button"
                  className="text-[0.9rem] font-semibold text-red-700 hover:underline"
                  onClick={() => setPendingDeleteIndex(editIndex)}
                >
                  Vymazať aktualitu
                </button>
              ) : null
            }
          >
            {draft ? (
              <div className="space-y-5">
                <Field label="Nadpis">
                  <input
                    className={inputClass}
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                    placeholder="Napr. ENERGOPOMOC r. 2026"
                  />
                </Field>

                <Field label="Dátum">
                  <input
                    type="date"
                    className={inputClass}
                    value={draft.publishedAt}
                    onChange={(e) =>
                      setDraft({ ...draft, publishedAt: e.target.value })
                    }
                  />
                </Field>

                <Field
                  label="Text aktuality"
                  helper="Text môžete nechať prázdny, ak pridávate iba PDF oznámenie."
                >
                  <textarea
                    className={textareaClass}
                    value={draft.bodyText}
                    onChange={(e) =>
                      setDraft({ ...draft, bodyText: e.target.value })
                    }
                    placeholder="Voliteľný text oznámenia…"
                  />
                </Field>

                <div className="space-y-3">
                  {draft.attachments.length === 0 ? (
                    <PdfAttachment
                      helper="PDF môžete pridať, ak ho k aktualite máte."
                      uploading={uploading}
                      onUpload={(file) => void uploadAttachment(file)}
                      allowExternalLink
                      onSetExternalLink={(url) =>
                        setDraft({
                          ...draft,
                          attachments: [{ title: "Príloha", href: url }],
                        })
                      }
                    />
                  ) : (
                    <>
                      {draft.attachments.map((att, aIndex) => (
                        <PdfAttachment
                          key={`${att.href}-${aIndex}`}
                          label={
                            draft.attachments.length > 1
                              ? `Príloha ${aIndex + 1}`
                              : "Príloha"
                          }
                          href={att.href}
                          uploading={uploading}
                          onUpload={(file) =>
                            void uploadAttachment(file, aIndex)
                          }
                          onClear={() =>
                            setDraft({
                              ...draft,
                              attachments: draft.attachments.filter(
                                (_, i) => i !== aIndex,
                              ),
                            })
                          }
                          allowExternalLink
                          onSetExternalLink={(url) => {
                            const attachments = [...draft.attachments];
                            attachments[aIndex] = { ...att, href: url };
                            setDraft({ ...draft, attachments });
                          }}
                        />
                      ))}
                      <PdfAttachment
                        label="Ďalšia príloha"
                        helper="Voliteľné — pridajte ďalšie PDF, ak ich potrebujete."
                        uploading={uploading}
                        onUpload={(file) => void uploadAttachment(file)}
                      />
                    </>
                  )}
                </div>

                <fieldset>
                  <legend className="text-[0.9rem] font-medium text-ink">
                    Zobraziť na webe
                  </legend>
                  <div className="mt-2.5 flex flex-col gap-2">
                    <label className="inline-flex items-center gap-2.5 text-[0.95rem]">
                      <input
                        type="radio"
                        name="active"
                        checked={draft.active}
                        onChange={() => setDraft({ ...draft, active: true })}
                      />
                      Aktívna
                    </label>
                    <label className="inline-flex items-center gap-2.5 text-[0.95rem]">
                      <input
                        type="radio"
                        name="active"
                        checked={!draft.active}
                        onChange={() => setDraft({ ...draft, active: false })}
                      />
                      Skrytá
                    </label>
                  </div>
                </fieldset>
              </div>
            ) : null}
          </EditPanel>

          <ConfirmDialog
            open={pendingDeleteIndex !== null}
            title="Vymazať?"
            message="Naozaj chcete túto položku vymazať?"
            onCancel={() => setPendingDeleteIndex(null)}
            onConfirm={() => void confirmPendingDelete()}
          />
        </>
      )}
    </AdminShell>
  );
}
