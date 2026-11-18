import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Baba Electronics | IoT Dev Boards, Components & Custom Billboard Engineering",
  description:
    "India's premier store for IoT development boards (ESP32, Arduino), digital sensors, components, and bespoke custom electronic billboards. Fast pan-India delivery & verified GST invoices.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

