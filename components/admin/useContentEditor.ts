"use client";

import { useCallback, useEffect, useState } from "react";

export function useContentEditor<T>(file: string) {
  const [data, setData] = useState<T | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/content/${file}`, {
        cache: "no-store",
      });
      const json = (await res.json()) as {
        data?: T;
        sha?: string;
        source?: "github" | "local";
        error?: string;
      };
      if (!res.ok) {
        throw new Error(json.error || "Načítanie zlyhalo.");
      }
      setData(json.data ?? null);
      setSha(json.sha ?? null);
      if (json.source === "local") {
        setHint(
          "Lokálny režim: uloženie na web vyžaduje pripojenie k úložisku.",
        );
      } else {
        setHint(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Načítanie zlyhalo.");
    } finally {
      setLoading(false);
    }
  }, [file]);

  useEffect(() => {
    void load();
  }, [load]);

  const save = useCallback(
    async (next: T, commitMessage?: string) => {
      if (!sha) {
        setError("Chýba verzia súboru (SHA). Obnovte stránku.");
        return false;
      }
      setSaving(true);
      setError(null);
      setMessage(null);
      setHint(null);
      try {
        const res = await fetch(`/api/admin/content/${file}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sha,
            data: next,
            message: commitMessage,
          }),
        });
        const json = (await res.json()) as {
          error?: string;
          message?: string;
          hint?: string;
          commitSha?: string;
        };
        if (!res.ok) {
          throw new Error(json.error || "Uloženie zlyhalo.");
        }
        setMessage(json.message || "Zmeny boli uložené.");
        setHint(json.hint || "Web sa aktualizuje.");
        if (json.commitSha) {
          try {
            localStorage.setItem(
              "osbd_cms_last_commit",
              JSON.stringify({
                sha: json.commitSha,
                at: new Date().toISOString(),
                file,
              }),
            );
          } catch {
            /* ignore */
          }
        }
        await load();
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Uloženie zlyhalo.");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [file, load, sha],
  );

  async function uploadFile(options: {
    file: File;
    kind: "image" | "pdf";
    folder: string;
    baseName: string;
  }): Promise<{ url: string } | null> {
    setError(null);
    const body = new FormData();
    body.set("file", options.file);
    body.set("kind", options.kind);
    body.set("folder", options.folder);
    body.set("baseName", options.baseName);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const json = (await res.json()) as {
      error?: string;
      url?: string;
      message?: string;
      hint?: string;
      commitSha?: string;
    };
    if (!res.ok || !json.url) {
      setError(json.error || "Nahratie súboru zlyhalo.");
      return null;
    }
    setMessage(json.message || "Súbor bol nahratý.");
    setHint(json.hint || "Nezabudnite uložiť zmeny.");
    if (json.commitSha) {
      try {
        localStorage.setItem(
          "osbd_cms_last_commit",
          JSON.stringify({
            sha: json.commitSha,
            at: new Date().toISOString(),
            file: "upload",
          }),
        );
      } catch {
        /* ignore */
      }
    }
    return { url: json.url };
  }

  return {
    data,
    setData,
    sha,
    loading,
    saving,
    error,
    message,
    hint,
    setError,
    setMessage,
    load,
    save,
    uploadFile,
  };
}
