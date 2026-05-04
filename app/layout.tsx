import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/ui/Header";
import { JsonLd } from "@/components/seo/JsonLd";
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

export const viewport: Viewport = {
  themeColor: "#1B4332",
};

export const metadata: Metadata = {
  title: "Jardín Amazónico — Plantas vivas, alma amazónica",
  description:
    "Plantas vivas de colección y artesanías amazónicas en Lima. Cada compra protege a las manos que sostienen la selva.",
  metadataBase: new URL("https://www.rainforestlegacy.org"),
  openGraph: {
    title: "Jardín Amazónico",
    description: "Plantas vivas de colección y artesanías amazónicas en Lima.",
    siteName: "Jardín Amazónico",
    url: "https://www.rainforestlegacy.org",
    locale: "es_PE",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Jardín Amazónico — Plantas vivas, alma amazónica" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jardín Amazónico — Plantas vivas, alma amazónica",
    description: "Plantas vivas de colección y artesanías amazónicas en Lima.",
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Jardín Amazónico",
  url: "https://www.rainforestlegacy.org",
  logo: "https://www.rainforestlegacy.org/opengraph-image",
  description:
    "Plantas vivas de colección y artesanías amazónicas en Lima. Cada compra protege a las manos que sostienen la selva.",
  foundingLocation: { "@type": "Place", name: "Lima, Perú" },
  areaServed: { "@type": "City", name: "Lima" },
  sameAs: ["https://www.instagram.com/jardin.amazonico"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://wa.me/51914401895",
    availableLanguage: "es",
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
        <JsonLd data={ORGANIZATION_SCHEMA} />
        <a
          href="#quiz"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ja-dark focus:text-ja-paper focus:px-4 focus:py-2 focus:rounded-full"
        >
          Saltar al cuestionario
        </a>
        <Header />
        {children}
      </body>
    </html>
  );
}
