import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/content/home";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  tone?: "light" | "dark" | "on-dark";
  /** Official raster logo for the header; wordmark retained elsewhere */
  variant?: "official" | "wordmark";
};

export function LogoMark({
  className,
  tone = "dark",
  variant = "wordmark",
}: LogoMarkProps) {
  if (variant === "official") {
    return (
      <Link
        href="/"
        className={cn(
          "group inline-flex shrink-0 items-center focus-visible:outline-offset-4",
          className,
        )}
        aria-label={`${brand.name} — úvodná stránka`}
      >
        <span
          className="inline-flex items-center justify-center rounded-[8px] border border-white/40 bg-[rgba(255,255,250,0.96)] p-[10px] shadow-[0_8px_28px_rgba(7,35,26,0.12)] sm:rounded-[9px] sm:p-[11px] md:p-[12px]"
        >
          <Image
            src="/images/osbd-cadca-logo.png"
            alt={brand.name}
            width={262}
            height={139}
            priority
            className="h-auto w-[100px] object-contain object-center sm:w-[120px] md:w-[130px] lg:w-[138px]"
          />
        </span>
      </Link>
    );
  }

  const colors =
    tone === "on-dark"
      ? "text-white border-white/35"
      : tone === "light"
        ? "text-white border-white/40"
        : "text-forest border-forest/25";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 focus-visible:outline-offset-4",
        className,
      )}
      aria-label={`${brand.name} — úvodná stránka`}
    >
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center border-2 text-[0.7rem] leading-tight font-bold tracking-tight",
          colors,
        )}
        aria-hidden
      >
        OSBD
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-base font-semibold tracking-tight sm:text-lg",
            tone === "on-dark" || tone === "light" ? "text-white" : "text-ink",
          )}
        >
          {brand.name}
        </span>
        <span
          className={cn(
            "hidden text-xs sm:block",
            tone === "on-dark" || tone === "light"
              ? "text-white/75"
              : "text-ink-muted",
          )}
        >
          Správa bytových domov
        </span>
      </span>
    </Link>
  );
}
