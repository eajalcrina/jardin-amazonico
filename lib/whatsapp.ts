import type { Plant } from "./plants";

export function buildPlantWhatsAppUrl(plant: Plant, waNumber: string): string {
  const { name, scientificName, regenerative } = plant;
  const { labubu, priceRange, pot, includes } = regenerative;

  const message = [
    "Hola 🌿 Vengo de la web de Jardín Amazónico.",
    "",
    "Me interesa la opción REGENERATIVA de:",
    `*${name}* (_${scientificName}_)`,
    "",
    "Incluye:",
    `- ${includes[0] ?? `Planta ${name}`}`,
    `- Maceta ${pot}`,
    `- Labubu ${labubu.animal} tejido en chambira por ${labubu.artisan}, comunidad ${labubu.community} (${labubu.region})`,
    "- Tarjeta dedicatoria personalizada",
    "",
    `Precio: ${priceRange}`,
    "",
    "¿Tienen disponibilidad?",
  ].join("\n");

  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

export function buildGenericWhatsAppUrl(
  waNumber: string,
  message?: string,
): string {
  if (!message) return `https://wa.me/${waNumber}`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

export function buildLandscapingWhatsAppUrl(waNumber: string): string {
  const message = [
    "Hola, vengo de la web de Jardín Amazónico.",
    "Me interesa una propuesta de paisajismo / vegetación para [tipo de espacio].",
    "¿Pueden ayudarme con una cotización?",
  ].join("\n");
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

export function buildCorporateWhatsAppUrl(waNumber: string): string {
  const message = [
    "Hola, vengo de la web de Jardín Amazónico.",
    "Me interesa una propuesta corporativa: [plantas trofeo / merchandising / ambos].",
    "Contexto: [breve].",
    "¿Pueden ayudarme?",
  ].join("\n");
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}
