import { KenePattern } from "@/components/ui/KenePattern";

const LABUBUS_PREVIEW = [
  { animal: "Rana Venenosa", community: "Shipibo-Conibo" },
  { animal: "Guacamayo Rojo", community: "Yine" },
  { animal: "Mono Choro", community: "Awajún" },
  { animal: "Mariposa Morpho", community: "Shipibo" },
  { animal: "Jaguar Negro", community: "Shipibo" },
  { animal: "Cóndor", community: "Kokama" },
];

const STATS = [
  { value: "8", label: "comunidades aliadas" },
  { value: "+40", label: "artesanas en la red" },
  { value: "18", label: "animales en la colección" },
  { value: "15%", label: "del precio va directo a la artesana" },
];

export function LabubuImpact() {
  return (
    <section id="labubu" className="relative bg-ja-cream py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 text-ja-mid">
        <KenePattern opacity={0.05} />
      </div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          Impacto regenerativo
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Cada compra siembra algo más que una planta.
        </h2>
        <p className="mt-4 max-w-2xl text-ja-ink/80 leading-relaxed">
          El modelo regenerativo de Jardín Amazónico conecta tu hogar limeño
          con comunidades de mujeres artesanas en la selva peruana. La fibra
          de chambira se extrae sin tala, las palmas viven décadas, y un
          porcentaje del precio de cada labubu va directo a la mujer que lo
          tejió — con nombre, comunidad y región en la tarjeta.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {LABUBUS_PREVIEW.map((l) => (
            <div
              key={l.animal}
              className="rounded-2xl bg-ja-paper p-4 border border-ja-dark/10"
            >
              <p className="font-display text-base text-ja-dark">{l.animal}</p>
              <p className="text-xs text-ja-ink/60 mt-1">
                comunidad {l.community}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-ja-paper p-6 border border-ja-dark/10"
            >
              <p className="font-display text-3xl md:text-4xl text-ja-terra">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-ja-ink/75">{s.label}</p>
            </div>
          ))}
        </div>

        <blockquote className="mt-14 max-w-3xl">
          <p className="font-display italic text-2xl md:text-3xl text-ja-dark leading-snug">
            &ldquo;Cuando tejo el mono, pienso en mis hijos y en el río. Que alguien
            en Lima lo tenga en su casa me hace sentir que el bosque llega lejos.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-ja-ink/70">
            — <span className="font-medium text-ja-dark">Rosa Cumapa</span>,
            artesana Shipibo-Conibo, Ucayali.
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
