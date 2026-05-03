"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Check, MessageCircle } from "lucide-react";
import { buildPlantWhatsAppUrl } from "@/lib/whatsapp";
import type { Plant } from "@/lib/plants";

type Props = {
  plant: Plant | null;
  onClose: () => void;
};

export function PlantCheckoutModal({ plant, onClose }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "51999999999";
  const waCommunity = process.env.NEXT_PUBLIC_WA_COMMUNITY_LINK ?? "";

  // Reset state when plant changes (next purchase)
  useEffect(() => {
    if (plant) {
      setFullName("");
      setEmail("");
      setPhone("");
      setError(null);
      setSuccess(false);
      setLoading(false);
    }
  }, [plant?.id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!plant) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/plant-purchase-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          plantId: plant.id,
          plantName: plant.name,
          priceRange: plant.regenerative.priceRange,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Error de envío");
      }
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!plant) {
    return <Modal open={false} onClose={onClose}>{null}</Modal>;
  }

  const titleText = `Compra personalizada — ${plant.name}`;

  if (success) {
    const waUrl = buildPlantWhatsAppUrl(plant, waNumber);
    return (
      <Modal open onClose={onClose} maxWidth="max-w-lg" title={titleText}>
        <div className="px-6 md:px-10 py-10 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ja-light text-ja-dark mb-4">
            <Check size={28} />
          </span>
          <h3 className="font-display text-3xl text-ja-dark">¡Datos recibidos!</h3>
          <p className="mt-3 text-ja-ink/80">
            Continúa por WhatsApp para coordinar la entrega y completar tu compra de{" "}
            <span className="font-medium">{plant.name}</span>.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block"
          >
            <Button size="lg">
              <MessageCircle size={18} /> Continuar por WhatsApp →
            </Button>
          </a>
          {waCommunity && (
            <a
              href={waCommunity}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block text-sm text-ja-dark hover:text-ja-mid underline underline-offset-4"
            >
              Únete a la comunidad WhatsApp para consejos, esquejes y más →
            </a>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <Modal open onClose={onClose} maxWidth="max-w-lg" title={titleText}>
      <div className="px-6 md:px-10 py-8 md:py-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Compra personalizada</p>
        <h3 className="mt-2 font-display text-3xl text-ja-dark">{plant.name}</h3>
        <p className="mt-1 text-sm text-ja-ink/70">
          {plant.regenerative.priceRange} · Envío 24–48 h en Lima
        </p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <Field label="Nombre y apellido" required>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
            />
          </Field>

          <Field label="Email" required>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </Field>

          <Field label="Celular" required>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: +51 999 999 999"
              className="form-input"
            />
          </Field>

          {error && <p className="text-sm text-ja-terra">{error}</p>}

          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? "Enviando..." : "Continuar a WhatsApp"}
          </Button>

          <p className="text-xs text-ja-ink/55 text-center">
            Después del envío, te llevamos al WhatsApp para coordinar tu compra.
          </p>
        </form>
      </div>
    </Modal>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ja-dark">
        {label}
        {required && <span className="text-ja-terra"> *</span>}
      </span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}
