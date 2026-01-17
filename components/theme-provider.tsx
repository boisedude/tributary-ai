"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

/**
 * Theme provider component wrapping next-themes for dark/light mode support.
 * Must wrap the application at the root level to enable theme switching.
 *
 * @param {ThemeProviderProps} props - Props passed to next-themes provider
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Theme-aware provider component
 *
 * @example
 * // Used in app/layout.tsx
 * <ThemeProvider
 *   attribute="class"
 *   defaultTheme="system"
 *   enableSystem
 *   disableTransitionOnChange
 * >
 *   {children}
 * </ThemeProvider>
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
