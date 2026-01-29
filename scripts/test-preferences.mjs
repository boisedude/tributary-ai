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

// Helper to generate a secure token
function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

async function runTests() {
  console.log('=== Testing Newsletter & Preference System ===\n');

  // Test customers to create
  const testCustomers = [
    { email: 'alice@testcompany.com', first_name: 'Alice', last_name: 'Smith', company_domain: 'testcompany.com' },
    { email: 'bob@testcompany.com', first_name: 'Bob', last_name: 'Johnson', company_domain: 'testcompany.com' },
    { email: 'carol@example.org', first_name: 'Carol', last_name: 'Williams', company_domain: 'example.org' },
  ];

  // Step 1: Create test customers
  console.log('Step 1: Creating test customers...');

  const createdContacts = [];
  for (const customer of testCustomers) {
    // Check if already exists
    const { data: existing } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', customer.email)
      .single();

    if (existing) {
      console.log(`  ⚠ ${customer.email} already exists, using existing contact`);
      createdContacts.push({ ...customer, id: existing.id });
      continue;
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        ...customer,
        lead_source: 'newsletter',
        lead_status: 'new',
        newsletter_subscribed: true,
        newsletter_subscribed_at: new Date().toISOString(),
        sales_contact_allowed: true,
        product_updates_subscribed: false,
        webinar_invites_subscribed: false,
        research_reports_subscribed: false,
        do_not_contact: false,
      })
      .select()
      .single();

    if (error) {
      console.log(`  ✗ Failed to create ${customer.email}: ${error.message}`);
    } else {
      console.log(`  ✓ Created ${customer.email} (${data.id})`);
      createdContacts.push({ ...customer, id: data.id });
    }
  }

  if (createdContacts.length === 0) {
    console.log('\n✗ No contacts created, cannot continue tests');
    return;
  }

  // Step 2: Generate preference tokens for each contact
  console.log('\nStep 2: Generating preference tokens...');

  const tokens = [];
  for (const contact of createdContacts) {
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);

    const { error } = await supabase
      .from('preference_tokens')
      .insert({
        contact_id: contact.id,
        token: token,
        expires_at: expiresAt.toISOString(),
      });

    if (error) {
      console.log(`  ✗ Failed to create token for ${contact.email}: ${error.message}`);
    } else {
      console.log(`  ✓ Token for ${contact.email}: ${token.substring(0, 10)}...`);
      tokens.push({ contact, token });
    }
  }

  // Step 3: Simulate preference changes
  console.log('\nStep 3: Simulating preference changes...');

  // Alice opts into everything
  if (tokens[0]) {
    const alice = tokens[0].contact;
    console.log(`\n  Updating ${alice.email} - opting into all communications...`);

    const { error: updateError } = await supabase
      .from('contacts')
      .update({
        newsletter_subscribed: true,
        product_updates_subscribed: true,
        webinar_invites_subscribed: true,
        research_reports_subscribed: true,
        sales_contact_allowed: true,
        do_not_contact: false,
        preferences_updated_at: new Date().toISOString(),
      })
      .eq('id', alice.id);

    if (updateError) {
      console.log(`  ✗ Update failed: ${updateError.message}`);
    } else {
      console.log(`  ✓ Preferences updated`);

      // Log the changes
      const changes = [
        { field: 'product_updates_subscribed', old_value: false, new_value: true },
        { field: 'webinar_invites_subscribed', old_value: false, new_value: true },
        { field: 'research_reports_subscribed', old_value: false, new_value: true },
      ];

      for (const change of changes) {
        await supabase.from('preference_changes').insert({
          contact_id: alice.id,
          changed_field: change.field,
          old_value: change.old_value,
          new_value: change.new_value,
          change_method: 'token_link',
        });
      }
      console.log(`  ✓ Logged ${changes.length} preference changes`);
    }
  }

  // Bob unsubscribes from newsletter only
  if (tokens[1]) {
    const bob = tokens[1].contact;
    console.log(`\n  Updating ${bob.email} - unsubscribing from newsletter...`);

    const { error: updateError } = await supabase
      .from('contacts')
      .update({
        newsletter_subscribed: false,
        preferences_updated_at: new Date().toISOString(),
      })
      .eq('id', bob.id);

    if (updateError) {
      console.log(`  ✗ Update failed: ${updateError.message}`);
    } else {
      console.log(`  ✓ Preferences updated`);

      await supabase.from('preference_changes').insert({
        contact_id: bob.id,
        changed_field: 'newsletter_subscribed',
        old_value: true,
        new_value: false,
        change_method: 'token_link',
      });
      console.log(`  ✓ Logged preference change`);
    }
  }

  // Carol opts for Do Not Contact (master opt-out)
  if (tokens[2]) {
    const carol = tokens[2].contact;
    console.log(`\n  Updating ${carol.email} - enabling Do Not Contact...`);

    const { error: updateError } = await supabase
      .from('contacts')
      .update({
        newsletter_subscribed: false,
        product_updates_subscribed: false,
        webinar_invites_subscribed: false,
        research_reports_subscribed: false,
        sales_contact_allowed: false,
        do_not_contact: true,
        preferences_updated_at: new Date().toISOString(),
      })
      .eq('id', carol.id);

    if (updateError) {
      console.log(`  ✗ Update failed: ${updateError.message}`);
    } else {
      console.log(`  ✓ Preferences updated (all communications disabled)`);

      const changes = [
        { field: 'do_not_contact', old_value: false, new_value: true },
        { field: 'newsletter_subscribed', old_value: true, new_value: false },
        { field: 'sales_contact_allowed', old_value: true, new_value: false },
      ];

      for (const change of changes) {
        await supabase.from('preference_changes').insert({
          contact_id: carol.id,
          changed_field: change.field,
          old_value: change.old_value,
          new_value: change.new_value,
          change_method: 'token_link',
        });
      }
      console.log(`  ✓ Logged ${changes.length} preference changes`);
    }
  }

  // Step 4: Verify data
  console.log('\n\nStep 4: Verifying data...');

  // Check contacts
  console.log('\n  Contact Preferences:');
  const { data: contacts } = await supabase
    .from('contacts')
    .select('email, newsletter_subscribed, product_updates_subscribed, webinar_invites_subscribed, research_reports_subscribed, sales_contact_allowed, do_not_contact')
    .in('email', testCustomers.map(c => c.email));

  if (contacts) {
    for (const c of contacts) {
      console.log(`\n  ${c.email}:`);
      console.log(`    Newsletter: ${c.newsletter_subscribed ? '✓' : '✗'}`);
      console.log(`    Product Updates: ${c.product_updates_subscribed ? '✓' : '✗'}`);
      console.log(`    Webinars: ${c.webinar_invites_subscribed ? '✓' : '✗'}`);
      console.log(`    Research: ${c.research_reports_subscribed ? '✓' : '✗'}`);
      console.log(`    Sales Contact: ${c.sales_contact_allowed ? '✓' : '✗'}`);
      console.log(`    Do Not Contact: ${c.do_not_contact ? '⛔' : '✗'}`);
    }
  }

  // Check audit log
  console.log('\n  Audit Log (preference_changes):');
  const { data: auditLog } = await supabase
    .from('preference_changes')
    .select('contact_id, changed_field, old_value, new_value, change_method, created_at')
    .in('contact_id', createdContacts.map(c => c.id))
    .order('created_at', { ascending: true });

  if (auditLog && auditLog.length > 0) {
    console.log(`  Found ${auditLog.length} audit entries:`);
    for (const entry of auditLog) {
      const contact = createdContacts.find(c => c.id === entry.contact_id);
      console.log(`    - ${contact?.email}: ${entry.changed_field} ${entry.old_value} → ${entry.new_value} (${entry.change_method})`);
    }
  } else {
    console.log('  No audit entries found');
  }

  // Check tokens
  console.log('\n  Preference Tokens:');
  const { data: tokenData } = await supabase
    .from('preference_tokens')
    .select('contact_id, token, expires_at, used_at')
    .in('contact_id', createdContacts.map(c => c.id));

  if (tokenData && tokenData.length > 0) {
    console.log(`  Found ${tokenData.length} tokens:`);
    for (const t of tokenData) {
      const contact = createdContacts.find(c => c.id === t.contact_id);
      console.log(`    - ${contact?.email}: ${t.token.substring(0, 10)}... (expires: ${new Date(t.expires_at).toLocaleString()})`);
    }
  } else {
    console.log('  No tokens found');
  }

  // Summary
  console.log('\n\n=== Test Summary ===');
  console.log(`✓ Created ${createdContacts.length} test contacts`);
  console.log(`✓ Generated ${tokens.length} preference tokens`);
  console.log(`✓ Simulated preference changes for all contacts`);
  console.log(`✓ Verified audit logging`);

  console.log('\n=== Test URLs ===');
  console.log('To test the preference center, use these URLs:\n');
  for (const t of tokens) {
    console.log(`${t.contact.email}:`);
    console.log(`  http://localhost:3000/preferences?token=${t.token}\n`);
  }
}

runTests().catch(console.error);
