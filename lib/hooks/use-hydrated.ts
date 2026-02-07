"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect when the component has been hydrated on the client.
 *
 * This is useful for:
 * - Avoiding hydration mismatches when rendering theme-dependent content
 * - Showing different content on server vs client
 * - Delaying animations until after hydration
 *
 * @returns {boolean} true if the component has been mounted/hydrated
 *
 * @example
 * ```tsx
 * const mounted = useHydrated();
 *
 * // Only show theme-dependent UI after hydration
 * {mounted && theme === "dark" ? <DarkIcon /> : <LightIcon />}
 * ```
 */
export function useHydrated(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid cascading renders during hydration
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return mounted;
}
