import Link from "next/link";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "51914401895";

export function Footer() {
  return (
    <footer className="bg-ja-dark text-ja-paper">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">Jardín Amazónico</p>
            <p className="mt-2 text-ja-paper/70 text-sm">
              Plantas vivas. Alma amazónica.
            </p>
          </div>

          <nav aria-label="Explora" className="text-sm">
            <p className="font-medium uppercase tracking-wider text-xs text-ja-paper/60">
              Explora
            </p>
            <ul className="mt-4 space-y-2">
              <li><Link href="#quiz" className="hover:text-ja-light">Cuestionario</Link></li>
              <li><Link href="#catalogo" className="hover:text-ja-light">Catálogo</Link></li>
              <li><Link href="#membresia" className="hover:text-ja-light">Membresía</Link></li>
              <li><Link href="#labubu" className="hover:text-ja-light">El Labubu Amazónico</Link></li>
              <li><Link href="#faq" className="hover:text-ja-light">Preguntas frecuentes</Link></li>
            </ul>
          </nav>

          <div className="text-sm">
            <p className="font-medium uppercase tracking-wider text-xs text-ja-paper/60">
              Contacto
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ja-light"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/jardinamazonico"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ja-light"
                >
                  Instagram @jardinamazonico
                </a>
              </li>
            </ul>
            <p className="mt-6 text-ja-paper/60 leading-relaxed">
              Trabajamos solo con plantas cultivadas en vivero. Ninguna proviene
              de extracción silvestre del bosque.
            </p>
          </div>
        </div>

        <p className="mt-12 pt-8 border-t border-ja-paper/15 text-xs text-ja-paper/60">
          © 2026 Jardín Amazónico. Lima, Perú.
        </p>
      </div>
    </footer>
  );
}
