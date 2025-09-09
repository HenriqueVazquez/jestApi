import eslint from '@eslint/js';
import globals from 'globals';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);


const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');


const tsRulesRecommended = tsPlugin.configs.recommended.rules;
const tsRulesTypeChecked = tsPlugin.configs['recommended-requiring-type-checking'].rules;

export default [

  {
    ignores: ['eslint.config.mjs'],
  },


  {
    files: ['src/**/*.ts'],
  },


  eslint.configs.recommended,


  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'commonjs',
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },

    rules: {

      ...tsRulesRecommended,
      ...tsRulesTypeChecked,


      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-call': 'off',
      'object-curly-spacing': 'on',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          bracketSpacing: true,
        },
      ],
    },
  },
];