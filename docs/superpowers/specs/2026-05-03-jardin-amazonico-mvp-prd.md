# Jardín Amazónico — PRD del MVP

> **Estado:** Aprobado para implementación.
> **Sprint objetivo:** 7 días.
> **Stakeholder:** Eddie Ajalcrina (eddie.ajalcrina@redesignlab.org).
> **Versión:** 1.0 — 2026-05-03.

---

## 1. Resumen ejecutivo

**Jardín Amazónico** (en adelante "JA") es una marca limeña que vende plantas vivas de colección y artesanías amazónicas, conectando cada compra con comunidades artesanas indígenas del Perú a través de un sistema de "opción Regenerativa" que incluye un *labubu amazónico* — un animalito tejido a mano en fibra de chambira por una mujer artesana de una comunidad indígena.

El MVP es una **web mobile-first de página única** (single-page con anclas de scroll) construida con Next.js + Tailwind, cuya función es:
1. Comunicar la propuesta editorial y diferenciadora de JA.
2. Permitir al visitante encontrar la planta correcta vía un quiz de 5 pasos integrado en la home, que filtra el catálogo en tiempo real.
3. Cerrar la compra de plantas a través de WhatsApp con mensajes preformateados.
4. Capturar suscripciones a la membresía con un form simple + link de pago de MercadoPago.

El objetivo del MVP es lanzar en **7 días** una web que se sienta premium (estilo editorial inspirado en el template Fjord), funcione excepcionalmente bien en mobile, y permita validar tres hipótesis comerciales antes de invertir en fases posteriores.

---

## 2. Producto, audiencia y KPIs

### 2.1 Audiencia primaria
- **Geografía:** Lima Metropolitana.
- **Edad:** 25–45 años.
- **Perfil:** limeños/as y extranjeros/as residentes en Lima, con interés en plantas, decoración interior, sostenibilidad y narrativa amazónica auténtica.
- **Comportamiento de consumo:** mayoritariamente mobile, llegan vía Instagram y referidos, valoran historia documentable, dispuestos a pagar premium si la propuesta lo justifica.

### 2.2 Propuesta de valor que la web debe transmitir
1. **Plantas con criterio botánico** — incluye especies raras y de colección difíciles de encontrar en Lima, no commodities.
2. **Cada compra impacta una comunidad real** — con artesana y región nombradas en la tarjeta del pedido.
3. **Una membresía flexible** que se adapta al momento del cliente (más plantas vs cuidar las que ya tiene).

### 2.3 KPIs del MVP (medibles manualmente en las primeras 4 semanas)

| KPI | Objetivo mes 1 | Cómo se mide |
|---|---|---|
| Conversaciones de WhatsApp generadas desde la web | ≥ 30 | Conteo manual por etiqueta "web" en mensajes preformateados recibidos. |
| Suscripciones a Membresía (cualquier plan) | ≥ 5 | Pagos confirmados en MercadoPago + leads en Google Sheet. |
| Plantas vendidas vía web | ≥ 15 | Conteo cruzado entre WhatsApp y MercadoPago. |
| Tasa de finalización del quiz | ≥ 40% | Objetivo agendado para fase 2 — requiere GA4. En MVP no medible. |

### 2.4 Hipótesis a validar con el MVP
- **H1:** El quiz integrado en la home reduce la fricción y aumenta la tasa de contacto vs un catálogo plano.
- **H2:** Presentar solo la opción Regenerativa convierte mejor que ofrecer dos tiers porque elimina la decisión "comprar barato" y refuerza la narrativa amazónica.
- **H3:** La membresía es atractiva incluso al lanzar sin onboarding completo, con un link de pago directo y un form de captura de lead.

---

## 3. Alcance del MVP

### 3.1 Dentro del alcance

**Página única (`/`) con 10 secciones:**
1. Hero
2. 3 Pilares
3. Quiz inline (5 pasos) que filtra el catálogo en tiempo real
4. Catálogo de plantas (18 plantas, grid filtrable, modal de detalle)
5. Membresía (planes Bosque y Suelo)
6. Labubu + Impacto Regenerativo (sección combinada)
7. Testimonios
8. FAQ
9. Bloque B2B reducido (Paisajismo + Corporativo, teaser único)
10. Footer

**Funcionalidades:**
- Algoritmo de scoring del quiz (función pura, testeable).
- Generador de URL WhatsApp con mensajes preformateados.
- Modal/drawer de detalle de planta.
- Modal de suscripción a membresía con captura de lead vía Google Sheets API.
- Link estático de pago MercadoPago por plan de membresía.

### 3.2 Fuera del alcance MVP (explícito)

**Páginas dedicadas** (todas pendientes para fase 2 o posterior):
- `/labubu-amazonico`
- `/paisajismo`
- `/corporativo`
- `/quiz` (queda inline en home en MVP)
- `/catalogo` (queda como sección de home en MVP)
- `/plantas/[slug]` (detalle solo en modal)
- `/legal/privacidad`, `/legal/terminos`
- `/blog`, `/artesanas`, `/nosotros`

**Funcionalidades:**
- Opción Básica de compra (solo Regenerativa en MVP).
- Carrito real / checkout integrado de MercadoPago.
- Webhooks MP de confirmación de pago.
- Email automático (Resend, SendGrid, etc.) — la confirmación de membresía es manual por WhatsApp del equipo JA.
- Sistema de cuentas / login / dashboard cliente.
- CMS (Sanity, Contentful, Strapi).
- Analytics integrado (GA4, Plausible, Mixpanel).
- i18n / bilingüe ES-EN.
- Sistema de búsqueda.
- Filtro "Disponible ahora" basado en mes/temporada.
- Reviews / comentarios.
- QR en tarjeta Regenerativa con video del artesano.
- Logo símbolo gráfico (solo wordmark Fraunces en MVP).
- Animaciones avanzadas (parallax, partículas, autoplay videos).
- Galería de fotos reales de plantas (todo es stock placeholder en MVP).
- Fotos de testimonios o de cliente.
- Mapa de comunidades artesanas.

