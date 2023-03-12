module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  extends: ["standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json"
  },
  rules: {
    "no-console": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
};
