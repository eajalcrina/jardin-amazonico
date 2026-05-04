"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Check, MessageCircle } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CorporateCheckoutModal({ open, onClose }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "51914401895";
  const waCommunity = process.env.NEXT_PUBLIC_WA_COMMUNITY_LINK ?? "";

  useEffect(() => {
    if (open) {
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setError(null);
      setSuccess(false);
      setLoading(false);
    }
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/corporate-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, message }),
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

  if (success) {
    const waMessage =
      "Estoy interesado en las plantas como merch";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
    return (
      <Modal open={open} onClose={onClose} maxWidth="max-w-lg" title="Datos recibidos">
        <div className="px-6 md:px-10 py-10 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ja-light text-ja-dark mb-4">
            <Check size={28} />
          </span>
          <h3 className="font-display text-3xl text-ja-dark">¡Datos recibidos!</h3>
          <p className="mt-3 text-ja-ink/80">
            Continúa por WhatsApp para conversar sobre tu propuesta corporativa.
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
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg" title="Cuéntanos sobre tu necesidad">
      <div className="px-6 md:px-10 py-8 md:py-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">
          Plantas trofeo / Merchandising
        </p>
        <h3 className="mt-2 font-display text-3xl text-ja-dark">
          Cuéntanos sobre tu necesidad
        </h3>
        <p className="mt-1 text-sm text-ja-ink/70">
          Respondemos en menos de 24 horas con una propuesta inicial.
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

          <Field label="Sobre tu necesidad (opcional)">
            <textarea
              rows={3}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Cantidad, ocasión, presupuesto referencial…"
              className="form-input resize-none"
            />
          </Field>

          {error && <p className="text-sm text-ja-terra">{error}</p>}

          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? "Enviando..." : "Continuar a WhatsApp"}
          </Button>

          <p className="text-xs text-ja-ink/55 text-center">
            Después del envío, te llevamos al WhatsApp para conversar.
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
