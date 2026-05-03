import { NextResponse } from "next/server";
import { appendPlantPurchaseLead } from "@/lib/sheets";

type Body = {
  fullName?: string;
  email?: string;
  phone?: string;
  plantId?: string;
  plantName?: string;
  priceRange?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s()\-]{6,}$/;

export async function POST(req: Request): Promise<NextResponse> {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { fullName, email, phone, plantId, plantName, priceRange } = body;

  if (!fullName || fullName.trim().length < 2) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  if (!phone || !PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "Celular inválido" }, { status: 400 });
  }
  if (!plantId || !plantName || !priceRange) {
    return NextResponse.json({ error: "Datos de planta faltantes" }, { status: 400 });
  }

  try {
    await appendPlantPurchaseLead({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      plantId,
      plantName,
      priceRange,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[plant-purchase-lead] sheets error", e);
    return NextResponse.json(
      { error: "No pudimos registrar tus datos. Intenta más tarde." },
      { status: 500 },
    );
  }
}
