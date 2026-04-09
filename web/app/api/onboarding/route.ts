import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { plan, business_name, email, google_maps_url, instagram, facebook, tiktok, tone } = await req.json();
    if (!business_name || !plan) {
      return NextResponse.json({ ok: false, error: "business_name and plan are required" }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const supabase = createClient(url, key);
      await supabase.from("leads").insert({
        business_name,
        email: email || null,
        google_maps_url: google_maps_url || null,
        source: "onboarding",
        status: "new",
        notes: JSON.stringify({ plan, tone, instagram, facebook, tiktok }),
      });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Reputix <hello@reputix.io>",
          to: process.env.OWNER_EMAIL || "hello@reputix.io",
          subject: `New trial signup: ${business_name} (${plan}) — ${email || "no email"}`,
          html: `<h2>New Trial Signup</h2><p><strong>Business:</strong> ${business_name}</p><p><strong>Email:</strong> ${email || "not provided"}</p><p><strong>Plan:</strong> ${plan}</p><p><strong>Tone:</strong> ${tone || "not set"}</p><p><strong>Google Maps:</strong> ${google_maps_url || "not provided"}</p><p><strong>Instagram:</strong> ${instagram || "-"}</p><p><strong>Facebook:</strong> ${facebook || "-"}</p><p><strong>TikTok:</strong> ${tiktok || "-"}</p>`,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
