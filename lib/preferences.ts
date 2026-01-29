/**
 * @fileoverview Preference center utilities for managing email preferences.
 * Handles token validation, preference updates, and audit logging.
 * GDPR/CAN-SPAM compliant with immediate opt-out processing.
 *
 * Works client-side using Supabase anon key with RLS policies.
 */

import { supabase } from "@/lib/supabase";
import { PREFERENCE_CATEGORIES, PREFERENCE_TOKEN_EXPIRY_HOURS } from "@/lib/constants";

// =============================================================================
// TYPES
// =============================================================================

export interface ContactPreferences {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  newsletter_subscribed: boolean;
  sales_contact_allowed: boolean;
  product_updates_subscribed: boolean;
  webinar_invites_subscribed: boolean;
  research_reports_subscribed: boolean;
  do_not_contact: boolean;
  preferences_updated_at: string | null;
}

export interface PreferenceUpdate {
  newsletter_subscribed?: boolean;
  sales_contact_allowed?: boolean;
  product_updates_subscribed?: boolean;
  webinar_invites_subscribed?: boolean;
  research_reports_subscribed?: boolean;
  do_not_contact?: boolean;
}

export interface PreferenceChangeLog {
  field: string;
  oldValue: boolean | null;
  newValue: boolean;
}

export type ChangeMethod = "token_link" | "email_lookup" | "admin" | "api";

// =============================================================================
// TOKEN FUNCTIONS
// =============================================================================

/**
 * Generate a secure preference management token for a contact.
 * Tokens are valid for PREFERENCE_TOKEN_EXPIRY_HOURS (default 48 hours).
 */
