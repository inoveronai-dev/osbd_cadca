import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contactSection } from "@/lib/content/home";

export function Contact() {
  const { contact, officeHours } = contactSection;

  return (
    <section
      id={contactSection.id}
      className="section-pad scroll-mt-24 bg-paper"
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {contactSection.headline}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-muted">
            {contactSection.support}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <ul className="space-y-6 rounded-[var(--radius-xl)] border border-border bg-white p-6 sm:p-8">
              <li className="flex gap-4">
                <span className="mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-sage text-forest">
                  <Phone className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">
                    Telefón
                  </p>
                  <a
                    href={contact.phoneHref}
                    className="mt-1 block text-2xl font-semibold tracking-tight text-ink hover:text-forest sm:text-3xl"
                  >
                    {contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-sage text-forest">
                  <Mail className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">
                    E-mail
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 block break-all text-xl font-semibold tracking-tight text-ink hover:text-forest sm:text-2xl"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-sage text-forest">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">
                    Adresa
                  </p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delayMs={80}>
            <div
              id={contactSection.officeHoursAnchor}
              className="scroll-mt-28 flex h-full flex-col justify-between rounded-[var(--radius-xl)] bg-forest p-6 text-white sm:p-8"
            >
              <div>
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-white/12">
                  <Clock className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                  Stránkové hodiny
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white/85">
                  {officeHours.note}
                </p>
              </div>
              <p className="mt-8 inline-flex w-fit items-center rounded border border-white/30 px-2 py-1 text-xs font-semibold tracking-wide text-white/75 uppercase">
                OPEN · Časy budú doplnené
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
