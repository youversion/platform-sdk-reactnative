#!/bin/bash
# Local release helper script for branch-protected repositories
# This script automates the local release workflow while respecting branch protection rules

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/youversion/platform-sdk-reactnative"

# Helper functions
print_step() {
    echo -e "\n${BLUE}==>${NC} ${GREEN}$1${NC}\n"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ Error: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_step "Checking prerequisites..."

    # Check if we're in a git repo
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository"
        exit 1
    fi

    # Check if GITHUB_TOKEN is set
    if [ -z "$GITHUB_TOKEN" ]; then
        print_warning "GITHUB_TOKEN not set"
        echo "Please set GITHUB_TOKEN environment variable:"
        echo "  export GITHUB_TOKEN=your_token"
        exit 1
    fi

    # Check if NPM_TOKEN is set (optional but recommended)
    if [ -z "$NPM_TOKEN" ]; then
        print_warning "NPM_TOKEN not set (you may be prompted for npm login)"
    fi

    # Check if gh CLI is available
    if ! command -v gh &> /dev/null; then
        print_warning "GitHub CLI (gh) not found - you'll need to create PR manually"
        HAS_GH_CLI=false
    else
        HAS_GH_CLI=true
    fi

    print_success "Prerequisites checked"
}

# Ensure we're on main and up to date
ensure_main_updated() {
    print_step "Ensuring main branch is up to date..."

    git checkout main
    git pull origin main

    print_success "Main branch updated"
}

# Preview the release
preview_release() {
    print_step "Previewing release (dry-run)..."

    npm run release:dry-run

    echo ""
    read -p "Continue with this release? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Release cancelled"
        exit 0
    fi
}

# Create release branch
create_release_branch() {
    print_step "Creating release branch..."

    # Get next version from dry-run output
    BRANCH_NAME="release/prepare-$(date +%Y%m%d-%H%M%S)"

    git checkout -b "$BRANCH_NAME"

    print_success "Created branch: $BRANCH_NAME"
}

# Create local release config
create_local_config() {
    print_step "Creating local release configuration..."

    cat > .releaserc.local.json << 'EOF'
{
  "extends": "./.releaserc.json",
  "branches": [
    "main",
    { "name": "release/*", "channel": false }
  ]
}
EOF

    print_success "Local configuration created"
}

# Run semantic-release
run_release() {
    print_step "Running semantic-release..."

    npx semantic-release --extends ./.releaserc.local.json --no-ci

    print_success "Release completed - package published to npm!"
}

# Push branch and tags
push_release() {
    print_step "Pushing release branch and tags..."

    git push origin "$BRANCH_NAME"
    git push origin --tags

    print_success "Branch and tags pushed"
}

# Create PR
create_pr() {
    print_step "Creating pull request..."

    # Get version from package.json
    VERSION=$(node -p "require('./package.json').version")

    if [ "$HAS_GH_CLI" = true ]; then
        gh pr create \
            --base main \
            --head "$BRANCH_NAME" \
            --title "chore(release): $VERSION" \
            --body "Release version $VERSION

This PR merges the release commit back to main after publishing to npm.

- Version: $VERSION
- Published to npm: ✅
- GitHub release created: ✅

**Merge Instructions:**
- Use 'Create a merge commit' (preferred) or 'Squash and merge'
- Do NOT use 'Rebase and merge'

---

Released via local release workflow (branch protection compliant)"

        print_success "Pull request created!"
        print_success "View PR: $(gh pr view --web 2>&1 | grep -o 'https://.*')"
    else
        print_warning "GitHub CLI not available"
        echo "Please create PR manually:"
        echo "  $REPO_URL/compare/main...$BRANCH_NAME"
    fi
}

# Cleanup
cleanup() {
    print_step "Cleaning up..."

    git checkout main

    if [ -f .releaserc.local.json ]; then
        rm .releaserc.local.json
        print_success "Removed local config"
    fi

    echo ""
    print_success "Release process complete!"
    echo ""
    echo "Next steps:"
    echo "  1. Wait for PR approvals (1 reviewer + code owner)"
    echo "  2. Resolve any review threads"
    echo "  3. Merge the PR using 'Create a merge commit' or 'Squash and merge'"
    echo "  4. Delete the release branch: git branch -D $BRANCH_NAME"
    echo ""
    echo "Verify the release:"
    echo "  npm view @youversion/react-native-sdk"
    echo "  $REPO_URL/releases"
}

# Main execution
main() {
    echo -e "${GREEN}"
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║     YouVersion React Native SDK - Local Release       ║"
    echo "║          (Branch Protection Compliant)                 ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo -e "${NC}"

    check_prerequisites
    ensure_main_updated
    preview_release
    create_release_branch
    create_local_config
    run_release
    push_release
    create_pr
    cleanup
}

# Run main function
main
