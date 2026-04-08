import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, Gift } from 'lucide-react';
import { cn } from '../lib/utils';
import SiteLayout from '../components/SiteLayout';

type BillingCycle = 'monthly' | 'annual';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 199,
    annual: 159,
    tagline: 'For single-location businesses',
    features: [
      '1 Google location',
      'Auto-respond to positive reviews',
      '5 negative review drafts / month',
      'Basic media monitoring',
      '1 competitor benchmark',
      'Weekly email digest',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 499,
    annual: 399,
    tagline: 'Full visibility for growing businesses',
    highlight: true,
    features: [
      'Everything in Starter, plus:',
      'Up to 3 locations',
      'Unlimited negative review drafts',
      'AI resolution strategies',
      'Full article & press monitoring',
      'Social media monitoring',
      '3 competitor benchmarks',
      'Weekly + Monthly PDF reports',
      'Review Boost QR codes',
      'Email + chat support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 999,
    annual: 799,
    tagline: 'Full reputation command center',
    features: [
      'Everything in Growth, plus:',
      'Up to 10 locations',
      '5 competitors tracked',
      'Predictive insights',
      'Custom AI queries',
      'On-demand reports',
      'Cross-channel strategy',
      'Priority dedicated support',
    ],
  },
];

const FAQS = [
  {
    q: "What's included in the free trial?",
    a: 'Full access to your chosen plan for 30 days (Starter) or 14 days (Growth/Pro). No credit card required.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Yes — upgrade or downgrade anytime from your dashboard. Changes take effect on your next billing cycle.',
  },
  {
    q: 'What happens after my trial ends?',
    a: "You'll be prompted to add a payment method. If you don't, your account pauses but your data is preserved for 90 days.",
  },
  {
    q: 'Do you support Arabic reviews?',
    a: 'Yes — our AI can analyze and respond to reviews in both English and Arabic.',
  },
  {
    q: 'How do you calculate the reputation score?',
    a: "It's a weighted composite: Google rating (40%), response rate (25%), review sentiment (20%), and online visibility (15%).",
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. Cancel from your dashboard in one click. No cancellation fees.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We use Supabase with row-level security, SSL encryption, and never share your data with third parties.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'All major credit/debit cards via Stripe. AED, USD, and EUR accepted.',
  },
];

export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SiteLayout>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Start free. Upgrade when you're ready. Cancel anytime.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full p-1.5 mt-6">
              <button
                onClick={() => setCycle('monthly')}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-semibold transition-all',
                  cycle === 'monthly'
                    ? 'bg-brand-navy text-white'
                    : 'text-slate-600 hover:text-brand-navy'
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setCycle('annual')}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2',
                  cycle === 'annual'
                    ? 'bg-brand-navy text-white'
                    : 'text-slate-600 hover:text-brand-navy'
                )}
              >
                Annual
                <span className="text-xs bg-brand-light-green text-brand-green px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </header>

          {/* Plan cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {PLANS.map((p) => {
              const price = cycle === 'annual' ? p.annual : p.monthly;
              return (
                <div
                  key={p.id}
                  className={cn(
                    'relative bg-white rounded-2xl border p-7 flex flex-col shadow-sm transition-all hover:shadow-md',
                    p.highlight
                      ? 'border-brand-blue ring-2 ring-brand-blue/20 md:scale-[1.03]'
                      : 'border-slate-200'
                  )}
                >
                  {p.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-brand-navy">{p.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{p.tagline}</p>
                  <div className="mt-5">
                    <span className="text-4xl font-extrabold text-brand-navy">AED {price}</span>
                    <span className="text-slate-500 text-sm ml-1">
                      /month{cycle === 'annual' ? ' · billed annually' : ''}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-2.5 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/onboarding"
                    className={cn(
                      'mt-7 w-full py-3 rounded-xl font-semibold text-center transition-all',
                      p.highlight
                        ? 'bg-brand-blue text-white hover:bg-brand-blue/90'
                        : 'bg-brand-navy text-white hover:bg-slate-800'
                    )}
                  >
                    Start Free Trial
                  </Link>
                </div>
              );
            })}
          </div>

          {/* PAYG */}
          <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="text-xs font-semibold text-brand-blue uppercase tracking-wide">
                Pay-As-You-Go
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mt-1">
                Pay-Per-Response — AED 9 / response
              </h3>
              <p className="text-slate-600 mt-2 max-w-xl">
                Perfect for micro-businesses. No monthly commitment. Pay only when we respond.
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brand-blue" /> AI-generated response
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brand-blue" /> Sentiment tag
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brand-blue" /> Basic dashboard access
                </li>
              </ul>
            </div>
            <Link
              to="/onboarding"
              className="bg-brand-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>

          {/* Referral banner */}
          <div className="mt-8 bg-brand-light-blue border border-brand-blue/20 rounded-2xl p-6 flex items-center gap-4">
            <Gift className="w-6 h-6 text-brand-blue flex-shrink-0" />
            <p className="text-brand-navy font-medium">
              Refer a business owner → you get <strong>1 free month</strong>, they get{' '}
              <strong>45 days free</strong>.
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-brand-navy text-center mb-10">
              Frequently asked questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-3">
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-brand-navy">{f.q}</span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-slate-400 transition-transform flex-shrink-0',
                        openFaq === i && 'rotate-180'
                      )}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-slate-600 leading-relaxed">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
