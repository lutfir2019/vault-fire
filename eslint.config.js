// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Abaikan folder build
  globalIgnores(["dist", "node_modules", "coverage"]),

  {
    files: ["**/*.{ts,tsx}"],

    // Extend config dari berbagai sumber
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // gunakan spread, karena recommended di v7 berbentuk array
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      prettier, // ⬅️ menonaktifkan aturan yang bentrok dengan Prettier
    ],

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
    },

    rules: {
      // ⚙️ Aturan umum tambahan
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // react-hooks linting
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]);
