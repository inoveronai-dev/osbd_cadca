"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { EditPanel } from "@/components/admin/EditPanel";
import { ListRow } from "@/components/admin/ListRow";
import {
  btnPrimary,
  helperClass,
} from "@/components/admin/admin-ui";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { KontaktyContent } from "@/lib/content/schema";

type PersonDraft = {
  groupIndex: number;
  personIndex: number | null;
  name: string;
  room: string;
  phones: string[];
  emails: string[];
};

export default function AdminKontaktyDruzstvaPage() {
  const editor = useContentEditor<KontaktyContent>("kontakty.json");
  const data = editor.data;
  const staff = data?.staffDirectory;
  const [openGroup, setOpenGroup] = useState<number | null>(0);
  const [draft, setDraft] = useState<PersonDraft | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function openCreate(groupIndex: number) {
    setDraft({
      groupIndex,
      personIndex: null,
      name: "",
      room: "",
      phones: [""],
      emails: [""],
    });
    setFormError(null);
    setConfirmDelete(false);
    editor.setError(null);
    editor.setMessage(null);
  }

  function openEdit(groupIndex: number, personIndex: number) {
    if (!staff) return;
    const person = staff.groups[groupIndex].people[personIndex];
    setDraft({
      groupIndex,
      personIndex,
      name: person.name,
      room: person.room ?? "",
      phones: person.phones?.length ? [...person.phones] : [""],
      emails: person.emails?.length ? [...person.emails] : [""],
    });
    setFormError(null);
    setConfirmDelete(false);
    editor.setError(null);
    editor.setMessage(null);
  }

  async function savePerson() {
    if (!data || !staff || !draft) return;
    const name = draft.name.trim();
    if (!name) {
      setFormError("Zadajte meno.");
      return;
    }
    setFormError(null);
    const phones = draft.phones.map((p) => p.trim()).filter(Boolean);
    const emails = draft.emails.map((e) => e.trim()).filter(Boolean);
    const person = {
      name,
      room: draft.room.trim() || undefined,
      phones: phones.length ? phones : undefined,
      emails: emails.length ? emails : undefined,
    };
    const groups = [...staff.groups];
    const group = groups[draft.groupIndex];
    const people = [...group.people];
    if (draft.personIndex === null) {
      people.push(person);
    } else {
      people[draft.personIndex] = person;
    }
    groups[draft.groupIndex] = { ...group, people };
    const next = {
      ...data,
      staffDirectory: { ...staff, groups },
    };
    editor.setData(next);
    const ok = await editor.save(next, "cms: kontakty — osoba");
    if (ok) setDraft(null);
  }

  async function deletePerson() {
    if (!data || !staff || !draft || draft.personIndex === null) return;
    const groups = [...staff.groups];
    const group = groups[draft.groupIndex];
    groups[draft.groupIndex] = {
      ...group,
      people: group.people.filter((_, i) => i !== draft.personIndex),
    };
    const next = {
      ...data,
      staffDirectory: { ...staff, groups },
    };
    editor.setData(next);
    const ok = await editor.save(next, "cms: kontakty — zmazanie osoby");
    if (ok) setDraft(null);
  }

  return (
    <AdminShell title="Kontakty družstva">
      {!data || !staff || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <p className="max-w-xl text-[0.95rem] text-ink-muted">
            Vyberte skupinu a potom osobu, ktorú chcete upraviť.
          </p>

          <ul className="mt-6 space-y-3">
            {staff.groups.map((group, gIndex) => {
              const isOpen = openGroup === gIndex;
              return (
                <li
                  key={group.id}
                  className="overflow-hidden rounded-lg border border-forest/10 bg-white"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() => setOpenGroup(isOpen ? null : gIndex)}
                  >
                    <div>
                      <p className="text-[1.05rem] font-semibold text-ink">
                        {group.title}
                      </p>
                      <p className={helperClass}>
                        {group.people.length}{" "}
                        {group.people.length === 1
                          ? "kontakt"
                          : group.people.length < 5
                            ? "kontakty"
                            : "kontaktov"}
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
                          + Pridať osobu
                        </button>
                      </div>
                      <ul className="space-y-2">
                        {group.people.map((person, pIndex) => (
                          <ListRow
                            key={`${group.id}-${pIndex}`}
                            title={person.name || "Bez mena"}
                            onEdit={() => openEdit(gIndex, pIndex)}
                            meta={
                              <>
                                {person.room ? (
                                  <span className="text-[0.84rem] text-ink-muted">
                                    {person.room}
                                  </span>
                                ) : null}
                                {person.phones?.[0] ? (
                                  <span className="text-[0.84rem] text-ink-muted">
                                    {person.phones[0]}
                                  </span>
                                ) : null}
                              </>
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

          {editor.message && !draft ? (
            <p className="mt-4 text-[0.92rem] font-medium text-forest">
              ✓ {editor.message}
            </p>
          ) : null}

          <EditPanel
            open={!!draft}
            title={draft?.personIndex === null ? "Nová osoba" : "Upraviť kontakt"}
            onClose={() => setDraft(null)}
            primaryLabel={
              editor.saving
                ? "Ukladá sa…"
                : draft?.personIndex === null
                  ? "Uložiť kontakt"
                  : "Uložiť zmeny"
            }
            primaryDisabled={editor.saving}
            onPrimary={() => void savePerson()}
            error={formError || editor.error}
            message={editor.message}
            footerExtra={
              draft?.personIndex !== null && draft ? (
                confirmDelete ? (
                  <div className="flex flex-wrap gap-2 text-[0.84rem]">
                    <span className="text-red-700">Naozaj vymazať?</span>
                    <button
                      type="button"
                      className="font-semibold text-red-700"
                      onClick={() => void deletePerson()}
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
                <Field label="Meno">
                  <input
                    className={inputClass}
                    value={draft.name}
                    onChange={(e) =>
                      setDraft({ ...draft, name: e.target.value })
                    }
                  />
                </Field>
                <Field label="Miestnosť">
                  <input
                    className={inputClass}
                    value={draft.room}
                    onChange={(e) =>
                      setDraft({ ...draft, room: e.target.value })
                    }
                  />
                </Field>

                <div>
                  <p className="text-[0.9rem] font-medium text-ink">Telefón</p>
                  <div className="mt-1.5 space-y-2">
                    {draft.phones.map((phone, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          className={inputClass}
                          value={phone}
                          onChange={(e) => {
                            const phones = [...draft.phones];
                            phones[i] = e.target.value;
                            setDraft({ ...draft, phones });
                          }}
                        />
                        {draft.phones.length > 1 ? (
                          <button
                            type="button"
                            className="shrink-0 text-[0.84rem] text-ink-muted hover:text-red-700"
                            onClick={() =>
                              setDraft({
                                ...draft,
                                phones: draft.phones.filter((_, j) => j !== i),
                              })
                            }
                          >
                            Odstrániť
                          </button>
                        ) : null}
                      </div>
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
                      <div key={i} className="flex gap-2">
                        <input
                          className={inputClass}
                          type="email"
                          value={email}
                          onChange={(e) => {
                            const emails = [...draft.emails];
                            emails[i] = e.target.value;
                            setDraft({ ...draft, emails });
                          }}
                        />
                        {draft.emails.length > 1 ? (
                          <button
                            type="button"
                            className="shrink-0 text-[0.84rem] text-ink-muted hover:text-red-700"
                            onClick={() =>
                              setDraft({
                                ...draft,
                                emails: draft.emails.filter((_, j) => j !== i),
                              })
                            }
                          >
                            Odstrániť
                          </button>
                        ) : null}
                      </div>
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
              </div>
            ) : null}
          </EditPanel>
        </>
      )}
    </AdminShell>
  );
}
