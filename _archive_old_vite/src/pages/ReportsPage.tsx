import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FileText, Download, Lightbulb } from 'lucide-react';
import { MOCK_RATING_TREND, MOCK_REPORTS } from '../lib/mock-data';
import { cn } from '../lib/utils';

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-navy">Reports & Insights</h1>
        <button className="bg-brand-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors">
          Generate Report
        </button>
      </div>

      {/* Metrics Over Time */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-700 mb-6">Rating & Volume Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_RATING_TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} domain={[0, 5]} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', paddingBottom: '20px' }} />
              <Line yAxisId="left" type="monotone" dataKey="rating" stroke="#007AFF" strokeWidth={3} dot={{ r: 4, fill: '#007AFF', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="Avg Rating" />
              <Line yAxisId="right" type="monotone" dataKey="reviewCount" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="Review Count" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Archive */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-700">Report Archive</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_REPORTS.map((report, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-brand-blue transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-brand-light-blue group-hover:text-brand-blue transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm text-brand-navy">{report.title}</h4>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      report.type === 'Weekly' ? "bg-brand-light-blue text-brand-blue" : "bg-purple-100 text-purple-600"
                    )}>
                      {report.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Generated on {report.dateGenerated}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-brand-blue transition-colors"><Download size={20} /></button>
                <button className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Quick Insights */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-700">AI Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Your negative reviews mentioning 'waiting time' increased 3x this month. Consider operational review during peak hours (12-2 PM Friday).",
            "Response rate improved from 78% to 92% since joining Reputix. This correlates with a 0.3 star rating increase.",
            "Predicted: at current trajectory, you'll reach 4.8 stars within 3 months if you maintain response rate above 90%."
          ].map((insight, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <Lightbulb className="text-brand-yellow" size={24} />
              <p className="text-sm text-slate-600 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
