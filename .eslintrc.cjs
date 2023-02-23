module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react', 'prettier', 'tailwindcss', '@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': 'off',
    'no-nested-ternary': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-return-assign': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'object-curly-newline': 'off',
    'comma-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'operator-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    indent: 'off',
    'react/no-unused-prop-types': 'off',
    'max-len': 'off',
    'no-shadow': 'off',
    'react/prop-types': 'off',
    'react/jsx-curly-newline': 'off',
    'react/no-unknown-property': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'linebreak-style': 'off'
  }
};
