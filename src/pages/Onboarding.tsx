import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShieldCheck, Zap, BarChart } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState('Professional & Polite');

  const plans = [
    { id: 'starter', name: 'Starter', price: '199', desc: 'Single location' },
    { id: 'growth', name: 'Growth', price: '499', desc: 'Up to 3 locations', popular: true },
    { id: 'pro', name: 'Pro', price: '999', desc: 'Up to 10 locations' },
  ];

  const tones = [
    { name: 'Professional & Polite', desc: 'Best for clinics, corporate, luxury retail', example: "Dear Ahmed, thank you for your feedback. We appreciate your business." },
    { name: 'Friendly & Casual', desc: 'Best for cafes, local shops, salons', example: "Hey Ahmed! Thanks so much for stopping by. Glad you liked the coffee!" },
    { name: 'Short & Direct', desc: 'Best for fast food, quick services', example: "Thanks for the review, Ahmed! We're happy you had a good experience." },
  ];

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Progress Bar */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-colors", s <= step ? "bg-brand-blue" : "bg-slate-200")} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Select Your Plan</h1>
              <p className="text-slate-500">Choose the best fit for your business goals.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => { setSelectedPlan(plan.id); nextStep(); }}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all relative",
                    plan.popular ? "border-brand-blue bg-white shadow-xl" : "border-slate-200 bg-white hover:border-brand-blue/50"
                  )}
                >
                  {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[10px] font-bold px-3 py-1 rounded-full">MOST POPULAR</span>}
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mb-4">{plan.desc}</p>
                  <div className="text-2xl font-bold mb-4">AED {plan.price}<span className="text-sm font-normal text-slate-400">/mo</span></div>
                  <div className="text-xs text-brand-blue font-bold">Select Plan →</div>
                </button>
              ))}
            </div>
            <button onClick={nextStep} className="text-slate-400 text-sm hover:underline">Or try Pay-As-You-Go</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 text-center max-w-md mx-auto">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Connect Google</h1>
              <p className="text-slate-500">We need access to read and respond to your Google Reviews.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <button 
                onClick={nextStep}
                className="w-full flex items-center justify-center gap-3 border border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors"
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-6 h-6" />
                Sign in with Google
              </button>
              <div className="flex items-center gap-3 text-left text-xs text-slate-400">
                <ShieldCheck className="text-brand-green shrink-0" size={20} />
                <p>Reputix uses official Google APIs. We never see your password and your data is encrypted.</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Choose AI Tone</h1>
              <p className="text-slate-500">How should Reputix sound when talking to your customers?</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {tones.map((tone) => (
                <button
                  key={tone.name}
                  onClick={() => setSelectedTone(tone.name)}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all",
                    selectedTone === tone.name ? "border-brand-blue bg-brand-light-blue" : "border-slate-200 bg-white hover:border-brand-blue/50"
                  )}
                >
                  <h3 className="font-bold mb-1">{tone.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{tone.desc}</p>
                  <div className="bg-white/50 p-3 rounded-lg border border-slate-200/50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Preview</p>
                    <p className="text-xs italic text-slate-600">"{tone.example}"</p>
                  </div>
                </button>
              ))}
            </div>
            <button 
              onClick={nextStep}
              className="bg-brand-blue text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors"
            >
              Confirm Tone & Continue
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-brand-light-green text-brand-green rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle size={48} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">You're All Set!</h1>
              <p className="text-slate-500">Reputix is now monitoring your reviews. We've found 24 past reviews we can optimize.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 bg-brand-light-blue text-brand-blue rounded-lg flex items-center justify-center"><Zap size={20} /></div>
                <div>
                  <p className="font-bold text-sm">Auto-responses enabled</p>
                  <p className="text-xs text-slate-400">Positive reviews will get instant replies.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 bg-brand-light-green text-brand-green rounded-lg flex items-center justify-center"><BarChart size={20} /></div>
                <div>
                  <p className="font-bold text-sm">Competitor tracking active</p>
                  <p className="text-xs text-slate-400">We're benchmarking you against 5 rivals.</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              Go to Dashboard <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
