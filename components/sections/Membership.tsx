"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { MembershipFormModal } from "@/components/membership/MembershipFormModal";

type Plan = "Bosque" | "Suelo";

const PLAN_DATA: Record<Plan, {
  headline: string;
  includes: string[];
  price: string;
  note: string;
}> = {
  Bosque: {
    headline: "Para cuando quieres que tu selva crezca.",
    includes: [
      "Una planta seleccionada del mes por nuestro equipo de curaduría",
      "Una maceta de la colección (Tierra, Piedra o Selva)",
      "Un labubu amazónico — el animal del mes, en fibra de chambira",
      "Aplica para garantía del esqueje",
    ],
    price: "Desde S/ 170 / mes",
    note: "Incluye delivery en Lima.",
  },
  Suelo: {
    headline: "Para cuando ya tienes tu selva y quieres que prospere.",
    includes: [
      "1 Kg de sustrato especializado (interior, suculentas o tropical)",
      "Kit mensual de cuidado: nutrientes, control de plagas preventivo y correctivo",
      "3 macetas pequeñas para propagar esquejes",
      "Aplica para garantía del esqueje",
    ],
    price: "Desde S/ 55 / mes",
    note: "Incluye delivery en Lima.",
  },
};

const FAQ_ITEMS = [
  { id: "pause", question: "¿Puedo pausar la membresía?", answer: "Sí. Escríbenos antes del día 20 del mes y pausamos sin costo." },
  { id: "cancel", question: "¿Puedo cancelar cuando quiera?", answer: "Sí. Sin permanencias mínimas más allá del mes en curso." },
  { id: "outside", question: "¿Entregan fuera de Lima?", answer: "Por ahora solo Lima Metropolitana. Estamos evaluando expandirnos." },
  { id: "gift", question: "¿Puedo regalar la membresía?", answer: "Sí. Cada suscripción es independiente." },
];

export function Membership() {
  const [openPlan, setOpenPlan] = useState<Plan | null>(null);

  return (
    <section id="membresia" className="bg-ja-cream py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Membresía</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Una membresía que respira contigo.
        </h2>
        <p className="mt-3 text-ja-ink/75 max-w-2xl">
          El mundo de las plantas tiene temporadas. Nosotros también.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {(Object.keys(PLAN_DATA) as Plan[]).map((plan) => {
            const data = PLAN_DATA[plan];
            return (
              <article
                key={plan}
                className="rounded-3xl bg-ja-paper p-8 md:p-10 border border-ja-dark/10"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-ja-mid font-medium">
                  {plan}
                </span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl text-ja-dark">
                  {data.headline}
                </h3>
                <ul className="mt-6 space-y-3">
                  {data.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ja-ink/85 text-sm">
                      <Check size={18} className="mt-0.5 shrink-0 text-ja-mid" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-display text-2xl text-ja-terra">{data.price}</p>
                <p className="text-xs text-ja-ink/55">{data.note}</p>
                <Button
                  fullWidth
                  size="lg"
                  className="mt-6"
                  onClick={() => setOpenPlan(plan)}
                >
                  Suscribirme al {plan} →
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl bg-ja-light/60 p-5 flex items-start gap-3">
          <ShieldCheck size={22} className="mt-0.5 shrink-0 text-ja-mid" />
          <p className="text-sm text-ja-dark">
            <span className="font-medium">Garantía del Esqueje:</span> si tu planta muere,
            te enviamos un esqueje de reposición. Activable a partir del tercer mes
            de membresía continua.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl text-ja-dark">
            Preguntas frecuentes de membresía
          </h3>
          <div className="mt-4">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </div>

      {openPlan && (
        <MembershipFormModal
          open={!!openPlan}
          initialPlan={openPlan}
          onClose={() => setOpenPlan(null)}
        />
      )}
    </section>
  );
}
