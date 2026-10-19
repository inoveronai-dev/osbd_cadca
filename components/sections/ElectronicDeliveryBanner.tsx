import Image from "next/image";
import Link from "next/link";

/**
 * Homepage promo banner for electronic document delivery.
 * Full card is clickable; sits between Hero and Quick Access.
 */
export function ElectronicDeliveryBanner() {
  return (
    <section
      className="bg-ivory pt-6 pb-2 sm:pt-8 sm:pb-3 md:pt-9 md:pb-4"
      aria-label="Elektronické doručovanie dokumentov"
    >
      <div className="container-site">
        <Link
          href="/elektronicke-dorucovanie"
          className="group relative block cursor-pointer outline-none transition-[transform,filter] duration-300 ease-out hover:-translate-y-0.5 hover:drop-shadow-[0_16px_28px_rgba(7,35,26,0.18)] focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <Image
            src="/images/banner-elektronicke-dorucovanie.png"
            alt="Elektronické doručovanie dokumentov — dajte si poslať všetko k sebe. Pre viac informácií kliknite."
            width={2162}
            height={601}
            className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-[1.012]"
            sizes="(max-width: 1280px) 100vw, 1120px"
            priority={false}
          />
          <span className="sr-only">
            Prejsť na stránku Elektronické doručovanie
          </span>
        </Link>
      </div>
    </section>
  );
}
