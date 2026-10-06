import {
  ArrowRight,
  Clock,
  FileText,
  Megaphone,
  Phone,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { quickAccess } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const icons = {
  megaphone: Megaphone,
  file: FileText,
  clock: Clock,
  phone: Phone,
} as const;

const tileStyles = [
  "bg-forest text-white border-forest/70",
  "bg-soft-sage text-ink border-forest/15",
  "bg-stone/80 text-ink border-[color-mix(in_srgb,var(--ink)_10%,transparent)]",
  "bg-warm-white text-ink border-forest/30",
] as const;

const iconStyles = [
  "text-white/90",
  "text-forest",
  "text-forest",
  "text-forest",
] as const;

export function QuickAccess() {
  return (
    <section
      className="section-pad bg-ivory"
      aria-labelledby="quick-access-heading"
    >
      <div className="container-site">
        <Reveal>
          <h2 id="quick-access-heading" className="section-heading">
            {quickAccess.headline}
          </h2>
          <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ink-muted">
            {quickAccess.support}
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
          {quickAccess.items.map((item, index) => {
            const Icon = icons[item.icon];
            const pending = "status" in item && item.status === "pending";
            const shared = cn(
              "group/card card-lift relative flex h-full min-h-[10.5rem] flex-col overflow-hidden border p-4 sm:min-h-[11rem] sm:p-5",
              tileStyles[index],
            );

            const content = (
              <>
                <Icon
                  className="pointer-events-none absolute -top-1 -right-1 size-20 opacity-[0.06]"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <span className={cn("relative inline-flex", iconStyles[index])}>
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="relative mt-auto pt-6">
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-[1.05rem] leading-snug font-semibold tracking-tight">
                      {item.title}
                    </span>
                    <ArrowRight
                      className="arrow-shift mt-0.5 size-4 shrink-0 opacity-70"
                      aria-hidden
                    />
                  </span>
                  <span
                    className={cn(
                      "mt-2 block text-[0.92rem] leading-relaxed",
                      index === 0 ? "text-white/80" : "text-ink-muted",
                    )}
                  >
                    {item.description}
                  </span>
                  {pending ? (
                    <span className="mt-2.5 inline-block rounded-[var(--radius-sm)] border border-current/25 px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-wide uppercase opacity-75">
                      pripravujeme
                    </span>
                  ) : null}
                </div>
              </>
            );

            return (
              <Reveal key={item.id} as="li" delayMs={index * 50}>
                {pending || !item.href ? (
                  <div
                    className={cn(shared, "cursor-not-allowed opacity-90")}
                    aria-disabled="true"
                    title="Sekcia sa pripravuje"
                  >
                    {content}
                  </div>
                ) : (
                  <a href={item.href} className={shared}>
                    {content}
                  </a>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
