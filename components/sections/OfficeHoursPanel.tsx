import { Clock } from "lucide-react";
import { officeHours } from "@/lib/content/contact";
import { cn } from "@/lib/utils";

type OfficeHoursPanelProps = {
  id?: string;
  className?: string;
  compact?: boolean;
};

function isClosedDay(hours: string | readonly string[]) {
  return typeof hours === "string" && hours === "nestránkový deň";
}

export function OfficeHoursPanel({
  id = "strankove-hodiny",
  className,
  compact = false,
}: OfficeHoursPanelProps) {
  return (
    <div
      id={id}
      className={cn(
        "scroll-mt-28 rounded-[0.5rem] border border-forest/12 bg-white",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-forest/10 pb-3.5">
        <span className="inline-flex size-8 items-center justify-center rounded-[0.375rem] bg-soft-sage text-forest sm:size-9">
          <Clock className="size-3.5 sm:size-4" aria-hidden />
        </span>
        <h3 className="text-[1.05rem] font-semibold tracking-tight text-forest sm:text-[1.15rem]">
          {officeHours.title}
        </h3>
      </div>

      <ul className="mt-3 divide-y divide-forest/8">
        {officeHours.schedule.map((row) => {
          const closed = isClosedDay(row.hours);
          const lines = Array.isArray(row.hours) ? row.hours : [row.hours];
          return (
            <li
              key={row.day}
              className="flex items-start justify-between gap-4 py-2"
            >
              <span className="min-w-[5.5rem] text-[0.88rem] font-semibold text-ink">
                {row.day}
              </span>
              <span
                className={cn(
                  "text-right text-[0.86rem] leading-snug",
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

      <div className="mt-4 grid gap-2.5">
        <div className="rounded-[0.375rem] border border-forest/8 bg-soft-sage/55 px-3.5 py-2.5">
          <p className="text-[0.68rem] font-semibold tracking-[0.08em] text-forest uppercase">
            {officeHours.lunchBreak.title}
          </p>
          <p className="mt-0.5 text-[0.86rem] text-ink/85">
            {officeHours.lunchBreak.detail}
          </p>
        </div>

        {officeHours.extras.map((block) => (
          <div
            key={block.title}
            className="rounded-[0.375rem] border border-forest/8 bg-warm-white px-3.5 py-2.5"
          >
            <p className="text-[0.68rem] font-semibold tracking-[0.06em] text-ink-muted uppercase">
              {block.title}
            </p>
            <p className="mt-0.5 text-[0.86rem] text-ink/85">{block.detail}</p>
          </div>
        ))}

        <div className="rounded-[0.375rem] border border-forest/15 bg-soft-sage/80 px-3.5 py-2.5">
          <p className="text-[0.68rem] font-semibold tracking-[0.08em] text-forest uppercase">
            {officeHours.emergency.title}
          </p>
          <ul className="mt-1 space-y-0.5">
            {officeHours.emergency.lines.map((line) => (
              <li key={line} className="text-[0.86rem] text-ink/85">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
