import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import {
  OrganizationSchema,
  LocalBusinessSchema,
  ServicesSchema,
} from "@/components/structured-data/schemas";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Tributary AI | SaaS GTM Consulting for the Agentic Era",
    template: "%s | Tributary AI",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  description:
    "SaaS GTM acceleration for the agentic era. Cloud marketplace strategy, fractional GTM leadership, and agentic SaaS advisory. Expert consulting from Partner of the Year award winners with 25+ years of enterprise technology experience.",
  keywords: [
    "SaaS GTM consulting",
    "cloud marketplace GTM",
    "AWS marketplace consulting",
    "Azure marketplace strategy",
    "GCP marketplace",
    "fractional GTM leadership",
    "fractional CRO",
    "agentic SaaS",
    "agentic AI strategy",
    "co-sell programs",
    "cloud co-sell",
    "SaaS go-to-market",
  ],
  authors: [{ name: "Tributary AI Systems" }],
  creator: "Tributary AI Systems",
  publisher: "Tributary AI Systems",
  metadataBase: new URL("https://www.thetributary.ai"),
  alternates: {
    canonical: "https://www.thetributary.ai",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.thetributary.ai",
    siteName: "Tributary AI",
    title: "Tributary AI | SaaS GTM Consulting for the Agentic Era",
    description:
      "Cloud marketplace strategy, fractional GTM leadership, and agentic SaaS advisory. Partner of the Year expertise for Series A-C SaaS companies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tributary AI - SaaS GTM Consulting for the Agentic Era",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tributary AI | SaaS GTM Consulting for the Agentic Era",
    description:
      "Cloud marketplace strategy, fractional GTM leadership, and agentic SaaS advisory for SaaS companies.",
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
  // Add Google Search Console verification code when available
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OrganizationSchema />
          <LocalBusinessSchema />
          <ServicesSchema />
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
