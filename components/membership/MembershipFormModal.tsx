"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

type Plan = "Bosque" | "Suelo";

const MP_LINKS: Record<Plan, string | undefined> = {
  Bosque: process.env.NEXT_PUBLIC_MP_LINK_BOSQUE,
  Suelo: process.env.NEXT_PUBLIC_MP_LINK_SUELO,
};

const PLAN_PRICE: Record<Plan, string> = {
  Bosque: "S/ 170 / mes",
  Suelo: "S/ 55 / mes",
};

type Props = {
  open: boolean;
  initialPlan: Plan;
  onClose: () => void;
};

export function MembershipFormModal({ open, initialPlan, onClose }: Props) {
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function reset() {
    setFullName("");
    setEmail("");
    setDistrict("");
    setMessage("");
    setError(null);
    setSuccess(false);
    setLoading(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/membership-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, district, plan, message }),
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

  function handleClose() {
    onClose();
    setTimeout(reset, 300);
  }

  if (success) {
    const mpLink = MP_LINKS[plan];
    return (
      <Modal open={open} onClose={handleClose} maxWidth="max-w-lg">
        <div className="px-6 md:px-10 py-10 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ja-light text-ja-dark mb-4">
            <Check size={28} />
          </span>
          <h3 className="font-display text-3xl text-ja-dark">¡Listo!</h3>
          <p className="mt-3 text-ja-ink/80">
            Te contactaremos por WhatsApp para confirmar tu primer envío del plan{" "}
            <span className="font-medium">{plan}</span>.
          </p>
          <p className="mt-2 text-ja-ink/70 text-sm">
            Mientras tanto, completa tu pago aquí:
          </p>
          {mpLink ? (
            <a
              href={mpLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block"
            >
              <Button size="lg">Pagar con MercadoPago →</Button>
            </a>
          ) : (
            <p className="mt-6 text-sm text-ja-terra">
              Falta configurar el link de MercadoPago para {plan}.
            </p>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-lg">
      <div className="px-6 md:px-10 py-8 md:py-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ja-mid">Membresía</p>
        <h3 className="mt-2 font-display text-3xl text-ja-dark">
          Suscríbete al plan {plan}
        </h3>
        <p className="mt-1 text-sm text-ja-ink/70">{PLAN_PRICE[plan]}</p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <fieldset className="grid grid-cols-2 gap-2">
            <legend className="sr-only">Plan</legend>
            {(["Bosque", "Suelo"] as Plan[]).map((p) => (
              <label
                key={p}
                className={[
                  "rounded-xl border px-4 py-3 text-center text-sm cursor-pointer transition-colors",
                  plan === p
                    ? "border-ja-dark bg-ja-light text-ja-dark"
                    : "border-ja-dark/15 hover:border-ja-dark/40",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="plan"
                  value={p}
                  checked={plan === p}
                  onChange={() => setPlan(p)}
                  className="sr-only"
                />
                {p}
              </label>
            ))}
          </fieldset>

          <Field label="Nombre completo" required>
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

          <Field label="Distrito de Lima" required>
            <input
              type="text"
              required
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Ej: Miraflores"
              className="form-input"
            />
          </Field>

          <Field label="Mensaje (opcional)">
            <textarea
              rows={3}
              maxLength={200}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-input resize-none"
            />
          </Field>

          {error && (
            <p className="text-sm text-ja-terra">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={loading}
          >
            {loading ? "Enviando..." : "Continuar al pago"}
          </Button>

          <p className="text-xs text-ja-ink/55 text-center">
            Después del envío, te llevamos al link de pago de MercadoPago.
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