---

## 4. Arquitectura técnica

### 4.1 Stack

| Capa | Decisión | Razón |
|---|---|---|
| Framework | Next.js 15 (App Router) + React 19 | SSR/SSG para SEO, file-based routing, Server Components reducen JS al cliente. |
| Lenguaje | TypeScript estricto | Tipos para `Plant`, `QuizAnswers`, `MembershipLead`. |
| Estilos | Tailwind CSS v4 | Velocidad de iteración, sistema de tokens, mobile-first nativo. |
| Datos del catálogo | JSON estático en `data/plants.json` | Sin DB en MVP — cambios via PR + redeploy. |
| Forms (Membresía) | Server Action de Next.js → Google Sheets API | Simple, sin backend dedicado, gratis. |
| Pagos (Membresía) | Link estático de MercadoPago (uno por plan) abierto en nueva pestaña tras submit del form | Sin SDK, sin webhooks. |
| Iconografía | Lucide Icons (line, 1.5px stroke) | Consistente, tree-shakeable, alineado con estilo Fjord. Reemplaza todos los emojis del quiz spec original. |
| Animaciones | Framer Motion (entradas suaves) + CSS transitions (hovers) | Premium feel sin overkill. |
| Hosting | Vercel | Gratis para MVP, edge runtime, preview deployments automáticos. |
| Imágenes | next/image con dominios remotos whitelisted (Unsplash/Pexels) en `next.config.js` | Optimización automática (WebP, lazy load, responsive sizes). |
| Fuentes | next/font (Google Fonts self-hosted) | Sin FOIT, sin CLS por fonts. |

### 4.2 Estructura de carpetas sugerida

```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    ← Home única
│   ├── globals.css
│   └── api/
│       └── membership-signup/
│           └── route.ts            ← Server Action / route handler
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Pillars.tsx
│   │   ├── Quiz.tsx
│   │   ├── Catalog.tsx
│   │   ├── Membership.tsx
│   │   ├── LabubuImpact.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── B2BTeaser.tsx
│   │   └── Footer.tsx
│   ├── quiz/
│   │   ├── ProgressBar.tsx
│   │   ├── QuizStep.tsx
│   │   └── OptionCard.tsx
│   ├── catalog/
│   │   ├── FilterChips.tsx
│   │   ├── PlantCard.tsx
│   │   └── PlantDetailModal.tsx
│   ├── membership/
│   │   └── MembershipFormModal.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Drawer.tsx
│       ├── Badge.tsx
│       ├── Chip.tsx
│       ├── Accordion.tsx
│       └── KenePattern.tsx         ← SVG component reutilizable
├── lib/
│   ├── scoring.ts                  ← Función pura de scoring del quiz
│   ├── whatsapp.ts                 ← Generador de URL WhatsApp
│   ├── sheets.ts                   ← Cliente Google Sheets
│   └── plants.ts                   ← Tipos + helpers del catálogo
├── data/
│   └── plants.json
├── public/
│   └── images/
│       └── plants/
│           ├── alocasia-amazonica.jpg
│           └── ... (18 archivos)
├── tests/
│   └── scoring.test.ts             ← Vitest
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 4.3 Variables de entorno

```env
NEXT_PUBLIC_WA_NUMBER=51XXXXXXXXX
NEXT_PUBLIC_MP_LINK_BOSQUE=https://link.mercadopago.com.pe/...
NEXT_PUBLIC_MP_LINK_SUELO=https://link.mercadopago.com.pe/...
GOOGLE_SHEETS_SPREADSHEET_ID=...
GOOGLE_SHEETS_CLIENT_EMAIL=...@...iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4.4 Sitemap

```
/                              Home con todas las secciones
robots.txt                     generado por Next
sitemap.xml                    generado por Next
```

Sin rutas adicionales en MVP.

---

## 5. Sistema de diseño

### 5.1 Paleta de colores (oficial)

```
--ja-dark    #1B4332   verde oscuro       — base, headers, botón primario, footer
--ja-mid     #40916C   verde medio        — acentos, hover, badges
--ja-light   #D8F3DC   verde claro        — fondos alternados, selected states
--ja-terra   #C1440E   terracota          — progreso del quiz, precios, acentos cálidos
--ja-cream   #F5F0E8   crema              — fondo general
--ja-gold    #F4A261   dorado             — badges Signature, detalles premium
--ja-sand    #E9C46A   arena              — acentos secundarios
--ja-ink     #1A1F1C   negro orgánico     — texto principal sobre fondos claros
--ja-paper   #FBF9F5   blanco cálido      — backgrounds nobles (cards, modal)
```

Se exponen como variables CSS en `globals.css` y como tokens de Tailwind en `tailwind.config.ts`.

### 5.2 Tipografía

**Titulares — `Fraunces`** (Google Fonts, variable, soft optical sizing).
- Pesos usados: 400, 500, 600.
- Uso: Hero `H1`, títulos de sección `H2`, pull quotes, nombres de planta en card.

**Texto / UI — `Inter`** (Google Fonts, variable).
- Pesos usados: 400, 500, 600, 700.
- Uso: body, labels, botones, navegación, microcopy.

**Wordmark del logo:** "Jardín Amazónico" en Fraunces 600, color `--ja-dark`. Sin símbolo gráfico en MVP.

