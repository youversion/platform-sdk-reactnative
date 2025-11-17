# Release Process Documentation

This document describes the automated release process for the YouVersion React Native SDK and provides manual procedures for emergency situations.

## Table of Contents

- [Automated Release Process](#automated-release-process)
- [Version Bump Rules](#version-bump-rules)
- [Breaking Change Policy](#breaking-change-policy)
- [Manual Release Procedure](#manual-release-procedure)
- [Rollback Procedures](#rollback-procedures)
- [Pre-release Versions](#pre-release-versions)
- [Troubleshooting](#troubleshooting)

## Automated Release Process

The YouVersion React Native SDK uses [semantic-release](https://github.com/semantic-release/semantic-release) for fully automated version management and package publishing.

### How It Works

1. **Developer creates a PR** with conventional commits
2. **CI validates** commit messages and runs tests
3. **PR is reviewed and approved**
4. **PR is merged to `main`** using squash merge
5. **Release workflow triggers automatically**
6. **Semantic-release analyzes commits** since last release
7. **If release is warranted:**
   - Version is calculated based on commit types
   - CHANGELOG.md is updated with release notes
   - Version is bumped in:
     - package.json
     - package-lock.json
     - android/build.gradle
   - Package is built and published to npm
   - GitHub release is created with release notes
   - Changes are committed back to `main` with `[skip ci]`

### What Triggers a Release?

A release is triggered when commits on `main` contain:

- `feat:` - New features (MINOR bump)
- `fix:` - Bug fixes (PATCH bump)
- `perf:` - Performance improvements (PATCH bump)
- `refactor:` - Code refactoring (PATCH bump)
- `revert:` - Reverted changes (PATCH bump)
- `BREAKING CHANGE:` - Breaking changes (MAJOR bump)

### What Does NOT Trigger a Release?

These commit types do not trigger a release:

- `docs:` - Documentation only changes
- `style:` - Code style/formatting changes
- `test:` - Test additions or changes
- `build:` - Build system changes
- `ci:` - CI configuration changes
- `chore:` - Maintenance tasks

## Version Bump Rules

This project follows [Semantic Versioning](https://semver.org/) (SemVer):

**Format:** `MAJOR.MINOR.PATCH`

### PATCH Version (0.5.0 → 0.5.1)

Triggers:
- `fix:` - Bug fixes
- `perf:` - Performance improvements
- `refactor:` - Code refactoring
- `revert:` - Reverting previous changes

Example:
```bash
fix(auth): resolve token refresh race condition
```

### MINOR Version (0.5.0 → 0.6.0)

Triggers:
- `feat:` - New features (backward compatible)

Example:
```bash
feat(api): add support for Bible verse lookup
```

### MAJOR Version (0.5.0 → 1.0.0)

Triggers:
- Any commit with `BREAKING CHANGE:` in the footer
- Any commit type with `!` after type/scope

Examples:
```bash
feat(api)!: redesign authentication API

BREAKING CHANGE: The authentication API has been completely
redesigned. See migration guide for upgrading.
```

or

```bash
feat!: remove deprecated Bible content methods
```

## Breaking Change Policy

Breaking changes require special attention and additional safeguards.

### Identifying Breaking Changes

A change is considered breaking if it:

- Removes or renames public APIs
- Changes function signatures
- Modifies return types or values
- Requires users to change their code
- Changes minimum version requirements

### Breaking Change Requirements

When introducing breaking changes:

1. **Mark clearly in commit message** using `BREAKING CHANGE:` or `!`
2. **Document in PR description**:
   - What is breaking
   - Why the change is necessary
   - Migration instructions
3. **Require additional review approval** from team lead
4. **Provide migration guide** in PR or documentation
5. **Consider deprecation first** before removing features

### Breaking Change Review Process

1. Developer clearly marks PR with `[BREAKING]` in title
2. PR description contains:
   - Detailed explanation of breaking change
   - Justification for the change
   - Migration guide with code examples
3. Require approval from:
   - At least one maintainer
   - Technical lead or architect
4. Merge only after thorough review

### Example Breaking Change Commit

```bash
git commit -m "feat(api)!: redesign Bible content API

The Bible content API has been redesigned to improve performance
and consistency. The new API uses a different response structure.

BREAKING CHANGE: The getBibleContent() method now returns a
Promise<BibleContent> instead of BibleContent. All callers must
be updated to use async/await or .then() syntax.

Migration:
// Before
const content = getBibleContent('GEN.1.1');

// After
const content = await getBibleContent('GEN.1.1');
"
```

## Manual Release Procedure

**⚠️ Only use this procedure if the automated release fails or in emergency situations.**

### Prerequisites

- npm account with publish access to `@youversion` scope
- npm 2FA setup (required for publishing)
- Write access to the repository

### Steps

1. **Ensure you're on the latest `main` branch**:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Determine the next version** following SemVer:
   ```bash
   # Current version
   npm version
   
   # Decide: patch, minor, or major
   # For 0.5.0:
   # - patch → 0.5.1
   # - minor → 0.6.0
   # - major → 1.0.0
   ```

3. **Create a new branch**:
   ```bash
   git checkout -b release/manual-v0.6.0
   ```

4. **Update version manually**:
   
   **package.json:**
   ```json
   {
     "version": "0.6.0"
   }
   ```
   
   **android/build.gradle:**
   ```gradle
   version = "0.6.0"
   ```

5. **Update CHANGELOG.md**:
   ```markdown
   ## [0.6.0] - 2025-01-15
   
   ### Features
   - Add new Bible verse lookup API
   
   ### Bug Fixes
   - Fix token refresh race condition
   ```

6. **Commit changes**:
   ```bash
   git add package.json package-lock.json android/build.gradle CHANGELOG.md
   git commit -m "chore(release): 0.6.0 [skip ci]"
   ```

7. **Create git tag**:
   ```bash
   git tag v0.6.0
   ```

8. **Build the package**:
   ```bash
   npm run build
   npm pack
   ```

9. **Test the package** (optional but recommended):
   ```bash
   # Install in a test project
   cd /path/to/test-project
   npm install /path/to/youversion-react-native-sdk-0.6.0.tgz
   ```

10. **Publish to npm**:
    ```bash
    npm publish --access public
    # Enter 2FA code when prompted
    ```

11. **Push changes and tag**:
    ```bash
    git push origin release/manual-v0.6.0
    git push origin v0.6.0
    ```

12. **Create GitHub release**:
    - Go to https://github.com/youversion/platform-sdk-reactnative/releases/new
    - Select tag `v0.6.0`
    - Title: `v0.6.0`
    - Copy release notes from CHANGELOG.md
    - Publish release

13. **Create PR to merge back to main**:
    - Create PR from `release/manual-v0.6.0` to `main`
    - Title: `chore: manual release v0.6.0`
    - Merge without squashing (to preserve version commit)

## Rollback Procedures

### If a Bad Version is Published

1. **Deprecate the bad version on npm** (doesn't remove it):
   ```bash
   npm deprecate @youversion/platform-sdk-reactnative@0.6.0 "This version has critical bugs. Please upgrade to 0.6.1."
   ```

2. **Publish a patch version** with fixes:
   - Follow manual release procedure
   - Bump to next patch version (e.g., 0.6.1)
   - Include fixes for the issues

3. **Notify users**:
   - Update GitHub release notes
   - Post in relevant channels
   - Update documentation

### If Release Workflow Fails

1. **Check GitHub Actions logs**:
   - Go to Actions tab in GitHub
   - Find the failed workflow run
   - Review error messages

2. **Common issues**:
   - **NPM_TOKEN expired**: Update the secret in GitHub repository settings
   - **Version conflict**: Ensure version doesn't already exist on npm
   - **Build failure**: Fix build issues and re-run workflow
   - **Network issues**: Re-run workflow (may be transient)

3. **Re-run workflow**:
   - Go to failed workflow run
   - Click "Re-run failed jobs"

4. **If re-run fails**, use [Manual Release Procedure](#manual-release-procedure)

## Pre-release Versions

For beta, alpha, or release candidate versions:

### Automated (using branches)

Semantic-release can be configured to publish pre-releases from specific branches:

1. **Create configuration** for pre-release branch in `.releaserc.json`:
   ```json
   {
     "branches": [
       "main",
       {
         "name": "beta",
         "prerelease": true
       }
     ]
   }
   ```

2. **Create and push to beta branch**:
   ```bash
   git checkout -b beta
   git push origin beta
   ```

3. **Merge changes to beta** - will create versions like `0.6.0-beta.1`

### Manual Pre-release

1. **Follow manual release procedure** with version format:
   ```
   0.6.0-beta.1
   0.6.0-rc.1
   0.6.0-alpha.1
   ```

2. **Publish with dist-tag**:
   ```bash
   npm publish --tag beta
   ```

3. **Users install with**:
   ```bash
   npm install @youversion/react-native-sdk@beta
   ```

## Troubleshooting

### "Version X.Y.Z already exists on npm"

**Cause**: Version already published to npm.

**Solution**:
- If automated: Check if release already succeeded (check npm)
- Manually bump to next version
- Ensure no duplicate releases

### "No release published"

**Cause**: No commits since last release warrant a new version.

**Solution**: This is expected behavior. A release only happens when there are `feat`, `fix`, or breaking changes.

### "NPM_TOKEN invalid or expired"

**Cause**: The GitHub secret NPM_TOKEN is missing or expired.

**Solution**:
1. Generate new npm token: https://www.npmjs.com/settings/[username]/tokens
2. Add to GitHub repository secrets: Settings → Secrets → Actions → NPM_TOKEN
3. Re-run the workflow

### "Permission denied when pushing to git"

**Cause**: GitHub Actions doesn't have permission to push commits back to the repository.

**Solution**:
1. Ensure GITHUB_TOKEN has write permissions
2. Check branch protection rules allow Actions to push
3. Verify `.github/workflows/release.yml` has correct permissions

### Build Fails in CI

**Cause**: Code doesn't compile or tests fail.

**Solution**:
1. Run locally: `npm run build && npm test && npm run typecheck`
2. Fix issues in a new PR
3. Merge the fix
4. Release will automatically retry on next merge

## GitHub Repository Setup

### Required Secrets

Add these secrets in **Settings → Secrets and variables → Actions**:

- `NPM_TOKEN` - npm automation token with publish access
  - Generate at: https://www.npmjs.com/settings/[username]/tokens
  - Type: "Automation" token
  - Scope: Read and Publish

### Branch Protection Rules

Configure for `main` branch in **Settings → Branches → Branch protection rules**:

- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
  - Select: `ci` workflow
- ✅ Require linear history
- ✅ Allow force pushes (for semantic-release bot)
  - Specify: github-actions[bot]
- ✅ Do not allow bypassing the above settings

## Support

For questions or issues with the release process:

1. Check this documentation
2. Review [CONTRIBUTING.md](./CONTRIBUTING.md)
3. Check [semantic-release documentation](https://semantic-release.gitbook.io/)
4. Open a discussion on GitHub
5. Contact the maintainers

---

**Last Updated**: 2025-11-17
