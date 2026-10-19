"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
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

export default function AdminPoruchyPage() {
  const editor = useContentEditor<KontaktyContent>("kontakty.json");
  const data = editor.data;
  const faults = data?.faultContacts;

  return (
    <AdminShell title="Poruchy a závady">
      {!data || !faults || editor.loading ? (
        <p className="text-ink-muted">Načítavam z GitHub…</p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Nadpis">
              <input
                className={inputClass}
                value={faults.headline}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    faultContacts: { ...faults, headline: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Podnadpis">
              <input
                className={inputClass}
                value={faults.support}
                onChange={(e) =>
                  editor.setData({
                    ...data,
                    faultContacts: { ...faults, support: e.target.value },
                  })
                }
              />
            </Field>
          </div>

          <button
            type="button"
            className="mt-4 rounded-md border border-forest/20 bg-white px-3 py-2 text-[0.88rem] font-semibold text-forest"
            onClick={() =>
              editor.setData({
                ...data,
                faultContacts: {
                  ...faults,
                  blocks: [
                    ...faults.blocks,
                    {
                      id: `porucha-${Date.now()}`,
                      title: "Nový kontakt",
                      phones: [],
                      icon: "droplets",
                    },
                  ],
                },
              })
            }
          >
            + Blok
          </button>

          <ul className="mt-5 space-y-4">
            {faults.blocks.map((block, index) => (
              <li
                key={block.id}
                className="rounded-lg border border-forest/10 bg-white p-4"
              >
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="text-[0.82rem] font-semibold text-forest"
                    onClick={() => {
                      if (index === 0) return;
                      const blocks = [...faults.blocks];
                      const [row] = blocks.splice(index, 1);
                      blocks.splice(index - 1, 0, row);
                      editor.setData({
                        ...data,
                        faultContacts: { ...faults, blocks },
                      });
                    }}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="text-[0.82rem] font-semibold text-forest"
                    onClick={() => {
                      if (index >= faults.blocks.length - 1) return;
                      const blocks = [...faults.blocks];
                      const [row] = blocks.splice(index, 1);
                      blocks.splice(index + 1, 0, row);
                      editor.setData({
                        ...data,
                        faultContacts: { ...faults, blocks },
                      });
                    }}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="ml-auto text-[0.82rem] font-semibold text-red-700"
                    onClick={() =>
                      editor.setData({
                        ...data,
                        faultContacts: {
                          ...faults,
                          blocks: faults.blocks.filter((_, i) => i !== index),
                        },
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
                      value={block.title}
                      onChange={(e) => {
                        const blocks = [...faults.blocks];
                        blocks[index] = { ...block, title: e.target.value };
                        editor.setData({
                          ...data,
                          faultContacts: { ...faults, blocks },
                        });
                      }}
                    />
                  </Field>
                  <Field label="Podtitul">
                    <input
                      className={inputClass}
                      value={block.subtitle ?? ""}
                      onChange={(e) => {
                        const blocks = [...faults.blocks];
                        blocks[index] = {
                          ...block,
                          subtitle: e.target.value || undefined,
                        };
                        editor.setData({
                          ...data,
                          faultContacts: { ...faults, blocks },
                        });
                      }}
                    />
                  </Field>
                  <Field label="Osoba">
                    <input
                      className={inputClass}
                      value={block.person ?? ""}
                      onChange={(e) => {
                        const blocks = [...faults.blocks];
                        blocks[index] = {
                          ...block,
                          person: e.target.value || undefined,
                        };
                        editor.setData({
                          ...data,
                          faultContacts: { ...faults, blocks },
                        });
                      }}
                    />
                  </Field>
                  <Field label="Ikona">
                    <select
                      className={inputClass}
                      value={block.icon}
                      onChange={(e) => {
                        const blocks = [...faults.blocks];
                        blocks[index] = {
                          ...block,
                          icon: e.target.value as (typeof ICONS)[number],
                        };
                        editor.setData({
                          ...data,
                          faultContacts: { ...faults, blocks },
                        });
                      }}
                    >
                      {ICONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Telefóny (čiarkou)">
                    <input
                      className={inputClass}
                      value={(block.phones ?? []).join(", ")}
                      onChange={(e) => {
                        const phones = e.target.value
                          .split(",")
                          .map((v) => v.trim())
                          .filter(Boolean);
                        const blocks = [...faults.blocks];
                        blocks[index] = {
                          ...block,
                          phones: phones.length ? phones : undefined,
                        };
                        editor.setData({
                          ...data,
                          faultContacts: { ...faults, blocks },
                        });
                      }}
                    />
                  </Field>
                  <Field label="E-maily (čiarkou)">
                    <input
                      className={inputClass}
                      value={(block.emails ?? []).join(", ")}
                      onChange={(e) => {
                        const emails = e.target.value
                          .split(",")
                          .map((v) => v.trim())
                          .filter(Boolean);
                        const blocks = [...faults.blocks];
                        blocks[index] = {
                          ...block,
                          emails: emails.length ? emails : undefined,
                        };
                        editor.setData({
                          ...data,
                          faultContacts: { ...faults, blocks },
                        });
                      }}
                    />
                  </Field>
                </div>
                <Field label="Poskytovatelia (meno|telefóny; ďalší…)" className="mt-3">
                  <textarea
                    className={textareaClass}
                    value={(block.providers ?? [])
                      .map(
                        (p) =>
                          `${p.name}|${(p.phones ?? []).join(", ")}`,
                      )
                      .join("\n")}
                    onChange={(e) => {
                      const providers = e.target.value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line) => {
                          const [name, phonesRaw = ""] = line.split("|");
                          const phones = phonesRaw
                            .split(",")
                            .map((v) => v.trim())
                            .filter(Boolean);
                          return {
                            name: name.trim(),
                            phones: phones.length ? phones : undefined,
                          };
                        });
                      const blocks = [...faults.blocks];
                      blocks[index] = {
                        ...block,
                        providers: providers.length ? providers : undefined,
                      };
                      editor.setData({
                        ...data,
                        faultContacts: { ...faults, blocks },
                      });
                    }}
                  />
                </Field>
                <label className="mt-3 inline-flex items-center gap-2 text-[0.88rem]">
                  <input
                    type="checkbox"
                    checked={block.primary ?? false}
                    onChange={(e) => {
                      const blocks = [...faults.blocks];
                      blocks[index] = {
                        ...block,
                        primary: e.target.checked || undefined,
                      };
                      editor.setData({
                        ...data,
                        faultContacts: { ...faults, blocks },
                      });
                    }}
                  />
                  Primárny blok
                </label>
              </li>
            ))}
          </ul>

          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            onSave={() =>
              void editor.save(data, "cms: kontakty — poruchy a závady")
            }
          />
        </>
      )}
    </AdminShell>
  );
}
