const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  console.log('\n========================================');
  console.log('DETAILED UX TEST - TRIBUTARY AI WEBSITE');
  console.log('========================================\n');

  // ============================================
  // TEST 1: HOMEPAGE DETAILED
  // ============================================
  console.log('=== 1. HOMEPAGE DETAILED TEST ===\n');

  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Check hero CTA
  const heroSection = await page.locator('section').first();
  const heroCTA = await page.locator('a:has-text("Get Your AI Readiness Score")').first();
  const heroCTAHref = await heroCTA.getAttribute('href');
  console.log('Hero CTA link: ' + heroCTAHref);
  console.log('Hero CTA working: ' + (heroCTAHref === '/quiz' ? 'YES' : 'NO - Expected /quiz'));

  // Check for teal accent class usage
  const tealBgElements = await page.locator('[class*="bg-teal"], [class*="bg-accent"]').count();
  const tealTextElements = await page.locator('[class*="text-teal"], [class*="text-accent"]').count();
  console.log('Teal/accent background elements: ' + tealBgElements);
  console.log('Teal/accent text elements: ' + tealTextElements);

  // Check for specific sections
  const shiftSection = await page.locator('text=/pivot/i, text=/shift/i').count();
  console.log('Shift/Pivot section: ' + (shiftSection > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check approach section
  const approachSection = await page.locator('text=/Our approach/i, text=/simplify first/i').count();
  console.log('Approach section: ' + (approachSection > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check credentials
  const yearsExperience = await page.locator('text=/30 years/i, text=/transformation experience/i').count();
  console.log('Credentials/Experience: ' + (yearsExperience > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check thought leadership
  const thoughtLeadership = await page.locator('text=/Thought Leadership/i, text=/Latest Articles/i, text=/Insights/i').count();
  console.log('Thought Leadership section: ' + (thoughtLeadership > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check resources
  const resources = await page.locator('text=/Resources/i, text=/Start Your AI Journey/i').count();
  console.log('Resources section: ' + (resources > 0 ? 'FOUND' : 'NOT FOUND'));

  // ============================================
  // TEST 2: QUIZ DETAILED FLOW
  // ============================================
  console.log('\n=== 2. QUIZ DETAILED FLOW TEST ===\n');

  await page.goto('http://localhost:3000/quiz');
  await page.waitForLoadState('networkidle');

  // Check quiz intro content
  const pathAB = await page.locator('text=/Path A.*Path B/i').count();
  console.log('Path A/B messaging: ' + (pathAB > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check 6 dimensions mentioned
  const sixDimensions = await page.locator('text=/6 dimensions/i, text=/six dimensions/i').count();
  console.log('Six dimensions mentioned: ' + (sixDimensions > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check for quiz card
  const quizCard = await page.locator('[class*="card"], [class*="Card"]').count();
  console.log('Quiz card found: ' + (quizCard > 0 ? 'YES' : 'NO'));

  // Check progress bar
  const progressBar = await page.locator('.h-2.bg-muted, [class*="progress"]').count();
  console.log('Progress bar found: ' + (progressBar > 0 ? 'YES' : 'NO - May be styled differently'));

  // Check dimension badge on first question
  const dimensionBadge = await page.locator('[class*="rounded-full"][class*="bg-"]').count();
  console.log('Dimension badges found: ' + dimensionBadge);

  // Check "Learn more about this topic" link
  const learnMoreLink = await page.locator('text=/Learn more about this topic/i').count();
  console.log('"Learn more about this topic" links: ' + (learnMoreLink > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check question options (buttons)
  const optionButtons = await page.locator('button.w-full, [class*="w-full"][class*="text-left"]').count();
  console.log('Answer option buttons: ' + optionButtons);

  // Take screenshot of quiz state
  await page.screenshot({ path: '/tmp/quiz-detailed.png', fullPage: true });

  // Try clicking an answer
  const firstOption = await page.locator('button.w-full, [class*="w-full"][class*="text-left"]').first();
  if (await firstOption.count() > 0) {
    await firstOption.click();
    await page.waitForTimeout(500);
    console.log('Clicked first answer option');

    // Check if we moved to question 2
    const questionNum = await page.locator('text=/Question 2 of/i').count();
    console.log('Advanced to question 2: ' + (questionNum > 0 ? 'YES' : 'NO'));

    await page.screenshot({ path: '/tmp/quiz-question2.png', fullPage: true });
  }

  // ============================================
  // TEST 3: ASSESSMENT PAGE
  // ============================================
  console.log('\n=== 3. ASSESSMENT PAGE TEST ===\n');

  await page.goto('http://localhost:3000/assessment');
  await page.waitForLoadState('networkidle');

  // Check Five Dimensions heading
  const fiveDimensions = await page.locator('h2:has-text("Five Dimensions"), h2:has-text("Four Dimensions")').count();
  console.log('Dimensions heading: ' + (fiveDimensions > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check if Data is first in list
  const dimensionsList = await page.locator('h3:has-text("Data"), h3:has-text("People")').all();
  if (dimensionsList.length > 0) {
    const firstDim = await dimensionsList[0].textContent();
    console.log('First dimension listed: ' + firstDim);
  }

  // Check What Happens Next
  const whatHappensNext = await page.locator('h2:has-text("What Happens Next")').count();
  console.log('"What Happens Next" section: ' + (whatHappensNext > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check Data Readiness link in What Happens Next
  const dataReadinessLink = await page.locator('a[href="/services/data-readiness"]').count();
  console.log('Data Readiness link in What Happens Next: ' + (dataReadinessLink > 0 ? 'FOUND (' + dataReadinessLink + ')' : 'NOT FOUND'));

  // ============================================
  // TEST 4: SERVICES PAGE
  // ============================================
  console.log('\n=== 4. SERVICES PAGE TEST ===\n');

  await page.goto('http://localhost:3000/services');
  await page.waitForLoadState('networkidle');

  // Check Data Readiness in services list
  const dataReadinessService = await page.locator('h3:has-text("Data Readiness"), a:has-text("Data Readiness")').count();
  console.log('Data Readiness service card: ' + (dataReadinessService > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check "Which Service Is Right" section
  const whichServiceSection = await page.locator('h2:has-text("Which Service Is Right")').count();
  console.log('"Which Service Is Right" section: ' + (whichServiceSection > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check data option in Which Service section
  const dataOption = await page.locator('text=/data is fragmented/i, text=/data is a mess/i').count();
  console.log('Data option in decision helper: ' + (dataOption > 0 ? 'FOUND' : 'NOT FOUND'));

  // ============================================
  // TEST 5: DATA READINESS SERVICE PAGE
  // ============================================
  console.log('\n=== 5. DATA READINESS PAGE TEST ===\n');

  const response = await page.goto('http://localhost:3000/services/data-readiness');
  console.log('HTTP Status: ' + response.status());

  await page.waitForLoadState('networkidle');

  const pageTitle = await page.title();
  console.log('Page title: ' + pageTitle);

  // Check if 404
  const is404 = await page.locator('text=/404/i, text=/Page Not Found/i').count();
  if (is404 > 0) {
    console.log('STATUS: PAGE RETURNS 404 - BROKEN LINK');
  } else {
    // Check for Warning Signs section
    const warningSignsHeading = await page.locator('h2:has-text("Warning Signs")').count();
    console.log('Warning Signs section: ' + (warningSignsHeading > 0 ? 'FOUND' : 'NOT FOUND'));

    // Check for What We Do / Capabilities
    const capabilitiesHeading = await page.locator('h2:has-text("What We Do"), h2:has-text("Capabilities")').count();
    console.log('Capabilities section: ' + (capabilitiesHeading > 0 ? 'FOUND' : 'NOT FOUND'));

    // Check for Expected Outcomes
    const outcomesHeading = await page.locator('h2:has-text("Outcomes"), h2:has-text("Expected Outcomes")').count();
    console.log('Outcomes section: ' + (outcomesHeading > 0 ? 'FOUND' : 'NOT FOUND'));

    // Check blog post links
    const blogLinks = await page.locator('a[href*="/blog/"]').count();
    console.log('Blog post links: ' + blogLinks);
  }

  await page.screenshot({ path: '/tmp/data-readiness-detailed.png', fullPage: true });

  // ============================================
  // TEST 6: NAVIGATION & RESPONSIVENESS
  // ============================================
  console.log('\n=== 6. NAVIGATION & RESPONSIVENESS ===\n');

  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Check dark mode toggle
  const darkModeBtn = await page.locator('button[aria-label*="theme"], button[aria-label*="dark"], button[aria-label*="mode"]').count();
  console.log('Dark mode toggle: ' + (darkModeBtn > 0 ? 'FOUND' : 'NOT FOUND'));

  // Try to find it by icon
  const sunMoonBtn = await page.locator('button:has(svg[class*="lucide-sun"]), button:has(svg[class*="lucide-moon"])').count();
  console.log('Sun/Moon icon button: ' + (sunMoonBtn > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check footer
  const footer = await page.locator('footer');
  const footerLinks = await footer.locator('a').all();
  console.log('Total footer links: ' + footerLinks.length);

  // Check footer has Data Readiness
  const footerDataReadiness = await footer.locator('a[href*="data-readiness"]').count();
  console.log('Footer Data Readiness link: ' + (footerDataReadiness > 0 ? 'FOUND' : 'NOT FOUND'));

  // Mobile responsiveness test
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);

  // Check for hamburger menu
  const hamburger = await page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], button[aria-label*="navigation"]').count();
  console.log('Mobile hamburger menu: ' + (hamburger > 0 ? 'FOUND' : 'NOT FOUND'));

  // Check if nav links are hidden on mobile
  const visibleNavLinks = await page.locator('nav a:visible').count();
  console.log('Visible nav links on mobile: ' + visibleNavLinks);

  await page.screenshot({ path: '/tmp/mobile-detailed.png', fullPage: true });

  // Try to open mobile menu if hamburger exists
  if (hamburger > 0) {
    const menuBtn = await page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]').first();
    await menuBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/mobile-menu-open.png' });
    console.log('Mobile menu opened - screenshot saved');
  }

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n========================================');
  console.log('TEST SUMMARY');
  console.log('========================================\n');

  // Check all key pages load
  const pagesToTest = [
    { url: 'http://localhost:3000', name: 'Homepage' },
    { url: 'http://localhost:3000/quiz', name: 'Quiz' },
    { url: 'http://localhost:3000/assessment', name: 'Assessment' },
    { url: 'http://localhost:3000/services', name: 'Services' },
    { url: 'http://localhost:3000/services/data-readiness', name: 'Data Readiness' },
    { url: 'http://localhost:3000/about', name: 'About' },
    { url: 'http://localhost:3000/blog', name: 'Blog' },
    { url: 'http://localhost:3000/contact', name: 'Contact' },
  ];

  for (const p of pagesToTest) {
    const resp = await page.goto(p.url);
    const status = resp.status();
    const has404Text = await page.locator('text=/404/i').count();
    const result = status === 200 && has404Text === 0 ? 'OK' : 'ISSUE (' + status + ')';
    console.log(p.name + ': ' + result);
  }

  await browser.close();
  console.log('\n=== TESTING COMPLETE ===\n');
})();
