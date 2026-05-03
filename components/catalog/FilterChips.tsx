"use client";

import { Chip } from "@/components/ui/Chip";
import type { PlantType, PlantSize, CareLevel } from "@/lib/plants";

export type CatalogFilters = {
  type?: PlantType;
  size?: PlantSize;
  care?: CareLevel;
  petSafe?: boolean;
};

type FilterChipsProps = {
  value: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  onReset: () => void;
};

const TYPE_OPTIONS: { value: PlantType; label: string }[] = [
  { value: "exotic", label: "Exótica" },
  { value: "indoor", label: "Interior" },
  { value: "outdoor", label: "Exterior" },
  { value: "air", label: "Planta de aire" },
];

const SIZE_OPTIONS: { value: PlantSize; label: string }[] = [
  { value: "small", label: "Pequeña" },
  { value: "medium", label: "Mediana" },
  { value: "large", label: "Grande" },
];

const CARE_OPTIONS: { value: CareLevel; label: string }[] = [
  { value: "none", label: "Casi ningún cuidado" },
  { value: "amateur", label: "Un poco de cuidado" },
  { value: "collector", label: "Entusiasta" },
];

export function FilterChips({ value, onChange, onReset }: FilterChipsProps) {
  function toggle<K extends keyof CatalogFilters>(
    key: K,
    next: CatalogFilters[K],
  ) {
    onChange({
      ...value,
      [key]: value[key] === next ? undefined : next,
    });
  }

  const hasFilters =
    value.type || value.size || value.care || value.petSafe;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {TYPE_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            active={value.type === opt.value}
            onClick={() => toggle("type", opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {SIZE_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            active={value.size === opt.value}
            onClick={() => toggle("size", opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {CARE_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            active={value.care === opt.value}
            onClick={() => toggle("care", opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
        <Chip
          active={!!value.petSafe}
          onClick={() => onChange({ ...value, petSafe: !value.petSafe })}
        >
          Solo Pet friendly
        </Chip>
      </div>
      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-ja-dark underline underline-offset-4"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
