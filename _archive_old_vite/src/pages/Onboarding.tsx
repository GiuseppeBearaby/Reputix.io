import { useState, useEffect, type ReactNode } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Building2,
  MessageSquare,
  Star,
  Newspaper,
  Share2,
  Instagram,
  Facebook,
  Music2,
  MapPin,
} from 'lucide-react';
import { cn } from '../lib/utils';

type Plan = 'starter' | 'growth' | 'pro';
type Tone = 'professional' | 'friendly' | 'direct';

const PLANS: {
  id: Plan;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
}[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'AED 199',
    tagline: 'For single-location businesses',
    features: [
      '1 Google location',
      'Auto-respond to positive reviews',
      '5 negative review drafts / month',
      '1 competitor benchmark',
      'Weekly email digest',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 'AED 499',
    tagline: 'For growing businesses',
    highlight: true,
    features: [
      'Everything in Starter, plus:',
      'Up to 3 locations',
      'Unlimited negative review drafts',
      'Full media monitoring',
      'Social monitoring',
      '3 competitor benchmarks',
      'Monthly PDF reports',
      'Review Boost QR codes',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'AED 999',
    tagline: 'Full reputation command center',
    features: [
      'Everything in Growth, plus:',
      'Up to 10 locations',
      '5 competitors',
      'Predictive insights',
      'Custom AI queries',
      'Priority support',
    ],
  },
];

const TONES: { id: Tone; title: string; best: string; example: string }[] = [
  {
    id: 'professional',
    title: 'Professional & Polite',
    best: 'Best for clinics, law firms, luxury brands',
    example:
      'Thank you for your thoughtful feedback. We take your experience very seriously and would like to discuss this further…',
  },
  {
    id: 'friendly',
    title: 'Friendly & Casual',
    best: 'Best for cafes, salons, local shops',
    example:
      "Hey! Thanks so much for stopping by. We're glad you enjoyed the coffee! Hope to see you again soon 😊",
  },
  {
    id: 'direct',
    title: 'Short & Direct',
    best: 'Best for fast food, delivery, quick services',
    example: "Thanks for the feedback! We're on it. See you next time.",
  },
];

const STEP_LABELS = ['Plan', 'Connect', 'Tone', 'Done'];

export default function Onboarding() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [business, setBusiness] = useState({
    name: '',
    google_maps_url: '',
    instagram: '',
    facebook: '',
    tiktok: '',
  });
  const [tone, setTone] = useState<Tone | null>(null);

  useEffect(() => {
    const n = params.get('business_name') || params.get('name');
    if (n) setBusiness((b) => ({ ...b, name: n }));
    const p = params.get('plan') as Plan | null;
    if (p && ['starter', 'growth', 'pro'].includes(p)) setPlan(p);
  }, [params]);

  const canContinueStep2 =
    business.name.trim().length > 0 && business.google_maps_url.trim().length > 0;
  const canContinueStep3 = tone !== null;

  function pickPlan(p: Plan) {
    setPlan(p);
    setStep(2);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light-blue/40 via-white to-white">
      {/* Top bar */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center text-white font-extrabold">
              R
            </div>
            <span className="font-extrabold text-brand-navy text-lg tracking-tight">
              Reputix
            </span>
          </Link>
          <span className="text-sm text-slate-500">Step {step} of 4</span>
        </div>
      </nav>

      {/* Progress */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-all duration-500',
                i <= step ? 'bg-brand-blue' : 'bg-slate-200'
              )}
            />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-4 text-xs sm:text-sm font-medium">
          {STEP_LABELS.map((l, i) => (
            <div
              key={l}
              className={cn(
                'text-center transition-colors',
                i + 1 <= step ? 'text-brand-blue' : 'text-slate-400'
              )}
            >
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <header className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">
                  Choose your plan
                </h1>
                <p className="mt-3 text-slate-600">
                  Start with a 30-day free trial. Cancel anytime.
                </p>
              </header>

              <div className="grid md:grid-cols-3 gap-6">
                {PLANS.map((p) => (
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
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-brand-navy">{p.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{p.tagline}</p>
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-brand-navy">
                        {p.price}
                      </span>
                      <span className="text-slate-500 text-sm">/month</span>
                    </div>
                    <ul className="mt-6 space-y-2.5 flex-1">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <Check className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => pickPlan(p.id)}
                      className={cn(
                        'mt-7 w-full py-3 rounded-xl font-semibold transition-all',
                        p.highlight
                          ? 'bg-brand-blue text-white hover:bg-brand-blue/90'
                          : 'bg-brand-navy text-white hover:bg-brand-navy/90'
                      )}
                    >
                      Start Free Trial
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-center text-sm text-slate-600">
                Or try{' '}
                <button
                  onClick={() => pickPlan('starter')}
                  className="text-brand-blue font-semibold hover:underline"
                >
                  Pay-As-You-Go at AED 9/response
                </button>{' '}
                — no commitment.
              </p>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto"
            >
              <header className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-light-blue mb-4">
                  <Building2 className="w-7 h-7 text-brand-blue" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">
                  Connect your business
                </h1>
                <p className="mt-3 text-slate-600">
                  Paste your Google Maps link and we'll do the rest.
                </p>
              </header>

              <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                <div className="space-y-5">
                  <Field
                    label="Google Maps link"
                    required
                    icon={<MapPin className="w-4 h-4" />}
                    value={business.google_maps_url}
                    onChange={(v) => setBusiness({ ...business, google_maps_url: v })}
                    placeholder="https://maps.google.com/?cid=…"
                  />
                  <Field
                    label="Business name"
                    required
                    value={business.name}
                    onChange={(v) => setBusiness({ ...business, name: v })}
                    placeholder="e.g. Nobu Dubai"
                  />

                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="text-sm font-semibold text-brand-navy mb-1">
                      Social media{' '}
                      <span className="text-slate-400 font-normal">
                        (optional, helps us monitor more)
                      </span>
                    </h3>
                    <div className="space-y-3 mt-4">
                      <Field
                        label="Instagram URL"
                        icon={<Instagram className="w-4 h-4" />}
                        value={business.instagram}
                        onChange={(v) => setBusiness({ ...business, instagram: v })}
                        placeholder="https://instagram.com/…"
                      />
                      <Field
                        label="Facebook URL"
                        icon={<Facebook className="w-4 h-4" />}
                        value={business.facebook}
                        onChange={(v) => setBusiness({ ...business, facebook: v })}
                        placeholder="https://facebook.com/…"
                      />
                      <Field
                        label="TikTok URL"
                        icon={<Music2 className="w-4 h-4" />}
                        value={business.tiktok}
                        onChange={(v) => setBusiness({ ...business, tiktok: v })}
                        placeholder="https://tiktok.com/@…"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-slate-600 hover:text-brand-navy font-medium"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  disabled={!canContinueStep2}
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {step === 3 && (
            <motion.section
              key="step3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto"
            >
              <header className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-light-blue mb-4">
                  <MessageSquare className="w-7 h-7 text-brand-blue" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">
                  How should we sound?
                </h1>
                <p className="mt-3 text-slate-600">
                  Choose how Reputix responds to your customers.
                </p>
              </header>

              <div className="grid md:grid-cols-3 gap-5">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={cn(
                      'text-left bg-white rounded-2xl border-2 p-6 transition-all',
                      tone === t.id
                        ? 'border-brand-blue ring-2 ring-brand-blue/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-brand-navy">{t.title}</h3>
                      {tone === t.id && (
                        <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{t.best}</p>
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 italic leading-relaxed">
                      "{t.example}"
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-slate-600 hover:text-brand-navy font-medium"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  disabled={!canContinueStep3}
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          )}

          {step === 4 && (
            <motion.section
              key="step4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="mx-auto mb-8 w-24 h-24 rounded-full bg-brand-light-blue flex items-center justify-center"
              >
                <svg className="w-16 h-16" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                    stroke="#007AFF"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <motion.path
                    d="M14 27 l8 8 l16 -18"
                    fill="none"
                    stroke="#0A2540"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 0.75 }}
                  />
                </svg>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">
                You're all set!
              </h1>
              <p className="mt-3 text-slate-600">
                Reputix is now monitoring your online reputation.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <StatBox icon={<Star className="w-5 h-5 text-brand-blue" />} label="Reviews" />
                <StatBox icon={<Newspaper className="w-5 h-5 text-brand-blue" />} label="Articles" />
                <StatBox icon={<Share2 className="w-5 h-5 text-brand-blue" />} label="Social" />
              </div>

              <button
                onClick={() => navigate('/dashboard')}
                className="mt-10 inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-brand-blue/90 transition-all"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </button>

              <p className="mt-6 text-sm text-slate-500 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-blue" />
                We'll email you your first weekly digest on Monday.
              </p>

              <div className="sr-only">
                Plan: {plan}; Business: {business.name}; Tone: {tone}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
  icon,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
        {icon}
        {label}
        {required && <span className="text-brand-blue">*</span>}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-brand-navy placeholder:text-slate-400"
      />
    </label>
  );
}

function StatBox({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-brand-light-blue flex items-center justify-center mb-3 mx-auto">
        {icon}
      </div>
      <div className="text-sm font-semibold text-brand-navy">{label}</div>
      <div className="text-xs text-slate-500 mt-1">Scanning…</div>
    </div>
  );
}
