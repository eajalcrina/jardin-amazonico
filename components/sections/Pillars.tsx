import { Leaf, PawPrint, CalendarHeart } from "lucide-react";

const PILLARS = [
  {
    icon: Leaf,
    title: "La planta correcta para tu vida",
    body: "No vendemos plantas al azar. Cada especie está seleccionada por su rareza, su carácter y su historia. Y un cuestionario de cinco preguntas las conecta contigo antes de que lleguen a tu puerta.",
  },
  {
    icon: PawPrint,
    title: "El labubu que viene de la selva",
    body: "Cada compra incluye un labubu amazónico — un animalito tejido en fibra de chambira por artesanas de comunidades indígenas del Perú. Coleccionable, único, con nombre e historia.",
  },
  {
    icon: CalendarHeart,
    title: "Una membresía que te acompaña",
    body: "Elige cada mes: ¿quieres una planta nueva o prefieres cuidar las que tienes? Bosque o Suelo — la membresía se adapta al momento en que estás.",
  },
];

export function Pillars() {
  return (
    <section className="bg-ja-cream py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          Nuestra propuesta
        </p>
        <h2 className="mt-4 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Más que una planta. Una decisión.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <article key={title} className="flex flex-col gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ja-dark text-ja-paper">
                <Icon size={22} />
              </span>
              <h3 className="font-display text-xl md:text-2xl text-ja-dark">
                {title}
              </h3>
              <p className="text-ja-ink/75 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
