import Link from "next/link";
import { Sparkles, Eye, MapPin } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export const metadata = { title: "About · Reputix" };

export default function About() {
  return (
    <main className="min-h-screen">
      <SiteNav />

      <section className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            We believe every business deserves a great online reputation.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-brand-50 max-w-2xl mx-auto">
            Reputix was born in Dubai to help local businesses take control of what the internet says about them.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-14">
          <Block title="The Problem We Saw">
            Dubai has over 30,000 restaurants, clinics, and local businesses. Most have no idea what customers, journalists, or social media say about them — until it&apos;s too late. A single unanswered 1-star review can cost a restaurant 30 customers.
          </Block>
          <Block title="What We Built">
            Reputix scans the entire internet for your business — reviews, articles, social posts, directory listings — and gives you a complete picture in seconds. Then our AI monitors everything 24/7, responds to reviews automatically, and alerts you the moment something needs your attention.
          </Block>
          <Block title="Built for the UAE">
            We understand the local market. Our AI speaks the language (English and Arabic), knows the local competitors, and gives advice that makes sense for Dubai businesses.
          </Block>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900">
            What we stand for
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                Icon: Sparkles,
                title: "AI-First",
                desc: "We automate the tedious parts so owners can focus on what matters: running a great business.",
              },
              {
                Icon: Eye,
                title: "Transparent",
                desc: "Clear pricing, honest reports, no hidden features. We show you exactly what we find.",
              },
              {
                Icon: MapPin,
                title: "Local",
                desc: "Built in Dubai, for the UAE. We speak your language and understand your market.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">{title}</h3>
                <p className="mt-2 text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Ready to see what the internet says about you?
          </h2>
          <Link
            href="/"
            className="inline-block mt-8 bg-gradient-to-r from-brand-700 to-brand-500 hover:opacity-90 text-white font-bold py-4 px-10 rounded-xl text-base transition"
          >
            Get Free Report →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{title}</h2>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}
