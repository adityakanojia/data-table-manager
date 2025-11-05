import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import next from 'eslint-config-next';

export default [
  {
    ignores: ['node_modules', '.next', 'out', 'dist', 'build'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
      import: pluginImport,
      prettier: eslintPluginPrettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          paths: ['src', '.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src'],
        },
        jest: {
          jestConfig: './jest.config.js',
        },
      },
    },
    rules: {
      ...next.rules,
      ...tseslint.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      // ✅ General best practices
      'no-console': ['warn', { allow: ['info', 'error'] }],
      'no-param-reassign': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-parens': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'eqeqeq': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-with': 'error',
      'no-plusplus': 'error',
      'spaced-comment': ['error', 'always'],

      // ✅ TypeScript
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-namespace': 'error',

      // ✅ React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-closing-bracket-location': ['error'],
      'react/jsx-curly-spacing': ['error', 'never'],
      'react/self-closing-comp': 'error',
      'react/sort-comp': [
        'warn',
        {
          order: [
            'propTypes',
            'defaultProps',
            'static-methods',
            'lifecycle',
            'everything-else',
            'render',
          ],
        },
      ],
      'react-hooks/exhaustive-deps': 'warn',

      // ✅ Import order
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          alphabetize: { caseInsensitive: true },
        },
      ],

      // ✅ Formatting / Style
      indent: [
        'error',
        2,
        { SwitchCase: 1, ignoredNodes: ['TemplateLiteral > *'] },
      ],
      'jsx-quotes': ['error', 'prefer-double'],
      semi: ['error', 'always'],
      'semi-spacing': 'error',
      'no-extra-semi': 'error',
      'comma-style': ['error', 'last'],
      'space-before-function-paren': [
        'error',
        { anonymous: 'never', named: 'never', asyncArrow: 'ignore' },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: 'export' },
        { blankLine: 'any', prev: 'export', next: 'export' },
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'class', next: '*' },
        { blankLine: 'always', prev: '*', next: 'class' },
      ],

      // ✅ JSDoc
      'valid-jsdoc': [
        'error',
        {
          prefer: {
            arg: 'param',
            argument: 'param',
            return: 'returns',
          },
          preferType: {
            object: 'Object',
            array: 'Array',
            string: 'String',
            number: 'Number',
            boolean: 'Boolean',
            promise: 'Promise',
          },
          requireReturn: false,
          requireReturnType: true,
          requireParamDescription: false,
          requireReturnDescription: false,
          matchDescription: '.+',
        },
      ],

      // ✅ Prettier
      'prettier/prettier': 'error',
    },
  },
];
