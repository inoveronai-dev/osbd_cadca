import type { ReactNode } from "react";

/**
 * Shared soft-sage atmosphere for Why OSBD + Services.
 * One continuous, clearly visible white ribbon spans both sections.
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
            <linearGradient id="whiteRibbonFillStrong" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.52" />
              <stop offset="50%" stopColor="#fcfcf9" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.44" />
            </linearGradient>
            <filter
              id="ribbonEdgeSoft"
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" />
            </filter>
          </defs>

          {/* Main thick white ribbon — ~220px visual band, full height span */}
          <path
            d="M-160 -40
               C 80 -100, 260 140, 500 90
               C 820 20, 980 260, 1240 200
               C 1420 160, 1560 320, 1720 270
               L 1720 500
               C 1520 580, 1360 400, 1140 460
               C 860 540, 700 760, 440 860
               C 180 960, 40 1160, -140 1260
               L -140 1500
               C 80 1400, 260 1580, 540 1520
               C 860 1450, 1040 1640, 1320 1580
               C 1500 1540, 1620 1680, 1760 1640
               L 1760 1860
               C 1560 1920, 1380 1760, 1140 1810
               C 840 1870, 640 1680, 360 1740
               C 120 1790, -20 1640, -160 1680
               Z"
            fill="url(#whiteRibbonFillStrong)"
            filter="url(#ribbonEdgeSoft)"
          />

          {/* Supporting contour lines — clearly defined */}
          <path
            d="M-100 80
               C 140 0, 320 220, 560 160
               C 880 80, 1040 320, 1300 260
               C 1480 220, 1600 380, 1760 330
               C 1580 460, 1400 360, 1200 430
               C 900 530, 740 740, 480 840
               C 220 940, 80 1140, -80 1240
               C 120 1380, 300 1540, 600 1470
               C 920 1390, 1100 1580, 1380 1520
               C 1560 1480, 1680 1620, 1800 1580"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.4"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M-70 170
               C 170 90, 350 310, 590 250
               C 910 170, 1070 410, 1330 350
               C 1510 310, 1630 470, 1790 420
               C 1610 550, 1430 450, 1230 520
               C 930 620, 770 830, 510 930
               C 250 1030, 110 1230, -50 1330
               C 150 1470, 330 1630, 630 1560
               C 950 1480, 1130 1670, 1410 1610
               C 1590 1570, 1710 1710, 1830 1670"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.32"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
