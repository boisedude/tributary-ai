import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Scripts are Node.js files, not Next.js/React
    "scripts/*.js",
    "deploy-ftp.js",
    "deploy-ftp.sh",
  ]),
  {
    rules: {
      // Allow apostrophes in JSX - they render fine
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
