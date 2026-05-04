"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Catalog } from "@/components/sections/Catalog";
import { Membership } from "@/components/sections/Membership";
import { LabubuImpact } from "@/components/sections/LabubuImpact";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { B2BTeaser } from "@/components/sections/B2BTeaser";
import { Footer } from "@/components/sections/Footer";
import { PlantDetailModal } from "@/components/catalog/PlantDetailModal";
import { PlantCheckoutModal } from "@/components/catalog/PlantCheckoutModal";
import { KeneDivider } from "@/components/ui/KeneDivider";
import type { Plant } from "@/lib/plants";
import { JsonLd } from "@/components/seo/JsonLd";
import { PlantCatalogJsonLd } from "@/components/seo/PlantCatalogJsonLd";
import { FAQ_ITEMS, MEMBERSHIP_FAQ_ITEMS } from "@/lib/faq-data";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: "Jardín Amazónico",
  url: "https://www.rainforestlegacy.org",
  description: "Plantas de colección amazónicas y artesanías de fibra de chambira en Lima.",
  address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
  areaServed: { "@type": "City", name: "Lima Metropolitana" },
  priceRange: "S/ 78 – S/ 170",
  currenciesAccepted: "PEN",
  paymentAccepted: "MercadoPago, Transferencia",
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Plantas de colección" },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...FAQ_ITEMS, ...MEMBERSHIP_FAQ_ITEMS].map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [checkoutPlant, setCheckoutPlant] = useState<Plant | null>(null);

  function startCheckout(plant: Plant) {
    setSelectedPlant(null);
    // small delay so the detail modal close animation completes before the checkout opens
    setTimeout(() => setCheckoutPlant(plant), 150);
  }

  return (
    <main>
      <JsonLd data={LOCAL_BUSINESS_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <PlantCatalogJsonLd />
      <Hero />
      <div className="bg-ja-cream py-3 text-ja-mid">
        <KeneDivider opacity={0.5} />
      </div>
      <Pillars />
      <Catalog onSelectPlant={setSelectedPlant} />
      <Membership />
      <LabubuImpact />
      <Testimonials />
      <FAQ />
      <B2BTeaser />
      <PlantDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onPurchase={startCheckout}
      />
      <PlantCheckoutModal
        plant={checkoutPlant}
        onClose={() => setCheckoutPlant(null)}
      />
      <Footer />
    </main>
  );
}
