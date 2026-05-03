"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ROTATION_IMAGES = [
  "/images/general-1.jpg",
  "/images/general-2.jpg",
  "/images/general-3.jpg",
  "/images/general-4.jpg",
  "/images/general-5.jpg",
  "/images/general-6.jpg",
  "/images/general-7.jpg",
  "/images/general-8.jpg",
];

const ROTATE_INTERVAL_MS = 8000;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const waCommunity = process.env.NEXT_PUBLIC_WA_COMMUNITY_LINK ?? "";

  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % ROTATION_IMAGES.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, [reduceMotion]);

  return (
    <section
      id="hero"
      className="relative isolate min-h-[88svh] flex items-end overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        {ROTATION_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{
              opacity: i === idx ? 1 : 0,
              filter: "saturate(0.85) brightness(0.88)",
            }}
          >
            <Image
              src={src}
              alt=""
              aria-hidden={i !== idx}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-ja-darker) 40%, transparent) 0%, color-mix(in oklab, var(--color-ja-darker) 65%, transparent) 50%, color-mix(in oklab, var(--color-ja-darker) 92%, transparent) 100%)",
        }}
      />

      <div className="container mx-auto px-6 pb-16 md:pb-24 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-light/90">
          Jardín Amazónico
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ja-paper md:text-7xl md:max-w-3xl">
          Traemos un pedacito de selva a tu hogar.
          <span className="block text-ja-light/95 mt-3 md:mt-4">
            Para proteger a las manos que la sostienen.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-ja-paper/90 leading-relaxed">
          Plantas vivas de colección y artesanías amazónicas, conectadas con
          comunidades indígenas peruanas. Desde Lima.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="#catalogo">
            <Button variant="primary-dark" size="lg" fullWidth className="sm:w-auto">
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
              Súmate a la membresía
            </Button>
          </Link>
        </div>

        {waCommunity && (
          <a
            href={waCommunity}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-ja-light/85 hover:text-ja-paper underline underline-offset-4"
          >
            <MessageCircle size={14} />
            Únete a la comunidad WhatsApp para consejos, esquejes y más →
          </a>
        )}
      </div>
    </section>
  );
}
