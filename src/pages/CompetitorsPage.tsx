import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Lightbulb, Plus } from 'lucide-react';
import { MOCK_COMPETITORS } from '../lib/mock-data';
import { cn } from '../lib/utils';

export default function CompetitorsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-navy">Competitor Intelligence</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Plus size={16} /> Add Competitor
        </button>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-700 mb-6">Rating Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_COMPETITORS} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis type="number" domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} width={120} />
              <Tooltip 
                cursor={{ fill: '#F8FAFC' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="rating" radius={[0, 4, 4, 0]} barSize={24}>
                {MOCK_COMPETITORS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name.includes('(You)') ? '#007AFF' : '#CBD5E1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Business Name</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Total Reviews</th>
                <th className="px-6 py-4">Response Rate</th>
                <th className="px-6 py-4">Sentiment Score</th>
                <th className="px-6 py-4">Review Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_COMPETITORS.map((comp, i) => (
                <tr key={i} className={cn("hover:bg-slate-50/50 transition-colors", comp.name.includes('(You)') && "bg-brand-light-blue/30")}>
                  <td className="px-6 py-4 font-bold text-sm text-brand-navy">{comp.name}</td>
                  <td className="px-6 py-4 font-bold text-sm">{comp.rating}★</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{comp.reviews}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      comp.responseRate >= 80 ? "bg-brand-light-green text-brand-green" : "bg-brand-light-red text-brand-red"
                    )}>
                      {comp.responseRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-slate-700">{comp.sentimentScore}/100</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{comp.reviewVelocity} reviews/mo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 gap-4">
        {[
          "Nightjar Coffee has a 98% response rate vs your 92%. They respond within 2 hours on average — consider enabling instant auto-responses for all positive reviews.",
          "Boon Coffee's most praised feature is 'outdoor seating'. Your reviews never mention this — if you have outdoor space, start highlighting it in your responses.",
          "Tom & Serg dropped from 4.6 to 4.4 this month due to complaints about portion sizes. This is an opportunity — consider running a 'generous portions' campaign to attract their dissatisfied customers."
        ].map((insight, i) => (
          <div key={i} className="bg-brand-light-blue border-l-4 border-brand-blue rounded-xl p-6 flex gap-4 items-start">
            <Lightbulb className="text-brand-blue shrink-0" size={24} />
            <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
