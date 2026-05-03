const TESTIMONIALS = [
  {
    quote: "Empecé con el plan Bosque en octubre y ya no sé cómo era mi sala sin la Alocasia Amazónica. Llegó perfectamente embalada y el labubu de la rana se lo quedó mi hija.",
    author: "Valeria C.",
    location: "Miraflores",
    detail: "Miembro Bosque",
  },
  {
    quote: "Soy más de plan Suelo — ya tengo suficientes plantas. Pero el kit mensual me cambió la rutina de cuidado. El sustrato que mandan es notablemente mejor que el de la ferretería.",
    author: "Marco A.",
    location: "La Molina",
    detail: "Miembro Suelo",
  },
  {
    quote: "Lo regalé para el cumpleaños de mi mamá. La Aglaonema Rosada con el labubu del flamenco y la tarjeta de la artesana. Lloró. Nunca había recibido un regalo así.",
    author: "Gabriela P.",
    location: "San Isidro",
    detail: "Compra para regalo",
  },
];

export function Testimonials() {
  return (
    <section className="bg-ja-paper py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Comunidad</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Los que ya tienen su selva adentro.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.author}
              className="rounded-3xl bg-ja-cream p-7 md:p-8 border border-ja-dark/10 flex flex-col"
            >
              <p className="font-display italic text-lg text-ja-dark leading-snug">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 pt-6 border-t border-ja-dark/10 text-sm">
                <p className="font-medium text-ja-dark">{t.author}</p>
                <p className="text-ja-ink/60">
                  {t.location} · {t.detail}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
