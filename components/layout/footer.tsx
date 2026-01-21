import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Radio } from "lucide-react";
import { FOOTER_NAV_ITEMS, COMPANY, EMAILS, EXTERNAL_LINKS } from "@/lib/constants";

/**
 * Site footer component with company info, navigation links, and social links.
 * Uses centralized constants for all URLs, emails, and company information.
 *
 * @returns {JSX.Element} The footer component
 *
 * @example
 * // Used in app/layout.tsx
 * <Footer />
 */
export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Column */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logos/logo-footer.png"
                alt={COMPANY.LEGAL_NAME}
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <h3 className="text-lg font-semibold">{COMPANY.LEGAL_NAME}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {COMPANY.DESCRIPTION}
            </p>
          </div>

          {/* Quick Links Column */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href={EXTERNAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground transition-colors hover:text-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={EXTERNAL_LINKS.PODCAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground transition-colors hover:text-accent"
                aria-label="Agentic SaaS Talks Podcast"
              >
                <Radio className="h-6 w-6" />
              </a>
              <a
                href={`mailto:${EMAILS.SALES}`}
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground transition-colors hover:text-accent"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <p>{EMAILS.SALES}</p>
              <p className="mt-1">{COMPANY.LOCATION}</p>
              <p className="mt-1">Serving clients nationally</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground leading-relaxed">
          <p className="mb-2 font-medium">{COMPANY.TAGLINE}</p>
          <p>&copy; {COMPANY.COPYRIGHT_YEAR} {COMPANY.LEGAL_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
