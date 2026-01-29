-- =============================================================================
-- CRM SCHEMA FOR THE TRIBUTARY
-- Central contact database with invoicing
-- =============================================================================

-- =============================================================================
-- COMPANIES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Core company info
    name TEXT NOT NULL,
    domain TEXT UNIQUE,  -- Primary identifier for deduplication

    -- Firmographics
    industry TEXT,
    employee_count_range TEXT,  -- '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
    annual_revenue_range TEXT,  -- '$1M-$10M', '$10M-$50M', '$50M-$100M', '$100M-$500M', '$500M+'
    location_city TEXT,
    location_state TEXT,
    location_country TEXT DEFAULT 'USA',

    -- Company classification
    company_type TEXT DEFAULT 'prospect',  -- 'prospect', 'client', 'partner', 'vendor'

    -- External IDs (for future integrations)
    apollo_id TEXT UNIQUE,
    linkedin_url TEXT,
    website_url TEXT,

    -- Metadata
    notes TEXT,
    tags TEXT[],

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_company_type CHECK (company_type IN ('prospect', 'client', 'partner', 'vendor', 'other'))
);

-- Indexes for companies
-- Note: domain has UNIQUE constraint which creates implicit index
CREATE INDEX IF NOT EXISTS idx_companies_type ON companies(company_type);
CREATE INDEX IF NOT EXISTS idx_companies_tags ON companies USING GIN(tags);

-- =============================================================================
-- CONTACTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Core contact info
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT GENERATED ALWAYS AS (
        COALESCE(first_name || ' ' || last_name, first_name, last_name, email)
    ) STORED,

    -- Company relationship
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    company_domain TEXT,  -- Denormalized from email
    job_title TEXT,

    -- Contact details
    phone TEXT,
    linkedin_url TEXT,

    -- Lead classification
    lead_status TEXT DEFAULT 'new',  -- 'new', 'contacted', 'qualified', 'proposal', 'client', 'lost', 'inactive'
    lead_source TEXT,  -- 'quiz', 'newsletter', 'contact_form', 'referral', 'apollo', 'manual'

    -- Engagement tracking
    last_interaction_at TIMESTAMPTZ,
    interaction_count INTEGER DEFAULT 0,

    -- External IDs (for future integrations)
    apollo_id TEXT UNIQUE,
    beehiiv_subscriber_id TEXT UNIQUE,

    -- Newsletter status
    newsletter_subscribed BOOLEAN DEFAULT FALSE,
    newsletter_subscribed_at TIMESTAMPTZ,

    -- Quiz relationship
    quiz_submission_id UUID REFERENCES quiz_submissions(id) ON DELETE SET NULL,
    quiz_score NUMERIC(5,2),
    quiz_band TEXT,

    -- Metadata
    notes TEXT,
    tags TEXT[],

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_lead_status CHECK (lead_status IN ('new', 'contacted', 'qualified', 'proposal', 'client', 'lost', 'inactive')),
    CONSTRAINT valid_lead_source CHECK (lead_source IS NULL OR lead_source IN ('quiz', 'newsletter', 'contact_form', 'blog', 'referral', 'apollo', 'manual', 'linkedin'))
);

-- Indexes for contacts
-- Note: email has UNIQUE constraint which creates implicit index
CREATE INDEX IF NOT EXISTS idx_contacts_company_id ON contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_contacts_company_domain ON contacts(company_domain);
CREATE INDEX IF NOT EXISTS idx_contacts_lead_status ON contacts(lead_status);
CREATE INDEX IF NOT EXISTS idx_contacts_lead_source ON contacts(lead_source);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_tags ON contacts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_contacts_newsletter ON contacts(newsletter_subscribed) WHERE newsletter_subscribed = TRUE;

-- =============================================================================
-- INTERACTIONS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Relationships
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,

    -- Interaction details
    interaction_type TEXT NOT NULL,  -- 'email', 'call', 'meeting', 'note', 'quiz', 'proposal', 'contract'
    direction TEXT,  -- 'inbound', 'outbound', null for internal notes

    -- Content
    subject TEXT,
    body TEXT,

    -- Metadata
    metadata JSONB,  -- Flexible storage

    -- Timestamps
    occurred_at TIMESTAMPTZ DEFAULT NOW(),  -- When the interaction happened
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_interaction_type CHECK (interaction_type IN ('email', 'call', 'meeting', 'note', 'form_submission', 'quiz', 'proposal', 'contract', 'invoice')),
    CONSTRAINT valid_direction CHECK (direction IS NULL OR direction IN ('inbound', 'outbound'))
);

