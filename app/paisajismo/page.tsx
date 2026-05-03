"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronLeft, Trees, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { KeneDivider } from "@/components/ui/KeneDivider";
import { Footer } from "@/components/sections/Footer";
import { LandscapingCheckoutModal } from "@/components/paisajismo/LandscapingCheckoutModal";
import { ProjectCarousel, type CarouselProject } from "@/components/paisajismo/ProjectCarousel";

const RESIDENTIAL_PROJECTS: CarouselProject[] = [
  { n: "I", title: "Casa Verde · I", type: "Residencial", location: "Miraflores", year: "2025", image: "/images/paisajismo/casa-verde-1.jpg" },
  { n: "II", title: "Casa Verde · II", type: "Residencial", location: "Barranco", year: "2025", image: "/images/paisajismo/casa-verde-2.jpg" },
  { n: "III", title: "Casa Verde · III", type: "Residencial", location: "La Molina", year: "2024", image: "/images/paisajismo/casa-verde-3.jpg" },
  { n: "IV", title: "Casa Verde · IV", type: "Residencial", location: "San Isidro", year: "2024", image: "/images/paisajismo/casa-verde-4.jpg" },
];

const CORPORATE_PROJECTS: CarouselProject[] = [
  { n: "I", title: "Oficina Verde · I", type: "Corporativo", location: "San Isidro", year: "2025", image: "/images/paisajismo/oficina-verde-1.jpg" },
  { n: "II", title: "Oficina Verde · II", type: "Corporativo", location: "Miraflores", year: "2024", image: "/images/paisajismo/oficina-verde-2.jpg" },
  { n: "III", title: "Oficina Verde · III", type: "Corporativo", location: "San Isidro", year: "2024", image: "/images/paisajismo/oficina-verde-3.jpg" },
  { n: "IV", title: "Oficina Verde · IV", type: "Corporativo", location: "San Isidro", year: "2024", image: "/images/paisajismo/oficina-verde-4.jpg" },
  { n: "V", title: "Oficina Verde · V", type: "Corporativo", location: "Miraflores", year: "2023", image: "/images/paisajismo/oficina-verde-5.jpg" },
  { n: "VI", title: "Oficina Verde · VI", type: "Corporativo", location: "La Molina", year: "2023", image: "/images/paisajismo/oficina-verde-6.jpg" },
];

const SERVICES = [
  {
    icon: Trees,
    title: "Residencial",
    body: "Jardines, balcones, terrazas y espacios interiores. Diseño botánico para casas y departamentos.",
  },
  {
    icon: Building2,
    title: "Corporativo",
    body: "Oficinas, lobbies, salas de reunión y espacios de coworking. Vegetación que retiene talento.",
  },
  {
    icon: Sparkles,
    title: "Eventos & activaciones",
    body: "Instalaciones temporales con plantas vivas para lanzamientos, premiaciones y experiencias de marca.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Conversación inicial",
    body: "Nos cuentas el espacio, el presupuesto y la atmósfera que buscas. Sin compromiso, por WhatsApp o videollamada.",
  },
  {
    n: "02",
    title: "Visita y evaluación",
    body: "Diagnóstico in situ de luz, orientación, flujo de personas y arquitectura del espacio.",
  },
  {
    n: "03",
    title: "Propuesta de diseño",
    body: "Selección de especies, propuesta de macetas y layout. Mockups visuales si el proyecto lo amerita.",
  },
  {
    n: "04",
    title: "Instalación profesional",
    body: "Coordinamos fechas, transporte e instalación. Proyectos pequeños en 1 día; grandes en 2–3.",
  },
  {
    n: "05",
    title: "Mantenimiento mensual",
    body: "Visitas técnicas opcionales para asegurar que el verde dure — no solo que llegue.",
  },
];

