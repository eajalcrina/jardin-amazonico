# SEO & GEO Optimization — Design Spec

## Goal

Improve Jardín Amazónico's visibility in both traditional search engines (Google) and generative AI systems (ChatGPT, Perplexity, Claude, Google AI Overview) by implementing technical SEO infrastructure and structured data that makes the site's content machine-readable and citable.

## Scope

Technical SEO infrastructure + JSON-LD structured data + GEO-optimized metadata. No UI changes, no new pages, no blog infrastructure.

## Domain

Production URL: `https://www.rainforestlegacy.org`

---

## 1. Fix metadataBase

**File:** `app/layout.tsx`

Change `metadataBase` from `https://jardinamazonico.pe` to `https://www.rainforestlegacy.org`. This affects all canonical URLs, OG URLs, and sitemap references.

Update `openGraph` to include:
- `siteName: "Jardín Amazónico"`
- `url: "https://www.rainforestlegacy.org"`
- `images` array referencing the existing `opengraph-image.tsx` (Next.js auto-resolves `/opengraph-image` from the file convention)

Add Twitter card metadata:
- `card: "summary_large_image"`
- `title` and `description` matching OG

Add `themeColor: "#1B4332"` (ja-dark).

---

## 2. Sitemap

**File:** `app/sitemap.ts` (new)

Static sitemap with 3 routes:

| URL | Priority | Change Frequency |
|-----|----------|-----------------|
| `/` | 1.0 | weekly |
| `/paisajismo` | 0.7 | monthly |
| `/corporativo` | 0.7 | monthly |

Uses `MetadataRoute.Sitemap` return type from Next.js.

---

## 3. Robots

**File:** `app/robots.ts` (new)

Rules:
- Allow all user agents on all paths
- Disallow `/api/` (no indexing of API routes)
- Reference sitemap at `https://www.rainforestlegacy.org/sitemap.xml`

---

## 4. Page-Specific Metadata

### `/paisajismo`

**File:** `app/paisajismo/page.tsx`

Since this file uses `"use client"`, metadata cannot be exported directly. Create `app/paisajismo/layout.tsx` (new server component) to export metadata:

```
title: "Paisajismo con plantas amazónicas en Lima — Jardín Amazónico"
description: "Diseño de jardines y espacios interiores con plantas amazónicas de colección en Lima. Servicio residencial y comercial con plantas cultivadas en vivero."
openGraph.title: "Paisajismo amazónico en Lima"
openGraph.description: same as description
```

### `/corporativo`

**File:** `app/corporativo/layout.tsx` (new server component)

```
title: "Plantas como regalo corporativo en Lima — Jardín Amazónico"
description: "Plantas trofeo y merchandising corporativo con alma amazónica. Regalos empresariales con impacto social para empresas en Lima."
openGraph.title: "Plantas corporativas — Jardín Amazónico"
openGraph.description: same as description
```

---

## 5. JSON-LD Structured Data

### 5.1 JsonLd utility component

**File:** `components/seo/JsonLd.tsx` (new)

Minimal server component that renders a `<script type="application/ld+json">` tag. Accepts a generic `data` prop (Record type) and serializes it. Reusable across all schemas.

### 5.2 Organization schema

**Rendered in:** `app/layout.tsx` (via JsonLd component)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Jardín Amazónico",
  "url": "https://www.rainforestlegacy.org",
  "logo": "https://www.rainforestlegacy.org/opengraph-image",
  "description": "Plantas vivas de colección y artesanías amazónicas en Lima. Cada compra protege a las manos que sostienen la selva.",
  "foundingLocation": {
    "@type": "Place",
    "name": "Lima, Perú"
  },
  "areaServed": {
    "@type": "City",
    "name": "Lima"
  },
  "sameAs": [
    "https://www.instagram.com/jardin.amazonico"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://wa.me/51914401895",
    "availableLanguage": "es"
  }
}
```

### 5.3 LocalBusiness schema

**Rendered in:** `app/page.tsx` (home page only, via JsonLd component)

```json
{
  "@context": "https://schema.org",
  "@type": "Florist",
  "name": "Jardín Amazónico",
  "url": "https://www.rainforestlegacy.org",
  "description": "Plantas de colección amazónicas y artesanías de fibra de chambira en Lima.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lima",
    "addressCountry": "PE"
  },
  "areaServed": {
    "@type": "City",
    "name": "Lima Metropolitana"
  },
  "priceRange": "S/ 78 – S/ 170",
  "currenciesAccepted": "PEN",
  "paymentAccepted": "MercadoPago, Transferencia",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Plantas de colección"
  }
}
```

The `itemListElement` will be populated by the Product schemas (see 5.5).

### 5.4 FAQPage schema

**Rendered in:** `app/page.tsx` (home page, via JsonLd component)

Combines the 8 FAQ items from `components/sections/FAQ.tsx` and the 4 membership FAQ items from `components/sections/Membership.tsx` into a single FAQPage schema.

Data source: The FAQ items are defined as constants in their respective components. To avoid duplication, extract both sets of Q&A data to a shared `lib/faq-data.ts` file that exports them. Both the UI components and the schema component import from the same source.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿De dónde vienen las plantas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trabajamos con viveros especializados..."
      }
    }
  ]
}
```

