import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK =
  process.env.N8N_FREE_REPORT_WEBHOOK ||
  "https://reputixapp.app.n8n.cloud/webhook/free-report";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { business_name, google_maps_url, email, owner_name } = body || {};

    if (!business_name || !email) {
      return NextResponse.json(
        { ok: false, error: "business_name and email are required" },
        { status: 400 }
      );
    }

    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_name,
        google_maps_url: google_maps_url || "",
        email,
        owner_name: owner_name || "",
        source: "landing",
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Upstream webhook error" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
