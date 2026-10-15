import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// 1. IMPORT KOMPONEN CHAT WIDGET DI SINI
import ChatWidget from "@/components/chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IDVISION - Premium Eyewear",
  description: "Koleksi Kacamata Premium Dinamis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* 2. PASANG WIDGET CHAT MENGAMBANG DI SINI */}
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
