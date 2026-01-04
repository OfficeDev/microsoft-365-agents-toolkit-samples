#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This script validates external samples (those with downloadUrlInfo) that are cloned locally.
 * 
 * Usage:
 *   node validate-external.js <sample-id> <local-repo-path>
 *   node validate-external.js reddit-link-unfurling C:/Users/quke/source/External/Microsoft-Teams-Samples
 * 
 * The script will:
 * 1. Look up the sample in samples-config-v3.json to find its downloadUrlInfo
 * 2. Calculate the sample path based on downloadUrlInfo.dir within the local repo
 * 3. Run validation with the correct config reference
 * 4. Show failed validations clearly and provide fix suggestions at the end
 */

const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
Usage: node validate-external.js <sample-id> <local-repo-path>

Arguments:
  sample-id        The sample ID in samples-config-v3.json (e.g., reddit-link-unfurling)
  local-repo-path  The local path to the cloned external repository

Example:
  node validate-external.js reddit-link-unfurling C:/Users/quke/source/External/Microsoft-Teams-Samples
`);
    process.exit(1);
  }

  const sampleId = args[0];
  const localRepoPath = args[1];

  // Load samples-config-v3.json
  const configPath = path.join(__dirname, "..", ".config", "samples-config-v3.json");
  
  if (!fs.existsSync(configPath)) {
    console.error(`❌ Config file not found: ${configPath}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  
  // Find the sample
  const sample = config.samples.find(s => s.id === sampleId);
  
  if (!sample) {
    console.error(`❌ Sample '${sampleId}' not found in config`);
    process.exit(1);
  }

  if (!sample.downloadUrlInfo) {
    console.error(`❌ Sample '${sampleId}' does not have downloadUrlInfo (it's an internal sample)`);
    console.log(`   Use validate-all.js for internal samples.`);
    process.exit(1);
  }

  const { owner, repository, dir } = sample.downloadUrlInfo;
  
  console.log(`\n📋 Sample Info:`);
  console.log(`   ID: ${sampleId}`);
  console.log(`   Repository: ${owner}/${repository}`);
  console.log(`   Directory: ${dir}`);
  console.log(`   Local Repo: ${localRepoPath}`);

  // Calculate the sample path within the local repo
  const samplePath = path.join(localRepoPath, dir);
  
  if (!fs.existsSync(samplePath)) {
    console.error(`\n❌ Sample path not found: ${samplePath}`);
    console.log(`   Make sure you have cloned the repository and the path is correct.`);
    console.log(`\n   Expected: Clone ${owner}/${repository} to ${localRepoPath}`);
    process.exit(1);
  }

  console.log(`   Sample Path: ${samplePath}`);

  const validatorPath = path.join(__dirname, "validator.cjs");
  
  console.log(`\n🔍 Running validation...\n`);
  console.log("=".repeat(60));
  
  try {
    // Run validator with environment variable to pass config context
    const result = spawnSync("node", [validatorPath, "-p", samplePath], {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        ...process.env,
        SAMPLE_VALIDATOR_CONFIG_PATH: configPath,
        SAMPLE_VALIDATOR_EXPECTED_ID: sampleId,
      }
    });

    const output = result.stdout || "";
    const stderr = result.stderr || "";
    
    // Print the validation output
    console.log(output);
    if (stderr) {
      console.error(stderr);
    }

    console.log("=".repeat(60));
    
    // Parse output to find all failures (lines containing ❌)
    const failures = [];
    const warnings = [];
    const lines = output.split("\n");
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("❌")) {
        // Extract the error message after ❌
        const errorMsg = trimmedLine.replace(/^❌\s*/, "").trim();
        if (errorMsg) {
          failures.push(errorMsg);
        }
      } else if (trimmedLine.startsWith("⚠️")) {
        const warnMsg = trimmedLine.replace(/^⚠️\s*/, "").trim();
        if (warnMsg) {
          warnings.push(warnMsg);
        }
      }
    }

    // Summary section
    console.log(`\n${"=".repeat(60)}`);
    console.log(`📊 VALIDATION SUMMARY FOR: ${sampleId}`);
    console.log(`${"=".repeat(60)}`);
    
    if (failures.length > 0) {
      console.log(`\n❌ FAILED VALIDATIONS (${failures.length}):\n`);
      failures.forEach((f, i) => {
        console.log(`   ${i + 1}. ${f}`);
      });
      
      if (warnings.length > 0) {
        console.log(`\n⚠️  WARNINGS (${warnings.length}):\n`);
        warnings.forEach((w, i) => {
          console.log(`   ${i + 1}. ${w}`);
        });
      }
      
      console.log(`\n⚠️  Please fix these issues before submitting a PR.`);
      process.exit(1);
    } else {
      console.log(`\n✅ ALL CRITICAL VALIDATIONS PASSED!`);
      if (warnings.length > 0) {
        console.log(`\n⚠️  WARNINGS (${warnings.length}):\n`);
        warnings.forEach((w, i) => {
          console.log(`   ${i + 1}. ${w}`);
        });
      }
      console.log(`\n   The sample is ready for PR submission.`);
      console.log(`   Note: Warnings can be addressed in follow-up PRs.`);
    }
    
  } catch (error) {
    console.error(`\n❌ Validation failed with error:`, error.message);
    process.exit(1);
  }
}

main();
