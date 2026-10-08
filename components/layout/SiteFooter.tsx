import { LogoMark } from "@/components/layout/LogoMark";
import { PendingLink } from "@/components/ui/PendingLink";
import { brand } from "@/lib/content/home";
import { contact } from "@/lib/content/contact";
import { footerNavGroups } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-forest/20 bg-deep-forest text-white">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.35fr_1fr_1fr] md:gap-12 md:py-14 lg:gap-16">
        <div>
          <LogoMark tone="on-dark" />
          <p className="mt-3 text-[0.78rem] font-semibold tracking-[0.1em] text-sage/90 uppercase">
            Správa bytových domov
          </p>
          <p className="mt-4 max-w-sm text-[0.92rem] leading-relaxed text-white/75">
            {brand.legalName}. {brand.positioning}
          </p>
        </div>

        {footerNavGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-[0.72rem] font-semibold tracking-[0.12em] text-white/50 uppercase">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.label}>
                  <PendingLink
                    label={item.label}
                    href={item.href}
                    status={item.status}
                    className="text-[0.98rem] text-white/88 transition-colors hover:text-white"
                    pendingClassName="text-[0.98rem] text-white/40"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/12">
        <div className="container-site flex flex-col gap-3 py-5 text-[0.82rem] leading-relaxed text-white/65 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-6">
          <p className="flex flex-col gap-1 sm:block">
            <span>{contact.addressFull}</span>
            <span className="hidden sm:inline">
              <span className="mx-2 text-white/25" aria-hidden>
                ·
              </span>
            </span>
            <span>
              <a href={contact.phoneHref} className="transition-colors hover:text-white">
                {contact.phoneDisplay}
              </a>
              <span className="mx-2 text-white/25" aria-hidden>
                ·
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </span>
          </p>
          <p className="shrink-0 text-white/55">
            © {new Date().getFullYear()} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
