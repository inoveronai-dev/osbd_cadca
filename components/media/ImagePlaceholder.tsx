import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  slotId: string;
  label: string;
  description: string;
  className?: string;
  /** object-position hint for future photo */
  objectPosition?: string;
  /** Minimal marking for full-bleed backgrounds (e.g. hero) */
  quiet?: boolean;
};

/**
 * Named image slot. Swap in a real file under public/images/{slotId}.jpg
 * and replace this component with next/image when the asset arrives.
 */
export function ImagePlaceholder({
  slotId,
  label,
  description,
  className,
  objectPosition = "center",
  quiet = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full overflow-hidden rounded-[var(--radius)] bg-[linear-gradient(145deg,var(--sage)_0%,color-mix(in_srgb,var(--forest)_22%,var(--sage))_100%)]",
        className,
      )}
      data-image-slot={slotId}
      data-object-position={objectPosition}
      role="img"
      aria-label={`Placeholder: ${description}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--forest) 35%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--forest) 35%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {quiet ? (
        <div className="relative z-10 flex h-full w-full items-end justify-end p-4 sm:p-6">
          <p className="rounded-md bg-forest/35 px-2.5 py-1.5 font-mono text-[0.65rem] tracking-wide text-white/85 backdrop-blur-[2px]">
            OPEN · {label}
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-5 sm:p-6">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-forest uppercase">
              OPEN · Fotografia bude doplnená
            </p>
            <p className="mt-2 font-mono text-xs text-ink-muted">{label}</p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/80 sm:text-[0.95rem]">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
