import { ComponentPropsWithoutRef, forwardRef } from "react";

type Variant = "primary" | "primary-dark" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "btn-kene-light text-ja-darker border border-ja-darker/15 hover:border-ja-darker/35 focus-visible:ring-ja-mid",
  "primary-dark":
    "btn-kene-dark text-ja-paper border border-ja-paper/15 hover:border-ja-paper/35 focus-visible:ring-ja-paper",
  secondary:
    "bg-transparent text-ja-dark border border-ja-dark hover:bg-ja-dark hover:text-ja-paper focus-visible:ring-ja-dark",
  ghost:
    "bg-transparent text-ja-dark hover:bg-ja-light focus-visible:ring-ja-mid",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "h-11 px-4 text-sm",
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
    { variant = "primary", size = "md", fullWidth, className = "", children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={[
          "relative inline-flex items-center justify-center rounded-lg font-medium tracking-[0.01em]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ja-paper",
          "disabled:opacity-40 disabled:pointer-events-none",
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          fullWidth ? "w-full" : "",
          className,
        ].join(" ")}
        {...props}
      >
        {variant === "primary" || variant === "primary-dark" ? (
          <span className="relative z-10 inline-flex items-center gap-2 bg-inherit px-3 py-0.5 rounded-lg">
            {children}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">{children}</span>
        )}
      </button>
    );
  },
);
