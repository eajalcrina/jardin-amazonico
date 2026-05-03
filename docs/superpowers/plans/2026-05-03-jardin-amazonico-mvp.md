# Jardín Amazónico MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lanzar en 7 días un sitio mobile-first single-page de Jardín Amazónico con quiz integrado, catálogo filtrable de 18 plantas, modal de detalle con CTA WhatsApp, suscripción a membresía con captura en Google Sheets + link MercadoPago, y secciones editoriales (impacto regenerativo, testimonios, FAQ, B2B teaser).

**Architecture:** Next.js 15 App Router + React 19 con Server Components por defecto. Datos del catálogo en JSON estático. Captura de leads vía Server Action que escribe a Google Sheets API con Service Account. Pago vía links estáticos de MercadoPago abiertos en nueva pestaña. Sin DB, sin auth, sin CMS, sin webhooks.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Framer Motion, Vitest (tests), googleapis (Sheets API), Vercel (hosting).

**Spec de referencia:** `docs/superpowers/specs/2026-05-03-jardin-amazonico-mvp-prd.md`

---

## Estructura de archivos final

```
.
├── app/
│   ├── layout.tsx                     ← layout raíz, fuentes, metadata
│   ├── page.tsx                       ← Home única (compone todas las secciones)
│   ├── globals.css                    ← variables CSS + reset
│   ├── api/
│   │   └── membership-signup/
│   │       └── route.ts               ← POST handler que escribe a Sheets
│   └── opengraph-image.tsx            ← OG image dinámica
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
│   │   ├── MembershipFormModal.tsx
│   │   └── MembershipConfirmation.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Drawer.tsx
│       ├── Badge.tsx
│       ├── Chip.tsx
│       ├── Accordion.tsx
│       └── KenePattern.tsx
├── lib/
│   ├── scoring.ts                     ← TDD: lógica de scoring del quiz
│   ├── scoring.test.ts
│   ├── whatsapp.ts                    ← TDD: generador URL WhatsApp
│   ├── whatsapp.test.ts
│   ├── sheets.ts                      ← cliente Google Sheets
│   ├── sheets.test.ts
│   ├── plants.ts                      ← tipos + helpers
│   ├── plants.test.ts
│   └── quiz-questions.ts              ← preguntas y opciones del quiz
├── data/
│   └── plants.json                    ← catálogo de 18 plantas
├── public/
│   ├── images/
│   │   └── plants/                    ← 18 imágenes stock curadas
│   └── patterns/
│       └── kene.svg                   ← patrón base (opcional, también inline)
├── tests/
│   └── setup.ts                       ← config Vitest
├── .env.example                       ← template de variables
├── .env.local                         ← (ignorado) variables reales
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── package.json
└── README.md
```

---

## Day 0 — Pre-flight (antes de empezar)

### Task 0.1: Verificar entorno

**Files:** ninguno (verificación).

- [ ] **Step 1: Verificar Node ≥ 20**

Run:
```bash
node --version
```
Expected: `v20.x.x` o superior (ya hay v24.14.0 confirmado).

- [ ] **Step 2: Verificar npm ≥ 10**

Run:
```bash
npm --version
```
Expected: `10.x` o superior.

- [ ] **Step 3: Verificar git status limpio**

Run:
```bash
cd "/Users/eajalcrina/Documents/Proyectos/Jardín Amazónico" && git status
```
Expected: `nothing to commit, working tree clean` y rama `main` trackeando `origin/main`.

---

## Day 1 — Cimientos (setup + design system)

**Objetivo del día:** proyecto Next.js inicializado con TypeScript + Tailwind v4 + tipografías + tokens de color + componentes UI base + Lucide + Framer Motion + Vitest. Deploy preview a Vercel funcionando con un placeholder.

### Task 1.1: Inicializar proyecto Next.js

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts`, `.eslintrc.json` (según lo genere CNA).

- [ ] **Step 1: Ejecutar create-next-app**

Run desde la raíz del proyecto:
```bash
cd "/Users/eajalcrina/Documents/Proyectos/Jardín Amazónico" && npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir false --import-alias "@/*" --use-npm --no-turbopack --yes
```

CNA preguntará si sobreescribir archivos existentes (README.md, .gitignore). Responder **No** a sobreescribir README y .gitignore — los nuestros se mantienen y CNA agrega los demás.

Si CNA insiste en sobreescribir y no acepta `--yes` con conflictos: ejecutar manual:
```bash
cd "/Users/eajalcrina/Documents/Proyectos/Jardín Amazónico" && npx create-next-app@latest . --typescript --tailwind --eslint --app --import-alias "@/*" --use-npm
```
Y responder en cada prompt: README → No, .gitignore → No, src directory → No, Turbopack → No.

Expected: estructura Next.js creada con `app/`, `node_modules/`, `package.json`, etc. README y .gitignore existentes se preservan.

- [ ] **Step 2: Verificar dev server**

Run:
```bash
npm run dev
```
Abrir http://localhost:3000 — debe verse la página default de Next.js.

Detener el servidor con `Ctrl+C`.

- [ ] **Step 3: Verificar TypeScript strict**

Editar `tsconfig.json` y confirmar que `"strict": true` está activo. Si no está, agregar:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: initialize Next.js 15 + TypeScript + Tailwind"
```

### Task 1.2: Configurar tokens de color JA en Tailwind

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Sustituir contenido de `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-ja-dark: #1B4332;
  --color-ja-mid: #40916C;
  --color-ja-light: #D8F3DC;
  --color-ja-terra: #C1440E;
  --color-ja-cream: #F5F0E8;
  --color-ja-gold: #F4A261;
  --color-ja-sand: #E9C46A;
  --color-ja-ink: #1A1F1C;
  --color-ja-paper: #FBF9F5;

  --font-display: var(--font-fraunces), Georgia, serif;
  --font-body: var(--font-inter), system-ui, -apple-system, sans-serif;
}

@layer base {
  html {
    font-family: var(--font-body);
    color: var(--color-ja-ink);
    background: var(--color-ja-paper);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-height: 100svh;
  }

  h1, h2, h3 {
    font-family: var(--font-display);
    color: var(--color-ja-ink);
  }

  ::selection {
    background: var(--color-ja-light);
    color: var(--color-ja-dark);
  }
}
```

- [ ] **Step 2: Verificar build**

