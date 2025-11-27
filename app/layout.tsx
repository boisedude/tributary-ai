import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Tributary AI | AI Business Consulting for Idaho",
    template: "%s | Tributary AI",
  },
  description:
    "Where Business Experience Meets Intelligent Innovation. We help companies modernize systems, processes, and strategy for AI-driven operations. Expert consulting in AI readiness, cloud marketplace GTM, and agentic systems strategy.",
  keywords: [
    "AI consulting",
    "AI readiness",
    "agentic systems",
    "cloud marketplace",
    "GTM strategy",
    "business transformation",
    "AI implementation",
    "technology modernization",
  ],
  authors: [{ name: "Tributary AI Systems" }],
  creator: "Tributary AI Systems",
  publisher: "Tributary AI Systems",
  metadataBase: new URL("https://www.thetributary.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.thetributary.ai",
    siteName: "Tributary AI",
    title: "Tributary AI | AI Business Consulting for Idaho",
    description:
      "Expert consulting in AI readiness, cloud marketplace GTM, and agentic systems strategy. Where Business Experience Meets Intelligent Innovation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tributary AI - AI Business Consulting for Idaho",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tributary AI | AI Business Consulting for Idaho",
    description:
      "Expert consulting in AI readiness, cloud marketplace GTM, and agentic systems strategy.",
    images: ["/og-image.png"],
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
