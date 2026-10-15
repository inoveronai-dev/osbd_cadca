import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contact } from "@/lib/content/contact";

const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapsEmbedQuery)}&z=16&output=embed`;

type LocationMapProps = {
  className?: string;
};

export function LocationMap({ className }: LocationMapProps) {
  return (
    <section
      className={
        className ??
        "border-t border-forest/8 bg-warm-white pt-[clamp(3rem,5.5vw,4.25rem)] pb-[clamp(3.25rem,6vw,4.75rem)]"
      }
      aria-labelledby="location-heading"
    >
      <div className="container-site">
        <Reveal>
          <h2
            id="location-heading"
            className="text-center font-semibold tracking-[-0.02em] text-forest text-[clamp(1.8rem,2.6vw,2.35rem)] leading-[1.16]"
          >
            Kde nás nájdete
          </h2>
        </Reveal>

        <Reveal delayMs={40} className="mt-7 sm:mt-8">
          <div className="overflow-hidden rounded-[var(--radius)] border border-forest/10 bg-white">
            <iframe
              title={`Mapa — ${contact.orgName}, ${contact.addressFull}`}
              src={embedSrc}
              className="block h-[340px] w-full border-0 md:h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-4 flex justify-center">
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-forest/20 bg-white px-4 text-[0.95rem] font-semibold text-forest transition-colors hover:border-forest/35 hover:bg-soft-sage"
            >
              Zobraziť v Google Maps
              <ExternalLink className="size-3.5 opacity-70" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
