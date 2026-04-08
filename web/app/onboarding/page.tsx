"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Briefcase, Smile, Zap, Star, Newspaper, Share2 } from "lucide-react";

type Plan = "starter" | "growth" | "pro";
type Tone = "professional" | "friendly" | "direct";

const PLANS = [
  {
    id: "starter" as Plan,
    name: "Starter",
    price: 199,
    tagline: "For single-location businesses",
    features: [
      "1 Google location",
      "Auto-respond to positive reviews",
      "5 negative review drafts/month",
      "Basic media monitoring",
      "1 competitor benchmark",
      "Weekly email digest",
      "Email support",
    ],
  },
  {
    id: "growth" as Plan,
    name: "Growth",
    price: 499,
    tagline: "Full visibility for growing businesses",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Up to 3 locations",
      "Unlimited negative drafts",
      "AI resolution strategies",
      "Full article & press monitoring",
      "Social media monitoring",
      "3 competitor benchmarks",
      "Weekly + Monthly PDF reports",
      "Review Boost QR codes",
      "Email + chat support",
    ],
  },
  {
    id: "pro" as Plan,
    name: "Pro",
    price: 999,
    tagline: "Full reputation command center",
    features: [
      "Everything in Growth, plus:",
      "Up to 10 locations",
      "5 competitors",
      "Predictive insights",
      "Custom AI queries",
      "On-demand reports",
      "Cross-channel strategy",
      "Priority dedicated support",
    ],
  },
];

const TONES = [
  {
    id: "professional" as Tone,
    icon: Briefcase,
    title: "Professional & Polite",
    best: "Best for clinics, law firms, luxury brands",
    preview:
      "Thank you for your thoughtful feedback, Sarah. We take every guest's experience seriously and would welcome the opportunity to make this right. Please contact us directly at your convenience.",
  },
  {
    id: "friendly" as Tone,
    icon: Smile,
    title: "Friendly & Casual",
    best: "Best for cafes, salons, local shops",
    preview:
      "Hey thanks so much for the kind words! We're so glad you loved the coffee ☕ Hope to see you again real soon!",
  },
  {
    id: "direct" as Tone,
    icon: Zap,
    title: "Short & Direct",
    best: "Best for fast food, delivery, quick services",
    preview:
      "Thanks for the feedback! Noted — we'll work on it. See you next time.",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [biz, setBiz] = useState({ name: "", maps: "", ig: "", fb: "", tt: "" });
  const [tone, setTone] = useState<Tone | null>(null);

  const canStep2 = biz.name.trim() && biz.maps.trim();
  const steps = ["Plan", "Connect", "Tone", "Done"];

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white pt-12 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 justify-center mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center text-white font-extrabold">
            R
          </div>
          <span className="font-bold text-xl">Reputix</span>
        </Link>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2 mb-3">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i + 1 <= step ? "bg-brand-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs font-semibold text-gray-500">
            {steps.map((label, i) => (
              <span key={label} className={i + 1 <= step ? "text-brand-700" : ""}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900">
              Choose your plan
            </h1>
            <p className="text-center text-gray-600 mt-4 text-lg">
              Start with a 30-day free trial. Cancel anytime.
            </p>
            <div className="grid md:grid-cols-3 gap-5 mt-12">
              {PLANS.map((p) => (
                <div
                  key={p.id}
                  className={`bg-white rounded-2xl p-7 border-2 transition-all relative ${
                    p.popular
                      ? "border-brand-500 shadow-2xl md:scale-105"
                      : "border-gray-100 hover:border-brand-300"
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-bold text-xl text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.tagline}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">AED {p.price}</span>
                    <span className="text-gray-500 text-sm">/mo</span>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setPlan(p.id);
                      setStep(2);
                    }}
                    className={`mt-6 w-full py-3 rounded-xl font-bold text-sm transition ${
                      p.popular
                        ? "bg-gradient-to-r from-brand-700 to-brand-500 text-white hover:opacity-90"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Start Free Trial
                  </button>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-8">
              Or try Pay-As-You-Go at AED 9/response — no commitment
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900">
              Connect your business
            </h1>
            <p className="text-center text-gray-600 mt-4 text-lg">
              We need your Google Maps link to start monitoring
            </p>
            <div className="mt-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                  Business Name *
                </label>
                <input
                  type="text"
                  placeholder="Nobu Dubai"
                  value={biz.name}
                  onChange={(e) => setBiz({ ...biz, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                  Google Maps Link *
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={biz.maps}
                  onChange={(e) => setBiz({ ...biz, maps: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Social Media (optional — helps us monitor more)
                </p>
                <div className="space-y-3">
                  <input
                    type="url"
                    placeholder="Instagram URL"
                    value={biz.ig}
                    onChange={(e) => setBiz({ ...biz, ig: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <input
                    type="url"
                    placeholder="Facebook URL"
                    value={biz.fb}
                    onChange={(e) => setBiz({ ...biz, fb: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <input
                    type="url"
                    placeholder="TikTok URL"
                    value={biz.tt}
                    onChange={(e) => setBiz({ ...biz, tt: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <button
                disabled={!canStep2}
                onClick={() => setStep(3)}
                className="w-full mt-2 bg-gradient-to-r from-brand-700 to-brand-500 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base transition"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900">
              How should we sound?
            </h1>
            <p className="text-center text-gray-600 mt-4 text-lg">
              Choose how Reputix responds to your customers
            </p>
            <div className="grid md:grid-cols-3 gap-5 mt-12">
              {TONES.map((t) => {
                const Icon = t.icon;
                const selected = tone === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`text-left bg-white rounded-2xl p-6 border-2 transition-all ${
                      selected
                        ? "border-brand-500 bg-brand-50 shadow-xl"
                        : "border-gray-100 hover:border-brand-300"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{t.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{t.best}</p>
                    <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 italic">
                      &ldquo;{t.preview}&rdquo;
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="max-w-md mx-auto mt-10">
              <button
                disabled={!tone}
                onClick={() => setStep(4)}
                className="w-full bg-gradient-to-r from-brand-700 to-brand-500 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base transition"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="mx-auto w-24 h-24 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/40">
              <Check className="w-14 h-14 text-white" strokeWidth={3} />
            </div>
            <h1 className="mt-8 text-3xl sm:text-5xl font-extrabold text-gray-900">
              You&apos;re all set! 🎉
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Reputix is now monitoring your online reputation 24/7.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                { Icon: Star, title: "Reviews", sub: "Monitoring active" },
                { Icon: Newspaper, title: "Press & Articles", sub: "Scanning web" },
                { Icon: Share2, title: "Social Media", sub: "Tracking mentions" },
              ].map(({ Icon, title, sub }) => (
                <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <Icon className="w-8 h-8 text-brand-600 mx-auto" />
                  <div className="mt-3 font-bold text-gray-900">{title}</div>
                  <div className="text-xs text-gray-500 mt-1">{sub}</div>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard"
              className="inline-block mt-10 bg-gradient-to-r from-brand-700 to-brand-500 hover:opacity-90 text-white font-bold py-4 px-10 rounded-xl text-base transition"
            >
              Go to Dashboard →
            </Link>
            <p className="mt-5 text-sm text-gray-500">
              Your first weekly digest arrives Monday morning.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
