"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { EditPanel } from "@/components/admin/EditPanel";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ListRow, RowMenu } from "@/components/admin/ListRow";
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

type GroupDraft = {
  mode: "create" | "rename";
  groupIndex: number | null;
  title: string;
};

type PendingDelete =
  | { kind: "person"; groupIndex: number; personIndex: number; title: string }
  | { kind: "group"; groupIndex: number; title: string; count: number };

function peopleLabel(n: number) {
  if (n === 1) return "1 kontakt";
  if (n >= 2 && n <= 4) return `${n} kontakty`;
  return `${n} kontaktov`;
}

export default function AdminKontaktyDruzstvaPage() {
  const editor = useContentEditor<KontaktyContent>("kontakty.json");
  const data = editor.data;
  const staff = data?.staffDirectory;
  const [openGroup, setOpenGroup] = useState<number | null>(0);
  const [draft, setDraft] = useState<PersonDraft | null>(null);
  const [groupDraft, setGroupDraft] = useState<GroupDraft | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(
    null,
  );

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

  async function saveGroup() {
    if (!data || !staff || !groupDraft) return;
    const title = groupDraft.title.trim();
    if (!title) {
      setFormError("Zadajte názov skupiny.");
      return;
    }
    setFormError(null);
    const groups = [...staff.groups];
    if (groupDraft.mode === "create") {
      groups.push({
        id: `skupina-${Date.now()}`,
        title,
        people: [],
      });
      const next = {
        ...data,
        staffDirectory: { ...staff, groups },
      };
      editor.setData(next);
      const ok = await editor.save(next, "cms: kontakty — nová skupina");
      if (ok) {
        setGroupDraft(null);
        setOpenGroup(groups.length - 1);
      }
      return;
    }
    if (groupDraft.groupIndex === null) return;
    groups[groupDraft.groupIndex] = {
      ...groups[groupDraft.groupIndex],
      title,
    };
    const next = {
      ...data,
      staffDirectory: { ...staff, groups },
    };
    editor.setData(next);
    const ok = await editor.save(next, "cms: kontakty — premenovanie skupiny");
    if (ok) setGroupDraft(null);
  }

  function moveGroup(index: number, dir: -1 | 1) {
    if (!data || !staff) return;
    const target = index + dir;
    if (target < 0 || target >= staff.groups.length) return;
    const groups = [...staff.groups];
    const [row] = groups.splice(index, 1);
    groups.splice(target, 0, row);
    const next = {
      ...data,
      staffDirectory: { ...staff, groups },
    };
    editor.setData(next);
    setOpenGroup((cur) => {
      if (cur === index) return target;
      if (cur === target) return index;
      return cur;
    });
    void editor.save(next, "cms: kontakty — poradie skupín");
  }

  async function confirmPendingDelete() {
    if (!data || !staff || !pendingDelete) return;
    if (pendingDelete.kind === "person") {
      const groups = [...staff.groups];
      const group = groups[pendingDelete.groupIndex];
      groups[pendingDelete.groupIndex] = {
        ...group,
        people: group.people.filter(
          (_, i) => i !== pendingDelete.personIndex,
        ),
      };
      const next = {
        ...data,
        staffDirectory: { ...staff, groups },
      };
      editor.setData(next);
      await editor.save(next, "cms: kontakty — zmazanie osoby");
      setDraft(null);
    } else {
      const groups = staff.groups.filter(
        (_, i) => i !== pendingDelete.groupIndex,
      );
      const next = {
        ...data,
        staffDirectory: { ...staff, groups },
      };
      editor.setData(next);
      await editor.save(next, "cms: kontakty — zmazanie skupiny");
      setOpenGroup(null);
    }
    setPendingDelete(null);
  }

  return (
    <AdminShell title="Kontakty družstva">
      {!data || !staff || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-[0.95rem] text-ink-muted">
              Vyberte skupinu a potom osobu, ktorú chcete upraviť.
            </p>
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
            {staff.groups.map((group, gIndex) => {
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
                      onClick={() => setOpenGroup(isOpen ? null : gIndex)}
                    >
                      <p className="text-[1.05rem] font-semibold text-ink">
                        {group.title}
                      </p>
                      <p className={helperClass}>
                        {peopleLabel(group.people.length)}
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
                              count: group.people.length,
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
                          onClick={() => openCreate(gIndex)}
                        >
                          + Pridať osobu
                        </button>
                      </div>
                      {group.people.length === 0 ? (
                        <p className="py-6 text-center text-[0.92rem] text-ink-muted">
                          V tejto skupine zatiaľ nie sú kontakty.
                        </p>
                      ) : (
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
                              menuItems={[
                                {
                                  label: "Upraviť",
                                  onClick: () => openEdit(gIndex, pIndex),
                                },
                                {
                                  label: "Vymazať",
                                  danger: true,
                                  onClick: () =>
                                    setPendingDelete({
                                      kind: "person",
                                      groupIndex: gIndex,
                                      personIndex: pIndex,
                                      title: person.name || "kontakt",
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
                  placeholder="Napr. Nové oddelenie"
                />
              </Field>
            ) : null}
          </EditPanel>

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
                <button
                  type="button"
                  className="text-[0.9rem] font-semibold text-red-700 hover:underline"
                  onClick={() =>
                    setPendingDelete({
                      kind: "person",
                      groupIndex: draft.groupIndex,
                      personIndex: draft.personIndex!,
                      title: draft.name || "kontakt",
                    })
                  }
                >
                  Vymazať kontakt
                </button>
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

          <ConfirmDialog
            open={!!pendingDelete}
            title="Vymazať?"
            message={
              pendingDelete?.kind === "group"
                ? pendingDelete.count > 0
                  ? `Táto skupina obsahuje ${peopleLabel(pendingDelete.count)}. Vymazaním skupiny sa vymažú aj tieto položky.`
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
