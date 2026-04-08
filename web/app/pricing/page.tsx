"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Plus, Minus } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

const PLANS = [
  {
    name: "Starter",
    monthly: 199,
    annual: 159,
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
    name: "Growth",
    monthly: 499,
    annual: 399,
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
    name: "Pro",
    monthly: 999,
    annual: 799,
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

const FAQS = [
  {
    q: "What's included in the free trial?",
    a: "Full access to your chosen plan for 30 days (Starter) or 14 days (Growth/Pro). No credit card required.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, upgrade or downgrade anytime from your dashboard.",
  },
  {
    q: "What happens after my trial ends?",
    a: "You'll be prompted to add a payment method. If you don't, your account pauses but data is preserved for 90 days.",
  },
  {
    q: "Do you support Arabic reviews?",
    a: "Yes, our AI analyzes and responds in both English and Arabic.",
  },
  {
    q: "How do you calculate the reputation score?",
    a: "Weighted composite: Google rating (40%), response rate (25%), review sentiment (20%), online visibility (15%).",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel from your dashboard in one click. No fees.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Supabase with row-level security, SSL encryption, no third-party data sharing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major cards via Stripe. AED, USD, EUR accepted.",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen">
      <SiteNav />

      <section className="pt-32 pb-16 px-4 sm:px-6 bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600">
            Start free. Upgrade when you&apos;re ready. Cancel anytime.
          </p>

          <div className="inline-flex items-center gap-1 mt-10 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                !annual ? "bg-brand-600 text-white" : "text-gray-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${
                annual ? "bg-brand-600 text-white" : "text-gray-600"
              }`}
            >
              Annual
              <span className={`text-xs px-2 py-0.5 rounded-full ${annual ? "bg-white text-brand-700" : "bg-brand-100 text-brand-700"}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 -mt-6">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`bg-white rounded-2xl p-8 border-2 relative ${
                p.popular ? "border-brand-500 shadow-2xl md:scale-105" : "border-gray-100"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="font-bold text-2xl text-gray-900">{p.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{p.tagline}</p>
              <div className="mt-5">
                <span className="text-5xl font-extrabold text-gray-900">
                  AED {annual ? p.annual : p.monthly}
                </span>
                <span className="text-gray-500 text-sm">/mo</span>
                {annual && (
                  <div className="text-xs text-brand-700 font-semibold mt-1">
                    Billed annually
                  </div>
                )}
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className={`mt-8 block text-center py-3.5 rounded-xl font-bold text-sm transition ${
                  p.popular
                    ? "bg-gradient-to-r from-brand-700 to-brand-500 text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Start Free Trial
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-10 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-400">
                Pay-As-You-Go
              </div>
              <h3 className="text-2xl font-bold mt-2">Pay-Per-Response — AED 9</h3>
              <p className="text-gray-300 mt-2">
                Perfect for micro-businesses. No monthly commitment.
              </p>
              <ul className="mt-5 space-y-1.5 text-sm text-gray-300">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-400" /> AI-generated response</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-400" /> Sentiment tag</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-400" /> Basic dashboard</li>
              </ul>
            </div>
            <Link
              href="/onboarding"
              className="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition whitespace-nowrap"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 bg-gray-50 pt-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900">
            Frequently asked questions
          </h2>
          <div className="mt-12 space-y-3">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 sm:p-6 flex justify-between items-center text-left"
                >
                  <span className="font-semibold text-gray-900">{f.q}</span>
                  {openFaq === i ? (
                    <Minus className="w-5 h-5 text-brand-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-brand-600 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 text-gray-600">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto bg-brand-50 border border-brand-100 rounded-2xl p-8 text-center">
          <div className="text-2xl">🎁</div>
          <h3 className="mt-3 text-xl font-bold text-gray-900">Referral program</h3>
          <p className="mt-2 text-gray-600">
            Refer a business → you get 1 free month, they get 45 days free.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
