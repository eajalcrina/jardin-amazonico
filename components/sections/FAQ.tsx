import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/faq-data";

export function FAQ() {
  return (
    <section id="faq" className="bg-ja-cream py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Preguntas</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark">
          Las preguntas que nos hacen siempre.
        </h2>
        <div className="mt-10">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
}
