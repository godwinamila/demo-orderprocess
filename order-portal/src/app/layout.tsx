import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AsgardeoProvider } from "@asgardeo/nextjs/server";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Norvia — Shop everything",
  description: "A demo storefront and order management experience.",
};

// AsgardeoProvider reads request headers/cookies to resolve the session on every
// request, so this app can't be statically prerendered.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AsgardeoProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </AsgardeoProvider>
      </body>
    </html>
  );
}
