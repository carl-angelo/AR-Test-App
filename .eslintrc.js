module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    "react-hooks/exhaustive-deps": 'off',
    "react/jsx-props-no-spreading": 'off',
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-undef": "off"
  },
  extends: ["react-app", "eslint:recommended", "plugin:react/recommended"],
  plugins: ["react", "import", "react-hooks"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    requireConfigFile: false
  },
  ignorePatterns: ["node_modules/"],
  settings: {
    react: {
      version: "detect", // "detect" automatically picks the version you have installed.
    },
  },
}