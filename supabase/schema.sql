-- =============================================================================
-- TRIBUTARY AI - COMPLETE DATABASE SCHEMA
-- =============================================================================
-- This file documents the full schema. Individual migrations are in /migrations/
-- Run migrations in order to build the database.
-- =============================================================================

-- =============================================================================
-- QUIZ SUBMISSIONS (Migration: 20260128000000)
-- =============================================================================
CREATE TABLE IF NOT EXISTS quiz_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT,
  company_domain TEXT,
  user_email TEXT,
  user_role TEXT NOT NULL CHECK (user_role IN ('business', 'technical')),
  answers JSONB NOT NULL,
  dimension_scores JSONB NOT NULL,
  overall_score INTEGER NOT NULL,
  weighted_percentage NUMERIC(5,2) NOT NULL,
  band TEXT NOT NULL,
  band_name TEXT NOT NULL,
  veto_triggered BOOLEAN DEFAULT FALSE,
  veto_dimension TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_band CHECK (band IN ('not-ready', 'high-complexity', 'crossroads', 'foundation-ready', 'path-b-aligned'))
);

-- =============================================================================
-- COMPANIES (Migration: 20260129100000)
-- =============================================================================
CREATE TABLE IF NOT EXISTS companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    domain TEXT UNIQUE,
    industry TEXT,
    employee_count_range TEXT,
    annual_revenue_range TEXT,
    location_city TEXT,
    location_state TEXT,
    location_country TEXT DEFAULT 'USA',
    company_type TEXT DEFAULT 'prospect',
    apollo_id TEXT UNIQUE,
    linkedin_url TEXT,
    website_url TEXT,
    notes TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_company_type CHECK (company_type IN ('prospect', 'client', 'partner', 'vendor', 'other'))
);

-- =============================================================================
-- CONTACTS (Migration: 20260129100000, updated 20260129110000, 20260129200000)
-- =============================================================================
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT GENERATED ALWAYS AS (
        COALESCE(first_name || ' ' || last_name, first_name, last_name, email)
    ) STORED,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    company_domain TEXT,
    job_title TEXT,
    phone TEXT,
    linkedin_url TEXT,
    lead_status TEXT DEFAULT 'new',
    lead_source TEXT,
    last_interaction_at TIMESTAMPTZ,
    interaction_count INTEGER DEFAULT 0,
    -- Referral tracking
    referred_by_contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    referred_by_company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    data_source TEXT,  -- 'website', 'data_broker', 'linkedin', 'conference', 'referral'
    data_source_detail TEXT,  -- Specific broker name, conference, etc.
    first_contact_date DATE,
    -- External IDs
    apollo_id TEXT UNIQUE,
    beehiiv_subscriber_id TEXT UNIQUE,
    -- Email preferences (Migration: 20260129200000)
    newsletter_subscribed BOOLEAN DEFAULT FALSE,
    newsletter_subscribed_at TIMESTAMPTZ,
    sales_contact_allowed BOOLEAN DEFAULT TRUE,
    product_updates_subscribed BOOLEAN DEFAULT FALSE,
    webinar_invites_subscribed BOOLEAN DEFAULT FALSE,
    research_reports_subscribed BOOLEAN DEFAULT FALSE,
    do_not_contact BOOLEAN DEFAULT FALSE,
    preferences_updated_at TIMESTAMPTZ,
    -- Quiz data
    quiz_submission_id UUID REFERENCES quiz_submissions(id) ON DELETE SET NULL,
    quiz_score NUMERIC(5,2),
    quiz_band TEXT,
    notes TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_lead_status CHECK (lead_status IN ('new', 'contacted', 'qualified', 'proposal', 'client', 'lost', 'inactive')),
    CONSTRAINT valid_lead_source CHECK (lead_source IS NULL OR lead_source IN (
        'quiz', 'newsletter', 'contact_form', 'blog', 'referral', 'apollo', 'manual',
        'linkedin', 'conference', 'cold_outreach', 'data_broker', 'website', 'podcast', 'webinar'
    ))
);

