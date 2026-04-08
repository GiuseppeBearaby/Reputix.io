import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function SiteLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="text-xl font-bold text-brand-navy">Reputix</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/#features" className="text-slate-600 hover:text-brand-blue font-medium">
                Features
              </Link>
              <Link to="/pricing" className="text-slate-600 hover:text-brand-blue font-medium">
                Pricing
              </Link>
              <Link to="/about" className="text-slate-600 hover:text-brand-blue font-medium">
                About
              </Link>
              <Link to="/blog" className="text-slate-600 hover:text-brand-blue font-medium">
                Blog
              </Link>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-slate-600 hover:text-brand-blue font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-brand-navy text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Get Free Report
              </button>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-3">
            <Link to="/pricing" className="block text-slate-600 font-medium">
              Pricing
            </Link>
            <Link to="/about" className="block text-slate-600 font-medium">
              About
            </Link>
            <Link to="/blog" className="block text-slate-600 font-medium">
              Blog
            </Link>
            <Link to="/contact" className="block text-slate-600 font-medium">
              Contact
            </Link>
            <button
              onClick={() => navigate('/onboarding')}
              className="block w-full bg-brand-navy text-white px-5 py-2 rounded-lg font-medium text-center"
            >
              Get Free Report
            </button>
          </div>
        )}
      </nav>

      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-4">
            <h4 className="font-bold text-brand-navy">Product</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>
                <Link to="/#features" className="hover:text-brand-blue">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-blue">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-brand-blue">
                  Free Report
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-blue">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-brand-navy">Company</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>
                <Link to="/about" className="hover:text-brand-blue">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-blue">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-blue">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-brand-navy">Legal</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>
                <Link to="/terms" className="hover:text-brand-blue">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-brand-blue">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-blue">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-brand-navy">Connect</h4>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram">
                <Instagram className="text-slate-400 hover:text-brand-blue" size={20} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="text-slate-400 hover:text-brand-blue" size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter className="text-slate-400 hover:text-brand-blue" size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-slate-400 text-sm">
          © 2026 Reputix · Made in Dubai 🇦🇪
        </div>
      </footer>
    </div>
  );
}
