const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = '/mnt/c/Users/mcoop/OneDrive/Desktop/AI';
const BLOG_OUTPUT_DIR = '/mnt/c/Projects/Tributary.ai/tributary-site/public/blog';
const LOGO_OUTPUT_DIR = '/mnt/c/Projects/Tributary.ai/tributary-site/public/logos';

// Mapping of source image names to blog slug-based filenames
const imageToSlugMap = {
  '5 Signs Your Business Isn\'t Ready for AI.png': '5-signs-ai-readiness',
  'AI Agents 5 Use Cases in 90 Days.png': 'agentic-ai-use-cases',
  'How to Budget for AI in 2025.png': 'ai-budget-planning-2025',
  'AI Customer Service Beyond Chatbots.png': 'ai-customer-service',
  'AI and Cybersecurity Attack and Defense.png': 'ai-cybersecurity',
  'AI Due Diligence for M&AInvestors.png': 'ai-due-diligence-ma',
  'AI for Sales Teams Practical Guide.png': 'ai-sales-teams',
  'Building an AI Governance Framework.png': 'ai-governance-framework',
  'AI in HR Ethical and Effective.png': 'ai-human-resources',
  'AI Implementation Costs What to Expect.png': 'ai-implementation-costs',
  '12 AI Implementation Mistakes to Avoid.png': 'ai-implementation-mistakes',
  'AI in Manufacturing Mid-Market Guide.png': 'ai-manufacturing',
  'AI Maturity Ladder 18-Month Roadmap.png': 'ai-maturity-roadmap',
  'AI for Professional Services.png': 'ai-professional-services',
  'AI Proof of Concept Done Right.png': 'ai-proof-of-concept',
  '10 AI Quick Wins in 30 Days.png': 'ai-quick-wins',
  'From 5.9% to 55% ROI Best Practices.png': 'ai-roi-best-practices',
  'AI Strategy Mistake Starting with Technology.png': 'ai-strategy-outcomes',
  'AI Talent Strategy Hire, Train, or Partner.png': 'ai-talent-strategy',
  'Build vs. Buy AI CFO\'s Guide.png': 'build-vs-buy-ai',
  'Choosing AI Vendors Enterprise vs. Startup.png': 'choosing-ai-vendors',
  'Cloud Marketplace Strategy 2025.png': 'cloud-marketplace-strategy',
  'Data Quality for AI Quick Wins.png': 'data-quality-ai',
  'Why Employees Fear AI (Turn Them Into Advocates).png': 'employees-fear-ai',
  'Why Boutique AI Consulting Outperforms Big Firms.png': 'boutique-ai-consulting',
  'Measuring AI ROI Beyond Cost Savings.png': 'measuring-ai-roi',
  'Multimodal AI Beyond ChatGPT.png': 'multimodal-ai',
  'Shadow AI Hidden Security Risk.png': 'shadow-ai-security',
  'What \'Agentic\' Really Means for Your Business.png': 'what-agentic-means',
  'Why AI Pilots Fail to Scale (95% Problem).png': 'ai-pilots-fail-scale',
};

const logoFiles = ['Logo.png', 'Logo2.png', 'Logo4.png', 'Logo6.png', 'LogoOnly.png'];

async function optimizeBlogImages() {
  console.log('🖼️  Optimizing blog images...\n');

  const files = fs.readdirSync(SOURCE_DIR);
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    if (logoFiles.includes(file) || !file.endsWith('.png')) continue;
    if (file.startsWith('Gemini_')) continue; // Skip test image

    const sourcePath = path.join(SOURCE_DIR, file);
    const slug = imageToSlugMap[file];

    if (!slug) {
      console.log(`⚠️  No mapping for: ${file}`);
      continue;
    }

    const outputPath = path.join(BLOG_OUTPUT_DIR, `${slug}.webp`);

    try {
      const stats = fs.statSync(sourcePath);
      totalOriginal += stats.size;

      await sharp(sourcePath)
        .webp({ quality: 85 })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      totalOptimized += newStats.size;

      const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
      console.log(`✅ ${file}`);
      console.log(`   → ${slug}.webp (${(newStats.size / 1024).toFixed(0)}KB, ${savings}% smaller)`);
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }

  console.log(`\n📊 Blog Images Summary:`);
  console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
}

async function optimizeLogos() {
  console.log('\n🎨 Optimizing logo images...\n');

  const logoOutputNames = {
    'Logo.png': 'logo-full.webp',
    'Logo2.png': 'logo-variant-2.webp',
    'Logo4.png': 'logo-primary.webp',
    'Logo6.png': 'logo-variant-6.webp',
    'LogoOnly.png': 'logo-mark.webp',
  };

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of logoFiles) {
    const sourcePath = path.join(SOURCE_DIR, file);
    const outputName = logoOutputNames[file];
    const outputPath = path.join(LOGO_OUTPUT_DIR, outputName);

    try {
      const stats = fs.statSync(sourcePath);
      totalOriginal += stats.size;

      // Create WebP version
      await sharp(sourcePath)
        .webp({ quality: 90, lossless: false })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      totalOptimized += newStats.size;

      const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
      console.log(`✅ ${file} → ${outputName} (${(newStats.size / 1024).toFixed(0)}KB, ${savings}% smaller)`);

      // Also create PNG versions for header/footer at appropriate sizes
      if (file === 'Logo4.png') {
        // Create header logo (48px height)
        await sharp(sourcePath)
          .resize(48, 48)
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(path.join(LOGO_OUTPUT_DIR, 'logo-header.png'));
        console.log(`   → Also created logo-header.png (48x48)`);

        // Create footer logo (64px)
        await sharp(sourcePath)
          .resize(64, 64)
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(path.join(LOGO_OUTPUT_DIR, 'logo-footer.png'));
        console.log(`   → Also created logo-footer.png (64x64)`);
      }

      if (file === 'LogoOnly.png') {
        // Create favicon sizes
        await sharp(sourcePath)
          .resize(32, 32)
          .png()
          .toFile(path.join(LOGO_OUTPUT_DIR, 'favicon-32.png'));
        await sharp(sourcePath)
          .resize(192, 192)
          .png()
          .toFile(path.join(LOGO_OUTPUT_DIR, 'favicon-192.png'));
        console.log(`   → Also created favicon-32.png and favicon-192.png`);
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }

  console.log(`\n📊 Logo Summary:`);
  console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Blog output: ${BLOG_OUTPUT_DIR}`);
  console.log(`Logo output: ${LOGO_OUTPUT_DIR}\n`);

  await optimizeBlogImages();
  await optimizeLogos();

  console.log('\n✨ Optimization complete!');
}

main().catch(console.error);
