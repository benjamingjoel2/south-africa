import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  phone: z.string().max(40).optional(),
  subject: z.string().max(120).optional(),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  console.log("[contact] message", parsed.data);
  // TODO: send notification email (e.g. Resend/Postmark) and create a CRM lead.
  return NextResponse.json({ ok: true });
}
