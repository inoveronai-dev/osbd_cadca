import Image from "next/image";
import { hero } from "@/lib/content/home";

type SubpageHeroProps = {
  title: string;
  /** Optional short subtitle under the page title. */
  support?: string;
  headingId: string;
};

/** Shared photo banner for informational subpages. */
export function SubpageHero({ title, support, headingId }: SubpageHeroProps) {
  return (
    <section
      className="relative isolate mt-[var(--header-h)] flex min-h-[240px] items-end overflow-hidden bg-forest text-white sm:min-h-[300px] md:min-h-[340px] lg:min-h-[360px]"
      aria-labelledby={headingId}
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cadca-kysuce.png"
          alt={hero.imageSlot.description}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[42%_40%] sm:object-[52%_38%]"
        />
        <div
          className="absolute inset-0 max-md:hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,55,42,0.92) 0%, rgba(15,55,42,0.82) 28%, rgba(15,55,42,0.55) 52%, rgba(15,55,42,0.28) 72%, rgba(15,55,42,0.12) 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,55,42,0.55) 0%, rgba(15,55,42,0.72) 45%, rgba(15,55,42,0.88) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative container-site w-full py-8 sm:py-9 md:py-10">
        <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-white/80 uppercase sm:text-[0.76rem]">
          OSBD ČADCA
        </p>
        <h1
          id={headingId}
          className="mt-2.5 max-w-xl font-semibold tracking-[-0.02em] text-[#f7f7f2] text-[clamp(2rem,4vw,2.85rem)] leading-[1.1]"
        >
          {title}
        </h1>
        {support ? (
          <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-white/85 sm:text-[0.98rem]">
            {support}
          </p>
        ) : null}
      </div>
    </section>
  );
}
