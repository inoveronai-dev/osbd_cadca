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

export function QuickAccess() {
  return (
    <section
      className="section-pad bg-white"
      aria-labelledby="quick-access-heading"
    >
      <div className="container-site">
        <Reveal>
          <h2 id="quick-access-heading" className="section-heading">
            {quickAccess.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {quickAccess.support}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {quickAccess.items.map((item, index) => {
            const Icon = icons[item.icon];
            const pending = "status" in item && item.status === "pending";
            const shared =
              "group card-lift flex h-full min-h-[12.5rem] flex-col border border-[var(--border-strong)] bg-paper p-5 sm:p-6 focus-visible:outline-offset-4";

            const content = (
              <>
                <span className="inline-flex size-12 items-center justify-center rounded-[var(--radius)] bg-sage text-forest">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="mt-auto pt-10">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-xl leading-snug font-semibold tracking-tight text-ink">
                      {item.title}
                    </span>
                    <ArrowRight
                      className="arrow-shift mt-1 size-5 shrink-0 text-green"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-2.5 block text-[0.98rem] leading-relaxed text-ink-muted">
                    {item.description}
                  </span>
                  {pending ? (
                    <span className="mt-3 inline-block rounded-[var(--radius-sm)] border border-border px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-ink-muted uppercase">
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
                  <a
                    href={item.href}
                    className={cn(
                      shared,
                      "hover:border-green/45 hover:bg-sage/50 hover:shadow-[0_10px_28px_-18px_rgba(24,77,58,0.45)]",
                    )}
                  >
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