#### Escala tipográfica base (mobile / desktop)

| Token | Mobile | Desktop | Uso |
|---|---|---|---|
| `display` | 36px / 1.05 | 64–72px / 1 | Hero H1 |
| `h2` | 28px / 1.15 | 40–48px / 1.1 | Títulos de sección |
| `h3` | 20px / 1.25 | 24px / 1.3 | Subtítulos |
| `body-lg` | 16px / 1.6 | 18px / 1.6 | Subheadlines |
| `body` | 15px / 1.6 | 16px / 1.6 | Párrafos |
| `body-sm` | 13px / 1.5 | 14px / 1.5 | Microcopy |
| `label` | 11px / 1 | 12px / 1 | Eyebrows, labels (uppercase, letter-spacing 0.08em) |

### 5.3 Iconografía

**Lucide Icons.** Estilo line, 1.5px stroke por defecto. Reemplaza los emojis del quiz spec original. Mapping a definir en `data/plants.json` campo `iconLucide` (ej: `"leaf"`, `"butterfly"`, `"gem"`, `"shield"`, `"flame"`, `"heart"`).

### 5.4 Patrones kené Shipibo (uso sutil)

Inspirados en geometrías kené Shipibo documentadas (líneas finas, simetría axial, sin colorismo "tribal" cliché).

Implementación: `<KenePattern />` componente SVG reutilizable con props `variant`, `opacity`, `color`.

Usos:
- Como divisor entre algunas secciones (strip horizontal de 24px de alto al 10% opacidad).
- Como background de la sección Labubu+Impacto (al 5% en `--ja-mid`).
- Como decoración del badge "Regenerativa" (border con micro-patrón).

### 5.5 Tono visual estilo Fjord adaptado
- Whitespace generoso: secciones con padding vertical 96–160px en desktop, 64–96px en mobile.
- Layouts asimétricos en desktop (texto alineado a izquierda, imagen a derecha, alternar). En mobile: stack vertical con jerarquía clara.
- Microinteracciones discretas: fade+rise (8px, 300ms) en entrada de secciones via Intersection Observer; hover lift sutil en cards (translateY -2px, sombra suave).
- Tipografía como protagonista: H1 hasta 64–72px en desktop, 36px en mobile.
- Sin animaciones decorativas innecesarias.

---

## 6. Estructura de la home — sección por sección

### Sección 1 — Hero

- **Headline (Fraunces, display):**
  > Traemos un pedacito de selva a tu hogar.
  > Para proteger a las manos que la sostienen.
- **Subheadline (Inter, body-lg):**
  > Plantas vivas de colección y artesanías amazónicas, conectadas con comunidades indígenas peruanas. Desde Lima.
- **Primary CTA:** botón verde oscuro `[Encuentra tu planta →]` — scroll suave hacia sección Quiz.
- **Secondary CTA:** link `[Conoce la membresía]` — scroll hacia sección Membresía.
- **Visual:** imagen full-bleed (aspecto 16:10 desktop, 4:5 mobile) de planta amazónica en interior limeño (placeholder Unsplash curado), con overlay verde oscuro al 30% (50% en mobile) para legibilidad de texto.
- **Mobile:** texto sobre imagen con overlay más fuerte y CTAs full-width apilados.

### Sección 2 — 3 Pilares

Tres cards horizontales en desktop, stack vertical en mobile. Cada una: ícono Lucide grande + título Fraunces + descripción corta (40–55 palabras).

| Pilar | Icon Lucide | Título | Texto base |
|---|---|---|---|
| 1 | `leaf` (ó `search`) | La planta correcta para tu vida | No vendemos plantas al azar. Cada especie está seleccionada por su rareza, su carácter y su historia. Y un cuestionario de cinco preguntas las conecta contigo antes de que lleguen a tu puerta. |
| 2 | `paw-print` | El labubu que viene de la selva | Cada compra incluye un labubu amazónico — un animalito tejido en fibra de chambira por artesanas de comunidades indígenas del Perú. Coleccionable, único, con nombre e historia. |
| 3 | `calendar-heart` | Una membresía que te acompaña | Elige cada mes: ¿quieres una planta nueva o prefieres cuidar las que tienes? Bosque o Suelo — la membresía se adapta al momento en que estás. |

Fondo `--ja-cream`. Sin CTAs (sección narrativa).

### Sección 3 — Quiz inline → filtra catálogo

**Comportamiento clave del quiz:**
- El quiz aparece embebido en la home, no en ruta separada.
- Estado del quiz vive en React state (no URL params en MVP).
- Mientras el usuario responde, debajo del quiz hay un placeholder: *"Responde para ver tus plantas recomendadas."*
- Al completar el paso 5, el placeholder se reemplaza con: el texto *"Tus plantas recomendadas"* + el grid del Catálogo (sección 4) **filtrado** mostrando las 3–5 plantas con mayor score.
- Aparece un botón `[Ver todas las plantas]` que limpia el filtro y muestra las 18.
- Botón `[Volver a empezar]` resetea el estado del quiz.

**UI del quiz:**
- Una pregunta visible a la vez con animación fade+rise (300ms) al avanzar.
- Barra de progreso de 5 segmentos (terracota activo, verde oscuro completado, gris pendiente). Implementada como `<ProgressBar steps={5} current={n} />`.
- Cards de opción: ícono Lucide + título + microdescripción. Selected state: borde 2px verde oscuro + tint verde claro.
- Botones `[← Atrás]` y `[Siguiente →]`. "Siguiente" desactivado hasta que haya selección. "Atrás" disponible desde paso 2.

**Preguntas, opciones y reglas:** ver sección 7 de este documento (modelo de datos del quiz).

