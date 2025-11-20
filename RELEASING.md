# Release Process

> **Note**: This document is for YouVersion team members. External contributors should submit PRs with [conventional commits](https://www.conventionalcommits.org/) - releases happen automatically.

## Automated Release (Default)

Releases happen automatically via CI when PRs are merged to `main`.

**What triggers a release:**
- `feat:` → MINOR bump (0.5.0 → 0.6.0)
- `fix:`, `perf:`, `refactor:` → PATCH bump (0.5.0 → 0.5.1)
- `BREAKING CHANGE:` or `feat!:` → MAJOR bump (0.5.0 → 1.0.0)

**What does NOT trigger a release:**
- `docs:`, `style:`, `test:`, `build:`, `ci:`, `chore:`

## Manual Release (Branch Protection)

Use when you need manual control over release timing. Since `main` branch requires PRs, use this workflow:

### Quick Method

```bash
# Set up environment
export GITHUB_TOKEN=your_token
export NPM_TOKEN=your_token

# Run helper script
./scripts/release-local.sh
```

The script will preview, publish, and create a PR for you to merge.

### Manual Steps

```bash
# 1. Create release branch
git checkout main && git pull
git checkout -b release/prepare

# 2. Preview (from main)
git checkout main && npm run release:dry-run
git checkout release/prepare

# 3. Create config
cat > .releaserc.local.json << 'EOF'
{"extends": "./.releaserc.json", "branches": ["main", {"name": "release/*", "channel": false}]}
EOF

# 4. Release and publish to npm
npx semantic-release --extends ./.releaserc.local.json

# 5. Push and create PR
git push origin release/prepare --tags
gh pr create --base main --title "chore(release): x.y.z"

# 6. Get approval and merge PR

# 7. Cleanup
git checkout main && git pull
git branch -D release/prepare
rm .releaserc.local.json
```

**Note**: Package publishes to npm in step 4, before PR merge. This is intentional.

## Troubleshooting

### "No release published"
No commits since last release warrant a version bump. Check:
```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

### "GITHUB_TOKEN not set"
```bash
export GITHUB_TOKEN=your_token
```

### "npm requires 2FA"
Have your authenticator app ready during the publish step.

---

**Last Updated**: 2025-11-19
