"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { KenePattern } from "@/components/ui/KenePattern";

const LABUBU_PHOTOS = Array.from({ length: 11 }, (_, i) => ({
  src: `/images/labubus/labubu-${i + 1}.jpg`,
  alt: `Labubu amazónico tejido en chambira (${i + 1})`,
}));

const STATS = [
  { value: "8", label: "comunidades aliadas" },
  { value: "+40", label: "artesanas en la red" },
  { value: "18", label: "animales en la colección" },
  { value: "15%", label: "del precio va directo a la artesana" },
];

export function LabubuImpact() {
  // Duplicate the array for a seamless infinite marquee
  const reel = [...LABUBU_PHOTOS, ...LABUBU_PHOTOS];

  return (
    <section id="labubu" className="relative bg-ja-cream py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 text-ja-mid">
        <KenePattern opacity={0.04} />
      </div>

      <div className="relative container mx-auto px-6 max-w-5xl">
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
          tejió.
        </p>
      </div>

      {/* Marquee de fotos: full-bleed, scrolls infinito */}
      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-ja-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-ja-cream to-transparent" />
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {reel.map((photo, idx) => (
            <div
              key={`${photo.src}-${idx}`}
              className="relative h-56 w-44 md:h-72 md:w-56 shrink-0 overflow-hidden rounded-2xl"
              style={{ filter: "saturate(0.85) contrast(1.05) brightness(0.97)" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 11rem, 14rem"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative container mx-auto px-6 max-w-5xl">
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
            &ldquo;Cuando tejo el animal, pienso en mis hijos y en el río. Que alguien en Lima lo tenga en su casa me hace sentir que el bosque llega lejos.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-ja-ink/70">
            — <span className="font-medium text-ja-dark">Francisca J. Orozco Martinez</span>, artesana de la Comunidad Nativa Amazonas, Nauta, Loreto.
          </footer>
        </blockquote>

        <div className="mt-8">
          <a
            href="#faq"
            className="inline-flex items-center gap-2 text-ja-dark font-medium underline underline-offset-4 hover:text-ja-mid"
          >
            Conoce más sobre el modelo regenerativo →
          </a>
        </div>
      </div>
    </section>
  );
}
