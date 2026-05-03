type KeneDividerProps = {
  className?: string;
  color?: string;
  opacity?: number;
};

/**
 * Divider horizontal estilo kené — líneas finas con marcadores rítmicos.
 * Para separar secciones con identidad cultural sutil.
 */
export function KeneDivider({
  className = "",
  color = "currentColor",
  opacity = 0.4,
}: KeneDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full h-6 ${className}`}
      style={{ color, opacity }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 240 24"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="kene-h" x="0" y="0" width="60" height="24" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="0.6">
              <line x1="0" y1="6" x2="60" y2="6" />
              <line x1="0" y1="18" x2="60" y2="18" />
              <line x1="0" y1="12" x2="22" y2="12" />
              <line x1="38" y1="12" x2="60" y2="12" />
            </g>
            <rect x="28" y="10" width="4" height="4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kene-h)" />
      </svg>
    </div>
  );
}
