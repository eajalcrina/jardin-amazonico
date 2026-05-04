import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  name: string;
  description: string;
  serviceType: string;
};

export function ServiceJsonLd({ name, description, serviceType }: Props) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType,
        provider: { "@type": "Organization", name: "Jardín Amazónico" },
        areaServed: { "@type": "City", name: "Lima" },
      }}
    />
  );
}
