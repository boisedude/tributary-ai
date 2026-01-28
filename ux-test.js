const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  console.log('\n=== TESTING HOMEPAGE FLOW ===\n');

  // Test 1: Homepage Load
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  console.log('Homepage loaded successfully');

  // Check hero section
  const heroTitle = await page.locator('h1').first().textContent();
  console.log('Hero title: "' + (heroTitle ? heroTitle.trim() : 'not found') + '"');

  // Check for CTA buttons
  const ctaButtons = await page.locator('text=/Get Your AI Readiness Score/i').all();
  console.log('Found ' + ctaButtons.length + ' "Get Your AI Readiness Score" CTA(s)');

  // Check teal accent color usage - look for the specific teal-500 color
  const tealCount = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    let count = 0;
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;
      const textColor = style.color;
      const borderColor = style.borderColor;
      // Check for teal colors
      if (bgColor.includes('20, 184, 166') || bgColor.includes('13, 148, 136') ||
          textColor.includes('20, 184, 166') || textColor.includes('13, 148, 136') ||
          borderColor.includes('20, 184, 166')) {
        count++;
      }
    });
    return count;
  });
  console.log('Found approximately ' + tealCount + ' elements with teal coloring');

  // Check sections exist by looking at page content
  const pageContent = await page.content();
  const sections = ['shift', 'approach', 'credentials', 'thought-leadership', 'resources'];
  for (const section of sections) {
    const found = pageContent.toLowerCase().includes(section);
    console.log('Section "' + section + '": ' + (found ? 'FOUND' : 'NOT FOUND'));
  }

  // Take screenshot
  await page.screenshot({ path: '/tmp/homepage.png', fullPage: true });
  console.log('Screenshot saved: /tmp/homepage.png');

  console.log('\n=== TESTING QUIZ EXPERIENCE ===\n');

  // Navigate to quiz
  await page.goto('http://localhost:3000/quiz');
  await page.waitForLoadState('networkidle');
  console.log('Quiz page loaded');

  // Check quiz elements
  const quizTitle = await page.locator('h1, h2').first().textContent();
  console.log('Quiz page title: "' + (quizTitle ? quizTitle.trim() : 'not found') + '"');

  // Look for quiz questions or start button
  const startButton = await page.locator('button:has-text("Start"), button:has-text("Begin"), a:has-text("Start")').first();
  if (await startButton.count() > 0) {
    console.log('Found start button, clicking...');
    await startButton.click();
    await page.waitForTimeout(500);
  }

  // Check for progress bar
  const progressBar = await page.locator('[role="progressbar"], .progress, [class*="progress"]').count();
  console.log('Progress bar: ' + (progressBar > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check for dimension badges
  const badges = await page.locator('[class*="badge"], [class*="Badge"]').count();
  console.log('Dimension badges found: ' + badges);

  // Check for "Learn more" links separately
  const learnMoreRegex = await page.locator('text=/Learn more about this topic/i').count();
  const learnMoreText = await page.locator('a:has-text("Learn more")').count();
  console.log('"Learn more" links found: ' + (learnMoreRegex + learnMoreText));

  // Answer some questions if visible
  const radioButtons = await page.locator('input[type="radio"], [role="radio"]').all();
  const buttons = await page.locator('button').all();
  console.log('Found ' + radioButtons.length + ' radio buttons and ' + buttons.length + ' buttons');

  // Try to interact with the quiz
  const quizContent = await page.content();
  console.log('Quiz has question content: ' + (quizContent.includes('question') || quizContent.includes('Question') ? 'YES' : 'Checking...'));

  await page.screenshot({ path: '/tmp/quiz.png', fullPage: true });
  console.log('Screenshot saved: /tmp/quiz.png');

  // Try answering first question if available
  const answers = await page.locator('[data-answer], [class*="answer"], button[class*="option"]').all();
  if (answers.length > 0) {
    console.log('Found ' + answers.length + ' answer options');
    await answers[0].click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/quiz-answer.png', fullPage: true });
    console.log('Clicked first answer, screenshot saved');
  }

  console.log('\n=== TESTING ASSESSMENT PAGE ===\n');

  await page.goto('http://localhost:3000/assessment');
  await page.waitForLoadState('networkidle');
  console.log('Assessment page loaded');

  // Check for Five Dimensions section
  const fiveDimensions = await page.locator('text=/Five Dimensions/i').count();
  console.log('"Five Dimensions" section: ' + (fiveDimensions > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check if Data is mentioned as first dimension
  const assessmentContent = await page.content();
  const dataFound = assessmentContent.toLowerCase().includes('data');
  console.log('Data dimension mentioned: ' + (dataFound ? 'YES' : 'NO'));

  // Check "What Happens Next" section
  const whatHappensNext = await page.locator('text=/What Happens Next/i').count();
  console.log('"What Happens Next" section: ' + (whatHappensNext > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check for Data Readiness service link
  const dataReadinessLink = await page.locator('a[href*="data-readiness"]').count();
  console.log('Data Readiness service link: ' + (dataReadinessLink > 0 ? 'FOUND (' + dataReadinessLink + ')' : 'NOT FOUND'));

  await page.screenshot({ path: '/tmp/assessment.png', fullPage: true });
  console.log('Screenshot saved: /tmp/assessment.png');

  console.log('\n=== TESTING SERVICES PAGE ===\n');

  await page.goto('http://localhost:3000/services');
  await page.waitForLoadState('networkidle');
  console.log('Services page loaded');

  // Check for Data Readiness service in grid
  const dataReadinessService = await page.locator('text=/Data Readiness/i').count();
  console.log('Data Readiness service: ' + (dataReadinessService > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check "Which Service Is Right" section
  const whichService = await page.locator('text=/Which Service.*Right/i').count();
  console.log('"Which Service Is Right" section: ' + (whichService > 0 ? 'FOUND' : 'NOT FOUND'));

  // List all services visible
  const serviceCards = await page.locator('[class*="card"], [class*="Card"]').all();
  console.log('Service cards found: ' + serviceCards.length);

  // Get all service links
  const serviceLinks = await page.locator('a[href*="/services/"]').all();
  console.log('Service detail links found: ' + serviceLinks.length);

  await page.screenshot({ path: '/tmp/services.png', fullPage: true });
  console.log('Screenshot saved: /tmp/services.png');

  console.log('\n=== TESTING DATA READINESS SERVICE PAGE ===\n');

  await page.goto('http://localhost:3000/services/data-readiness');
  await page.waitForLoadState('networkidle');

  // Check if page exists (not 404)
  const pageText = await page.textContent('body');
  const is404 = pageText.includes('404') && pageText.includes('not found');

  if (is404) {
    console.log('Data Readiness page returns 404 - PAGE NOT FOUND');
  } else {
    console.log('Data Readiness service page loaded');

    // Check for warning signs section
    const warningSigns = await page.locator('text=/warning sign/i').count();
    console.log('Warning signs section: ' + (warningSigns > 0 ? 'FOUND' : 'NOT FOUND'));

    // Check for capabilities section
    const capabilities = await page.locator('text=/capabilit/i').count();
    console.log('Capabilities section: ' + (capabilities > 0 ? 'FOUND' : 'NOT FOUND'));

    // Check for outcomes section
    const outcomes = await page.locator('text=/outcome/i').count();
    console.log('Outcomes section: ' + (outcomes > 0 ? 'FOUND' : 'NOT FOUND'));

    // Check for blog post links
    const blogLinks = await page.locator('a[href*="blog"]').count();
    const insightLinks = await page.locator('a[href*="insights"]').count();
    console.log('Blog/Insight links: ' + (blogLinks + insightLinks > 0 ? 'FOUND (' + (blogLinks + insightLinks) + ')' : 'NOT FOUND'));
  }

  await page.screenshot({ path: '/tmp/data-readiness.png', fullPage: true });
  console.log('Screenshot saved: /tmp/data-readiness.png');

  console.log('\n=== TESTING NAVIGATION & RESPONSIVENESS ===\n');

  // Go back to homepage for nav testing
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Check dark mode toggle
  const darkModeToggle = await page.locator('button[aria-label*="dark"], button[aria-label*="theme"], button[aria-label*="Dark"], button[aria-label*="Light"]').count();
  console.log('Dark mode toggle: ' + (darkModeToggle > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check footer for Data Readiness link
  const footer = await page.locator('footer');
  const footerHTML = await footer.innerHTML();
  const footerDataReadiness = footerHTML.includes('data-readiness') || footerHTML.includes('Data Readiness');
  console.log('Footer Data Readiness link: ' + (footerDataReadiness ? 'FOUND' : 'NOT FOUND'));

  // Check all footer links
  const footerLinks = await page.locator('footer a').all();
  console.log('Total footer links: ' + footerLinks.length);

  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);

  // Check for mobile menu button (hamburger)
  const mobileMenu = await page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]').count();
  console.log('Mobile menu button: ' + (mobileMenu > 0 ? 'FOUND' : 'NOT FOUND'));

  // Try to open mobile menu
  if (mobileMenu > 0) {
    const menuBtn = await page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]').first();
    await menuBtn.click();
    await page.waitForTimeout(500);
    console.log('Mobile menu opened');
    await page.screenshot({ path: '/tmp/mobile-menu.png' });
    console.log('Screenshot saved: /tmp/mobile-menu.png');
  }

  await page.screenshot({ path: '/tmp/mobile.png', fullPage: true });
  console.log('Screenshot saved: /tmp/mobile.png');

  // Additional checks
  console.log('\n=== ADDITIONAL CHECKS ===\n');

  // Reset to desktop
  await page.setViewportSize({ width: 1280, height: 800 });

  // Test navigation links
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  const navLinks = await page.locator('nav a, header a').all();
  console.log('Navigation links found: ' + navLinks.length);

  // Check for broken images
  const images = await page.locator('img').all();
  let brokenImages = 0;
  for (const img of images) {
    const naturalWidth = await img.evaluate(el => el.naturalWidth);
    if (naturalWidth === 0) {
      brokenImages++;
    }
  }
  console.log('Total images: ' + images.length + ', Broken images: ' + brokenImages);

  await browser.close();
  console.log('\n=== TESTING COMPLETE ===\n');
})();
