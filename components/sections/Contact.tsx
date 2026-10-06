import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contactSection } from "@/lib/content/home";

export function Contact() {
  const { contact, officeHours } = contactSection;

  return (
    <section
      id={contactSection.id}
      className="section-pad scroll-mt-24 bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="container-site max-w-[58rem]">
        <Reveal>
          <h2 id="contact-heading" className="section-heading">
            {contactSection.headline}
          </h2>
          <p className="mt-3 max-w-lg text-[0.98rem] leading-relaxed text-ink-muted">
            {contactSection.support}
          </p>
        </Reveal>

        <Reveal delayMs={50}>
          <ul className="mt-8 grid gap-6 border-t border-[var(--border-subtle)] pt-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <li>
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.1em] text-ink-muted uppercase">
                <Phone className="size-3.5 text-forest" aria-hidden />
                Telefón
              </p>
              <a
                href={contact.phoneHref}
                className="mt-2 block text-[1.2rem] font-semibold tracking-tight text-ink transition-colors hover:text-forest"
              >
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.1em] text-ink-muted uppercase">
                <Mail className="size-3.5 text-forest" aria-hidden />
                E-mail
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2 block break-all text-[1.05rem] font-semibold tracking-tight text-ink transition-colors hover:text-forest"
              >
                {contact.email}
              </a>
            </li>
            <li className="sm:col-span-2 lg:col-span-1">
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.1em] text-ink-muted uppercase">
                <MapPin className="size-3.5 text-forest" aria-hidden />
                Adresa
              </p>
              <p className="mt-2 text-[1.05rem] font-semibold tracking-tight text-ink">
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
            className="scroll-mt-28 mt-8 border-t border-[var(--border-subtle)] pt-7"
          >
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden />
              <div>
                <h3 className="text-[1.05rem] font-semibold tracking-tight text-ink">
                  Stránkové hodiny
                </h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-muted">
                  {officeHours.note}
                </p>
                <p className="mt-3 inline-flex w-fit items-center border border-[var(--border-subtle)] px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-ink-muted uppercase">
                  OPEN · Časy budú doplnené
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
