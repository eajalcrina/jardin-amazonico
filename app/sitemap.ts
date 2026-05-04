import type { MetadataRoute } from "next";

const BASE = "https://www.rainforestlegacy.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/paisajismo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/corporativo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
