import { useState, type ChangeEvent } from 'react';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <SiteLayout>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center space-y-4 mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">
              Get in touch
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Questions, demos, partnerships — we'd love to hear from you. We usually reply within
              a few hours.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              {sent ? (
                <div className="text-center py-14">
                  <div className="text-5xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-brand-navy">Message sent</h2>
                  <p className="text-slate-600 mt-2">
                    Thanks {form.name || 'there'} — we'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-1.5">
                        Your name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={update('name')}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-navy mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={update('email')}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-1.5">
                      Business name
                    </label>
                    <input
                      value={form.business}
                      onChange={update('business')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-navy mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-navy text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <Mail className="w-5 h-5 text-brand-blue mb-3" />
                <h3 className="font-bold text-brand-navy">Email</h3>
                <a
                  href="mailto:hello@reputix.io"
                  className="text-slate-600 text-sm hover:text-brand-blue"
                >
                  hello@reputix.io
                </a>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <MapPin className="w-5 h-5 text-brand-blue mb-3" />
                <h3 className="font-bold text-brand-navy">Office</h3>
                <p className="text-slate-600 text-sm">Dubai, United Arab Emirates</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <MessageCircle className="w-5 h-5 text-brand-blue mb-3" />
                <h3 className="font-bold text-brand-navy">Support</h3>
                <p className="text-slate-600 text-sm">
                  In-app chat for paying customers, Mon–Fri 9am–6pm GST.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
