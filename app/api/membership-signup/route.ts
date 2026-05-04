import { NextResponse } from "next/server";
import { appendMembershipLead } from "@/lib/sheets";

type Body = {
  fullName?: string;
  email?: string;
  phone?: string;
  district?: string;
  plan?: "Bosque" | "Suelo";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,19}$/;

export async function POST(req: Request): Promise<NextResponse> {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { fullName, email, phone, district, plan, message } = body;

  if (!fullName || fullName.trim().length < 2) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  if (!phone || !PHONE_RE.test(phone.trim())) {
    return NextResponse.json({ error: "Celular inválido" }, { status: 400 });
  }
  if (!district || district.trim().length < 2) {
    return NextResponse.json({ error: "Distrito requerido" }, { status: 400 });
  }
  if (plan !== "Bosque" && plan !== "Suelo") {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
  }
  if (message && message.length > 200) {
    return NextResponse.json({ error: "Mensaje muy largo (máx 200)" }, { status: 400 });
  }

  try {
    await appendMembershipLead({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone!.trim(),
      district: district.trim(),
      plan,
      message: message?.trim(),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[membership-signup] sheets error", e);
    return NextResponse.json(
      { error: "No pudimos registrar tu lead. Intenta más tarde." },
      { status: 500 },
    );
  }
}
