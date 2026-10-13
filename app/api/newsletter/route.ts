import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.email(), source: z.string().max(60).optional() });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  console.log("[newsletter] signup", parsed.data);
  // TODO: add to email platform (e.g. Mailchimp/Klaviyo/Brevo) and send the guide PDF.
  return NextResponse.json({ ok: true });
}