### Sección 4 — Catálogo de plantas

- Grid responsive: 1 col mobile / 2 col tablet / 3 col desktop. Gap generoso (24px mobile, 32–40px desktop).
- 18 plantas (las del quiz spec original).
- **Filtros visibles arriba del grid (chips horizontales)**: Tipo, Tamaño, Cuidado, Pet friendly. Un solo filtro activo por categoría. Cuando el usuario completa el quiz, el grid muestra automáticamente los resultados filtrados (los chips se sustituyen por un breadcrumb-tipo "Filtrado por tu quiz · Limpiar").

#### Card de planta (mobile-first)

```
┌────────────────────────────┐
│  [Imagen 4:5 aspect ratio] │
│  [Badge tier en top-left]  │
│  [Badge "Pet friendly"     │
│   en top-right si aplica]  │
├────────────────────────────┤
│  Nombre comercial          │  ← Fraunces 18–20px
│  Nombre científico         │  ← Inter italic 13px gris
│  Desde S/ XXX              │  ← Inter 14px terracota
│  [Beneficio estrella +     │
│   ícono Lucide]            │
│  [Botón Ver opciones →]    │  ← full-width, verde oscuro
└────────────────────────────┘
```

**Badges de tier:**
- `Signature` — fondo dorado `--ja-gold`, texto `--ja-dark`.
- `Premium` — fondo verde medio `--ja-mid`, texto `--ja-paper`.
- `Básico` — fondo verde claro `--ja-light`, texto `--ja-dark`.

### Sección 4b — Modal/Drawer de planta

- **Mobile:** drawer bottom-up que ocupa 90vh, con handle visible. Animación slide-up 300ms.
- **Desktop:** modal centrado max-width 720px con backdrop al 50% opacity. Animación fade+scale.

**Contenido del modal:**

```
┌─────────────────────────────────────┐
│  [×]                                 │
│  [Imagen principal grande 4:3]       │
│                                      │
│  Nombre comercial (Fraunces 28)     │
│  Nombre científico (Inter italic)   │
│                                      │
│  Descripción larga 3–4 líneas        │
│  (tono poético, del campo            │
│   "Ficha Narrativa Poética JA"       │
│   del xlsx)                          │
│                                      │
│  ┌────────────────────────────┐    │
│  │  [Beneficio energético]    │    │  ← bloque destacado con
│  │  ícono + texto             │    │     patrón kené sutil de fondo
│  └────────────────────────────┘    │
│                                      │
│  CUIDADOS                            │  ← label uppercase
│  ☀ Luz: ...                         │
│  💧 Riego: ...                       │
│  🌫 Humedad: ...                     │
│                                      │
│  [⚠ Banner amarillo si !petSafe:    │
│   "No apta para mascotas"]           │
│                                      │
│  [⚠ Banner crema si hay              │
│   advertencia estacional Lima]       │
│                                      │
│  ─── Patrón kené divider ───        │
│                                      │
│  REGENERATIVA                        │
│  Incluye:                            │
│  • Planta [nombre]                   │
│  • Maceta [Tierra/Piedra/Selva]      │
│  • Labubu [animal] en chambira       │
│  • Tarjeta dedicatoria personalizada │
│                                      │
│  Tejido por [Artesana],              │
│  comunidad [Comunidad], [Región]     │
│                                      │
│  Desde S/ XXX–YYY                    │
│                                      │
│  [Botón verde oscuro full-width]    │
│  [Quiero esta →]                    │
└─────────────────────────────────────┘
```

Los íconos `☀ 💧 🌫` son **íconos Lucide** (`sun`, `droplet`, `cloud`), no emojis (mostrados aquí como abreviatura visual).

### Sección 5 — Membresía

- **Headline (Fraunces):** *Una membresía que respira contigo.*
- **Sub:** *El mundo de las plantas tiene temporadas. Nosotros también.*
- 2 cards lado a lado en desktop, stack vertical en mobile:

#### Card "Bosque"

- **Eyebrow / badge:** "Bosque" (texto, sin ícono superpuesto al badge).
- **Headline:** *Para cuando quieres que tu selva crezca.*
- **Lista de incluye:**
  - Una planta seleccionada del mes por nuestro equipo de curaduría.
  - Una maceta de la colección (Tierra, Piedra o Selva).
  - Un labubu amazónico — el animal del mes, en fibra de chambira.
- **Precio:** **Desde S/ 170 / mes** *(incluye delivery en Lima).*
- **CTA:** botón verde oscuro `[Suscribirme]` que abre el modal de membresía con plan = "Bosque".

#### Card "Suelo"

- **Eyebrow / badge:** "Suelo".
- **Headline:** *Para cuando ya tienes tu selva y quieres que prospere.*
- **Lista de incluye:**
  - 500g de sustrato especializado (interior, suculentas o tropical — tú eliges).
  - Kit mensual anti-plagas: producto preventivo o correctivo según temporada.
  - 3 macetas pequeñas para propagar esquejes.
- **Precio:** **Desde S/ 55 / mes** *(incluye delivery en Lima).*
- **CTA:** botón verde oscuro `[Suscribirme]` que abre el modal con plan = "Suelo".

#### Banner inferior — Garantía del esqueje

> Si tu planta muere, te enviamos un esqueje de reposición. Activable a partir del tercer mes de membresía continua.

Implementado como banner full-width con ícono `shield-check` Lucide, fondo `--ja-light`.

#### FAQ mínimas de membresía (collapse)

1. ¿Puedo pausar la membresía?
2. ¿Puedo cancelar cuando quiera?
3. ¿Entregan fuera de Lima?
4. ¿Puedo regalar la membresía?

