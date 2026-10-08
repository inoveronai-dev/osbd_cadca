import { LogoMark } from "@/components/layout/LogoMark";
import { PendingLink } from "@/components/ui/PendingLink";
import { brand } from "@/lib/content/home";
import { contact } from "@/lib/content/contact";
import { footerNavGroups } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-deep-forest text-white">
      <div className="container-site pt-12 pb-10 md:pt-14 md:pb-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <div className="max-w-md">
            <LogoMark variant="official" tone="on-dark" />
            <p className="mt-4 text-[0.7rem] font-semibold tracking-[0.12em] text-sage/80 uppercase">
              Správa bytových domov
            </p>
            <p className="mt-2.5 text-[1.02rem] font-semibold tracking-tight text-white">
              {brand.name}
            </p>
            <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-white/70">
              {brand.legalName}. {brand.positioning}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:pt-1">
            {footerNavGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.7rem] font-semibold tracking-[0.12em] text-white/45 uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <PendingLink
                        label={item.label}
                        href={item.href}
                        status={item.status}
                        className="text-[0.95rem] text-white/82 transition-colors hover:text-white"
                        pendingClassName="text-[0.95rem] text-white/38"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-5 text-[0.8rem] leading-relaxed text-white/58 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center">
            <span>{contact.addressFull}</span>
            <span className="hidden text-white/25 sm:inline" aria-hidden>
              <span className="mx-2.5">·</span>
            </span>
            <span className="flex flex-wrap items-center gap-y-1">
              <a
                href={contact.phoneHref}
                className="transition-colors hover:text-white"
              >
                {contact.phoneDisplay}
              </a>
              <span className="mx-2.5 text-white/25" aria-hidden>
                ·
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </span>
          </div>
          <p className="shrink-0 text-white/48">
            © {new Date().getFullYear()} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
