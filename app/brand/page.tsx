import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbListSchema } from "@/components/structured-data/schemas";
import { CopyButton } from "@/components/ui/copy-button";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Brand Assets | Tributary AI",
  description:
    "Download official Tributary AI logos, icons, and brand assets. Guidelines for proper usage in partner materials, press, and marketing.",
  keywords: [
    "Tributary AI logo",
    "brand assets",
    "press kit",
    "media kit",
    "logo download",
  ],
  openGraph: {
    title: "Brand Assets | Tributary AI",
    description: "Download official Tributary AI logos and brand assets.",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/brand/`,
  },
};

const logoAssets = [
  {
    name: "Primary Logo",
    description: "Full color logo for light backgrounds",
    file: "/brand/logo-primary.png",
    webp: "/brand/logo-primary.webp",
    dimensions: "800 × 740px",
    usage: "Website headers, documents, presentations",
  },
  {
    name: "Logo (Dark Background)",
    description: "White/light version for dark backgrounds",
    file: "/brand/logo-primary-dark.png",
    webp: "/brand/logo-primary-dark.webp",
    dimensions: "800 × 740px",
    usage: "Dark websites, videos, dark presentations",
  },
  {
    name: "Horizontal Logo",
    description: "Wide format for horizontal spaces",
    file: "/brand/logo-horizontal.png",
    dimensions: "400 × 96px",
    usage: "Email signatures, website footers",
  },
  {
    name: "Logo (Small)",
    description: "Compact version for small placements",
    file: "/brand/logo-small.png",
    dimensions: "200 × 185px",
    usage: "Email signatures, small placements",
  },
  {
    name: "Banner",
    description: "Horizontal banner with logo and text",
    file: "/brand/banner-full.png",
    dimensions: "1200 × 288px",
    usage: "Social media covers, email headers",
  },
  {
    name: "Wordmark",
    description: "Text-only logo",
    file: "/brand/wordmark.png",
    dimensions: "400 × 129px",
    usage: "When icon is shown separately",
  },
];

const monochromeAssets = [
  {
    name: "Logo (Black)",
    description: "Single-color black for print and grayscale",
    file: "/brand/logo-mono-black.png",
    dimensions: "512 × 410px",
    usage: "Print, fax, embroidery, single-color media",
  },
  {
    name: "Logo (White)",
    description: "Single-color white for dark backgrounds",
    file: "/brand/logo-mono-white.png",
    dimensions: "512 × 410px",
    usage: "Dark print, merchandise, overlays",
  },
];

const iconAssets = [
  {
    name: "Icon (Large)",
    description: "Square icon for app stores, profiles",
    file: "/brand/icon-square.png",
    webp: "/brand/icon-square.webp",
    dimensions: "512 × 512px",
  },
  {
    name: "Icon (Small)",
    description: "Favicon-sized icon",
    file: "/brand/icon-small.png",
    dimensions: "128 × 128px",
  },
];

const socialAssets = [
  {
    name: "LinkedIn Profile",
    description: "Square format for LinkedIn profile picture",
    file: "/brand/social-linkedin.png",
    dimensions: "400 × 400px",
    usage: "LinkedIn company page profile",
  },
  {
    name: "Instagram Square",
    description: "High-resolution square for Instagram",
    file: "/brand/social-instagram.png",
    dimensions: "1080 × 1080px",
    usage: "Instagram profile, posts",
  },
  {
    name: "Twitter/X Header",
    description: "Banner size for Twitter/X header",
    file: "/brand/social-twitter-header.png",
    dimensions: "1500 × 500px",
    usage: "Twitter/X profile header",
  },
  {
    name: "Facebook Cover",
    description: "Cover photo size for Facebook",
    file: "/brand/social-facebook-cover.png",
    dimensions: "820 × 312px",
    usage: "Facebook page cover photo",
  },
];

const colors = [
  {
    name: "Tributary Teal",
    hex: "#14B8A6",
    rgb: "20, 184, 166",
    usage: "Primary accent, CTAs, highlights",
  },
  {
    name: "Oxford Blue",
    hex: "#0F172A",
    rgb: "15, 23, 42",
    usage: "Primary text, dark backgrounds",
  },
  {
    name: "Slate",
    hex: "#64748B",
    rgb: "100, 116, 139",
    usage: "Secondary text, borders",
  },
  {
    name: "Coral",
    hex: "#F97316",
    rgb: "249, 115, 22",
    usage: "Warnings, attention elements",
  },
];

const colorDownloads = [
  {
    name: "CSS Variables",
    file: "/brand/colors.css",
    description: "CSS custom properties for web projects",
  },
  {
    name: "Tailwind Config",
    file: "/brand/colors-tailwind.js",
    description: "Tailwind CSS color configuration",
  },
];

function ColorSwatch({ color }: { color: (typeof colors)[0] }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <div
        className="w-16 h-16 rounded-lg border shrink-0"
        style={{ backgroundColor: color.hex }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold">{color.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <code className="text-sm font-mono text-muted-foreground">
            {color.hex}
          </code>
          <CopyButton value={color.hex} />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          RGB: {color.rgb}
        </p>
        <p className="text-xs text-muted-foreground">{color.usage}</p>
      </div>
    </div>
  );
}

function AssetCard({
  asset,
}: {
  asset: (typeof logoAssets)[0] | (typeof monochromeAssets)[0];
}) {
  const hasWebp = "webp" in asset && asset.webp;
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/30 p-8 flex items-center justify-center min-h-[200px]">
        <Image
          src={asset.file}
          alt={asset.name}
          width={300}
          height={200}
          className="max-h-[150px] w-auto object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{asset.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {asset.description}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {asset.dimensions} • {"usage" in asset ? asset.usage : ""}
        </p>
        <div className="mt-4 flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <a href={asset.file} download>
              <Download className="h-4 w-4 mr-2" />
              PNG
            </a>
          </Button>
          {hasWebp && (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <a href={asset.webp} download>
                <Download className="h-4 w-4 mr-2" />
                WebP
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function IconCard({ asset }: { asset: (typeof iconAssets)[0] }) {
  const hasWebp = "webp" in asset && asset.webp;
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/30 p-6 flex items-center justify-center">
        <Image
          src={asset.file}
          alt={asset.name}
          width={128}
          height={128}
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{asset.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {asset.description}
        </p>
        <p className="text-xs text-muted-foreground mt-2">{asset.dimensions}</p>
        <div className="mt-4 flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <a href={asset.file} download>
              <Download className="h-4 w-4 mr-2" />
              PNG
            </a>
          </Button>
          {hasWebp && (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <a href={asset.webp} download>
                <Download className="h-4 w-4 mr-2" />
                WebP
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function SocialCard({ asset }: { asset: (typeof socialAssets)[0] }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/30 p-4 flex items-center justify-center min-h-[120px]">
        <Image
          src={asset.file}
          alt={asset.name}
          width={200}
          height={100}
          className="max-h-[100px] w-auto object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm">{asset.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{asset.dimensions}</p>
        <Button asChild variant="outline" size="sm" className="mt-3 w-full">
          <a href={asset.file} download>
            <Download className="h-4 w-4 mr-2" />
            Download
          </a>
        </Button>
      </div>
    </div>
  );
}

export default function BrandPage() {
  return (
    <article className="bg-gradient-subtle min-h-screen">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Brand Assets", url: `${SITE_URL}/brand` },
        ]}
      />

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Brand Assets</h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Official Tributary AI logos, icons, and brand guidelines for
              partners, press, and marketing use.
            </p>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8">Logos</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {logoAssets.map((asset) => (
                <AssetCard key={asset.name} asset={asset} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Monochrome Logos */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8">Monochrome Versions</h2>
            <p className="text-muted-foreground mb-6">
              Single-color versions for print, embroidery, and situations
              requiring simplified graphics.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {monochromeAssets.map((asset) => (
                <AssetCard key={asset.name} asset={asset} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Icons Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8">Icons</h2>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
              {iconAssets.map((asset) => (
                <IconCard key={asset.name} asset={asset} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Sizes */}
      <section className="pb-16 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8">Social Media Sizes</h2>
            <p className="text-muted-foreground mb-6">
              Pre-sized assets for major social media platforms.
            </p>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
              {socialAssets.map((asset) => (
                <SocialCard key={asset.name} asset={asset} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8">Brand Colors</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {colors.map((color) => (
                <ColorSwatch key={color.name} color={color} />
              ))}
            </div>

            {/* Color Downloads */}
            <div className="mt-8 p-6 border rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-4">Download Color Palette</h3>
              <div className="flex flex-wrap gap-4">
                {colorDownloads.map((download) => (
                  <Button
                    key={download.name}
                    asChild
                    variant="outline"
                    size="sm"
                  >
                    <a href={download.file} download>
                      <Download className="h-4 w-4 mr-2" />
                      {download.name}
                    </a>
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                CSS custom properties and Tailwind configuration for easy
                integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">Usage Guidelines</h2>

            <div className="space-y-6">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-accent mb-3">Do</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use the logo with adequate clear space around it</li>
                  <li>• Use the dark version on dark backgrounds</li>
                  <li>• Maintain the original aspect ratio when scaling</li>
                  <li>
                    • Use official colors when creating co-branded materials
                  </li>
                  <li>
                    • Use monochrome versions for single-color applications
                  </li>
                </ul>
              </div>

              <div className="p-6 border border-destructive/30 rounded-lg bg-destructive/5">
                <h3 className="font-semibold text-destructive mb-3">
                  Don&apos;t
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Stretch, distort, or rotate the logo</li>
                  <li>• Change the logo colors</li>
                  <li>• Add effects like shadows or gradients</li>
                  <li>
                    • Place the logo on busy backgrounds that reduce legibility
                  </li>
                  <li>• Use the logo smaller than 100px wide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">About Tributary AI</h2>
            <div className="p-6 border rounded-lg bg-muted/30">
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">
                  Short description (50 words):
                </strong>
                <br />
                Tributary AI helps mid-market companies prepare for and
                implement AI. Through assessments, data readiness, automation,
                and custom development, we address the organizational
                foundations that determine AI success—including the political
                and cultural factors that often derail transformation efforts.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">One-liner:</strong>
                <br />
                Tributary AI: AI readiness and implementation for mid-market
                companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gradient-tributary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold">Need Something Specific?</h2>
            <p className="mt-4 text-white/90">
              For SVG files, custom sizes, high-resolution files, or press
              inquiries, get in touch.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
