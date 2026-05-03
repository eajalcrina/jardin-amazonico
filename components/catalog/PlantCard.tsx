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
          src={plant.images[0] ?? ""}
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
          Desde {plant.regenerative.priceRange.split("–")[0]?.replace("S/", "S/").trim() ?? plant.regenerative.priceRange}
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
