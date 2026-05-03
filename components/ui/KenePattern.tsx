type KenePatternProps = {
  className?: string;
  color?: string;
  opacity?: number;
};

/**
 * Patrón inspirado en geometrías kené Shipibo (líneas finas, simetría axial).
 * Uso decorativo: backgrounds, dividers, badges.
 */
export function KenePattern({
  className = "",
  color = "currentColor",
  opacity = 0.08,
}: KenePatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 240 80"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
    >
      <defs>
        <pattern id="kene" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1">
            <path d="M0 40 L20 20 L40 40 L60 20 L80 40" />
            <path d="M0 60 L20 40 L40 60 L60 40 L80 60" />
            <path d="M0 20 L20 0 L40 20 L60 0 L80 20" />
            <rect x="38" y="38" width="4" height="4" />
            <rect x="18" y="18" width="4" height="4" />
            <rect x="58" y="18" width="4" height="4" />
            <rect x="18" y="58" width="4" height="4" />
            <rect x="58" y="58" width="4" height="4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kene)" />
    </svg>
  );
}
