"use client";

import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

type OptionCardProps = {
  iconLucide: string;
  title: string;
  description: string;
  selected?: boolean;
  onClick: () => void;
};

export function OptionCard({
  iconLucide,
  title,
  description,
  selected,
  onClick,
}: OptionCardProps) {
  const Icon = (Icons[
    iconLucide
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("") as keyof typeof Icons
  ] ?? Icons.Leaf) as LucideIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "group relative flex flex-col items-start gap-2 rounded-lg border p-3.5 text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid",
        selected
          ? "border-ja-dark bg-ja-light"
          : "border-ja-dark/15 bg-ja-paper hover:border-ja-dark/40 hover:bg-ja-cream",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors",
          selected ? "bg-ja-dark text-ja-paper" : "bg-ja-cream text-ja-dark",
        ].join(" ")}
      >
        <Icon size={16} />
      </span>
      <span className="font-display text-base text-ja-dark leading-tight">{title}</span>
      <span className="text-xs text-ja-ink/70 leading-snug">{description}</span>
    </button>
  );
}
