"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import { POSTS } from "../../../lib/posts";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === params?.slug);
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <main className="min-h-screen">
      <SiteNav />

      <article className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/blog" className="text-sm text-brand-700 font-semibold hover:underline">
            ← Back to blog
          </Link>

          {post ? (
            <>
              <span className={`inline-block mt-6 text-xs font-bold px-2.5 py-1 rounded-full ${post.tagColor}`}>
                {post.tag}
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 text-sm text-gray-500">
                {post.date} · {post.read}
              </p>
            </>
          ) : (
            <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold text-gray-900">
              Article not found
            </h1>
          )}

          <div className="mt-12 bg-brand-50 border border-brand-100 rounded-2xl p-8 text-center">
            <div className="text-3xl">📬</div>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">Coming Soon</h2>
            <p className="mt-2 text-gray-600">
              Subscribe to get notified when this article is published.
            </p>

            {subbed ? (
              <div className="mt-6 text-brand-700 font-semibold">
                ✓ You&apos;re on the list. Check your inbox soon.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubbed(true);
                }}
                className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-brand-700 to-brand-500 hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl transition"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
