# SEO & GEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add technical SEO infrastructure (sitemap, robots, metadata) and JSON-LD structured data (Organization, LocalBusiness, FAQPage, Product, Service) to improve visibility in search engines and generative AI systems.

**Architecture:** All changes are metadata and invisible markup — no UI changes. JSON-LD schemas are rendered via a reusable `JsonLd` component. FAQ data is extracted to a shared module to avoid duplication between UI components and schema markup. Page-specific metadata uses layout files since the page components are client-only.

**Tech Stack:** Next.js App Router metadata API, schema.org JSON-LD, TypeScript

---

### Task 1: JsonLd utility component + shared FAQ data extraction

**Files:**
- Create: `components/seo/JsonLd.tsx`
- Create: `lib/faq-data.ts`
- Modify: `components/sections/FAQ.tsx`
- Modify: `components/sections/Membership.tsx`

- [ ] **Step 1: Create the JsonLd component**

Create `components/seo/JsonLd.tsx`:

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Create the shared FAQ data module**

Create `lib/faq-data.ts`. Move the 8 FAQ items from `components/sections/FAQ.tsx` and the 4 membership FAQ items from `components/sections/Membership.tsx` here.

```ts
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "origen",
    question: "¿De dónde vienen las plantas?",
    answer: "Trabajamos con viveros especializados que cultivan bajo prácticas responsables. Ninguna planta es extraída de manera silvestre del bosque. Cada especie de origen amazónico (como el Filodendro Gloriosum o el Anturio Cristalino) proviene de propagación en vivero, no de extracción del bosque.",
  },
  {
    id: "protegidas",
    question: "¿Trabajan con especies protegidas o en peligro?",
    answer: "No. Nuestro catálogo está compuesto solo por especies cultivadas y comercializadas legalmente. Las plantas de origen amazónico provienen de propagación en vivero, no de extracción del bosque.",
  },
  {
    id: "chambira",
    question: "¿Cómo se garantiza el origen responsable de la chambira?",
    answer: "La fibra de chambira (Astrocaryum chambira) se extrae sin tala — solo se cosechan las hojas tiernas. Una palma puede producir fibra por más de 30 años. Trabajamos directamente con artesanas de comunidades que practican esta técnica ancestral.",
  },
  {
    id: "artesana",
    question: "¿Cuánto recibe la artesana de cada labubu?",
    answer: "Un porcentaje significativo del precio Regenerativa (objetivo 15%) va directamente a la artesana, sin intermediarios. Las artesanas fijan el precio de su trabajo; nosotros lo aceptamos.",
  },
  {
    id: "envios",
    question: "¿Hacen envíos fuera de Lima?",
    answer: "Por ahora solo Lima Metropolitana. Estamos evaluando expandirnos.",
  },
  {
    id: "garantia",
    question: "¿Qué pasa si mi planta se enferma o muere?",
    answer: "Si eres miembro activo de Bosque o Suelo con 3 o más meses de suscripción continua, te enviamos un esqueje de reposición sin costo (Garantía del Esqueje). Para compras puntuales fuera de membresía, ofrecemos asesoría de cuidado pero no reposición.",
  },
  {
    id: "mascotas",
    question: "¿Las plantas son seguras para mis mascotas?",
    answer: "Algunas sí, otras no. Cada ficha de planta lo indica claramente con un badge \"Pet friendly\". Si tienes mascotas, el cuestionario filtra automáticamente solo opciones seguras.",
  },
  {
    id: "cancelar",
    question: "¿Puedo cancelar la membresía cuando quiera?",
    answer: "Sí. Sin permanencias mínimas. Avisas antes del día 20 del mes y pausamos o cancelamos sin costo.",
  },
];

export const MEMBERSHIP_FAQ_ITEMS: FaqItem[] = [
  { id: "pause", question: "¿Puedo pausar la membresía?", answer: "Sí. Escríbenos antes del día 20 del mes y pausamos sin costo." },
  { id: "cancel-membership", question: "¿Puedo cancelar cuando quiera?", answer: "Sí. Sin permanencias mínimas más allá del mes en curso." },
  { id: "outside", question: "¿Entregan fuera de Lima?", answer: "Por ahora solo Lima Metropolitana. Estamos evaluando expandirnos." },
  { id: "gift", question: "¿Puedo regalar la membresía?", answer: "Sí. Cada suscripción es independiente." },
];
```

- [ ] **Step 3: Update FAQ.tsx to import from shared data**

In `components/sections/FAQ.tsx`, remove the local `FAQ_ITEMS` constant and import it instead:

Replace the entire file content with:

