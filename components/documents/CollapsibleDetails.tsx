"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CollapsibleDetailsProps = {
  initiallyOpen?: boolean;
  summary: ReactNode;
  children: ReactNode;
  className?: string;
};

export function CollapsibleDetails({
  initiallyOpen = true,
  summary,
  children,
  className,
}: CollapsibleDetailsProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <details
      className={cn("group/details", className)}
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 marker:content-none [&::-webkit-details-marker]:hidden">
        {summary}
      </summary>
      {children}
    </details>
  );
}
