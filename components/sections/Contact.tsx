import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
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
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16">
        <div>
          <Reveal>
            <h2 id="contact-heading" className="section-heading">
              {contactSection.headline}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
              {contactSection.support}
            </p>
          </Reveal>

          <Reveal delayMs={60}>
            <ul className="mt-10 space-y-8 border-t border-[var(--border-strong)] pt-8">
              <li className="flex gap-4 sm:gap-5">
                <span className="mt-1 inline-flex size-12 shrink-0 items-center justify-center rounded-[var(--radius)] bg-sage text-forest">
                  <Phone className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">
                    Telefón
                  </p>
                  <a
                    href={contact.phoneHref}
                    className="mt-1.5 block text-2xl font-semibold tracking-tight text-ink transition-colors hover:text-forest sm:text-3xl"
                  >
                    {contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 sm:gap-5">
                <span className="mt-1 inline-flex size-12 shrink-0 items-center justify-center rounded-[var(--radius)] bg-sage text-forest">
                  <Mail className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">
                    E-mail
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1.5 block break-all text-xl font-semibold tracking-tight text-ink transition-colors hover:text-forest sm:text-2xl"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 sm:gap-5">
                <span className="mt-1 inline-flex size-12 shrink-0 items-center justify-center rounded-[var(--radius)] bg-sage text-forest">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">
                    Adresa
                  </p>
                  <p className="mt-1.5 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
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

          <Reveal delayMs={100}>
            <div
              id={contactSection.officeHoursAnchor}
              className="scroll-mt-28 mt-10 border border-forest/15 bg-forest p-6 text-white sm:p-7"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius)] bg-white/12">
                  <Clock className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    Stránkové hodiny
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-white/88">
                    {officeHours.note}
                  </p>
                  <p className="mt-5 inline-flex w-fit items-center rounded-[var(--radius-sm)] border border-white/30 px-2 py-1 text-xs font-semibold tracking-wide text-white/75 uppercase">
                    OPEN · Časy budú doplnené
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={80} className="group lg:sticky lg:top-28">
          <div className="media-frame aspect-[4/5] min-h-[22rem] sm:aspect-[5/6] lg:min-h-[32rem]">
            <div className="img-zoom h-full">
              <ImagePlaceholder
                slotId="contact-osbd-hq"
                label="contact-osbd-hq"
                description="Fotografia sídla OSBD Čadca alebo autentická fotografia zamestnancov"
                quiet
                className="h-full rounded-[var(--radius)]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
