module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      js: true,
    },
  },
  plugins: ['prettier', 'react'],
  rules: {
    'no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-deprecated': 'warn',
    'react/prop-types': 'off',
  },
};
