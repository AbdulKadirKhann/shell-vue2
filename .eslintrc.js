module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { semi: false }],
    semi: 'off',
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
}
