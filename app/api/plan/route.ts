import { NextResponse } from "next/server";
import { plannerSchema } from "@/lib/planner-schema";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = plannerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) }, { status: 400 });
  }

  const enquiry = { ...parsed.data, receivedAt: new Date().toISOString() };
  console.log("[plan-your-trip] new enquiry", JSON.stringify(enquiry, null, 2));

  // TODO: email/CRM integration, e.g.
  //  - send an internal notification + an auto-reply to the traveller (Resend / Postmark / SendGrid)
  //  - create a lead/deal in the CRM (HubSpot / Pipedrive / Zoho) and assign a specialist
  //  - optionally post to a Slack/Teams channel for the sales team

  return NextResponse.json({ ok: true });
}
