import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Read .env.local manually (handle Windows line endings)
const envContent = readFileSync('.env.local', 'utf-8').replace(/\r/g, '');
const env = {};
envContent.split('\n').forEach(line => {
  if (line.startsWith('#') || !line.trim()) return;
  const eqIndex = line.indexOf('=');
  if (eqIndex > 0) {
    const key = line.substring(0, eqIndex).trim();
    const value = line.substring(eqIndex + 1).trim();
    env[key] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceKey);

const PRODUCTION_URL = 'https://www.thetributary.ai';

// Helper to generate a secure token
function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

async function testProduction() {
  console.log('=== Production Testing: Newsletter & Preference System ===\n');
  console.log(`Target: ${PRODUCTION_URL}\n`);

  let passed = 0;
  let failed = 0;

  // Test 1: Check preference center page loads
  console.log('Test 1: Preference center page loads...');
  try {
    const response = await fetch(`${PRODUCTION_URL}/preferences/`);
    if (response.ok) {
      const html = await response.text();
      // Client-side rendered page - check for basic structure and script loading
      if (html.includes('preferences') && html.includes('_next/static')) {
        console.log('  ✓ PASSED - Preference center page loads correctly (client-rendered)');
        passed++;
      } else {
        console.log('  ✗ FAILED - Page content unexpected');
        failed++;
      }
    } else {
      console.log(`  ✗ FAILED - HTTP ${response.status}`);
      failed++;
    }
  } catch (err) {
    console.log(`  ✗ FAILED - ${err.message}`);
    failed++;
  }

  // Test 2: Check footer newsletter signup exists on homepage
  console.log('\nTest 2: Newsletter signup in footer...');
  try {
    const response = await fetch(`${PRODUCTION_URL}/`);
    if (response.ok) {
      const html = await response.text();
      if (html.includes('Newsletter') && html.includes('Subscribe')) {
        console.log('  ✓ PASSED - Newsletter signup found in homepage');
        passed++;
      } else {
        console.log('  ✗ FAILED - Newsletter signup not found');
        failed++;
      }
    } else {
      console.log(`  ✗ FAILED - HTTP ${response.status}`);
      failed++;
    }
  } catch (err) {
    console.log(`  ✗ FAILED - ${err.message}`);
    failed++;
  }

  // Test 3: Check Email Preferences link in footer
  console.log('\nTest 3: Email Preferences link in footer...');
  try {
    const response = await fetch(`${PRODUCTION_URL}/`);
    if (response.ok) {
      const html = await response.text();
      if (html.includes('/preferences') && html.includes('Email Preferences')) {
        console.log('  ✓ PASSED - Email Preferences link found');
        passed++;
      } else {
        console.log('  ✗ FAILED - Email Preferences link not found');
        failed++;
      }
    } else {
      console.log(`  ✗ FAILED - HTTP ${response.status}`);
      failed++;
    }
  } catch (err) {
    console.log(`  ✗ FAILED - ${err.message}`);
    failed++;
  }

  // Test 4: Database - Create test contact
  console.log('\nTest 4: Database - Create test contact...');
  const testEmail = `prodtest-${Date.now()}@example.com`;
  try {
    const { data: contact, error } = await supabase
      .from('contacts')
      .insert({
        email: testEmail,
        first_name: 'Production',
        last_name: 'Test',
        lead_source: 'newsletter',
        newsletter_subscribed: true,
        newsletter_subscribed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    console.log(`  ✓ PASSED - Created contact: ${contact.id}`);
    passed++;

    // Test 5: Generate preference token
    console.log('\nTest 5: Generate preference token...');
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);

    const { error: tokenError } = await supabase
      .from('preference_tokens')
      .insert({
        contact_id: contact.id,
        token: token,
        expires_at: expiresAt.toISOString(),
      });

    if (tokenError) throw tokenError;
    console.log(`  ✓ PASSED - Token generated: ${token.substring(0, 10)}...`);
    passed++;

    // Test 6: Check preference page with token
    console.log('\nTest 6: Preference page with token...');
    const prefResponse = await fetch(`${PRODUCTION_URL}/preferences/?token=${token}`);
    if (prefResponse.ok) {
      const html = await prefResponse.text();
      // The page loads, which is good - the actual token validation happens client-side
      if (html.includes('preferences') || html.includes('Preference')) {
        console.log('  ✓ PASSED - Preference page loads with token parameter');
        passed++;
      } else {
        console.log('  ✗ FAILED - Unexpected page content');
        failed++;
      }
    } else {
      console.log(`  ✗ FAILED - HTTP ${prefResponse.status}`);
      failed++;
    }

    // Test 7: Update preferences
    console.log('\nTest 7: Update contact preferences...');
    const { error: updateError } = await supabase
      .from('contacts')
      .update({
        product_updates_subscribed: true,
        webinar_invites_subscribed: true,
        preferences_updated_at: new Date().toISOString(),
      })
      .eq('id', contact.id);

    if (updateError) throw updateError;
    console.log('  ✓ PASSED - Preferences updated');
    passed++;

    // Test 8: Log preference change
    console.log('\nTest 8: Log preference change (audit)...');
    const { error: auditError } = await supabase
      .from('preference_changes')
      .insert({
        contact_id: contact.id,
        changed_field: 'product_updates_subscribed',
        old_value: false,
        new_value: true,
        change_method: 'api',
      });

    if (auditError) throw auditError;
    console.log('  ✓ PASSED - Audit log entry created');
    passed++;

    // Test 9: Verify audit log
    console.log('\nTest 9: Verify audit log...');
    const { data: auditData, error: auditReadError } = await supabase
      .from('preference_changes')
      .select('*')
      .eq('contact_id', contact.id);

    if (auditReadError) throw auditReadError;
    if (auditData && auditData.length > 0) {
      console.log(`  ✓ PASSED - Found ${auditData.length} audit entries`);
      passed++;
    } else {
      console.log('  ✗ FAILED - No audit entries found');
      failed++;
    }

    // Cleanup
    console.log('\nCleaning up test data...');
    await supabase.from('preference_changes').delete().eq('contact_id', contact.id);
    await supabase.from('preference_tokens').delete().eq('contact_id', contact.id);
    await supabase.from('contacts').delete().eq('id', contact.id);
    console.log('  ✓ Test data cleaned up');

  } catch (err) {
    console.log(`  ✗ FAILED - ${err.message}`);
    failed++;
  }

  // Summary
  console.log('\n==========================================');
  console.log('Production Test Summary');
  console.log('==========================================');
  console.log(`  Passed: ${passed}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total:  ${passed + failed}`);
  console.log('==========================================');

  if (failed === 0) {
    console.log('\n✓ All production tests passed!');
    console.log(`\nProduction URLs:`);
    console.log(`  Homepage: ${PRODUCTION_URL}`);
    console.log(`  Preferences: ${PRODUCTION_URL}/preferences/`);
  } else {
    console.log('\n✗ Some tests failed. Please investigate.');
    process.exit(1);
  }
}

testProduction().catch(console.error);
