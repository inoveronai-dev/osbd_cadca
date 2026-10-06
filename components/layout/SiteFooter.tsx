import { LogoMark } from "@/components/layout/LogoMark";
import { PendingLink } from "@/components/ui/PendingLink";
import { brand } from "@/lib/content/home";
import { contact } from "@/lib/content/contact";
import { footerNavGroups } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-deep-forest text-white">
      <div className="container-site section-pad grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <LogoMark tone="on-dark" />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/80">
            {brand.legalName}. {brand.positioning}
          </p>
        </div>

        {footerNavGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold tracking-[0.06em] text-white/55 uppercase">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.label}>
                  <PendingLink
                    label={item.label}
                    href={item.href}
                    status={item.status}
                    className="text-[1.05rem] text-white/90 transition-colors hover:text-white"
                    pendingClassName="text-[1.05rem] text-white/45"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {contact.addressFull}
            <span className="mx-2 text-white/30" aria-hidden>
              ·
            </span>
            <a
              href={contact.phoneHref}
              className="hover:text-white"
            >
              {contact.phoneDisplay}
            </a>
            <span className="mx-2 text-white/30" aria-hidden>
              ·
            </span>
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-white"
            >
              {contact.email}
            </a>
          </p>
          <p>© {new Date().getFullYear()} {brand.name}</p>
        </div>
      </div>
    </footer>
  );
}
