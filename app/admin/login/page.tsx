"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(json.error || "Prihlásenie zlyhalo.");
      }
      const next = search.get("next") || "/admin";
      router.replace(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prihlásenie zlyhalo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-10">
      <div className="rounded-lg border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-forest/60 uppercase">
          OSBD Čadca
        </p>
        <h1 className="mt-2 text-[1.5rem] font-semibold text-forest">
          Prihlásenie do administrácie
        </h1>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-[0.88rem] font-medium text-ink">E-mail</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-forest/15 bg-white px-3 py-2.5 text-[0.95rem] outline-none focus:border-forest/40"
            />
          </label>
          <label className="block">
            <span className="text-[0.88rem] font-medium text-ink">Heslo</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-forest/15 bg-white px-3 py-2.5 text-[0.95rem] outline-none focus:border-forest/40"
            />
          </label>
          {error ? (
            <p className="text-[0.9rem] font-medium text-red-700">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-forest px-4 text-[0.95rem] font-semibold text-white hover:bg-[var(--forest-soft)] disabled:opacity-60"
          >
            {loading ? "Prihlasujem…" : "Prihlásiť sa"}
          </button>
        </form>
      </div>
    </div>
  );
}
