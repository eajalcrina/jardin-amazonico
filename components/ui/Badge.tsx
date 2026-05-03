import { ComponentPropsWithoutRef } from "react";

type Tone = "neutral" | "signature" | "premium" | "basic" | "pet" | "warning";

const TONE_STYLES: Record<Tone, string> = {
  neutral: "bg-ja-light text-ja-dark",
  signature: "bg-ja-gold text-ja-dark",
  premium: "bg-ja-mid text-ja-paper",
  basic: "bg-ja-light text-ja-dark",
  pet: "bg-ja-light text-ja-dark border border-ja-mid/30",
  warning: "bg-ja-sand text-ja-ink",
};

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: Tone;
};

export function Badge({
  tone = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        TONE_STYLES[tone],
        className,
      ].join(" ")}
      {...props}
    />
  );
}
