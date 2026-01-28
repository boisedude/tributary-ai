import { DownloadableGuide } from "@/components/lead-magnets/downloadable-guide";

/**
 * Resources section - displays free downloadable guides as lead magnets.
 * Helps capture emails before hard conversion ask.
 */
export function ResourcesSection() {
  const guides = [
    {
      title: "Agentic SaaS Business Model",
      description: "How AI is reshaping SaaS economics and what it means for your technology strategy.",
      pdfUrl: "/guides/agentic-saas-business-model-guide.html",
    },
    {
      title: "Fractional GTM Leadership",
      description: "When and how to leverage fractional expertise to accelerate your go-to-market strategy.",
      pdfUrl: "/guides/fractional-gtm-leadership-guide.html",
    },
    {
      title: "Cloud Marketplace Playbook",
      description: "Strategic approaches to listing and selling through AWS, Azure, and GCP marketplaces.",
      pdfUrl: "/guides/cloud-marketplace-gtm-playbook.html",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-wide text-accent uppercase mb-4">
              Free Resources
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Start Your AI Journey
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical guides to help you navigate the AI transformation—no commitment required.
            </p>
          </div>

          {/* Guide Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <DownloadableGuide
                key={guide.title}
                title={guide.title}
                description={guide.description}
                pdfUrl={guide.pdfUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
