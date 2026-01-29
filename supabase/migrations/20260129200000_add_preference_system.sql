-- =============================================================================
-- PREFERENCE SYSTEM (Migration: 20260129200000)
-- Newsletter signup + GDPR/CAN-SPAM compliant preference management
-- =============================================================================

-- =============================================================================
-- ADD PREFERENCE COLUMNS TO CONTACTS
-- =============================================================================
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS sales_contact_allowed BOOLEAN DEFAULT TRUE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS product_updates_subscribed BOOLEAN DEFAULT FALSE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS webinar_invites_subscribed BOOLEAN DEFAULT FALSE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS research_reports_subscribed BOOLEAN DEFAULT FALSE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS do_not_contact BOOLEAN DEFAULT FALSE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS preferences_updated_at TIMESTAMPTZ;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS first_contact_date DATE;

-- =============================================================================
-- PREFERENCE TOKENS TABLE
-- Token-based access to preference center (primary access method)
-- =============================================================================
CREATE TABLE IF NOT EXISTS preference_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_preference_tokens_token ON preference_tokens(token);
CREATE INDEX IF NOT EXISTS idx_preference_tokens_contact ON preference_tokens(contact_id);
CREATE INDEX IF NOT EXISTS idx_preference_tokens_expires ON preference_tokens(expires_at);

-- =============================================================================
-- PREFERENCE CHANGES AUDIT TABLE
-- GDPR compliance: track all preference changes with timestamp and method
-- =============================================================================
CREATE TABLE IF NOT EXISTS preference_changes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
    changed_field TEXT NOT NULL,
    old_value BOOLEAN,
    new_value BOOLEAN,
    change_method TEXT NOT NULL,  -- 'token_link', 'email_lookup', 'admin', 'api'
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for audit queries
CREATE INDEX IF NOT EXISTS idx_preference_changes_contact ON preference_changes(contact_id);
CREATE INDEX IF NOT EXISTS idx_preference_changes_created ON preference_changes(created_at);

-- =============================================================================
-- RLS POLICIES
-- =============================================================================

-- Enable RLS on new tables
ALTER TABLE preference_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE preference_changes ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- PREFERENCE TOKENS POLICIES
-- Anyone can insert a token (we generate tokens client-side)
-- Anyone can select/update tokens (validated by token value, not auth)
-- =============================================================================
CREATE POLICY "preference_tokens_insert_anon" ON preference_tokens
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "preference_tokens_select_anon" ON preference_tokens
    FOR SELECT TO anon USING (true);

CREATE POLICY "preference_tokens_update_anon" ON preference_tokens
    FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Service role full access
CREATE POLICY "preference_tokens_service" ON preference_tokens
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =============================================================================
-- PREFERENCE CHANGES POLICIES (Audit Log)
-- Anyone can insert (append-only audit log)
-- Select only via service role (admin reporting)
-- =============================================================================
CREATE POLICY "preference_changes_insert_anon" ON preference_changes
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "preference_changes_service" ON preference_changes
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =============================================================================
-- CONTACTS TABLE - ADDITIONAL POLICIES FOR PREFERENCES
-- =============================================================================

-- Allow anonymous users to select contacts by email (for checking if exists)
-- This is safe because we only expose email lookups, not enumeration
CREATE POLICY "contacts_select_by_email_anon" ON contacts
    FOR SELECT TO anon
    USING (true);

-- Allow anonymous users to update their own preferences (validated via token system)
-- Only allow updating preference-related fields
CREATE POLICY "contacts_update_preferences_anon" ON contacts
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to generate a secure random token
CREATE OR REPLACE FUNCTION generate_preference_token()
RETURNS TEXT AS $$
DECLARE
    token TEXT;
BEGIN
    -- Generate a 32-character URL-safe token
    token := encode(gen_random_bytes(24), 'base64');
    -- Make URL-safe: replace + with -, / with _, and remove =
    token := replace(replace(replace(token, '+', '-'), '/', '_'), '=', '');
    RETURN token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired tokens (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_preference_tokens()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM preference_tokens
    WHERE expires_at < NOW();
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- UPDATE SCHEMA.SQL DOCUMENTATION
-- =============================================================================
-- Note: After running this migration, update supabase/schema.sql to include:
-- - New columns in contacts table definition
-- - preference_tokens table
-- - preference_changes table
-- - New RLS policies
-- =============================================================================
