"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { btnPrimary, helperClass } from "@/components/admin/admin-ui";

const SECONDARY = [
  { href: "/admin/kontakty-druzstva", label: "Upraviť kontakty" },
  { href: "/admin/strankove-hodiny", label: "Upraviť stránkové hodiny" },
  { href: "/admin/zakladne-udaje", label: "Upraviť základné údaje" },
  { href: "/admin/dokumenty-tlaciva", label: "Dokumenty a tlačivá" },
] as const;

export default function AdminDashboardPage() {
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("osbd_cms_last_commit");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { at?: string };
      if (parsed.at) {
        setLastSaved(
          new Date(parsed.at).toLocaleString("sk-SK", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <AdminShell title="Prehľad">
      <div className="max-w-2xl space-y-8">
        <section className="rounded-lg border border-forest/10 bg-white px-5 py-6 sm:px-7 sm:py-8">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] text-forest/55 uppercase">
            Vitajte
          </p>
          <h2 className="mt-2 text-[1.35rem] font-semibold tracking-tight text-ink sm:text-[1.5rem]">
            Čo chcete dnes upraviť?
          </h2>
          <p className={`mt-2 max-w-md ${helperClass}`}>
            Vyberte akciu. Zmeny sa po uložení zobrazia na webe.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/admin/aktuality" className={btnPrimary}>
              + Pridať aktualitu
            </Link>
            <Link
              href="/admin/dokumenty-tlaciva"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-forest/15 bg-white px-5 text-[0.95rem] font-semibold text-ink hover:bg-[#f7f6f2]"
            >
              + Pridať dokument
            </Link>
          </div>
        </section>

        <section>
          <h3 className="text-[0.84rem] font-semibold tracking-[0.08em] text-ink-muted uppercase">
            Ďalšie úpravy
          </h3>
          <ul className="mt-3 space-y-1">
            {SECONDARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-3 text-[1rem] font-medium text-ink transition-colors hover:bg-white hover:text-forest"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {lastSaved ? (
          <p className="text-[0.88rem] text-ink-muted">
            Posledné uloženie v tomto prehliadači: {lastSaved}
          </p>
        ) : null}

        <p className="text-[0.88rem] text-ink-muted">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-forest hover:underline"
          >
            Otvoriť verejný web
          </a>
        </p>
      </div>
    </AdminShell>
  );
}
