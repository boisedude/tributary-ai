const { chromium } = require('playwright');
const fs = require('fs');

async function testWebsite() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  const screenshotDir = '/tmp/tributary-screenshots';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  
  console.log('\n=== TESTING TRIBUTARY AI WEBSITE ===\n');
  
  // 1. Homepage
  console.log('1. HOMEPAGE (http://localhost:3000)');
  console.log('-----------------------------------');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Screenshot hero section
  await page.screenshot({ path: `${screenshotDir}/01-homepage-hero.png` });
  console.log('✓ Hero section screenshot captured');
  
  // Scroll down to capture full page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${screenshotDir}/02-homepage-middle.png` });
  console.log('✓ Homepage middle section screenshot captured');
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${screenshotDir}/03-homepage-footer.png` });
  console.log('✓ Homepage footer screenshot captured');
  
  // Full page screenshot
  await page.screenshot({ path: `${screenshotDir}/04-homepage-full.png`, fullPage: true });
  console.log('✓ Homepage full page screenshot captured');
  
  // 2. Assessment Page
  console.log('\n2. ASSESSMENT PAGE (http://localhost:3000/assessment)');
  console.log('-----------------------------------------------------');
  await page.goto('http://localhost:3000/assessment', { waitUntil: 'networkidle' });
  
  await page.screenshot({ path: `${screenshotDir}/05-assessment-top.png` });
  console.log('✓ Assessment page top screenshot captured');
  
  // Check heading alignment
  const headings = await page.evaluate(() => {
    const h2s = document.querySelectorAll('h2');
    return Array.from(h2s).map(h => ({
      text: h.textContent.trim().substring(0, 50),
      textAlign: window.getComputedStyle(h).textAlign
    }));
  });
  console.log('Heading alignments:', JSON.stringify(headings, null, 2));
  
  // Check dimension cards for borders and glow
  const dimensionCards = await page.evaluate(() => {
    const cards = document.querySelectorAll('[class*="dimension"], [class*="card"]');
    return Array.from(cards).slice(0, 5).map(card => {
      const style = window.getComputedStyle(card);
      return {
        border: style.border,
        boxShadow: style.boxShadow,
        hasGlow: style.boxShadow.includes('rgba') && !style.boxShadow.includes('rgba(0, 0, 0')
      };
    });
  });
  console.log('Card styles (first 5):', JSON.stringify(dimensionCards, null, 2));
  
  // Scroll to see dimension cards
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${screenshotDir}/06-assessment-dimensions.png` });
  console.log('✓ Assessment dimensions screenshot captured');
  
  // Check for bullet points vs CheckCircle icons
  const bulletPoints = await page.evaluate(() => {
    const lists = document.querySelectorAll('ul li');
    const svgs = document.querySelectorAll('ul li svg');
    return {
      totalListItems: lists.length,
      listItemsWithSvg: svgs.length,
      hasBulletPoints: lists.length > svgs.length
    };
  });
  console.log('Bullet points check:', JSON.stringify(bulletPoints, null, 2));
  
  await page.screenshot({ path: `${screenshotDir}/07-assessment-full.png`, fullPage: true });
  console.log('✓ Assessment full page screenshot captured');
  
  // 3. Blog Page
  console.log('\n3. BLOG PAGE (http://localhost:3000/blog)');
  console.log('-----------------------------------------');
  await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle' });
  
  await page.screenshot({ path: `${screenshotDir}/08-blog-top.png` });
  console.log('✓ Blog page top screenshot captured');
  
  // Check for gradient backgrounds on blog cards
  const blogCardStyles = await page.evaluate(() => {
    const cards = document.querySelectorAll('article, [class*="blog"], [class*="card"]');
    return Array.from(cards).slice(0, 3).map(card => {
      const style = window.getComputedStyle(card);
      return {
        background: style.background.substring(0, 100),
        hasGradient: style.background.includes('gradient'),
        boxShadow: style.boxShadow
      };
    });
  });
  console.log('Blog card styles:', JSON.stringify(blogCardStyles, null, 2));
  
  // Test hover state on blog card
  const firstCard = await page.$('article, [class*="blog-card"], a[href*="/blog/"]');
  if (firstCard) {
    const beforeHover = await firstCard.evaluate(el => ({
      border: window.getComputedStyle(el).border,
      transform: window.getComputedStyle(el).transform,
      boxShadow: window.getComputedStyle(el).boxShadow
    }));
    
    await firstCard.hover();
    await page.waitForTimeout(300);
    
    const afterHover = await firstCard.evaluate(el => ({
      border: window.getComputedStyle(el).border,
      transform: window.getComputedStyle(el).transform,
      boxShadow: window.getComputedStyle(el).boxShadow
    }));
    
    console.log('Blog card hover test:');
    console.log('  Before hover:', JSON.stringify(beforeHover));
    console.log('  After hover:', JSON.stringify(afterHover));
    console.log('  Has lift animation:', beforeHover.transform !== afterHover.transform);
    
    await page.screenshot({ path: `${screenshotDir}/09-blog-hover.png` });
    console.log('✓ Blog card hover screenshot captured');
  }
  
  await page.screenshot({ path: `${screenshotDir}/10-blog-full.png`, fullPage: true });
  console.log('✓ Blog full page screenshot captured');
  
  // 4. Contact Page
  console.log('\n4. CONTACT PAGE (http://localhost:3000/contact)');
  console.log('------------------------------------------------');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  
  await page.screenshot({ path: `${screenshotDir}/11-contact-top.png` });
  console.log('✓ Contact page top screenshot captured');
  
  // Check FAQ - should be simple list, not cards
  const faqStructure = await page.evaluate(() => {
    const faqSection = document.body.innerHTML.includes('FAQ') || document.body.innerHTML.includes('question');
    const faqItems = document.querySelectorAll('[class*="faq"], [class*="accordion"], details, summary');
    const cards = document.querySelectorAll('[class*="faq"] [class*="card"]');
    return {
      hasFaqSection: faqSection,
      faqElementCount: faqItems.length,
      faqCardsCount: cards.length,
      isSimpleList: cards.length === 0
    };
  });
  console.log('FAQ structure:', JSON.stringify(faqStructure, null, 2));
  
  // Check "What to Expect" numbered steps
  const numberedSteps = await page.evaluate(() => {
    const steps = document.body.innerText.match(/\d+\.\s+[A-Z]/g);
    const expectSection = document.body.innerText.includes('What to Expect') || 
                         document.body.innerText.includes('expect');
    return {
      hasExpectSection: expectSection,
      numberedPatterns: steps ? steps.slice(0, 5) : []
    };
  });
  console.log('Numbered steps check:', JSON.stringify(numberedSteps, null, 2));
  
  // Check contact info icons - should be inline, no colored background boxes
  const contactInfoStyles = await page.evaluate(() => {
    const icons = document.querySelectorAll('[class*="contact"] svg, [class*="info"] svg');
    const boxes = document.querySelectorAll('[class*="contact"] [class*="box"], [class*="contact"] [class*="bg-"]');
    return {
      iconCount: icons.length,
      coloredBoxCount: boxes.length,
      hasInlineIcons: icons.length > 0 && boxes.length < icons.length
    };
  });
  console.log('Contact info styles:', JSON.stringify(contactInfoStyles, null, 2));
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${screenshotDir}/12-contact-middle.png` });
  console.log('✓ Contact page middle screenshot captured');
  
  await page.screenshot({ path: `${screenshotDir}/13-contact-full.png`, fullPage: true });
  console.log('✓ Contact full page screenshot captured');
  
  // 5. About Page
  console.log('\n5. ABOUT PAGE (http://localhost:3000/about)');
  console.log('--------------------------------------------');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  
  await page.screenshot({ path: `${screenshotDir}/14-about-top.png` });
  console.log('✓ About page top screenshot captured');
  
  await page.screenshot({ path: `${screenshotDir}/15-about-full.png`, fullPage: true });
  console.log('✓ About full page screenshot captured');
  
  // General design checks
  console.log('\n=== GENERAL DESIGN ANALYSIS ===');
  const generalStyles = await page.evaluate(() => {
    const body = document.body;
    const style = window.getComputedStyle(body);
    
    // Check for excessive gradients
    const allElements = document.querySelectorAll('*');
    let gradientCount = 0;
    let glowCount = 0;
    
    allElements.forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.background.includes('gradient')) gradientCount++;
      if (s.boxShadow.includes('rgba') && !s.boxShadow.includes('rgba(0, 0, 0')) glowCount++;
    });
    
    return {
      gradientElementCount: gradientCount,
      glowElementCount: glowCount,
      fontFamily: style.fontFamily.substring(0, 50)
    };
  });
  console.log('General design analysis:', JSON.stringify(generalStyles, null, 2));
  
  await browser.close();
  
  console.log('\n=== SCREENSHOTS SAVED TO ' + screenshotDir + ' ===');
  console.log('\nTest complete!');
}

testWebsite().catch(console.error);
