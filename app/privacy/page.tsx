import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | Tributary AI",
  description:
    "Privacy Policy for Tributary AI. Learn how we collect, use, and protect your information.",
  keywords: ["privacy policy", "data protection", "AI consulting privacy"],
  openGraph: {
    title: "Privacy Policy | Tributary AI",
    description: "Privacy Policy for Tributary AI. Learn how we collect, use, and protect your information.",
    type: "website",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.thetributary.ai/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <article className="bg-gradient-subtle">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: January 2026
            </p>

            <Card className="mt-12">
              <CardContent className="prose prose-gray dark:prose-invert max-w-none p-8">
                <h2>Introduction</h2>
                <p>
                  Tributary AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the
                  website at thetributary.ai. This Privacy Policy describes how we
                  collect, use, and share information when you use our website or
                  engage with our consulting services. By using our website, you
                  agree to the collection and use of information as described in
                  this policy.
                </p>

                <h2>Information We Collect</h2>
                <h3>Information You Provide</h3>
                <p>We collect information you voluntarily submit, including:</p>
                <ul>
                  <li>
                    <strong>Contact Information:</strong> Name, email address,
                    company name, and phone number when you fill out forms,
                    download resources, or schedule consultations
                  </li>
                  <li>
                    <strong>Resource Downloads:</strong> Email address when you
                    request access to guides, whitepapers, or other downloadable
                    content
                  </li>
                  <li>
                    <strong>Assessment Responses:</strong> Information you provide
                    through our AI Readiness Assessment or similar tools
                  </li>
                  <li>
                    <strong>Communications:</strong> Content of emails, messages,
                    or other correspondence you send us
                  </li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>
                  When you visit our website, we automatically collect:
                </p>
                <ul>
                  <li>Browser type, version, and settings</li>
                  <li>Operating system and device information</li>
                  <li>Pages visited, time spent, and navigation paths</li>
                  <li>Referring URLs and exit pages</li>
                  <li>IP address and approximate geographic location</li>
                  <li>Date and time of visits</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use collected information for business purposes including:</p>
                <ul>
                  <li>Providing requested services and responding to inquiries</li>
                  <li>Scheduling and conducting consultations</li>
                  <li>Delivering requested resources and content</li>
                  <li>Sending information about our services, insights, and offerings</li>
                  <li>Analyzing website usage and improving our services</li>
                  <li>Marketing and promotional communications</li>
                  <li>Protecting our legal rights and complying with legal obligations</li>
                  <li>Any other purpose disclosed at the time of collection</li>
                </ul>

                <h2>Cookies and Tracking Technologies</h2>
                <p>
                  Our website uses cookies and similar technologies:
                </p>
                <ul>
                  <li>
                    <strong>Functional Storage:</strong> We use browser local storage
                    for site functionality such as theme preferences (light/dark mode)
                  </li>
                  <li>
                    <strong>Analytics:</strong> We use Google Analytics to collect
                    information about website usage including pages visited, session
                    duration, and general location. Google may use this data as
                    described in{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent"
                    >
                      Google&apos;s Privacy Policy
                    </a>
                  </li>
                </ul>
                <p>
                  You may disable cookies through your browser settings, though
                  this may affect site functionality. To opt out of Google Analytics,
                  install the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </p>

                <h2>Third-Party Services</h2>
                <p>
                  We use third-party services to operate our business. These services
                  may collect and process your information according to their own
                  privacy policies:
                </p>
                <ul>
                  <li>
                    <strong>Web3Forms:</strong> Processes form submissions including
                    resource download requests. Subject to{" "}
                    <a
                      href="https://web3forms.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent"
                    >
                      Web3Forms Privacy Policy
                    </a>
                  </li>
                  <li>
                    <strong>Microsoft Bookings:</strong> Handles consultation scheduling.
                    Subject to{" "}
                    <a
                      href="https://privacy.microsoft.com/en-us/privacystatement"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent"
                    >
                      Microsoft&apos;s Privacy Statement
                    </a>
                  </li>
                  <li>
                    <strong>Google Analytics:</strong> Provides website analytics.
                    Subject to{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent"
                    >
                      Google&apos;s Privacy Policy
                    </a>
                  </li>
                </ul>
                <p>
                  We are not responsible for the privacy practices of third-party
                  services. We encourage you to review their privacy policies.
                </p>

                <h2>External Links</h2>
                <p>
                  Our website contains links to external sites including LinkedIn
                  and other third-party websites. We are not responsible for the
                  privacy practices or content of external sites. Clicking external
                  links may subject you to those sites&apos; tracking and data collection.
                </p>

                <h2>Information Sharing</h2>
                <p>We may share your information:</p>
                <ul>
                  <li>With service providers who assist our business operations</li>
                  <li>To comply with legal obligations or respond to lawful requests</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>In connection with a merger, acquisition, or sale of assets</li>
                  <li>With your consent or at your direction</li>
                </ul>

                <h2>Data Retention</h2>
                <p>
                  We retain personal information for as long as we have a legitimate
                  business need, to provide services, to comply with legal obligations,
                  resolve disputes, and enforce agreements. Retention periods vary
                  based on the type of information and business requirements.
                </p>

                <h2>Data Security</h2>
                <p>
                  We use reasonable measures to protect information from unauthorized
                  access, alteration, or destruction. However, no internet transmission
                  or electronic storage is completely secure, and we cannot guarantee
                  absolute security.
                </p>

                <h2>Your Choices</h2>
                <h3>Marketing Communications</h3>
                <p>
                  You may opt out of marketing emails by clicking the unsubscribe
                  link in any marketing message or contacting us directly. Note that
                  you may still receive transactional or service-related communications.
                </p>

                <h3>California Residents</h3>
                <p>
                  California residents may have additional rights under the California
                  Consumer Privacy Act (CCPA), including the right to know what personal
                  information we collect, request deletion of personal information,
                  and opt out of the sale of personal information. We do not sell
                  personal information as defined by the CCPA. To exercise your rights,
                  contact us using the information below.
                </p>

                <h2>Children&apos;s Privacy</h2>
                <p>
                  Our services are intended for business professionals and are not
                  directed to individuals under 18. We do not knowingly collect
                  personal information from children under 18.
                </p>

                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy at any time. Changes are effective
                  when posted to this page. Your continued use of the website after
                  changes constitutes acceptance of the updated policy.
                </p>

                <h2>Contact Us</h2>
                <p>
                  For questions about this Privacy Policy or to exercise your rights,
                  contact us at:
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
