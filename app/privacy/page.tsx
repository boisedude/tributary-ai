import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Tributary AI. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <article className="bg-gradient-subtle">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: January 2025
            </p>

            <Card className="mt-12">
              <CardContent className="prose prose-gray dark:prose-invert max-w-none p-8">
                <h2>Introduction</h2>
                <p>
                  Tributary AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy
                  and is committed to protecting your personal information. This
                  Privacy Policy explains how we collect, use, and safeguard your
                  information when you visit our website at thetributary.ai or
                  engage with our consulting services.
                </p>

                <h2>Information We Collect</h2>
                <h3>Information You Provide</h3>
                <p>We collect information you voluntarily provide, including:</p>
                <ul>
                  <li>
                    <strong>Contact Information:</strong> Name, email address,
                    company name, and phone number when you fill out contact forms
                    or schedule consultations
                  </li>
                  <li>
                    <strong>Assessment Responses:</strong> Information you provide
                    through our AI Readiness Assessment tool
                  </li>
                  <li>
                    <strong>Communications:</strong> Content of emails or messages
                    you send us
                  </li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>
                  When you visit our website, we may automatically collect certain
                  information, including:
                </p>
                <ul>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>IP address (anonymized where possible)</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Respond to your inquiries and provide requested services</li>
                  <li>Schedule and conduct consultations</li>
                  <li>Provide personalized assessment results and recommendations</li>
                  <li>Send relevant information about our services (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>Cookies and Tracking</h2>
                <p>
                  Our website uses essential cookies to ensure proper functionality.
                  We may also use analytics tools to understand how visitors use our
                  site. You can control cookie preferences through your browser
                  settings.
                </p>

                <h2>Third-Party Services</h2>
                <p>We may use third-party services that collect information, including:</p>
                <ul>
                  <li>
                    <strong>Calendly:</strong> For scheduling consultations
                  </li>
                  <li>
                    <strong>Analytics providers:</strong> To understand website usage
                  </li>
                </ul>
                <p>
                  These services have their own privacy policies governing how they
                  handle your data.
                </p>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to
                  protect your personal information against unauthorized access,
                  alteration, disclosure, or destruction. However, no method of
                  transmission over the Internet is 100% secure.
                </p>

                <h2>Data Retention</h2>
                <p>
                  We retain your personal information only as long as necessary to
                  fulfill the purposes for which it was collected, provide our
                  services, and comply with legal obligations.
                </p>

                <h2>Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>

                <h2>Children&apos;s Privacy</h2>
                <p>
                  Our services are not directed to individuals under 18. We do not
                  knowingly collect personal information from children.
                </p>

                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new policy on
                  this page with an updated revision date.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our privacy
                  practices, please contact us at:
                </p>
                <p>
                  <strong>Tributary AI</strong>
                  <br />
                  Email:{" "}
                  <a href="mailto:sales@thetributary.ai" className="text-accent">
                    sales@thetributary.ai
                  </a>
                  <br />
                  Boise, Idaho
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </article>
  );
}
