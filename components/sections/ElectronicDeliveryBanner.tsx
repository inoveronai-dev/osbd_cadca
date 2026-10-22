import Image from "next/image";
import Link from "next/link";
import { loadHomepage } from "@/lib/content/load";

/**
 * Homepage promo banner for electronic document delivery.
 * Full card is clickable; sits between Hero and Quick Access.
 */
export function ElectronicDeliveryBanner() {
  const banner = loadHomepage().electronicDeliveryBanner;

  return (
    <section
      className="bg-ivory pt-7 pb-3 sm:pt-9 sm:pb-4 md:pt-10 md:pb-5"
      aria-label="Elektronické doručovanie dokumentov"
    >
      <div className="container-site">
        <Link
          href="/elektronicke-dorucovanie"
          className="group relative block cursor-pointer overflow-hidden rounded-xl border border-forest/10 bg-[#faf7f0] shadow-[0_8px_28px_-18px_rgba(7,35,26,0.28)] outline-none transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-forest/20 hover:shadow-[0_16px_36px_-16px_rgba(7,35,26,0.32)] focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            width={2048}
            height={768}
            className="h-auto w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.01]"
            sizes="(max-width: 1280px) calc(100vw - 2rem), 1120px"
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
