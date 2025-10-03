import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Script from "next/script";
import { PhoenixTracker } from "@/components/PhoenixTracker";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trendy Things - Cool Collectibles & Knick Knacks",
  description: "Discover a plethora of random knick knacks, Labubus, and other cool collectibles. Your destination for trendy items and viral collectibles.",
  keywords: "collectibles, labubu, trendy items, knick knacks, toys, figurines, viral collectibles",
  openGraph: {
    title: "Trendy Things - Cool Collectibles & Knick Knacks",
    description: "Discover a plethora of random knick knacks, Labubus, and other cool collectibles.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trendy Things - Cool Collectibles & Knick Knacks",
    description: "Discover a plethora of random knick knacks, Labubus, and other cool collectibles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/phoenix-tracking.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <TooltipProvider>
                <Header />
                <main>
                  {children}
                </main>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </CartProvider>
          </ThemeProvider>
        </QueryProvider>        <Script src="/phoenix-tracking.js" strategy="afterInteractive" />
        <PhoenixTracker />

      </body>
    </html>
  );
}
