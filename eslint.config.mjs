import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  globalIgnores([
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/dist/**",
    "**/next.config.*",
    "**/next-sitemap.config.*",
    "**/jest.*"
  ]),

  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
      "react/react-in-jsx-scope": "off",
      "spaced-comment": "error",
      "no-duplicate-imports": "error",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-useless-catch": "off",
      "@typescript-eslint/no-unused-vars": "off"
    }
  },

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true }
      }
    }
  }
]);
