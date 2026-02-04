import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import {
  OrganizationSchema,
  LocalBusinessSchema,
} from "@/components/structured-data/schemas";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Tributary AI | Technology Consulting for the AI Era",
    template: "%s | Tributary AI",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/logos/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/logos/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  description:
    "AI should reduce your tech spend—not increase it. We help companies simplify operations, cut complexity, and move faster. 30 years of transformation experience.",
  keywords: [
    "AI consulting",
    "technology consulting",
    "digital transformation",
    "AI strategy",
    "AI readiness assessment",
    "data readiness",
    "data governance",
    "data quality",
    "mid-market consulting",
    "simplify operations",
    "reduce tech spend",
    "technology assessment",
    "process automation",
    "Boise Idaho consulting",
  ],
  authors: [{ name: "Tributary AI" }],
  creator: "Tributary AI",
  publisher: "Tributary AI",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Tributary AI",
    title: "Tributary AI | Technology Consulting for the AI Era",
    description:
      "AI should reduce your tech spend—not increase it. We help companies simplify operations, cut complexity, and move faster.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tributary AI - Technology Consulting for the AI Era",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tributary AI | Technology Consulting for the AI Era",
    description:
      "AI should reduce your tech spend—not increase it. We help companies simplify operations, cut complexity, and move faster.",
    images: ["/og-image.png"],
    creator: "@tributaryai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <OrganizationSchema />
            <LocalBusinessSchema />
            {/* Skip to main content link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground focus:outline-none"
            >
              Skip to main content
            </a>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main id="main-content" className="flex-1">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
