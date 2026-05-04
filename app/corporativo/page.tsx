"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronLeft, Trophy, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { KeneDivider } from "@/components/ui/KeneDivider";
import { Footer } from "@/components/sections/Footer";
import { CorporateCheckoutModal } from "@/components/corporativo/CorporateCheckoutModal";
import { ProjectCarousel, type CarouselProject } from "@/components/paisajismo/ProjectCarousel";

const TROFEO_PROJECTS: CarouselProject[] = [
  { n: "I", title: "Planta Trofeo · I", type: "Reconocimiento", location: "Lima", year: "2025", image: "/images/corporativo/planta-trofeo-1.jpg" },
  { n: "II", title: "Planta Trofeo · II", type: "Reconocimiento", location: "Lima", year: "2024", image: "/images/corporativo/planta-trofeo-2.jpg" },
  { n: "III", title: "Planta Trofeo · III", type: "Reconocimiento", location: "Lima", year: "2024", image: "/images/corporativo/planta-trofeo-3.jpg" },
];

const MERCH_PROJECTS: CarouselProject[] = [
  { n: "I", title: "Planta Merch · I", type: "Merchandising", location: "Lima", year: "2025", image: "/images/corporativo/planta-merch-1.jpg" },
  { n: "II", title: "Planta Merch · II", type: "Merchandising", location: "Lima", year: "2025", image: "/images/corporativo/planta-merch-2.jpg" },
  { n: "III", title: "Planta Merch · III", type: "Merchandising", location: "Lima", year: "2024", image: "/images/corporativo/planta-merch-3.jpg" },
  { n: "IV", title: "Planta Merch · IV", type: "Merchandising", location: "Lima", year: "2024", image: "/images/corporativo/planta-merch-4.jpg" },
  { n: "V", title: "Planta Merch · V", type: "Merchandising", location: "Lima", year: "2024", image: "/images/corporativo/planta-merch-5.jpg" },
  { n: "VI", title: "Planta Merch · VI", type: "Merchandising", location: "Lima", year: "2023", image: "/images/corporativo/planta-merch-6.jpg" },
  { n: "VII", title: "Planta Merch · VII", type: "Merchandising", location: "Lima", year: "2023", image: "/images/corporativo/planta-merch-7.jpg" },
];

const SERVICES = [
  {
    icon: Trophy,
    title: "Plantas Trofeo",
    body: "Reconocimientos individuales — plantas de colección con grabado de logo, certificado y opción de labubu amazónico.",
  },
  {
    icon: Gift,
    title: "Merchandising de impacto",
    body: "Regalos corporativos a escala — plantas pequeñas + labubu de chambira en packaging con tu marca.",
  },
  {
    icon: Sparkles,
    title: "Personalización completa",
    body: "Logo en maceta, tarjeta dedicatoria, packaging con identidad corporativa. Cada pedido es único.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Briefing inicial",
    body: "Nos cuentas la ocasión, el volumen y la atmósfera que buscas. Sin compromiso, por WhatsApp o videollamada.",
  },
  {
    n: "02",
    title: "Propuesta personalizada",
    body: "Curamos especies, opciones de personalización y referencia visual según tu identidad de marca.",
  },
  {
    n: "03",
    title: "Aprobación y producción",
    body: "Coordinación de plazos. Trofeos individuales en 7–10 días; pedidos masivos según volumen.",
  },
  {
    n: "04",
    title: "Entrega coordinada",
    body: "Envío al lugar y fecha del evento, o despacho centralizado para distribución posterior.",
  },
  {
    n: "05",
    title: "Reporte de impacto",
    body: "Te enviamos un informe con las artesanas que trabajaron en tu pedido y el impacto generado.",
  },
];

export default function CorporativoPage() {
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
            src="/images/corporativo/planta-trofeo-1.jpg"
            alt="Planta trofeo Jardín Amazónico"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(0.85) brightness(0.55)" }}
          />
        </div>
        <div className="container mx-auto px-6 max-w-6xl py-24 md:py-36">
          <p className="text-xs uppercase tracking-[0.25em] text-ja-light/85">
            Corporativo
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-7xl leading-[1.05] max-w-4xl text-ja-paper">
            Reconocimientos que viven.
            <span className="block text-ja-light/95 mt-2 md:mt-4">Regalos que recuerdan.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-ja-paper/85 leading-relaxed">
            Plantas trofeo y merchandising de impacto para empresas que quieren
            reconocer y agradecer con propósito.
          </p>
          <div className="mt-8">
            <Button
              variant="primary-dark"
              size="lg"
              onClick={() => setCheckoutOpen(true)}
            >
              Conversemos sobre tu necesidad →
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
            Tres formatos de propuesta corporativa.
          </h2>
          <p className="mt-3 text-ja-ink/75 max-w-2xl">
            Desde reconocimientos individuales hasta merchandising masivo —
            siempre con narrativa amazónica y opción regenerativa.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
            {SERVICES.map(({ icon: Icon, title, body }) => (
              <article key={title} className="flex flex-col gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ja-dark text-ja-paper">
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

      {/* Portfolio — Planta Trofeo carousel */}
      <div id="portafolio">
        <ProjectCarousel
          projects={TROFEO_PROJECTS}
          eyebrow="Portafolio · Reconocimientos"
          headline="Planta Trofeo."
          intro="Tres reconocimientos diseñados a medida — plantas de colección con grabado y certificado."
        />
      </div>

      {/* Portfolio — Planta Merch carousel */}
      <ProjectCarousel
        projects={MERCH_PROJECTS}
        eyebrow="Portafolio · Merchandising"
        headline="Planta Merch."
        intro="Siete proyectos de merchandising de impacto para campañas, eventos y agradecimientos corporativos."
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
            Próxima campaña
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-6xl text-ja-paper max-w-3xl mx-auto leading-tight">
            Cuéntanos sobre tu necesidad.
          </h2>
          <p className="mt-4 text-ja-paper/85 max-w-xl mx-auto">
            Respondemos en menos de 24 horas con una propuesta inicial. Visita
            comercial sin costo para pedidos de volumen.
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

      <CorporateCheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </main>
  );
}
