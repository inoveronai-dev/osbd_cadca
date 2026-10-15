import {
  Droplets,
  Flame,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Tv,
  Waves,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contact, telHref } from "@/lib/content/contact";
import { faultContacts } from "@/lib/content/fault-contacts";
import { contactSection } from "@/lib/content/home";
import { staffDirectory } from "@/lib/content/staff-directory";
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

function PhoneLink({
  display,
  className,
}: {
  display: string;
  className?: string;
}) {
  return (
    <a
      href={telHref(display)}
      className={cn(
        "font-semibold tabular-nums text-ink transition-colors hover:text-forest",
        className,
      )}
    >
      {display}
    </a>
  );
}

function EmailLink({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  return (
    <a
      href={`mailto:${email}`}
      className={cn(
        "break-all text-ink/85 transition-colors hover:text-forest",
        className,
      )}
    >
      {email}
    </a>
  );
}

export function Contact() {
  return (
    <section
      id={contactSection.id}
      className="scroll-mt-24 border-t border-forest/8 bg-ivory pt-[clamp(3.25rem,6vw,4.75rem)] pb-[clamp(3.5rem,6.5vw,5.25rem)]"
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <h2
            id="contact-heading"
            className="font-semibold tracking-[-0.02em] text-forest text-[clamp(1.8rem,2.6vw,2.35rem)] leading-[1.16]"
          >
            {contactSection.headline}
          </h2>
          <p className="mt-3.5 max-w-lg text-[0.95rem] leading-relaxed text-ink-muted sm:text-[0.98rem]">
            {contactSection.support}
          </p>
        </Reveal>

        {/* A. Kontakty družstva */}
        <Reveal delayMs={40} className="mt-10 lg:mt-12">
          <div
            id={staffDirectory.sectionId}
            className="scroll-mt-28 rounded-[0.5rem] border border-forest/10 bg-white px-5 py-6 sm:px-7 sm:py-7"
          >
            <h3 className="text-[1.2rem] font-semibold tracking-tight text-forest sm:text-[1.3rem]">
              {staffDirectory.headline}
            </h3>

            <div className="mt-5 rounded-[0.375rem] border border-forest/8 bg-soft-sage/40 px-4 py-4 sm:px-5">
              <p className="text-[1.02rem] font-semibold text-ink">
                {contact.orgName}
              </p>
              <p className="mt-2 flex items-start gap-2 text-[0.92rem] text-ink/85">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden />
                <span>
                  {contact.addressLines[0]}, {contact.addressLines[1]}
                </span>
              </p>
              <p className="mt-1.5 text-[0.92rem] text-ink/85">
                IČO: {contact.ico}
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-[0.92rem]">
                <Phone className="size-3.5 shrink-0 text-forest" aria-hidden />
                <span className="text-ink-muted">Tel.:</span>
                <PhoneLink display={contact.phoneDisplay} />
              </p>
            </div>

            <div className="mt-6 divide-y divide-forest/8">
              {staffDirectory.groups.map((group) => (
                <div key={group.id} className="py-4 first:pt-0 last:pb-0">
                  <h4 className="text-[0.72rem] font-semibold tracking-[0.08em] text-forest uppercase">
                    {group.title}
                  </h4>
                  <ul className="mt-2.5 space-y-3.5">
                    {group.people.map((person) => (
                      <li key={`${group.id}-${person.name}`}>
                        <p className="text-[0.98rem] font-semibold text-ink">
                          {person.name}
                        </p>
                        {person.room ? (
                          <p className="mt-0.5 text-[0.84rem] text-ink-muted">
                            {person.room}
                          </p>
                        ) : null}
                        {person.phones?.length ? (
                          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                            {person.phones.map((phone) => (
                              <PhoneLink
                                key={phone}
                                display={phone}
                                className="text-[0.95rem]"
                              />
                            ))}
                          </p>
                        ) : null}
                        {person.emails?.length ? (
                          <p className="mt-1 flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:gap-x-3">
                            {person.emails.map((email) => (
                              <span
                                key={email}
                                className="inline-flex items-center gap-1.5 text-[0.88rem]"
                              >
                                <Mail
                                  className="size-3 shrink-0 text-forest/70"
                                  aria-hidden
                                />
                                <EmailLink email={email} />
                              </span>
                            ))}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* B. Kontakty na hlásenie závad a porúch */}
        <Reveal delayMs={80} className="mt-8 lg:mt-10">
          <div
            id={faultContacts.sectionId}
            className="scroll-mt-28"
          >
            <div className="max-w-2xl">
              <h3 className="text-[1.2rem] font-semibold tracking-tight text-forest sm:text-[1.3rem]">
                {faultContacts.headline}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                {faultContacts.support}
              </p>
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:gap-3.5">
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
                        <h4
                          className={cn(
                            "font-semibold tracking-tight text-ink",
                            block.primary
                              ? "text-[1.05rem] sm:text-[1.12rem]"
                              : "text-[0.95rem] sm:text-[1rem]",
                          )}
                        >
                          {block.title}
                        </h4>
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
                          <p
                            className={cn(
                              "mt-2 flex flex-wrap gap-x-3 gap-y-1",
                              block.primary && "gap-y-1.5",
                            )}
                          >
                            {block.phones.map((phone, i) => (
                              <span key={phone} className="inline-flex flex-col">
                                <PhoneLink
                                  display={phone}
                                  className={
                                    block.primary
                                      ? "text-[1.35rem] sm:text-[1.5rem]"
                                      : "text-[1.05rem]"
                                  }
                                />
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
                              <EmailLink
                                key={email}
                                email={email}
                                className="text-[0.88rem]"
                              />
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
                                <span className="font-medium text-ink">
                                  {row.day}
                                </span>
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
                                      <PhoneLink
                                        key={phone}
                                        display={phone}
                                        className="text-[0.95rem]"
                                      />
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
