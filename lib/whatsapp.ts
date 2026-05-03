import type { Plant } from "./plants";

export function buildPlantWhatsAppUrl(plant: Plant, waNumber: string): string {
  const { name, scientificName, regenerative } = plant;
  const { priceRange } = regenerative;

  const message = [
    "Hola 🌿 Vengo de la web de Jardín Amazónico.",
    "",
    "Me interesa la opción REGENERATIVA de:",
    `*${name}* (_${scientificName}_)`,
    "",
    "Incluye:",
    `- Planta ${name}`,
    "- Maceta minimalista curada",
    "- Labubu amazónico de fibra de chambira (sorpresa — el animal del mes)",
    "- Tarjeta de agradecimiento de la artesana",
    "",
    `Precio: ${priceRange}`,
    "Envío: 24 a 48 horas en Lima",
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
