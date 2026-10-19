"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

const ACTIONS = [
  { href: "/admin/aktuality", label: "Upraviť aktuality" },
  { href: "/admin/dokumenty-tlaciva", label: "Dokumenty a tlačivá" },
  { href: "/admin/kontakty-druzstva", label: "Kontakty družstva" },
  { href: "/admin/poruchy", label: "Poruchy a závady" },
  { href: "/admin/strankove-hodiny", label: "Stránkové hodiny" },
  { href: "/admin/zakladne-udaje", label: "Základné údaje" },
] as const;

const SHORTCUTS = [
  { href: "/", label: "Úvodná stránka" },
  { href: "/aktuality", label: "Aktuality" },
  { href: "/kontakty", label: "Kontakty" },
  { href: "/dokumenty-tlaciva", label: "Dokumenty" },
] as const;

export default function AdminDashboardPage() {
  const [lastCommit, setLastCommit] = useState<{
    sha: string;
    at: string;
    file: string;
  } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("osbd_cms_last_commit");
      if (raw) setLastCommit(JSON.parse(raw) as typeof lastCommit);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <AdminShell title="Prehľad">
      <div className="space-y-8">
        <section className="rounded-lg border border-forest/10 bg-white p-5">
          <h2 className="text-[1.05rem] font-semibold text-forest">
            Rýchle akcie
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIONS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-forest/12 px-4 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:border-forest/30 hover:bg-soft-sage"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-forest/10 bg-white p-5">
          <h2 className="text-[1.05rem] font-semibold text-forest">
            Posledné uloženie
          </h2>
          {lastCommit ? (
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
              Commit{" "}
              <code className="rounded bg-soft-sage px-1.5 py-0.5 text-[0.85rem] text-forest">
                {lastCommit.sha.slice(0, 7)}
              </code>{" "}
              ({lastCommit.file}) —{" "}
              {new Date(lastCommit.at).toLocaleString("sk-SK")}
            </p>
          ) : (
            <p className="mt-3 text-[0.95rem] text-ink-muted">
              Zatiaľ nebolo v tomto prehliadači uložené žiadne CMS zmeny.
            </p>
          )}
        </section>

        <section className="rounded-lg border border-forest/10 bg-white p-5">
          <h2 className="text-[1.05rem] font-semibold text-forest">
            Verejný web
          </h2>
          <ul className="mt-3 space-y-2">
            {SHORTCUTS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.95rem] font-semibold text-forest hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
