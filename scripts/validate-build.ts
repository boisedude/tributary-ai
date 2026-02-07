/**
 * Build validation script.
 *
 * This script runs pre-build checks to catch common issues before deployment:
 * 1. Validates that required environment variables are present
 * 2. Checks for common link issues (missing trailing slashes for internal links)
 *
 * Run with: npx tsx scripts/validate-build.ts
 */

import * as fs from "fs";
import * as path from "path";

const ROOT_DIR = path.resolve(__dirname, "..");
const COMPONENTS_DIR = path.join(ROOT_DIR, "components");
const APP_DIR = path.join(ROOT_DIR, "app");

interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
}

const result: ValidationResult = {
  success: true,
  errors: [],
  warnings: [],
};

/**
 * Check that required environment variables are present.
 */
function checkEnvironmentVariables(): void {
  console.log("Checking environment variables...");

  const required = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"];

  const optional = ["NEXT_PUBLIC_GA_ID"];

  required.forEach((envVar) => {
    if (!process.env[envVar]) {
      // During build, these might not be set - just warn
      result.warnings.push(`Environment variable ${envVar} is not set`);
    }
  });

  optional.forEach((envVar) => {
    if (!process.env[envVar]) {
      // Optional vars - only info level
      console.log(`  Info: Optional ${envVar} not set`);
    }
  });
}

/**
 * Recursively get all files matching a pattern.
 */
function getFiles(dir: string, extensions: string[]): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules, .next, and other non-source directories
      if (
        entry.name !== "node_modules" &&
        entry.name !== ".next" &&
        entry.name !== "out" &&
        !entry.name.startsWith(".")
      ) {
        files.push(...getFiles(fullPath, extensions));
      }
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Check for internal links missing trailing slashes.
 * This is important for Hostinger static hosting compatibility.
 */
function checkTrailingSlashes(): void {
  console.log("Checking for trailing slashes in internal links...");

  const files = [
    ...getFiles(COMPONENTS_DIR, [".tsx", ".ts"]),
    ...getFiles(APP_DIR, [".tsx", ".ts"]),
  ];

  // Pattern to find href="/path" without trailing slash (excluding external, anchor, and dynamic links)
  // This is a simplified check - catches obvious issues
  const hrefPattern = /href=["']\/(?!\/)[^"'\s#?]+(?<!\/|\.[\w]+)["']/g;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const matches = content.match(hrefPattern);

    if (matches) {
      // Filter out false positives (dynamic routes, file extensions, etc.)
      const issues = matches.filter((match) => {
        // Ignore dynamic routes like [slug]
        if (match.includes("[")) return false;
        // Ignore file extensions like .xml, .json
        if (/\.\w{2,4}["']$/.test(match)) return false;
        // Ignore root path
        if (match === 'href="/"' || match === "href='/'") return false;
        return true;
      });

      if (issues.length > 0) {
        const relativePath = path.relative(ROOT_DIR, file);
        result.warnings.push(
          `${relativePath}: Found ${issues.length} internal link(s) without trailing slash`
        );
      }
    }
  }
}

// Run all checks
console.log("\n=== Build Validation ===\n");

checkEnvironmentVariables();
checkTrailingSlashes();

// Print results
console.log("\n=== Results ===\n");

if (result.errors.length > 0) {
  console.log("Errors:");
  result.errors.forEach((err) => console.log(`  ✗ ${err}`));
  result.success = false;
}

if (result.warnings.length > 0) {
  console.log("Warnings:");
  result.warnings.forEach((warn) => console.log(`  ⚠ ${warn}`));
}

if (result.errors.length === 0 && result.warnings.length === 0) {
  console.log("✓ All checks passed!\n");
}

// Exit with error code if there are errors
if (!result.success) {
  console.log("\nBuild validation failed.\n");
  process.exit(1);
}

console.log("\nBuild validation complete.\n");
