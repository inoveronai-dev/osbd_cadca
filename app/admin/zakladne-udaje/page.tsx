"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveBar } from "@/components/admin/SaveBar";
import { useContentEditor } from "@/components/admin/useContentEditor";
import type { SiteContent } from "@/lib/content/schema";

export default function AdminZakladneUdajePage() {
  const editor = useContentEditor<SiteContent>("site.json");
  const data = editor.data;

  return (
    <AdminShell title="Základné údaje">
      {!data || editor.loading ? (
        <p className="text-ink-muted">Načítavam z GitHub…</p>
      ) : (
        <>
          <section className="rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Organizácia
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Názov (krátky)">
                <input
                  className={inputClass}
                  value={data.brand.name}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      brand: { ...data.brand, name: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="IČO">
                <input
                  className={inputClass}
                  value={data.contact.ico}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      contact: { ...data.contact, ico: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Oficiálny názov" className="sm:col-span-2">
                <input
                  className={inputClass}
                  value={data.contact.orgName}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      contact: { ...data.contact, orgName: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Telefón (zobrazenie)">
                <input
                  className={inputClass}
                  value={data.contact.phoneDisplay}
                  onChange={(e) => {
                    const phoneDisplay = e.target.value;
                    const digits = phoneDisplay.replace(/[^\d+]/g, "");
                    const phoneHref = digits.startsWith("0")
                      ? `tel:+421${digits.slice(1)}`
                      : `tel:${digits}`;
                    editor.setData({
                      ...data,
                      contact: { ...data.contact, phoneDisplay, phoneHref },
                    });
                  }}
                />
              </Field>
              <Field label="E-mail">
                <input
                  className={inputClass}
                  value={data.contact.email}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      contact: { ...data.contact, email: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Adresa riadok 1">
                <input
                  className={inputClass}
                  value={data.contact.addressLines[0]}
                  onChange={(e) => {
                    const addressLines: [string, string] = [
                      e.target.value,
                      data.contact.addressLines[1],
                    ];
                    editor.setData({
                      ...data,
                      contact: {
                        ...data.contact,
                        addressLines,
                        addressFull: `${addressLines[0]}, ${addressLines[1]}`,
                      },
                    });
                  }}
                />
              </Field>
              <Field label="Adresa riadok 2">
                <input
                  className={inputClass}
                  value={data.contact.addressLines[1]}
                  onChange={(e) => {
                    const addressLines: [string, string] = [
                      data.contact.addressLines[0],
                      e.target.value,
                    ];
                    editor.setData({
                      ...data,
                      contact: {
                        ...data.contact,
                        addressLines,
                        addressFull: `${addressLines[0]}, ${addressLines[1]}`,
                      },
                    });
                  }}
                />
              </Field>
            </div>
          </section>

          <section className="mt-5 rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">Mapa</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Google Maps URL" className="sm:col-span-2">
                <input
                  className={inputClass}
                  value={data.map.mapsUrl}
                  onChange={(e) => {
                    const mapsUrl = e.target.value;
                    editor.setData({
                      ...data,
                      map: { ...data.map, mapsUrl },
                      contact: { ...data.contact, mapsUrl },
                    });
                  }}
                />
              </Field>
              <Field label="Zemepisná šírka">
                <input
                  className={inputClass}
                  type="number"
                  step="any"
                  value={data.map.mapsLat}
                  onChange={(e) => {
                    const mapsLat = Number(e.target.value);
                    editor.setData({
                      ...data,
                      map: { ...data.map, mapsLat },
                      contact: { ...data.contact, mapsLat },
                    });
                  }}
                />
              </Field>
              <Field label="Zemepisná dĺžka">
                <input
                  className={inputClass}
                  type="number"
                  step="any"
                  value={data.map.mapsLng}
                  onChange={(e) => {
                    const mapsLng = Number(e.target.value);
                    editor.setData({
                      ...data,
                      map: { ...data.map, mapsLng },
                      contact: { ...data.contact, mapsLng },
                    });
                  }}
                />
              </Field>
              <Field label="Zoom">
                <input
                  className={inputClass}
                  type="number"
                  value={data.map.mapsZoom}
                  onChange={(e) => {
                    const mapsZoom = Number(e.target.value);
                    editor.setData({
                      ...data,
                      map: { ...data.map, mapsZoom },
                      contact: { ...data.contact, mapsZoom },
                    });
                  }}
                />
              </Field>
            </div>
          </section>

          <section className="mt-5 rounded-lg border border-forest/10 bg-white p-4">
            <h2 className="text-[1.05rem] font-semibold text-forest">
              Havarijná služba (hlavička)
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Popisok tlačidla">
                <input
                  className={inputClass}
                  value={data.emergencyCta.label}
                  onChange={(e) =>
                    editor.setData({
                      ...data,
                      emergencyCta: {
                        ...data.emergencyCta,
                        label: e.target.value,
                      },
                    })
                  }
                />
              </Field>
              <Field label="Telefón">
                <input
                  className={inputClass}
                  value={data.emergencyCta.phoneDisplay}
                  onChange={(e) => {
                    const phoneDisplay = e.target.value;
                    const digits = phoneDisplay.replace(/[^\d]/g, "");
                    editor.setData({
                      ...data,
                      emergencyCta: {
                        ...data.emergencyCta,
                        phoneDisplay,
                        href: `tel:${digits}`,
                      },
                    });
                  }}
                />
              </Field>
            </div>
          </section>

          <SaveBar
            saving={editor.saving}
            message={editor.message}
            hint={editor.hint}
            error={editor.error}
            onSave={() => void editor.save(data, "cms: site — základné údaje")}
          />
        </>
      )}
    </AdminShell>
  );
}
