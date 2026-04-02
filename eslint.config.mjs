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
  ]),
  {
    rules: {
      // Pre-existing throughout the codebase — downgraded to warn until types are gradually improved
      "@typescript-eslint/no-explicit-any": "warn",
      // Widespread hydration/sync pattern in the codebase — downgraded to warn
      "react-hooks/set-state-in-effect": "warn",
      // Components defined inside render are pre-existing patterns — downgraded to warn
      "react-hooks/static-components": "warn",
    },
  },
]);

export default eslintConfig;
