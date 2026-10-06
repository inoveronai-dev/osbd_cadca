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
          "inline-flex shrink-0 items-center focus-visible:outline-offset-4",
          className,
        )}
        aria-label={`${brand.name} — úvodná stránka`}
      >
        <Image
          src="/images/osbd-cadca-logo.png"
          alt={brand.name}
          width={280}
          height={164}
          priority
          className="h-[48px] w-auto object-contain sm:h-[56px] md:h-[60px] lg:h-[64px]"
        />
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
