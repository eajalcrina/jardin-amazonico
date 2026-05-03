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