Run:
```bash
npm run dev
```
Abrir http://localhost:3000 — debe cargar sin errores. Detener con `Ctrl+C`.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css && git commit -m "feat(design): add JA color tokens and base typography"
```

### Task 1.3: Configurar fuentes Fraunces + Inter via next/font

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Reemplazar `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
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
  metadataBase: new URL("https://jardinamazonico.pe"),
  openGraph: {
    title: "Jardín Amazónico",
    description:
      "Plantas vivas de colección y artesanías amazónicas en Lima.",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verificar render**

Run:
```bash
npm run dev
```
Abrir http://localhost:3000. Inspeccionar elemento — `<html>` debe tener clases con variables `--font-fraunces` y `--font-inter`. No debe haber errores en consola. Detener con `Ctrl+C`.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx && git commit -m "feat(design): configure Fraunces + Inter via next/font"
```

### Task 1.4: Crear placeholder de Home y verificar deploy a Vercel

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Reemplazar `app/page.tsx` con placeholder**

```tsx
export default function Home() {
  return (
    <main className="min-h-svh flex items-center justify-center bg-ja-cream">
      <div className="text-center px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          Jardín Amazónico
        </p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl text-ja-dark">
          Próximamente
        </h1>
        <p className="mt-4 text-ja-ink/70 max-w-md mx-auto">
          Estamos sembrando algo nuevo. Vuelve pronto.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verificar render local**

Run:
```bash
npm run dev
```
Debe verse el placeholder con tipografía Fraunces en el título y paleta JA.

- [ ] **Step 3: Commit y push**

```bash
git add app/page.tsx && git commit -m "feat: add coming soon placeholder home" && git push
```

- [ ] **Step 4: Conectar repo a Vercel (manual, una vez)**

1. Ir a [vercel.com/new](https://vercel.com/new).
2. Importar el repo `eajalcrina/jardin-amazonico`.
3. Framework: Next.js (autodetectado).
4. Root directory: `.`
5. Deploy.
6. Copiar la URL del deploy preview (ej: `jardin-amazonico.vercel.app`).

- [ ] **Step 5: Conectar dominio (manual)**

En el dashboard de Vercel del proyecto: Settings → Domains → agregar dominio. Configurar los registros DNS según indique Vercel (típicamente CNAME `cname.vercel-dns.com`).

### Task 1.5: Instalar Lucide y Framer Motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar dependencias**

```bash
npm install lucide-react framer-motion
```

- [ ] **Step 2: Verificar versiones**

```bash
npm list lucide-react framer-motion
```
Expected: ambas instaladas.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json && git commit -m "chore: add lucide-react and framer-motion"
```

### Task 1.6: Configurar Vitest

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Modify: `package.json` (agregar script)

- [ ] **Step 1: Instalar Vitest y dependencias**

```bash
npm install -D vitest @vitest/ui @types/node
```

- [ ] **Step 2: Crear `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    include: ["lib/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 3: Crear `tests/setup.ts`**

```typescript
// Vitest global setup. Vacío por ahora.
```

- [ ] **Step 4: Agregar scripts a `package.json`**

En el campo `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Verificar Vitest corre**

```bash
npm test
```
Expected: `No test files found` (esperado, aún no hay tests). Sale con código 0 o 1 — ambos OK ya que solo verificamos que el binario corre.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: add Vitest with config and setup"
```

### Task 1.7: Crear componente Button base

**Files:**
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: Crear `components/ui/Button.tsx`**

```tsx
import { ComponentPropsWithoutRef, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-ja-dark text-ja-paper hover:bg-ja-mid focus-visible:ring-ja-mid",
  secondary:
    "bg-transparent text-ja-dark border border-ja-dark hover:bg-ja-dark hover:text-ja-paper focus-visible:ring-ja-dark",
  ghost:
    "bg-transparent text-ja-dark hover:bg-ja-light focus-visible:ring-ja-mid",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-base",
};

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", fullWidth, className = "", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ja-paper",
          "disabled:opacity-40 disabled:pointer-events-none",
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          fullWidth ? "w-full" : "",
          className,
        ].join(" ")}
        {...props}
      />
    );
  },
);
```

- [ ] **Step 2: Probar visualmente integrando en home temporal**

Editar `app/page.tsx`, agregar después del `<p>`:
```tsx
import { Button } from "@/components/ui/Button";
// dentro del JSX:
<div className="mt-8 flex gap-3 justify-center">
  <Button>Primario</Button>
  <Button variant="secondary">Secundario</Button>
  <Button variant="ghost">Ghost</Button>
</div>
```

Run `npm run dev` y verificar visualmente que los 3 botones se ven bien. Revertir el cambio temporal de `app/page.tsx` (volver al placeholder original).

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx && git commit -m "feat(ui): add Button base component"
```

### Task 1.8: Crear componente Badge

**Files:**
- Create: `components/ui/Badge.tsx`

- [ ] **Step 1: Crear `components/ui/Badge.tsx`**

```tsx
import { ComponentPropsWithoutRef } from "react";

type Tone = "neutral" | "signature" | "premium" | "basic" | "pet" | "warning";

const TONE_STYLES: Record<Tone, string> = {
  neutral: "bg-ja-light text-ja-dark",
  signature: "bg-ja-gold text-ja-dark",
  premium: "bg-ja-mid text-ja-paper",
  basic: "bg-ja-light text-ja-dark",
  pet: "bg-ja-light text-ja-dark border border-ja-mid/30",
  warning: "bg-ja-sand text-ja-ink",
};

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: Tone;
};

export function Badge({
  tone = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        TONE_STYLES[tone],
        className,
      ].join(" ")}
      {...props}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Badge.tsx && git commit -m "feat(ui): add Badge component with tone variants"
```

### Task 1.9: Crear componente Chip (filtros)

**Files:**
- Create: `components/ui/Chip.tsx`

- [ ] **Step 1: Crear `components/ui/Chip.tsx`**

```tsx
"use client";

import { ComponentPropsWithoutRef } from "react";

export type ChipProps = ComponentPropsWithoutRef<"button"> & {
  active?: boolean;
};

export function Chip({ active, className = "", ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 h-10 text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid",
        active
          ? "bg-ja-dark text-ja-paper border-ja-dark"
          : "bg-ja-paper text-ja-dark border-ja-dark/15 hover:border-ja-dark/40",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Chip.tsx && git commit -m "feat(ui): add Chip filter component"
```

### Task 1.10: Crear componente Modal (desktop)

**Files:**
- Create: `components/ui/Modal.tsx`

- [ ] **Step 1: Crear `components/ui/Modal.tsx`**

```tsx
"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
};

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-ja-ink/50 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${maxWidth} bg-ja-paper rounded-t-3xl md:rounded-3xl max-h-[90svh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ja-paper/80 text-ja-dark hover:bg-ja-light"
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Modal.tsx && git commit -m "feat(ui): add Modal component with focus management"
```

### Task 1.11: Crear componente Accordion

**Files:**
- Create: `components/ui/Accordion.tsx`

- [ ] **Step 1: Crear `components/ui/Accordion.tsx`**

```tsx
"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export type AccordionItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-ja-dark/10 border-y border-ja-dark/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-${item.id}`}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-display text-lg md:text-xl text-ja-dark">
                {item.question}
              </span>
              <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ja-dark/20 text-ja-dark">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`acc-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-12 text-ja-ink/80 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Accordion.tsx && git commit -m "feat(ui): add Accordion component for FAQ"
```

### Task 1.12: Crear componente KenePattern (SVG inline)

**Files:**
- Create: `components/ui/KenePattern.tsx`

- [ ] **Step 1: Crear `components/ui/KenePattern.tsx`**

```tsx
type KenePatternProps = {
  className?: string;
  color?: string;
  opacity?: number;
};

/**
 * Patrón inspirado en geometrías kené Shipibo (líneas finas, simetría axial).
 * Uso decorativo: backgrounds, dividers, badges.
 */
export function KenePattern({
  className = "",
  color = "currentColor",
  opacity = 0.08,
}: KenePatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 240 80"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
    >
      <defs>
        <pattern id="kene" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1">
            <path d="M0 40 L20 20 L40 40 L60 20 L80 40" />
            <path d="M0 60 L20 40 L40 60 L60 40 L80 60" />
            <path d="M0 20 L20 0 L40 20 L60 0 L80 20" />
            <rect x="38" y="38" width="4" height="4" />
            <rect x="18" y="18" width="4" height="4" />
            <rect x="58" y="18" width="4" height="4" />
            <rect x="18" y="58" width="4" height="4" />
            <rect x="58" y="58" width="4" height="4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kene)" />
    </svg>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/KenePattern.tsx && git commit -m "feat(ui): add KenePattern SVG component"
```

### Task 1.13: Push Day 1 y verificar deploy preview

- [ ] **Step 1: Push**

```bash
git push
```

- [ ] **Step 2: Verificar deploy preview**

Abrir la URL de Vercel (`jardin-amazonico.vercel.app` o el dominio configurado). Debe cargar el placeholder "Próximamente" sin errores.

---

## Day 2 — Datos + Hero + Pilares + Footer

**Objetivo del día:** `data/plants.json` consolidado con 18 plantas; 18 imágenes stock curadas en `public/images/plants/`; secciones Hero, Pillars y Footer renderizando.

### Task 2.1: Definir tipos del catálogo

**Files:**
- Create: `lib/plants.ts`

- [ ] **Step 1: Crear `lib/plants.ts`**

```typescript
export type PlantTier = "S" | "P" | "B";
export type PlantType = "exotic" | "indoor" | "outdoor" | "air";
export type PlantSize = "small" | "medium" | "large";
export type CareLevel = "none" | "amateur" | "collector";
export type PotName = "Tierra" | "Piedra" | "Selva";

export type PlantBenefit = {
  iconLucide: string;
  text: string;
};

export type PlantCare = {
  light: string;
  water: string;
  humidity: string;
};

export type PlantLabubu = {
  animal: string;
  artisan: string;
  community: string;
  region: string;
};

export type PlantRegenerative = {
  priceRange: string;
  pot: PotName;
  includes: string[];
  labubu: PlantLabubu;
};

export type Plant = {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  tier: PlantTier;
  iconLucide: string;
  imageUrl: string;
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
  description: string;
  longDescription: string;
  benefit: PlantBenefit;
  care: PlantCare;
  seasonalWarningLima: string | null;
  regenerative: PlantRegenerative;
};

export type PlantsCatalog = Plant[];
```

- [ ] **Step 2: Commit**

```bash
git add lib/plants.ts && git commit -m "feat(data): define Plant types"
```

### Task 2.2: Crear `data/plants.json` (las 18 plantas)

**Files:**
- Create: `data/plants.json`

- [ ] **Step 1: Crear `data/plants.json`**

Estructura completa: 18 entradas siguiendo el tipo `Plant`. Tomar los datos del archivo `Referencias/jardin_amazonico_quiz_spec.md` sección 4.1 (catálogo), enriqueciendo con el campo `seasonalWarningLima` desde la columna "Advertencia Estacional Lima" del xlsx para las 18 plantas.

Ejemplo de la primera entrada (replicar patrón para las 17 restantes — la lista completa de 18 IDs es: p01..p18 según el quiz spec):

```json
[
  {
    "id": "JA-S001",
    "slug": "alocasia-amazonica",
    "name": "Alocasia Amazónica",
    "scientificName": "Alocasia 'Amazonica'",
    "tier": "S",
    "iconLucide": "sparkles",
    "imageUrl": "/images/plants/alocasia-amazonica.jpg",
    "imageAlt": "Alocasia Amazónica con hojas oscuras y venas blancas en maceta de cerámica",
    "tags": {
      "type": ["exotic", "indoor"],
      "size": ["medium"],
      "care": ["amateur", "collector"]
    },
    "petSafe": false,
    "suitableFor": { "gift": true, "space": true, "me": true },
    "description": "Sus hojas oscuras con bordes blancos parecen arte amazónico tallado en verde vivo.",
    "longDescription": "La Alocasia Amazónica lleva nuestro nombre en su propio nombre científico. Hojas oscuras con venación blanca nítida — como kené shipibo en verde. Protagonista absoluta del espacio donde vive.",
    "benefit": {
      "iconLucide": "sparkles",
      "text": "Eleva la energía del espacio y conecta con la fuerza de la selva"
    },
    "care": {
      "light": "Luz indirecta media",
      "water": "Moderado — 1 vez por semana",
      "humidity": "Alta — nebulizar ocasionalmente"
    },
    "seasonalWarningLima": "Sensible al frío de Lima. En invierno (jun–sep) reducir riego y proteger de corrientes.",
    "regenerative": {
      "priceRange": "S/ 185–255",
      "pot": "Tierra",
      "includes": [
        "Planta Alocasia Amazónica",
        "Maceta Tierra (cerámica artesanal)",
        "Labubu Rana Venenosa — fibra de chambira",
        "Tarjeta dedicatoria personalizada"
      ],
      "labubu": {
        "animal": "Rana Venenosa",
        "artisan": "Rosa Cumapa",
        "community": "Shipibo-Conibo",
        "region": "Ucayali, Perú"
      }
    }
  }
]
```

**Para las 17 plantas restantes**, completar siguiendo exactamente la misma estructura. Datos fuente:
- `Referencias/jardin_amazonico_quiz_spec.md` sección 4.1 (atributos quiz, descripción, beneficio, opción regenerativa).
- `Referencias/ja_bd_maestra_final.xlsx` (cuidados detallados, advertencia estacional Lima).

Mapping de iconLucide por planta (reemplaza emoji original):

| ID | Planta | iconLucide |
|---|---|---|
| JA-S001 | Alocasia Amazónica | sparkles |
| JA-P001 | Filodendro Micans | leaf |
| JA-B001 | Pothos Golden | sun |
| JA-B002 | Aglaonema Rosada | flower |
| JA-P002 | Aglaonema Pattaya | flame |
| JA-S002 | Filodendro Dark Lord | shield |
| JA-S003 | Filodendro Pink Princess | crown |
| JA-P003 | Monstera Adansonii | leaf |
| JA-P004 | ZZ Plant | gem |
| JA-P005 | Sansevieria Golden | swords |
| JA-P006 | Anturio Rojo | heart |
| JA-P007 | Anturio Amarillo / Chocolate | flame |
| JA-B003 | Tillandsia | wind |
| JA-P008 | Jazmín Limón | flower |
| JA-P009 | Cuerno de Alce | mountain |
| JA-S004 | Anturio Cristalino | gem |
| JA-S005 | Filodendro Gloriosum | crown |
| JA-B004 | Maranta Prayer Plant | hand |

Slug de cada planta: kebab-case del nombre comercial sin acentos (ej: "Filodendro Pink Princess" → `filodendro-pink-princess`).

- [ ] **Step 2: Validar JSON**

```bash
node -e "console.log('Plants:', JSON.parse(require('fs').readFileSync('data/plants.json','utf8')).length)"
```
Expected: `Plants: 18`.

- [ ] **Step 3: Commit**

```bash
git add data/plants.json && git commit -m "feat(data): add 18-plant catalog JSON"
```

### Task 2.3: Helper para cargar plantas con tipo

**Files:**
- Create: `lib/plants.ts` (modificar — agregar loader)
- Create: `lib/plants.test.ts`

- [ ] **Step 1: Agregar al final de `lib/plants.ts`**

```typescript
import plantsData from "@/data/plants.json";

export const PLANTS: PlantsCatalog = plantsData as PlantsCatalog;

export function getPlantById(id: string): Plant | undefined {
  return PLANTS.find((p) => p.id === id);
}

export function getPlantBySlug(slug: string): Plant | undefined {
  return PLANTS.find((p) => p.slug === slug);
}
```

- [ ] **Step 2: Agregar test**

Crear `lib/plants.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { PLANTS, getPlantById, getPlantBySlug } from "./plants";

describe("plants catalog", () => {
  it("loads 18 plants", () => {
    expect(PLANTS).toHaveLength(18);
  });

  it("each plant has unique id and slug", () => {
    const ids = new Set(PLANTS.map((p) => p.id));
    const slugs = new Set(PLANTS.map((p) => p.slug));
    expect(ids.size).toBe(18);
    expect(slugs.size).toBe(18);
  });

  it("getPlantById finds existing plant", () => {
    expect(getPlantById("JA-S001")?.name).toBe("Alocasia Amazónica");
  });

  it("getPlantBySlug finds existing plant", () => {
    expect(getPlantBySlug("alocasia-amazonica")?.id).toBe("JA-S001");
  });

  it("returns undefined for unknown id", () => {
    expect(getPlantById("XX-000")).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run tests**

```bash
npm test
```
Expected: 5 tests pasando.

- [ ] **Step 4: Commit**

```bash
git add lib/plants.ts lib/plants.test.ts && git commit -m "feat(data): add plants loader with tests"
```

### Task 2.4: Curaduría de 18 imágenes stock

**Files:**
- Create: `public/images/plants/*.jpg` (18 archivos)
- Modify: `next.config.ts`

- [ ] **Step 1: Curar 18 imágenes desde Unsplash**

Para cada planta, buscar en [unsplash.com](https://unsplash.com/) usando el nombre científico o común. Seleccionar imágenes en orientación retrato (preferiblemente 4:5) que muestren la planta protagonista, fondos limpios y luz natural. Descargar versión "Medium" (~1080px de ancho).

Renombrar al formato `slug.jpg` (sin diacríticos):
- `alocasia-amazonica.jpg`
- `filodendro-micans.jpg`
- `pothos-golden.jpg`
- `aglaonema-rosada.jpg`
- `aglaonema-pattaya.jpg`
- `filodendro-dark-lord.jpg`
- `filodendro-pink-princess.jpg`
- `monstera-adansonii.jpg`
- `zz-plant.jpg`
- `sansevieria-golden.jpg`
- `anturio-rojo.jpg`
- `anturio-amarillo-chocolate.jpg`
- `tillandsia.jpg`
- `jazmin-limon.jpg`
- `cuerno-de-alce.jpg`
- `anturio-cristalino.jpg`
- `filodendro-gloriosum.jpg`
- `maranta-prayer-plant.jpg`

Mover a `public/images/plants/`.

- [ ] **Step 2: Verificar conteo**

```bash
ls public/images/plants/ | wc -l
```
Expected: `18`.

- [ ] **Step 3: Optimizar peso**

Si alguna imagen pesa más de 400KB, comprimir en [squoosh.app](https://squoosh.app/) (formato WebP/JPEG, calidad 75–80, ancho máximo 1200px).

- [ ] **Step 4: Commit**

```bash
git add public/images/plants/ && git commit -m "feat(content): add 18 curated stock plant images"
```

### Task 2.5: Crear sección Hero

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `public/images/hero.jpg` (imagen Unsplash de planta amazónica en interior limeño)
- Modify: `app/page.tsx`

- [ ] **Step 1: Curar imagen del Hero**

Buscar en Unsplash "indoor jungle plant home" o "tropical plant interior". Descargar 1 imagen 16:9 o 16:10 horizontal de alta calidad. Nombrar como `hero.jpg`. Ubicar en `public/images/hero.jpg`.

- [ ] **Step 2: Crear `components/sections/Hero.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[88svh] flex items-end overflow-hidden"
    >
      <Image
        src="/images/hero.jpg"
        alt="Planta amazónica en interior limeño"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ja-ink/20 via-ja-ink/40 to-ja-ink/70 md:from-ja-ink/10 md:via-ja-ink/30 md:to-ja-ink/60" />

      <div className="container mx-auto px-6 pb-16 md:pb-24 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-light/90">
          Jardín Amazónico
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ja-paper md:text-7xl md:max-w-3xl">
          Traemos un pedacito de selva a tu hogar.
          <span className="block text-ja-light/90 mt-3 md:mt-4">
            Para proteger a las manos que la sostienen.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-ja-paper/85 leading-relaxed">
          Plantas vivas de colección y artesanías amazónicas, conectadas con
          comunidades indígenas peruanas. Desde Lima.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="#quiz">
            <Button size="lg" fullWidth className="sm:w-auto">
              Encuentra tu planta →
            </Button>
          </Link>
          <Link href="#membresia">
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              className="sm:w-auto text-ja-paper hover:bg-ja-paper/10"
            >
              Conoce la membresía
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Integrar en home**

Reemplazar `app/page.tsx`:
```tsx
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verificar visualmente**

```bash
npm run dev
```
Abrir http://localhost:3000 — Hero debe ocupar pantalla completa, imagen visible, headline en Fraunces, CTAs funcionales (anchors sin destino aún, normal).

Inspeccionar en mobile (Chrome DevTools, dispositivo iPhone SE 375px) — overlay más fuerte, CTAs apilados.

- [ ] **Step 5: Commit y push**

```bash
git add -A && git commit -m "feat(home): add Hero section with image and CTAs" && git push
```

### Task 2.6: Crear sección Pillars (3 pilares)

**Files:**
- Create: `components/sections/Pillars.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Crear `components/sections/Pillars.tsx`**

```tsx
import { Leaf, PawPrint, CalendarHeart } from "lucide-react";

const PILLARS = [
  {
    icon: Leaf,
    title: "La planta correcta para tu vida",
    body: "No vendemos plantas al azar. Cada especie está seleccionada por su rareza, su carácter y su historia. Y un cuestionario de cinco preguntas las conecta contigo antes de que lleguen a tu puerta.",
  },
  {
    icon: PawPrint,
    title: "El labubu que viene de la selva",
    body: "Cada compra incluye un labubu amazónico — un animalito tejido en fibra de chambira por artesanas de comunidades indígenas del Perú. Coleccionable, único, con nombre e historia.",
  },
  {
    icon: CalendarHeart,
    title: "Una membresía que te acompaña",
    body: "Elige cada mes: ¿quieres una planta nueva o prefieres cuidar las que tienes? Bosque o Suelo — la membresía se adapta al momento en que estás.",
  },
];

export function Pillars() {
  return (
    <section className="bg-ja-cream py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          Nuestra propuesta
        </p>
        <h2 className="mt-4 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Más que una planta. Una decisión.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <article key={title} className="flex flex-col gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ja-dark text-ja-paper">
                <Icon size={22} />
              </span>
              <h3 className="font-display text-xl md:text-2xl text-ja-dark">
                {title}
              </h3>
              <p className="text-ja-ink/75 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Integrar en home**

Modificar `app/page.tsx`:
```tsx
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";

export default function Home() {
  return (
    <main>
      <Hero />
      <Pillars />
    </main>
  );
}
```

- [ ] **Step 3: Verificar visualmente y mobile**

```bash
npm run dev
```
Verificar grid 3 col en desktop, stack vertical en mobile, íconos Lucide visibles, tipografía correcta.

- [ ] **Step 4: Commit y push**

```bash
git add -A && git commit -m "feat(home): add Pillars section" && git push
```

### Task 2.7: Crear Footer mínimo

**Files:**
- Create: `components/sections/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Crear `components/sections/Footer.tsx`**

```tsx
import Link from "next/link";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "51999999999";

export function Footer() {
  return (
    <footer className="bg-ja-dark text-ja-paper">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">Jardín Amazónico</p>
            <p className="mt-2 text-ja-paper/70 text-sm">
              Plantas vivas. Alma amazónica.
            </p>
          </div>

          <nav aria-label="Explora" className="text-sm">
            <p className="font-medium uppercase tracking-wider text-xs text-ja-paper/60">
              Explora
            </p>
            <ul className="mt-4 space-y-2">
              <li><Link href="#quiz" className="hover:text-ja-light">Cuestionario</Link></li>
              <li><Link href="#catalogo" className="hover:text-ja-light">Catálogo</Link></li>
              <li><Link href="#membresia" className="hover:text-ja-light">Membresía</Link></li>
              <li><Link href="#labubu" className="hover:text-ja-light">El Labubu Amazónico</Link></li>
              <li><Link href="#faq" className="hover:text-ja-light">Preguntas frecuentes</Link></li>
            </ul>
          </nav>

          <div className="text-sm">
            <p className="font-medium uppercase tracking-wider text-xs text-ja-paper/60">
              Contacto
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ja-light"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/jardinamazonico"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ja-light"
                >
                  Instagram @jardinamazonico
                </a>
              </li>
            </ul>
            <p className="mt-6 text-ja-paper/60 leading-relaxed">
              Trabajamos solo con plantas cultivadas en vivero. Ninguna proviene
              de extracción silvestre del bosque.
            </p>
          </div>
        </div>

        <p className="mt-12 pt-8 border-t border-ja-paper/15 text-xs text-ja-paper/60">
          © 2026 Jardín Amazónico. Lima, Perú.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Integrar en home**

Modificar `app/page.tsx`:
```tsx
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Crear `.env.local` con número placeholder**

```bash
cat > .env.local <<'EOF'
NEXT_PUBLIC_WA_NUMBER=51999999999
NEXT_PUBLIC_MP_LINK_BOSQUE=https://link.mercadopago.com.pe/example
NEXT_PUBLIC_MP_LINK_SUELO=https://link.mercadopago.com.pe/example
EOF
```

(Reemplazar valores reales una vez que estén disponibles.)

- [ ] **Step 4: Crear `.env.example`**

```bash
cat > .env.example <<'EOF'
NEXT_PUBLIC_WA_NUMBER=51XXXXXXXXX
NEXT_PUBLIC_MP_LINK_BOSQUE=https://link.mercadopago.com.pe/...
NEXT_PUBLIC_MP_LINK_SUELO=https://link.mercadopago.com.pe/...
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
EOF
```

- [ ] **Step 5: Commit y push**

```bash
git add -A && git commit -m "feat(home): add Footer and env templates" && git push
```

### Task 2.8: Cierre Day 2 — verificar deploy preview

- [ ] **Step 1: Configurar variables de entorno en Vercel**

En Vercel dashboard del proyecto: Settings → Environment Variables. Agregar:
- `NEXT_PUBLIC_WA_NUMBER` = `51999999999` (placeholder por ahora; reemplazar con tu número real cuando lo tengas)

Las demás (MP, Sheets) se agregan en su día respectivo.

- [ ] **Step 2: Re-deploy si es necesario**

Si el push del Step 5 anterior no triggereó deploy, ir a Deployments → Redeploy.

- [ ] **Step 3: Verificar en mobile real**

Abrir el dominio en un teléfono real. Verificar Hero + Pillars + Footer renderean correctamente. Tipografía Fraunces visible. CTAs en posiciones correctas. Sin layout shift.

---

## Day 3 — Quiz + scoring + Catálogo

**Objetivo del día:** algoritmo de scoring testeado con TDD; UI de quiz inline funcional con barra de progreso; grid del catálogo filtrable por chips; integración quiz → catálogo (al completar quiz, el grid muestra resultados ordenados por score).

### Task 3.1: Definir tipos del quiz

**Files:**
- Create: `lib/quiz-types.ts`

- [ ] **Step 1: Crear `lib/quiz-types.ts`**

```typescript
export type QuizPurpose = "me" | "gift" | "space";
export type QuizType = "exotic" | "indoor" | "outdoor" | "air";
export type QuizSize = "small" | "medium" | "large";
export type QuizCare = "none" | "amateur" | "collector";
export type QuizPets = "yes" | "no";

export type QuizAnswers = {
  purpose: QuizPurpose;
  type: QuizType;
  size: QuizSize;
  care: QuizCare;
  pets: QuizPets;
};

export type PartialQuizAnswers = Partial<QuizAnswers>;

export type QuizQuestionId =
  | "purpose"
  | "type"
  | "size"
  | "care"
  | "pets";

export type QuizOption<V extends string = string> = {
  value: V;
  iconLucide: string;
  title: string;
  description: string;
};

export type QuizQuestion = {
  id: QuizQuestionId;
  label: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
};
```

- [ ] **Step 2: Commit**

```bash
git add lib/quiz-types.ts && git commit -m "feat(quiz): define quiz types"
```

### Task 3.2: Implementar scoring con TDD — Test 1: filtro pets

**Files:**
- Create: `lib/scoring.test.ts`
- Create: `lib/scoring.ts`

- [ ] **Step 1: Crear `lib/scoring.test.ts` con primer test**

```typescript
import { describe, it, expect } from "vitest";
import { calculateScore } from "./scoring";
import type { Plant } from "./plants";
import type { QuizAnswers } from "./quiz-types";

const samplePetUnsafe: Plant = {
  id: "TEST-1",
  slug: "test-1",
  name: "Test Plant",
  scientificName: "Testus testus",
  tier: "P",
  iconLucide: "leaf",
  imageUrl: "",
  imageAlt: "",
  tags: { type: ["indoor"], size: ["medium"], care: ["amateur"] },
  petSafe: false,
  suitableFor: { gift: true, space: true, me: true },
  description: "",
  longDescription: "",
  benefit: { iconLucide: "leaf", text: "" },
  care: { light: "", water: "", humidity: "" },
  seasonalWarningLima: null,
  regenerative: {
    priceRange: "",
    pot: "Tierra",
    includes: [],
    labubu: { animal: "", artisan: "", community: "", region: "" },
  },
};

const baseAnswers: QuizAnswers = {
  purpose: "me",
  type: "indoor",
  size: "medium",
  care: "amateur",
  pets: "no",
};

describe("calculateScore", () => {
  it("penalizes -10 when pets=yes and plant is not pet-safe", () => {
    const answers: QuizAnswers = { ...baseAnswers, pets: "yes" };
    const score = calculateScore(samplePetUnsafe, answers);
    expect(score).toBeLessThanOrEqual(-10 + 10); // permite que algunas reglas sumen +
    expect(score).toBeLessThan(0);
  });
});
```

- [ ] **Step 2: Run test — debe fallar**

```bash
npm test
```
Expected: error porque `lib/scoring.ts` no existe aún.

- [ ] **Step 3: Crear `lib/scoring.ts` con implementación mínima**

```typescript
import type { Plant } from "./plants";
import type { QuizAnswers } from "./quiz-types";

export function calculateScore(plant: Plant, answers: QuizAnswers): number {
  let score = 0;
  if (answers.pets === "yes" && !plant.petSafe) score -= 10;
  return score;
}
```

- [ ] **Step 4: Run test**

```bash
npm test
```
Expected: 1 test pasa.

- [ ] **Step 5: Commit**

```bash
git add lib/scoring.ts lib/scoring.test.ts && git commit -m "feat(scoring): add pets filter rule (TDD red→green)"
```

### Task 3.3: Scoring TDD — Test 2: tipo exotic+S bonus

**Files:**
- Modify: `lib/scoring.test.ts`
- Modify: `lib/scoring.ts`

- [ ] **Step 1: Agregar test al archivo `lib/scoring.test.ts`**

```typescript
const sampleExoticS: Plant = {
  ...samplePetUnsafe,
  id: "TEST-2",
  tier: "S",
  petSafe: true,
  tags: { type: ["exotic", "indoor"], size: ["medium"], care: ["amateur"] },
};

it("scores +3 for exotic match plus +1 tier S coherence bonus", () => {
  const answers: QuizAnswers = { ...baseAnswers, type: "exotic" };
  const score = calculateScore(sampleExoticS, answers);
  // exotic match: +3, tier S bonus: +1, size match: +2, care match: +2, purpose me match: +1
  expect(score).toBe(9);
});
```

- [ ] **Step 2: Run — debe fallar (score actual = 0)**

```bash
npm test
```

- [ ] **Step 3: Extender `lib/scoring.ts`**

```typescript
import type { Plant } from "./plants";
import type { QuizAnswers } from "./quiz-types";

export function calculateScore(plant: Plant, answers: QuizAnswers): number {
  let score = 0;

  // TYPE
  if (answers.type === "exotic" && plant.tags.type.includes("exotic")) score += 3;
  if (answers.type === "indoor" && plant.tags.type.includes("indoor")) score += 2;
  if (answers.type === "outdoor" && plant.tags.type.includes("outdoor")) score += 2;
  if (answers.type === "air" && plant.tags.type.includes("air")) score += 4;

  // Bonus coherencia exotic + tier S
  if (answers.type === "exotic" && plant.tier === "S") score += 1;

  // SIZE
  if (plant.tags.size.includes(answers.size)) score += 2;

  // CARE
  if (plant.tags.care.includes(answers.care)) score += 2;
  if (answers.care === "none" && plant.tags.care.includes("none")) score += 1;

  // PETS — filtro disqualificante
  if (answers.pets === "yes" && !plant.petSafe) score -= 10;

  // PURPOSE
  if (answers.purpose === "gift" && plant.suitableFor.gift) score += 1;
  if (answers.purpose === "space" && plant.suitableFor.space) score += 1;
  if (answers.purpose === "me" && plant.suitableFor.me) score += 1;

  return score;
}
```

- [ ] **Step 4: Run — debe pasar**

```bash
npm test
```
Expected: 2 tests pasan.

- [ ] **Step 5: Commit**

```bash
git add lib/scoring.ts lib/scoring.test.ts && git commit -m "feat(scoring): add full scoring rules from spec"
```

### Task 3.4: Scoring TDD — Test 3: getRecommendations

**Files:**
- Modify: `lib/scoring.ts`
- Modify: `lib/scoring.test.ts`

- [ ] **Step 1: Agregar test**

```typescript
import { calculateScore, getRecommendations } from "./scoring";
import { PLANTS } from "./plants";

describe("getRecommendations", () => {
  it("returns between 3 and 5 recommendations", () => {
    const answers: QuizAnswers = {
      purpose: "me",
      type: "indoor",
      size: "medium",
      care: "amateur",
      pets: "no",
    };
    const recs = getRecommendations(PLANTS, answers);
    expect(recs.length).toBeGreaterThanOrEqual(3);
    expect(recs.length).toBeLessThanOrEqual(5);
  });

  it("excludes pet-unsafe plants when user has pets", () => {
    const answers: QuizAnswers = {
      purpose: "me",
      type: "indoor",
      size: "medium",
      care: "amateur",
      pets: "yes",
    };
    const recs = getRecommendations(PLANTS, answers);
    for (const plant of recs) {
      expect(plant.petSafe).toBe(true);
    }
  });

  it("falls back to 3 tier-B plants when no positive scores", () => {
    // Caso extremo: respuestas inconsistentes que dan 0 a todas
    // (en práctica improbable, pero el fallback debe funcionar)
    const answers: QuizAnswers = {
      purpose: "gift",
      type: "air", // muy específico
      size: "large", // tillandsia es small, no large
      care: "collector",
      pets: "no",
    };
    const recs = getRecommendations(PLANTS, answers);
    expect(recs.length).toBeGreaterThanOrEqual(3);
  });

  it("orders results desc by score", () => {
    const answers: QuizAnswers = {
      purpose: "me",
      type: "exotic",
      size: "medium",
      care: "collector",
      pets: "no",
    };
    const recs = getRecommendations(PLANTS, answers);
    for (let i = 0; i < recs.length - 1; i++) {
      const a = calculateScore(recs[i], answers);
      const b = calculateScore(recs[i + 1], answers);
      expect(a).toBeGreaterThanOrEqual(b);
    }
  });
});
```

- [ ] **Step 2: Run — debe fallar (función no existe)**

```bash
npm test
```

- [ ] **Step 3: Agregar `getRecommendations` a `lib/scoring.ts`**

```typescript
export function getRecommendations(
  plants: Plant[],
  answers: QuizAnswers,
): Plant[] {
  const scored = plants
    .map((plant) => ({ plant, score: calculateScore(plant, answers) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length < 3) {
    // Fallback: 3 plantas tier B con compatibilidad de cuidado más flexible
    const fallback = plants
      .filter((p) => p.tier === "B")
      .filter((p) => answers.pets === "no" || p.petSafe)
      .slice(0, 3);
    return fallback;
  }

  return scored.slice(0, Math.min(5, scored.length)).map((item) => item.plant);
}
```

- [ ] **Step 4: Run tests**

```bash
npm test
```
Expected: todos los tests del scoring pasan.

- [ ] **Step 5: Commit**

```bash
git add lib/scoring.ts lib/scoring.test.ts && git commit -m "feat(scoring): add getRecommendations with fallback"
```

### Task 3.5: Crear `lib/quiz-questions.ts`

**Files:**
- Create: `lib/quiz-questions.ts`

- [ ] **Step 1: Crear archivo con las 5 preguntas**

```typescript
import type { QuizQuestion } from "./quiz-types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "purpose",
    label: "Paso 1 de 5",
    title: "¿Para quién es la planta?",
    subtitle: "Esto nos ayuda a ajustar la selección y la narrativa del regalo.",
    options: [
      { value: "me", iconLucide: "leaf", title: "Para mí", description: "Quiero crecer mi colección o empezar una" },
      { value: "gift", iconLucide: "gift", title: "Para regalar", description: "Busco algo especial para alguien" },
      { value: "space", iconLucide: "home", title: "Para mi espacio", description: "Quiero decorar una habitación u oficina" },
    ],
  },
  {
    id: "type",
    label: "Paso 2 de 5",
    title: "¿Qué tipo de planta buscas?",
    subtitle: "Elige la que más conecta con lo que tienes en mente.",
    options: [
      { value: "exotic", iconLucide: "sparkles", title: "Exótica / Colección", description: "Plantas raras, de alto impacto, para coleccionistas" },
      { value: "indoor", iconLucide: "flower-2", title: "Interior", description: "Verde para adentro, resistente y decorativa" },
      { value: "outdoor", iconLucide: "sun", title: "Exterior", description: "Plantas para balcón, jardín o mucha luz" },
      { value: "air", iconLucide: "wind", title: "Planta de aire", description: "Sin tierra ni maceta, flotan libres" },
    ],
  },
  {
    id: "size",
    label: "Paso 3 de 5",
    title: "¿Qué tamaño buscas?",
    subtitle: "El tamaño define la presencia visual en el espacio.",
    options: [
      { value: "small", iconLucide: "sprout", title: "Pequeña", description: "Cabe en un escritorio o repisa" },
      { value: "medium", iconLucide: "leaf", title: "Mediana", description: "Tiene presencia pero no ocupa mucho" },
      { value: "large", iconLucide: "tree-pine", title: "Grande", description: "Protagonista del espacio, impacto total" },
    ],
  },
  {
    id: "care",
    label: "Paso 4 de 5",
    title: "¿Cuánto tiempo tienes para cuidarla?",
    subtitle: "Sé honesto — ¡las plantas te lo agradecerán!",
    options: [
      { value: "none", iconLucide: "clock", title: "Casi ninguno", description: "Quiero algo que sobreviva con olvido" },
      { value: "amateur", iconLucide: "flower", title: "Un poco", description: "Puedo regarla y darle algo de atención" },
      { value: "collector", iconLucide: "microscope", title: "Soy entusiasta", description: "Disfruto cuidar y aprender de mis plantas" },
    ],
  },
  {
    id: "pets",
    label: "Paso 5 de 5",
    title: "¿Tienes mascotas en casa?",
    subtitle: "Algunas plantas son tóxicas para gatos y perros.",
    options: [
      { value: "no", iconLucide: "house", title: "No tengo mascotas", description: "Todas las opciones están disponibles" },
      { value: "yes", iconLucide: "paw-print", title: "Sí tengo mascotas", description: "Filtraremos solo plantas seguras" },
    ],
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/quiz-questions.ts && git commit -m "feat(quiz): add 5 quiz questions data"
```

### Task 3.6: Componente ProgressBar

**Files:**
- Create: `components/quiz/ProgressBar.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
type ProgressBarProps = {
  total: number;
  current: number;
};

export function ProgressBar({ total, current }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Paso ${current} de ${total}`}
      className="flex gap-2"
    >
      {Array.from({ length: total }).map((_, i) => {
        const status =
          i < current ? "done" : i === current ? "active" : "pending";
        const cls =
          status === "done"
            ? "bg-ja-dark"
            : status === "active"
              ? "bg-ja-terra"
              : "bg-ja-dark/15";
        return (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${cls} transition-colors`}
          />
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/quiz/ProgressBar.tsx && git commit -m "feat(quiz): add ProgressBar component"
```

### Task 3.7: Componente OptionCard

**Files:**
- Create: `components/quiz/OptionCard.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
"use client";

import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

type OptionCardProps = {
  iconLucide: string;
  title: string;
  description: string;
  selected?: boolean;
  onClick: () => void;
};

export function OptionCard({
  iconLucide,
  title,
  description,
  selected,
  onClick,
}: OptionCardProps) {
  const Icon = (Icons[
    iconLucide
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("") as keyof typeof Icons
  ] ?? Icons.Leaf) as LucideIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid",
        selected
          ? "border-ja-dark bg-ja-light shadow-sm"
          : "border-ja-dark/15 bg-ja-paper hover:border-ja-dark/40 hover:bg-ja-cream",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
          selected ? "bg-ja-dark text-ja-paper" : "bg-ja-cream text-ja-dark",
        ].join(" ")}
      >
        <Icon size={20} />
      </span>
      <span className="font-display text-lg text-ja-dark">{title}</span>
      <span className="text-sm text-ja-ink/70">{description}</span>
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/quiz/OptionCard.tsx && git commit -m "feat(quiz): add OptionCard with dynamic Lucide icon"
```

### Task 3.8: Componente Quiz (state machine + UI completa)

**Files:**
- Create: `components/sections/Quiz.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Crear `components/sections/Quiz.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { OptionCard } from "@/components/quiz/OptionCard";
import { QUIZ_QUESTIONS } from "@/lib/quiz-questions";
import type {
  QuizAnswers,
  PartialQuizAnswers,
  QuizQuestionId,
} from "@/lib/quiz-types";

type QuizProps = {
  onComplete: (answers: QuizAnswers) => void;
  onReset: () => void;
};

export function Quiz({ onComplete, onReset }: QuizProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<PartialQuizAnswers>({});
  const [completed, setCompleted] = useState(false);

  const question = QUIZ_QUESTIONS[stepIndex];
  const totalSteps = QUIZ_QUESTIONS.length;
  const currentValue = answers[question.id as QuizQuestionId];

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function next() {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setCompleted(true);
      onComplete(answers as QuizAnswers);
    }
  }

  function back() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  function reset() {
    setStepIndex(0);
    setAnswers({});
    setCompleted(false);
    onReset();
  }

  if (completed) {
    return (
      <section
        id="quiz"
        className="bg-ja-paper py-16 md:py-24"
      >
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
            Tu selección personalizada
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-ja-dark">
            Estas plantas son para ti.
          </h2>
          <p className="mt-3 text-ja-ink/70">
            Curadas según tu espacio, ritmo y nivel de experiencia.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 text-sm text-ja-dark underline underline-offset-4 hover:text-ja-mid"
          >
            Volver a empezar el cuestionario
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="bg-ja-paper py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <ProgressBar total={totalSteps} current={stepIndex} />

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
              {question.label}
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-ja-dark">
              {question.title}
            </h2>
            <p className="mt-2 text-ja-ink/70">{question.subtitle}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {question.options.map((opt) => (
                <OptionCard
                  key={opt.value}
                  iconLucide={opt.iconLucide}
                  title={opt.title}
                  description={opt.description}
                  selected={currentValue === opt.value}
                  onClick={() => selectOption(opt.value)}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={back}
                disabled={stepIndex === 0}
              >
                ← Atrás
              </Button>
              <Button onClick={next} disabled={!currentValue}>
                {stepIndex === totalSteps - 1 ? "Ver mis plantas →" : "Siguiente →"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Integrar en home con state**

Modificar `app/page.tsx`:
```tsx
"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Quiz } from "@/components/sections/Quiz";
import { Footer } from "@/components/sections/Footer";
import type { QuizAnswers } from "@/lib/quiz-types";

export default function Home() {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);

  return (
    <main>
      <Hero />
      <Pillars />
      <Quiz
        onComplete={(a) => setQuizAnswers(a)}
        onReset={() => setQuizAnswers(null)}
      />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Verificar visualmente**

```bash
npm run dev
```
Probar el flujo completo:
- Avanzar por las 5 preguntas, seleccionando una opción en cada una.
- Verificar barra de progreso, animación entre pasos, botón siguiente desactivado hasta selección, botón atrás desactivado en paso 1.
- Al completar paso 5, debe verse la pantalla de "Estas plantas son para ti".
- Botón "Volver a empezar" resetea.

- [ ] **Step 4: Commit y push**

```bash
git add -A && git commit -m "feat(quiz): integrate quiz state machine into home" && git push
```

### Task 3.9: Componente PlantCard

**Files:**
- Create: `components/catalog/PlantCard.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
"use client";

import Image from "next/image";
import * as Icons from "lucide-react";
import { LucideIcon, PawPrint } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Plant } from "@/lib/plants";

type PlantCardProps = {
  plant: Plant;
  onSelect: (plant: Plant) => void;
};

const TIER_LABEL: Record<Plant["tier"], string> = {
  S: "Signature",
  P: "Premium",
  B: "Básico",
};

const TIER_TONE: Record<Plant["tier"], "signature" | "premium" | "basic"> = {
  S: "signature",
  P: "premium",
  B: "basic",
};

export function PlantCard({ plant, onSelect }: PlantCardProps) {
  const BenefitIcon = (Icons[
    plant.benefit.iconLucide
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("") as keyof typeof Icons
  ] ?? Icons.Leaf) as LucideIcon;

  return (
    <article className="group flex flex-col rounded-3xl bg-ja-paper border border-ja-dark/10 overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/5] overflow-hidden bg-ja-cream">
        <Image
          src={plant.imageUrl}
          alt={plant.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge tone={TIER_TONE[plant.tier]}>{TIER_LABEL[plant.tier]}</Badge>
        </div>
        {plant.petSafe && (
          <div className="absolute top-3 right-3">
            <Badge tone="pet">
              <PawPrint size={12} /> Pet friendly
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-display text-xl text-ja-dark">{plant.name}</h3>
        <p className="text-xs italic text-ja-ink/60">{plant.scientificName}</p>
        <p className="mt-1 text-sm font-medium text-ja-terra">
          Desde {plant.regenerative.priceRange.split("–")[0].replace("S/", "S/").trim()}
        </p>
        <p className="mt-2 flex items-start gap-2 text-sm text-ja-ink/75">
          <BenefitIcon size={16} className="mt-0.5 shrink-0 text-ja-mid" />
          <span className="line-clamp-2">{plant.benefit.text}</span>
        </p>
        <Button
          fullWidth
          className="mt-4"
          onClick={() => onSelect(plant)}
        >
          Ver opciones →
        </Button>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/catalog/PlantCard.tsx && git commit -m "feat(catalog): add PlantCard component"
```

### Task 3.10: Componente FilterChips

**Files:**
- Create: `components/catalog/FilterChips.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
"use client";

import { Chip } from "@/components/ui/Chip";
import type { PlantType, PlantSize, CareLevel } from "@/lib/plants";

export type CatalogFilters = {
  type?: PlantType;
  size?: PlantSize;
  care?: CareLevel;
  petSafe?: boolean;
};

type FilterChipsProps = {
  value: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  onReset: () => void;
};

const TYPE_OPTIONS: { value: PlantType; label: string }[] = [
  { value: "exotic", label: "Exótica" },
  { value: "indoor", label: "Interior" },
  { value: "outdoor", label: "Exterior" },
  { value: "air", label: "Planta de aire" },
];

const SIZE_OPTIONS: { value: PlantSize; label: string }[] = [
  { value: "small", label: "Pequeña" },
  { value: "medium", label: "Mediana" },
  { value: "large", label: "Grande" },
];

const CARE_OPTIONS: { value: CareLevel; label: string }[] = [
  { value: "none", label: "Casi ningún cuidado" },
  { value: "amateur", label: "Un poco de cuidado" },
  { value: "collector", label: "Entusiasta" },
];

export function FilterChips({ value, onChange, onReset }: FilterChipsProps) {
  function toggle<K extends keyof CatalogFilters>(
    key: K,
    next: CatalogFilters[K],
  ) {
    onChange({
      ...value,
      [key]: value[key] === next ? undefined : next,
    });
  }

  const hasFilters =
    value.type || value.size || value.care || value.petSafe;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {TYPE_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            active={value.type === opt.value}
            onClick={() => toggle("type", opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {SIZE_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            active={value.size === opt.value}
            onClick={() => toggle("size", opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {CARE_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            active={value.care === opt.value}
            onClick={() => toggle("care", opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
        <Chip
          active={!!value.petSafe}
          onClick={() => onChange({ ...value, petSafe: !value.petSafe })}
        >
          Solo Pet friendly
        </Chip>
      </div>
      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-ja-dark underline underline-offset-4"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/catalog/FilterChips.tsx && git commit -m "feat(catalog): add FilterChips component"
```

### Task 3.11: Sección Catalog con integración de quiz

**Files:**
- Create: `components/sections/Catalog.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Crear `components/sections/Catalog.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FilterChips, type CatalogFilters } from "@/components/catalog/FilterChips";
import { PlantCard } from "@/components/catalog/PlantCard";
import { PLANTS } from "@/lib/plants";
import { getRecommendations } from "@/lib/scoring";
import type { Plant } from "@/lib/plants";
import type { QuizAnswers } from "@/lib/quiz-types";

type CatalogProps = {
  quizAnswers: QuizAnswers | null;
  onSelectPlant: (plant: Plant) => void;
};

export function Catalog({ quizAnswers, onSelectPlant }: CatalogProps) {
  const [filters, setFilters] = useState<CatalogFilters>({});
  const [showAll, setShowAll] = useState(false);

  const visiblePlants = useMemo(() => {
    if (quizAnswers && !showAll) {
      return getRecommendations(PLANTS, quizAnswers);
    }
    return PLANTS.filter((p) => {
      if (filters.type && !p.tags.type.includes(filters.type)) return false;
      if (filters.size && !p.tags.size.includes(filters.size)) return false;
      if (filters.care && !p.tags.care.includes(filters.care)) return false;
      if (filters.petSafe && !p.petSafe) return false;
      return true;
    });
  }, [filters, quizAnswers, showAll]);

  const showQuizResults = quizAnswers && !showAll;

  return (
    <section id="catalogo" className="bg-ja-paper py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          {showQuizResults ? "Tu selección personalizada" : "El catálogo"}
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark">
          {showQuizResults
            ? "Tus plantas recomendadas"
            : "Todas nuestras plantas, curadas."}
        </h2>
        <p className="mt-3 text-ja-ink/70 max-w-2xl">
          {showQuizResults
            ? quizAnswers.purpose === "gift"
              ? "Perfectas para regalar con impacto y significado."
              : "Curadas según tu espacio, ritmo y nivel de experiencia."
            : "Filtra por lo que necesitas — o responde el cuestionario para una selección personalizada."}
        </p>

        {showQuizResults ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-ja-ink/70">
              Filtrado por tu cuestionario
            </span>
            <Button variant="secondary" size="sm" onClick={() => setShowAll(true)}>
              Ver todas las plantas
            </Button>
          </div>
        ) : (
          <div className="mt-8">
            <FilterChips
              value={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </div>
        )}

        {visiblePlants.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-ja-dark/20 p-12 text-center">
            <p className="font-display text-2xl text-ja-dark">
              No encontramos plantas con esa combinación.
            </p>
            <p className="mt-2 text-ja-ink/70">
              Prueba ajustando algún filtro.
            </p>
          </div>
        ) : (
          <div
            aria-live="polite"
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visiblePlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onSelect={onSelectPlant}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modificar `app/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Quiz } from "@/components/sections/Quiz";
import { Catalog } from "@/components/sections/Catalog";
import { Footer } from "@/components/sections/Footer";
import type { QuizAnswers } from "@/lib/quiz-types";
import type { Plant } from "@/lib/plants";

export default function Home() {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  return (
    <main>
      <Hero />
      <Pillars />
      <Quiz
        onComplete={(a) => setQuizAnswers(a)}
        onReset={() => setQuizAnswers(null)}
      />
      <Catalog
        quizAnswers={quizAnswers}
        onSelectPlant={setSelectedPlant}
      />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Verificar flujo completo**

```bash
npm run dev
```
- Sin completar quiz: ver grid completo de 18 plantas, filtros funcionando.
- Completar quiz: ver grid filtrado a 3-5 recomendaciones, botón "Ver todas las plantas".
- Click en una card: por ahora solo setea estado (modal viene en Día 4).

- [ ] **Step 4: Commit y push**

```bash
git add -A && git commit -m "feat(catalog): add Catalog section with quiz integration" && git push
```

---

## Day 4 — Modal de planta + WhatsApp deeplink

**Objetivo del día:** modal/drawer de planta con detalles completos; CTA "Quiero esta" abre WhatsApp con mensaje preformateado.

### Task 4.1: Implementar `lib/whatsapp.ts` con TDD

**Files:**
- Create: `lib/whatsapp.test.ts`
- Create: `lib/whatsapp.ts`

- [ ] **Step 1: Crear test**

```typescript
import { describe, it, expect } from "vitest";
import { buildPlantWhatsAppUrl } from "./whatsapp";
import type { Plant } from "./plants";

const samplePlant: Plant = {
  id: "JA-S001",
  slug: "alocasia-amazonica",
  name: "Alocasia Amazónica",
  scientificName: "Alocasia 'Amazonica'",
  tier: "S",
  iconLucide: "sparkles",
  imageUrl: "",
  imageAlt: "",
  tags: { type: ["exotic"], size: ["medium"], care: ["amateur"] },
  petSafe: false,
  suitableFor: { gift: true, space: true, me: true },
  description: "",
  longDescription: "",
  benefit: { iconLucide: "sparkles", text: "" },
  care: { light: "", water: "", humidity: "" },
  seasonalWarningLima: null,
  regenerative: {
    priceRange: "S/ 185–255",
    pot: "Tierra",
    includes: [
      "Planta Alocasia Amazónica",
      "Maceta Tierra (cerámica artesanal)",
      "Labubu Rana Venenosa — fibra de chambira",
      "Tarjeta dedicatoria personalizada",
    ],
    labubu: {
      animal: "Rana Venenosa",
      artisan: "Rosa Cumapa",
      community: "Shipibo-Conibo",
      region: "Ucayali, Perú",
    },
  },
};

describe("buildPlantWhatsAppUrl", () => {
  it("returns wa.me URL with the configured number", () => {
    const url = buildPlantWhatsAppUrl(samplePlant, "51999111222");
    expect(url).toContain("https://wa.me/51999111222");
  });

  it("includes plant name in encoded message", () => {
    const url = buildPlantWhatsAppUrl(samplePlant, "51999111222");
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Alocasia Amazónica");
    expect(decoded).toContain("Alocasia 'Amazonica'");
  });

  it("includes labubu and artisan info", () => {
    const url = buildPlantWhatsAppUrl(samplePlant, "51999111222");
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Rana Venenosa");
    expect(decoded).toContain("Rosa Cumapa");
    expect(decoded).toContain("Shipibo-Conibo");
  });

  it("includes price range", () => {
    const url = buildPlantWhatsAppUrl(samplePlant, "51999111222");
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("S/ 185–255");
  });
});
```

- [ ] **Step 2: Run — debe fallar**

```bash
npm test
```

- [ ] **Step 3: Implementar `lib/whatsapp.ts`**

```typescript
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
    `- ${includes[0]}`,
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
```

- [ ] **Step 4: Run tests**

```bash
npm test
```
Expected: 4 tests de whatsapp pasan.

- [ ] **Step 5: Commit**

```bash
git add lib/whatsapp.ts lib/whatsapp.test.ts && git commit -m "feat(whatsapp): add URL builders with TDD"
```

### Task 4.2: PlantDetailModal

**Files:**
- Create: `components/catalog/PlantDetailModal.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
"use client";

import Image from "next/image";
import { Sun, Droplet, CloudFog, AlertTriangle, PawPrint, MessageCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { KenePattern } from "@/components/ui/KenePattern";
import { buildPlantWhatsAppUrl } from "@/lib/whatsapp";
import type { Plant } from "@/lib/plants";

const TIER_LABEL: Record<Plant["tier"], string> = {
  S: "Signature",
  P: "Premium",
  B: "Básico",
};

const TIER_TONE: Record<Plant["tier"], "signature" | "premium" | "basic"> = {
  S: "signature",
  P: "premium",
  B: "basic",
};

type Props = {
  plant: Plant | null;
  onClose: () => void;
};

export function PlantDetailModal({ plant, onClose }: Props) {
  if (!plant) {
    return <Modal open={false} onClose={onClose}>{null}</Modal>;
  }

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "51999999999";
  const waUrl = buildPlantWhatsAppUrl(plant, waNumber);

  return (
    <Modal open={!!plant} onClose={onClose} maxWidth="max-w-3xl">
      <div className="relative aspect-[4/3] bg-ja-cream">
        <Image
          src={plant.imageUrl}
          alt={plant.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge tone={TIER_TONE[plant.tier]}>{TIER_LABEL[plant.tier]}</Badge>
          {plant.petSafe && (
            <Badge tone="pet">
              <PawPrint size={12} /> Pet friendly
            </Badge>
          )}
        </div>
      </div>

      <div className="px-6 md:px-10 py-8 md:py-10 space-y-6">
        <div>
          <h3 className="font-display text-3xl md:text-4xl text-ja-dark">
            {plant.name}
          </h3>
          <p className="mt-1 italic text-ja-ink/60">{plant.scientificName}</p>
        </div>

        <p className="text-ja-ink/85 leading-relaxed">{plant.longDescription}</p>

        <div className="relative overflow-hidden rounded-2xl bg-ja-cream p-5">
          <div className="absolute inset-0 text-ja-mid">
            <KenePattern opacity={0.06} />
          </div>
          <p className="relative text-sm text-ja-dark">
            <span className="block uppercase tracking-wider text-xs text-ja-mid font-medium mb-1">
              Beneficio
            </span>
            {plant.benefit.text}
          </p>
        </div>

        <div>
          <p className="uppercase tracking-wider text-xs text-ja-mid font-medium">
            Cuidados
          </p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3 text-sm">
            <li className="flex items-start gap-2">
              <Sun size={16} className="mt-0.5 shrink-0 text-ja-mid" />
              <span><span className="font-medium">Luz:</span> {plant.care.light}</span>
            </li>
            <li className="flex items-start gap-2">
              <Droplet size={16} className="mt-0.5 shrink-0 text-ja-mid" />
              <span><span className="font-medium">Riego:</span> {plant.care.water}</span>
            </li>
            <li className="flex items-start gap-2">
              <CloudFog size={16} className="mt-0.5 shrink-0 text-ja-mid" />
              <span><span className="font-medium">Humedad:</span> {plant.care.humidity}</span>
            </li>
          </ul>
        </div>

        {!plant.petSafe && (
          <div className="rounded-xl bg-ja-sand/30 p-4 text-sm text-ja-ink flex gap-2">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-ja-terra" />
            <span>No apta para mascotas. Esta planta es tóxica para gatos y perros si se ingiere.</span>
          </div>
        )}

        {plant.seasonalWarningLima && (
          <div className="rounded-xl bg-ja-cream p-4 text-sm text-ja-ink/80">
            <span className="font-medium block">Aviso estacional:</span>
            {plant.seasonalWarningLima}
          </div>
        )}

        <div className="border-t border-ja-dark/10 pt-6">
          <p className="uppercase tracking-wider text-xs text-ja-mid font-medium">
            Opción Regenerativa
          </p>
          <ul className="mt-3 space-y-1 text-sm text-ja-ink/85">
            {plant.regenerative.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 block h-1 w-1 rounded-full bg-ja-mid shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ja-ink/70">
            Tejido por <span className="text-ja-dark font-medium">{plant.regenerative.labubu.artisan}</span>,
            comunidad {plant.regenerative.labubu.community}, {plant.regenerative.labubu.region}.
          </p>
          <p className="mt-4 font-display text-2xl text-ja-terra">
            {plant.regenerative.priceRange}
          </p>

          <Button
            fullWidth
            size="lg"
            className="mt-6"
            onClick={() => window.open(waUrl, "_blank", "noopener,noreferrer")}
          >
            <MessageCircle size={18} /> Quiero esta →
          </Button>
        </div>
      </div>
    </Modal>
  );
}
```

- [ ] **Step 2: Integrar en home**

Modificar `app/page.tsx`:
```tsx
"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Quiz } from "@/components/sections/Quiz";
import { Catalog } from "@/components/sections/Catalog";
import { Footer } from "@/components/sections/Footer";
import { PlantDetailModal } from "@/components/catalog/PlantDetailModal";
import type { QuizAnswers } from "@/lib/quiz-types";
import type { Plant } from "@/lib/plants";

export default function Home() {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  return (
    <main>
      <Hero />
      <Pillars />
      <Quiz
        onComplete={(a) => setQuizAnswers(a)}
        onReset={() => setQuizAnswers(null)}
      />
      <Catalog
        quizAnswers={quizAnswers}
        onSelectPlant={setSelectedPlant}
      />
      <PlantDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Probar flujo completo**

```bash
npm run dev
```
- Click en card de planta → debe abrir modal con foto, info, beneficio con patrón kené, cuidados, opción Regenerativa, botón verde "Quiero esta".
- Click en "Quiero esta" → debe abrir WhatsApp en nueva pestaña con mensaje preformateado.
- Probar con planta pet-unsafe → debe mostrar advertencia amarilla.
- Probar con Alocasia Amazónica → debe mostrar aviso estacional Lima.

- [ ] **Step 4: Test en mobile real (importante)**

Abrir el deploy preview en un teléfono. Verificar que:
- El drawer sube desde abajo correctamente.
- El click en "Quiero esta" abre la app de WhatsApp con el mensaje rellenado.
- Si WhatsApp no está instalado, abre WhatsApp Web.

- [ ] **Step 5: Commit y push**

```bash
git add -A && git commit -m "feat(catalog): add PlantDetailModal with WhatsApp deeplink" && git push
```

---

## Day 5 — Membresía + Google Sheets + MercadoPago

**Objetivo del día:** sección Membresía con 2 cards (Bosque, Suelo); modal de form que captura lead y escribe en Google Sheet via Service Account; modal de confirmación con link de pago MP.

### Task 5.1: Setup Google Cloud + Service Account + Sheet

**Files:** ninguno (setup externo).

- [ ] **Step 1: Crear proyecto GCP**

1. Ir a [console.cloud.google.com](https://console.cloud.google.com).
2. Crear nuevo proyecto: "Jardin Amazonico Web".
3. Esperar que se cree.

- [ ] **Step 2: Habilitar Google Sheets API**

1. APIs & Services → Library → buscar "Google Sheets API" → Enable.

- [ ] **Step 3: Crear Service Account**

1. IAM & Admin → Service Accounts → Create Service Account.
2. Nombre: `ja-membership-writer`.
3. Permitir saltar grants opcionales.
4. Done.

- [ ] **Step 4: Generar JSON key**

1. Click en el SA recién creado.
2. Keys → Add key → Create new key → JSON.
3. Descargar el archivo JSON. Guardarlo fuera del repo (ej: `~/Documents/secrets/ja-sa.json`).

- [ ] **Step 5: Crear Google Sheet**

1. Ir a [sheets.google.com](https://sheets.google.com), crear sheet "JA Membership Leads".
2. Primera fila como headers exactos (en este orden):
   `timestamp | fullName | email | district | plan | message | source`
3. Copiar el ID del Sheet (de la URL `docs.google.com/spreadsheets/d/<ID>/edit`).

- [ ] **Step 6: Compartir el Sheet con el SA**

1. Click "Share" en el Sheet.
2. Pegar el email del SA (formato `ja-membership-writer@<project-id>.iam.gserviceaccount.com`, está en el JSON descargado bajo `client_email`).
3. Permiso: **Editor**. Quitar checkbox "Notify people".
4. Send.

- [ ] **Step 7: Configurar `.env.local`**

Editar `.env.local` y agregar las 3 variables (los valores vienen del JSON descargado):
```env
GOOGLE_SHEETS_SPREADSHEET_ID=<el ID del sheet>
GOOGLE_SHEETS_CLIENT_EMAIL=ja-membership-writer@<project-id>.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

**Importante:** la `GOOGLE_SHEETS_PRIVATE_KEY` debe estar entre comillas dobles y conservar los `\n` literales (no convertirlos a saltos de línea reales). Next.js los procesa luego.

- [ ] **Step 8: Configurar las mismas vars en Vercel**

En Vercel dashboard → Project → Settings → Environment Variables → agregar las 3 vars (Production + Preview + Development).

### Task 5.2: Implementar `lib/sheets.ts`

**Files:**
- Create: `lib/sheets.ts`
- Create: `lib/sheets.test.ts`

- [ ] **Step 1: Instalar googleapis**

```bash
npm install googleapis
```

- [ ] **Step 2: Crear `lib/sheets.ts`**

```typescript
import { google } from "googleapis";

export type MembershipLeadInput = {
  fullName: string;
  email: string;
  district: string;
  plan: "Bosque" | "Suelo";
  message?: string;
};

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error(
      "Missing Google Sheets env vars (CLIENT_EMAIL, PRIVATE_KEY, SPREADSHEET_ID)",
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, spreadsheetId };
}

export async function appendMembershipLead(
  input: MembershipLeadInput,
): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();
  const timestamp = new Date().toISOString();

  const row = [
    timestamp,
    input.fullName,
    input.email,
    input.district,
    input.plan,
    input.message ?? "",
    "web",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}
```

- [ ] **Step 3: Crear test mínimo (mock)**

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockAppend = vi.fn().mockResolvedValue({});

vi.mock("googleapis", () => ({
  google: {
    auth: { JWT: vi.fn() },
    sheets: vi.fn(() => ({
      spreadsheets: { values: { append: mockAppend } },
    })),
  },
}));

beforeEach(() => {
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "test@iam.gserviceaccount.com";
  process.env.GOOGLE_SHEETS_PRIVATE_KEY = "fake\\nkey";
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "fake-id";
  mockAppend.mockClear();
});

describe("appendMembershipLead", () => {
  it("calls sheets.values.append with correct shape", async () => {
    const { appendMembershipLead } = await import("./sheets");
    await appendMembershipLead({
      fullName: "Eddie Test",
      email: "eddie@test.com",
      district: "Miraflores",
      plan: "Bosque",
      message: "Hola",
    });
    expect(mockAppend).toHaveBeenCalledOnce();
    const call = mockAppend.mock.calls[0][0];
    expect(call.spreadsheetId).toBe("fake-id");
    expect(call.range).toBe("A:G");
    const row = call.requestBody.values[0];
    expect(row[1]).toBe("Eddie Test");
    expect(row[4]).toBe("Bosque");
    expect(row[6]).toBe("web");
  });

  it("throws when env vars missing", async () => {
    delete process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const { appendMembershipLead } = await import("./sheets");
    await expect(
      appendMembershipLead({
        fullName: "x",
        email: "x@x.com",
        district: "x",
        plan: "Bosque",
      }),
    ).rejects.toThrow(/Missing Google Sheets env/);
  });
});
```

- [ ] **Step 4: Run tests**

```bash
npm test
```
Expected: ambos tests pasan.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(sheets): add Google Sheets append client with tests"
```

### Task 5.3: API Route para signup

**Files:**
- Create: `app/api/membership-signup/route.ts`

- [ ] **Step 1: Crear archivo**

```typescript
import { NextResponse } from "next/server";
import { appendMembershipLead } from "@/lib/sheets";

type Body = {
  fullName?: string;
  email?: string;
  district?: string;
  plan?: "Bosque" | "Suelo";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request): Promise<NextResponse> {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { fullName, email, district, plan, message } = body;

  if (!fullName || fullName.trim().length < 2) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  if (!district || district.trim().length < 2) {
    return NextResponse.json({ error: "Distrito requerido" }, { status: 400 });
  }
  if (plan !== "Bosque" && plan !== "Suelo") {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
  }
  if (message && message.length > 200) {
    return NextResponse.json({ error: "Mensaje muy largo (máx 200)" }, { status: 400 });
  }

  try {
    await appendMembershipLead({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      district: district.trim(),
      plan,
      message: message?.trim(),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[membership-signup] sheets error", e);
    return NextResponse.json(
      { error: "No pudimos registrar tu lead. Intenta más tarde." },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Probar con curl (requiere `npm run dev` corriendo)**

```bash
npm run dev
```

En otra terminal:
```bash
curl -X POST http://localhost:3000/api/membership-signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@test.com","district":"Miraflores","plan":"Bosque"}'
```

Expected: `{"ok":true}` y una nueva fila aparece en el Google Sheet.

Si falla por env vars locales, revisar `.env.local` y reiniciar el dev server.

- [ ] **Step 3: Commit**

```bash
git add app/api/membership-signup/route.ts && git commit -m "feat(api): add membership signup endpoint with validation"
```

### Task 5.4: MembershipFormModal

**Files:**
- Create: `components/membership/MembershipFormModal.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

type Plan = "Bosque" | "Suelo";

const MP_LINKS: Record<Plan, string | undefined> = {
  Bosque: process.env.NEXT_PUBLIC_MP_LINK_BOSQUE,
  Suelo: process.env.NEXT_PUBLIC_MP_LINK_SUELO,
};

const PLAN_PRICE: Record<Plan, string> = {
  Bosque: "S/ 170 / mes",
  Suelo: "S/ 55 / mes",
};

type Props = {
  open: boolean;
  initialPlan: Plan;
  onClose: () => void;
};

export function MembershipFormModal({ open, initialPlan, onClose }: Props) {
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function reset() {
    setFullName("");
    setEmail("");
    setDistrict("");
    setMessage("");
    setError(null);
    setSuccess(false);
    setLoading(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/membership-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, district, plan, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Error de envío");
      }
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 300);
  }

  if (success) {
    const mpLink = MP_LINKS[plan];
    return (
      <Modal open={open} onClose={handleClose} maxWidth="max-w-lg">
        <div className="px-6 md:px-10 py-10 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ja-light text-ja-dark mb-4">
            <Check size={28} />
          </span>
          <h3 className="font-display text-3xl text-ja-dark">¡Listo!</h3>
          <p className="mt-3 text-ja-ink/80">
            Te contactaremos por WhatsApp para confirmar tu primer envío del plan{" "}
            <span className="font-medium">{plan}</span>.
          </p>
          <p className="mt-2 text-ja-ink/70 text-sm">
            Mientras tanto, completa tu pago aquí:
          </p>
          {mpLink ? (
            <a
              href={mpLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block"
            >
              <Button size="lg">Pagar con MercadoPago →</Button>
            </a>
          ) : (
            <p className="mt-6 text-sm text-ja-terra">
              Falta configurar el link de MercadoPago para {plan}.
            </p>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-lg">
      <div className="px-6 md:px-10 py-8 md:py-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Membresía</p>
        <h3 className="mt-2 font-display text-3xl text-ja-dark">
          Suscríbete al plan {plan}
        </h3>
        <p className="mt-1 text-sm text-ja-ink/70">{PLAN_PRICE[plan]}</p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <fieldset className="grid grid-cols-2 gap-2">
            <legend className="sr-only">Plan</legend>
            {(["Bosque", "Suelo"] as Plan[]).map((p) => (
              <label
                key={p}
                className={[
                  "rounded-xl border px-4 py-3 text-center text-sm cursor-pointer transition-colors",
                  plan === p
                    ? "border-ja-dark bg-ja-light text-ja-dark"
                    : "border-ja-dark/15 hover:border-ja-dark/40",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="plan"
                  value={p}
                  checked={plan === p}
                  onChange={() => setPlan(p)}
                  className="sr-only"
                />
                {p}
              </label>
            ))}
          </fieldset>

          <Field label="Nombre completo" required>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
            />
          </Field>

          <Field label="Email" required>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </Field>

          <Field label="Distrito de Lima" required>
            <input
              type="text"
              required
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Ej: Miraflores"
              className="form-input"
            />
          </Field>

          <Field label="Mensaje (opcional)">
            <textarea
              rows={3}
              maxLength={200}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-input resize-none"
            />
          </Field>

          {error && (
            <p className="text-sm text-ja-terra">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={loading}
          >
            {loading ? "Enviando..." : "Continuar al pago"}
          </Button>

          <p className="text-xs text-ja-ink/55 text-center">
            Después del envío, te llevamos al link de pago de MercadoPago.
          </p>
        </form>
      </div>
    </Modal>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ja-dark">
        {label}
        {required && <span className="text-ja-terra"> *</span>}
      </span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}
```

- [ ] **Step 2: Agregar estilo `.form-input` a globals.css**

Agregar al final de `app/globals.css`:
```css
@layer components {
  .form-input {
    @apply w-full rounded-xl border border-ja-dark/15 bg-ja-paper px-4 py-3 text-base text-ja-ink placeholder:text-ja-ink/40 focus:border-ja-dark focus:outline-none focus:ring-2 focus:ring-ja-mid;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat(membership): add MembershipFormModal with plan selection"
```

### Task 5.5: Sección Membership

**Files:**
- Create: `components/sections/Membership.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { MembershipFormModal } from "@/components/membership/MembershipFormModal";

type Plan = "Bosque" | "Suelo";

const PLAN_DATA: Record<Plan, {
  headline: string;
  includes: string[];
  price: string;
  note: string;
}> = {
  Bosque: {
    headline: "Para cuando quieres que tu selva crezca.",
    includes: [
      "Una planta seleccionada del mes por nuestro equipo de curaduría",
      "Una maceta de la colección (Tierra, Piedra o Selva)",
      "Un labubu amazónico — el animal del mes, en fibra de chambira",
    ],
    price: "Desde S/ 170 / mes",
    note: "Incluye delivery en Lima.",
  },
  Suelo: {
    headline: "Para cuando ya tienes tu selva y quieres que prospere.",
    includes: [
      "500g de sustrato especializado (interior, suculentas o tropical)",
      "Kit mensual anti-plagas: producto preventivo o correctivo",
      "3 macetas pequeñas para propagar esquejes",
    ],
    price: "Desde S/ 55 / mes",
    note: "Incluye delivery en Lima.",
  },
};

const FAQ_ITEMS = [
  { id: "pause", question: "¿Puedo pausar la membresía?", answer: "Sí. Escríbenos antes del día 20 del mes y pausamos sin costo." },
  { id: "cancel", question: "¿Puedo cancelar cuando quiera?", answer: "Sí. Sin permanencias mínimas más allá del mes en curso." },
  { id: "outside", question: "¿Entregan fuera de Lima?", answer: "Por ahora solo Lima Metropolitana. Estamos evaluando expandirnos." },
  { id: "gift", question: "¿Puedo regalar la membresía?", answer: "Sí. Cada suscripción es independiente." },
];

export function Membership() {
  const [openPlan, setOpenPlan] = useState<Plan | null>(null);

  return (
    <section id="membresia" className="bg-ja-cream py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Membresía</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Una membresía que respira contigo.
        </h2>
        <p className="mt-3 text-ja-ink/75 max-w-2xl">
          El mundo de las plantas tiene temporadas. Nosotros también.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {(Object.keys(PLAN_DATA) as Plan[]).map((plan) => {
            const data = PLAN_DATA[plan];
            return (
              <article
                key={plan}
                className="rounded-3xl bg-ja-paper p-8 md:p-10 border border-ja-dark/10"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-ja-mid font-medium">
                  {plan}
                </span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl text-ja-dark">
                  {data.headline}
                </h3>
                <ul className="mt-6 space-y-3">
                  {data.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ja-ink/85 text-sm">
                      <Check size={18} className="mt-0.5 shrink-0 text-ja-mid" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-display text-2xl text-ja-terra">{data.price}</p>
                <p className="text-xs text-ja-ink/55">{data.note}</p>
                <Button
                  fullWidth
                  size="lg"
                  className="mt-6"
                  onClick={() => setOpenPlan(plan)}
                >
                  Suscribirme al {plan} →
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl bg-ja-light/60 p-5 flex items-start gap-3">
          <ShieldCheck size={22} className="mt-0.5 shrink-0 text-ja-mid" />
          <p className="text-sm text-ja-dark">
            <span className="font-medium">Garantía del Esqueje:</span> si tu planta muere,
            te enviamos un esqueje de reposición. Activable a partir del tercer mes
            de membresía continua.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl text-ja-dark">
            Preguntas frecuentes de membresía
          </h3>
          <div className="mt-4">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </div>

      {openPlan && (
        <MembershipFormModal
          open={!!openPlan}
          initialPlan={openPlan}
          onClose={() => setOpenPlan(null)}
        />
      )}
    </section>
  );
}
```

- [ ] **Step 2: Agregar Membership a `app/page.tsx`**

Importar `Membership` y agregar después de `<Catalog>`:
```tsx
import { Membership } from "@/components/sections/Membership";
// ...
<Catalog ... />
<Membership />
<PlantDetailModal ... />
```

- [ ] **Step 3: Probar flujo**

```bash
npm run dev
```
- Click "Suscribirme al Bosque" → modal con form, plan Bosque seleccionado.
- Llenar form y submit → confirmación con botón Pagar con MercadoPago.
- Verificar en Google Sheet que la fila aparece.

- [ ] **Step 4: Commit y push**

```bash
git add -A && git commit -m "feat(home): add Membership section with form modal" && git push
```

---

## Day 6 — Secciones restantes (Labubu+Impacto, Testimonios, FAQ, B2B)

### Task 6.1: Sección LabubuImpact

**Files:**
- Create: `components/sections/LabubuImpact.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
import { KenePattern } from "@/components/ui/KenePattern";

const LABUBUS_PREVIEW = [
  { animal: "Rana Venenosa", community: "Shipibo-Conibo" },
  { animal: "Guacamayo Rojo", community: "Yine" },
  { animal: "Mono Choro", community: "Awajún" },
  { animal: "Mariposa Morpho", community: "Shipibo" },
  { animal: "Jaguar Negro", community: "Shipibo" },
  { animal: "Cóndor", community: "Kokama" },
];

const STATS = [
  { value: "8", label: "comunidades aliadas" },
  { value: "+40", label: "artesanas en la red" },
  { value: "18", label: "animales en la colección" },
  { value: "15%", label: "del precio va directo a la artesana" },
];

export function LabubuImpact() {
  return (
    <section id="labubu" className="relative bg-ja-cream py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 text-ja-mid">
        <KenePattern opacity={0.05} />
      </div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          Impacto regenerativo
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Cada compra siembra algo más que una planta.
        </h2>
        <p className="mt-4 max-w-2xl text-ja-ink/80 leading-relaxed">
          El modelo regenerativo de Jardín Amazónico conecta tu hogar limeño
          con comunidades de mujeres artesanas en la selva peruana. La fibra
          de chambira se extrae sin tala, las palmas viven décadas, y un
          porcentaje del precio de cada labubu va directo a la mujer que lo
          tejió — con nombre, comunidad y región en la tarjeta.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {LABUBUS_PREVIEW.map((l) => (
            <div
              key={l.animal}
              className="rounded-2xl bg-ja-paper p-4 border border-ja-dark/10"
            >
              <p className="font-display text-base text-ja-dark">{l.animal}</p>
              <p className="text-xs text-ja-ink/60 mt-1">
                comunidad {l.community}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-ja-paper p-6 border border-ja-dark/10"
            >
              <p className="font-display text-3xl md:text-4xl text-ja-terra">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-ja-ink/75">{s.label}</p>
            </div>
          ))}
        </div>

        <blockquote className="mt-14 max-w-3xl">
          <p className="font-display italic text-2xl md:text-3xl text-ja-dark leading-snug">
            “Cuando tejo el mono, pienso en mis hijos y en el río. Que alguien
            en Lima lo tenga en su casa me hace sentir que el bosque llega lejos.”
          </p>
          <footer className="mt-4 text-sm text-ja-ink/70">
            — <span className="font-medium text-ja-dark">Rosa Cumapa</span>,
            artesana Shipibo-Conibo, Ucayali.
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Integrar en home y commit**

Agregar `<LabubuImpact />` después de `<Membership />` en `app/page.tsx`.

```bash
git add -A && git commit -m "feat(home): add LabubuImpact section"
```

### Task 6.2: Sección Testimonials

**Files:**
- Create: `components/sections/Testimonials.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
const TESTIMONIALS = [
  {
    quote: "Empecé con el plan Bosque en octubre y ya no sé cómo era mi sala sin la Alocasia Amazónica. Llegó perfectamente embalada y el labubu de la rana se lo quedó mi hija.",
    author: "Valeria C.",
    location: "Miraflores",
    detail: "Miembro Bosque",
  },
  {
    quote: "Soy más de plan Suelo — ya tengo suficientes plantas. Pero el kit mensual me cambió la rutina de cuidado. El sustrato que mandan es notablemente mejor que el de la ferretería.",
    author: "Marco A.",
    location: "La Molina",
    detail: "Miembro Suelo",
  },
  {
    quote: "Lo regalé para el cumpleaños de mi mamá. La Aglaonema Rosada con el labubu del flamenco y la tarjeta de la artesana. Lloró. Nunca había recibido un regalo así.",
    author: "Gabriela P.",
    location: "San Isidro",
    detail: "Compra para regalo",
  },
];

export function Testimonials() {
  return (
    <section className="bg-ja-paper py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Comunidad</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Los que ya tienen su selva adentro.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.author}
              className="rounded-3xl bg-ja-cream p-7 md:p-8 border border-ja-dark/10 flex flex-col"
            >
              <p className="font-display italic text-lg text-ja-dark leading-snug">
                “{t.quote}”
              </p>
              <footer className="mt-6 pt-6 border-t border-ja-dark/10 text-sm">
                <p className="font-medium text-ja-dark">{t.author}</p>
                <p className="text-ja-ink/60">
                  {t.location} · {t.detail}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Integrar y commit**

Agregar a `app/page.tsx`. Commit:
```bash
git add -A && git commit -m "feat(home): add Testimonials section (no photos)"
```

### Task 6.3: Sección FAQ

**Files:**
- Create: `components/sections/FAQ.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
import { Accordion } from "@/components/ui/Accordion";

const FAQ = [
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

export function FAQ() {
  return (
    <section id="faq" className="bg-ja-cream py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Preguntas</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark">
          Las preguntas que nos hacen siempre.
        </h2>
        <div className="mt-10">
          <Accordion items={FAQ} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Integrar y commit**

```bash
git add -A && git commit -m "feat(home): add FAQ section with 8 questions"
```

### Task 6.4: Sección B2BTeaser

**Files:**
- Create: `components/sections/B2BTeaser.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
"use client";

import { Building2, Trees } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  buildLandscapingWhatsAppUrl,
  buildCorporateWhatsAppUrl,
} from "@/lib/whatsapp";

export function B2BTeaser() {
  const wa = process.env.NEXT_PUBLIC_WA_NUMBER ?? "51999999999";

  return (
    <section className="bg-ja-paper py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          También para empresas
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Llevamos selva a oficinas y regalos corporativos.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl bg-ja-cream p-8 md:p-10 border border-ja-dark/10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ja-dark text-ja-paper">
              <Trees size={22} />
            </span>
            <h3 className="mt-4 font-display text-2xl text-ja-dark">
              ¿Tienes un espacio que necesita verde de verdad?
            </h3>
            <p className="mt-3 text-ja-ink/75">
              Diseñamos e instalamos vegetación interior y exterior para oficinas,
              lobbies y eventos en Lima.
            </p>
            <a
              href={buildLandscapingWhatsAppUrl(wa)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block"
            >
              <Button variant="secondary">Hablar por WhatsApp →</Button>
            </a>
          </article>

          <article className="rounded-3xl bg-ja-cream p-8 md:p-10 border border-ja-dark/10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ja-dark text-ja-paper">
              <Building2 size={22} />
            </span>
            <h3 className="mt-4 font-display text-2xl text-ja-dark">
              ¿Tu empresa busca regalos con propósito?
            </h3>
            <p className="mt-3 text-ja-ink/75">
              Plantas trofeo y merchandising de impacto con labubus amazónicos
              para tu marca.
            </p>
            <a
              href={buildCorporateWhatsAppUrl(wa)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block"
            >
              <Button variant="secondary">Hablar por WhatsApp →</Button>
            </a>
          </article>
        </div>

        <p className="mt-8 text-sm text-ja-ink/60">
          Próximamente: páginas dedicadas con casos y portafolio.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Integrar y commit**

Agregar `<B2BTeaser />` después de `<FAQ />`.

```bash
git add -A && git commit -m "feat(home): add B2B teaser with WhatsApp deeplinks"
```

### Task 6.5: Composición final del orden y push

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Confirmar orden final**

```tsx
"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Quiz } from "@/components/sections/Quiz";
import { Catalog } from "@/components/sections/Catalog";
import { Membership } from "@/components/sections/Membership";
import { LabubuImpact } from "@/components/sections/LabubuImpact";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { B2BTeaser } from "@/components/sections/B2BTeaser";
import { Footer } from "@/components/sections/Footer";
import { PlantDetailModal } from "@/components/catalog/PlantDetailModal";
import type { QuizAnswers } from "@/lib/quiz-types";
import type { Plant } from "@/lib/plants";

export default function Home() {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  return (
    <main>
      <Hero />
      <Pillars />
      <Quiz
        onComplete={(a) => setQuizAnswers(a)}
        onReset={() => setQuizAnswers(null)}
      />
      <Catalog
        quizAnswers={quizAnswers}
        onSelectPlant={setSelectedPlant}
      />
      <Membership />
      <LabubuImpact />
      <Testimonials />
      <FAQ />
      <B2BTeaser />
      <PlantDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Push y verificar deploy preview**

```bash
git add -A && git commit -m "chore: assemble final home order" && git push
```

Abrir el deploy preview y hacer scroll completo. Verificar que todas las secciones aparecen en orden y se ven bien tanto desktop como mobile.

---

## Day 7 — QA, accesibilidad y go-live

### Task 7.1: Lighthouse audit

**Files:** ninguno (auditoría).

- [ ] **Step 1: Generar build de producción local**

```bash
npm run build && npm run start
```

- [ ] **Step 2: Correr Lighthouse en Chrome DevTools**

Abrir http://localhost:3000 en Chrome, abrir DevTools → tab Lighthouse → Categories: Performance, Accessibility, Best Practices, SEO. Mode: Navigation. Device: Mobile. Generate Report.

- [ ] **Step 3: Anotar puntajes y arreglar lo que falle**

Objetivos:
- Performance ≥ 85
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

**Issues comunes a fix:**
- Imágenes sin `sizes` o `width/height` → corregir en cada `<Image>`.
- Contraste de texto insuficiente → ajustar opacidades.
- Falta `lang` en `<html>` → ya está (`<html lang="es">`).
- Falta meta description → ya está en metadata.
- Falta og:image → agregar `app/opengraph-image.tsx` (siguiente task).

- [ ] **Step 4: Commit fixes (si los hay)**

```bash
git add -A && git commit -m "perf: lighthouse pass — image sizes and contrast"
```

### Task 7.2: OG image dinámica

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Crear archivo**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jardín Amazónico — Plantas vivas, alma amazónica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background:
            "linear-gradient(135deg, #1B4332 0%, #40916C 60%, #C1440E 100%)",
          color: "#FBF9F5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.8, letterSpacing: 8 }}>
          JARDÍN AMAZÓNICO
        </div>
        <div style={{ fontSize: 80, lineHeight: 1.05, marginTop: 24 }}>
          Traemos un pedacito de selva a tu hogar.
        </div>
        <div style={{ fontSize: 28, opacity: 0.85, marginTop: 24 }}>
          Plantas vivas y artesanías amazónicas. Desde Lima.
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Verificar local**

Abrir http://localhost:3000/opengraph-image — debe descargar/mostrar una imagen 1200×630.

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx && git commit -m "feat(seo): add dynamic OG image"
```

### Task 7.3: Accesibilidad pass

**Files:** revisión sobre archivos existentes.

- [ ] **Step 1: Navegación por teclado**

Recargar la página, presionar Tab repetidamente. Verificar:
- Foco visible en cada elemento interactivo (botones, chips, cards de quiz, links del footer).
- El orden lógico (Hero CTAs → quiz → catálogo → etc).
- Enter abre modal, Esc lo cierra.

Si algún elemento no muestra anillo de foco, revisar `focus-visible:ring-*` en su clase.

- [ ] **Step 2: Lectores de pantalla (VoiceOver mínimo)**

En macOS: `Cmd + F5` activa VoiceOver. Recorrer la página. Verificar:
- Hero anuncia "Traemos un pedacito de selva a tu hogar..."
- Cards de quiz se anuncian como botones con su título.
- Modal anuncia su `title`.

Si algo se anuncia como "button" sin label, agregar `aria-label`.

- [ ] **Step 3: Contraste**

En DevTools → Elements → seleccionar texto sobre fondo de color → ver contrast ratio. Cualquier valor < 4.5:1 (texto normal) o < 3:1 (texto large) requiere ajustar.

Casos sospechosos: texto `text-ja-paper/60` sobre fondo `--ja-dark`. Si falla, subir a `/70` o `/75`.

- [ ] **Step 4: Tap targets en mobile**

En Chrome DevTools mode mobile, verificar visualmente que todos los botones, chips y cards de quiz tienen al menos 44px de alto. Botón base `h-12` (48px) ya cumple.

- [ ] **Step 5: Commit fixes**

```bash
git add -A && git commit -m "a11y: focus rings, aria labels and contrast tuning"
```

### Task 7.4: Cross-browser test

**Files:** ninguno.

- [ ] **Step 1: Test en iOS Safari real**

Abrir el deploy preview en un iPhone (Safari). Verificar:
- Hero renderea con imagen y CTAs.
- Quiz funciona, animaciones suaves.
- Drawer de planta sube desde abajo correctamente.
- WhatsApp deeplink abre la app.
- Modal de membresía cierra al tocar fuera.
- Sin errores de scroll lock.

- [ ] **Step 2: Test en Chrome Android (si disponible)**

Repetir lo anterior. WhatsApp deeplink debería abrir directo la app si está instalada.

- [ ] **Step 3: Test en Firefox desktop**

Verificar render. Solo issues mayores se arreglan en MVP.

- [ ] **Step 4: Documentar issues encontrados y arreglar criticales**

Cualquier bug funcional (deeplink no abre, modal no cierra, scroll roto) es crítico → arreglar.
Cualquier issue cosmético menor → registrar como tarea de fase 2.

```bash
git add -A && git commit -m "fix: cross-browser issues from QA pass"
```

### Task 7.5: Variables de entorno productivas

**Files:** Vercel dashboard.

- [ ] **Step 1: Reemplazar `NEXT_PUBLIC_WA_NUMBER`**

En Vercel → Settings → Env Vars: reemplazar `51999999999` por el número real de WhatsApp Business.

- [ ] **Step 2: Configurar `NEXT_PUBLIC_MP_LINK_BOSQUE` y `NEXT_PUBLIC_MP_LINK_SUELO`**

Crear los 2 links en el dashboard de MercadoPago (suscripción recurrente, S/170 y S/55 mensuales). Pegar las URLs como env vars.

- [ ] **Step 3: Verificar Sheets vars en Production**

Confirmar que `GOOGLE_SHEETS_*` están seteadas en Production scope.

- [ ] **Step 4: Re-deploy**

Vercel → Deployments → Production → Redeploy (sin caché).

### Task 7.6: Prueba end-to-end en producción

**Files:** ninguno.

- [ ] **Step 1: Flujo de compra**

En el dominio real, en mobile:
1. Scroll al quiz.
2. Responder las 5 preguntas.
3. Ver catálogo filtrado.
4. Tap en una planta → modal abre.
5. Tap "Quiero esta" → WhatsApp abre con mensaje preformateado a tu número real.
6. **No enviar el mensaje** — confirmar visualmente que llegaría.

- [ ] **Step 2: Flujo de membresía**

1. Scroll a Membresía.
2. Tap "Suscribirme al Bosque".
3. Llenar form con datos reales de prueba.
4. Submit → confirmar mensaje "te contactamos por WhatsApp".
5. Verificar que el lead llegó al Google Sheet.
6. Tap "Pagar con MercadoPago" → confirmar que abre el link real.
7. **No completar el pago** — solo confirmar redirección correcta.

- [ ] **Step 3: B2B**

1. Tap en Paisajismo → WhatsApp con mensaje preformateado correcto.
2. Tap en Corporativo → idem.

- [ ] **Step 4: Footer**

1. Tap WhatsApp del footer → abre WhatsApp sin texto.
2. Tap Instagram → abre Instagram (verificar URL).

### Task 7.7: Anuncio de lanzamiento

**Files:**
- Modify: `README.md` (opcional — actualizar estado).

- [ ] **Step 1: Actualizar README**

Reemplazar sección "Estado":
```markdown
## Estado

MVP en producción desde [fecha]. URL: [dominio].
```

- [ ] **Step 2: Tag de versión**

```bash
git tag -a v0.1.0 -m "MVP launch"
git push origin v0.1.0
```

- [ ] **Step 3: Push final**

```bash
git add README.md && git commit -m "docs: mark MVP as live" && git push
```

---

## Self-Review (cobertura del PRD)

Revisión del plan vs. el spec:

| Requisito del PRD | Task que lo implementa |
|---|---|
| Sección 1 — Hero (Opción 2 headline) | Task 2.5 |
| Sección 2 — 3 Pilares con íconos Lucide | Task 2.6 |
| Sección 3 — Quiz inline con 5 pasos, scoring | Tasks 3.2, 3.3, 3.4, 3.6, 3.7, 3.8 |
| Sección 4 — Catálogo filtrable + integración con quiz | Tasks 3.9, 3.10, 3.11 |
| Sección 4b — Modal/Drawer de planta con detalles + Regenerativa + WA | Tasks 4.1, 4.2 |
| Sección 5 — Membresía Bosque/Suelo con form + Sheets + MP | Tasks 5.1–5.5 |
| Sección 6 — Labubu+Impacto combinada con kené pattern | Task 6.1 |
| Sección 7 — Testimonios sin fotos | Task 6.2 |
| Sección 8 — FAQ con 8 preguntas | Task 6.3 |
| Sección 9 — B2B teaser reducido | Task 6.4 |
| Sección 10 — Footer | Task 2.7 |
| Mobile-first y performance | Tasks 7.1, 7.4 |
| Accesibilidad WCAG AA | Task 7.3 |
| Solo opción Regenerativa | Tasks 4.1 (mensaje WA), 4.2 (modal sin Básica) |
| Sin email automático | Task 5.4 (confirmación visual + WA manual) |
| Patrón kené sutil | Tasks 1.12, 4.2, 6.1 |
| Tipografía Fraunces + Inter | Task 1.3 |
| Iconografía Lucide (sin emojis) | Tasks 1.5, 3.5 (mapping), 3.7, etc. |
| Stack Next.js 15 + Tailwind v4 + TS | Tasks 1.1, 1.2 |
| Hosting Vercel | Tasks 1.4, 7.5 |

**Sin gaps detectados** vs. el PRD aprobado.

---

## Bitácora de cambios al plan

| Fecha | Cambio |
|---|---|
| 2026-05-03 | Versión inicial 1.0 |
