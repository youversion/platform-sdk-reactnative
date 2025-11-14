# Contributing to YouVersion React Native SDK

Thank you for your interest in contributing to the YouVersion React Native SDK! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Conventional Commits](#conventional-commits)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Release Process](#release-process)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and collaborative environment. Please be kind and courteous to all contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/platform-sdk-reactnative.git
   cd platform-sdk-reactnative
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up git hooks**:
   ```bash
   npx husky install
   ```

## Development Setup

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Xcode (for iOS development)
- Android Studio (for Android development)

### Available Scripts

- `npm run build` - Build the module
- `npm run clean` - Clean build artifacts
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run typecheck` - Run TypeScript type checking
- `npm run release:dry-run` - Test release process without publishing

### Running the Example App

```bash
# iOS
cd example
npm run ios

# Android
cd example
npm run android
```

## Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning and changelog generation. **All commit messages must follow this format.**

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Commit Types

- **feat**: A new feature (triggers MINOR version bump)
- **fix**: A bug fix (triggers PATCH version bump)
- **docs**: Documentation changes only
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code changes that neither fix bugs nor add features (triggers PATCH version bump)
- **perf**: Performance improvements (triggers PATCH version bump)
- **test**: Adding or updating tests
- **build**: Changes to build system or dependencies
- **ci**: CI configuration changes
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Breaking Changes

Breaking changes trigger a MAJOR version bump. Indicate breaking changes in one of two ways:

1. Add `!` after the type/scope:
   ```
   feat!: remove deprecated API endpoint
   ```

2. Add `BREAKING CHANGE:` in the footer:
   ```
   feat: update authentication flow
   
   BREAKING CHANGE: The old auth token format is no longer supported.
   Users must migrate to the new format.
   ```

### Commit Message Examples

#### Good Examples ✅

```bash
# New feature
feat(api): add support for Bible verse lookup

# Bug fix
fix(auth): resolve token refresh race condition

# Documentation
docs: update README with installation instructions

# Breaking change
feat(api)!: redesign Bible content API structure

BREAKING CHANGE: The Bible content API now returns a different
response structure. See migration guide for details.
```

#### Bad Examples ❌

```bash
# Missing type
Update readme

# Vague subject
fix: fix bug

# Subject too long
feat: add new feature that does something really cool and amazing and changes everything

# Wrong case
Feat: Add feature
```

### Scope (Optional)

The scope should specify the area of the codebase affected:

- `api` - API changes
- `auth` - Authentication related
- `bible` - Bible content features
- `ui` - UI components
- `deps` - Dependency updates
- `config` - Configuration changes

### Commit Message Validation

Commit messages are validated in two places:

1. **Locally** - Via Husky git hook (blocks invalid commits)
2. **In CI** - During pull request validation

If your commit message doesn't follow the convention, you'll see an error like:

```
⧗   input: bad commit message
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
```

## Pull Request Process

### Before Submitting a PR

1. **Ensure all tests pass**: `npm test`
2. **Run type checking**: `npm run typecheck`
3. **Run linting**: `npm run lint`
4. **Build successfully**: `npm run build`
5. **Use conventional commits** for all commit messages

### PR Submission

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** with conventional commits

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** against the `main` branch

5. **Fill out the PR template** completely

### PR Requirements

- ✅ All CI checks must pass
- ✅ Code must be reviewed by at least one maintainer
- ✅ Conventional commit format required
- ✅ Linear history (squash merge)
- ✅ No merge conflicts

### Breaking Changes in PRs

If your PR contains breaking changes:

- **Clearly mark it** in the PR title (e.g., `[BREAKING]`)
- **Document the breaking change** in the PR description
- **Provide migration instructions**
- **Get additional review approval**

## Code Style Guidelines

### TypeScript

- Use TypeScript for all source code
- Prefer `interface` over `type` for object shapes
- Use strict type checking (no `any` unless absolutely necessary)
- Export public APIs explicitly

### Naming Conventions

- **Files**: camelCase (e.g., `bibleReader.ts`)
- **Components**: PascalCase (e.g., `BibleReaderView`)
- **Functions**: camelCase (e.g., `fetchBibleContent`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### Code Organization

- Keep files focused and single-purpose
- Export public APIs from `index.ts`
- Place tests in `__tests__` directories
- Place mocks in `mocks/` directory

### ESLint

This project uses ESLint with Expo module scripts configuration. Run `npm run lint` to check your code.

## Testing Requirements

### Unit Tests

- Write unit tests for all new features
- Maintain or improve test coverage
- Place tests in `src/__tests__/` with `.test.ts` or `.test.tsx` extension
- Use descriptive test names

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = doSomething(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Release Process

Releases are **fully automated** using semantic-release. You don't need to manually version or publish.

### How Releases Work

1. **PR is merged** to `main` with conventional commits
2. **Semantic-release analyzes** commits to determine version bump
3. **Version is bumped** automatically (in package.json, Android build.gradle)
4. **CHANGELOG.md is updated** with release notes
5. **Package is published** to npm
6. **GitHub release is created** with release notes

### Version Bump Rules

- `feat:` commits → MINOR version bump (0.5.0 → 0.6.0)
- `fix:` commits → PATCH version bump (0.5.0 → 0.5.1)
- `BREAKING CHANGE:` → MAJOR version bump (0.5.0 → 1.0.0)
- Other commit types → No release

### Manual Release (Emergency Only)

In rare cases where automation fails, see [RELEASING.md](./RELEASING.md) for manual release procedures.

## Questions?

If you have questions about contributing, please:

1. Check the [README](./README.md)
2. Read [RELEASING.md](./RELEASING.md)
3. Open a discussion on GitHub
4. Reach out to the maintainers

Thank you for contributing! 🎉
