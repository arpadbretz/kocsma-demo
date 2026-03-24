import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rozsda Romkocsma | Budapest VII. kerület",
  description:
    "Budapest szívében, a VII. kerületben található romkocsma. Craft sörök, koktélok, élő zene és felülmúlhatatlan hangulat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
