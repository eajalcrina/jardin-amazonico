import type { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";

export const metadata: Metadata = {
  title: "Plantas como regalo corporativo en Lima — Jardín Amazónico",
  description:
    "Plantas trofeo y merchandising corporativo con alma amazónica. Regalos empresariales con impacto social para empresas en Lima.",
  openGraph: {
    title: "Plantas corporativas — Jardín Amazónico",
    description:
      "Plantas trofeo y merchandising corporativo con alma amazónica. Regalos empresariales con impacto social para empresas en Lima.",
  },
};

export default function CorporativoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceJsonLd
        name="Plantas como merchandising corporativo"
        description="Plantas trofeo y merchandising corporativo con alma amazónica para empresas en Lima."
        serviceType="Corporate Gifts"
      />
      {children}
    </>
  );
}
