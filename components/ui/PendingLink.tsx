import { cn } from "@/lib/utils";
import type { NavStatus } from "@/lib/navigation";

type PendingLinkProps = {
  label: string;
  href: string | null;
  status: NavStatus | "pending" | "ready" | "anchor";
  className?: string;
  pendingClassName?: string;
  onNavigate?: () => void;
};

/**
 * Renders a real link when ready/anchor; otherwise a clearly marked pending control.
 */
export function PendingLink({
  label,
  href,
  status,
  className,
  pendingClassName,
  onNavigate,
}: PendingLinkProps) {
  if (status === "pending" || !href) {
    return (
      <span
        className={cn(
          "inline-flex cursor-not-allowed items-center gap-2 text-ink-muted",
          pendingClassName ?? className,
        )}
        title="Stránka sa pripravuje"
        aria-disabled="true"
      >
        <span>{label}</span>
        <span className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-ink-muted uppercase">
          pripravujeme
        </span>
      </span>
    );
  }

  return (
    <a href={href} className={className} onClick={onNavigate}>
      {label}
    </a>
  );
}
