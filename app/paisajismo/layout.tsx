import type { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";

export const metadata: Metadata = {
  title: "Paisajismo con plantas amazónicas en Lima — Jardín Amazónico",
  description:
    "Diseño de jardines y espacios interiores con plantas amazónicas de colección en Lima. Servicio residencial y comercial con plantas cultivadas en vivero.",
  openGraph: {
    title: "Paisajismo amazónico en Lima",
    description:
      "Diseño de jardines y espacios interiores con plantas amazónicas de colección en Lima. Servicio residencial y comercial con plantas cultivadas en vivero.",
  },
};

export default function PaisajismoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceJsonLd
        name="Paisajismo con plantas amazónicas"
        description="Diseño de jardines y espacios interiores con plantas amazónicas de colección en Lima."
        serviceType="Landscaping"
      />
      {children}
    </>
  );
}
