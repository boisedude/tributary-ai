import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Tributary AI. Review the terms governing use of our website and services.",
  keywords: ["terms of service", "consulting agreement", "service terms"],
};

export default function TermsPage() {
  return (
    <article className="bg-gradient-subtle">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold sm:text-5xl">Terms of Service</h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: January 2025
            </p>

            <Card className="mt-12">
              <CardContent className="prose prose-gray dark:prose-invert max-w-none p-8">
                <h2>Agreement to Terms</h2>
                <p>
                  By accessing or using the Tributary AI website
                  (thetributary.ai) or engaging our consulting services, you agree
                  to be bound by these Terms of Service. If you do not agree to
                  these terms, please do not use our website or services.
                </p>

                <h2>Services Description</h2>
                <p>
                  Tributary AI provides SaaS go-to-market consulting
                  services, including:
                </p>
                <ul>
                  <li>Cloud Marketplace GTM strategy and execution</li>
                  <li>Fractional GTM leadership</li>
                  <li>Agentic SaaS advisory services</li>
                </ul>
                <p>
                  Specific services, deliverables, timelines, and fees are defined
                  in separate engagement agreements between Tributary AI
                  and clients.
                </p>

                <h2>Website Use</h2>
                <p>You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul>
                  <li>Use the website in any way that violates applicable laws</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Interfere with the proper functioning of the website</li>
                  <li>Use automated systems to access the website without permission</li>
                </ul>

                <h2>Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos,
                  and software, is the property of Tributary AI or its
                  content suppliers and is protected by intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create derivative
                  works from any content without our express written permission.
                </p>

                <h2>Client Engagements</h2>
                <p>
                  Consulting engagements are governed by separate agreements that
                  specify scope, deliverables, fees, and other terms. These Terms
                  of Service apply to website use and general interactions; they do
                  not supersede specific engagement agreements.
                </p>

                <h2>Confidentiality</h2>
                <p>
                  We treat client information with strict confidentiality.
                  Specific confidentiality obligations are detailed in engagement
                  agreements. We do not share client information with third parties
                  without consent, except as required by law.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Tributary AI
                  shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages arising from your use of our
                  website or services.
                </p>
                <p>
                  Our total liability for any claims arising from these Terms or
                  your use of the website shall not exceed the amount you paid us,
                  if any, in the twelve months preceding the claim.
                </p>

                <h2>Disclaimer of Warranties</h2>
                <p>
                  The website and its content are provided &quot;as is&quot; without
                  warranties of any kind, either express or implied. We do not
                  warrant that the website will be uninterrupted, error-free, or
                  free of harmful components.
                </p>
                <p>
                  Consulting advice and recommendations are based on our
                  professional judgment and available information. We do not
                  guarantee specific business outcomes or results.
                </p>

                <h2>Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Tributary AI
                  and its officers, directors, employees, and agents from any
                  claims, damages, losses, or expenses arising from your violation
                  of these Terms or misuse of our website or services.
                </p>

                <h2>Governing Law</h2>
                <p>
                  These Terms are governed by the laws of the State of Idaho,
                  United States, without regard to conflict of law principles. Any
                  disputes arising from these Terms shall be resolved in the courts
                  of Ada County, Idaho.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. Changes
                  will be effective immediately upon posting to the website. Your
                  continued use of the website after changes constitutes acceptance
                  of the modified Terms.
                </p>

                <h2>Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable, the
                  remaining provisions will continue in full force and effect.
                </p>

                <h2>Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us at:
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
