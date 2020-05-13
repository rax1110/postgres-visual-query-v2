module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "linebreak-style": 0,
    "import/prefer-default-export": "off",
    "import/no-named-as-default": 0,
    "react/require-default-props": 0,
    "object-curly-newline": ["off", {
      "ObjectExpression": "always",
      "ObjectPattern": { "multiline": true },
      "ImportDeclaration": "never",
      "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }],
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    "react/destructuring-assignment": [0, "always", { "ignoreClassFields": false }]
  },
};
