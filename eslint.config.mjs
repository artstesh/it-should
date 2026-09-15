// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'lib/**',
      'spec/**',
      'node_modules/**',
      // Stale in-place compile artifacts from the old ttsc-era pipeline (gitignored).
      'src/**/*.js',
      'src/**/*.d.ts',
      'src/**/*.js.map',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    rules: {
      // The library API legitimately works with `any` entries (e.g. `true()`/`false()`).
      '@typescript-eslint/no-explicit-any': 'off',
      // `objects<T extends {}, P extends {}>` is the deliberate, documented v2 constraint.
      '@typescript-eslint/no-empty-object-type': 'off',
      // Parity with the old tslint config: shadowing is allowed.
      'no-shadow': 'off',
      // `!!value` coercions are the established style of the codebase.
      'no-extra-boolean-cast': 'off',
      // Parity with tslint: unused catch bindings were not reported.
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
    },
  },
);
