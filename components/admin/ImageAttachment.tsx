"use client";

import { useCallback, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import {
  btnGhost,
  helperClass,
} from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";

type Props = {
  src?: string | null;
  label?: string;
  helper?: string;
  uploading?: boolean;
  onUpload: (file: File) => void | Promise<void>;
  onClear?: () => void;
  clearLabel?: string;
};

export function ImageAttachment({
  src,
  label = "Fotografia",
  helper,
  uploading = false,
  onUpload,
  onClear,
  clearLabel = "Odstrániť fotografiu",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

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
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        className="sr-only"
        onChange={(e) => void handleFiles(e.target.files)}
      />

      {src ? (
        <div className="mt-2.5 overflow-hidden rounded-lg border border-forest/12 bg-[#faf9f6]">
          <div className="relative aspect-[16/9] w-full bg-[#eceae4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-2 px-4 py-3">
            <button
              type="button"
              className={btnGhost}
              disabled={uploading}
              onClick={pick}
            >
              {uploading ? "Nahráva sa…" : "Zmeniť fotografiu"}
            </button>
            {onClear ? (
              <button
                type="button"
                className="text-[0.88rem] font-medium text-red-700/80 hover:text-red-800 hover:underline"
                disabled={uploading}
                onClick={onClear}
              >
                {clearLabel}
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={pick}
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
            "mt-2.5 flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-forest/20 bg-[#faf9f6] px-4 py-8 text-center transition-colors",
            dragOver ? "border-forest/40 bg-soft-sage" : "hover:border-forest/35",
            uploading && "opacity-60",
          )}
        >
          <span className="flex size-10 items-center justify-center rounded-md bg-white text-forest">
            <ImageIcon className="size-5" aria-hidden />
          </span>
          <span className="text-[0.95rem] font-semibold text-ink">
            {uploading ? "Nahráva sa…" : "Nahrať fotografiu"}
          </span>
          <span className="text-[0.82rem] text-ink-muted">
            JPG, PNG alebo WebP
          </span>
        </button>
      )}
    </div>
  );
}
