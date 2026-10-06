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
  "bg-forest text-white border-forest/80",
  "bg-soft-sage text-ink border-[color-mix(in_srgb,var(--forest)_18%,transparent)]",
  "bg-stone text-ink border-[color-mix(in_srgb,var(--ink)_12%,transparent)]",
  "bg-warm-white text-ink border-forest/35",
] as const;

const iconStyles = [
  "bg-white/12 text-white",
  "bg-forest/10 text-forest",
  "bg-forest/8 text-forest",
  "bg-sage text-forest",
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
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-muted sm:text-lg">
            {quickAccess.support}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {quickAccess.items.map((item, index) => {
            const Icon = icons[item.icon];
            const pending = "status" in item && item.status === "pending";
            const shared = cn(
              "group/card card-lift relative flex h-full min-h-[13.5rem] flex-col overflow-hidden border p-6 sm:min-h-[14rem] sm:p-7",
              tileStyles[index],
            );

            const content = (
              <>
                <Icon
                  className="pointer-events-none absolute -top-2 -right-2 size-28 opacity-[0.07] sm:size-32"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <span
                  className={cn(
                    "relative inline-flex size-14 items-center justify-center rounded-[var(--radius)]",
                    iconStyles[index],
                  )}
                >
                  <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="relative mt-auto pt-10">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-[1.2rem] leading-snug font-semibold tracking-tight sm:text-xl">
                      {item.title}
                    </span>
                    <ArrowRight
                      className="arrow-shift mt-1 size-5 shrink-0 opacity-80"
                      aria-hidden
                    />
                  </span>
                  <span
                    className={cn(
                      "mt-3 block text-[1rem] leading-relaxed sm:text-[1.02rem]",
                      index === 0 ? "text-white/85" : "text-ink-muted",
                    )}
                  >
                    {item.description}
                  </span>
                  {pending ? (
                    <span className="mt-3 inline-block rounded-[var(--radius-sm)] border border-current/25 px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide uppercase opacity-80">
                      pripravujeme
                    </span>
                  ) : null}
                </div>
              </>
            );

            return (
              <Reveal key={item.id} as="li" delayMs={index * 60}>
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
