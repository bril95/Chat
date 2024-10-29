module.exports = {
  root: true,
  env: {
      browser: true,
      es2021: true,
      node: true,
  },
  extends: [
      'standard-with-typescript',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
          jsx: true
      },
      project: ['./tsconfig.json'],
      tsconfigRootDir: __dirname,
  },
  plugins: [
      'react',
      '@typescript-eslint',
      'prettier'
  ],
  settings: {
      react: {
          version: 'detect'
      }
  },
  rules: {
      // Базовые правила
      'no-console': 'error',
      'no-debugger': 'error',
      'no-unused-vars': 'off',

      // TypeScript правила
      '@typescript-eslint/no-unused-vars': ['error', {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',

      // React правила
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unused-prop-types': 'error',
      'react/no-array-index-key': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',

      // Prettier правила
      'prettier/prettier': ['error', {
          endOfLine: 'auto',
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'es5',
          printWidth: 100
      }]
  },
  ignorePatterns: ['.eslintrc.js', 'node_modules/', 'dist/']
};