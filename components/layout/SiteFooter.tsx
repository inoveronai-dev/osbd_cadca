import { LogoMark } from "@/components/layout/LogoMark";
import { PendingLink } from "@/components/ui/PendingLink";
import { brand } from "@/lib/content/home";
import { contact } from "@/lib/content/contact";
import { footerNavGroups } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-deep-forest text-white">
      {/* Main footer — brand + navigation */}
      <div className="container-site pt-14 pb-12 md:pt-16 md:pb-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          {/* Brand block */}
          <div className="max-w-md">
            <LogoMark variant="official" tone="on-dark" />
            <p className="mt-5 text-[0.7rem] font-semibold tracking-[0.14em] text-sage/85 uppercase">
              Správa bytových domov
            </p>
            <p className="mt-3 text-[1.05rem] font-semibold tracking-tight text-white">
              {brand.name}
            </p>
            <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-white/68">
              {brand.legalName}. {brand.positioning}
            </p>
          </div>

          {/* Navigation groups */}
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:pt-1">
            {footerNavGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.7rem] font-semibold tracking-[0.14em] text-white/45 uppercase">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
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

      {/* Bottom meta bar */}
      <div className="border-t border-white/[0.1]">
        <div className="container-site flex flex-col gap-4 py-5 text-[0.8rem] leading-relaxed text-white/58 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-1">
            <span className="text-white/62">{contact.addressFull}</span>
            <span className="hidden text-white/22 sm:inline" aria-hidden>
              <span className="mx-3">|</span>
            </span>
            <span className="flex flex-wrap items-center gap-x-0 gap-y-1">
              <a
                href={contact.phoneHref}
                className="text-white/62 transition-colors hover:text-white"
              >
                {contact.phoneDisplay}
              </a>
              <span className="mx-3 text-white/22" aria-hidden>
                |
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-white/62 transition-colors hover:text-white"
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
