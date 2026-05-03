import { describe, it, expect } from "vitest";
import { buildPlantWhatsAppUrl } from "./whatsapp";
import type { Plant } from "./plants";

const samplePlant: Plant = {
  id: "JA-S001",
  slug: "alocasia-amazonica",
  name: "Alocasia Amazónica",
  scientificName: "Alocasia 'Amazonica'",
  tier: "S",
  iconLucide: "sparkles",
  imageUrl: "",
  imageAlt: "",
  tags: { type: ["exotic"], size: ["medium"], care: ["amateur"] },
  petSafe: false,
  suitableFor: { gift: true, space: true, me: true },
  description: "",
  longDescription: "",
  benefit: { iconLucide: "sparkles", text: "" },
  care: { light: "", water: "", humidity: "" },
  seasonalWarningLima: null,
  regenerative: {
    priceRange: "S/ 185–255",
    pot: "Tierra",
    includes: [
      "Planta Alocasia Amazónica",
      "Maceta Tierra (cerámica artesanal)",
      "Labubu Rana Venenosa — fibra de chambira",
      "Tarjeta dedicatoria personalizada",
    ],
    labubu: {
      animal: "Rana Venenosa",
      artisan: "Rosa Cumapa",
      community: "Shipibo-Conibo",
      region: "Ucayali, Perú",
    },
  },
};

describe("buildPlantWhatsAppUrl", () => {
  it("returns wa.me URL with the configured number", () => {
    const url = buildPlantWhatsAppUrl(samplePlant, "51999111222");
    expect(url).toContain("https://wa.me/51999111222");
  });

  it("includes plant name in encoded message", () => {
    const url = buildPlantWhatsAppUrl(samplePlant, "51999111222");
    const decoded = decodeURIComponent(url.split("?text=")[1] ?? "");
    expect(decoded).toContain("Alocasia Amazónica");
    expect(decoded).toContain("Alocasia 'Amazonica'");
  });

  it("includes labubu and artisan info", () => {
    const url = buildPlantWhatsAppUrl(samplePlant, "51999111222");
    const decoded = decodeURIComponent(url.split("?text=")[1] ?? "");
    expect(decoded).toContain("Rana Venenosa");
    expect(decoded).toContain("Rosa Cumapa");
    expect(decoded).toContain("Shipibo-Conibo");
  });

  it("includes price range", () => {
    const url = buildPlantWhatsAppUrl(samplePlant, "51999111222");
    const decoded = decodeURIComponent(url.split("?text=")[1] ?? "");
    expect(decoded).toContain("S/ 185–255");
  });
});
