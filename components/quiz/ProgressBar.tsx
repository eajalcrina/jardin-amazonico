type ProgressBarProps = {
  total: number;
  current: number;
};

export function ProgressBar({ total, current }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Paso ${current} de ${total}`}
      className="flex gap-2"
    >
      {Array.from({ length: total }).map((_, i) => {
        const status =
          i < current ? "done" : i === current ? "active" : "pending";
        const cls =
          status === "done"
            ? "bg-ja-dark"
            : status === "active"
              ? "bg-ja-terra"
              : "bg-ja-dark/15";
        return (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${cls} transition-colors`}
          />
        );
      })}
    </div>
  );
}
