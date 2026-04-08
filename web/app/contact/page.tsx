"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Clock, Instagram, Linkedin, Twitter, Check } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen">
      <SiteNav />

      <section className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Have a question? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-5 gap-8">
            {/* Form */}
            <div className="md:col-span-3 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/40">
                    <Check className="w-9 h-9 text-white" strokeWidth={3} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-gray-900">Thanks!</h3>
                  <p className="mt-2 text-gray-600">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-700 to-brand-500 hover:opacity-90 text-white font-bold py-4 rounded-xl text-base transition"
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="md:col-span-2 space-y-4">
              <InfoCard Icon={Mail} title="Email" value="hello@reputix.io" href="mailto:hello@reputix.io" />
              <InfoCard Icon={MapPin} title="Location" value="Dubai, UAE 🇦🇪" />
              <InfoCard Icon={Clock} title="Response time" value="Within 24 hours" />

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="text-sm font-bold text-gray-900 mb-4">Follow us</div>
                <div className="flex gap-3">
                  {[
                    { Icon: Instagram, href: "https://instagram.com/reputix.io" },
                    { Icon: Linkedin, href: "#" },
                    { Icon: Twitter, href: "#" },
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      className="w-10 h-10 rounded-xl bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700 transition"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center text-sm text-gray-500">
            Looking for answers?{" "}
            <Link href="/pricing" className="text-brand-700 font-semibold hover:underline">
              Check our FAQ on the pricing page →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function InfoCard({
  Icon,
  title,
  value,
  href,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-brand-700" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {title}
        </div>
        <div className="mt-1 font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
