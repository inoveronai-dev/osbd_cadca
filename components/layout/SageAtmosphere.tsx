import type { ReactNode } from "react";

/**
 * Shared atmosphere for Why OSBD + Services.
 * Soft green upper field transitions into warm-white via one organic curve.
 */
export function SageAtmosphere({ children }: { children: ReactNode }) {
  return (
    <div className="sage-atmosphere relative isolate overflow-hidden bg-warm-white">
      {/* Green field with organic lower edge — full-width, behind all content */}
      <div
        className="sage-atmosphere-shape pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(78%,52rem)] w-full sm:h-[min(72%,56rem)] lg:h-[min(68%,58rem)]"
        aria-hidden
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0
               H1440
               V520
               C 1260 610, 1100 690, 900 650
               C 680 600, 520 720, 340 680
               C 180 650, 80 580, 0 600
               Z"
            fill="#eff3ef"
          />
        </svg>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
