"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Radio } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FOOTER_NAV_GROUPS, COMPANY, EMAILS, EXTERNAL_LINKS, ASSETS, ROUTES } from "@/lib/constants";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

const FOOTER_LINKS = [
  { href: ROUTES.SERVICES, label: "Services" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.BLOG, label: "Blog" },
  { href: ROUTES.CONTACT, label: "Contact" },
  { href: ROUTES.QUIZ, label: "Quiz" },
];

/**
 * Minimal site footer with logo, quick links, and newsletter signup.
 */
export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- Intentional hydration pattern
  }, []);

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo + Links */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center space-x-2" aria-label={`${COMPANY.NAME} - Home`}>
              <Image
                src={mounted && theme === "dark" ? ASSETS.LOGO_FOOTER_DARK : ASSETS.LOGO_FOOTER}
                alt={COMPANY.NAME}
                width={32}
                height={32}
                className="h-8 w-8"
                priority
              />
              <span className="font-semibold">{COMPANY.NAME}</span>
            </Link>

            <nav aria-label="Footer navigation" className="flex items-center gap-4 text-sm">
              {FOOTER_LINKS.map((item, index) => (
                <span key={item.href} className="flex items-center gap-4">
                  {index > 0 && <span className="text-muted-foreground/40 hidden sm:inline">•</span>}
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-accent transition-colors focus:outline-none focus-visible:text-accent focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>

          {/* Newsletter + Social */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Newsletter:</span>
              <NewsletterSignup variant="compact" className="w-auto" />
            </div>
            <div className="flex items-center gap-2">
              <a
                href={EXTERNAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-muted text-muted-foreground transition-colors hover:text-accent hover:bg-muted/80"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={EXTERNAL_LINKS.PODCAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-muted text-muted-foreground transition-colors hover:text-accent hover:bg-muted/80"
                aria-label="Podcast"
              >
                <Radio className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${EMAILS.SALES}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-muted text-muted-foreground transition-colors hover:text-accent hover:bg-muted/80"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>&copy; {COMPANY.COPYRIGHT_YEAR} {COMPANY.LEGAL_NAME_SHORT} | {COMPANY.TAGLINE}</p>
          <div className="flex items-center gap-4">
            {FOOTER_NAV_GROUPS.legal.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-accent transition-colors focus:outline-none focus-visible:text-accent focus-visible:underline"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ROUTES.PREFERENCES}
              className="hover:text-accent transition-colors focus:outline-none focus-visible:text-accent focus-visible:underline"
            >
              Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
