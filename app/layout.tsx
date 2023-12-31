import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import Header from "./Header";
import Footer from "./Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nazib Chowdhury",
  description: "A personal portfolio website of Nazib Chowdhury",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark")}>
        <Header />
        <div className="py-6 px-2 max-w-5xl mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
