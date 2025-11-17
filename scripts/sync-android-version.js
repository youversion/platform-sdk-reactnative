#!/usr/bin/env node

/**
 * Sync Android build.gradle version with package.json
 * This script is called by semantic-release during the release process
 */

const fs = require("fs");
const path = require("path");

// Get version from command line argument (passed by semantic-release)
const newVersion = process.argv[2];

if (!newVersion) {
  console.error("❌ Error: Version argument is required");
  console.error("Usage: node sync-android-version.js <version>");
  process.exit(1);
}

// Validate version format (semantic versioning)
const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
if (!versionRegex.test(newVersion)) {
  console.error(`❌ Error: Invalid version format: ${newVersion}`);
  console.error("Expected format: X.Y.Z or X.Y.Z-prerelease");
  process.exit(1);
}

// Path to Android build.gradle
const buildGradlePath = path.join(__dirname, "..", "android", "build.gradle");

try {
  // Read the build.gradle file
  let buildGradleContent = fs.readFileSync(buildGradlePath, "utf8");

  // Find and replace the group-level version line
  // Looking for: version = "X.Y.Z" or version = 'X.Y.Z' at the start of a line
  const versionLineRegex = /^version\s*=\s*["'][\d.]+(-[a-zA-Z0-9.-]+)?["']/m;

  if (!versionLineRegex.test(buildGradleContent)) {
    console.error(
      "❌ Error: Could not find version line in android/build.gradle",
    );
    console.error('Expected format: version = "X.Y.Z"');
    process.exit(1);
  }

  // Replace the group-level version
  let updatedContent = buildGradleContent.replace(
    versionLineRegex,
    `version = '${newVersion}'`,
  );

  // Also update versionName in defaultConfig if it exists
  // Looking for: versionName "X.Y.Z"
  const versionNameRegex = /versionName\s+["'][\d.]+(-[a-zA-Z0-9.-]+)?["']/;

  if (versionNameRegex.test(updatedContent)) {
    updatedContent = updatedContent.replace(
      versionNameRegex,
      `versionName "${newVersion}"`,
    );
    console.log(`✅ Updated versionName to ${newVersion}`);
  }

  // Write back to file
  fs.writeFileSync(buildGradlePath, updatedContent, "utf8");

  console.log(
    `✅ Successfully updated android/build.gradle version to ${newVersion}`,
  );
  process.exit(0);
} catch (error) {
  console.error(`❌ Error updating android/build.gradle:`, error.message);
  process.exit(1);
}