export default function PaisajismoPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <main>
      {/* Top bar with back link */}
      <div className="bg-ja-paper border-b border-ja-dark/10">
        <div className="container mx-auto px-6 max-w-6xl h-14 flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ja-ink/70 hover:text-ja-dark transition-colors"
          >
            <ChevronLeft size={16} />
            Jardín Amazónico
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ja-darker text-ja-paper">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/paisajismo/casa-verde-1.jpg"
            alt="Proyecto residencial Jardín Amazónico"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(0.85) brightness(0.55)" }}
          />
        </div>
        <div className="container mx-auto px-6 max-w-6xl py-24 md:py-36">
          <p className="text-xs uppercase tracking-[0.25em] text-ja-light/85">
            Paisajismo / Interiores
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-7xl leading-[1.05] max-w-4xl text-ja-paper">
            El verde no decora.
            <span className="block text-ja-light/95 mt-2 md:mt-4">Habita.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-ja-paper/85 leading-relaxed">
            Diseñamos e instalamos paisajismo y vegetación de interiores para
            residencias, oficinas y proyectos especiales en Lima.
          </p>
          <div className="mt-8">
            <Button
              variant="primary-dark"
              size="lg"
              onClick={() => setCheckoutOpen(true)}
            >
              Conversemos sobre tu proyecto →
            </Button>
          </div>
        </div>
      </section>

      <div className="bg-ja-cream py-3 text-ja-mid">
        <KeneDivider opacity={0.5} />
      </div>

      {/* Services strip */}
      <section className="bg-ja-cream py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Estudio</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
            Tres tipologías de proyecto.
          </h2>
          <p className="mt-3 text-ja-ink/75 max-w-2xl">
            Cada espacio tiene su lenguaje. Trabajamos en tres escalas y siempre
            con la planta correcta para las condiciones reales del lugar.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
            {SERVICES.map(({ icon: Icon, title, body }) => (
              <article key={title} className="flex flex-col gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ja-dark text-ja-paper">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-xl md:text-2xl text-ja-dark">
                  {title}
                </h3>
                <p className="text-ja-ink/75 leading-relaxed text-sm">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio — Casa Verde carousel */}
      <div id="portafolio">
        <ProjectCarousel
          projects={RESIDENTIAL_PROJECTS}
          eyebrow="Portafolio · Residencial"
          headline="Casa Verde."
          intro="Cuatro residencias donde el verde se integra a la arquitectura del hogar."
        />
      </div>

      {/* Portfolio — Oficina Verde carousel */}
      <ProjectCarousel
        projects={CORPORATE_PROJECTS}
        eyebrow="Portafolio · Corporativo"
        headline="Oficina Verde."
        intro="Seis intervenciones en oficinas, lobbies y espacios de trabajo en Lima."
      />

      <div className="bg-ja-cream py-3 text-ja-mid">
        <KeneDivider opacity={0.5} />
      </div>

      {/* Process */}
      <section className="bg-ja-cream py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Proceso</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
            Cómo trabajamos contigo.
          </h2>

          <ol className="mt-12 space-y-10 md:space-y-12">
            {PROCESS.map((step) => (
              <li key={step.n} className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-12">
                <span className="font-display text-5xl md:text-6xl text-ja-mid leading-none">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-ja-dark">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-ja-ink/80 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-ja-darker text-ja-paper overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl py-20 md:py-28 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-ja-light/80">
            Próximo proyecto
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-6xl text-ja-paper max-w-3xl mx-auto leading-tight">
            Cuéntanos sobre tu espacio.
          </h2>
          <p className="mt-4 text-ja-paper/85 max-w-xl mx-auto">
            Respondemos en menos de 24 horas con una propuesta inicial. Visita y
            diagnóstico sin costo para proyectos a partir de S/ 5,000.
          </p>
          <div className="mt-8 inline-flex">
            <Button
              variant="primary-dark"
              size="lg"
              onClick={() => setCheckoutOpen(true)}
            >
              Iniciar conversación <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <LandscapingCheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </main>
  );
}
