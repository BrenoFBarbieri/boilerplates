import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Base JavaScript recommended rules
  js.configs.recommended,
  // TypeScript recommended rules
  ...tseslint.configs.recommended,
  {
    // Custom rule overrides for this boilerplate
    rules: {
      'no-console': 'off', // Change to 'warn' if you don't want `console.log` in the code.
      '@typescript-eslint/no-unused-vars': 'error', // Disallows unused variables
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Enforces 'interface' over 'type' for object definitions
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/config/**', '**/core/**', '**/infra/**'],
              message:
                'Please use the Barrel Pattern via #imports (e.g., #config or #core).',
            },
          ],
        },
      ],
    },
  },
  {
    // Directories to be ignored by ESLint
    ignores: ['dist/**', 'node_modules/**'],
  },
);
