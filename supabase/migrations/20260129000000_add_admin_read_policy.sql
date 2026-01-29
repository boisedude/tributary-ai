-- Add read policy for admin dashboard
-- This allows the anon key to read submissions for the admin dashboard
-- The admin page itself is password-protected client-side

-- Enable read access for quiz submissions
CREATE POLICY "Allow read access for admin"
ON quiz_submissions
FOR SELECT
USING (true);

-- Note: This policy allows reading all submissions.
-- The admin dashboard is protected by a password check on the client side.
-- For production, consider using Supabase Auth with admin roles.
