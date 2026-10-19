"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { EditPanel } from "@/components/admin/EditPanel";
import { ListRow } from "@/components/admin/ListRow";
import { SaveBar } from "@/components/admin/SaveBar";
import { btnPrimary, helperClass } from "@/components/admin/admin-ui";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { OrganyContent } from "@/lib/content/schema";

type MemberKey = "predstavenstvo" | "kontrolnaKomisia";

type Draft = {
  key: MemberKey;
  index: number | null;
  name: string;
  role: string;
};

export default function AdminOrganyPage() {
  const editor = useContentEditor<OrganyContent>("organy.json");
  const data = editor.data;
  const [openKey, setOpenKey] = useState<MemberKey | null>("predstavenstvo");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const groups: { key: MemberKey; title: string }[] = [
    { key: "predstavenstvo", title: "Predstavenstvo" },
    { key: "kontrolnaKomisia", title: "Kontrolná komisia" },
  ];

  async function saveMember() {
    if (!data || !draft) return;
    if (!draft.name.trim() || !draft.role.trim()) {
      setFormError("Vyplňte meno aj funkciu.");
      return;
    }
    setFormError(null);
    const members = [...data[draft.key]];
    const row = { name: draft.name.trim(), role: draft.role.trim() };
    if (draft.index === null) members.push(row);
    else members[draft.index] = row;
    const next = { ...data, [draft.key]: members };
    editor.setData(next);
    const ok = await editor.save(next, "cms: organy — člen");
    if (ok) setDraft(null);
  }

  async function deleteMember() {
    if (!data || !draft || draft.index === null) return;
    const members = data[draft.key].filter((_, i) => i !== draft.index);
    const next = { ...data, [draft.key]: members };
    editor.setData(next);
    const ok = await editor.save(next, "cms: organy — zmazanie");
    if (ok) setDraft(null);
  }

  return (
    <AdminShell title="Orgány družstva">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <ul className="space-y-3">
            {groups.map(({ key, title }) => {
              const members = data[key];
              const isOpen = openKey === key;
              return (
                <li
                  key={key}
                  className="overflow-hidden rounded-lg border border-forest/10 bg-white"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                  >
                    <div>
                      <p className="text-[1.05rem] font-semibold text-ink">
                        {title}
                      </p>
                      <p className={helperClass}>
                        {members.length}{" "}
                        {members.length === 1 ? "člen" : "členov"}
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
                          onClick={() => {
                            setDraft({
                              key,
                              index: null,
                              name: "",
                              role: "",
                            });
                            setFormError(null);
                            setConfirmDelete(false);
                          }}
                        >
                          + Pridať člena
                        </button>
                      </div>
                      <ul className="space-y-2">
                        {members.map((member, index) => (
                          <ListRow
                            key={`${key}-${index}`}
                            title={member.name || "Bez mena"}
                            onEdit={() => {
                              setDraft({
                                key,
                                index,
                                name: member.name,
                                role: member.role,
                              });
                              setFormError(null);
                              setConfirmDelete(false);
                            }}
                            meta={
                              <span className="text-[0.84rem] text-ink-muted">
                                {member.role}
                              </span>
                            }
                          />
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 max-w-xl rounded-lg border border-forest/10 bg-white p-5">
            <Field label="Záverečný text">
              <textarea
                className={textareaClass}
                value={data.closingText}
                onChange={(e) =>
                  editor.setData({ ...data, closingText: e.target.value })
                }
              />
            </Field>
            <SaveBar
              saving={editor.saving && !draft}
              message={!draft ? editor.message : null}
              hint={!draft ? editor.hint : null}
              error={!draft ? editor.error : null}
              label="Uložiť text"
              onSave={() => void editor.save(data, "cms: organy — text")}
            />
          </div>

          <EditPanel
            open={!!draft}
            title={draft?.index === null ? "Nový člen" : "Upraviť člena"}
            onClose={() => setDraft(null)}
            primaryLabel={editor.saving ? "Ukladá sa…" : "Uložiť"}
            primaryDisabled={editor.saving}
            onPrimary={() => void saveMember()}
            error={formError || editor.error}
            message={editor.message}
            footerExtra={
              draft?.index !== null && draft ? (
                confirmDelete ? (
                  <div className="flex flex-wrap gap-2 text-[0.84rem]">
                    <span className="text-red-700">Naozaj vymazať?</span>
                    <button
                      type="button"
                      className="font-semibold text-red-700"
                      onClick={() => void deleteMember()}
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
                    Vymazať člena
                  </button>
                )
              ) : null
            }
          >
            {draft ? (
              <div className="space-y-5">
                <Field label="Meno">
                  <input
                    className={inputClass}
                    value={draft.name}
                    onChange={(e) =>
                      setDraft({ ...draft, name: e.target.value })
                    }
                  />
                </Field>
                <Field label="Funkcia">
                  <input
                    className={inputClass}
                    value={draft.role}
                    onChange={(e) =>
                      setDraft({ ...draft, role: e.target.value })
                    }
                  />
                </Field>
              </div>
            ) : null}
          </EditPanel>
        </>
      )}
    </AdminShell>
  );
}
