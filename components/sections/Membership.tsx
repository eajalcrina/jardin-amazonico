"use client";

import { useState } from "react";
import { Check, MessageCircle, ShieldCheck } from "lucide-react";
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
    headline: "Quiero crear mi colección",
    includes: [
      "Seleccionamos una planta de colección al mes, incluyen las más exóticas",
      "Una maceta de estilo minimalista de buena calidad",
      "Un labubu amazónico — el animal del mes, en fibra de chambira",
      "Aplica para garantía del esqueje",
    ],
    price: "Desde S/ 170 / mes",
    note: "Incluye delivery en Lima.",
  },
  Suelo: {
    headline: "Quiero cuidarlas y replicarlas",
    includes: [
      "Sustrato especializado para tus plantas",
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
  const waCommunity = process.env.NEXT_PUBLIC_WA_COMMUNITY_LINK ?? "";

  return (
    <section id="membresia" className="bg-ja-cream py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Membresía</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Planes de membresía diseñada para coleccionistas de plantas únicas.
        </h2>
        <p className="mt-3 text-ja-ink/75 max-w-2xl">
          Una membresía que respira contigo.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {(Object.keys(PLAN_DATA) as Plan[]).map((plan) => {
            const data = PLAN_DATA[plan];
            return (
              <article
                key={plan}
                className="flex flex-col rounded-xl bg-ja-paper p-8 md:p-10 border border-ja-dark/10"
              >
                <div className="flex-grow">
                  <span className="text-xs uppercase tracking-[0.2em] text-ja-mid font-medium">{plan}</span>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl text-ja-dark">{data.headline}</h3>
                  <ul className="mt-6 space-y-3">
                    {data.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ja-ink/85 text-sm">
                        <Check size={18} className="mt-0.5 shrink-0 text-ja-mid" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <p className="font-display text-2xl text-ja-terra">{data.price}</p>
                  <p className="text-xs text-ja-ink/55">{data.note}</p>
                  <Button
                    fullWidth
                    size="lg"
                    aria-label={`Suscribirme al plan ${plan}`}
                    className="mt-6"
                    onClick={() => setOpenPlan(plan)}
                  >
                    Suscribirme →
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-lg bg-ja-light/60 p-5 flex items-start gap-3">
          <ShieldCheck size={22} className="mt-0.5 shrink-0 text-ja-mid" />
          <p className="text-sm text-ja-dark">
            <span className="font-medium">Garantía del Esqueje:</span> si tu planta muere,
            te enviamos un esqueje de reposición. Activable a partir del tercer mes
            de membresía continua.
          </p>
        </div>

        {waCommunity && (
          <div className="mt-6 rounded-lg bg-ja-paper p-5 border border-ja-dark/10 flex items-start gap-3">
            <MessageCircle size={22} className="mt-0.5 shrink-0 text-ja-mid" />
            <p className="text-sm text-ja-dark">
              <a
                href={waCommunity}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-ja-mid"
              >
                Únete a la comunidad WhatsApp →
              </a>{" "}
              Recibe consejos de cuidado, intercambia esquejes y conecta con otros coleccionistas de plantas.
            </p>
          </div>
        )}

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
