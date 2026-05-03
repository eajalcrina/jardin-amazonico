import { Accordion } from "@/components/ui/Accordion";

const FAQ_ITEMS = [
  {
    id: "origen",
    question: "¿De dónde vienen las plantas?",
    answer: "Trabajamos con viveros especializados que cultivan bajo prácticas responsables. Ninguna planta es extraída de manera silvestre del bosque. Cada especie de origen amazónico (como el Filodendro Gloriosum o el Anturio Cristalino) proviene de propagación en vivero, no de extracción del bosque.",
  },
  {
    id: "protegidas",
    question: "¿Trabajan con especies protegidas o en peligro?",
    answer: "No. Nuestro catálogo está compuesto solo por especies cultivadas y comercializadas legalmente. Las plantas de origen amazónico provienen de propagación en vivero, no de extracción del bosque.",
  },
  {
    id: "chambira",
    question: "¿Cómo se garantiza el origen responsable de la chambira?",
    answer: "La fibra de chambira (Astrocaryum chambira) se extrae sin tala — solo se cosechan las hojas tiernas. Una palma puede producir fibra por más de 30 años. Trabajamos directamente con artesanas de comunidades que practican esta técnica ancestral.",
  },
  {
    id: "artesana",
    question: "¿Cuánto recibe la artesana de cada labubu?",
    answer: "Un porcentaje significativo del precio Regenerativa (objetivo 15%) va directamente a la artesana, sin intermediarios. Las artesanas fijan el precio de su trabajo; nosotros lo aceptamos.",
  },
  {
    id: "envios",
    question: "¿Hacen envíos fuera de Lima?",
    answer: "Por ahora solo Lima Metropolitana. Estamos evaluando expandirnos.",
  },
  {
    id: "garantia",
    question: "¿Qué pasa si mi planta se enferma o muere?",
    answer: "Si eres miembro activo de Bosque o Suelo con 3 o más meses de suscripción continua, te enviamos un esqueje de reposición sin costo (Garantía del Esqueje). Para compras puntuales fuera de membresía, ofrecemos asesoría de cuidado pero no reposición.",
  },
  {
    id: "mascotas",
    question: "¿Las plantas son seguras para mis mascotas?",
    answer: "Algunas sí, otras no. Cada ficha de planta lo indica claramente con un badge \"Pet friendly\". Si tienes mascotas, el cuestionario filtra automáticamente solo opciones seguras.",
  },
  {
    id: "cancelar",
    question: "¿Puedo cancelar la membresía cuando quiera?",
    answer: "Sí. Sin permanencias mínimas. Avisas antes del día 20 del mes y pausamos o cancelamos sin costo.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-ja-cream py-20 md:py-28">
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