Textos breves del archivo de contenido editorial original.

### Sección 6 — Labubu + Impacto Regenerativo (combinada)

Sección con fondo `--ja-cream` y patrón kené sutil al 5% como background.

- **Headline (Fraunces):** *Cada compra siembra algo más que una planta.*
- **Subheadline:** *El modelo regenerativo de Jardín Amazónico conecta tu hogar limeño con comunidades de mujeres artesanas en la selva peruana.*
- **Párrafo introductorio (3–4 líneas)** sobre el modelo regenerativo y la chambira.
- **Grid mini de 6 labubus** (subset de los 18). Cada item: ilustración/foto pequeña + nombre del animal + comunidad.
  - Sugeridos: Rana Venenosa, Guacamayo Rojo, Mono Choro, Mariposa Morpho, Jaguar Negro, Cóndor.
- **Bloque de cifras de impacto** (4 tarjetas con número grande + label):
  - 8 comunidades aliadas
  - +40 artesanas en la red
  - 18 animales en la colección
  - 15% del precio Regenerativa va directo a la artesana
- **Pull quote** (Fraunces, italic, ~26px):
  > *"Cuando tejo el mono, pienso en mis hijos y en el río. Que alguien en Lima lo tenga en su casa me hace sentir que el bosque llega lejos."*
  > **Rosa Cumapa**, artesana Shipibo-Conibo, Ucayali.
- **CTA secundario:** `[Conoce más →]` — scroll-anchor al FAQ en MVP. En fase 2 lleva a `/labubu-amazonico`.

### Sección 7 — Testimonios

3 cards de testimonio en grid en desktop, carrusel/scroll horizontal con snap en mobile.

**Sin fotos.** Cada card tiene solo:
- Texto del testimonio (Fraunces italic, ~18px).
- Nombre del cliente.
- Distrito de Lima.
- Planta o plan que tiene.

Textos base del archivo de contenido editorial (Valeria C. — Miraflores, Marco A. — La Molina, Gabriela P. — San Isidro).

### Sección 8 — FAQ

- **Headline (Fraunces):** *Las preguntas que nos hacen siempre.*
- **Formato:** acordeón vertical (collapse), una pregunta por fila. Mobile-first. Animación de altura suave al expandir.

#### Las 8 preguntas obligatorias del MVP

1. **¿De dónde vienen las plantas?**
   Trabajamos con viveros especializados que cultivan bajo prácticas responsables. Ninguna planta es extraída de manera silvestre del bosque. Cada especie de origen amazónico (como el Filodendro Gloriosum o el Anturio Cristalino) proviene de propagación en vivero, no de extracción del bosque.

2. **¿Trabajan con especies protegidas o en peligro?**
   No. Nuestro catálogo está compuesto solo por especies cultivadas y comercializadas legalmente. Las plantas de origen amazónico provienen de propagación en vivero, no de extracción del bosque.

3. **¿Cómo se garantiza el origen responsable de la chambira?**
   La fibra de chambira (*Astrocaryum chambira*) se extrae sin tala — solo se cosechan las hojas tiernas. Una palma puede producir fibra por más de 30 años. Trabajamos directamente con artesanas de comunidades que practican esta técnica ancestral.

4. **¿Cuánto recibe la artesana de cada labubu?**
   Un porcentaje significativo del precio Regenerativa (objetivo 15%) va directamente a la artesana, sin intermediarios. Las artesanas fijan el precio de su trabajo; nosotros lo aceptamos.

5. **¿Hacen envíos fuera de Lima?**
   Por ahora solo Lima Metropolitana. Estamos evaluando expandirnos.

6. **¿Qué pasa si mi planta se enferma o muere?**
   Si eres miembro activo de Bosque o Suelo con 3 o más meses de suscripción continua, te enviamos un esqueje de reposición sin costo (Garantía del Esqueje). Para compras puntuales fuera de membresía, ofrecemos asesoría de cuidado pero no reposición.

7. **¿Las plantas son seguras para mis mascotas?**
   Algunas sí, otras no. Cada ficha de planta lo indica claramente con un badge "Pet friendly". Si tienes mascotas, el quiz filtra automáticamente solo opciones seguras.

8. **¿Puedo cancelar la membresía cuando quiera?**
   Sí. Sin permanencias mínimas. Avisas antes del día 20 del mes y pausamos o cancelamos sin costo.

### Sección 9 — Bloque B2B reducido

Una sola sección split en 2 cards lado a lado (mobile: stack):

**Card Paisajismo:**
- Headline corto: *¿Tienes un espacio que necesita verde de verdad?*
- Texto 1 línea: *Diseñamos e instalamos vegetación interior y exterior para oficinas, lobbies y eventos en Lima.*
- CTA: `[Hablar por WhatsApp →]` con mensaje preformateado específico.

**Card Corporativo:**
- Headline corto: *¿Tu empresa busca regalos con propósito?*
- Texto 1 línea: *Plantas trofeo y merchandising de impacto con labubus amazónicos para tu marca.*
- CTA: `[Hablar por WhatsApp →]` con mensaje preformateado específico.

**Nota inferior:** *Próximamente: páginas dedicadas con casos y portafolio.*

### Sección 10 — Footer

- Logo wordmark "Jardín Amazónico" + tagline *Plantas vivas. Alma amazónica.*
- 3 columnas en desktop, stack en mobile:
  - **Explora:** anchors a Quiz, Catálogo, Membresía, Labubu, FAQ.
  - **Contacto:** WhatsApp clickeable (abre WhatsApp sin texto preformateado), Instagram `@jardinamazonico`.
  - **Sostenibilidad:** 1 párrafo corto reafirmando origen responsable + link al FAQ.
