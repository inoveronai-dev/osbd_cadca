import {
  Droplets,
  Flame,
  KeyRound,
  Tv,
  Waves,
  Zap,
} from "lucide-react";
import { telHref } from "@/lib/content/contact";
import { faultContacts } from "@/lib/content/fault-contacts";
import { cn } from "@/lib/utils";

const faultIcons = {
  droplets: Droplets,
  tv: Tv,
  elevator: Waves,
  waves: Waves,
  flame: Flame,
  zap: Zap,
  gas: Flame,
  key: KeyRound,
} as const;

export function FaultContacts() {
  return (
    <section
      id={faultContacts.sectionId}
      className="scroll-mt-[calc(var(--header-h)+1rem)]"
      aria-labelledby="fault-contacts-heading"
    >
      <h2
        id="fault-contacts-heading"
        className="text-[1.35rem] font-semibold tracking-tight text-forest sm:text-[1.5rem]"
      >
        {faultContacts.headline}
      </h2>
      <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-relaxed text-ink-muted">
        {faultContacts.support}
      </p>

      <ul className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:gap-3.5">
        {faultContacts.blocks.map((block) => {
          const Icon = faultIcons[block.icon];
          return (
            <li
              key={block.id}
              className={cn(
                "rounded-[0.5rem] border px-4 py-4 sm:px-5 sm:py-4.5",
                block.primary
                  ? "border-forest/25 bg-soft-sage/70 sm:col-span-2"
                  : "border-forest/10 bg-white",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-[0.375rem]",
                    block.primary
                      ? "bg-forest text-white"
                      : "bg-soft-sage text-forest",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={cn(
                      "font-semibold tracking-tight text-ink",
                      block.primary
                        ? "text-[1.05rem] sm:text-[1.12rem]"
                        : "text-[0.95rem] sm:text-[1rem]",
                    )}
                  >
                    {block.title}
                  </h3>
                  {block.subtitle ? (
                    <p className="mt-0.5 text-[0.84rem] text-ink-muted">
                      {block.subtitle}
                    </p>
                  ) : null}
                  {block.person ? (
                    <p className="mt-1.5 text-[0.9rem] text-ink/85">
                      {block.person}
                    </p>
                  ) : null}

                  {block.phones?.length ? (
                    <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {block.phones.map((phone, i) => (
                        <span key={phone} className="inline-flex flex-col">
                          <a
                            href={telHref(phone)}
                            className={cn(
                              "font-semibold tabular-nums text-ink transition-colors hover:text-forest",
                              block.primary
                                ? "text-[1.35rem] sm:text-[1.5rem]"
                                : "text-[1.05rem]",
                            )}
                          >
                            {phone}
                          </a>
                          {block.phoneNotes?.[i] ? (
                            <span className="text-[0.78rem] text-ink-muted">
                              {block.phoneNotes[i]}
                            </span>
                          ) : null}
                        </span>
                      ))}
                    </p>
                  ) : null}

                  {block.emails?.length ? (
                    <p className="mt-1.5 flex flex-col gap-0.5">
                      {block.emails.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="break-all text-[0.88rem] text-ink/85 transition-colors hover:text-forest"
                        >
                          {email}
                        </a>
                      ))}
                    </p>
                  ) : null}

                  {block.schedule?.length ? (
                    <ul className="mt-3 divide-y divide-forest/8 border-t border-forest/8 pt-2">
                      {block.schedule.map((row) => (
                        <li
                          key={row.day}
                          className="flex justify-between gap-3 py-1 text-[0.84rem]"
                        >
                          <span className="font-medium text-ink">{row.day}</span>
                          <span className="tabular-nums text-ink/80">
                            {row.hours}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {block.providers?.length ? (
                    <ul className="mt-3 space-y-2.5 border-t border-forest/8 pt-3">
                      {block.providers.map((provider) => (
                        <li key={provider.name}>
                          <p className="text-[0.88rem] font-medium text-ink">
                            {provider.name}
                          </p>
                          {provider.phones?.length ? (
                            <p className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
                              {provider.phones.map((phone) => (
                                <a
                                  key={phone}
                                  href={telHref(phone)}
                                  className="text-[0.95rem] font-semibold tabular-nums text-ink transition-colors hover:text-forest"
                                >
                                  {phone}
                                </a>
                              ))}
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
