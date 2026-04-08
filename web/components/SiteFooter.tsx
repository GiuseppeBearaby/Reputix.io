import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center text-white font-extrabold">
                R
              </div>
              <span className="font-bold text-lg text-white">Reputix</span>
            </div>
            <p className="mt-3 text-sm max-w-xs">
              AI reputation management for UAE local businesses.
            </p>
            <a href="mailto:hello@reputix.io" className="hover:text-white block mt-4 text-sm">
              hello@reputix.io
            </a>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-white mb-3">Product</div>
            <Link href="/pricing" className="hover:text-white block mt-1">Pricing</Link>
            <Link href="/blog" className="hover:text-white block mt-1">Blog</Link>
            <Link href="/about" className="hover:text-white block mt-1">About</Link>
            <Link href="/contact" className="hover:text-white block mt-1">Contact</Link>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-white mb-3">Legal</div>
            <Link href="/terms" className="hover:text-white block mt-1">Terms</Link>
            <Link href="/privacy" className="hover:text-white block mt-1">Privacy</Link>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-800 text-xs text-center">
          © {new Date().getFullYear()} Reputix · Made in Dubai 🇦🇪
        </div>
      </div>
    </footer>
  );
}
