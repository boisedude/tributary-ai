/**
 * @fileoverview Web3Forms API utility for form submissions.
 * Centralizes form submission logic to avoid code duplication across components.
 */

import { FORM_CONFIG } from "@/lib/constants";

/**
 * Response structure from Web3Forms API
 */
export interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

/**
 * Base form data structure
 */
export interface Web3FormsData {
  subject: string;
  email: string;
  from_name: string;
  [key: string]: string | number | boolean;
}

/**
 * Error class for Web3Forms submission failures
 */
export class Web3FormsError extends Error {
  constructor(
    message: string,
    public readonly response?: Web3FormsResponse
  ) {
    super(message);
    this.name = "Web3FormsError";
  }
}

/**
 * Submits form data to Web3Forms API.
 *
 * @param {Web3FormsData} data - The form data to submit
 * @returns {Promise<Web3FormsResponse>} The API response
 * @throws {Web3FormsError} If submission fails or API returns error
 *
 * @example
 * ```typescript
 * import { submitToWeb3Forms } from "@/lib/web3forms";
 *
 * const result = await submitToWeb3Forms({
 *   subject: "Contact Form Submission",
 *   email: "user@example.com",
 *   from_name: "Website Contact",
 *   message: "Hello!",
 * });
 * ```
 */
export async function submitToWeb3Forms(
  data: Web3FormsData
): Promise<Web3FormsResponse> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  if (!accessKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Web3Forms access key not configured. Set NEXT_PUBLIC_WEB3FORMS_KEY in your environment."
      );
    }
  }

  const formData = {
    access_key: accessKey || "",
    ...data,
  };

  try {
    const response = await fetch(FORM_CONFIG.WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result: Web3FormsResponse = await response.json();

    if (!result.success) {
      throw new Web3FormsError(
        result.message || "Form submission failed",
        result
      );
    }

    return result;
  } catch (error) {
    if (error instanceof Web3FormsError) {
      throw error;
    }

    if (process.env.NODE_ENV === "development") {
      console.error("Web3Forms submission error:", error);
    }

    throw new Web3FormsError(
      "An error occurred while submitting the form. Please try again."
    );
  }
}
