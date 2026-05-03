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
        "group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid",
        selected
          ? "border-ja-dark bg-ja-light shadow-sm"
          : "border-ja-dark/15 bg-ja-paper hover:border-ja-dark/40 hover:bg-ja-cream",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
          selected ? "bg-ja-dark text-ja-paper" : "bg-ja-cream text-ja-dark",
        ].join(" ")}
      >
        <Icon size={20} />
      </span>
      <span className="font-display text-lg text-ja-dark">{title}</span>
      <span className="text-sm text-ja-ink/70">{description}</span>
    </button>
  );
}
