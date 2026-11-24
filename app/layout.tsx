import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Vendor Tracker",
  description: "Manage your vendors with AWS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-full bg-ink-950">
      <body className="min-h-screen bg-ink-950 bg-aurora bg-fixed bg-no-repeat font-sans text-ink-100 antialiased">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-grid [background-size:64px_64px] [mask-image:radial-gradient(ellipse_85%_65%_at_50%_0%,#000_0%,transparent_78%)] [-webkit-mask-image:radial-gradient(ellipse_85%_65%_at_50%_0%,#000_0%,transparent_78%)]"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
