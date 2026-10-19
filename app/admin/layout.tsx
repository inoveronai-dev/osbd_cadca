import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrácia",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f1ea] text-ink antialiased">
      {children}
    </div>
  );
}
