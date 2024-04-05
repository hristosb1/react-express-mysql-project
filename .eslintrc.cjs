module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-case-declarations': 'off',
    // "linebreak-style": ["error", "windows"],

    semi: ['warn', 'always'],
    'for-direction': 'error',
    'no-const-assign': 'error',
    'no-unreachable': 'error',
    'no-unused-vars': 'off',
    'arrow-parens': 'warn',
    'default-case': 'error',
    'default-param-last': ['error'],
    eqeqeq: 'error',
    'guard-for-in': 'error',
    'no-empty': 'warn',
    'no-empty-function': 'warn',
    'no-lonely-if': 'error',
    'no-var': 'error',
    'require-await': 'warn',
    'prefer-const': 'warn',
    // "strict": "error"
    'react-hooks/exhaustive-deps': 'off'
  }
};