-- Indexes for interactions
CREATE INDEX IF NOT EXISTS idx_interactions_contact_id ON interactions(contact_id);
CREATE INDEX IF NOT EXISTS idx_interactions_company_id ON interactions(company_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_interactions_occurred_at ON interactions(occurred_at DESC);

-- =============================================================================
-- INVOICES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Invoice identification
    invoice_number TEXT UNIQUE NOT NULL,  -- e.g., 'INV-2026-001'

    -- Relationships
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,

    -- Invoice details
    description TEXT NOT NULL,  -- 'The Assessment - Q1 2026'
    service_type TEXT,  -- 'assessment', 'implementation', 'managed_services', 'other'

    -- Amounts (store in cents for precision)
    amount_cents INTEGER NOT NULL,  -- 2500000 = $25,000.00
    currency TEXT DEFAULT 'USD',

    -- Status tracking
    status TEXT DEFAULT 'draft',  -- 'draft', 'sent', 'paid', 'overdue', 'cancelled'

    -- Dates
    issue_date DATE,
    due_date DATE,
    paid_date DATE,

    -- Payment details
    payment_method TEXT,  -- 'ach', 'wire', 'check', 'card'
    payment_reference TEXT,  -- Check number, wire reference, etc.

    -- Notes
    notes TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_status CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled', 'void')),
    CONSTRAINT valid_service_type CHECK (service_type IS NULL OR service_type IN ('assessment', 'implementation', 'managed_services', 'consulting', 'other')),
    CONSTRAINT positive_amount CHECK (amount_cents > 0)
);

-- Indexes for invoices
CREATE INDEX IF NOT EXISTS idx_invoices_company_id ON invoices(company_id);
CREATE INDEX IF NOT EXISTS idx_invoices_contact_id ON invoices(contact_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_issue_date ON invoices(issue_date DESC);

-- =============================================================================
-- EXPENSES TABLE (Optional - for tracking business expenses)
-- =============================================================================
CREATE TABLE IF NOT EXISTS expenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Expense details
    description TEXT NOT NULL,
    category TEXT,  -- 'software', 'travel', 'office', 'marketing', 'professional_services', 'other'
    vendor TEXT,

    -- Amounts
    amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',

    -- Dates
    expense_date DATE NOT NULL,

    -- Tax info
    tax_deductible BOOLEAN DEFAULT TRUE,

    -- Receipt tracking
    receipt_url TEXT,

    -- Notes
    notes TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_category CHECK (category IS NULL OR category IN ('software', 'travel', 'office', 'marketing', 'professional_services', 'equipment', 'other')),
    CONSTRAINT positive_expense CHECK (amount_cents > 0)
);

