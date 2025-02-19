import js from '@eslint/js';
import preactConfig from 'eslint-config-preact';
import prettierPlugin from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/.idea/**', '**/dist/**', '**/node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{jsx,ts,tsx}'],
    ...reactPlugin.configs.flat.recommended,
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ...preactConfig,
    rules: {
      ...preactConfig.rules,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    rules: {
      ...prettierPlugin.rules,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    rules: {
      'no-duplicate-imports': [
        'error',
        {
          includeExports: true,
        },
      ],
    },
  },
);
