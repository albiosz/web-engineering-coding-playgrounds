import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
// import love from "eslint-config-love";
// import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';

export default defineConfig([
  {
    // ...love, // when I try to use the love config, I get an error after error that some plugins could not be found
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx}'],
    // plugins: { js, 'eslint-comments': eslintComments },
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
]);
