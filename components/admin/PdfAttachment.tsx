"use client";

import { useCallback, useRef, useState } from "react";
import { FileText } from "lucide-react";
import {
  btnGhost,
  fileNameFromHref,
  helperClass,
} from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";

type Props = {
  href?: string | null;
  label?: string;
  helper?: string;
  uploading?: boolean;
  onUpload: (file: File) => void | Promise<void>;
  onClear?: () => void;
  allowExternalLink?: boolean;
  onSetExternalLink?: (url: string) => void;
};

export function PdfAttachment({
  href,
  label = "Príloha",
  helper,
  uploading = false,
  onUpload,
  onClear,
  allowExternalLink = false,
  onSetExternalLink,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showExternal, setShowExternal] = useState(false);
  const [externalDraft, setExternalDraft] = useState("");

  const pick = useCallback(() => inputRef.current?.click(), []);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      await onUpload(file);
      if (inputRef.current) inputRef.current.value = "";
    },
    [onUpload],
  );

  return (
    <div>
      <p className="text-[0.9rem] font-medium text-ink">{label}</p>
      {helper ? <p className={helperClass}>{helper}</p> : null}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        onChange={(e) => void handleFiles(e.target.files)}
      />

      {href ? (
        <div className="mt-2.5 rounded-lg border border-forest/12 bg-[#faf9f6] px-4 py-3.5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-white text-forest">
              <FileText className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.95rem] font-semibold text-ink">
                Aktuálny dokument
              </p>
              <p className="mt-0.5 truncate text-[0.82rem] text-ink-muted">
                {fileNameFromHref(href)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnGhost}
                >
                  Otvoriť PDF
                </a>
                <button
                  type="button"
                  className={btnGhost}
                  disabled={uploading}
                  onClick={pick}
                >
                  {uploading ? "Nahráva sa…" : "Nahradiť súbor"}
                </button>
                {onClear ? (
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={onClear}
                  >
                    Odstrániť
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={pick}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            void handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "mt-2.5 flex w-full flex-col items-center justify-center rounded-lg border border-dashed px-4 py-8 text-center transition-colors",
            dragOver
              ? "border-forest bg-soft-sage/60"
              : "border-forest/25 bg-white hover:border-forest/40 hover:bg-[#faf9f6]",
            uploading && "opacity-60",
          )}
        >
          <FileText className="size-7 text-forest/70" aria-hidden />
          <p className="mt-3 text-[0.95rem] font-semibold text-ink">
            {uploading
              ? "Nahráva sa…"
              : "Vyberte PDF zo svojho počítača"}
          </p>
          <p className="mt-1 text-[0.84rem] text-ink-muted">
            alebo súbor sem presuňte
          </p>
          <span className="mt-4 inline-flex min-h-10 items-center rounded-md bg-forest px-4 text-[0.9rem] font-semibold text-white">
            Vybrať súbor
          </span>
        </button>
      )}

      {allowExternalLink && onSetExternalLink ? (
        <div className="mt-2">
          {!showExternal ? (
            <button
              type="button"
              className="text-[0.8rem] text-ink-muted underline-offset-2 hover:text-ink hover:underline"
              onClick={() => setShowExternal(true)}
            >
              Použiť externý odkaz
            </button>
          ) : (
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                className="w-full rounded-md border border-forest/15 bg-white px-3 py-2 text-[0.9rem] outline-none focus:border-forest/40"
                placeholder="https://…"
                value={externalDraft}
                onChange={(e) => setExternalDraft(e.target.value)}
              />
              <button
                type="button"
                className={btnGhost}
                onClick={() => {
                  const url = externalDraft.trim();
                  if (url) onSetExternalLink(url);
                  setShowExternal(false);
                  setExternalDraft("");
                }}
              >
                Použiť
              </button>
              <button
                type="button"
                className={btnGhost}
                onClick={() => {
                  setShowExternal(false);
                  setExternalDraft("");
                }}
              >
                Zrušiť
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
