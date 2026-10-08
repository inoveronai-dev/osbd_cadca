import type { ReactNode } from "react";

/**
 * Shared soft-sage atmosphere for Why OSBD + Services.
 * One continuous ribbon motif sits behind both sections.
 */
export function SageAtmosphere({ children }: { children: ReactNode }) {
  return (
    <div className="sage-atmosphere relative isolate overflow-hidden bg-[#eff3ef]">
      <div className="sage-atmosphere-motif pointer-events-none absolute inset-0" aria-hidden>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 1200"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sageRibbonFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c8d9cf" stopOpacity="0.11" />
              <stop offset="45%" stopColor="#d5e3db" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#c5d6cc" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Broad soft architectural ribbon */}
          <path
            d="M-80 180
               C 180 120, 320 260, 520 240
               C 760 214, 900 360, 1120 340
               C 1280 328, 1400 420, 1560 390
               L 1560 540
               C 1380 580, 1240 470, 1080 490
               C 860 520, 720 380, 500 410
               C 300 438, 160 320, -80 360
               Z"
            fill="url(#sageRibbonFill)"
          />
          {/* Thin contour lines */}
          <path
            d="M-60 220 C 200 155, 360 290, 560 265 C 800 236, 940 385, 1160 360 C 1320 345, 1440 440, 1580 410"
            fill="none"
            stroke="#9fb8a8"
            strokeOpacity="0.14"
            strokeWidth="1.25"
          />
          <path
            d="M-40 300 C 220 240, 380 370, 580 345 C 820 316, 960 460, 1180 435 C 1340 420, 1460 510, 1600 485"
            fill="none"
            stroke="#8fa998"
            strokeOpacity="0.11"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
