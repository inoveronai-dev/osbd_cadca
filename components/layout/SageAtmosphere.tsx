import type { ReactNode } from "react";

/**
 * Shared soft-sage atmosphere for Why OSBD + Services.
 * One continuous white ribbon motif sits behind both sections.
 */
export function SageAtmosphere({ children }: { children: ReactNode }) {
  return (
    <div className="sage-atmosphere relative isolate overflow-hidden bg-[#eff3ef]">
      <div className="sage-atmosphere-motif pointer-events-none absolute inset-0" aria-hidden>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 1600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="whiteRibbonFill" x1="8%" y1="0%" x2="92%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="40%" stopColor="#fcfcf9" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.24" />
            </linearGradient>
            <filter id="ribbonSoftBlur" x="-8%" y="-8%" width="116%" height="116%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
          </defs>

          {/* Broad continuous white ribbon — spans full green band */}
          <path
            d="M-120 40
               C 120 -20, 280 160, 480 130
               C 760 90, 920 280, 1140 250
               C 1320 226, 1480 360, 1620 320
               L 1620 500
               C 1460 560, 1300 420, 1120 460
               C 880 520, 740 700, 520 760
               C 300 820, 180 980, -80 1040
               L -80 1220
               C 160 1160, 300 1320, 540 1280
               C 820 1230, 980 1420, 1220 1380
               C 1400 1350, 1520 1480, 1640 1450
               L 1640 1620
               C 1480 1660, 1340 1540, 1160 1570
               C 900 1610, 740 1440, 500 1480
               C 260 1520, 120 1380, -120 1420
               Z"
            fill="url(#whiteRibbonFill)"
            filter="url(#ribbonSoftBlur)"
          />

          {/* Sharper contour lines following the same route */}
          <path
            d="M-80 120
               C 160 50, 320 220, 520 185
               C 800 140, 960 330, 1180 295
               C 1360 270, 1500 400, 1640 365
               C 1500 480, 1340 380, 1160 430
               C 900 500, 760 680, 540 740
               C 320 800, 180 960, -40 1020
               C 140 1120, 300 1260, 560 1220
               C 840 1170, 1000 1360, 1240 1320
               C 1420 1290, 1540 1420, 1660 1390"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.22"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M-60 200
               C 180 130, 340 300, 540 265
               C 820 220, 980 410, 1200 375
               C 1380 350, 1520 480, 1660 445
               C 1520 560, 1360 460, 1180 510
               C 920 580, 780 760, 560 820
               C 340 880, 200 1040, -20 1100
               C 160 1200, 320 1340, 580 1300
               C 860 1250, 1020 1440, 1260 1400
               C 1440 1370, 1560 1500, 1680 1470"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.18"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
