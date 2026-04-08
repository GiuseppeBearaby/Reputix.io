import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const title = (slug || 'article')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <SiteLayout>
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight mt-6">
            {title}
          </h1>

          <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold text-brand-navy">Coming soon</h2>
            <p className="text-slate-600 mt-3 max-w-md mx-auto">
              This article is still in the oven. Drop your email and we'll send it to you the
              moment it's published.
            </p>

            {submitted ? (
              <div className="mt-6 inline-block bg-brand-light-green text-brand-green font-semibold px-5 py-3 rounded-xl">
                ✓ You're on the list — we'll be in touch.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubmitted(true);
                }}
                className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none"
                />
                <button
                  type="submit"
                  className="bg-brand-navy text-white font-semibold px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Notify me
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
