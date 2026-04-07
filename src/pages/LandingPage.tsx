import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Link2, 
  Bot, 
  TrendingUp, 
  MessageSquare, 
  ShieldAlert, 
  BarChart3, 
  Target, 
  Quote,
  Menu,
  X,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">R</div>
              <span className="text-xl font-bold text-brand-navy">Reputix</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-brand-blue font-medium">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-brand-blue font-medium">Pricing</a>
              <button onClick={() => navigate('/onboarding')} className="text-slate-600 hover:text-brand-blue font-medium">Login</button>
              <button onClick={() => navigate('/onboarding')} className="bg-brand-navy text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                Get Free Report
              </button>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4">
            <a href="#features" className="block text-slate-600 font-medium">Features</a>
            <a href="#pricing" className="block text-slate-600 font-medium">Pricing</a>
            <button onClick={() => navigate('/onboarding')} className="block w-full text-left text-slate-600 font-medium">Login</button>
            <button onClick={() => navigate('/onboarding')} className="block w-full bg-brand-navy text-white px-5 py-2 rounded-lg font-medium text-center">
              Get Free Report
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-brand-light-blue text-brand-blue px-4 py-1.5 rounded-full text-sm font-semibold"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              AI-Powered Reputation Management
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-brand-navy leading-tight"
            >
              Your customers are talking.<br />
              <span className="text-brand-blue">Are you listening?</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-xl"
            >
              Reputix responds to your Google Reviews automatically, flags problems before they go viral, and tells you exactly how to beat your competitors in Dubai.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => navigate('/onboarding')}
                className="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-blue/25 hover:bg-blue-600 transition-all transform hover:scale-105"
              >
                Get Your Free Score →
              </button>
              <button 
                className="bg-white text-brand-navy border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Floating AI Card Visual */}
          <div className="hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-md ml-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl">👤</div>
                <div>
                  <div className="font-bold text-brand-navy">Ahmed S.</div>
                  <div className="flex text-brand-yellow text-sm">★★★★★</div>
                </div>
                <div className="ml-auto text-xs text-slate-400">2 mins ago</div>
              </div>
              <p className="text-slate-600 mb-6 italic">"Amazing service at the Jumeirah branch! The staff was very helpful and the atmosphere was perfect."</p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-brand-light-blue/50 p-4 rounded-2xl border border-brand-blue/20"
              >
                <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-sm">
                  <Bot size={16} /> Reputix AI Draft
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">"Thank you so much Ahmed! We're thrilled you enjoyed the atmosphere at our Jumeirah branch. We'll share your kind words with the team!"</p>
                <div className="mt-3 flex gap-2">
                  <button className="bg-brand-blue text-white text-xs px-3 py-1.5 rounded-lg font-bold">Approve & Post</button>
                  <button className="bg-white text-slate-500 text-xs px-3 py-1.5 rounded-lg border border-slate-200 font-bold">Edit</button>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Free Report Form Section */}
      <section className="bg-brand-navy py-20 px-4 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">See what your customers really think — in 60 seconds.</h2>
            <p className="text-slate-400 text-lg">Our AI scans your entire digital footprint to find hidden trends and competitive gaps.</p>
            <ul className="space-y-4">
              {[
                "Deep Sentiment Analysis",
                "Response Rate Benchmarking",
                "Competitor Comparison"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-brand-blue w-6 h-6" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 text-brand-navy shadow-2xl">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/report/1'); }}>
              <div>
                <label className="block text-sm font-semibold mb-1">Business Name</label>
                <input type="text" placeholder="e.g. Al Safa Cafe" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Google Maps Link</label>
                <input type="url" placeholder="https://maps.google.com/..." className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Email</label>
                  <input type="email" placeholder="tariq@cafe.ae" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone</label>
                  <input type="tel" placeholder="+971..." className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors">
                Scan My Business
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Every ignored review is a customer who chose your competitor.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { stat: "89%", label: "of consumers read business responses before visiting" },
            { stat: "45%", label: "more likely to visit if owner responds to negative reviews" },
            { stat: "AED 5,000", label: "lost per month by average Dubai restaurant from poor review management" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center space-y-4">
              <div className="text-5xl font-bold text-brand-blue">{item.stat}</div>
              <p className="text-slate-600 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Up and running in 3 minutes</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              { icon: Link2, title: "Connect Google", desc: "Link your Google Business Profile in one click" },
              { icon: Bot, title: "AI Takes Over", desc: "Reputix monitors your reviews 24/7 and responds instantly" },
              { icon: TrendingUp, title: "Watch Growth", desc: "Get weekly insights and watch your rating climb" }
            ].map((step, i) => (
              <div key={i} className="text-center space-y-4 relative z-10">
                <div className="w-20 h-20 bg-brand-blue rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-blue/20">
                  <step.icon size={40} />
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Reputix does the work. You get the customers.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: MessageSquare, title: "Automatic Responses", desc: "Personalized replies to positive reviews, posted instantly. Never repetitive." },
            { icon: ShieldAlert, title: "Negative Review Defense", desc: "AI-drafted responses + resolution strategies. You approve before posting." },
            { icon: BarChart3, title: "Weekly Insights", desc: "Know exactly what customers love and hate. Spot trends before competitors." },
            { icon: Target, title: "Competitor Intelligence", desc: "See how you stack up. Get actionable suggestions to outperform rivals." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-brand-blue transition-colors group">
              <feature.icon className="text-brand-blue mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing</h2>
            <div className="flex items-center justify-center gap-4">
              <span className={cn("text-sm font-medium", !isAnnual ? "text-white" : "text-slate-400")}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-12 h-6 bg-brand-blue rounded-full relative transition-colors"
              >
                <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all", isAnnual ? "left-7" : "left-1")} />
              </button>
              <span className={cn("text-sm font-medium flex items-center gap-2", isAnnual ? "text-white" : "text-slate-400")}>
                Annual <span className="bg-brand-green/20 text-brand-green text-[10px] px-2 py-0.5 rounded-full">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 space-y-6">
              <div>
                <h3 className="text-xl font-bold">Starter</h3>
                <p className="text-slate-400 text-sm">Perfect for single-location businesses</p>
              </div>
              <div className="text-4xl font-bold">
                AED {isAnnual ? '159' : '199'}<span className="text-lg font-normal text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4">
                {["1 Google location", "Auto-respond to positive reviews", "5 negative review drafts/month", "1 competitor benchmark", "Weekly email digest", "Email support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle className="text-brand-green w-4 h-4" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors">Start Free Trial</button>
            </div>

            {/* Growth */}
            <div className="bg-slate-800 p-8 rounded-3xl border-2 border-brand-blue relative space-y-6 shadow-2xl shadow-brand-blue/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
              <div>
                <h3 className="text-xl font-bold">Growth</h3>
                <p className="text-slate-400 text-sm">For growing businesses that want more</p>
              </div>
              <div className="text-4xl font-bold">
                AED {isAnnual ? '399' : '499'}<span className="text-lg font-normal text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4">
                {["Up to 3 locations", "Unlimited negative review drafts", "AI resolution strategies", "3 competitor benchmarks", "Weekly + Monthly PDF reports", "Review Boost QR codes"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle className="text-brand-green w-4 h-4" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-blue-600 transition-colors">Start 14-Day Trial</button>
            </div>

            {/* Pro */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 space-y-6">
              <div>
                <h3 className="text-xl font-bold">Pro</h3>
                <p className="text-slate-400 text-sm">Full reputation command center</p>
              </div>
              <div className="text-4xl font-bold">
                AED {isAnnual ? '799' : '999'}<span className="text-lg font-normal text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4">
                {["Up to 10 locations", "5 competitor benchmarks", "Advanced predictive insights", "Custom AI queries", "On-demand reports", "Priority dedicated support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle className="text-brand-green w-4 h-4" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors">Start 14-Day Trial</button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-300">Not ready for a subscription? Try <span className="text-white font-bold">Pay-Per-Response at AED 9/response</span>. No commitment.</p>
            <button className="text-brand-blue font-bold hover:underline">Learn More →</button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Dubai business owners say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { text: "Since using Reputix, our response rate went from 20% to 95%. We've seen a clear increase in foot traffic.", author: "Tariq M.", biz: "Al Safa Cafe", loc: "Jumeirah" },
            { text: "I used to spend 2 hours a week on reviews. Now it's zero. The AI responses are better than what I'd write myself.", author: "Dr. Sara K.", biz: "Bloom Dental Clinic", loc: "Business Bay" },
            { text: "The competitor insights alone are worth the subscription. I know exactly what my rivals are doing.", author: "Youssef H.", biz: "Glow Salon", loc: "Dubai Marina" }
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative">
              <Quote className="text-brand-blue/10 absolute top-6 right-6" size={48} />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <span key={i} className="text-brand-yellow text-lg">★</span>)}
              </div>
              <p className="text-slate-600 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="font-bold text-brand-navy">{t.author}</div>
              <div className="text-sm text-slate-400">{t.biz}, {t.loc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-navy py-20 px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Your competitors are already responding. Don't get left behind.</h2>
          <p className="text-slate-400 text-lg">Join 50+ Dubai businesses already growing with Reputix.</p>
          <button 
            onClick={() => navigate('/onboarding')}
            className="bg-white text-brand-navy px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors"
          >
            Start Free Trial — 30 Days, No Credit Card
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-4">
            <h4 className="font-bold">Product</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>Free Report</li>
              <li>Login</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Company</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Support</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Connect</h4>
            <div className="flex gap-4">
              <Instagram className="text-slate-400 hover:text-brand-blue cursor-pointer" size={20} />
              <Linkedin className="text-slate-400 hover:text-brand-blue cursor-pointer" size={20} />
              <Twitter className="text-slate-400 hover:text-brand-blue cursor-pointer" size={20} />
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