All 12 Q&A pairs are included.

### 5.5 Product schema for plants

**File:** `components/seo/PlantCatalogJsonLd.tsx` (new server component)

Renders an `ItemList` schema containing a `Product` for each plant in the catalog. Data source: `lib/plants.ts` (the `getPlants()` function).

Each product includes:
- `name`, `description` (longDescription)
- `image` (first image URL)
- `brand`: "Jardín Amazónico"
- `offers.price` (parsed from `priceRange` string, e.g. `"S/ 106"` → `106`), `offers.priceCurrency: "PEN"`, `offers.availability: "InStock"`
- `additionalProperty` array:
  - `scientificName`
  - `careLight`, `careWater`, `careHumidity`
  - `petSafe` (boolean)
  - `tier` (Signature/Premium/Básico)

**Rendered in:** `app/page.tsx` (home page)

### 5.6 Service schema

**File:** `components/seo/ServiceJsonLd.tsx` (new server component)

Reusable component that accepts service details and renders `schema.org/Service`.

**Rendered in:**
- `app/paisajismo/layout.tsx`: Service for landscaping
- `app/corporativo/layout.tsx`: Service for corporate

Paisajismo service:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Paisajismo con plantas amazónicas",
  "provider": { "@type": "Organization", "name": "Jardín Amazónico" },
  "description": "Diseño de jardines y espacios interiores con plantas amazónicas de colección en Lima.",
  "areaServed": { "@type": "City", "name": "Lima" },
  "serviceType": "Landscaping"
}
```

Corporativo service:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Plantas como merchandising corporativo",
  "provider": { "@type": "Organization", "name": "Jardín Amazónico" },
  "description": "Plantas trofeo y merchandising corporativo con alma amazónica para empresas en Lima.",
  "areaServed": { "@type": "City", "name": "Lima" },
  "serviceType": "Corporate Gifts"
}
```

---

## 6. Shared FAQ Data

**File:** `lib/faq-data.ts` (new)

Export two arrays: `FAQ_ITEMS` (8 general) and `MEMBERSHIP_FAQ_ITEMS` (4 membership). Both components (`FAQ.tsx`, `Membership.tsx`) and the FAQPage schema import from here. Single source of truth.

Type: `{ id: string; question: string; answer: string }[]`

---

## 7. File Summary

### New files (8):
- `app/sitemap.ts`
- `app/robots.ts`
- `app/paisajismo/layout.tsx`
- `app/corporativo/layout.tsx`
- `components/seo/JsonLd.tsx`
- `components/seo/PlantCatalogJsonLd.tsx`
- `components/seo/ServiceJsonLd.tsx`
- `lib/faq-data.ts`

### Modified files (5):
- `app/layout.tsx` — metadataBase, OG images, Twitter, themeColor, Organization JsonLd
- `app/page.tsx` — LocalBusiness + FAQPage + PlantCatalog JsonLd components
- `components/sections/FAQ.tsx` — import FAQ_ITEMS from `lib/faq-data.ts`
- `components/sections/Membership.tsx` — import MEMBERSHIP_FAQ_ITEMS from `lib/faq-data.ts`

### No changes:
- No UI visible changes
- No new routes
- No new dependencies

---

## 8. Target Keywords (Semantic)

Embedded in metadata descriptions, not as keyword stuffing:

| Page | Target queries |
|------|---------------|
| Home | "plantas de colección Lima", "plantas exóticas Perú", "plantas amazónicas delivery Lima" |
| Paisajismo | "paisajismo plantas amazónicas Lima", "diseño jardines Lima" |
| Corporativo | "regalo corporativo plantas Lima", "merchandising plantas empresas" |

These also serve as the natural language queries an AI would use to retrieve and cite the site.

---

## 9. Testing

- `npx tsc --noEmit` — type safety
- `npx vitest run` — existing tests still pass
- View page source in browser to verify JSON-LD scripts render correctly
- Google Rich Results Test (manual, post-deploy): validate FAQPage, Product, and Organization schemas
- Schema.org validator (manual): paste JSON-LD to verify structure