```tsx
import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/faq-data";

export function FAQ() {
  return (
    <section id="faq" className="bg-ja-cream py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Preguntas</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark">
          Las preguntas que nos hacen siempre.
        </h2>
        <div className="mt-10">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update Membership.tsx to import from shared data**

In `components/sections/Membership.tsx`, remove the local `FAQ_ITEMS` constant (lines 43-48, the variable called `FAQ_ITEMS` containing 4 items) and import `MEMBERSHIP_FAQ_ITEMS` from the shared module instead.

Replace:
```tsx
const FAQ_ITEMS = [
  { id: "pause", question: "¿Puedo pausar la membresía?", answer: "Sí. Escríbenos antes del día 20 del mes y pausamos sin costo." },
  { id: "cancel", question: "¿Puedo cancelar cuando quiera?", answer: "Sí. Sin permanencias mínimas más allá del mes en curso." },
  { id: "outside", question: "¿Entregan fuera de Lima?", answer: "Por ahora solo Lima Metropolitana. Estamos evaluando expandirnos." },
  { id: "gift", question: "¿Puedo regalar la membresía?", answer: "Sí. Cada suscripción es independiente." },
];
```

With an import at the top:
```tsx
import { MEMBERSHIP_FAQ_ITEMS } from "@/lib/faq-data";
```

And update the reference from `FAQ_ITEMS` to `MEMBERSHIP_FAQ_ITEMS` in the `<Accordion items={...} />` usage lower in the file:

```tsx
<Accordion items={MEMBERSHIP_FAQ_ITEMS} />
```

- [ ] **Step 5: Verify TypeScript compiles and tests pass**

Run: `npx tsc --noEmit && npx vitest run`
Expected: No errors, all 20 tests pass.

- [ ] **Step 6: Commit**

```bash
git add components/seo/JsonLd.tsx lib/faq-data.ts components/sections/FAQ.tsx components/sections/Membership.tsx
git commit -m "refactor: extract FAQ data to shared module + add JsonLd component"
```

---

### Task 2: Sitemap and Robots

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Create sitemap.ts**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

const BASE = "https://www.rainforestlegacy.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/paisajismo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/corporativo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
```

- [ ] **Step 2: Create robots.ts**

Create `app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: "https://www.rainforestlegacy.org/sitemap.xml",
  };
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Verify sitemap and robots render in browser**

Start dev server and visit:
- `http://localhost:3000/sitemap.xml` — should render XML with 3 URLs
- `http://localhost:3000/robots.txt` — should render text with allow/disallow rules and sitemap reference

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: add sitemap.xml and robots.txt generation"
```

---

### Task 3: Fix metadataBase + Organization schema in layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update metadata and add Organization JSON-LD**

Replace the entire `app/layout.tsx` file with:

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/ui/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jardín Amazónico — Plantas vivas, alma amazónica",
  description:
    "Plantas vivas de colección y artesanías amazónicas en Lima. Cada compra protege a las manos que sostienen la selva.",
  metadataBase: new URL("https://www.rainforestlegacy.org"),
  openGraph: {
    title: "Jardín Amazónico",
    description:
      "Plantas vivas de colección y artesanías amazónicas en Lima.",
    siteName: "Jardín Amazónico",
    url: "https://www.rainforestlegacy.org",
    locale: "es_PE",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Jardín Amazónico — Plantas vivas, alma amazónica" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jardín Amazónico — Plantas vivas, alma amazónica",
    description:
      "Plantas vivas de colección y artesanías amazónicas en Lima.",
  },
  other: {
    "theme-color": "#1B4332",
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Jardín Amazónico",
  url: "https://www.rainforestlegacy.org",
  logo: "https://www.rainforestlegacy.org/opengraph-image",
  description:
    "Plantas vivas de colección y artesanías amazónicas en Lima. Cada compra protege a las manos que sostienen la selva.",
  foundingLocation: { "@type": "Place", name: "Lima, Perú" },
  areaServed: { "@type": "City", name: "Lima" },
  sameAs: ["https://www.instagram.com/jardin.amazonico"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://wa.me/51914401895",
    availableLanguage: "es",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={ORGANIZATION_SCHEMA} />
        <a
          href="#quiz"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ja-dark focus:text-ja-paper focus:px-4 focus:py-2 focus:rounded-full"
        >
          Saltar al cuestionario
        </a>
        <Header />
        {children}
      </body>
    </html>
  );
}
```

Key changes:
- `metadataBase` → `https://www.rainforestlegacy.org`
- Added `openGraph.siteName`, `openGraph.url`, `openGraph.images`
- Added `twitter` card metadata
- Added `theme-color` via `other`
- Added `JsonLd` component with Organization schema in `<body>`

- [ ] **Step 2: Verify TypeScript compiles and tests pass**

Run: `npx tsc --noEmit && npx vitest run`
Expected: No errors, all 20 tests pass.

- [ ] **Step 3: Verify in browser**

