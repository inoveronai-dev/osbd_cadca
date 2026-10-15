import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type AppLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: ComponentProps<"a">["onClick"];
  prefetch?: boolean;
  "aria-current"?: ComponentProps<"a">["aria-current"];
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: ComponentProps<"a">["aria-haspopup"];
  "aria-controls"?: string;
  target?: string;
  rel?: string;
};

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

/**
 * Client-side routing for internal paths/hashes; plain anchors for tel/mailto/http.
 */
export function AppLink({
  href,
  children,
  className,
  prefetch = true,
  ...rest
}: AppLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className={cn(className)} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={prefetch} className={cn(className)} {...rest}>
      {children}
    </Link>
  );
}
