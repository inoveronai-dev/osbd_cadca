import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contactSection } from "@/lib/content/home";

export function Contact() {
  const { contact, officeHours } = contactSection;

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

        <div className="mt-9 grid items-start gap-7 lg:mt-11 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 xl:gap-12">
          <Reveal delayMs={40}>
            <ul className="grid gap-3.5">
              <li className="rounded-[0.5rem] border border-forest/10 bg-white px-5 py-4.5 sm:px-5 sm:py-5">
                <p className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.1em] text-ink-muted uppercase">
                  <Phone className="size-3.5 text-forest" aria-hidden />
                  Telefón
                </p>
                <a
                  href={contact.phoneHref}
                  className="mt-2 block text-[1.28rem] font-semibold tracking-tight text-ink transition-colors hover:text-forest sm:text-[1.35rem]"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="rounded-[0.5rem] border border-forest/10 bg-white px-5 py-4.5 sm:px-5 sm:py-5">
                <p className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.1em] text-ink-muted uppercase">
                  <Mail className="size-3.5 text-forest" aria-hidden />
                  E-mail
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2 block break-all text-[1.05rem] font-semibold tracking-tight text-ink transition-colors hover:text-forest sm:text-[1.12rem]"
                >
                  {contact.email}
                </a>
              </li>
              <li className="rounded-[0.5rem] border border-forest/10 bg-white px-5 py-4.5 sm:px-5 sm:py-5">
                <p className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.1em] text-ink-muted uppercase">
                  <MapPin className="size-3.5 text-forest" aria-hidden />
                  Adresa
                </p>
                <p className="mt-2 text-[1.05rem] font-semibold tracking-tight text-ink sm:text-[1.12rem]">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </li>
            </ul>
          </Reveal>

          <Reveal delayMs={80}>
            <div
              id={contactSection.officeHoursAnchor}
              className="scroll-mt-28 h-full rounded-[0.5rem] border border-forest/12 bg-white p-5 sm:p-6 lg:p-7"
            >
              <div className="flex items-center gap-2.5 border-b border-forest/10 pb-4">
                <span className="inline-flex size-9 items-center justify-center rounded-[0.375rem] bg-soft-sage text-forest">
                  <Clock className="size-4" aria-hidden />
                </span>
                <h3 className="text-[1.15rem] font-semibold tracking-tight text-forest sm:text-[1.25rem]">
                  {officeHours.title}
                </h3>
              </div>

              <ul className="mt-3.5 divide-y divide-forest/8">
                {officeHours.schedule.map((row) => (
                  <li
                    key={row.day}
                    className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="min-w-[6.5rem] text-[0.9rem] font-semibold text-ink">
                      {row.day}
                    </span>
                    <span
                      className={
                        row.hours === "nestránkový deň"
                          ? "text-[0.88rem] text-ink-muted sm:text-right"
                          : "text-[0.88rem] tabular-nums text-ink/85 sm:text-right"
                      }
                    >
                      {row.hours}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-3">
                <div className="rounded-[0.375rem] border border-forest/8 bg-soft-sage/60 px-4 py-3">
                  <p className="text-[0.72rem] font-semibold tracking-[0.08em] text-forest uppercase">
                    {officeHours.lunchBreak.title}
                  </p>
                  <p className="mt-1 text-[0.92rem] text-ink/85">
                    {officeHours.lunchBreak.detail}
                  </p>
                </div>

                {officeHours.extras.map((block) => (
                  <div
                    key={block.title}
                    className="rounded-[0.375rem] border border-forest/8 bg-warm-white px-4 py-3"
                  >
                    <p className="text-[0.72rem] font-semibold tracking-[0.06em] text-ink-muted uppercase">
                      {block.title}
                    </p>
                    <p className="mt-1 text-[0.92rem] text-ink/85">
                      {block.detail}
                    </p>
                  </div>
                ))}

                <div className="rounded-[0.375rem] border border-forest/20 bg-forest px-4 py-3.5 text-white">
                  <p className="text-[0.72rem] font-semibold tracking-[0.08em] text-sage uppercase">
                    {officeHours.emergency.title}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {officeHours.emergency.lines.map((line) => (
                      <li key={line} className="text-[0.92rem] text-white/90">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