-- =============================================================================
-- INTERACTIONS (Migration: 20260129100000)
-- =============================================================================
CREATE TABLE IF NOT EXISTS interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    interaction_type TEXT NOT NULL,
    direction TEXT,
    subject TEXT,
    body TEXT,
    metadata JSONB,
    occurred_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_interaction_type CHECK (interaction_type IN ('email', 'call', 'meeting', 'note', 'form_submission', 'quiz', 'proposal', 'contract', 'invoice')),
    CONSTRAINT valid_direction CHECK (direction IS NULL OR direction IN ('inbound', 'outbound'))
);

-- =============================================================================
-- INVOICES (Migration: 20260129100000, updated 20260129110000)
-- =============================================================================
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_number TEXT UNIQUE NOT NULL,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    engagement_id UUID REFERENCES engagements(id) ON DELETE SET NULL,  -- Links to project
    description TEXT NOT NULL,
    service_type TEXT,
    amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'draft',
    issue_date DATE,
    due_date DATE,
    paid_date DATE,
    payment_method TEXT,
    payment_reference TEXT,
    tax_year INTEGER,  -- Auto-computed from paid_date
    tax_quarter INTEGER,  -- Auto-computed from paid_date
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_status CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled', 'void')),
    CONSTRAINT valid_service_type CHECK (service_type IS NULL OR service_type IN ('assessment', 'implementation', 'managed_services', 'consulting', 'other')),
    CONSTRAINT positive_amount CHECK (amount_cents > 0)
);

-- =============================================================================
-- EXPENSES (Migration: 20260129100000)
-- =============================================================================
CREATE TABLE IF NOT EXISTS expenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    description TEXT NOT NULL,
    category TEXT,
    vendor TEXT,
    amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    expense_date DATE NOT NULL,
    tax_deductible BOOLEAN DEFAULT TRUE,
    receipt_url TEXT,
    notes TEXT,
    tax_year INTEGER,  -- Auto-computed from expense_date
    tax_quarter INTEGER,  -- Auto-computed from expense_date
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_category CHECK (category IS NULL OR category IN ('software', 'travel', 'office', 'marketing', 'professional_services', 'equipment', 'other')),
    CONSTRAINT positive_expense CHECK (amount_cents > 0)
);

-- =============================================================================
-- ENGAGEMENTS (Migration: 20260129110000)
-- Links projects/work to invoices and tracks project status
-- =============================================================================
CREATE TABLE IF NOT EXISTS engagements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    engagement_type TEXT NOT NULL,  -- 'assessment', 'implementation', 'managed_services'
    status TEXT DEFAULT 'proposed',  -- 'proposed', 'contracted', 'active', 'completed', 'cancelled'
    sow_signed_date DATE,
    sow_document_url TEXT,
    total_value_cents INTEGER,
    billing_type TEXT DEFAULT 'fixed',  -- 'fixed', 'retainer', 'milestone', 'hourly'
    start_date DATE,
    target_end_date DATE,
    actual_end_date DATE,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_amount_cents INTEGER,
    recurring_frequency TEXT,
    contract_renewal_date DATE,
    notes TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INVOICE LINE ITEMS (Migration: 20260129110000)
-- =============================================================================
CREATE TABLE IF NOT EXISTS invoice_line_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE NOT NULL,
    description TEXT NOT NULL,
    quantity NUMERIC(10,2) DEFAULT 1,
    unit_price_cents INTEGER NOT NULL,
    amount_cents INTEGER,  -- Auto-computed: quantity * unit_price_cents
    service_type TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- CONTACT RELATIONSHIPS (Migration: 20260129110000)
-- Track "Steve knows Brad" type relationships
-- =============================================================================
CREATE TABLE IF NOT EXISTS contact_relationships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_a_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
    contact_b_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
    relationship_type TEXT NOT NULL,  -- 'colleague', 'former_colleague', 'friend', 'knows'
    context TEXT,  -- 'Worked together at Microsoft 2015-2018'
    strength TEXT DEFAULT 'acquaintance',  -- 'acquaintance', 'professional', 'close'
    can_intro BOOLEAN DEFAULT FALSE,
    intro_notes TEXT,
    discovered_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- CONTACT WORK HISTORY (Migration: 20260129110000)
