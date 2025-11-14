/**
 * Commitlint configuration for enforcing conventional commits
 * @see https://commitlint.js.org/
 * @see https://www.conventionalcommits.org/
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // Type enum - allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, missing semicolons, etc)
        'refactor', // Code refactoring (neither fixes a bug nor adds a feature)
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Changes to build system or dependencies
        'ci',       // CI configuration changes
        'chore',    // Other changes that don't modify src or test files
        'revert',   // Reverts a previous commit
      ],
    ],

    // Type must be lowercase
    'type-case': [2, 'always', 'lower-case'],

    // Type is required
    'type-empty': [2, 'never'],

    // Subject must not be empty
    'subject-empty': [2, 'never'],

    // Subject must not end with a period
    'subject-full-stop': [2, 'never', '.'],

    // Subject case - sentence case, start case, pascal case, or upper case
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],

    // Header (first line) max length
    'header-max-length': [2, 'always', 100],

    // Body should have a blank line before it
    'body-leading-blank': [1, 'always'],

    // Footer should have a blank line before it
    'footer-leading-blank': [1, 'always'],
  },
};
