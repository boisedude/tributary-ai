-- Add rate limiting and stronger validation for quiz submissions

-- 1. Add client fingerprint column for rate limiting
ALTER TABLE quiz_submissions
ADD COLUMN IF NOT EXISTS client_fingerprint TEXT;

-- 2. Create index for rate limiting lookups
CREATE INDEX IF NOT EXISTS idx_quiz_fingerprint_created
ON quiz_submissions(client_fingerprint, created_at DESC);

-- 3. Create rate limiting function
-- Allows max 5 submissions per fingerprint per hour
CREATE OR REPLACE FUNCTION check_quiz_rate_limit(fingerprint TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- If no fingerprint provided, allow (but we'll track other ways)
  IF fingerprint IS NULL OR fingerprint = '' THEN
    RETURN TRUE;
  END IF;

  -- Count submissions from this fingerprint in the last hour
  SELECT COUNT(*) INTO recent_count
  FROM quiz_submissions
  WHERE client_fingerprint = fingerprint
    AND created_at > NOW() - INTERVAL '1 hour';

  -- Allow if under limit
  RETURN recent_count < 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Drop and recreate the insert policy with validation
DROP POLICY IF EXISTS "Anyone can submit quiz results" ON quiz_submissions;

CREATE POLICY "Rate limited quiz submissions"
  ON quiz_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Validate user_role
    user_role IN ('business', 'technical')
    -- Validate score ranges
    AND overall_score >= 0
    AND overall_score <= 72  -- 18 questions * 4 max score
    AND weighted_percentage >= 0
    AND weighted_percentage <= 100
    -- Validate band
    AND band IN ('not-ready', 'high-complexity', 'crossroads', 'foundation-ready', 'path-b-aligned')
    -- Check rate limit
    AND check_quiz_rate_limit(client_fingerprint)
  );

-- 5. Grant execute permission on the function
GRANT EXECUTE ON FUNCTION check_quiz_rate_limit(TEXT) TO anon;