-- Indexes for expenses
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to extract domain from email
CREATE OR REPLACE FUNCTION extract_email_domain(email TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(split_part(email, '@', 2));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to update contact's company_domain on insert/update
CREATE OR REPLACE FUNCTION update_contact_company_domain()
RETURNS TRIGGER AS $$
BEGIN
    NEW.company_domain := extract_email_domain(NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-populate company_domain
DROP TRIGGER IF EXISTS trigger_update_contact_company_domain ON contacts;
CREATE TRIGGER trigger_update_contact_company_domain
    BEFORE INSERT OR UPDATE OF email ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_company_domain();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS trigger_contacts_updated_at ON contacts;
CREATE TRIGGER trigger_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trigger_companies_updated_at ON companies;
CREATE TRIGGER trigger_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trigger_invoices_updated_at ON invoices;
CREATE TRIGGER trigger_invoices_updated_at
    BEFORE UPDATE ON invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Function to update contact stats when interaction is added
CREATE OR REPLACE FUNCTION update_contact_interaction_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE contacts
    SET
        last_interaction_at = NEW.occurred_at,
        interaction_count = interaction_count + 1
    WHERE id = NEW.contact_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_contact_stats ON interactions;
CREATE TRIGGER trigger_update_contact_stats
    AFTER INSERT ON interactions
    FOR EACH ROW
    WHEN (NEW.contact_id IS NOT NULL)
    EXECUTE FUNCTION update_contact_interaction_stats();

-- Function to generate next invoice number
-- Uses advisory lock to prevent race conditions
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    year_str TEXT;
    next_num INTEGER;
    pattern TEXT;
BEGIN
    -- Get advisory lock to prevent race conditions
    PERFORM pg_advisory_xact_lock(hashtext('invoice_number_gen'));

    year_str := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
    pattern := 'INV-' || year_str || '-';

    -- Find the highest existing number for this year
    SELECT COALESCE(MAX(
        NULLIF(REGEXP_REPLACE(invoice_number, '^INV-' || year_str || '-0*', ''), '')::INTEGER
    ), 0) + 1
    INTO next_num
    FROM invoices
    WHERE invoice_number LIKE pattern || '%'
      AND invoice_number ~ ('^INV-' || year_str || '-[0-9]+$');

    RETURN pattern || LPAD(next_num::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Service role has full access (for admin/CLI queries)
-- These policies allow service_role key to do everything

CREATE POLICY "Service role full access" ON companies
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON contacts
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON interactions
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON invoices
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON expenses
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow anon to insert contacts (from website forms)
-- Only allow specific safe sources from public forms
CREATE POLICY "Allow contact insert from forms" ON contacts
    FOR INSERT TO anon
    WITH CHECK (lead_source IS NOT NULL AND lead_source IN ('quiz', 'newsletter', 'contact_form', 'blog', 'website'));

-- =============================================================================
-- LINK QUIZ SUBMISSIONS TO CONTACTS
-- =============================================================================

-- Function to link or create contact from quiz submission
CREATE OR REPLACE FUNCTION link_quiz_to_contact(submission_id UUID)
RETURNS UUID AS $$
DECLARE
    sub RECORD;
    contact_uuid UUID;
BEGIN
    -- Get the submission
    SELECT * INTO sub FROM quiz_submissions WHERE id = submission_id;

    IF sub IS NULL THEN
        RETURN NULL;
    END IF;

    -- Try to find existing contact by email
    IF sub.user_email IS NOT NULL THEN
        SELECT id INTO contact_uuid FROM contacts WHERE email = sub.user_email;

        IF contact_uuid IS NOT NULL THEN
            -- Update existing contact with quiz data
            UPDATE contacts SET
                quiz_submission_id = submission_id,
                quiz_score = sub.weighted_percentage,
                quiz_band = sub.band,
                updated_at = NOW()
            WHERE id = contact_uuid;
        ELSE
            -- Create new contact
            INSERT INTO contacts (
                email,
                lead_source,
                quiz_submission_id,
                quiz_score,
                quiz_band
            ) VALUES (
                sub.user_email,
                'quiz',
                submission_id,
                sub.weighted_percentage,
                sub.band
            ) RETURNING id INTO contact_uuid;
        END IF;
    END IF;

    RETURN contact_uuid;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- USEFUL VIEWS
-- =============================================================================

-- View: Contacts with company info
CREATE OR REPLACE VIEW contacts_with_company AS
SELECT
    c.*,
    co.name as company_name,
    co.industry,
    co.employee_count_range,
    co.company_type
FROM contacts c
LEFT JOIN companies co ON c.company_id = co.id;

-- View: Outstanding invoices
CREATE OR REPLACE VIEW outstanding_invoices AS
SELECT
    i.*,
    i.amount_cents / 100.0 as amount_dollars,
    c.full_name as contact_name,
    c.email as contact_email,
    co.name as company_name,
    CURRENT_DATE - i.due_date as days_overdue
FROM invoices i
LEFT JOIN contacts c ON i.contact_id = c.id
LEFT JOIN companies co ON i.company_id = co.id
WHERE i.status IN ('sent', 'overdue')
ORDER BY i.due_date ASC;

-- View: Revenue summary by company
CREATE OR REPLACE VIEW revenue_by_company AS
SELECT
    co.id as company_id,
    co.name as company_name,
    COUNT(i.id) as invoice_count,
    SUM(CASE WHEN i.status = 'paid' THEN i.amount_cents ELSE 0 END) / 100.0 as paid_amount,
    SUM(CASE WHEN i.status IN ('sent', 'overdue') THEN i.amount_cents ELSE 0 END) / 100.0 as outstanding_amount,
    SUM(i.amount_cents) / 100.0 as total_invoiced
FROM companies co
LEFT JOIN invoices i ON co.id = i.company_id
WHERE co.company_type = 'client'
GROUP BY co.id, co.name
ORDER BY total_invoiced DESC;

-- View: Recent quiz leads (not yet contacted)
CREATE OR REPLACE VIEW new_quiz_leads AS
SELECT
    c.id,
    c.full_name,
    c.email,
    c.company_domain,
    c.quiz_score,
    c.quiz_band,
    c.created_at,
    qs.user_role,
    qs.company_name
FROM contacts c
LEFT JOIN quiz_submissions qs ON c.quiz_submission_id = qs.id
WHERE c.lead_source = 'quiz'
  AND c.lead_status = 'new'
ORDER BY c.created_at DESC;
