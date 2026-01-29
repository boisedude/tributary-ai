/**
 * @fileoverview Newsletter subscription utilities.
 * Handles newsletter signups with automatic contact creation/update
 * and preference token generation for managing subscriptions.
 *
 * Works client-side using Supabase anon key with RLS policies.
 */

import { supabase, extractDomain } from "@/lib/supabase";
import { generatePreferenceToken } from "@/lib/preferences";

// =============================================================================
// TYPES
// =============================================================================

export interface NewsletterSignupResult {
  success: boolean;
  isNew: boolean;
  error?: string;
}

// =============================================================================
// NEWSLETTER FUNCTIONS
// =============================================================================

/**
 * Subscribe an email to the newsletter.
 * Creates a new contact if one doesn't exist, or updates existing contact.
 * Generates a preference token for managing subscription.
 */
export async function subscribeToNewsletter(email: string): Promise<NewsletterSignupResult> {
  const normalizedEmail = email.toLowerCase().trim();

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return { success: false, isNew: false, error: "Invalid email address" };
  }

  try {
    // Check if contact already exists
    const { data: existingContact, error: lookupError } = await supabase
      .from("contacts")
      .select("id, newsletter_subscribed")
      .eq("email", normalizedEmail)
      .single();

    let contactId: string;
    let isNew = false;

    if (existingContact) {
      // Update existing contact
      contactId = existingContact.id;

      // Only update if not already subscribed
      if (!existingContact.newsletter_subscribed) {
        const { error: updateError } = await supabase
          .from("contacts")
          .update({
            newsletter_subscribed: true,
            newsletter_subscribed_at: new Date().toISOString(),
            preferences_updated_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", contactId);

        if (updateError) {
          console.error("Error updating contact:", updateError);
          return { success: false, isNew: false, error: "Failed to update subscription" };
        }

        // Log the change
        await supabase
          .from("preference_changes")
          .insert({
            contact_id: contactId,
            changed_field: "newsletter_subscribed",
            old_value: false,
            new_value: true,
            change_method: "api",
          });
      }
    } else if (!lookupError || lookupError.code === "PGRST116") {
      // PGRST116 = no rows returned, which is expected for new contacts
      // Create new contact
      isNew = true;
      const companyDomain = extractDomain(normalizedEmail);

      const { data: newContact, error: insertError } = await supabase
        .from("contacts")
        .insert({
          email: normalizedEmail,
          company_domain: companyDomain,
          newsletter_subscribed: true,
          newsletter_subscribed_at: new Date().toISOString(),
          lead_source: "newsletter",
          lead_status: "new",
          first_contact_date: new Date().toISOString().split("T")[0],
          preferences_updated_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (insertError || !newContact) {
        console.error("Error creating contact:", insertError);
        return { success: false, isNew: false, error: "Failed to create subscription" };
      }

      contactId = newContact.id;

      // Log the subscription as a change
      await supabase
        .from("preference_changes")
        .insert({
          contact_id: contactId,
          changed_field: "newsletter_subscribed",
          old_value: null,
          new_value: true,
          change_method: "api",
        });
    } else {
      console.error("Error looking up contact:", lookupError);
      return { success: false, isNew: false, error: "Failed to check subscription" };
    }

    // Generate preference token for managing subscription
    // This would typically be used in a welcome email
    await generatePreferenceToken(contactId);

    return { success: true, isNew };
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return { success: false, isNew: false, error: "An unexpected error occurred" };
  }
}

/**
 * Check if an email is already subscribed to the newsletter.
 */
export async function isSubscribed(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();

  const { data, error } = await supabase
    .from("contacts")
    .select("newsletter_subscribed")
    .eq("email", normalizedEmail)
    .single();

  if (error || !data) {
    return false;
  }

  return data.newsletter_subscribed === true;
}
