"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { KontaktyContent } from "@/lib/content/schema";

export default function AdminKontaktyDruzstvaPage() {
  const editor = useContentEditor<KontaktyContent>("kontakty.json");
  const data = editor.data;
  const staff = data?.staffDirectory;

  return (
    <AdminShell title="Kontakty družstva">
      {!data || !staff || editor.loading ? (
        <p className="text-ink-muted">Načítavam z GitHub…</p>
      ) : (
        <>
          <Field label="Nadpis sekcie">
            <input
              className={inputClass}
              value={staff.headline}
              onChange={(e) =>
                editor.setData({
                  ...data,
                  staffDirectory: { ...staff, headline: e.target.value },
                })
              }
            />
          </Field>

          <button
            type="button"
            className="mt-4 rounded-md border border-forest/20 bg-white px-3 py-2 text-[0.88rem] font-semibold text-forest"
            onClick={() =>
              editor.setData({
                ...data,
                staffDirectory: {
                  ...staff,
                  groups: [
                    ...staff.groups,
                    {
                      id: `skupina-${Date.now()}`,
                      title: "Nová skupina",
                      people: [{ name: "" }],
                    },
                  ],
                },
              })
            }
          >
            + Skupina
          </button>

          <ul className="mt-5 space-y-4">
            {staff.groups.map((group, gIndex) => (
              <li
                key={group.id}
                className="rounded-lg border border-forest/10 bg-white p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Field label="Skupina" className="min-w-[16rem] flex-1">
                    <input
                      className={inputClass}
                      value={group.title}
                      onChange={(e) => {
                        const groups = [...staff.groups];
                        groups[gIndex] = { ...group, title: e.target.value };
                        editor.setData({
                          ...data,
                          staffDirectory: { ...staff, groups },
                        });
                      }}
                    />
                  </Field>
                  <button
                    type="button"
                    className="mt-6 text-[0.82rem] font-semibold text-red-700"
                    onClick={() =>
                      editor.setData({
                        ...data,
                        staffDirectory: {
                          ...staff,
                          groups: staff.groups.filter((_, i) => i !== gIndex),
                        },
                      })
                    }
                  >
                    Zmazať skupinu
                  </button>
                </div>

                <ul className="mt-3 space-y-3">
                  {group.people.map((person, pIndex) => (
                    <li
                      key={`${group.id}-${pIndex}`}
                      className="grid gap-2 rounded-md border border-forest/8 bg-[#faf9f6] p-3 sm:grid-cols-2"
                    >
                      <Field label="Meno">
                        <input
                          className={inputClass}
                          value={person.name}
                          onChange={(e) => {
                            const groups = [...staff.groups];
                            const people = [...group.people];
                            people[pIndex] = {
                              ...person,
                              name: e.target.value,
                            };
                            groups[gIndex] = { ...group, people };
                            editor.setData({
                              ...data,
                              staffDirectory: { ...staff, groups },
                            });
                          }}
                        />
                      </Field>
                      <Field label="Miestnosť">
                        <input
                          className={inputClass}
                          value={person.room ?? ""}
                          onChange={(e) => {
                            const groups = [...staff.groups];
                            const people = [...group.people];
                            people[pIndex] = {
                              ...person,
                              room: e.target.value || undefined,
                            };
                            groups[gIndex] = { ...group, people };
                            editor.setData({
                              ...data,
                              staffDirectory: { ...staff, groups },
                            });
                          }}
                        />
                      </Field>
                      <Field label="Telefóny (čiarkou)">
                        <input
                          className={inputClass}
                          value={(person.phones ?? []).join(", ")}
                          onChange={(e) => {
                            const phones = e.target.value
                              .split(",")
                              .map((v) => v.trim())
                              .filter(Boolean);
                            const groups = [...staff.groups];
                            const people = [...group.people];
                            people[pIndex] = {
                              ...person,
                              phones: phones.length ? phones : undefined,
                            };
                            groups[gIndex] = { ...group, people };
                            editor.setData({
                              ...data,
                              staffDirectory: { ...staff, groups },
                            });
                          }}
                        />
                      </Field>
                      <Field label="E-maily (čiarkou)">
                        <input
                          className={inputClass}
                          value={(person.emails ?? []).join(", ")}
                          onChange={(e) => {
                            const emails = e.target.value
                              .split(",")
                              .map((v) => v.trim())
                              .filter(Boolean);
                            const groups = [...staff.groups];
                            const people = [...group.people];
                            people[pIndex] = {
                              ...person,
                              emails: emails.length ? emails : undefined,
                            };
                            groups[gIndex] = { ...group, people };
                            editor.setData({
                              ...data,
                              staffDirectory: { ...staff, groups },
                            });
                          }}
                        />
                      </Field>
                      <button
                        type="button"
                        className="text-left text-[0.82rem] font-semibold text-red-700 sm:col-span-2"
                        onClick={() => {
                          const groups = [...staff.groups];
                          groups[gIndex] = {
                            ...group,
                            people: group.people.filter((_, i) => i !== pIndex),
                          };
                          editor.setData({
                            ...data,
                            staffDirectory: { ...staff, groups },
                          });
                        }}
                      >
                        Zmazať osobu
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-3 text-[0.88rem] font-semibold text-forest"
                  onClick={() => {
                    const groups = [...staff.groups];
                    groups[gIndex] = {
                      ...group,
                      people: [...group.people, { name: "" }],
                    };
                    editor.setData({
                      ...data,
                      staffDirectory: { ...staff, groups },
                    });
                  }}
                >
                  + Osoba
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
              void editor.save(data, "cms: kontakty — kontakty družstva")
            }
          />
        </>
      )}
    </AdminShell>
  );
}
