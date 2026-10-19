"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Prehľad", exact: true },
  { href: "/admin/aktuality", label: "Aktuality" },
  { href: "/admin/dokumenty-tlaciva", label: "Dokumenty a tlačivá" },
  { href: "/admin/kontakty-druzstva", label: "Kontakty družstva" },
  { href: "/admin/poruchy", label: "Poruchy a závady" },
  { href: "/admin/strankove-hodiny", label: "Stránkové hodiny" },
  { href: "/admin/zakladne-udaje", label: "Základné údaje" },
  { href: "/admin/organy", label: "Orgány družstva" },
  { href: "/admin/stanovy", label: "Stanovy OSBD" },
  { href: "/admin/domovy-poriadok", label: "Domový poriadok" },
  { href: "/admin/historia", label: "História" },
  { href: "/admin/kablova-tv", label: "Káblová TV a internet" },
  { href: "/admin/uvodna-stranka", label: "Úvodná stránka" },
] as const;

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[88rem] flex-col lg:flex-row">
      <aside className="border-b border-forest/10 bg-white lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
        <div className="px-5 py-5">
          <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-forest/60 uppercase">
            OSBD Čadca
          </p>
          <p className="mt-1 text-[1.05rem] font-semibold text-forest">
            Administrácia
          </p>
        </div>
        <nav className="px-2 pb-4" aria-label="Admin menu">
          <ul className="space-y-0.5">
            {NAV.map((item) => {
              const exact = "exact" in item && item.exact;
              const active = exact
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-[0.92rem] transition-colors",
                      active
                        ? "bg-forest text-white"
                        : "text-ink hover:bg-soft-sage hover:text-forest",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-forest/10 px-4 py-4">
          <button
            type="button"
            onClick={logout}
            className="text-[0.88rem] font-semibold text-forest/70 hover:text-forest"
          >
            Odhlásiť sa
          </button>
        </div>
      </aside>

      <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8">
        <h1 className="text-[1.55rem] font-semibold tracking-tight text-forest sm:text-[1.75rem]">
          {title}
        </h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
