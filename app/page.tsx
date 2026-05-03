import { Pillars } from "@/components/sections/Pillars";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <section className="min-h-svh flex items-center justify-center bg-ja-cream">
        <div className="text-center px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
            Jardín Amazónico
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl text-ja-dark">
            Próximamente
          </h1>
          <p className="mt-4 text-ja-ink/70 max-w-md mx-auto">
            Estamos sembrando algo nuevo. Vuelve pronto.
          </p>
        </div>
      </section>
      <Pillars />
      <Footer />
    </main>
  );
}
