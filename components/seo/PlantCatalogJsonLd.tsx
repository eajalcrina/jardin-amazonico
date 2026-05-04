import { JsonLd } from "@/components/seo/JsonLd";
import { PLANTS } from "@/lib/plants";

function parsePrice(priceRange: string): number | null {
  const match = priceRange.match(/[\d]+/);
  return match ? Number(match[0]) : null;
}

export function PlantCatalogJsonLd() {
  const items = PLANTS.map((plant, i) => {
    const price = parsePrice(plant.regenerative.priceRange);
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: plant.name,
        description: plant.longDescription,
        image: plant.images[0]
          ? `https://www.rainforestlegacy.org${plant.images[0]}`
          : undefined,
        brand: { "@type": "Brand", name: "Jardín Amazónico" },
        ...(price != null && {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "PEN",
            availability: "https://schema.org/InStock",
          },
        }),
        additionalProperty: [
          { "@type": "PropertyValue", name: "Nombre científico", value: plant.scientificName },
          { "@type": "PropertyValue", name: "Luz", value: plant.care.light },
          { "@type": "PropertyValue", name: "Riego", value: plant.care.water },
          { "@type": "PropertyValue", name: "Humedad", value: plant.care.humidity },
          { "@type": "PropertyValue", name: "Pet friendly", value: plant.petSafe ? "Sí" : "No" },
          { "@type": "PropertyValue", name: "Tier", value: plant.tier === "S" ? "Signature" : plant.tier === "P" ? "Premium" : "Básico" },
        ],
      },
    };
  });

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Plantas de colección — Jardín Amazónico",
        numberOfItems: PLANTS.length,
        itemListElement: items,
      }}
    />
  );
}