-- Track where contacts have worked
-- =============================================================================
CREATE TABLE IF NOT EXISTS contact_work_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    company_name TEXT NOT NULL,
    job_title TEXT,
    department TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- PREFERENCE TOKENS (Migration: 20260129200000)
-- Token-based access to preference center (GDPR/CAN-SPAM compliant)
-- =============================================================================
CREATE TABLE IF NOT EXISTS preference_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- PREFERENCE CHANGES (Migration: 20260129200000)
-- Audit log for all preference changes (GDPR compliance)
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

-- =============================================================================
-- KEY VIEWS
-- =============================================================================

-- Contacts with company info
-- SELECT * FROM contacts_with_company;

-- Outstanding invoices with days overdue
-- SELECT * FROM outstanding_invoices;

-- Revenue by company
-- SELECT * FROM revenue_by_company;

-- New quiz leads not yet contacted
-- SELECT * FROM new_quiz_leads;

-- Active engagements with collected/outstanding amounts
-- SELECT * FROM active_engagements;

-- Quarterly revenue for tax estimates
-- SELECT * FROM quarterly_revenue;

-- Quarterly expenses by category
-- SELECT * FROM quarterly_expenses;

-- Contact network (who knows who)
-- SELECT * FROM contact_network;

-- Potential introductions
-- SELECT * FROM potential_intros;

-- Referral source performance
-- SELECT * FROM referral_performance;

-- =============================================================================
-- USEFUL QUERIES (Run via Claude Code)
-- =============================================================================

-- All clients with total revenue:
-- SELECT * FROM revenue_by_company;

-- Outstanding invoices:
-- SELECT invoice_number, company_name, amount_dollars, days_overdue
-- FROM outstanding_invoices ORDER BY days_overdue DESC;

-- New leads from quiz:
-- SELECT full_name, email, quiz_score, quiz_band, created_at
-- FROM new_quiz_leads;

-- Create a new engagement:
-- INSERT INTO engagements (company_id, contact_id, name, engagement_type, status, total_value_cents, start_date)
-- VALUES ('<company-uuid>', '<contact-uuid>', 'The Assessment - Acme Corp', 'assessment', 'contracted', 2500000, CURRENT_DATE);

-- Create a new invoice:
-- INSERT INTO invoices (invoice_number, company_id, contact_id, engagement_id, description, service_type, amount_cents, status, issue_date, due_date)
-- VALUES (generate_invoice_number(), '<company-uuid>', '<contact-uuid>', '<engagement-uuid>', 'The Assessment - Q1 2026', 'assessment', 2500000, 'draft', CURRENT_DATE, CURRENT_DATE + 30);

-- Quarterly tax summary:
-- SELECT * FROM quarterly_revenue WHERE tax_year = 2026;
-- SELECT tax_quarter, SUM(total_expenses) as expenses FROM quarterly_expenses WHERE tax_year = 2026 GROUP BY tax_quarter;

-- Find who can intro me to a target company:
-- SELECT * FROM potential_intros WHERE target_company LIKE '%acme%';

-- Track a referral:
-- UPDATE contacts SET referred_by_contact_id = '<referrer-uuid>', lead_source = 'referral' WHERE id = '<contact-uuid>';

-- Add a relationship:
-- INSERT INTO contact_relationships (contact_a_id, contact_b_id, relationship_type, context, can_intro)
-- VALUES ('<steve-uuid>', '<brad-uuid>', 'former_colleague', 'Worked together at Microsoft 2015-2018', true);

-- Add work history:
-- INSERT INTO contact_work_history (contact_id, company_name, job_title, start_date, end_date)
-- VALUES ('<contact-uuid>', 'Microsoft', 'Senior PM', '2015-01-01', '2018-06-01');
