import { useState } from 'react';
import { Lightbulb, CreditCard, LogOut, Download, ExternalLink } from 'lucide-react';
import { MOCK_USER, MOCK_REFERRALS } from '../lib/mock-data';
import { cn } from '../lib/utils';

export default function SettingsPage() {
  const [tone, setTone] = useState('Professional & Polite');

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-20">
      <h1 className="text-2xl font-bold text-brand-navy">Settings</h1>

      {/* Section 1: Business Profile */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-slate-700">Business Profile</h3>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Business Name</label>
              <input type="text" defaultValue={MOCK_USER.businessName} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none text-sm bg-white">
                <option>Restaurant</option>
                <option>Clinic</option>
                <option>Salon</option>
                <option>Gym</option>
                <option>Hotel</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Google Maps Link</label>
            <input type="text" defaultValue="https://maps.google.com/alsafa-cafe" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none text-sm" />
          </div>
          <button className="bg-brand-blue text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors">
            Save Changes
          </button>
        </div>
      </section>

      {/* Section 2: AI Tone */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-slate-700">AI Response Tone</h3>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {['Professional & Polite', 'Friendly & Casual', 'Short & Direct'].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={cn(
                  "p-4 rounded-xl border-2 text-left transition-all",
                  tone === t ? "border-brand-blue bg-brand-light-blue" : "border-slate-200 hover:border-brand-blue/50"
                )}
              >
                <p className="font-bold text-sm mb-1">{t}</p>
                <p className="text-[10px] text-slate-500 leading-tight">Best for clinics, corporate, luxury retail</p>
              </button>
            ))}
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Example Response Preview</p>
            <p className="text-sm text-slate-600 italic">"Dear Ahmed, thank you for your feedback. We appreciate your business and hope to see you again soon."</p>
          </div>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Auto-respond to positive reviews</p>
                <p className="text-xs text-slate-400">Instantly reply to 4 and 5 star reviews</p>
              </div>
              <div className="w-12 h-6 bg-brand-green rounded-full relative"><div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" /></div>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="text-sm font-bold">Require approval for negative reviews</p>
                <p className="text-xs text-slate-400">Always review drafts before posting</p>
              </div>
              <div className="w-12 h-6 bg-brand-green rounded-full relative"><div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Notifications */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-slate-700">Notifications</h3>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          {[
            { label: 'Weekly digest email', active: true },
            { label: 'Negative review alerts', active: true },
            { label: 'Monthly report email', active: true },
            { label: 'WhatsApp notifications', active: false, badge: 'Coming Soon' }
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{n.label}</p>
                {n.badge && <span className="bg-slate-100 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{n.badge}</span>}
              </div>
              <div className={cn("w-10 h-5 rounded-full relative", n.active ? "bg-brand-green" : "bg-slate-200")}>
                <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all", n.active ? "right-0.5" : "left-0.5")} />
              </div>
            </div>
          ))}
          <div className="pt-4">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Notification Email</label>
            <input type="email" defaultValue={MOCK_USER.email} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none text-sm" />
          </div>
        </div>
      </section>

      {/* Section 4: Referral */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-slate-700">Referral Program</h3>
        <div className="bg-brand-navy text-white p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-bold text-brand-blue uppercase tracking-wider">Earn Free Months</p>
            <h4 className="text-xl font-bold">Refer a business, get 1 month free.</h4>
            <p className="text-slate-400 text-sm">They get a 45-day extended trial. You get a full month credited to your account.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3">
            <span className="text-sm font-medium flex-1 truncate">https://reputix.io/ref/ALSAFA</span>
            <button className="text-brand-blue font-bold text-sm">Copy</button>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 bg-white/5 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold">{MOCK_REFERRALS.totalReferrals}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Referrals</p>
            </div>
            <div className="flex-1 bg-white/5 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold">{MOCK_REFERRALS.converted}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Converted</p>
            </div>
            <div className="flex-1 bg-brand-green/20 p-4 rounded-xl text-center border border-brand-green/20">
              <p className="text-2xl font-bold text-brand-green">{MOCK_REFERRALS.monthsEarned}</p>
              <p className="text-[10px] text-brand-green font-bold uppercase">Free Months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Billing */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-slate-700">Billing & Subscription</h3>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-light-blue text-brand-blue rounded-xl flex items-center justify-center">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="font-bold text-brand-navy">Growth Plan</p>
                <p className="text-xs text-slate-400">AED 499/month · Next billing April 15, 2026</p>
              </div>
            </div>
            <button className="text-brand-blue font-bold text-sm hover:underline">Change Plan</button>
          </div>
          <div className="flex items-center justify-between text-sm py-4 border-y border-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-[8px] font-bold">VISA</div>
              <span className="text-slate-600">Visa ending in 4242</span>
            </div>
            <button className="text-slate-400 hover:text-brand-blue font-bold">Update</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold">47</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Auto-responses</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">12</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Negative Drafts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">3</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Danger Zone */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-brand-red">Danger Zone</h3>
        <div className="bg-white p-8 rounded-2xl border border-brand-red/20 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 px-6 py-3 border border-brand-red text-brand-red rounded-xl font-bold text-sm hover:bg-brand-red/5 transition-colors">
              Pause Account
            </button>
            <button className="flex-1 px-6 py-3 border border-brand-red text-brand-red rounded-xl font-bold text-sm hover:bg-brand-red/5 transition-colors">
              Cancel Subscription
            </button>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
            <Download size={18} /> Export My Data (PDF)
          </button>
        </div>
      </section>
    </div>
  );
}
