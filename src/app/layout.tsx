import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoUMKM",
  description: "GoUMKM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-black`}>
        <NextAuthProvider>
          <section className="w-full h-16"></section>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
