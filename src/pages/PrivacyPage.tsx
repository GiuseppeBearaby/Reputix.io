import SiteLayout from '../components/SiteLayout';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly (name, email, business details), data from connected platforms (Google Business Profile reviews, ratings), and usage data (log files, device info, analytics events).',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use your data to provide and improve the Service, generate AI responses and reports, send product updates, process payments, and comply with legal obligations.',
  },
  {
    title: '3. Third-Party Services',
    body: 'Reputix integrates with OpenAI (AI generation), Stripe (payments), Resend (transactional emails), Supabase (database), and Google APIs (review data). These providers process data under their own privacy policies.',
  },
  {
    title: '4. Data Storage & Security',
    body: 'Data is stored in Supabase with row-level security, SSL/TLS encryption in transit, and encryption at rest. We follow industry best practices but no system is 100% secure.',
  },
  {
    title: '5. Data Retention',
    body: 'We retain your data while your account is active and for 90 days after cancellation, after which it is permanently deleted. You may request earlier deletion at any time.',
  },
  {
    title: '6. Your Rights',
    body: 'You have the right to access, correct, export, or delete your personal data. To exercise these rights, contact privacy@reputix.io.',
  },
  {
    title: '7. Cookies',
    body: 'We use essential cookies for authentication and analytics cookies (with consent) to improve the Service. You can manage cookie preferences in your browser.',
  },
  {
    title: '8. Children',
    body: 'Reputix is not directed to children under 18. We do not knowingly collect data from minors.',
  },
  {
    title: '9. International Transfers',
    body: 'Your data may be processed in the UAE, EU, and US. We ensure appropriate safeguards are in place for international transfers.',
  },
  {
    title: '10. Changes to This Policy',
    body: 'We may update this Privacy Policy. Material changes will be notified by email. Continued use after changes constitutes acceptance.',
  },
  {
    title: '11. Contact',
    body: 'Questions or concerns about privacy? Email privacy@reputix.io.',
  },
];

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-500 mt-3">Last updated: April 2026</p>
          </header>
          <div className="space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-bold text-brand-navy mb-2">{s.title}</h2>
                <p className="text-slate-700 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
