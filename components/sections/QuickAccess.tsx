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
          <h2
            id="quick-access-heading"
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {quickAccess.headline}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-muted">
            {quickAccess.support}
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccess.items.map((item, index) => {
            const Icon = icons[item.icon];
            const pending = "status" in item && item.status === "pending";
            const shared =
              "group flex h-full min-h-[11rem] flex-col rounded-[var(--radius-lg)] border border-border bg-paper p-5 transition-[border-color,background-color,transform] duration-200 focus-visible:outline-offset-4 sm:p-6";

            const content = (
              <>
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-sage text-forest">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="mt-auto pt-8">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-xl font-semibold tracking-tight text-ink">
                      {item.title}
                    </span>
                    <ArrowRight
                      className="mt-1 size-5 shrink-0 text-green transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-2 block text-[0.95rem] leading-relaxed text-ink-muted">
                    {item.description}
                  </span>
                  {pending ? (
                    <span className="mt-3 inline-block rounded border border-border px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-ink-muted uppercase">
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
                      "hover:border-green/40 hover:bg-sage/60",
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
