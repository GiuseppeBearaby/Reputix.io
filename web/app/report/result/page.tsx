"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, TrendingUp, AlertTriangle, Star } from "lucide-react";

type Competitor = { name: string; rating: number; reviews: number };
type Report = {
  business_name?: string;
  score?: number;
  urgency?: string;
  revenue_at_risk?: number;
  summary?: string;
  strengths?: string[];
  weaknesses?: string[];
  keyword_themes?: string[];
  competitors?: Competitor[];
  quick_wins?: string[];
  recommendations?: string[];
};

export default function ReportResult() {
  const [report, setReport] = useState<Report | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("reputix_report");
      if (raw) setReport(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!report) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-brand-50 to-white">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">No report found</h1>
          <p className="mt-3 text-gray-600">We couldn&apos;t find a report in your browser.</p>
          <Link
            href="/"
            className="inline-block mt-8 bg-gradient-to-r from-brand-700 to-brand-500 hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl transition"
          >
            Generate your free report →
          </Link>
        </div>
      </main>
    );
  }

  const score = report.score ?? 0;
  const scoreColor =
    score > 70 ? "text-brand-600" : score > 50 ? "text-amber-500" : "text-red-500";
  const scoreBg =
    score > 70 ? "bg-brand-50 border-brand-200" : score > 50 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-brand-700 to-brand-500 text-white py-12 px-4 sm:px-6 print:bg-white print:text-black">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-brand-100">
              Reputation Report
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold">
              {report.business_name || "Your Business"}
            </h1>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-white text-brand-700 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition inline-flex items-center gap-2 print:hidden"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10">
        {/* Score + Urgency */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className={`md:col-span-2 rounded-2xl p-8 border-2 bg-white ${scoreBg}`}>
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Reputation Score
            </div>
            <div className={`mt-3 text-7xl font-extrabold ${scoreColor}`}>
              {score}
              <span className="text-2xl text-gray-400">/100</span>
            </div>
            {report.summary && <p className="mt-4 text-gray-700">{report.summary}</p>}
          </div>
          <div className="space-y-4">
            {report.urgency && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <AlertTriangle className="w-4 h-4" /> Urgency
                </div>
                <div className="mt-2 text-lg font-bold text-gray-900">{report.urgency}</div>
              </div>
            )}
            {typeof report.revenue_at_risk === "number" && report.revenue_at_risk > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                  <TrendingUp className="w-4 h-4" /> Revenue at Risk
                </div>
                <div className="mt-2 text-lg font-bold text-red-600">
                  AED {report.revenue_at_risk.toLocaleString()}/mo
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Strengths / Weaknesses */}
        {(report.strengths?.length || report.weaknesses?.length) && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            {report.strengths?.length ? (
              <div className="bg-white rounded-2xl p-7 border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900">✅ Strengths</h3>
                <ul className="mt-4 space-y-2">
                  {report.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-brand-600 font-bold">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {report.weaknesses?.length ? (
              <div className="bg-white rounded-2xl p-7 border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900">⚠️ Weaknesses</h3>
                <ul className="mt-4 space-y-2">
                  {report.weaknesses.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-red-500 font-bold">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        {/* Keyword themes */}
        {report.keyword_themes?.length ? (
          <div className="bg-white rounded-2xl p-7 border border-gray-100 mt-6">
            <h3 className="font-bold text-lg text-gray-900">Keyword Themes</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {report.keyword_themes.map((k, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold border border-brand-100"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Competitors */}
        {report.competitors?.length ? (
          <div className="bg-white rounded-2xl p-7 border border-gray-100 mt-6 overflow-x-auto">
            <h3 className="font-bold text-lg text-gray-900">Competitor Benchmark</h3>
            <table className="w-full mt-4 text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-semibold">Competitor</th>
                  <th className="pb-3 font-semibold">Rating</th>
                  <th className="pb-3 font-semibold">Reviews</th>
                </tr>
              </thead>
              <tbody>
                {report.competitors.map((c, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 font-semibold text-gray-900">{c.name}</td>
                    <td className="py-3 text-gray-700">
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {c.rating}/5
                      </span>
                    </td>
                    <td className="py-3 text-gray-700">{c.reviews.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* Quick wins */}
        {report.quick_wins?.length ? (
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-7 mt-6">
            <h3 className="font-bold text-lg text-gray-900">⚡ Quick Wins</h3>
            <ul className="mt-4 space-y-2">
              {report.quick_wins.map((w, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-800">
                  <span className="font-bold text-brand-700">{i + 1}.</span> {w}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Recommendations */}
        {report.recommendations?.length ? (
          <div className="bg-white rounded-2xl p-7 border border-gray-100 mt-6">
            <h3 className="font-bold text-lg text-gray-900">Recommendations</h3>
            <ul className="mt-4 space-y-3">
              {report.recommendations.map((r, i) => (
                <li key={i} className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold text-brand-700 mr-2">{i + 1}.</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* CTA */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mt-8 text-center text-white print:hidden">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Ready to fix this on autopilot?
          </h3>
          <p className="mt-3 text-gray-300">
            Reputix monitors your reputation 24/7 and responds to reviews automatically.
          </p>
          <Link
            href="/onboarding"
            className="inline-block mt-6 bg-gradient-to-r from-brand-500 to-brand-400 hover:opacity-90 text-white font-bold py-4 px-10 rounded-xl transition"
          >
            Start Free Trial →
          </Link>
        </div>
      </div>
    </main>
  );
}
