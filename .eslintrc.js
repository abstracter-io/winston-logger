module.exports = {
  // https://github.com/typescript-eslint/typescript-eslint
  parser: "@typescript-eslint/parser",

  env: {
    es6: true,
    "jest/globals": true,
  },

  plugins: [
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md
    "import",

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    "@typescript-eslint",

    // https://github.com/prettier/eslint-plugin-prettier
    "prettier",

    // https://github.com/jest-community/eslint-plugin-jest
    "jest",
  ],

  // Prettier is enforcing code-style (formatting)
  // StandardJs is enforcing code-quality
  // The order below matters !!
  extends: [
    // https://github.com/standard/eslint-config-standard
    "standard",

    // Use the recommended Typescript config
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    "plugin:@typescript-eslint/recommended",

    // Use the recommended Jest config
    // https://github.com/jest-community/eslint-plugin-jest#recommended
    "plugin:jest/recommended",

    // Use the recommended Prettier config
    // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    "plugin:prettier/recommended",

    // Turn-off code-styles (prettier is handling that)
    // https://github.com/prettier/eslint-config-prettier
    "prettier/standard",
    "prettier/@typescript-eslint",
  ],

  parserOptions: {
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },

  rules: {
    // https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module
    "import/no-default-export": "error",
  },

  overrides: [
    {
      files: ["*.ts"],

      rules: {
        "no-useless-constructor": "off",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-unused-vars": [2, { args: "none" }],
      },
    },
  ],
};
