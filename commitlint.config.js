/**
 * Commitlint configuration for enforcing conventional commits
 * Aligned with platform-sdk-swift configuration
 * @see https://commitlint.js.org/
 * @see https://www.conventionalcommits.org/
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    // Increased body line length to match Swift SDK (300 chars)
    "body-max-line-length": [2, "always", 300],

    // Type enum - allowed commit types
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature - triggers minor version increment
        "fix", // Bug fix - triggers patch version increment
        "docs", // Documentation only - no version increment
        "style", // Code style changes (formatting, etc.) - no version increment
        "refactor", // Code refactoring - no version increment
        "perf", // Performance improvements - no version increment
        "test", // Adding/updating tests - no version increment
        "build", // Build system changes - no version increment
        "ci", // CI/CD changes - no version increment
        "chore", // Maintenance tasks - no version increment
        "revert", // Revert previous commit - no version increment
      ],
    ],

    // Type must be lowercase
    "type-case": [2, "always", "lower-case"],

    // Type is required
    "type-empty": [2, "never"],

    // Subject must not be empty
    "subject-empty": [2, "never"],

    // Subject must not end with a period
    "subject-full-stop": [2, "never", "."],

    // Subject case - sentence case, start case, pascal case, or upper case
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],

    // Header (first line) max length
    "header-max-length": [2, "always", 100],

    // Body should have a blank line before it
    "body-leading-blank": [1, "always"],

    // Footer should have a blank line before it
    "footer-leading-blank": [1, "always"],
  },
};
