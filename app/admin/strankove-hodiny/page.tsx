"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { KontaktyContent } from "@/lib/content/schema";

export default function AdminHodinyPage() {
  const editor = useContentEditor<KontaktyContent>("kontakty.json");
  const data = editor.data;
  const hours = data?.officeHours;

  return (
    <AdminShell title="Stránkové hodiny">
      {!data || !hours || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <Field label="Nadpis">
            <input
              className={inputClass}
              value={hours.title}
              onChange={(e) =>
                editor.setData({
                  ...data,
                  officeHours: { ...hours, title: e.target.value },
                })
              }
            />
          </Field>

          <ul className="mt-5 space-y-3">
            {hours.schedule.map((row, index) => (
              <li
                key={row.day}
                className="grid gap-3 rounded-lg border border-forest/10 bg-white p-4 sm:grid-cols-2"
              >
                <Field label="Deň">
                  <input
                    className={inputClass}
                    value={row.day}
                    onChange={(e) => {
                      const schedule = [...hours.schedule];
                      schedule[index] = { ...row, day: e.target.value };
                      editor.setData({
                        ...data,
                        officeHours: { ...hours, schedule },
                      });
                    }}
                  />
                </Field>
                <Field label="Hodiny (riadky = viac časov)">
                  <textarea
                    className={textareaClass}
                    value={
                      Array.isArray(row.hours)
                        ? row.hours.join("\n")
                        : row.hours
                    }
                    onChange={(e) => {
                      const lines = e.target.value
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean);
                      const schedule = [...hours.schedule];
                      schedule[index] = {
                        ...row,
                        hours: lines.length > 1 ? lines : lines[0] || "",
                      };
                      editor.setData({
                        ...data,
                        officeHours: { ...hours, schedule },
                      });
                    }}
                  />
                </Field>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-4 rounded-lg border border-forest/10 bg-white p-4 sm:grid-cols-2">
            <Field label="Obed — nadpis">
              <input
                className={inputClass}
                value={hours.lunchBreak.title}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    officeHours: {
                      ...hours,
                      lunchBreak: {
                        ...hours.lunchBreak,
                        title: e.target.value,
                      },
                    },
                  })
                }
              />
            </Field>
            <Field label="Obed — detail">
              <input
                className={inputClass}
                value={hours.lunchBreak.detail}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    officeHours: {
                      ...hours,
                      lunchBreak: {
                        ...hours.lunchBreak,
                        detail: e.target.value,
                      },
                    },
                  })
                }
              />
            </Field>
          </div>

          <div className="mt-6 space-y-3">
            <h2 className="text-[1.05rem] font-semibold text-forest">Extras</h2>
            {hours.extras.map((extra, index) => (
              <div
                key={`${extra.title}-${index}`}
                className="grid gap-3 rounded-lg border border-forest/10 bg-white p-4 sm:grid-cols-2"
              >
                <Field label="Nadpis">
                  <input
                    className={inputClass}
                    value={extra.title}
                    onChange={(e) => {
                      const extras = [...hours.extras];
                      extras[index] = { ...extra, title: e.target.value };
                      editor.setData({
                        ...data,
                        officeHours: { ...hours, extras },
                      });
                    }}
                  />
                </Field>
                <Field label="Detail">
                  <input
                    className={inputClass}
                    value={extra.detail}
                    onChange={(e) => {
                      const extras = [...hours.extras];
                      extras[index] = { ...extra, detail: e.target.value };
                      editor.setData({
                        ...data,
                        officeHours: { ...hours, extras },
                      });
                    }}
                  />
                </Field>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-forest/10 bg-white p-4">
            <Field label="Havarijná služba — nadpis">
              <input
                className={inputClass}
                value={hours.emergency.title}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    officeHours: {
                      ...hours,
                      emergency: {
                        ...hours.emergency,
                        title: e.target.value,
                      },
                    },
                  })
                }
              />
            </Field>
            <Field label="Riady (jeden na riadok)" className="mt-3">
              <textarea
                className={textareaClass}
                value={hours.emergency.lines.join("\n")}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    officeHours: {
                      ...hours,
                      emergency: {
                        ...hours.emergency,
                        lines: e.target.value
                          .split("\n")
                          .map((l) => l.trim())
                          .filter(Boolean),
                      },
                    },
                  })
                }
              />
            </Field>
          </div>

          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            label="Uložiť stránkové hodiny"
            onSave={() =>
              void editor.save(data, "cms: kontakty — stránkové hodiny")
            }
          />
        </>
      )}
    </AdminShell>
  );
}