export async function generatePreferenceToken(contactId: string): Promise<string | null> {
  // Generate a secure token
  const tokenBytes = new Uint8Array(24);
  crypto.getRandomValues(tokenBytes);
  const token = btoa(String.fromCharCode(...tokenBytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + PREFERENCE_TOKEN_EXPIRY_HOURS);

  const { error } = await supabase
    .from("preference_tokens")
    .insert({
      contact_id: contactId,
      token,
      expires_at: expiresAt.toISOString(),
    });

  if (error) {
    console.error("Error generating preference token:", error);
    return null;
  }

  return token;
}

/**
 * Validate a preference token and return the associated contact ID.
 */
export async function validateToken(token: string): Promise<{
  valid: boolean;
  contactId?: string;
  error?: string;
}> {
  // Find the token
  const { data: tokenData, error: tokenError } = await supabase
    .from("preference_tokens")
    .select("id, contact_id, expires_at, used_at")
    .eq("token", token)
    .single();

  if (tokenError || !tokenData) {
    return { valid: false, error: "Invalid or expired token" };
  }

  // Check if expired
  if (new Date(tokenData.expires_at) < new Date()) {
    return { valid: false, error: "Token has expired" };
  }

  // Mark token as used (but don't invalidate - allow multiple uses within expiry)
  if (!tokenData.used_at) {
    await supabase
      .from("preference_tokens")
      .update({ used_at: new Date().toISOString() })
      .eq("id", tokenData.id);
  }

  return { valid: true, contactId: tokenData.contact_id };
}

// =============================================================================
// PREFERENCE FUNCTIONS
// =============================================================================

/**
 * Get current preferences for a contact by token.
 */
export async function getPreferencesByToken(token: string): Promise<{
  success: boolean;
  data?: ContactPreferences;
  error?: string;
}> {
  // Validate token first
  const validation = await validateToken(token);
  if (!validation.valid || !validation.contactId) {
    return { success: false, error: validation.error || "Invalid token" };
  }

  // Fetch contact preferences
  const { data, error } = await supabase
    .from("contacts")
    .select(`
      id,
      email,
      first_name,
      last_name,
      newsletter_subscribed,
      sales_contact_allowed,
      product_updates_subscribed,
      webinar_invites_subscribed,
      research_reports_subscribed,
      do_not_contact,
      preferences_updated_at
    `)
    .eq("id", validation.contactId)
    .single();

  if (error || !data) {
    console.error("Error fetching contact preferences:", error);
    return { success: false, error: "Contact not found" };
  }

  return { success: true, data: data as ContactPreferences };
}

/**
 * Request a preference management link via email.
 * Returns success even if email doesn't exist (to prevent email enumeration).
 */
export async function requestPreferenceLink(email: string): Promise<{
  success: boolean;
  message: string;
}> {
  const normalizedEmail = email.toLowerCase().trim();

  // Check if contact exists
  const { data: contact } = await supabase
    .from("contacts")
    .select("id, email")
    .eq("email", normalizedEmail)
    .single();

  // Always return success to prevent email enumeration
  const message = "If this email is in our system, you will receive a link to manage your preferences.";

  if (!contact) {
    return { success: true, message };
  }

  // Generate token
  const token = await generatePreferenceToken(contact.id);
  if (!token) {
    return { success: true, message };
  }

  // Store the token request - email would be sent via a separate process
  // For now, log it (in production, integrate with email service)
  console.log(`Preference link generated for ${normalizedEmail}: token=${token}`);

  return { success: true, message };
}

/**
 * Update preferences for a contact with audit logging.
 * GDPR compliant: logs all changes with timestamp and method.
 * CAN-SPAM compliant: opt-outs take effect immediately.
 */
export async function updatePreferences(
  token: string,
  updates: PreferenceUpdate,
  method: ChangeMethod = "token_link"
): Promise<{
  success: boolean;
  changes: PreferenceChangeLog[];
  error?: string;
}> {
  // Validate token first
  const validation = await validateToken(token);
  if (!validation.valid || !validation.contactId) {
    return { success: false, changes: [], error: validation.error || "Invalid token" };
  }

  const contactId = validation.contactId;

  // Get current preferences for comparison
  const { data: current, error: fetchError } = await supabase
    .from("contacts")
    .select(`
      newsletter_subscribed,
      sales_contact_allowed,
      product_updates_subscribed,
      webinar_invites_subscribed,
      research_reports_subscribed,
      do_not_contact
    `)
    .eq("id", contactId)
    .single();

  if (fetchError || !current) {
    return { success: false, changes: [], error: "Contact not found" };
  }

  // Track changes for audit log
  const changes: PreferenceChangeLog[] = [];
  const preferenceFields = [
    "newsletter_subscribed",
    "sales_contact_allowed",
    "product_updates_subscribed",
    "webinar_invites_subscribed",
    "research_reports_subscribed",
    "do_not_contact",
  ] as const;

  // If do_not_contact is being set to true, set all other preferences to false
  if (updates.do_not_contact === true) {
    updates.newsletter_subscribed = false;
    updates.sales_contact_allowed = false;
    updates.product_updates_subscribed = false;
    updates.webinar_invites_subscribed = false;
    updates.research_reports_subscribed = false;
  }

  // Identify actual changes
  for (const field of preferenceFields) {
    if (updates[field] !== undefined && updates[field] !== current[field]) {
      changes.push({
        field,
        oldValue: current[field],
        newValue: updates[field]!,
      });
    }
  }

  // If no changes, return early
  if (changes.length === 0) {
    return { success: true, changes: [] };
  }

  // Update preferences
  const { error: updateError } = await supabase
    .from("contacts")
    .update({
      ...updates,
      preferences_updated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", contactId);

  if (updateError) {
    console.error("Error updating preferences:", updateError);
    return { success: false, changes: [], error: "Failed to update preferences" };
  }

  // Log all changes to audit table
  const auditRecords = changes.map((change) => ({
    contact_id: contactId,
    changed_field: change.field,
    old_value: change.oldValue,
    new_value: change.newValue,
    change_method: method,
  }));

  const { error: auditError } = await supabase
    .from("preference_changes")
    .insert(auditRecords);

  if (auditError) {
    console.error("Error logging preference changes:", auditError);
    // Don't fail the update if audit logging fails
  }

  return { success: true, changes };
}

/**
 * Get human-readable label for a preference field.
 */
export function getPreferenceLabel(field: string): string {
  const category = PREFERENCE_CATEGORIES[field as keyof typeof PREFERENCE_CATEGORIES];
  return category?.label || field;
}