- Línea inferior: *© 2026 Jardín Amazónico. Lima, Perú.*

---

## 7. Modelo de datos

### 7.1 Tipo `Plant`

```typescript
type Tier = "S" | "P" | "B"; // Signature, Premium, Básico
type PlantType = "exotic" | "indoor" | "outdoor" | "air";
type PlantSize = "small" | "medium" | "large";
type CareLevel = "none" | "amateur" | "collector";
type PotName = "Tierra" | "Piedra" | "Selva";

interface PlantBenefit {
  iconLucide: string;     // ej: "sparkles", "shield", "heart-pulse"
  text: string;
}

interface PlantCare {
  light: string;
  water: string;
  humidity: string;
}

interface PlantLabubu {
  animal: string;
  artisan: string;
  community: string;
  region: string;
}

interface PlantRegenerative {
  priceRange: string;     // ej: "S/ 185–255"
  pot: PotName;
  includes: string[];
  labubu: PlantLabubu;
}

interface Plant {
  id: string;             // ej: "JA-S001"
  name: string;
  scientificName: string;
  tier: Tier;
  iconLucide: string;     // reemplaza el emoji del quiz spec
  imageUrl: string;       // /images/plants/[slug].jpg
  imageAlt: string;
  tags: {
    type: PlantType[];
    size: PlantSize[];
    care: CareLevel[];
  };
  petSafe: boolean;
  suitableFor: {
    gift: boolean;
    space: boolean;
    me: boolean;
  };
  description: string;        // corta, 1–2 frases
  longDescription: string;    // narrativa poética, modal
  benefit: PlantBenefit;
  care: PlantCare;
  seasonalWarningLima: string | null;  // ej: del campo "Advertencia Estacional Lima" del xlsx
  regenerative: PlantRegenerative;
}
```

### 7.2 Estructura de las preguntas del quiz

Las 5 preguntas, opciones y reglas se mantienen exactamente como están en el archivo `Referencias/jardin_amazonico_quiz_spec.md` (sección 3). Cambios para MVP:
- Los `icon` de cada opción dejan de ser emojis y pasan a ser nombres de íconos Lucide (ej: `🌿` → `"leaf"`, `🎁` → `"gift"`, `🏠` → `"home"`).
- Resto idéntico.

### 7.3 Algoritmo de scoring

Función pura `lib/scoring.ts` con la firma:

```typescript
function calculateScore(plant: Plant, answers: QuizAnswers): number;
function getRecommendations(plants: Plant[], answers: QuizAnswers): Plant[];
```

Reglas (idénticas al quiz spec original, sección 5):

| Condición | Ajuste |
|---|---|
| `answers.type === "exotic" && plant.tags.type.includes("exotic")` | +3 |
| `answers.type === "indoor" && plant.tags.type.includes("indoor")` | +2 |
| `answers.type === "outdoor" && plant.tags.type.includes("outdoor")` | +2 |
| `answers.type === "air" && plant.tags.type.includes("air")` | +4 |
| `answers.type === "exotic" && plant.tier === "S"` | +1 |
| `plant.tags.size.includes(answers.size)` | +2 |
| `plant.tags.care.includes(answers.care)` | +2 |
| `answers.care === "none" && plant.tags.care.includes("none")` | +1 (bonus) |
| `answers.pets === "yes" && !plant.petSafe` | -10 (filtro duro) |
| `answers.purpose === "gift" && plant.suitableFor.gift` | +1 |
| `answers.purpose === "space" && plant.suitableFor.space` | +1 |
| `answers.purpose === "me" && plant.suitableFor.me` | +1 |

`getRecommendations`:
- Filtrar score > 0.
- Ordenar desc por score.
- Tomar `min(5, length)` resultados (siempre entre 3 y 5; mínimo 3).
- Fallback: si <3 resultados con score > 0, devolver las 3 plantas tier "B" con mejor compatibilidad de cuidado.

### 7.4 Tipo `MembershipLead`

```typescript
type MembershipPlan = "Bosque" | "Suelo";

interface MembershipLead {
  timestamp: string;          // ISO 8601
  fullName: string;
  email: string;
  district: string;           // distrito Lima libre
  plan: MembershipPlan;
  message?: string;           // opcional, máx 200 chars
  source: "web";
}
```

Se persiste como una fila en la hoja "Leads" del Google Sheet configurado.

---

## 8. Flujos de conversión y mensajes WhatsApp

### 8.1 Flujo 1 — Compra de planta

```
Usuario lee Hero
  → completa quiz (o explora catálogo directamente)
  → ve plantas recomendadas debajo del quiz
  → clic en card de planta → modal/drawer
  → clic en [Quiero esta →]
  → abre WhatsApp con mensaje preformateado
```

**Mensaje preformateado WhatsApp (única opción Regenerativa):**

```
Hola 🌿 Vengo de la web de Jardín Amazónico.

Me interesa la opción REGENERATIVA de:
*[Nombre de la planta]* (_[Nombre científico]_)

Incluye:
- Planta [nombre]
- Maceta [Tierra/Piedra/Selva]
- Labubu [Animal] tejido en chambira por [Artesana], comunidad [Comunidad] ([Región])
- Tarjeta dedicatoria personalizada

Precio: [Rango regenerativa]

¿Tienen disponibilidad?
```

URL: `https://wa.me/${NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent(message)}`.

### 8.2 Flujo 2 — Suscripción a membresía

