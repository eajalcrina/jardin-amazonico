"use client";

import { ComponentPropsWithoutRef } from "react";

export type ChipProps = ComponentPropsWithoutRef<"button"> & {
  active?: boolean;
};

export function Chip({ active, className = "", ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 h-11 text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ja-mid",
        active
          ? "bg-ja-dark text-ja-paper border-ja-dark"
          : "bg-ja-paper text-ja-dark border-ja-dark/15 hover:border-ja-dark/40",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
