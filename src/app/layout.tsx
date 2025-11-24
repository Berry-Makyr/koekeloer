import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koekeloer | Premium Online Shopping",
  description: "South Africa's premier online shopping destination.",
};

import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Navbar />
          <main className="container mx-auto flex-1 py-6">
            {children}
          </main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2024 Koekeloer. All rights reserved. Built for South Africa.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
