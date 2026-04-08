import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { POSTS } from "../../lib/posts";

export const metadata = { title: "Blog · Reputix" };

export default function Blog() {
  return (
    <main className="min-h-screen">
      <SiteNav />

      <section className="pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">
            Reputation Management Insights
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Tips, strategies, and data for UAE business owners
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-brand-200 transition-all"
            >
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${post.tagColor}`}>
                {post.tag}
              </span>
              <h3 className="mt-4 font-bold text-lg text-gray-900 group-hover:text-brand-700 transition">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                <span>
                  {post.date} · {post.read}
                </span>
                <span className="text-brand-600 font-semibold group-hover:translate-x-1 transition-transform">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
