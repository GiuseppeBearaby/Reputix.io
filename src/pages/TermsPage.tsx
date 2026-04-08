import SiteLayout from '../components/SiteLayout';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using Reputix ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.',
  },
  {
    title: '2. Description of Service',
    body: 'Reputix is an AI-powered reputation management platform that monitors reviews, media mentions, and online visibility for businesses, and generates AI-assisted responses and insights.',
  },
  {
    title: '3. Account Registration',
    body: 'You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and all activity under your account.',
  },
  {
    title: '4. Free Trial',
    body: 'We offer a 30-day free trial on the Starter plan and 14 days on Growth/Pro. No credit card is required to start. After the trial, continued use requires a paid subscription.',
  },
  {
    title: '5. Billing & Subscriptions',
    body: 'Subscriptions are billed monthly or annually in advance via Stripe. Prices are in AED, USD, or EUR. You may cancel at any time; cancellations take effect at the end of the current billing cycle. No refunds for partial periods.',
  },
  {
    title: '6. AI-Generated Content',
    body: 'Reputix uses AI models to draft review responses, insights, and reports. You are responsible for reviewing AI-generated content before publishing it. We do not guarantee accuracy and are not liable for content you choose to publish.',
  },
  {
    title: '7. Your Data',
    body: 'You retain ownership of your business data. You grant Reputix a limited license to process this data to provide the Service. We do not sell your data to third parties.',
  },
  {
    title: '8. Intellectual Property',
    body: 'The Reputix platform, including software, branding, and documentation, is the exclusive property of Reputix. You may not copy, modify, reverse-engineer, or resell any part of the Service.',
  },
  {
    title: '9. Prohibited Use',
    body: 'You may not use Reputix to generate fake reviews, harass individuals, violate platform policies (Google, Meta, etc.), or engage in any illegal activity. Violation may result in immediate account termination.',
  },
  {
    title: '10. Service Availability',
    body: 'We strive for 99.5% uptime but do not guarantee uninterrupted availability. Scheduled maintenance, third-party outages, and force majeure events may affect Service availability.',
  },
  {
    title: '11. Limitation of Liability',
    body: 'To the maximum extent permitted by law, Reputix shall not be liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount paid by you in the 12 months preceding the claim.',
  },
  {
    title: '12. Termination',
    body: 'You may cancel your account anytime from your dashboard. We may suspend or terminate accounts that violate these Terms. Upon termination, your data is retained for 90 days before deletion.',
  },
  {
    title: '13. Changes to Terms',
    body: 'We may update these Terms from time to time. Material changes will be notified by email at least 14 days before taking effect. Continued use after changes constitutes acceptance.',
  },
  {
    title: '14. Governing Law',
    body: 'These Terms are governed by the laws of the Dubai International Financial Centre (DIFC), United Arab Emirates. Disputes shall be resolved in the DIFC Courts.',
  },
  {
    title: '15. Contact',
    body: 'Questions about these Terms? Email us at legal@reputix.io.',
  },
];

export default function TermsPage() {
  return (
    <SiteLayout>
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">
              Terms of Service
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
