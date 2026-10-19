import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { PublicChrome } from "@/components/layout/PublicChrome";
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
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
