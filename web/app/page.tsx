"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    business_name: "",
    google_maps_url: "",
    email: "",
    owner_name: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr("");
    try {
      const res = await fetch("/api/free-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "Something went wrong");
      if (j.report) {
        try {
          localStorage.setItem("reputix_report", JSON.stringify(j.report));
        } catch {}
        router.push("/report/result");
        return;
      }
      setStatus("ok");
    } catch (e: any) {
      setStatus("error");
      setErr(e.message);
    }
  }

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center text-white font-extrabold">
              R
            </div>
            <span className="font-bold text-lg">Reputix</span>
          </div>
          <div className="hidden sm:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-brand-700">Features</a>
            <a href="/pricing" className="hover:text-brand-700">Pricing</a>
            <a href="/dashboard" className="hover:text-brand-700">Login</a>
          </div>
          <a
            href="/onboarding"
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Start Free Trial
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
            Built for UAE local businesses
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            AI Reputation Manager<br />
            <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
              for UAE Businesses
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Get a free AI-powered reputation report in 2 minutes. Auto-reply to Google reviews,
            detect crises before they blow up, grow your rating on autopilot.
          </p>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="mt-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 max-w-2xl mx-auto text-left"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-1">Get your free report</h3>
            <p className="text-sm text-gray-500 mb-6">No credit card. Delivered in 2 minutes.</p>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                required
                placeholder="Business name (e.g. Nobu Dubai)"
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <input
                type="url"
                placeholder="Google Maps URL (optional)"
                value={form.google_maps_url}
                onChange={(e) => setForm({ ...form, google_maps_url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Your name (optional)"
                value={form.owner_name}
                onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <input
                type="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "ok"}
              className="w-full mt-5 bg-gradient-to-r from-brand-700 to-brand-500 hover:opacity-90 disabled:opacity-60 text-white font-bold py-4 rounded-xl text-base transition"
            >
              {status === "loading" && "Generating your report…"}
              {status === "ok" && "✓ Report sent — check your inbox"}
              {status === "idle" && "Get My Free Report →"}
              {status === "error" && "Try again"}
            </button>

            {status === "error" && (
              <p className="mt-3 text-sm text-red-600">{err}</p>
            )}
            {status === "ok" && (
              <p className="mt-3 text-sm text-brand-700">
                Your report will arrive in ~2 minutes. Don't forget to check spam just in case.
              </p>
            )}
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500">
            <span>⚡ 2-min delivery</span>
            <span>🇦🇪 Made for UAE</span>
            <span>💳 No credit card</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="features" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900">
            How it works
          </h2>
          <p className="text-center text-gray-600 mt-4 text-lg">
            Three simple steps. Fully automated.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {[
              {
                n: "1",
                t: "Get your free report",
                d: "We scan your Google Maps reviews with AI and send you a detailed reputation analysis in 2 minutes.",
              },
              {
                n: "2",
                t: "Start your free trial",
                d: "1 month free. We start auto-replying to new reviews, monitoring your rating, and alerting you on crises.",
              },
              {
                n: "3",
                t: "Grow on autopilot",
                d: "Weekly digests, trend detection, and competitive benchmarks — delivered to your inbox every Monday.",
              },
            ].map((s) => (
              <div key={s.n} className="bg-brand-50 border border-brand-100 rounded-2xl p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white flex items-center justify-center font-extrabold text-xl mb-4">
                  {s.n}
                </div>
                <h3 className="font-bold text-xl text-gray-900">{s.t}</h3>
                <p className="mt-2 text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900">
            Simple pricing
          </h2>
          <p className="text-center text-gray-600 mt-4 text-lg">
            Start free for 1 month. Cancel anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {[
              { n: "Starter", p: 149, d: "Solo owners", f: ["Auto-reply reviews", "Weekly digest", "1 location"] },
              { n: "Growth", p: 349, d: "Most popular", f: ["Everything in Starter", "Crisis alerts", "Competitor tracking", "3 locations"], highlight: true },
              { n: "Pro", p: 749, d: "Multi-location", f: ["Everything in Growth", "Social monitoring", "Custom tone", "10 locations"] },
              { n: "Enterprise", p: 1499, d: "Chains & groups", f: ["Everything in Pro", "Dedicated manager", "API access", "Unlimited locations"] },
            ].map((plan) => (
              <div
                key={plan.n}
                className={`bg-white rounded-2xl p-6 sm:p-7 border-2 ${
                  plan.highlight ? "border-brand-500 shadow-2xl relative" : "border-gray-100"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-xl text-gray-900">{plan.n}</h3>
                <p className="text-sm text-gray-500">{plan.d}</p>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">AED {plan.p}</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <ul className="mt-6 space-y-2">
                  {plan.f.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-brand-600 font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/onboarding"
                  className={`mt-6 block text-center py-3 rounded-xl font-bold text-sm transition ${
                    plan.highlight
                      ? "bg-gradient-to-r from-brand-700 to-brand-500 text-white hover:opacity-90"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Start 1-month free trial
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Trusted by UAE local businesses
          </h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60">
            {["Restaurant", "Café", "Salon", "Clinic"].map((t) => (
              <div key={t} className="bg-gray-100 rounded-xl py-8 text-gray-400 font-semibold">
                {t}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">Logos coming soon — be one of our first</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900">FAQ</h2>
          <div className="mt-14 space-y-4">
            {[
              {
                q: "How fast do I get the free report?",
                a: "Usually under 2 minutes. The AI analyzes your Google Maps reviews and generates a full reputation breakdown with actionable recommendations.",
              },
              {
                q: "Do I need to give you credit card info?",
                a: "No. The free report and the 1-month trial require zero payment info. We'll only ask if you decide to continue after the trial.",
              },
              {
                q: "What if I don't know my Google Maps URL?",
                a: "Leave that field empty. Just enter your business name and city and we'll find it automatically.",
              },
              {
                q: "Does this work in Arabic?",
                a: "Yes. Reputix auto-detects the review language and replies in the same language (English, Arabic, Russian, Hindi, and more).",
              },
              {
                q: "Can I cancel anytime?",
                a: "Of course. No lock-in, no cancellation fees. Just email hello@reputix.io.",
              },
            ].map((f, i) => (
              <details
                key={i}
                className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 group"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-brand-600 group-open:rotate-45 transition-transform text-xl font-light">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center text-white font-extrabold">
                  R
                </div>
                <span className="font-bold text-lg text-white">Reputix</span>
              </div>
              <p className="mt-3 text-sm max-w-xs">
                AI reputation management for UAE local businesses.
              </p>
            </div>
            <div className="text-sm flex flex-wrap gap-x-8 gap-y-2">
              <div>
                <div className="font-semibold text-white mb-2">Product</div>
                <a href="/pricing" className="hover:text-white block">Pricing</a>
                <a href="/blog" className="hover:text-white block">Blog</a>
                <a href="/about" className="hover:text-white block">About</a>
                <a href="/contact" className="hover:text-white block">Contact</a>
              </div>
              <div>
                <div className="font-semibold text-white mb-2">Legal</div>
                <a href="/terms" className="hover:text-white block">Terms</a>
                <a href="/privacy" className="hover:text-white block">Privacy</a>
              </div>
              <div>
                <div className="font-semibold text-white mb-2">Contact</div>
                <a href="mailto:hello@reputix.io" className="hover:text-white block">
                  hello@reputix.io
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-800 text-xs text-center">
            © {new Date().getFullYear()} Reputix · Made in Dubai
          </div>
        </div>
      </footer>
    </main>
  );
}
