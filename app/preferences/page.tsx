"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PREFERENCE_CATEGORIES, COMPANY, ROUTES } from "@/lib/constants";
import { Loader2, CheckCircle2, AlertCircle, Mail, Shield } from "lucide-react";
import Link from "next/link";
import {
  getPreferencesByToken,
  updatePreferences,
  requestPreferenceLink,
  type ContactPreferences,
  type PreferenceUpdate,
} from "@/lib/preferences";

type PageState = "loading" | "email-lookup" | "email-sent" | "preferences" | "error" | "saved";

interface Preferences {
  newsletter_subscribed: boolean;
  sales_contact_allowed: boolean;
  product_updates_subscribed: boolean;
  webinar_invites_subscribed: boolean;
  research_reports_subscribed: boolean;
  do_not_contact: boolean;
}

function PreferencesContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [pageState, setPageState] = useState<PageState>("loading");
  const [email, setEmail] = useState("");
  const [contactData, setContactData] = useState<ContactPreferences | null>(null);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [currentToken, setCurrentToken] = useState<string | null>(null);

  // Load preferences when token is present
  const loadPreferences = useCallback(async (accessToken: string) => {
    try {
      const result = await getPreferencesByToken(accessToken);

      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to load preferences");
      }

      setContactData(result.data);
      setPreferences({
        newsletter_subscribed: result.data.newsletter_subscribed,
        sales_contact_allowed: result.data.sales_contact_allowed,
        product_updates_subscribed: result.data.product_updates_subscribed,
        webinar_invites_subscribed: result.data.webinar_invites_subscribed,
        research_reports_subscribed: result.data.research_reports_subscribed,
        do_not_contact: result.data.do_not_contact,
      });
      setCurrentToken(accessToken);
      setPageState("preferences");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load preferences");
      setPageState("error");
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadPreferences(token);
    } else {
      setPageState("email-lookup");
    }
  }, [token, loadPreferences]);

  // Handle email lookup form submission
  const handleEmailLookup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setPageState("loading");
    setError("");

    try {
      const result = await requestPreferenceLink(email.trim());

      if (!result.success) {
        throw new Error("Failed to send verification email");
      }

      setPageState("email-sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPageState("email-lookup");
    }
  };

  // Handle preference toggle
  const handlePreferenceChange = (field: keyof Preferences, value: boolean) => {
    if (!preferences) return;

    // If enabling do_not_contact, disable everything else
    if (field === "do_not_contact" && value) {
      setPreferences({
        newsletter_subscribed: false,
        sales_contact_allowed: false,
        product_updates_subscribed: false,
        webinar_invites_subscribed: false,
        research_reports_subscribed: false,
        do_not_contact: true,
      });
    } else {
      setPreferences({
        ...preferences,
        [field]: value,
        // If turning on any preference, disable do_not_contact
        do_not_contact: field !== "do_not_contact" && value ? false : preferences.do_not_contact,
      });
    }
  };

  // Save preferences
  const handleSavePreferences = async () => {
    if (!preferences || !currentToken) return;

    setIsSaving(true);
    setError("");

    try {
      const updates: PreferenceUpdate = {
        newsletter_subscribed: preferences.newsletter_subscribed,
        sales_contact_allowed: preferences.sales_contact_allowed,
        product_updates_subscribed: preferences.product_updates_subscribed,
        webinar_invites_subscribed: preferences.webinar_invites_subscribed,
        research_reports_subscribed: preferences.research_reports_subscribed,
        do_not_contact: preferences.do_not_contact,
      };

      const result = await updatePreferences(currentToken, updates);

      if (!result.success) {
        throw new Error(result.error || "Failed to save preferences");
      }

      setPageState("saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save preferences");
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (pageState === "loading") {
    return (
      <div className="bg-gradient-subtle min-h-[60vh]">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-lg text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">Loading preferences...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Email lookup state (no token)
  if (pageState === "email-lookup") {
    return (
      <div className="bg-gradient-subtle min-h-[60vh]">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-lg">
              <h1 className="text-3xl font-bold sm:text-4xl text-center">Manage Email Preferences</h1>
              <p className="mt-4 text-muted-foreground text-center">
                Enter your email address and we&apos;ll send you a link to manage your communication preferences.
              </p>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Verification
                  </CardTitle>
                  <CardDescription>
                    We&apos;ll send a secure link to your email address.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailLookup} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {error && (
                      <div className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                      </div>
                    )}
                    <Button type="submit" className="w-full">
                      Send Verification Link
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href={ROUTES.CONTACT} className="text-accent hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Email sent state
  if (pageState === "email-sent") {
    return (
      <div className="bg-gradient-subtle min-h-[60vh]">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-lg text-center">
              <CheckCircle2 className="h-12 w-12 mx-auto text-green-600 dark:text-green-400" />
              <h1 className="mt-6 text-3xl font-bold">Check Your Email</h1>
              <p className="mt-4 text-muted-foreground">
                If <strong>{email}</strong> is in our system, you&apos;ll receive an email with a link to manage your preferences.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                The link will expire in 48 hours.
              </p>

              <Button
                variant="outline"
                className="mt-8"
                onClick={() => {
                  setEmail("");
                  setPageState("email-lookup");
                }}
              >
                Try a different email
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (pageState === "error") {
    return (
      <div className="bg-gradient-subtle min-h-[60vh]">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-lg text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
              <h1 className="mt-6 text-3xl font-bold">Unable to Load Preferences</h1>
              <p className="mt-4 text-muted-foreground">{error}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setPageState("email-lookup")}
                >
                  Request New Link
                </Button>
                <Button asChild>
                  <Link href={ROUTES.CONTACT}>Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Saved state
  if (pageState === "saved") {
    return (
      <div className="bg-gradient-subtle min-h-[60vh]">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-lg text-center">
              <CheckCircle2 className="h-12 w-12 mx-auto text-green-600 dark:text-green-400" />
              <h1 className="mt-6 text-3xl font-bold">Preferences Saved</h1>
              <p className="mt-4 text-muted-foreground">
                Your email preferences have been updated. These changes take effect immediately.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setPageState("preferences")}
                >
                  Edit Preferences
                </Button>
                <Button asChild>
                  <Link href={ROUTES.HOME}>Return to Homepage</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Preferences editing state
  return (
    <div className="bg-gradient-subtle min-h-[60vh]">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold sm:text-4xl">Email Preferences</h1>
            {contactData && (
              <p className="mt-2 text-muted-foreground">
                Managing preferences for <strong>{contactData.email}</strong>
                {contactData.first_name && ` (${contactData.first_name})`}
              </p>
            )}

            {/* Master opt-out card */}
            <Card className="mt-8 border-destructive/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-destructive" />
                      <h3 className="font-semibold">Do Not Contact</h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Opt out of all communications from {COMPANY.NAME}. This overrides all other preferences.
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={preferences?.do_not_contact ?? false}
                      onChange={(e) => handlePreferenceChange("do_not_contact", e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:shadow after:transition-all peer-checked:bg-destructive peer-checked:after:translate-x-full peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"></div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Individual preference toggles */}
            <Card className={`mt-6 ${preferences?.do_not_contact ? "opacity-50" : ""}`}>
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
                <CardDescription>
                  Choose what types of emails you&apos;d like to receive.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(PREFERENCE_CATEGORIES).map(([key, category]) => (
                    <div key={key} className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium">{category.label}</h4>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={preferences?.[key as keyof Preferences] ?? category.default}
                          onChange={(e) => handlePreferenceChange(key as keyof Preferences, e.target.checked)}
                          disabled={preferences?.do_not_contact}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:shadow after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save button and error */}
            <div className="mt-8">
              {error && (
                <div className="mb-4 flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleSavePreferences}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Preferences"
                  )}
                </Button>
                <Button variant="outline" asChild>
                  <Link href={ROUTES.HOME}>Cancel</Link>
                </Button>
              </div>
            </div>

            {/* Privacy note */}
            <p className="mt-8 text-sm text-muted-foreground">
              Your preferences are protected. See our{" "}
              <Link href={ROUTES.PRIVACY} className="text-accent hover:underline">
                Privacy Policy
              </Link>{" "}
              for details on how we handle your data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PreferencesPage() {
  return (
    <Suspense fallback={
      <div className="bg-gradient-subtle min-h-[60vh]">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-lg text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">Loading...</p>
            </div>
          </div>
        </section>
      </div>
    }>
      <PreferencesContent />
    </Suspense>
  );
}
