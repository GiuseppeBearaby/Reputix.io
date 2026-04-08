import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingUp, TrendingDown, Target, Sparkles, ArrowRight } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';

type Competitor = { name: string; score: string | number; review_count?: number };
type Report = {
  business_name?: string;
  overall_score?: number;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  revenue_at_risk?: string;
  strengths?: string[];
  weaknesses?: string[];
  keyword_themes?: { positive?: string[]; negative?: string[] };
  competitor_benchmark?: Competitor[];
  quick_wins?: string[];
  recommendations?: string[];
};

const URGENCY_STYLES: Record<string, string> = {
  low: 'bg-brand-light-green text-brand-green',
  medium: 'bg-brand-light-yellow text-brand-yellow',
  high: 'bg-brand-light-red text-brand-red',
  critical: 'bg-brand-light-red text-brand-red',
};

export default function ReportResultPage() {
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('reputix_report');
      if (raw) setReport(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  if (!report) {
    return (
      <SiteLayout>
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl border border-slate-200 p-12 shadow-sm">
            <h1 className="text-3xl font-bold text-brand-navy">No report yet</h1>
            <p className="text-slate-600 mt-3">
              Generate your free reputation report to see your score, weaknesses, and quick wins.
            </p>
            <Link
              to="/onboarding"
              className="inline-block mt-6 bg-brand-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Get Free Report
            </Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const score = report.overall_score ?? 0;
  const urgency = report.urgency ?? 'medium';

  return (
    <SiteLayout>
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <header>
            <p className="text-sm font-semibold text-brand-blue uppercase tracking-wide">
              Reputation Report
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mt-2">
              {report.business_name || 'Your Business'}
            </h1>
          </header>

          {/* Score + urgency */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase">Overall Score</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-6xl font-extrabold text-brand-navy">{score}</span>
                <span className="text-xl text-slate-400 pb-2">/ 100</span>
              </div>
              <div className="mt-4 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-blue rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                />
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase">Urgency</p>
                <div
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold uppercase ${URGENCY_STYLES[urgency] || 'bg-slate-100 text-slate-600'}`}
                >
                  {urgency}
                </div>
              </div>
              {report.revenue_at_risk && (
                <div className="mt-4 flex items-start gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">
                    Revenue at risk: <strong>{report.revenue_at_risk}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Strengths + Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-brand-green" />
                <h3 className="font-bold text-brand-navy">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {(report.strengths || []).map((s, i) => (
                  <li key={i} className="text-sm text-slate-700 flex gap-2">
                    <span className="text-brand-green">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-brand-red" />
                <h3 className="font-bold text-brand-navy">Weaknesses</h3>
              </div>
              <ul className="space-y-2">
                {(report.weaknesses || []).map((w, i) => (
                  <li key={i} className="text-sm text-slate-700 flex gap-2">
                    <span className="text-brand-red">!</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Keyword themes */}
          {report.keyword_themes && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-brand-navy mb-4">Keyword themes</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-brand-green uppercase mb-2">Positive</p>
                  <div className="flex flex-wrap gap-2">
                    {(report.keyword_themes.positive || []).map((k) => (
                      <span
                        key={k}
                        className="px-3 py-1 bg-brand-light-green text-brand-green text-sm rounded-full"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-red uppercase mb-2">Negative</p>
                  <div className="flex flex-wrap gap-2">
                    {(report.keyword_themes.negative || []).map((k) => (
                      <span
                        key={k}
                        className="px-3 py-1 bg-brand-light-red text-brand-red text-sm rounded-full"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Competitors */}
          {report.competitor_benchmark && report.competitor_benchmark.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-brand-navy mb-4">Competitor benchmark</h3>
              <div className="space-y-3">
                {report.competitor_benchmark.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                  >
                    <span className="font-medium text-brand-navy">{c.name}</span>
                    <div className="text-sm text-slate-600">
                      <strong className="text-brand-navy">{c.score}</strong>
                      {c.review_count ? ` · ${c.review_count} reviews` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick wins */}
          {report.quick_wins && report.quick_wins.length > 0 && (
            <div className="bg-brand-light-blue rounded-2xl border border-brand-blue/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-brand-blue" />
                <h3 className="font-bold text-brand-navy">Quick wins</h3>
              </div>
              <ul className="space-y-2">
                {report.quick_wins.map((q, i) => (
                  <li key={i} className="text-sm text-brand-navy flex gap-2">
                    <span>→</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {report.recommendations && report.recommendations.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-brand-blue" />
                <h3 className="font-bold text-brand-navy">Strategic recommendations</h3>
              </div>
              <ul className="space-y-2">
                {report.recommendations.map((r, i) => (
                  <li key={i} className="text-sm text-slate-700 flex gap-2">
                    <span className="text-brand-blue font-bold">{i + 1}.</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="bg-brand-navy rounded-2xl p-10 text-center text-white">
            <h3 className="text-2xl font-bold">Ready to fix this?</h3>
            <p className="text-slate-300 mt-2">
              Start your free trial and let Reputix handle your reputation on autopilot.
            </p>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 mt-6 bg-white text-brand-navy font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              See pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
