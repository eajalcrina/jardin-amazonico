import type { Plant } from "./plants";

export function buildPlantWhatsAppUrl(_plant: Plant, waNumber: string): string {
  return `https://wa.me/${waNumber}`;
}
