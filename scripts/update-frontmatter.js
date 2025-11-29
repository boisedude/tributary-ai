const fs = require('fs');
const path = require('path');

const BLOG_DIR = '/mnt/c/Projects/Tributary.ai/tributary-site/content/blog';

// Mapping from MDX filename to optimized WebP image path
const fileToImageMap = {
  '5-signs-your-business-isnt-ready-for-ai.mdx': '/blog/5-signs-ai-readiness.webp',
  'what-agentic-really-means-for-your-business.mdx': '/blog/what-agentic-means.webp',
  'how-boutique-ai-consulting-outperforms-big-firms.mdx': '/blog/boutique-ai-consulting.webp',
  'ai-implementation-costs-what-to-expect.mdx': '/blog/ai-implementation-costs.webp',
  'cloud-marketplace-strategy-2025.mdx': '/blog/cloud-marketplace-strategy.webp',
  'ai-governance-framework-mid-market.mdx': '/blog/ai-governance-framework.webp',
  'measuring-ai-roi-beyond-cost-savings.mdx': '/blog/measuring-ai-roi.webp',
  'choosing-ai-vendors-enterprise-vs-startup.mdx': '/blog/choosing-ai-vendors.webp',
  'why-ai-pilots-fail-to-scale.mdx': '/blog/ai-pilots-fail-scale.webp',
  'data-quality-for-ai-quick-wins.mdx': '/blog/data-quality-ai.webp',
  'ai-strategy-outcomes-not-technology.mdx': '/blog/ai-strategy-outcomes.webp',
  'build-vs-buy-ai-decision-guide.mdx': '/blog/build-vs-buy-ai.webp',
  'multimodal-ai-customer-experience.mdx': '/blog/multimodal-ai.webp',
  'ai-maturity-roadmap-18-months.mdx': '/blog/ai-maturity-roadmap.webp',
  'employees-fear-ai-how-to-fix.mdx': '/blog/employees-fear-ai.webp',
  'agentic-ai-use-cases-90-days.mdx': '/blog/agentic-ai-use-cases.webp',
  'shadow-ai-security-compliance-risks.mdx': '/blog/shadow-ai-security.webp',
  'ai-roi-best-practices-that-work.mdx': '/blog/ai-roi-best-practices.webp',
  'ai-cybersecurity-defense-offense.mdx': '/blog/ai-cybersecurity.webp',
  'ai-human-resources-ethical-effective.mdx': '/blog/ai-human-resources.webp',
  'ai-proof-of-concept-done-right.mdx': '/blog/ai-proof-of-concept.webp',
  'ai-budget-planning-2025.mdx': '/blog/ai-budget-planning-2025.webp',
  'ai-quick-wins-30-days.mdx': '/blog/ai-quick-wins.webp',
  'ai-customer-service-beyond-chatbots.mdx': '/blog/ai-customer-service.webp',
  'ai-for-sales-teams-practical-guide.mdx': '/blog/ai-sales-teams.webp',
  'ai-manufacturing-mid-market-guide.mdx': '/blog/ai-manufacturing.webp',
  'ai-professional-services-firms.mdx': '/blog/ai-professional-services.webp',
  'ai-due-diligence-ma-investors.mdx': '/blog/ai-due-diligence-ma.webp',
  'ai-talent-strategy-hire-train-partner.mdx': '/blog/ai-talent-strategy.webp',
  'ai-implementation-mistakes-avoid.mdx': '/blog/ai-implementation-mistakes.webp',
};

function updateFrontmatter(filePath, newImagePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if image field exists in frontmatter
  const hasImage = /^image:\s*["']?.+["']?\s*$/m.test(content);

  if (hasImage) {
    // Replace existing image field
    content = content.replace(
      /^image:\s*["']?.+["']?\s*$/m,
      `image: "${newImagePath}"`
    );
  } else {
    // Add image field after tags if it doesn't exist
    // Find the closing --- of frontmatter
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd > 0) {
      const beforeEnd = content.slice(0, frontmatterEnd);
      const afterEnd = content.slice(frontmatterEnd);
      content = beforeEnd + `image: "${newImagePath}"\n` + afterEnd;
    }
  }

  return content;
}

async function main() {
  console.log('📝 Updating blog frontmatter with new image paths...\n');

  let updated = 0;
  let added = 0;

  for (const [filename, imagePath] of Object.entries(fileToImageMap)) {
    const filePath = path.join(BLOG_DIR, filename);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filename}`);
      continue;
    }

    const originalContent = fs.readFileSync(filePath, 'utf8');
    const hasImage = /^image:\s*["']?.+["']?\s*$/m.test(originalContent);

    const newContent = updateFrontmatter(filePath, imagePath);

    fs.writeFileSync(filePath, newContent);

    if (hasImage) {
      console.log(`✅ Updated: ${filename}`);
      updated++;
    } else {
      console.log(`➕ Added image to: ${filename}`);
      added++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Updated: ${updated} files`);
  console.log(`   Added: ${added} files`);
  console.log(`   Total: ${updated + added} files processed`);
}

main().catch(console.error);
