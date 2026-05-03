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
        style={{ filter: "saturate(0.9) brightness(0.92)" }}
      />
      {/* Doble overlay: vignette + bottom darken para asegurar contraste con tipografía */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ja-ink/30 via-ja-ink/55 to-ja-ink/85" />

      <div className="container mx-auto px-6 pb-16 md:pb-24 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-light/90">
          Jardín Amazónico
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ja-paper md:text-7xl md:max-w-3xl">
          Traemos un pedacito de selva a tu hogar.
          <span className="block text-ja-light/90 mt-3 md:mt-4">
            Para proteger a las manos que la sostienen.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-ja-paper/90 leading-relaxed">
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
