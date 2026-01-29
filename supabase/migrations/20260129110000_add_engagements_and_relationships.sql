-- =============================================================================
-- ENGAGEMENTS, LINE ITEMS, TAX TRACKING, AND RELATIONSHIP TRACKING
-- =============================================================================

-- =============================================================================
-- ENGAGEMENTS TABLE
-- Links projects/work to invoices and tracks project status
-- =============================================================================
CREATE TABLE IF NOT EXISTS engagements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Relationships
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,

    -- Engagement details
    name TEXT NOT NULL,  -- 'The Assessment - Acme Corp Q1 2026'
    engagement_type TEXT NOT NULL,  -- 'assessment', 'implementation', 'managed_services', 'consulting'
    status TEXT DEFAULT 'proposed',  -- 'proposed', 'contracted', 'active', 'completed', 'cancelled'

    -- Contract/SOW reference
    sow_signed_date DATE,
    sow_document_url TEXT,  -- Link to signed SOW in Google Drive/Dropbox

    -- Financials
    total_value_cents INTEGER,  -- Total contract value
    billing_type TEXT DEFAULT 'fixed',  -- 'fixed', 'retainer', 'milestone', 'hourly'

    -- Timeline
    start_date DATE,
    target_end_date DATE,
    actual_end_date DATE,

    -- For managed services / retainers
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_amount_cents INTEGER,  -- Monthly retainer amount
    recurring_frequency TEXT,  -- 'monthly', 'quarterly', 'annual'
    contract_renewal_date DATE,

    -- Metadata
    notes TEXT,
    tags TEXT[],

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT valid_engagement_type CHECK (engagement_type IN ('assessment', 'implementation', 'managed_services', 'consulting', 'advisory', 'other')),
    CONSTRAINT valid_engagement_status CHECK (status IN ('proposed', 'contracted', 'active', 'on_hold', 'completed', 'cancelled')),
    CONSTRAINT valid_billing_type CHECK (billing_type IN ('fixed', 'retainer', 'milestone', 'hourly', 'value_based'))
);

-- Indexes for engagements
CREATE INDEX IF NOT EXISTS idx_engagements_company_id ON engagements(company_id);
CREATE INDEX IF NOT EXISTS idx_engagements_contact_id ON engagements(contact_id);
CREATE INDEX IF NOT EXISTS idx_engagements_status ON engagements(status);
CREATE INDEX IF NOT EXISTS idx_engagements_type ON engagements(engagement_type);

