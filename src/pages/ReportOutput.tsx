import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CheckCircle, AlertCircle, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COMPETITORS } from '../lib/mock-data';

const HEALTH_DATA = [
  { name: 'Score', value: 78 },
  { name: 'Remaining', value: 22 },
];

const COLORS = ['#10B981', '#F1F5F9'];

export default function ReportOutput() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-brand-navy">Reputation Report: Al Safa Cafe</h1>
            <p className="text-sm text-slate-500">Generated on March 25, 2024</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">R</div>
            <span className="text-lg font-bold text-brand-navy">Reputix</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Row 1 */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-slate-600 mb-4">Overall Health Score</h3>
            <div className="w-48 h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={HEALTH_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {HEALTH_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-brand-navy">78</span>
                <span className="text-xs text-slate-400 font-bold">/ 100</span>
              </div>
            </div>
            <span className="mt-4 bg-brand-light-green text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Good, but room to grow
            </span>
          </div>

          <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-slate-600">AI Sentiment Analysis</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Top Positive Themes</p>
                <div className="flex flex-wrap gap-2">
                  {["Friendly Staff", "Fast Wi-Fi", "Great Ethiopian Blend", "Cozy Atmosphere", "Good Pastries"].map(t => (
                    <span key={t} className="flex items-center gap-1.5 bg-brand-light-green text-brand-green px-3 py-1.5 rounded-lg text-sm font-medium">
                      <CheckCircle size={14} /> {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Critical Areas to Fix</p>
                <div className="flex flex-wrap gap-2">
                  {["Slow Friday Service", "Parking Difficulties", "No Vegan Pastries", "AC Too Cold", "Small Portions"].map(t => (
                    <span key={t} className="flex items-center gap-1.5 bg-brand-light-red text-brand-red px-3 py-1.5 rounded-lg text-sm font-medium">
                      <AlertCircle size={14} /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium mb-1">Average Rating</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">4.6</span>
              <div className="flex gap-0.5 mb-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-brand-yellow text-brand-yellow" />)}
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium mb-1">Total Reviews</p>
            <span className="text-3xl font-bold">342</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium mb-1">Response Rate</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">67%</span>
              <span className="bg-brand-light-red text-brand-red px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                Below Industry Avg (82%)
              </span>
            </div>
          </div>
        </div>

        {/* Row 3: Competitor Benchmarking */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-600">Competitor Benchmarking</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Business</th>
                  <th className="px-6 py-4">Google Rating</th>
                  <th className="px-6 py-4">Total Reviews</th>
                  <th className="px-6 py-4">Response Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_COMPETITORS.map((comp, i) => (
                  <tr key={i} className={comp.name.includes('(You)') ? 'bg-brand-light-blue' : ''}>
                    <td className="px-6 py-4 font-semibold flex items-center gap-2">
                      {comp.name.includes('(You)') && <div className="w-2 h-2 bg-brand-blue rounded-full" />}
                      {comp.name}
                    </td>
                    <td className="px-6 py-4 font-medium">{comp.rating}★</td>
                    <td className="px-6 py-4 text-slate-500">{comp.reviews}</td>
                    <td className="px-6 py-4">
                      <span className={comp.responseRate >= 80 ? 'text-brand-green font-bold' : 'text-brand-red font-bold'}>
                        {comp.responseRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row 4: Quick Wins */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-600">Top 3 Quick Wins</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Respond to your 12 unanswered negative reviews", desc: "AI can draft these for you instantly to show customers you care." },
              { title: "Ask satisfied customers to leave reviews", desc: "Use our Review Boost QR codes to increase your rating by 0.3★ in 30 days." },
              { title: "Highlight your fast Wi-Fi in responses", desc: "It's your #1 praised feature. Mentioning it attracts more remote workers." }
            ].map((win, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-8 h-8 bg-brand-light-blue text-brand-blue rounded-lg flex items-center justify-center font-bold">{i + 1}</div>
                <h4 className="font-bold text-brand-navy">{win.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{win.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-navy text-white py-4 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm md:text-base font-medium">Ready to fix these issues? Reputix can auto-respond to reviews and improve your ranking.</p>
          <button 
            onClick={() => navigate('/onboarding')}
            className="bg-brand-blue text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            Start Free Trial <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
