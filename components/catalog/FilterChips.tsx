"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import type { PlantType, PlantSize, CareLevel } from "@/lib/plants";

export type CatalogFilters = {
  type?: PlantType;
  size?: PlantSize;
  care?: CareLevel;
  petSafe?: boolean;
};

type Props = {
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
  { value: "none", label: "Casi ninguno" },
  { value: "amateur", label: "Un poco" },
  { value: "collector", label: "Entusiasta" },
];

export function FilterChips({ value, onChange, onReset }: Props) {
  const hasFilters =
    !!value.type || !!value.size || !!value.care || !!value.petSafe;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="uppercase tracking-wider text-xs text-ja-mid mr-1">
        Filtrar:
      </span>

      <FilterDropdown
        label="Tipo"
        value={value.type}
        options={TYPE_OPTIONS}
        onChange={(v) => onChange({ ...value, type: v })}
      />
      <FilterDropdown
        label="Tamaño"
        value={value.size}
        options={SIZE_OPTIONS}
        onChange={(v) => onChange({ ...value, size: v })}
      />
      <FilterDropdown
        label="Cuidado"
        value={value.care}
        options={CARE_OPTIONS}
        onChange={(v) => onChange({ ...value, care: v })}
      />

      <button
        type="button"
        onClick={() => onChange({ ...value, petSafe: !value.petSafe })}
        aria-pressed={!!value.petSafe}
        className={[
          "inline-flex items-center h-9 px-3 rounded-full border text-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid",
          value.petSafe
            ? "bg-ja-dark text-ja-paper border-ja-dark"
            : "bg-ja-paper text-ja-dark border-ja-dark/15 hover:border-ja-dark/40",
        ].join(" ")}
      >
        Pet friendly
      </button>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 h-9 px-2 text-xs text-ja-ink/60 hover:text-ja-dark transition-colors"
        >
          <X size={12} /> Limpiar
        </button>
      )}
    </div>
  );
}

function FilterDropdown<V extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: V | undefined;
  options: { value: V; label: string }[];
  onChange: (next: V | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const currentLabel = value
    ? options.find((o) => o.value === value)?.label ?? label
    : label;

  const isActive = value !== undefined;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={[
          "inline-flex items-center gap-1 h-9 px-3 rounded-full border text-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid",
          isActive
            ? "bg-ja-dark text-ja-paper border-ja-dark"
            : "bg-ja-paper text-ja-dark border-ja-dark/15 hover:border-ja-dark/40",
        ].join(" ")}
      >
        {currentLabel}
        <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-30 mt-1 left-0 min-w-44 rounded-xl border border-ja-dark/10 bg-ja-paper shadow-lg overflow-hidden"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value === value ? undefined : opt.value);
                setOpen(false);
              }}
              className={[
                "w-full text-left px-4 py-2.5 text-sm transition-colors",
                opt.value === value
                  ? "bg-ja-light text-ja-dark font-medium"
                  : "text-ja-ink hover:bg-ja-cream",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
