"use client";

import { useState } from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import { LucideIcon, PawPrint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [showInfo, setShowInfo] = useState(false);

  const BenefitIcon = (Icons[
    plant.benefit.iconLucide
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("") as keyof typeof Icons
  ] ?? Icons.Leaf) as LucideIcon;

  const priceFrom =
    plant.regenerative.priceRange.split("–")[0]?.trim() ??
    plant.regenerative.priceRange;

  return (
    <article className="group flex flex-col rounded-3xl bg-ja-paper border border-ja-dark/10 overflow-hidden transition-shadow hover:shadow-lg">
      <button
        type="button"
        onClick={() => setShowInfo((v) => !v)}
        aria-expanded={showInfo}
        aria-label={showInfo ? `Ocultar info de ${plant.name}` : `Ver info de ${plant.name}`}
        className="relative aspect-[4/5] overflow-hidden bg-ja-cream w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid"
      >
        <Image
          src={plant.images[0] ?? ""}
          alt={plant.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge tone={TIER_TONE[plant.tier]}>{TIER_LABEL[plant.tier]}</Badge>
          {plant.petSafe && (
            <Badge tone="pet">
              <PawPrint size={12} /> Pet friendly
            </Badge>
          )}
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 bg-ja-paper/95 backdrop-blur-sm p-5 text-left"
            >
              <h3 className="font-display text-lg text-ja-dark">{plant.name}</h3>
              <p className="text-xs italic text-ja-ink/60">{plant.scientificName}</p>
              <p className="mt-2 text-sm font-medium text-ja-terra">
                Desde {priceFrom}
              </p>
              <p className="mt-2 flex items-start gap-2 text-xs text-ja-ink/75">
                <BenefitIcon size={14} className="mt-0.5 shrink-0 text-ja-mid" />
                <span className="line-clamp-2">{plant.benefit.text}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div className="p-4">
        <Button
          fullWidth
          size="sm"
          onClick={() => onSelect(plant)}
        >
          Me gusta →
        </Button>
      </div>
    </article>
  );
}
