"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { AktualityContent, Notice } from "@/lib/content/schema";

function emptyPdf(): Notice {
  return {
    id: `oznam-${Date.now()}`,
    kind: "pdf",
    title: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    pdfHref: "",
    active: true,
  };
}

function emptyArticle(): Notice {
  return {
    id: `clanok-${Date.now()}`,
    kind: "article",
    title: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    body: [""],
    attachments: [],
    active: true,
  };
}

export default function AdminAktualityPage() {
  const editor = useContentEditor<AktualityContent>("aktuality.json");
  const data = editor.data;

  function updateItem(index: number, next: Notice) {
    if (!data) return;
    const items = [...data.items];
    items[index] = next;
    editor.setData({ ...data, items });
  }

  function move(index: number, dir: -1 | 1) {
    if (!data) return;
    const target = index + dir;
    if (target < 0 || target >= data.items.length) return;
    const items = [...data.items];
    const [row] = items.splice(index, 1);
    items.splice(target, 0, row);
    editor.setData({ ...data, items });
  }

  async function uploadPdf(index: number, file: File, asAttachment = false) {
    if (!data) return;
    const item = data.items[index];
    const uploaded = await editor.uploadFile({
      file,
      kind: "pdf",
      folder: "aktuality",
      baseName: item.title || item.id,
    });
    if (!uploaded) return;
    if (item.kind === "pdf" && !asAttachment) {
      updateItem(index, { ...item, pdfHref: uploaded.url });
    } else if (item.kind === "article") {
      updateItem(index, {
        ...item,
        attachments: [
          ...(item.attachments ?? []),
          { title: file.name.replace(/\.pdf$/i, ""), href: uploaded.url },
        ],
      });
    }
  }

  return (
    <AdminShell title="Aktuality">
      {editor.loading || !data ? (
        <p className="text-ink-muted">Načítavam z GitHub…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nadpis sekcie">
              <input
                className={inputClass}
                value={data.headline}
                onChange={(e) =>
                  editor.setData({ ...data, headline: e.target.value })
                }
              />
            </Field>
            <Field label="Podnadpis">
              <input
                className={inputClass}
                value={data.support}
                onChange={(e) =>
                  editor.setData({ ...data, support: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md border border-forest/20 bg-white px-3 py-2 text-[0.88rem] font-semibold text-forest"
              onClick={() =>
                editor.setData({ ...data, items: [emptyPdf(), ...data.items] })
              }
            >
              + PDF oznámenie
            </button>
            <button
              type="button"
              className="rounded-md border border-forest/20 bg-white px-3 py-2 text-[0.88rem] font-semibold text-forest"
              onClick={() =>
                editor.setData({
                  ...data,
                  items: [emptyArticle(), ...data.items],
                })
              }
            >
              + Textový článok
            </button>
          </div>

          <ul className="mt-5 space-y-4">
            {data.items.map((item, index) => (
              <li
                key={item.id}
                className="rounded-lg border border-forest/10 bg-white p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-soft-sage px-2 py-0.5 text-[0.72rem] font-semibold tracking-wide text-forest uppercase">
                    {item.kind === "pdf" ? "PDF" : "Článok"}
                  </span>
                  <label className="ml-auto inline-flex items-center gap-2 text-[0.88rem]">
                    <input
                      type="checkbox"
                      checked={item.active}
                      onChange={(e) =>
                        updateItem(index, {
                          ...item,
                          active: e.target.checked,
                        })
                      }
                    />
                    Aktívne
                  </label>
                  <button
                    type="button"
                    className="text-[0.82rem] font-semibold text-forest"
                    onClick={() => move(index, -1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="text-[0.82rem] font-semibold text-forest"
                    onClick={() => move(index, 1)}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="text-[0.82rem] font-semibold text-red-700"
                    onClick={() =>
                      editor.setData({
                        ...data,
                        items: data.items.filter((_, i) => i !== index),
                      })
                    }
                  >
                    Zmazať
                  </button>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Field label="Nadpis">
                    <input
                      className={inputClass}
                      value={item.title}
                      onChange={(e) =>
                        updateItem(index, { ...item, title: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Dátum (YYYY-MM-DD)">
                    <input
                      className={inputClass}
                      value={item.publishedAt}
                      onChange={(e) =>
                        updateItem(index, {
                          ...item,
                          publishedAt: e.target.value,
                        })
                      }
                    />
                  </Field>
                </div>

                {item.kind === "pdf" ? (
                  <div className="mt-3 space-y-2">
                    <Field label="PDF URL">
                      <input
                        className={inputClass}
                        value={item.pdfHref}
                        onChange={(e) =>
                          updateItem(index, {
                            ...item,
                            pdfHref: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void uploadPdf(index, file);
                      }}
                    />
                  </div>
                ) : (
                  <div className="mt-3 space-y-3">
                    <Field label="Text (odseky oddelené prázdnym riadkom)">
                      <textarea
                        className={textareaClass}
                        value={item.body.join("\n\n")}
                        onChange={(e) =>
                          updateItem(index, {
                            ...item,
                            body: e.target.value
                              .split(/\n\s*\n/)
                              .map((p) => p.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </Field>
                    <div>
                      <p className="text-[0.84rem] font-medium text-ink">
                        Prílohy PDF
                      </p>
                      <ul className="mt-2 space-y-2">
                        {(item.attachments ?? []).map((att, aIndex) => (
                          <li
                            key={`${att.href}-${aIndex}`}
                            className="flex flex-wrap gap-2"
                          >
                            <input
                              className={inputClass}
                              value={att.title}
                              onChange={(e) => {
                                const attachments = [
                                  ...(item.attachments ?? []),
                                ];
                                attachments[aIndex] = {
                                  ...att,
                                  title: e.target.value,
                                };
                                updateItem(index, { ...item, attachments });
                              }}
                            />
                            <input
                              className={inputClass}
                              value={att.href}
                              onChange={(e) => {
                                const attachments = [
                                  ...(item.attachments ?? []),
                                ];
                                attachments[aIndex] = {
                                  ...att,
                                  href: e.target.value,
                                };
                                updateItem(index, { ...item, attachments });
                              }}
                            />
                            <button
                              type="button"
                              className="text-[0.82rem] font-semibold text-red-700"
                              onClick={() =>
                                updateItem(index, {
                                  ...item,
                                  attachments: (item.attachments ?? []).filter(
                                    (_, i) => i !== aIndex,
                                  ),
                                })
                              }
                            >
                              Odstrániť
                            </button>
                          </li>
                        ))}
                      </ul>
                      <input
                        className="mt-2"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void uploadPdf(index, file, true);
                        }}
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            onSave={() =>
              void editor.save(data, "cms: aktuality — úprava zoznamu")
            }
          />
        </>
      )}
    </AdminShell>
  );
}
