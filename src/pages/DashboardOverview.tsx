import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { Star, TrendingUp, MessageSquare, Sparkles, ArrowUpRight } from 'lucide-react';
import { MOCK_SENTIMENT_TREND, MOCK_ALERTS } from '../lib/mock-data';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DashboardOverview() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Header with Welcome */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-brand-navy tracking-tight">Marhaba, Tariq! 👋</h1>
          <p className="text-slate-500 font-medium">Here's what's happening at <span className="text-brand-blue font-bold">Al Safa Cafe</span> today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-5 py-2.5 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-200/60">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green"></span>
            </div>
            <span className="text-sm font-bold text-brand-navy">AI Agent Active</span>
          </div>
          <button className="bg-brand-navy text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-brand-navy/20 hover:bg-slate-800 transition-all">
            Generate Report
          </button>
        </div>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Score Card - Large */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={160} />
          </div>
          <div className="relative z-10 space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand-light-blue text-brand-blue rounded-2xl flex items-center justify-center shadow-inner">
                  <Star size={28} className="fill-brand-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-navy">Reputation Health</h3>
                  <p className="text-sm text-slate-400 font-medium">Based on 1,240 total reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold">
                <ArrowUpRight size={14} /> +12%
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end gap-12">
              <div className="space-y-1">
                <p className="text-7xl font-black text-brand-navy tracking-tighter">78<span className="text-3xl text-slate-300 ml-1">/100</span></p>
                <p className="text-slate-400 font-medium text-sm">Excellent performance this month</p>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                  <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-brand-blue" /> AI Sentiment Analysis</span>
                  <span className="text-brand-navy">88% Positive</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '88%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-brand-blue to-brand-green h-full rounded-full shadow-sm" 
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats - Vertical Stack */}
        <div className="md:col-span-4 space-y-8">
          <motion.div 
            variants={itemVariants}
            className="bg-brand-navy p-8 rounded-[2.5rem] text-white space-y-4 shadow-2xl shadow-brand-navy/20 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Response Rate</p>
            <p className="text-5xl font-black">92%</p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-blue w-[92%] h-full rounded-full" />
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium">Top 5% in Jumeirah area</p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 space-y-4 shadow-sm relative overflow-hidden"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Reviews</p>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-black text-brand-navy">12</p>
              <span className="text-brand-green font-bold text-sm">+3 vs last week</span>
            </div>
            <div className="flex -space-x-2 pt-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+8</div>
            </div>
          </motion.div>
        </div>

        {/* Sentiment Trend - Wide */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-12 lg:col-span-7 bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm"
        >
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-bold text-xl text-brand-navy">Customer Sentiment</h3>
              <p className="text-sm text-slate-400 font-medium">Daily AI sentiment tracking</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_SENTIMENT_TREND}>
                <defs>
                  <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 500 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 500 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px 16px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="positive" 
                  stroke="#2563EB" 
                  fillOpacity={1} 
                  fill="url(#colorPos)" 
                  strokeWidth={4} 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Alerts - Compact */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-12 lg:col-span-5 bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl text-brand-navy">Smart Alerts</h3>
            <button className="text-brand-blue text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-8">
            {MOCK_ALERTS.map((alert, i) => (
              <div key={i} className="flex gap-5 items-start group cursor-pointer">
                <div className={cn(
                  "w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm",
                  alert.severity === 'critical' ? 'bg-red-50 text-brand-red' : 
                  alert.severity === 'warning' ? 'bg-amber-50 text-brand-yellow' : 'bg-blue-50 text-brand-blue'
                )}>
                  <TrendingUp size={24} />
                </div>
                <div className="flex-1 border-b border-slate-50 pb-6 group-last:border-none">
                  <p className="text-[15px] font-bold text-brand-navy group-hover:text-brand-blue transition-colors leading-tight">{alert.message}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    {alert.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Floating WhatsApp Button (UAE Style) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-10 right-10 z-50"
      >
        <button className="bg-[#25D366] text-white px-6 py-4 rounded-3xl shadow-[0_20px_50px_rgba(37,211,102,0.3)] hover:scale-110 transition-all flex items-center gap-3 group">
          <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold">WhatsApp Support</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
