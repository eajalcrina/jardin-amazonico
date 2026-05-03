import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jardín Amazónico — Plantas vivas, alma amazónica",
  description:
    "Plantas vivas de colección y artesanías amazónicas en Lima. Cada compra protege a las manos que sostienen la selva.",
  metadataBase: new URL("https://jardinamazonico.pe"),
  openGraph: {
    title: "Jardín Amazónico",
    description: "Plantas vivas de colección y artesanías amazónicas en Lima.",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#quiz"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ja-dark focus:text-ja-paper focus:px-4 focus:py-2 focus:rounded-full"
        >
          Saltar al cuestionario
        </a>
        {children}
      </body>
    </html>
  );
}