-- Add engagement_id to invoices
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS engagement_id UUID REFERENCES engagements(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_invoices_engagement_id ON invoices(engagement_id);

-- =============================================================================
-- INVOICE LINE ITEMS
-- Itemized breakdown for professional invoices and tax reporting
-- =============================================================================
CREATE TABLE IF NOT EXISTS invoice_line_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE NOT NULL,

    -- Line item details
    description TEXT NOT NULL,
    quantity NUMERIC(10,2) DEFAULT 1,
    unit_price_cents INTEGER NOT NULL,
    amount_cents INTEGER GENERATED ALWAYS AS (ROUND(quantity * unit_price_cents)::INTEGER) STORED,

    -- Categorization
    service_type TEXT,  -- 'assessment', 'implementation', 'consulting', 'expense_passthrough'

    -- Ordering
    sort_order INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_line_items_invoice_id ON invoice_line_items(invoice_id);

-- =============================================================================
-- TAX QUARTER TRACKING
-- Add computed columns for easy CPA reporting
-- =============================================================================

-- Add tax tracking to invoices (based on paid_date for cash basis accounting)
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS tax_year INTEGER;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS tax_quarter INTEGER;

-- Function to update tax fields on invoices
CREATE OR REPLACE FUNCTION update_invoice_tax_period()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.paid_date IS NOT NULL THEN
        NEW.tax_year := EXTRACT(YEAR FROM NEW.paid_date);
        NEW.tax_quarter := CASE
            WHEN EXTRACT(MONTH FROM NEW.paid_date) <= 3 THEN 1
            WHEN EXTRACT(MONTH FROM NEW.paid_date) <= 6 THEN 2
            WHEN EXTRACT(MONTH FROM NEW.paid_date) <= 9 THEN 3
            ELSE 4
        END;
    ELSE
        NEW.tax_year := NULL;
        NEW.tax_quarter := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_invoice_tax_period ON invoices;
CREATE TRIGGER trigger_invoice_tax_period
    BEFORE INSERT OR UPDATE OF paid_date ON invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_invoice_tax_period();

-- Add tax tracking to expenses (based on expense_date)
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS tax_year INTEGER;
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS tax_quarter INTEGER;

-- Function to update tax fields on expenses
CREATE OR REPLACE FUNCTION update_expense_tax_period()
RETURNS TRIGGER AS $$
BEGIN
    NEW.tax_year := EXTRACT(YEAR FROM NEW.expense_date);
    NEW.tax_quarter := CASE
        WHEN EXTRACT(MONTH FROM NEW.expense_date) <= 3 THEN 1
        WHEN EXTRACT(MONTH FROM NEW.expense_date) <= 6 THEN 2
        WHEN EXTRACT(MONTH FROM NEW.expense_date) <= 9 THEN 3
        ELSE 4
    END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_expense_tax_period ON expenses;
CREATE TRIGGER trigger_expense_tax_period
    BEFORE INSERT OR UPDATE OF expense_date ON expenses
    FOR EACH ROW
    EXECUTE FUNCTION update_expense_tax_period();

-- Indexes for tax reporting
-- Composite index covers single-column queries on tax_year (leftmost column)
CREATE INDEX IF NOT EXISTS idx_invoices_tax_period ON invoices(tax_year, tax_quarter);
CREATE INDEX IF NOT EXISTS idx_expenses_tax_period ON expenses(tax_year, tax_quarter);

-- =============================================================================
-- REFERRAL AND SOURCE TRACKING
-- Track how contacts found you and who referred them
-- =============================================================================

-- Add referral fields to contacts
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS referred_by_contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS referred_by_company_id UUID REFERENCES companies(id) ON DELETE SET NULL;

-- Data source tracking (where did this contact come from?)
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS data_source TEXT;  -- 'website', 'data_broker', 'linkedin', 'conference', 'referral', 'cold_outreach'
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS data_source_detail TEXT;  -- Specific broker name, conference name, etc.
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS first_contact_date DATE;  -- When you first connected

-- Update lead_source constraint to include more options
ALTER TABLE contacts DROP CONSTRAINT IF EXISTS valid_lead_source;
ALTER TABLE contacts ADD CONSTRAINT valid_lead_source CHECK (
    lead_source IS NULL OR lead_source IN (
        'quiz', 'newsletter', 'contact_form', 'blog', 'referral',
        'apollo', 'manual', 'linkedin', 'conference', 'cold_outreach',
        'data_broker', 'website', 'podcast', 'webinar'
    )
);

CREATE INDEX IF NOT EXISTS idx_contacts_referred_by ON contacts(referred_by_contact_id);
CREATE INDEX IF NOT EXISTS idx_contacts_data_source ON contacts(data_source);

-- Update the link_quiz_to_contact function to set data_source
CREATE OR REPLACE FUNCTION link_quiz_to_contact(submission_id UUID)
RETURNS UUID AS $$
DECLARE
    sub RECORD;
    contact_uuid UUID;
BEGIN
    SELECT * INTO sub FROM quiz_submissions WHERE id = submission_id;

    IF sub IS NULL THEN
        RETURN NULL;
    END IF;

    IF sub.user_email IS NOT NULL THEN
        SELECT id INTO contact_uuid FROM contacts WHERE email = sub.user_email;

        IF contact_uuid IS NOT NULL THEN
            UPDATE contacts SET
                quiz_submission_id = submission_id,
                quiz_score = sub.weighted_percentage,
                quiz_band = sub.band,
                data_source = COALESCE(data_source, 'website'),
                first_contact_date = COALESCE(first_contact_date, CURRENT_DATE),
                updated_at = NOW()
            WHERE id = contact_uuid;
        ELSE
            INSERT INTO contacts (
                email,
                lead_source,
                data_source,
                first_contact_date,
                quiz_submission_id,
                quiz_score,
                quiz_band
            ) VALUES (
                sub.user_email,
                'quiz',
                'website',
                CURRENT_DATE,
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
-- CONTACT RELATIONSHIPS
-- Track "Steve knows Brad" type relationships between contacts
--
-- Design note: Relationships are directional (contact_a → contact_b).
-- For symmetric relationships (friend, knows), you can either:
--   1. Store only one direction (query both directions in views)
--   2. Store both directions as separate rows
-- The views below handle querying both directions.
-- =============================================================================
CREATE TABLE IF NOT EXISTS contact_relationships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- The two contacts in the relationship
    contact_a_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
    contact_b_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,

    -- Relationship type
    relationship_type TEXT NOT NULL,  -- 'colleague', 'former_colleague', 'friend', 'knows', 'reports_to', 'manager_of'

    -- Context
    context TEXT,  -- 'Worked together at Microsoft 2015-2018', 'Met at Boise Tech Meetup'

    -- Strength (how well do they know each other?)
    strength TEXT DEFAULT 'acquaintance',  -- 'acquaintance', 'professional', 'close', 'unknown'

    -- Can you ask for intro?
    can_intro BOOLEAN DEFAULT FALSE,
    intro_notes TEXT,  -- 'Brad said he'd be happy to intro me to Steve'

    -- Timestamps
    discovered_at TIMESTAMPTZ DEFAULT NOW(),

    -- Prevent duplicate relationships
    CONSTRAINT unique_relationship UNIQUE (contact_a_id, contact_b_id),
    CONSTRAINT no_self_relationship CHECK (contact_a_id != contact_b_id),
    CONSTRAINT valid_relationship_type CHECK (relationship_type IN (
        'colleague', 'former_colleague', 'friend', 'knows', 'acquaintance',
        'reports_to', 'manager_of', 'business_partner', 'investor', 'advisor', 'mentor'
    )),
    CONSTRAINT valid_strength CHECK (strength IN ('acquaintance', 'professional', 'close', 'unknown'))
);

CREATE INDEX IF NOT EXISTS idx_relationships_contact_a ON contact_relationships(contact_a_id);
CREATE INDEX IF NOT EXISTS idx_relationships_contact_b ON contact_relationships(contact_b_id);
CREATE INDEX IF NOT EXISTS idx_relationships_type ON contact_relationships(relationship_type);
CREATE INDEX IF NOT EXISTS idx_relationships_can_intro ON contact_relationships(can_intro) WHERE can_intro = TRUE;

-- =============================================================================
-- WORK HISTORY
-- Track where contacts have worked (for "used to work with John at Microsoft")
-- =============================================================================
CREATE TABLE IF NOT EXISTS contact_work_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,

    -- Company info (may or may not be in our companies table)
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    company_name TEXT NOT NULL,  -- Store name even if not in companies table

    -- Role
    job_title TEXT,
    department TEXT,

    -- Timeline
    start_date DATE,
    end_date DATE,  -- NULL if current
    is_current BOOLEAN DEFAULT FALSE,

    -- Notes
    notes TEXT,  -- 'This is where they built their AI team'

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_work_history_contact ON contact_work_history(contact_id);
CREATE INDEX IF NOT EXISTS idx_work_history_company ON contact_work_history(company_id);
CREATE INDEX IF NOT EXISTS idx_work_history_company_name ON contact_work_history(company_name);
CREATE INDEX IF NOT EXISTS idx_work_history_current ON contact_work_history(is_current) WHERE is_current = TRUE;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_work_history ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "Service role full access" ON engagements
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON invoice_line_items
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON contact_relationships
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON contact_work_history
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =============================================================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================================================

DROP TRIGGER IF EXISTS trigger_engagements_updated_at ON engagements;
CREATE TRIGGER trigger_engagements_updated_at
    BEFORE UPDATE ON engagements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- USEFUL VIEWS
-- =============================================================================

-- View: Active engagements with financials
CREATE OR REPLACE VIEW active_engagements AS
SELECT
    e.*,
    e.total_value_cents / 100.0 as total_value_dollars,
    e.recurring_amount_cents / 100.0 as recurring_amount_dollars,
    c.full_name as contact_name,
    c.email as contact_email,
    co.name as company_name,
    COALESCE(SUM(inv.amount_cents) FILTER (WHERE inv.status = 'paid'), 0) / 100.0 as collected_dollars,
    COALESCE(SUM(inv.amount_cents) FILTER (WHERE inv.status IN ('sent', 'overdue')), 0) / 100.0 as outstanding_dollars
FROM engagements e
LEFT JOIN contacts c ON e.contact_id = c.id
LEFT JOIN companies co ON e.company_id = co.id
LEFT JOIN invoices inv ON inv.engagement_id = e.id
WHERE e.status IN ('contracted', 'active')
GROUP BY e.id, c.id, co.id
ORDER BY e.start_date DESC;

-- View: Quarterly revenue (for estimated taxes)
CREATE OR REPLACE VIEW quarterly_revenue AS
SELECT
    tax_year,
    tax_quarter,
    COUNT(*) as invoice_count,
    SUM(amount_cents) / 100.0 as total_revenue
FROM invoices
WHERE status = 'paid'
  AND tax_year IS NOT NULL
GROUP BY tax_year, tax_quarter
ORDER BY tax_year DESC, tax_quarter DESC;

-- View: Quarterly expenses (for estimated taxes)
CREATE OR REPLACE VIEW quarterly_expenses AS
SELECT
    tax_year,
    tax_quarter,
    category,
    COUNT(*) as expense_count,
    SUM(amount_cents) / 100.0 as total_expenses,
    SUM(CASE WHEN tax_deductible THEN amount_cents ELSE 0 END) / 100.0 as deductible_expenses
FROM expenses
WHERE tax_year IS NOT NULL
GROUP BY tax_year, tax_quarter, category
ORDER BY tax_year DESC, tax_quarter DESC, category;

-- View: Contact network (who knows who)
-- Shows relationships in both directions for easier querying
CREATE OR REPLACE VIEW contact_network AS
SELECT
    r.id as relationship_id,
    ca.id as contact_a_id,
    ca.full_name as contact_a_name,
    ca.company_domain as contact_a_company,
    cb.id as contact_b_id,
    cb.full_name as contact_b_name,
    cb.company_domain as contact_b_company,
    r.relationship_type,
    r.context,
    r.strength,
    r.can_intro,
    r.discovered_at
FROM contact_relationships r
JOIN contacts ca ON r.contact_a_id = ca.id
JOIN contacts cb ON r.contact_b_id = cb.id

UNION ALL

-- Reverse direction for symmetric relationship types
SELECT
    r.id as relationship_id,
    cb.id as contact_a_id,
    cb.full_name as contact_a_name,
    cb.company_domain as contact_a_company,
    ca.id as contact_b_id,
    ca.full_name as contact_b_name,
    ca.company_domain as contact_b_company,
    r.relationship_type,
    r.context,
    r.strength,
    r.can_intro,
    r.discovered_at
FROM contact_relationships r
JOIN contacts ca ON r.contact_a_id = ca.id
JOIN contacts cb ON r.contact_b_id = cb.id
WHERE r.relationship_type IN ('colleague', 'former_colleague', 'friend', 'knows', 'acquaintance', 'business_partner')

ORDER BY discovered_at DESC;

-- View: Potential introductions (relationships where intro is possible)
-- Checks both directions since the connector could be either contact
CREATE OR REPLACE VIEW potential_intros AS
SELECT DISTINCT ON (target_id, connector_id)
    connector_id,
    connector_name,
    connector_email,
    target_id,
    target_name,
    target_company,
    target_status,
    relationship_type,
    context,
    intro_notes
FROM (
    -- contact_a is the connector, contact_b is the target
    SELECT
        ca.id as connector_id,
        ca.full_name as connector_name,
        ca.email as connector_email,
        cb.id as target_id,
        cb.full_name as target_name,
        cb.company_domain as target_company,
        cb.lead_status as target_status,
        r.relationship_type,
        r.context,
        r.intro_notes
    FROM contact_relationships r
    JOIN contacts ca ON r.contact_a_id = ca.id
    JOIN contacts cb ON r.contact_b_id = cb.id
    WHERE r.can_intro = TRUE
      AND cb.lead_status IN ('new', 'contacted', 'qualified')
      AND ca.lead_status = 'client'  -- Connector should be someone you know well (client)

    UNION ALL

    -- contact_b is the connector, contact_a is the target (for symmetric relationships)
    SELECT
        cb.id as connector_id,
        cb.full_name as connector_name,
        cb.email as connector_email,
        ca.id as target_id,
        ca.full_name as target_name,
        ca.company_domain as target_company,
        ca.lead_status as target_status,
        r.relationship_type,
        r.context,
        r.intro_notes
    FROM contact_relationships r
    JOIN contacts ca ON r.contact_a_id = ca.id
    JOIN contacts cb ON r.contact_b_id = cb.id
    WHERE r.can_intro = TRUE
      AND ca.lead_status IN ('new', 'contacted', 'qualified')
      AND cb.lead_status = 'client'
      AND r.relationship_type IN ('colleague', 'former_colleague', 'friend', 'knows', 'acquaintance', 'business_partner')
) subq
ORDER BY target_id, connector_id, target_status;

-- View: Referral sources performance
CREATE OR REPLACE VIEW referral_performance AS
SELECT
    COALESCE(rc.full_name, c.data_source, 'Unknown') as referral_source,
    COUNT(*) as total_contacts,
    COUNT(*) FILTER (WHERE c.lead_status = 'client') as converted_to_client,
    ROUND(100.0 * COUNT(*) FILTER (WHERE c.lead_status = 'client') / NULLIF(COUNT(*), 0), 1) as conversion_rate
FROM contacts c
LEFT JOIN contacts rc ON c.referred_by_contact_id = rc.id
WHERE c.lead_source = 'referral' OR c.referred_by_contact_id IS NOT NULL
GROUP BY COALESCE(rc.full_name, c.data_source, 'Unknown')
ORDER BY converted_to_client DESC;
