module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2022: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {},
}
