module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [2, "always", 300],
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
  },
};
