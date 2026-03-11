import PublicLayout from "@/components/layout/public-layout";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <PublicLayout
      title="Privacy Policy"
      description="How Celestial Bloom protects your personal information"
    >
      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8 space-y-6 md:space-y-8">
        <div className="bg-secondary rounded-lg p-4 md:p-6">
          <p className="text-foreground/70 text-sm md:text-base">
            <span className="font-semibold">Last Updated:</span> January 2024
          </p>
          <p className="text-foreground/70 mt-2 text-sm md:text-base">
            This Privacy Policy explains how Celestial Bloom ("we", "us", "our",
            or "Company") collects, uses, and protects your information when you
            visit our website and purchase products from us.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            1. Information We Collect
          </h2>
          <p className="text-foreground/70 text-sm md:text-base">
            We collect information in the following ways:
          </p>
          <div className="space-y-3 md:space-y-4">
            <Card className="p-3 md:p-4 border border-border">
              <h4 className="font-semibold text-primary mb-1 md:mb-2">
                Personal Information You Provide
              </h4>
              <p className="text-foreground/70 text-sm md:text-base">
                When you place an order, sign up for our newsletter, or contact
                us, we collect information such as: your name, email address,
                phone number, mailing address, payment information, and any
                other details you voluntarily provide.
              </p>
            </Card>
            <Card className="p-3 md:p-4 border border-border">
              <h4 className="font-semibold text-primary mb-1 md:mb-2">
                Automatically Collected Information
              </h4>
              <p className="text-foreground/70 text-sm md:text-base">
                When you visit our website, we automatically collect information
                including your IP address, browser type, pages visited, time
                spent on our site, and referring website using cookies and
                similar tracking technologies.
              </p>
            </Card>
            <Card className="p-3 md:p-4 border border-border">
              <h4 className="font-semibold text-primary mb-1 md:mb-2">
                Payment Information
              </h4>
              <p className="text-foreground/70 text-sm md:text-base">
                Payment processing is handled by secure third-party payment
                processors. We do not store full credit card numbers on our
                servers.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            2. How We Use Your Information
          </h2>
          <p className="text-foreground/70 text-sm md:text-base">
            We use the information we collect for the following purposes:
          </p>
          <ul className="space-y-2 text-foreground/70 text-sm md:text-base">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Processing and fulfilling your orders</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Sending you order confirmations and delivery updates</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                Responding to your inquiries and customer support requests
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                Sending promotional emails and newsletters (with your consent)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Improving our website and services</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Preventing fraud and ensuring security</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Complying with legal obligations</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            3. Data Sharing and Disclosure
          </h2>
          <p className="text-foreground/70 text-sm md:text-base">
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share your information in the following
            circumstances:
          </p>
          <div className="space-y-3 md:space-y-4">
            <Card className="p-3 md:p-4 border border-border">
              <h4 className="font-semibold text-primary mb-1 md:mb-2">
                Service Providers
              </h4>
              <p className="text-foreground/70 text-sm md:text-base">
                We share necessary information with trusted service providers
                who assist us with order fulfillment, delivery, payment
                processing, and customer support. These providers are bound by
                confidentiality agreements.
              </p>
            </Card>
            <Card className="p-3 md:p-4 border border-border">
              <h4 className="font-semibold text-primary mb-1 md:mb-2">
                Legal Requirements
              </h4>
              <p className="text-foreground/70 text-sm md:text-base">
                We may disclose information when required by law or to comply
                with legal processes, court orders, or government requests.
              </p>
            </Card>
            <Card className="p-3 md:p-4 border border-border">
              <h4 className="font-semibold text-primary mb-1 md:mb-2">
                Business Transfers
              </h4>
              <p className="text-foreground/70 text-sm md:text-base">
                If we merge, acquire, or sell assets, your information may be
                transferred as part of that transaction. We'll notify you of any
                such change.
              </p>
            </Card>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            4. Data Security
          </h2>
          <p className="text-foreground/70 text-sm md:text-base">
            We implement industry-standard security measures to protect your
            personal information, including SSL encryption, secure payment
            gateways, and regular security audits. However, no online
            transmission is 100% secure. If you have security concerns, please
            contact us immediately.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            5. Cookies and Tracking Technologies
          </h2>
          <p className="text-foreground/70 mb-2 md:mb-4 text-sm md:text-base">
            Our website uses cookies and similar tracking technologies to
            enhance your experience. You can control cookie settings through
            your browser preferences. Disabling cookies may affect website
            functionality.
          </p>
          <Card className="p-3 md:p-4 border border-border">
            <h4 className="font-semibold text-primary mb-2">Cookie Types</h4>
            <ul className="space-y-2 text-foreground/70 text-sm md:text-base">
              <li>
                <span className="font-semibold">Essential Cookies:</span>{" "}
                Required for website functionality
              </li>
              <li>
                <span className="font-semibold">Analytics Cookies:</span> Help
                us understand user behavior
              </li>
              <li>
                <span className="font-semibold">Marketing Cookies:</span> Used
                for personalized advertising
              </li>
              <li>
                <span className="font-semibold">Preference Cookies:</span>{" "}
                Remember your settings
              </li>
            </ul>
          </Card>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            6. Your Rights and Choices
          </h2>
          <p className="text-foreground/70 text-sm md:text-base">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="space-y-2 text-foreground/70 text-sm md:text-base">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                <span className="font-semibold">Right to Access:</span> Request
                a copy of your personal information
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                <span className="font-semibold">Right to Correct:</span> Update
                or correct inaccurate information
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                <span className="font-semibold">Right to Delete:</span> Request
                deletion of your personal information
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                <span className="font-semibold">Right to Opt-Out:</span>{" "}
                Unsubscribe from marketing communications anytime
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                <span className="font-semibold">Right to Portability:</span>{" "}
                Request your information in a portable format
              </span>
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            7. Third-Party Links
          </h2>
          <p className="text-foreground/70 text-sm md:text-base">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of external sites. Please
            review their privacy policies before providing personal information.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            8. Children's Privacy
          </h2>
          <p className="text-foreground/70 text-sm md:text-base">
            Our website is not intended for children under 13. We do not
            knowingly collect personal information from children. If we become
            aware that a child has provided us with personal information, we
            will delete it immediately. If you have concerns, please contact us.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            9. Changes to This Privacy Policy
          </h2>
          <p className="text-foreground/70 text-sm md:text-base">
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. We will notify you of
            significant changes by posting the updated policy on our website
            with a new "Last Updated" date. Your continued use of our website
            constitutes acceptance of the updated Privacy Policy.
          </p>
        </section>

        {/* Closing */}
        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-5 md:px-6 md:py-6 text-center text-sm md:text-base">
          <p>
            Thank you for trusting Celestial Bloom with your personal
            information. We're committed to protecting your privacy and
            providing you with excellent service.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
