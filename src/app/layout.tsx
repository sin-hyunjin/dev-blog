import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavHeader from "@/components/nav-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
          min-h-screen `}
      >
        <div className="relative z-10">
          <NavHeader />

          <main className="flex-1">{children}</main>

          <footer className="text-center text-sm text-muted-foreground py-4">
            &copy; 2025 Your Company. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
