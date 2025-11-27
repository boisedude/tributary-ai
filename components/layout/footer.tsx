import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Tributary AI Systems</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Preparing businesses for the agentic era through strategic
              technology transformation and AI readiness.
            </p>
          </div>

          {/* Quick Links Column */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Connect Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/tributaryai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground transition-colors hover:text-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:mcooper@mcooper.com"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground transition-colors hover:text-accent"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <p>mcooper@mcooper.com</p>
              <p className="mt-1">Boise, Idaho</p>
              <p className="mt-1">Serving clients nationally</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground leading-relaxed">
          <p>© {currentYear} Tributary AI Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
