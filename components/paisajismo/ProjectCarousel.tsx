"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselProject = {
  n: string;
  title: string;
  type: string;
  location: string;
  year: string;
  image: string;
};

type Props = {
  projects: CarouselProject[];
  eyebrow: string;
  headline: string;
  intro?: string;
};

export function ProjectCarousel({ projects, eyebrow, headline, intro }: Props) {
  const [idx, setIdx] = useState(0);
  const total = projects.length;

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const current = projects[idx]!;

  return (
    <section className="bg-ja-paper py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          {headline}
        </h2>
        {intro && (
          <p className="mt-3 text-ja-ink/75 max-w-2xl">{intro}</p>
        )}
      </div>

      <div className="mt-10 md:mt-14">
        <div className="container mx-auto px-3 md:px-6 max-w-6xl">
          <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-3xl bg-ja-cream">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ja-ink/35 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-4 left-4 md:bottom-8 md:left-8 max-w-[18rem] md:max-w-sm"
              >
                <div className="rounded-2xl bg-ja-paper p-5 md:p-6 shadow-[0_20px_40px_-20px_rgba(15,42,28,0.45)]">
                  <p className="font-display italic text-sm text-ja-mid">{current.n}</p>
                  <h3 className="mt-1 font-display text-xl md:text-2xl text-ja-dark leading-tight">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-[11px] md:text-xs uppercase tracking-[0.15em] text-ja-ink/60">
                    {current.type} · {current.location} · {current.year}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={prev}
              aria-label="Proyecto anterior"
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ja-paper/85 text-ja-dark hover:bg-ja-paper transition-colors backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente proyecto"
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ja-paper/85 text-ja-dark hover:bg-ja-paper transition-colors backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full bg-ja-paper/85 backdrop-blur-sm px-3 py-1 text-[11px] tracking-[0.15em] uppercase text-ja-ink/70">
              {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2" role="tablist">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === idx}
                aria-label={`Ir al proyecto ${i + 1}`}
                onClick={() => setIdx(i)}
                className={[
                  "h-1.5 rounded-full transition-all duration-300",
                  i === idx
                    ? "w-8 bg-ja-dark"
                    : "w-2 bg-ja-dark/20 hover:bg-ja-dark/40",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
