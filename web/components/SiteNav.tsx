import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center text-white font-extrabold">
            R
          </div>
          <span className="font-bold text-lg">Reputix</span>
        </Link>
        <div className="hidden sm:flex gap-8 text-sm font-medium text-gray-600">
          <Link href="/#features" className="hover:text-brand-700">Features</Link>
          <Link href="/pricing" className="hover:text-brand-700">Pricing</Link>
          <Link href="/blog" className="hover:text-brand-700">Blog</Link>
          <Link href="/about" className="hover:text-brand-700">About</Link>
        </div>
        <Link
          href="/onboarding"
          className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Start Free Trial
        </Link>
      </div>
    </nav>
  );
}
