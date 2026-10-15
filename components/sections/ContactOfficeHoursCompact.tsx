import { Clock } from "lucide-react";
import { officeHours } from "@/lib/content/contact";
import { cn } from "@/lib/utils";

function isClosedDay(hours: string | readonly string[]) {
  return typeof hours === "string" && hours === "nestránkový deň";
}

/** Compact office-hours strip for the Kontakty page only. */
export function ContactOfficeHoursCompact() {
  return (
    <section
      id="strankove-hodiny"
      className="scroll-mt-[calc(var(--header-h)+1rem)] border-b border-forest/8 bg-warm-white py-7 sm:py-8 md:py-9"
      aria-labelledby="kontakty-hours-heading"
    >
      <div className="container-site">
        <div className="rounded-[0.5rem] border border-forest/10 bg-white px-4 py-4 sm:px-5 sm:py-5 md:px-6">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-8 items-center justify-center rounded-[0.375rem] bg-soft-sage text-forest">
              <Clock className="size-3.5" aria-hidden />
            </span>
            <h2
              id="kontakty-hours-heading"
              className="text-[1.05rem] font-semibold tracking-tight text-forest sm:text-[1.12rem]"
            >
              {officeHours.title}
            </h2>
          </div>

          <ul className="mt-4 grid grid-cols-1 gap-0 border-t border-forest/8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {officeHours.schedule.map((row) => {
              const closed = isClosedDay(row.hours);
              const lines = Array.isArray(row.hours) ? row.hours : [row.hours];
              return (
                <li
                  key={row.day}
                  className="flex items-baseline justify-between gap-3 border-b border-forest/8 py-2.5 sm:flex-col sm:items-start sm:justify-start sm:gap-1 sm:border-b-0 sm:border-r sm:border-forest/8 sm:px-3 sm:py-3 sm:last:border-r-0 lg:px-3.5"
                >
                  <span className="text-[0.84rem] font-semibold text-ink">
                    {row.day}
                  </span>
                  <span
                    className={cn(
                      "text-right text-[0.82rem] leading-snug sm:text-left",
                      closed
                        ? "text-ink-muted italic"
                        : "tabular-nums text-ink/85",
                    )}
                  >
                    {lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 grid gap-2.5 border-t border-forest/8 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[0.375rem] border border-forest/8 bg-soft-sage/50 px-3 py-2.5">
              <p className="text-[0.66rem] font-semibold tracking-[0.08em] text-forest uppercase">
                {officeHours.lunchBreak.title}
              </p>
              <p className="mt-0.5 text-[0.82rem] text-ink/85">
                {officeHours.lunchBreak.detail}
              </p>
            </div>

            {officeHours.extras.map((block) => (
              <div
                key={block.title}
                className="rounded-[0.375rem] border border-forest/8 bg-warm-white px-3 py-2.5"
              >
                <p className="text-[0.66rem] font-semibold tracking-[0.06em] text-ink-muted uppercase">
                  {block.title}
                </p>
                <p className="mt-0.5 text-[0.82rem] text-ink/85">{block.detail}</p>
              </div>
            ))}

            <div className="rounded-[0.375rem] border border-forest/12 bg-soft-sage/70 px-3 py-2.5 sm:col-span-2 lg:col-span-1">
              <p className="text-[0.66rem] font-semibold tracking-[0.08em] text-forest uppercase">
                {officeHours.emergency.title}
              </p>
              <ul className="mt-0.5 space-y-0.5">
                {officeHours.emergency.lines.map((line) => (
                  <li key={line} className="text-[0.82rem] text-ink/85">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
