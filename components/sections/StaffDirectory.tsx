import { Mail, MapPin, Phone } from "lucide-react";
import { contact, telHref } from "@/lib/content/contact";
import { staffDirectory } from "@/lib/content/staff-directory";
import { cn } from "@/lib/utils";

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

export function StaffDirectory() {
  return (
    <section
      id={staffDirectory.sectionId}
      className="scroll-mt-[calc(var(--header-h)+1rem)]"
      aria-labelledby="staff-directory-heading"
    >
      <h2
        id="staff-directory-heading"
        className="text-[1.35rem] font-semibold tracking-tight text-forest sm:text-[1.5rem]"
      >
        {staffDirectory.headline}
      </h2>

      <div className="mt-5 sm:mt-6">
        <div className="rounded-[0.5rem] border border-forest/10 bg-white px-5 py-5 sm:px-7 sm:py-6">
          <div className="rounded-[0.375rem] border border-forest/10 bg-soft-sage/35 px-4 py-4 sm:px-5">
            <p className="text-[1.02rem] font-semibold text-ink">
              {contact.orgName}
            </p>
            <p className="mt-2 flex items-start gap-2 text-[0.92rem] text-ink/85">
              <MapPin
                className="mt-0.5 size-3.5 shrink-0 text-forest"
                aria-hidden
              />
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
                <h3 className="text-[0.72rem] font-semibold tracking-[0.08em] text-forest uppercase">
                  {group.title}
                </h3>
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
                              <a
                                href={`mailto:${email}`}
                                className="break-all text-ink/85 transition-colors hover:text-forest"
                              >
                                {email}
                              </a>
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
      </div>
    </section>
  );
}
