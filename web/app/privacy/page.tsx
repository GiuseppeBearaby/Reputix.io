import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export const metadata = { title: "Privacy Policy · Reputix" };

export default function Privacy() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <article className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: April 2026</p>

          <div className="mt-10 space-y-8 text-gray-700 leading-relaxed">
            <Section n={1} title="Information We Collect">
              We collect information you provide directly: business name, owner name, email address, phone number, Google Maps link, Google Business Profile data, social media URLs, and payment information (processed by Stripe — we never store full card numbers). We also collect usage analytics to improve the Service.
            </Section>

            <Section n={2} title="How We Use Your Data">
              We use your data to: (a) provide the Reputix service; (b) send transactional emails (reports, alerts, billing); (c) improve our AI models using aggregated, anonymized data; (d) detect and prevent fraud or abuse of the Service.
            </Section>

            <Section n={3} title="Third-Party Services">
              Reputix relies on: Google APIs (Maps, Business Profile), OpenAI (AI responses), Supabase (EU-based database and auth), Stripe (payments), Resend (transactional email), and SerpAPI (search data). Each third-party processor has its own privacy policy governing their handling of your data.
            </Section>

            <Section n={4} title="Data Storage and Security">
              All data is stored in Supabase servers located in the European Union. We use SSL/TLS encryption in transit, encryption at rest, row-level security, strict access controls, and audit logging to protect your information.
            </Section>

            <Section n={5} title="Data Retention">
              Active accounts: data is retained for as long as your account is active. Cancelled accounts: data is retained for 90 days after cancellation, then permanently deleted. Free reports: retained for 12 months before deletion.
            </Section>

            <Section n={6} title="Your Rights">
              You have the right to access, correct, export, or delete your personal data. To exercise any of these rights, email{" "}
              <a href="mailto:privacy@reputix.io" className="text-brand-700 font-semibold">
                privacy@reputix.io
              </a>
              . You may also opt out of marketing communications at any time via the unsubscribe link in our emails.
            </Section>

            <Section n={7} title="Cookies">
              We use only essential cookies required for authentication and anonymous analytics. We do not use advertising cookies, third-party trackers, or cross-site tracking technologies.
            </Section>

            <Section n={8} title="Children">
              Reputix is not intended for users under the age of 18. We do not knowingly collect data from minors.
            </Section>

            <Section n={9} title="International Data Transfers">
              All data processing occurs on servers located within the European Union. We apply appropriate safeguards for any transfers outside the EU.
            </Section>

            <Section n={10} title="Changes to This Policy">
              We may update this Privacy Policy from time to time. Material changes will be communicated via email at least 30 days before taking effect.
            </Section>

            <Section n={11} title="Contact">
              For any privacy-related questions, contact{" "}
              <a href="mailto:privacy@reputix.io" className="text-brand-700 font-semibold">
                privacy@reputix.io
              </a>
              .
            </Section>
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900">
        {n}. {title}
      </h2>
      <p className="mt-3">{children}</p>
    </section>
  );
}
