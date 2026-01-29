-- Quiz Submissions Table
-- Stores all AI readiness quiz results for analysis and follow-up

CREATE TABLE IF NOT EXISTS quiz_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Company info (for grouping multiple submissions)
  company_name TEXT,
  company_domain TEXT,  -- Auto-extracted from email

  -- User info
  user_email TEXT,
  user_role TEXT NOT NULL CHECK (user_role IN ('business', 'technical')),

  -- Quiz answers (raw data)
  answers JSONB NOT NULL,  -- { "people-1": 3, "data-1": 2, ... }

  -- Calculated scores
  dimension_scores JSONB NOT NULL,  -- Full breakdown by dimension
  overall_score INTEGER NOT NULL,
  weighted_percentage NUMERIC(5,2) NOT NULL,

  -- Result classification
  band TEXT NOT NULL,  -- 'not-ready', 'high-complexity', etc.
  band_name TEXT NOT NULL,  -- 'Critical Gaps Detected', etc.
  veto_triggered BOOLEAN DEFAULT FALSE,
  veto_dimension TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Indexes for common queries
  CONSTRAINT valid_band CHECK (band IN ('not-ready', 'high-complexity', 'crossroads', 'foundation-ready', 'path-b-aligned'))
);

-- Index for company-level analysis
CREATE INDEX IF NOT EXISTS idx_quiz_company_domain ON quiz_submissions(company_domain);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_quiz_created_at ON quiz_submissions(created_at DESC);

-- Index for band distribution analysis
CREATE INDEX IF NOT EXISTS idx_quiz_band ON quiz_submissions(band);

-- Row Level Security (RLS)
-- Enable RLS on the table
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (submit quiz)
CREATE POLICY "Anyone can submit quiz results"
  ON quiz_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users (admin) can read all submissions
-- For now, we'll use the service_role key in the dashboard to view data
-- No SELECT policy for anon = users can't read others' submissions

-- Useful views for analysis (run these manually in dashboard if needed)

-- View: Company aggregates
-- CREATE VIEW company_quiz_summary AS
-- SELECT
--   company_domain,
--   COUNT(*) as submission_count,
--   AVG(weighted_percentage) as avg_score,
--   array_agg(DISTINCT user_role) as roles_represented,
--   MIN(created_at) as first_submission,
--   MAX(created_at) as latest_submission
-- FROM quiz_submissions
-- WHERE company_domain IS NOT NULL
-- GROUP BY company_domain;
