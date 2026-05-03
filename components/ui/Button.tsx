import { ComponentPropsWithoutRef, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-ja-dark text-ja-paper hover:bg-ja-mid focus-visible:ring-ja-mid",
  secondary:
    "bg-transparent text-ja-dark border border-ja-dark hover:bg-ja-dark hover:text-ja-paper focus-visible:ring-ja-dark",
  ghost:
    "bg-transparent text-ja-dark hover:bg-ja-light focus-visible:ring-ja-mid",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-base",
};

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", fullWidth, className = "", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ja-paper",
          "disabled:opacity-40 disabled:pointer-events-none",
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          fullWidth ? "w-full" : "",
          className,
        ].join(" ")}
        {...props}
      />
    );
  },
);
