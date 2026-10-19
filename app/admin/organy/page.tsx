"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { OrganyContent } from "@/lib/content/schema";

function MemberList({
  title,
  members,
  onChange,
}: {
  title: string;
  members: OrganyContent["predstavenstvo"];
  onChange: (next: OrganyContent["predstavenstvo"]) => void;
}) {
  return (
    <section className="rounded-lg border border-forest/10 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[1.05rem] font-semibold text-forest">{title}</h2>
        <button
          type="button"
          className="text-[0.88rem] font-semibold text-forest"
          onClick={() => onChange([...members, { name: "", role: "" }])}
        >
          + Člen
        </button>
      </div>
      <ul className="mt-3 space-y-3">
        {members.map((member, index) => (
          <li
            key={`${member.name}-${index}`}
            className="grid gap-2 rounded-md border border-forest/8 bg-[#faf9f6] p-3 sm:grid-cols-[1fr_1fr_auto]"
          >
            <Field label="Meno">
              <input
                className={inputClass}
                value={member.name}
                onChange={(e) => {
                  const next = [...members];
                  next[index] = { ...member, name: e.target.value };
                  onChange(next);
                }}
              />
            </Field>
            <Field label="Funkcia">
              <input
                className={inputClass}
                value={member.role}
                onChange={(e) => {
                  const next = [...members];
                  next[index] = { ...member, role: e.target.value };
                  onChange(next);
                }}
              />
            </Field>
            <div className="flex items-end gap-2">
              <button
                type="button"
                className="text-[0.82rem] font-semibold text-forest"
                onClick={() => {
                  if (index === 0) return;
                  const next = [...members];
                  const [row] = next.splice(index, 1);
                  next.splice(index - 1, 0, row);
                  onChange(next);
                }}
              >
                ↑
              </button>
              <button
                type="button"
                className="text-[0.82rem] font-semibold text-forest"
                onClick={() => {
                  if (index >= members.length - 1) return;
                  const next = [...members];
                  const [row] = next.splice(index, 1);
                  next.splice(index + 1, 0, row);
                  onChange(next);
                }}
              >
                ↓
              </button>
              <button
                type="button"
                className="text-[0.82rem] font-semibold text-red-700"
                onClick={() => onChange(members.filter((_, i) => i !== index))}
              >
                Zmazať
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AdminOrganyPage() {
  const editor = useContentEditor<OrganyContent>("organy.json");
  const data = editor.data;

  return (
    <AdminShell title="Orgány družstva">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam z GitHub…</p>
      ) : (
        <div className="space-y-5">
          <MemberList
            title="Predstavenstvo"
            members={data.predstavenstvo}
            onChange={(predstavenstvo) =>
              editor.setData({ ...data, predstavenstvo })
            }
          />
          <MemberList
            title="Kontrolná komisia"
            members={data.kontrolnaKomisia}
            onChange={(kontrolnaKomisia) =>
              editor.setData({ ...data, kontrolnaKomisia })
            }
          />
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
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            onSave={() => void editor.save(data, "cms: organy — úprava")}
          />
        </div>
      )}
    </AdminShell>
  );
}
