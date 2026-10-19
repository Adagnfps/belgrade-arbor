import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Belgrade Arbor | Residential & Business Complex in New Belgrade",
  description:
    "Discover Belgrade Arbor - premium apartments and business spaces in New Belgrade. Explore residences, amenities, location, and availability.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-vanilla text-pine-green selection:bg-golden/30 selection:text-pine-green">
        {children}
      </body>
    </html>
  );
}
