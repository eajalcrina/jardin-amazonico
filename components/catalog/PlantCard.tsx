"use client";

import Image from "next/image";
import { ArrowRight, PawPrint } from "lucide-react";
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

const TIER_PILL: Record<Plant["tier"], string> = {
  S: "bg-ja-gold/95 text-ja-dark",
  P: "bg-ja-mid/95 text-ja-paper",
  B: "bg-ja-paper/85 text-ja-dark",
};

export function PlantCard({ plant, onSelect }: PlantCardProps) {
  const priceFrom =
    plant.regenerative.priceRange.split("–")[0]?.trim() ??
    plant.regenerative.priceRange;

  return (
    <button
      type="button"
      onClick={() => onSelect(plant)}
      aria-label={`Ver detalle de ${plant.name}`}
      className="group relative block w-full text-left rounded-3xl overflow-hidden bg-ja-cream transition-all duration-500 hover:shadow-[0_24px_60px_-25px_rgba(15,42,28,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid focus-visible:ring-offset-2 focus-visible:ring-offset-ja-paper"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={plant.images[0] ?? ""}
          alt={plant.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Top row — tier + pet (right only) */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10">
          <span
            className={[
              "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.1em] font-medium backdrop-blur-sm",
              TIER_PILL[plant.tier],
            ].join(" ")}
          >
            {TIER_LABEL[plant.tier]}
          </span>
          {plant.petSafe && (
            <span
              aria-label="Pet friendly"
              className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-ja-paper/90 text-ja-dark backdrop-blur-sm"
            >
              <PawPrint size={11} />
            </span>
          )}
        </div>

        {/* Bottom pill — clean cloud, image stays crisp */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="bg-ja-paper/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-[0_8px_24px_-12px_rgba(15,42,28,0.35)] flex items-center justify-between gap-3">
            <h3 className="font-display text-sm md:text-base text-ja-dark leading-tight min-w-0 flex-1">
              {plant.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-ja-dark shrink-0 transition-colors group-hover:text-ja-mid">
              Ver
              <ArrowRight
                size={13}
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
