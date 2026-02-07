import { describe, it, expect } from 'vitest'

// Standalone extractDomain function for testing
// Will be moved to lib/supabase/utils.ts in Phase 4
function extractDomain(email: string): string | null {
  const match = email.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
  return match ? match[1].toLowerCase() : null
}

describe('extractDomain', () => {
  it('extracts domain from valid email', () => {
    expect(extractDomain('user@example.com')).toBe('example.com')
    expect(extractDomain('user@company.co.uk')).toBe('company.co.uk')
    expect(extractDomain('user@sub.domain.org')).toBe('sub.domain.org')
  })

  it('returns lowercase domain', () => {
    expect(extractDomain('user@EXAMPLE.COM')).toBe('example.com')
    expect(extractDomain('user@Company.Co.Uk')).toBe('company.co.uk')
  })

  it('returns null for invalid emails', () => {
    expect(extractDomain('notanemail')).toBeNull()
    expect(extractDomain('@nodomain')).toBeNull()
    expect(extractDomain('user@')).toBeNull()
    expect(extractDomain('')).toBeNull()
  })

  it('handles emails with plus signs and dots', () => {
    expect(extractDomain('user+tag@example.com')).toBe('example.com')
    expect(extractDomain('first.last@example.com')).toBe('example.com')
  })
})

// Improved email validation function (to be added in Phase 7)
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,63}$/
  return emailRegex.test(email)
}

describe('isValidEmail', () => {
  it('validates common email formats', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
    expect(isValidEmail('first.last@company.co.uk')).toBe(true)
    expect(isValidEmail('user+tag@domain.org')).toBe(true)
    expect(isValidEmail('name123@test.io')).toBe(true)
  })

  it('rejects emails without TLD', () => {
    expect(isValidEmail('user@localhost')).toBe(false)
    expect(isValidEmail('user@domain')).toBe(false)
  })

  it('rejects emails with invalid characters', () => {
    expect(isValidEmail('user space@domain.com')).toBe(false)
    expect(isValidEmail('user<script>@domain.com')).toBe(false)
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail('notanemail')).toBe(false)
  })

  it('rejects malformed emails', () => {
    expect(isValidEmail('@domain.com')).toBe(false)
    expect(isValidEmail('user@')).toBe(false)
    expect(isValidEmail('user@@domain.com')).toBe(false)
  })
})
