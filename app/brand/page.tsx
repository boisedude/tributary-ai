import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbListSchema } from "@/components/structured-data/schemas";

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
    canonical: "https://www.thetributary.ai/brand/",
  },
};

const logoAssets = [
  {
    name: "Primary Logo",
    description: "Full color logo for light backgrounds",
    file: "/brand/logo-primary.png",
    dimensions: "800 × 740px",
    usage: "Website headers, documents, presentations",
  },
  {
    name: "Logo (Dark Background)",
    description: "White/light version for dark backgrounds",
    file: "/brand/logo-primary-dark.png",
    dimensions: "800 × 740px",
    usage: "Dark websites, videos, dark presentations",
  },
  {
    name: "Logo (Small)",
    description: "Compact version for email signatures",
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

const iconAssets = [
  {
    name: "Icon (Large)",
    description: "Square icon for app stores, profiles",
    file: "/brand/icon-square.png",
    dimensions: "512 × 512px",
  },
  {
    name: "Icon (Small)",
    description: "Favicon-sized icon",
    file: "/brand/icon-small.png",
    dimensions: "128 × 128px",
  },
];

const colors = [
  {
    name: "Tributary Teal",
    hex: "#14B8A6",
    usage: "Primary accent, CTAs, highlights",
  },
  {
    name: "Oxford Blue",
    hex: "#0F172A",
    usage: "Primary text, dark backgrounds",
  },
  {
    name: "Slate",
    hex: "#64748B",
    usage: "Secondary text, borders",
  },
  {
    name: "Coral",
    hex: "#F97316",
    usage: "Warnings, attention elements",
  },
];

function ColorSwatch({ color }: { color: typeof colors[0] }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <div
        className="w-16 h-16 rounded-lg border"
        style={{ backgroundColor: color.hex }}
      />
      <div>
        <p className="font-semibold">{color.name}</p>
        <p className="text-sm font-mono text-muted-foreground">{color.hex}</p>
        <p className="text-xs text-muted-foreground mt-1">{color.usage}</p>
      </div>
    </div>
  );
}

function AssetCard({ asset }: { asset: typeof logoAssets[0] }) {
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
        <p className="text-sm text-muted-foreground mt-1">{asset.description}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {asset.dimensions} • {"usage" in asset ? asset.usage : ""}
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4 w-full">
          <a href={asset.file} download>
            <Download className="h-4 w-4 mr-2" />
            Download PNG
          </a>
        </Button>
      </div>
    </div>
  );
}

function IconCard({ asset }: { asset: typeof iconAssets[0] }) {
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
        <p className="text-sm text-muted-foreground mt-1">{asset.description}</p>
        <p className="text-xs text-muted-foreground mt-2">{asset.dimensions}</p>
        <Button asChild variant="outline" size="sm" className="mt-4 w-full">
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
          { name: "Home", url: "https://www.thetributary.ai" },
          { name: "Brand Assets", url: "https://www.thetributary.ai/brand" },
        ]}
      />

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Brand Assets</h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Official Tributary AI logos, icons, and brand guidelines for partners, press, and marketing use.
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

      {/* Colors Section */}
      <section className="pb-16 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8">Brand Colors</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {colors.map((color) => (
                <ColorSwatch key={color.name} color={color} />
              ))}
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
                  <li>• Use official colors when creating co-branded materials</li>
                </ul>
              </div>

              <div className="p-6 border border-destructive/30 rounded-lg bg-destructive/5">
                <h3 className="font-semibold text-destructive mb-3">Don&apos;t</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Stretch, distort, or rotate the logo</li>
                  <li>• Change the logo colors</li>
                  <li>• Add effects like shadows or gradients</li>
                  <li>• Place the logo on busy backgrounds that reduce legibility</li>
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
                <strong className="text-foreground">Short description (50 words):</strong><br />
                Tributary AI helps mid-market companies prepare for and implement AI. Through assessments, data readiness, automation, and custom development, we address the organizational foundations that determine AI success—including the political and cultural factors most consultants ignore.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">One-liner:</strong><br />
                Tributary AI: AI readiness and implementation for mid-market companies.
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
              For custom assets, high-resolution files, or press inquiries, get in touch.
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
