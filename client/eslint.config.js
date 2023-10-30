import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { Linter } from "eslint";
import hooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * @type {Linter.FlatConfig[]}
 */
export default [
  {
    ...js.configs.recommended,
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      hooks,
    },
    rules: {
      ...ts.configs.recommended.rules,
      "hooks/rules-of-hooks": "error",
      "hooks/exhaustive-deps": "warn",
    },
  },
];