```
Usuario llega a sección Membresía
  → clic en [Suscribirme] del plan elegido (Bosque o Suelo)
  → modal con form (Nombre, Email, Distrito Lima, Plan preseleccionado, Mensaje opcional)
  → submit → Server Action escribe fila en Google Sheet
  → modal de confirmación con mensaje:
     "¡Listo! Te contactaremos por WhatsApp para confirmar tu primer envío.
      Mientras tanto, completa tu pago aquí:"
  → botón [Pagar con MercadoPago →] (link estático del plan, abre nueva pestaña)
  → equipo JA ve el lead en el Sheet + el pago en MP, contacta por WhatsApp para coordinar primer envío
```

**Sin email automático en MVP.** La confirmación al cliente es manual por WhatsApp del equipo JA.

### 8.3 Flujo 3 — B2B (Paisajismo / Corporativo)

Cada card abre WhatsApp con un mensaje preformateado específico:

**Paisajismo:**
```
Hola, vengo de la web de Jardín Amazónico.
Me interesa una propuesta de paisajismo / vegetación para [tipo de espacio].
¿Pueden ayudarme con una cotización?
```

**Corporativo:**
```
Hola, vengo de la web de Jardín Amazónico.
Me interesa una propuesta corporativa: [plantas trofeo / merchandising / ambos].
Contexto: [breve].
¿Pueden ayudarme?
```

### 8.4 Flujo 4 — Consulta general (footer)

WhatsApp del footer abre la conversación sin mensaje preformateado.

---

## 9. Mobile-first y performance

### 9.1 Breakpoints Tailwind

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

Todos los componentes se diseñan **primero a 375px** (iPhone SE / 13 mini) y se escalan hacia arriba.

### 9.2 Tap targets

- Mínimo 44×44px en cualquier elemento interactivo en mobile (botones, cards de opción del quiz, chips de filtro, links del footer).
- Espaciado vertical entre tap targets ≥ 8px.

### 9.3 Performance (objetivos Lighthouse mobile)

| Métrica | Objetivo |
|---|---|
| Performance | ≥ 85 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

### 9.4 Tácticas

- Hero image con `priority` en next/image. Resto con `loading="lazy"` y `placeholder="blur"`.
- `sizes` correctamente definidos en cada `<Image>` para que el navegador descargue la resolución correcta por viewport.
- Server Components por defecto; `"use client"` solo en componentes con estado/interactividad (Quiz, Modal, FilterChips, MembershipFormModal, Accordion).
- Framer Motion solo en secciones con animación; lazy imports donde sea posible.
- No autoplay de videos. No carruseles con autoplay.
- Fuentes con `display=swap` (gestionado por next/font).

### 9.5 Accesibilidad

- WCAG AA mínimo en contrastes.
- Todo el quiz navegable con teclado (Tab + Enter/Space). Cards de opción como `<button>`, no `<div>` clickeable.
- Barra de progreso con `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `role="progressbar"`.
- Modales con `aria-modal="true"`, focus trap, esc cierra.
- Aria-live polite en sección de resultados del quiz (anuncia cuántas plantas se encontraron).
- Alt text en todas las imágenes de plantas (campo `imageAlt` en `Plant`).

---

## 10. Cronograma de 7 días

| Día | Foco | Entregables |
|---|---|---|
| 1 — Cimientos | Setup técnico + design system | Next.js 15 + Tailwind v4 + TS inicializados. Tokens de color y tipografía configurados. Componentes base creados (`Button`, `Card`, `Modal`, `Drawer`, `Badge`, `Chip`, `Accordion`). Lucide instalado. Patrón kené SVG diseñado e integrado como componente reutilizable. Cuenta Vercel + dominio conectado. |
| 2 — Datos + Hero + Pilares | Curaduría de imágenes + secciones narrativas | `data/plants.json` consolidado (18 plantas con campos quiz spec + temporada Lima del xlsx). 18 imágenes stock curadas en `public/images/plants/`. Hero implementado con imagen, headline, CTAs y scroll suave. Sección 3 Pilares completa. Footer básico con wordmark. |
| 3 — Quiz + scoring + Catálogo | Lógica core | `lib/scoring.ts` con función pura + tests Vitest cubriendo las 5 reglas. UI del quiz inline (5 pasos, barra de progreso, animaciones, navegación). Grid del catálogo con filtros (chips). Wiring quiz → catálogo. |
| 4 — Modal de planta + WhatsApp | Cierre del flujo de compra | `<PlantDetailModal>` con drawer mobile / modal desktop. Detalles de cuidado, advertencias, bloque Regenerativa con artesana, precio. Generador de URL WhatsApp con mensaje preformateado URL-encoded. Test manual del deeplink en mobile real. |
| 5 — Membresía completa | Captura de leads + pago MP | Sección Membresía con 2 cards (Bosque S/170 / Suelo S/55). Modal con form. Server Action que usa Google Sheets API con Service Account. GCP Project + Service Account configurados + Sheet creado y compartido. Variables de entorno en Vercel. Modal de confirmación con texto de confirmación por WhatsApp + botón Pagar con MercadoPago. 4 FAQ mínimas de membresía en collapse. |
| 6 — Resto de secciones | Narrativa diferenciadora | Sección 6 Labubu+Impacto combinada (headline, mini grid de 6 labubus, 4 cifras, pull quote, fondo con patrón kené). Sección 7 Testimonios sin fotos. Sección 8 FAQ con 8 preguntas en accordion. Sección 9 B2B reducido. Footer completo. |
| 7 — Pulido, QA y go-live | Calidad final + deploy | Audit Lighthouse mobile. Pase de accesibilidad: navegación por teclado, aria-labels, contrastes, tap targets ≥ 44px. Cross-browser test en iOS Safari y Chrome Android (devices reales). Revisión final de copy. Deploy productivo. |

---

## 11. Dependencias externas

| Dependencia | Cuándo | Acción |
|---|---|---|
| Cuenta MercadoPago | Antes del día 5 | Crear 2 links de pago con suscripción recurrente: uno para Bosque (S/170/mes) y uno para Suelo (S/55/mes). Compartir las URLs. |
| Google Cloud Project + Service Account | Antes del día 5 | Crear proyecto en GCP, habilitar Google Sheets API, crear service account, descargar JSON de credenciales, crear Sheet "JA Membership Leads", compartir Sheet con el email del SA con permiso de editor. |
| Número de WhatsApp final | Día 1 | Confirmar el número formato `51XXXXXXXXX` que va en `NEXT_PUBLIC_WA_NUMBER`. |
| Dominio apuntado a Vercel | Día 1–2 | Configurar DNS del dominio para apuntar a Vercel. |
| Curaduría de imágenes (revisión) | Día 2 | Mostrar las 18 imágenes seleccionadas y aprobarlas/cambiarlas antes de seguir. |
| Aprobación de copy final por sección | Diario | Revisión rápida del contenido visible en cada deploy preview. |

---

## 12. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Curaduría de 18 imágenes stock toma más de lo planeado | Media | Medio | Hacer en bloque el día 2, no entremezclado con código. Aceptar imperfección controlada (18 coherentes, no 18 perfectas). |
| Setup Google Sheets API con Service Account | Media | Alto | Hacer setup como side task el día 1 mientras el setup de Next.js compila. Fallback: capturar lead en log y proceso manual. |
| Diseño del patrón kené auténtico vs genérico | Media | Bajo–Medio | Usar 1 patrón base de ~30 líneas SVG inspirado en geometrías kené documentadas. No diseñar 3 variantes. |
| Performance mobile con 18 imágenes | Baja | Alto | next/image obligatorio en todas, `loading="lazy"`, `sizes` correctos, blur placeholder. Hero usa `priority`. |
| Cross-browser bugs en iOS Safari (modal/drawer) | Media | Medio | Probar en Safari real día 4 y día 7, no solo Chrome DevTools. |
| WhatsApp deeplink en mobile abre app pero no rellena texto | Baja | Alto | Test temprano día 4. URL-encoding correcto del mensaje completo. Fallback `https://api.whatsapp.com/send` si `wa.me` falla. |
| El cliente cambia copy o estructura mid-sprint | Media | Alto | Cada cambio post-aprobación se evalúa: <30min entra; más, va a fase 2. PRD aprobado es el contrato. |
| Headline / nombres de plan no convierten en datos reales | Alta | Bajo (en MVP) | Sprint 2 (semana 2) revisamos con primeros leads y hacemos micro-ajustes. MVP no busca optimización, busca lanzar y aprender. |

