"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, textareaClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { HistoriaContent } from "@/lib/content/schema";

export default function AdminHistoriaPage() {
  const editor = useContentEditor<HistoriaContent>("historia.json");
  const data = editor.data;

  return (
    <AdminShell title="História">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam…</p>
      ) : (
        <>
          <p className="mb-3 text-[0.9rem] text-ink-muted">
            Upravujte odseky ako obyčajný text. Odseky oddelte prázdnym riadkom.
            Bez HTML.
          </p>
          <Field label="Text histórie">
            <textarea
              className={`${textareaClass} min-h-[22rem]`}
              value={data.paragraphs.join("\n\n")}
              onChange={(e) =>
                editor.setData({
                  paragraphs: e.target.value
                    .split(/\n\s*\n/)
                    .map((p) => p.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            label="Uložiť históriu"
            onSave={() => void editor.save(data, "cms: historia — úprava")}
          />
        </>
      )}
    </AdminShell>
  );
}
