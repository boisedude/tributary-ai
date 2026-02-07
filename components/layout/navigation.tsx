"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { NAV_ITEMS, ASSETS, COMPANY, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useHydrated, useDropdownHover } from "@/lib/hooks";

const SERVICE_ITEMS = [
  { href: ROUTES.SERVICES, label: "All Services", description: "Overview of all offerings" },
  { href: ROUTES.ASSESSMENT, label: "The Assessment", description: "2-3 week diagnostic" },
  { href: ROUTES.DATA_READINESS, label: "Data Readiness", description: "Data quality & governance" },
  { href: ROUTES.AI_AUTOMATION, label: "AI Automation", description: "Process automation & RPA" },
  { href: ROUTES.AI_DEVELOPMENT, label: "AI Development", description: "Custom AI applications" },
  { href: ROUTES.MANAGED_SERVICES, label: "Managed Services", description: "Ongoing IT & fractional CTO" },
];

/**
 * Main navigation component for the site header.
 * Includes responsive design with mobile menu, theme toggle, and active state indicators.
 *
 * @returns {JSX.Element} The navigation header component
 *
 * @example
 * // Used in app/layout.tsx
 * <Navigation />
 */
export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const mounted = useHydrated();
  const {
    isOpen: servicesOpen,
    setIsOpen: setServicesOpen,
    handleMouseEnter,
    handleMouseLeave,
  } = useDropdownHover();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setServicesOpen]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  const isServicesActive = pathname?.startsWith("/services") || pathname?.startsWith("/assessment");

  return (
    <header className="sticky top-0 z-50">
      <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" aria-label="Main navigation">
        <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label={`${COMPANY.NAME} - Home`}>
            <Image
              src={mounted && theme === "dark" ? ASSETS.LOGO_HEADER_DARK : ASSETS.LOGO_HEADER}
              alt={COMPANY.NAME}
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
            <span className="text-xl font-bold text-gradient">
              {COMPANY.NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {NAV_ITEMS.map((item) => {
              // Skip Services and Assessment in main nav - they're in the dropdown
              if (item.href === ROUTES.SERVICES || item.href === ROUTES.ASSESSMENT) {
                if (item.href === ROUTES.SERVICES) {
                  // Render Services dropdown
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      ref={servicesRef}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                        className={cn(
                          "relative min-h-[44px] px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-accent hover:bg-accent/5 flex items-center gap-1",
                          isServicesActive ? "text-accent" : "text-muted-foreground"
                        )}
                      >
                        Services
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", servicesOpen && "rotate-180")} />
                        {isServicesActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                        )}
                      </button>
                      {servicesOpen && (
                        <div
                          className="absolute top-full left-0 mt-1 w-64 bg-background border rounded-lg shadow-lg py-2 z-50"
                          role="menu"
                          aria-label="Services submenu"
                        >
                          {SERVICE_ITEMS.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              role="menuitem"
                              onClick={() => setServicesOpen(false)}
                              className={cn(
                                "block min-h-[44px] px-4 py-3 hover:bg-accent/5 transition-colors",
                                isActive(service.href) && "text-accent"
                              )}
                            >
                              <span className="font-medium">{service.label}</span>
                              <span className="block text-xs text-muted-foreground mt-0.5">
                                {service.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return null; // Skip Assessment, it's in dropdown
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative min-h-[44px] flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-accent hover:bg-accent/5",
                    isActive(item.href) ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </Link>
              );
            })}

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => {
                // Skip Services and Assessment - render them specially
                if (item.href === ROUTES.SERVICES || item.href === ROUTES.ASSESSMENT) {
                  if (item.href === ROUTES.SERVICES) {
                    return (
                      <div key={item.href}>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          aria-expanded={mobileServicesOpen}
                          aria-haspopup="true"
                          className={cn(
                            "w-full px-4 py-3 min-h-[44px] flex items-center justify-between text-sm font-medium transition-colors hover:text-accent",
                            isServicesActive ? "text-accent bg-accent/10" : "text-muted-foreground"
                          )}
                        >
                          Services
                          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileServicesOpen && "rotate-180")} />
                        </button>
                        {mobileServicesOpen && (
                          <div className="bg-muted/30 py-1" role="menu" aria-label="Services submenu">
                            {SERVICE_ITEMS.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                role="menuitem"
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "block px-8 py-3 min-h-[44px] text-sm transition-colors hover:text-accent",
                                  isActive(service.href) ? "text-accent" : "text-muted-foreground"
                                )}
                              >
                                {service.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null; // Skip Assessment
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 min-h-[44px] flex items-center text-sm font-medium transition-colors hover:text-accent",
                      isActive(item.href) ? "text-accent bg-accent/10" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile Theme Toggle */}
              {mounted && (
                <div className="px-4 py-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Dark Mode
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
    </header>
  );
}
