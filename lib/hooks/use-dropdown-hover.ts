"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface UseDropdownHoverOptions {
  /**
   * Delay in milliseconds before closing the dropdown after mouse leaves.
   * This prevents accidental closes when moving between elements.
   * @default 150
   */
  closeDelay?: number;
}

interface UseDropdownHoverReturn {
  /** Whether the dropdown is currently open */
  isOpen: boolean;
  /** Function to manually set the open state */
  setIsOpen: (open: boolean) => void;
  /** Handler for mouseenter events */
  handleMouseEnter: () => void;
  /** Handler for mouseleave events */
  handleMouseLeave: () => void;
}

/**
 * Hook for managing hover-based dropdown behavior with debounced close.
 *
 * Provides smooth dropdown behavior by:
 * - Opening immediately on mouse enter
 * - Closing with a configurable delay on mouse leave
 * - Canceling pending closes if mouse re-enters
 * - Cleaning up timers on unmount
 *
 * @param options - Configuration options
 * @returns Handlers and state for the dropdown
 *
 * @example
 * ```tsx
 * const { isOpen, setIsOpen, handleMouseEnter, handleMouseLeave } = useDropdownHover();
 *
 * <div
 *   onMouseEnter={handleMouseEnter}
 *   onMouseLeave={handleMouseLeave}
 * >
 *   <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
 *   {isOpen && <DropdownMenu />}
 * </div>
 * ```
 */
export function useDropdownHover(options: UseDropdownHoverOptions = {}): UseDropdownHoverReturn {
  const { closeDelay = 150 } = options;

  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    // Cancel any pending close
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Schedule close with delay
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  }, [closeDelay]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    setIsOpen,
    handleMouseEnter,
    handleMouseLeave,
  };
}
