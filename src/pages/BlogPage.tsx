import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';

const POSTS = [
  {
    slug: 'respond-negative-reviews-uae',
    tag: 'Guide',
    title: 'How to respond to negative reviews in the UAE (without sounding defensive)',
    excerpt:
      'A practical playbook with templates in English and Arabic for handling one-star reviews the right way.',
    date: 'April 2026',
  },
  {
    slug: 'review-response-rate-roi',
    tag: 'Data',
    title: 'We analyzed 10,000 reviews — responding doubles your ratings growth',
    excerpt:
      'What happens to businesses that reply to every review vs. those that ignore them. The numbers are striking.',
    date: 'April 2026',
  },
  {
    slug: 'google-reviews-seo-ranking',
    tag: 'Strategy',
    title: 'Why Google reviews matter more than your SEO agency thinks',
    excerpt:
      'The quiet ranking factor most local businesses in Dubai are ignoring — and how to fix it in 30 days.',
    date: 'March 2026',
  },
  {
    slug: 'case-study-dubai-restaurant',
    tag: 'Case Study',
    title: 'How a Dubai restaurant went from 4.1 to 4.7 stars in 90 days',
    excerpt:
      'The exact workflow, tools, and response strategy that turned things around for a JBR eatery.',
    date: 'March 2026',
  },
];

const TAG_COLORS: Record<string, string> = {
  Guide: 'bg-brand-light-blue text-brand-blue',
  Data: 'bg-brand-light-green text-brand-green',
  Strategy: 'bg-brand-light-yellow text-brand-yellow',
  'Case Study': 'bg-brand-light-red text-brand-red',
};

export default function BlogPage() {
  return (
    <SiteLayout>
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <header className="text-center space-y-4 mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">
              The Reputix blog
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Playbooks, data, and case studies for UAE business owners who take their reputation
              seriously.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            {POSTS.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-brand-blue/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      TAG_COLORS[p.tag] || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {p.tag}
                  </span>
                  <span className="text-xs text-slate-400">{p.date}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy leading-snug">{p.title}</h3>
                <p className="text-slate-600 mt-3 text-sm leading-relaxed">{p.excerpt}</p>
                <span className="inline-block mt-4 text-brand-blue font-semibold text-sm">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
