import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Star, TrendingUp, ArrowRight } from 'lucide-react';
import { MOCK_SENTIMENT_TREND, MOCK_ALERTS, MOCK_REVIEWS } from '../lib/mock-data';
import { cn } from '../lib/utils';

const HEALTH_DATA = [
  { name: 'Score', value: 78 },
  { name: 'Remaining', value: 22 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Row 1: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={HEALTH_DATA}
                  innerRadius={22}
                  outerRadius={30}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#F1F5F9" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">78</div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reputation Score</p>
            <p className="text-2xl font-bold">78/100</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Average Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">4.6</p>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-brand-yellow text-brand-yellow" />)}
            </div>
          </div>
          <p className="text-[10px] text-brand-green font-bold mt-1">↑ 0.2 from last month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Response Rate</p>
          <p className="text-2xl font-bold">92%</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-brand-blue h-full rounded-full" style={{ width: '92%' }} />
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-1">Industry avg: 67%</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reviews This Week</p>
          <p className="text-2xl font-bold">12</p>
          <p className="text-[10px] text-brand-green font-bold mt-1">+4 vs last week</p>
        </div>
      </div>

      {/* Row 2: Charts & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-700">Sentiment Trend</h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5 text-brand-green">
                <div className="w-2 h-2 bg-brand-green rounded-full" /> Positive
              </div>
              <div className="flex items-center gap-1.5 text-brand-red">
                <div className="w-2 h-2 bg-brand-red rounded-full" /> Negative
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_SENTIMENT_TREND}>
                <defs>
                  <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="positive" stroke="#10B981" fillOpacity={1} fill="url(#colorPos)" strokeWidth={2} />
                <Area type="monotone" dataKey="negative" stroke="#EF4444" fillOpacity={1} fill="url(#colorNeg)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-700 mb-6">Recent Alerts</h3>
          <div className="space-y-4 flex-1 overflow-auto max-h-64 lg:max-h-none hide-scrollbar">
            {MOCK_ALERTS.map((alert, i) => (
              <div key={i} className="flex gap-3 items-start group cursor-pointer">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-1.5 shrink-0",
                  alert.severity === 'critical' ? 'bg-brand-red' : 
                  alert.severity === 'warning' ? 'bg-brand-yellow' : 'bg-brand-blue'
                )} />
                <div>
                  <p className="text-sm font-medium text-slate-700 group-hover:text-brand-blue transition-colors leading-tight">{alert.message}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Recent Reviews */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">Recent Reviews</h3>
          <button className="text-brand-blue text-sm font-bold flex items-center gap-1 hover:underline">
            View All Reviews <ArrowRight size={14} />
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {MOCK_REVIEWS.slice(0, 5).map((review) => (
            <div key={review.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <img src={`https://i.pravatar.cc/150?u=${review.author}`} alt={review.author} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">{review.author}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={10} 
                          className={cn(i < review.rating ? "fill-brand-yellow text-brand-yellow" : "text-slate-200")} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{review.text}</p>
                </div>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider self-start sm:self-center",
                review.status === 'auto-responded' ? "bg-brand-light-green text-brand-green" :
                review.status === 'pending' ? "bg-brand-light-yellow text-brand-yellow" :
                review.status === 'escalated' ? "bg-brand-light-red text-brand-red" : "bg-slate-100 text-slate-500"
              )}>
                {review.status.replace('-', ' ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
