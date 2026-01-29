import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Read .env.local manually (handle Windows line endings)
const envContent = readFileSync('.env.local', 'utf-8').replace(/\r/g, '');
const env = {};
envContent.split('\n').forEach(line => {
  // Skip comments and empty lines
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

if (!supabaseUrl || !serviceKey) {
  console.error('Missing SUPABASE_URL or SERVICE_ROLE_KEY');
  console.log('Found env vars:', Object.keys(env).join(', '));
  process.exit(1);
}

console.log(`Connecting to: ${supabaseUrl}\n`);

const supabase = createClient(supabaseUrl, serviceKey, {
  db: { schema: 'public' }
});

async function runMigration() {
  console.log('Checking preference system migration status...\n');

  // Step 1: Check if columns exist on contacts table
  console.log('Step 1: Checking preference columns on contacts...');

  const { data: contactCheck, error: contactCheckError } = await supabase
    .from('contacts')
    .select('id, sales_contact_allowed, do_not_contact, preferences_updated_at')
    .limit(1);

  if (contactCheckError && contactCheckError.message.includes('does not exist')) {
    console.log('  ✗ Columns need to be added via SQL console');
  } else if (contactCheckError) {
    console.log(`  ? Error: ${contactCheckError.message}`);
  } else {
    console.log('  ✓ Preference columns exist');
  }

  // Step 2: Check preference_tokens table
  console.log('\nStep 2: Checking preference_tokens table...');

  const { data: tokenCheck, error: tokenCheckError } = await supabase
    .from('preference_tokens')
    .select('id')
    .limit(1);

  if (tokenCheckError && tokenCheckError.code === '42P01') {
    console.log('  ✗ Table does not exist - needs to be created via SQL console');
  } else if (tokenCheckError) {
    console.log(`  ? Error: ${tokenCheckError.message}`);
  } else {
    console.log('  ✓ Table exists');
  }

  // Step 3: Check preference_changes table
  console.log('\nStep 3: Checking preference_changes table...');

  const { data: changesCheck, error: changesCheckError } = await supabase
    .from('preference_changes')
    .select('id')
    .limit(1);

  if (changesCheckError && changesCheckError.code === '42P01') {
    console.log('  ✗ Table does not exist - needs to be created via SQL console');
  } else if (changesCheckError) {
    console.log(`  ? Error: ${changesCheckError.message}`);
  } else {
    console.log('  ✓ Table exists');
  }

  console.log('\n=== Migration Status ===');

  const needsMigration =
    (contactCheckError && contactCheckError.message.includes('does not exist')) ||
    (tokenCheckError && tokenCheckError.code === '42P01') ||
    (changesCheckError && changesCheckError.code === '42P01');

  if (needsMigration) {
    console.log('Migration needed. Run the following SQL in Supabase Dashboard SQL Editor:');
    console.log('Copy contents from: supabase/migrations/20260129200000_add_preference_system.sql\n');
  } else {
    console.log('All tables and columns exist! Migration already applied.\n');
  }
}

runMigration();
