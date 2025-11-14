# Release Pipeline Setup Guide

This document provides instructions for completing the setup of the automated release pipeline.

## ✅ What Has Been Configured

The following has been set up in this repository:

- ✅ **semantic-release** configuration (`.releaserc.json`)
- ✅ **commitlint** for conventional commit validation (`commitlint.config.js`)
- ✅ **Husky** git hooks for local commit message validation (`.husky/commit-msg`)
- ✅ **CI workflow** with commit message validation (`.github/workflows/ci.yml`)
- ✅ **Release workflow** for automated publishing (`.github/workflows/release.yml`)
- ✅ **Android version sync** script (`scripts/sync-android-version.js`)
- ✅ **Documentation**: CONTRIBUTING.md, RELEASING.md, CHANGELOG.md
- ✅ **PR template** (`.github/pull_request_template.md`)
- ✅ **package.json** updated with version 0.5.0 and license

## 🔧 Required Manual Setup Steps

### 1. Install Dependencies

After merging this PR, install the new dependencies:

```bash
npm install
```

### 2. Initialize Husky

Set up Husky git hooks for commit message validation:

```bash
npx husky install
```

This will enable local validation of commit messages before they're committed.

### 3. Add NPM_TOKEN to GitHub Secrets

The release workflow requires an npm automation token to publish packages.

**Steps:**

1. **Generate an npm automation token**:
   - Go to https://www.npmjs.com/settings/[your-username]/tokens
   - Click "Generate New Token"
   - Select "Automation" token type
   - Set permissions: "Read and Publish"
   - Copy the generated token (you won't see it again!)

2. **Add the token to GitHub repository secrets**:
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste the npm token you generated
   - Click "Add secret"

### 4. Configure Branch Protection Rules (Recommended)

Set up branch protection for `main` to enforce quality gates:

**Steps:**

1. Go to repository Settings → Branches
2. Click "Add branch protection rule"
3. Branch name pattern: `main`
4. Configure the following settings:

   **Pull Request Requirements:**
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1 (adjust based on team size)
   - ✅ Dismiss stale pull request approvals when new commits are pushed

   **Status Checks:**
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - Search and add these status checks:
     - `build-and-test` (from CI workflow)

   **Additional Settings:**
   - ✅ Require linear history (already enforced via squash merge)
   - ✅ Allow force pushes: **Specify who can force push**
     - Add: `github-actions[bot]` (for semantic-release commits)
   - ✅ Do not allow bypassing the above settings

5. Click "Create" to save the branch protection rule

### 5. Verify npm Organization Access

Ensure you have publish access to the `@youversion` npm organization:

1. Go to https://www.npmjs.com/org/youversion/members
2. Verify your account has "publish" permissions
3. Contact npm org admin if you don't have access

### 6. Test the Release Process (Dry Run)

Before your first real release, test the process:

```bash
# This will simulate a release without actually publishing
npm run release:dry-run
```

This command will:
- Analyze commits since last release
- Calculate the next version
- Generate release notes
- Show you what would be published
- **NOT actually publish to npm or create releases**

Review the output to ensure everything looks correct.

## 📝 First Release Checklist

Before merging this PR and triggering your first automated release:

- [ ] Dependencies installed (`npm install`)
- [ ] Husky initialized (`npx husky install`)
- [ ] NPM_TOKEN added to GitHub secrets
- [ ] Branch protection rules configured
- [ ] npm organization access verified
- [ ] Dry-run tested successfully
- [ ] Team notified about new commit message requirements
- [ ] CONTRIBUTING.md reviewed by team

## 🚀 Making Your First Release

Once everything is set up:

1. **Merge this PR** to `main` using squash merge
2. **Use a conventional commit message** for the squash commit:
   ```
   feat: setup automated release pipeline
   
   - Configure semantic-release for automated versioning
   - Add commitlint for conventional commit enforcement
   - Create comprehensive documentation
   - Add CI/CD workflows for testing and releasing
   ```

3. **Watch the release workflow**:
   - Go to Actions tab in GitHub
   - Watch the "Release" workflow execute
   - Should complete in ~2-5 minutes

4. **Verify the release**:
   - Check GitHub releases: https://github.com/youversion/platform-sdk-reactnative/releases
   - Check npm: https://www.npmjs.com/package/@youversion/react-native-sdk
   - Verify CHANGELOG.md was updated
   - Verify version bumped in package.json and android/build.gradle

## 🔍 Troubleshooting

### "NPM_TOKEN invalid or expired"

**Solution**: Regenerate the npm token and update the GitHub secret.

### "Permission denied when pushing to git"

**Solution**: 
- Verify branch protection allows `github-actions[bot]` to force push
- Check that GITHUB_TOKEN has write permissions in the workflow

### "No release published"

**Solution**: This is normal if there are no `feat` or `fix` commits. Only certain commit types trigger releases. See [RELEASING.md](RELEASING.md#version-bump-rules) for details.

### Husky hooks not running

**Solution**:
```bash
# Re-initialize Husky
npx husky install

# Verify the hook is executable
chmod +x .husky/commit-msg
```

### Commit message validation failing

**Solution**: Review the commit message format in [CONTRIBUTING.md](CONTRIBUTING.md#conventional-commits). Use this format:

```
<type>(<scope>): <subject>

Examples:
feat(api): add Bible verse lookup
fix(auth): resolve token refresh issue
```

## 📚 Additional Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [semantic-release Documentation](https://semantic-release.gitbook.io/)
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [RELEASING.md](RELEASING.md) - Detailed release process documentation

## 🆘 Getting Help

If you encounter issues:

1. Check this setup guide
2. Review [RELEASING.md](RELEASING.md) troubleshooting section
3. Check semantic-release docs
4. Open a discussion on GitHub
5. Contact the repository maintainers

---

**Questions?** Reach out to the platform team or open a GitHub discussion.
