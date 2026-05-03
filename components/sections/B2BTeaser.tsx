"use client";

import Link from "next/link";
import { Building2, Trees } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildCorporateWhatsAppUrl } from "@/lib/whatsapp";

export function B2BTeaser() {
  const wa = process.env.NEXT_PUBLIC_WA_NUMBER ?? "51999999999";

  return (
    <section className="bg-ja-paper py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          También para empresas
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl text-ja-dark max-w-3xl">
          Llevamos selva a oficinas y regalos corporativos.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl bg-ja-cream p-8 md:p-10 border border-ja-dark/10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ja-dark text-ja-paper">
              <Trees size={22} />
            </span>
            <h3 className="mt-4 font-display text-2xl text-ja-dark">
              ¿Tienes un espacio que necesita verde de verdad?
            </h3>
            <p className="mt-3 text-ja-ink/75">
              Diseñamos e instalamos vegetación interior y exterior para oficinas,
              lobbies y eventos en Lima.
            </p>
            <Link href="/paisajismo" className="mt-6 inline-block">
              <Button variant="secondary">Ver portafolio y conversar →</Button>
            </Link>
          </article>

          <article className="rounded-3xl bg-ja-cream p-8 md:p-10 border border-ja-dark/10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ja-dark text-ja-paper">
              <Building2 size={22} />
            </span>
            <h3 className="mt-4 font-display text-2xl text-ja-dark">
              ¿Tu empresa busca regalos con propósito?
            </h3>
            <p className="mt-3 text-ja-ink/75">
              Plantas trofeo y merchandising de impacto con labubus amazónicos
              para tu marca.
            </p>
            <a
              href={buildCorporateWhatsAppUrl(wa)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block"
            >
              <Button variant="secondary">Hablar por WhatsApp →</Button>
            </a>
          </article>
        </div>

        <p className="mt-8 text-sm text-ja-ink/60">
          Próximamente: páginas dedicadas con casos y portafolio.
        </p>
      </div>
    </section>
  );
}
