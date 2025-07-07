import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SEOgenie",
  description: "AI-powered blog creation tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
        <body className="bg-gradient-to-br from-indigo-50 via-white to-purple-100 min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
