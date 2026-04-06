import { QrCode, Copy, Printer, Scan, GitFork, Shield } from 'lucide-react';
import { MOCK_QR_SCANS } from '../lib/mock-data';
import { cn } from '../lib/utils';

export default function ReviewBoostPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-brand-navy">Review Boost</h1>
        <p className="text-slate-500">Encourage happy customers to leave reviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">QR Code Scans</p>
          <p className="text-2xl font-bold">145</p>
          <p className="text-[10px] text-slate-400 font-bold mt-1">This month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reviews Generated</p>
          <p className="text-2xl font-bold">38</p>
          <p className="text-[10px] text-brand-green font-bold mt-1">26% conversion rate</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Rating from QR</p>
          <p className="text-2xl font-bold">4.8★</p>
          <p className="text-[10px] text-brand-green font-bold mt-1">+0.2 vs organic</p>
        </div>
      </div>

      {/* QR Code Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-12">
        <div className="w-48 h-48 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center relative group">
          <QrCode size={120} className="text-slate-200 group-hover:text-brand-blue transition-colors" />
          <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
            <span className="bg-white text-brand-blue px-3 py-1 rounded-lg text-xs font-bold shadow-sm">Preview QR</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-brand-navy">Your Review Link</h3>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 justify-center md:justify-start">
              <span className="text-brand-blue font-bold">review.reputix.io/alsafa</span>
              <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400"><Copy size={16} /></button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button className="bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center gap-2">
              Download QR Code
            </button>
            <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Printer size={18} /> Print Table Card
            </button>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-slate-100/50 p-10 rounded-3xl space-y-12">
        <div className="grid md:grid-cols-3 gap-12 relative">
          {[
            { icon: Scan, title: "Scan QR", desc: "Customer scans QR code at your location" },
            { icon: GitFork, title: "Smart Routing", desc: "Happy → Google Reviews. Unhappy → private feedback form" },
            { icon: Shield, title: "Protect Rating", desc: "More 5-star reviews. Complaints caught privately." }
          ].map((step, i) => (
            <div key={i} className="text-center space-y-4 relative z-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-blue mx-auto shadow-sm border border-slate-200">
                <step.icon size={32} />
              </div>
              <h4 className="font-bold text-brand-navy">{step.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px border-t-2 border-dashed border-slate-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-700">Recent Scans</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Outcome</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_QR_SCANS.map((scan, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{scan.date}</td>
                  <td className="px-6 py-4 text-sm font-medium">{scan.source}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-sm font-bold",
                      scan.outcome.includes('Review') ? "text-brand-green" : 
                      scan.outcome.includes('Feedback') ? "text-brand-yellow" : "text-slate-400"
                    )}>
                      {scan.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{scan.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
