import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { brand } from "@/lib/content/home";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | Správa bytových domov`,
    template: `%s | ${brand.name}`,
  },
  description: brand.positioning,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sk" className={`${sourceSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#obsah"
          className="absolute top-3 left-3 z-[60] -translate-y-20 rounded-md bg-white px-4 py-3 text-base font-semibold text-forest shadow-md transition-transform focus:translate-y-0"
        >
          Preskočiť na obsah
        </a>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
