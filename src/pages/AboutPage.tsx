import { Link } from 'react-router-dom';
import { Sparkles, Eye, MapPin } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';

const VALUES = [
  {
    icon: Sparkles,
    title: 'AI-First',
    body: 'We use the best AI models to draft responses and surface insights — so you save hours every week.',
  },
  {
    icon: Eye,
    title: 'Transparent',
    body: 'Clear pricing, no hidden fees, no long contracts. Cancel anytime in one click.',
  },
  {
    icon: MapPin,
    title: 'Local',
    body: 'Built in Dubai for UAE businesses. We speak Arabic and English and understand the local market.',
  },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">
              We believe every business deserves a great online reputation
            </h1>
          </header>

          <div className="space-y-12 text-lg text-slate-700 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy mb-3">The problem we saw</h2>
              <p>
                Small and mid-sized businesses across the UAE are losing customers every day to
                unanswered reviews, unnoticed media mentions, and competitors who simply pay more
                attention. Reputation isn't a marketing nice-to-have anymore — it's the front door.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-navy mb-3">What we built</h2>
              <p>
                Reputix is an AI-powered reputation command center. It watches your reviews,
                drafts professional responses in English and Arabic, monitors press and social
                mentions, tracks competitors, and sends you one clean weekly report. No more
                tab-hopping, no more missed one-star reviews at 11pm.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-navy mb-3">Built for the UAE</h2>
              <p>
                We're based in Dubai. We know the restaurants, clinics, salons, and boutique
                hotels we serve — and we built Reputix specifically for the bilingual, fast-moving
                reality of running a business here.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-light-blue flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">{v.title}</h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center bg-white rounded-2xl border border-slate-200 p-10">
            <h3 className="text-2xl font-bold text-brand-navy">Ready to take control?</h3>
            <p className="text-slate-600 mt-2">Get your free reputation report in 60 seconds.</p>
            <Link
              to="/onboarding"
              className="inline-block mt-6 bg-brand-navy text-white font-semibold px-7 py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Get Free Report
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