---

## 13. Después del lanzamiento — primer sprint de fase 2 sugerido (semana 2–3)

Como anexo al PRD, **no compromiso**:

1. GA4 + tracking de eventos para entender qué se hace clic, dónde se abandona el quiz.
2. Sustitución progresiva de fotos stock por fotografía propia, empezando por Hero y top 5 plantas más pedidas.
3. Página dedicada `/labubu-amazonico` extendiendo la sección 6 a página completa con perfil de cada artesana.
4. Email automático de confirmación de membresía (Resend + template básico).
5. Páginas legales mínimas (privacidad + términos).

---

## 14. Anexo — Configuración de Google Sheets API

Pasos resumidos:

1. Ir a [console.cloud.google.com](https://console.cloud.google.com), crear nuevo proyecto "Jardin Amazonico Web".
2. Habilitar "Google Sheets API" en la biblioteca de APIs.
3. Crear Service Account: IAM & Admin → Service Accounts → Create. Nombre: `ja-membership-writer`.
4. Generar key JSON: en el SA, Keys → Add key → Create new key → JSON. Descargar.
5. Crear Sheet "JA Membership Leads" en Google Drive. Primera fila como headers: `timestamp | fullName | email | district | plan | message | source`.
6. Compartir el Sheet con el email del SA (formato `ja-membership-writer@<project>.iam.gserviceaccount.com`) con permiso de Editor.
7. Configurar en Vercel las env vars del bloque 4.3 usando los valores del JSON descargado.

---

## 15. Anexo — Mapping emoji → Lucide para íconos del quiz

| Quiz spec original (emoji) | Lucide (MVP) | Uso |
|---|---|---|
| 🌿 | `leaf` | Para mí; tipo "indoor" general |
| 🎁 | `gift` | Para regalar |
| 🏠 | `home` | Para mi espacio |
| 🦋 | `butterfly` (o `sparkles` si no existe) | Exótica |
| 🪴 | `flower-2` | Interior |
| ☀️ | `sun` | Exterior |
| 💨 | `wind` | Planta de aire |
| 🌱 | `sprout` | Pequeña |
| 🌳 | `tree-pine` (o `tree-deciduous`) | Grande |
| ⏱ | `clock` | Casi ningún cuidado |
| 🌸 | `flower` | Un poco de cuidado |
| 🔬 | `microscope` | Entusiasta / coleccionista |
| 🐾 | `paw-print` | Tengo mascotas |

Mapping correspondiente para los íconos de beneficio de cada planta se documenta en `data/plants.json`.

---

## 16. Cierre

Este PRD es el contrato de implementación del MVP de Jardín Amazónico para el sprint de 7 días. Cualquier desviación se documenta como nota en este archivo (sección 17 — Bitácora de cambios). El PRD se versiona junto al código.

### 17. Bitácora de cambios

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-05-03 | Versión inicial 1.0 aprobada | Eddie + Claude |

---

*Documento elaborado para Jardín Amazónico — Versión 1.0 — 2026-05-03.*
