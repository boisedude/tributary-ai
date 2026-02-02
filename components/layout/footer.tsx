"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Radio } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FOOTER_NAV_GROUPS, COMPANY, EMAILS, EXTERNAL_LINKS, ASSETS, ROUTES } from "@/lib/constants";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

/**
 * Site footer component with company info, navigation links, and social links.
 * Uses centralized constants for all URLs, emails, and company information.
 */
export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- Intentional hydration pattern
  }, []);

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-3">
              <Image
                src={mounted && theme === "dark" ? ASSETS.LOGO_FOOTER_DARK : ASSETS.LOGO_FOOTER}
                alt={COMPANY.NAME}
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-lg font-semibold">{COMPANY.NAME}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI readiness and implementation for mid-market companies.
            </p>
            <div className="flex space-x-3 mt-4">
              <a
                href={EXTERNAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 rounded-md bg-muted text-muted-foreground transition-colors hover:text-accent hover:bg-muted/80"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={EXTERNAL_LINKS.PODCAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-11 h-11 rounded-md bg-muted text-muted-foreground transition-colors hover:text-accent hover:bg-muted/80"
                aria-label="Podcast"
              >
                <Radio className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${EMAILS.SALES}`}
                className="inline-flex items-center justify-center w-11 h-11 rounded-md bg-muted text-muted-foreground transition-colors hover:text-accent hover:bg-muted/80"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <nav aria-label="Services navigation">
            <h3 className="mb-3 text-sm font-semibold">{FOOTER_NAV_GROUPS.services.title}</h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV_GROUPS.services.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="min-h-[44px] flex items-center text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Column */}
          <nav aria-label="Company navigation">
            <h3 className="mb-3 text-sm font-semibold">{FOOTER_NAV_GROUPS.company.title}</h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV_GROUPS.company.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="min-h-[44px] flex items-center text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter Column */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">
              AI insights for business leaders.
            </p>
            <NewsletterSignup variant="compact" />
            <p className="mt-2 text-xs text-muted-foreground">
              <Link
                href={ROUTES.PREFERENCES}
                className="min-h-[44px] inline-flex items-center hover:text-accent transition-colors underline-offset-2 hover:underline"
              >
                Manage preferences
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {COMPANY.COPYRIGHT_YEAR} {COMPANY.LEGAL_NAME}</p>
          <div className="flex gap-4">
            {FOOTER_NAV_GROUPS.legal.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-[44px] flex items-center hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ROUTES.PREFERENCES}
              className="min-h-[44px] flex items-center hover:text-accent transition-colors"
            >
              Email Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
