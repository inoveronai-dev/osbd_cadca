"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { EditPanel } from "@/components/admin/EditPanel";
import { ListRow } from "@/components/admin/ListRow";
import { btnPrimary, helperClass } from "@/components/admin/admin-ui";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { KontaktyContent } from "@/lib/content/schema";

const ICONS = [
  "droplets",
  "tv",
  "elevator",
  "waves",
  "flame",
  "zap",
  "gas",
  "key",
] as const;

type Block = KontaktyContent["faultContacts"]["blocks"][number];

type Draft = {
  index: number | null;
  title: string;
  subtitle: string;
  person: string;
  phones: string[];
  emails: string[];
  icon: (typeof ICONS)[number];
  primary: boolean;
};

function blockToDraft(block: Block, index: number): Draft {
  return {
    index,
    title: block.title,
    subtitle: block.subtitle ?? "",
    person: block.person ?? "",
    phones: block.phones?.length ? [...block.phones] : [""],
    emails: block.emails?.length ? [...block.emails] : [""],
    icon: block.icon,
    primary: block.primary ?? false,
  };
}

export default function AdminPoruchyPage() {
  const editor = useContentEditor<KontaktyContent>("kontakty.json");
  const data = editor.data;
  const faults = data?.faultContacts;
  const [draft, setDraft] = useState<Draft | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function move(index: number, dir: -1 | 1) {
    if (!data || !faults) return;
    const target = index + dir;
    if (target < 0 || target >= faults.blocks.length) return;
    const blocks = [...faults.blocks];
    const [row] = blocks.splice(index, 1);
    blocks.splice(target, 0, row);
    const next = { ...data, faultContacts: { ...faults, blocks } };
    editor.setData(next);
    void editor.save(next, "cms: kontakty — poradie porúch");
  }

  async function saveBlock() {
    if (!data || !faults || !draft) return;
    if (!draft.title.trim()) {
      setFormError("Zadajte názov.");
      return;
    }
    setFormError(null);
    const phones = draft.phones.map((p) => p.trim()).filter(Boolean);
    const emails = draft.emails.map((e) => e.trim()).filter(Boolean);
    const base =
      draft.index === null
        ? {
            id: `porucha-${Date.now()}`,
            providers: undefined,
            schedule: undefined,
            phoneNotes: undefined,
          }
        : faults.blocks[draft.index];
    const block: Block = {
      ...base,
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim() || undefined,
      person: draft.person.trim() || undefined,
      phones: phones.length ? phones : undefined,
      emails: emails.length ? emails : undefined,
      icon: draft.icon,
      primary: draft.primary || undefined,
    };
    const blocks = [...faults.blocks];
    if (draft.index === null) blocks.push(block);
    else blocks[draft.index] = block;
    const next = { ...data, faultContacts: { ...faults, blocks } };
    editor.setData(next);
    const ok = await editor.save(next, "cms: kontakty — poruchy");
    if (ok) setDraft(null);
  }

  async function deleteBlock() {
    if (!data || !faults || !draft || draft.index === null) return;
    const blocks = faults.blocks.filter((_, i) => i !== draft.index);
    const next = { ...data, faultContacts: { ...faults, blocks } };
    editor.setData(next);
    const ok = await editor.save(next, "cms: kontakty — zmazanie poruchy");
    if (ok) setDraft(null);
  }

  return (
    <AdminShell title="Poruchy a závady">
      {!data || !faults || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-[0.95rem] text-ink-muted">
              Kontakty na nahlásenie porúch. Upravujte po jednom bloku.
            </p>
            <button
              type="button"
              className={btnPrimary}
              onClick={() => {
                setDraft({
                  index: null,
                  title: "",
                  subtitle: "",
                  person: "",
                  phones: [""],
                  emails: [""],
                  icon: "droplets",
                  primary: false,
                });
                setFormError(null);
                setConfirmDelete(false);
              }}
            >
              + Pridať kontakt
            </button>
          </div>

          <ul className="mt-6 space-y-2.5">
            {faults.blocks.map((block, index) => (
              <ListRow
                key={block.id}
                title={block.title}
                onEdit={() => {
                  setDraft(blockToDraft(block, index));
                  setFormError(null);
                  setConfirmDelete(false);
                }}
                meta={
                  <>
                    {block.person ? (
                      <span className="text-[0.84rem] text-ink-muted">
                        {block.person}
                      </span>
                    ) : null}
                    {block.phones?.[0] ? (
                      <span className="text-[0.84rem] text-ink-muted">
                        {block.phones[0]}
                      </span>
                    ) : (
                      <span className={helperClass}>Bez telefónu</span>
                    )}
                  </>
                }
                menuItems={[
                  {
                    label: "Presunúť vyššie",
                    onClick: () => move(index, -1),
                  },
                  {
                    label: "Presunúť nižšie",
                    onClick: () => move(index, 1),
                  },
                ]}
              />
            ))}
          </ul>

          {editor.message && !draft ? (
            <p className="mt-4 text-[0.92rem] font-medium text-forest">
              ✓ {editor.message}
            </p>
          ) : null}

          <EditPanel
            open={!!draft}
            title={draft?.index === null ? "Nový kontakt" : "Upraviť kontakt"}
            onClose={() => setDraft(null)}
            primaryLabel={editor.saving ? "Ukladá sa…" : "Uložiť kontakt"}
            primaryDisabled={editor.saving}
            onPrimary={() => void saveBlock()}
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
                      onClick={() => void deleteBlock()}
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
                    Vymazať kontakt
                  </button>
                )
              ) : null
            }
          >
            {draft ? (
              <div className="space-y-5">
                <Field label="Názov">
                  <input
                    className={inputClass}
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                  />
                </Field>
                <Field label="Doplňujúci text">
                  <input
                    className={inputClass}
                    value={draft.subtitle}
                    onChange={(e) =>
                      setDraft({ ...draft, subtitle: e.target.value })
                    }
                  />
                </Field>
                <Field label="Osoba">
                  <input
                    className={inputClass}
                    value={draft.person}
                    onChange={(e) =>
                      setDraft({ ...draft, person: e.target.value })
                    }
                  />
                </Field>

                <div>
                  <p className="text-[0.9rem] font-medium text-ink">Telefón</p>
                  <div className="mt-1.5 space-y-2">
                    {draft.phones.map((phone, i) => (
                      <input
                        key={i}
                        className={inputClass}
                        value={phone}
                        onChange={(e) => {
                          const phones = [...draft.phones];
                          phones[i] = e.target.value;
                          setDraft({ ...draft, phones });
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-2 text-[0.9rem] font-semibold text-forest hover:underline"
                    onClick={() =>
                      setDraft({ ...draft, phones: [...draft.phones, ""] })
                    }
                  >
                    + Pridať ďalší telefón
                  </button>
                </div>

                <div>
                  <p className="text-[0.9rem] font-medium text-ink">E-mail</p>
                  <div className="mt-1.5 space-y-2">
                    {draft.emails.map((email, i) => (
                      <input
                        key={i}
                        type="email"
                        className={inputClass}
                        value={email}
                        onChange={(e) => {
                          const emails = [...draft.emails];
                          emails[i] = e.target.value;
                          setDraft({ ...draft, emails });
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-2 text-[0.9rem] font-semibold text-forest hover:underline"
                    onClick={() =>
                      setDraft({ ...draft, emails: [...draft.emails, ""] })
                    }
                  >
                    + Pridať ďalší e-mail
                  </button>
                </div>

                <Field label="Ikona na webe">
                  <select
                    className={inputClass}
                    value={draft.icon}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        icon: e.target.value as (typeof ICONS)[number],
                      })
                    }
                  >
                    {ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </Field>

                <label className="inline-flex items-center gap-2.5 text-[0.95rem]">
                  <input
                    type="checkbox"
                    checked={draft.primary}
                    onChange={(e) =>
                      setDraft({ ...draft, primary: e.target.checked })
                    }
                  />
                  Zvýrazniť ako hlavný kontakt
                </label>
              </div>
            ) : null}
          </EditPanel>
        </>
      )}
    </AdminShell>
  );
}