View page source at `http://localhost:3000/`. Check:
- `<script type="application/ld+json">` exists with Organization data
- `<meta property="og:site_name" content="Jardín Amazónico">`
- `<meta property="og:url" content="https://www.rainforestlegacy.org">`
- `<meta name="twitter:card" content="summary_large_image">`
- `<link rel="canonical" href="https://www.rainforestlegacy.org">`

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update metadataBase, add OG/Twitter cards + Organization JSON-LD"
```

---

### Task 4: Page-specific metadata + Service schemas

**Files:**
- Create: `components/seo/ServiceJsonLd.tsx`
- Create: `app/paisajismo/layout.tsx`
- Create: `app/corporativo/layout.tsx`

- [ ] **Step 1: Create ServiceJsonLd component**

Create `components/seo/ServiceJsonLd.tsx`:

```tsx
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
```

- [ ] **Step 2: Create paisajismo layout with metadata + service schema**

Create `app/paisajismo/layout.tsx`:

```tsx
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
```

- [ ] **Step 3: Create corporativo layout with metadata + service schema**

Create `app/corporativo/layout.tsx`:

```tsx
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
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 5: Verify in browser**

- Visit `http://localhost:3000/paisajismo` → view source → check for `<title>` containing "Paisajismo" and `<script type="application/ld+json">` with Service schema
- Visit `http://localhost:3000/corporativo` → view source → check for `<title>` containing "regalo corporativo" and Service schema

- [ ] **Step 6: Commit**

```bash
git add components/seo/ServiceJsonLd.tsx app/paisajismo/layout.tsx app/corporativo/layout.tsx
git commit -m "feat: add page-specific metadata + Service JSON-LD for paisajismo and corporativo"
```

---

### Task 5: Home page JSON-LD (LocalBusiness + FAQPage + PlantCatalog)

**Files:**
- Create: `components/seo/PlantCatalogJsonLd.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create PlantCatalogJsonLd component**

Create `components/seo/PlantCatalogJsonLd.tsx`:

```tsx
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
        image: plant.images[0] ? `https://www.rainforestlegacy.org${plant.images[0]}` : undefined,
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
```

- [ ] **Step 2: Add LocalBusiness, FAQPage, and PlantCatalog JSON-LD to home page**

Modify `app/page.tsx`. Add imports and render the JSON-LD components inside `<main>`:

Add these imports at the top (after existing imports):

```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { PlantCatalogJsonLd } from "@/components/seo/PlantCatalogJsonLd";
import { FAQ_ITEMS, MEMBERSHIP_FAQ_ITEMS } from "@/lib/faq-data";
```

Add these constants before the `Home` function:

```tsx
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: "Jardín Amazónico",
  url: "https://www.rainforestlegacy.org",
  description: "Plantas de colección amazónicas y artesanías de fibra de chambira en Lima.",
  address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
  areaServed: { "@type": "City", name: "Lima Metropolitana" },
  priceRange: "S/ 78 – S/ 170",
  currenciesAccepted: "PEN",
  paymentAccepted: "MercadoPago, Transferencia",
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Plantas de colección" },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...FAQ_ITEMS, ...MEMBERSHIP_FAQ_ITEMS].map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};
```

Inside the `return` block, add three JSON-LD components right after `<main>`:

```tsx
return (
    <main>
      <JsonLd data={LOCAL_BUSINESS_SCHEMA} />
      <JsonLd data={FAQ_SCHEMA} />
      <PlantCatalogJsonLd />
      <Hero />
      {/* ... rest stays the same */}
```

- [ ] **Step 3: Verify TypeScript compiles and tests pass**

Run: `npx tsc --noEmit && npx vitest run`
Expected: No errors, all 20 tests pass.

- [ ] **Step 4: Verify in browser**

View page source at `http://localhost:3000/`. Check:
- 4 `<script type="application/ld+json">` blocks exist (Organization from layout + LocalBusiness + FAQPage + ItemList from page)
- FAQPage schema has 12 questions
- ItemList has 29 products with prices
- LocalBusiness has "Florist" type

- [ ] **Step 5: Commit**

```bash
git add components/seo/PlantCatalogJsonLd.tsx app/page.tsx
git commit -m "feat: add LocalBusiness, FAQPage, and Product catalog JSON-LD to home page"
```

---

### Task 6: Final verification and push

- [ ] **Step 1: Full TypeScript and test check**

Run: `npx tsc --noEmit && npx vitest run`
Expected: No errors, all 20 tests pass.

- [ ] **Step 2: Verify all JSON-LD in browser**

Check page source for each route:
- `/` — Organization, LocalBusiness, FAQPage, ItemList (4 JSON-LD blocks)
- `/paisajismo` — Organization, Service (2 JSON-LD blocks)
- `/corporativo` — Organization, Service (2 JSON-LD blocks)

Verify sitemap and robots:
- `/sitemap.xml` — 3 URLs with correct base domain
- `/robots.txt` — allow/disallow rules with sitemap reference

- [ ] **Step 3: Push all commits**

```bash
git push
```
