"use client";

import { useState } from "react";
import Image from "next/image";
import { Sun, Droplet, CloudFog, AlertTriangle, PawPrint, MessageCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { KenePattern } from "@/components/ui/KenePattern";
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
  onPurchase: (plant: Plant) => void;
};

export function PlantDetailModal({ plant, onClose, onPurchase }: Props) {
  return (
    <Modal
      open={!!plant}
      onClose={onClose}
      maxWidth="max-w-3xl"
      title={plant ? `Detalle de ${plant.name}` : undefined}
    >
      {plant ? <PlantDetailModalBody key={plant.id} plant={plant} onPurchase={onPurchase} /> : null}
    </Modal>
  );
}

function PlantDetailModalBody({ plant, onPurchase }: { plant: Plant; onPurchase: (p: Plant) => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const mainSrc = plant.images[activeIdx] ?? plant.images[0] ?? "";

  return (
    <>
      <div className="relative aspect-[4/3] bg-ja-cream">
        <Image
          key={mainSrc}
          src={mainSrc}
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

      {plant.images.length > 1 && (
        <div className="flex gap-2 px-6 md:px-10 pt-4">
          {plant.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={[
                "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                activeIdx === i ? "border-ja-dark" : "border-transparent hover:border-ja-mid/40",
              ].join(" ")}
              aria-label={`Foto ${i + 1} de ${plant.images.length}`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="px-6 md:px-10 py-8 md:py-10 space-y-6">
        <div>
          <h3 className="font-display text-3xl md:text-4xl text-ja-dark">{plant.name}</h3>
          <p className="mt-1 italic text-ja-ink/60">{plant.scientificName}</p>
        </div>

        <p className="text-ja-ink/85 leading-relaxed">{plant.longDescription}</p>

        <div className="relative overflow-hidden rounded-lg bg-ja-cream p-5">
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
          <p className="uppercase tracking-wider text-xs text-ja-mid font-medium">Cuidados</p>
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
          <div className="rounded-lg bg-ja-sand/30 p-4 text-sm text-ja-ink flex gap-2">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-ja-terra" />
            <span>No apta para mascotas. Esta planta es tóxica para gatos y perros si se ingiere.</span>
          </div>
        )}

        {plant.seasonalWarningLima && (
          <div className="rounded-lg bg-ja-cream p-4 text-sm text-ja-ink/80">
            <span className="font-medium block">Aviso estacional:</span>
            {plant.seasonalWarningLima}
          </div>
        )}

        <div className="border-t border-ja-dark/10 pt-6">
          <p className="uppercase tracking-wider text-xs text-ja-mid font-medium">Opción Regenerativa</p>
          <ul className="mt-3 space-y-1 text-sm text-ja-ink/85">
            <li className="flex items-start gap-2">
              <span className="mt-2 block h-1 w-1 rounded-full bg-ja-mid shrink-0" />
              Planta {plant.name}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 block h-1 w-1 rounded-full bg-ja-mid shrink-0" />
              Maceta minimalista curada
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 block h-1 w-1 rounded-full bg-ja-mid shrink-0" />
              Labubu amazónico de fibra de chambira (sorpresa — el animal del mes)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 block h-1 w-1 rounded-full bg-ja-mid shrink-0" />
              Tarjeta de agradecimiento de la artesana
            </li>
          </ul>

          <p className="mt-4 text-sm text-ja-ink/70">
            El envío se realizará en un plazo de 24 a 48 horas en Lima Metropolitana.
          </p>

          <p className="mt-4 font-display text-2xl text-ja-terra">{plant.regenerative.priceRange}</p>

          <Button
            fullWidth
            size="lg"
            className="mt-6"
            onClick={() => onPurchase(plant)}
          >
            <MessageCircle size={18} /> ¡La quiero! →
          </Button>
        </div>
      </div>
    </>
  );
}
