#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This script validates all samples in the samples-config-v3.json file.
 * Similar to the CI pipeline behavior.
 * 
 * Usage:
 *   node validate-all.js [config-path]
 *   node validate-all.js                              # uses default path
 *   node validate-all.js ../.config/samples-config-v3.json
 * 
 * Options:
 *   --errors-only    Only show samples with errors (hide warnings and passed)
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Samples to skip (same as CI pipeline)
const EXCEPTIONS = ["incoming-webhook-notification", "hello-world-office-addin"];

function main() {
  const args = process.argv.slice(2);
  const errorsOnly = args.includes("--errors-only");
  const configArg = args.find(arg => !arg.startsWith("--"));
  
  // Default config path
  const configPath = configArg || path.join(__dirname, "..", ".config", "samples-config-v3.json");
  
  if (!fs.existsSync(configPath)) {
    console.error(`❌ Config file not found: ${configPath}`);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  
  // Filter out external samples (those with downloadUrlInfo)
  const samples = config.samples
    .filter(s => !s.downloadUrlInfo)
    .map(s => s.id)
    .filter(id => !EXCEPTIONS.includes(id));

  console.log(`\n📋 Validating ${samples.length} samples...\n`);
  
  const validatorPath = path.join(__dirname, "validator.cjs");
  const repoRoot = path.dirname(path.dirname(configPath));
  
  let failedCount = 0;
  let warningCount = 0;
  let passedCount = 0;
  const failedSamples = [];

  for (const sampleId of samples) {
    const samplePath = path.join(repoRoot, sampleId);
    
    if (!fs.existsSync(samplePath)) {
      console.log(`⏭️  Skipping '${sampleId}' (folder not found)`);
      continue;
    }

    try {
      const result = execSync(`node "${validatorPath}" -p "${samplePath}"`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"]
      });

      const hasError = result.includes("validation failed");
      const hasWarning = result.includes("warning");

      if (hasError) {
        console.log(`\n❌ Sample '${sampleId}' validation failed.`);
        console.log(result);
        failedCount++;
        failedSamples.push(sampleId);
      } else if (hasWarning) {
        if (!errorsOnly) {
          console.log(`⚠️  Sample '${sampleId}' passed with warnings.`);
        }
        warningCount++;
      } else {
        if (!errorsOnly) {
          console.log(`✅ Sample '${sampleId}' passed.`);
        }
        passedCount++;
      }
    } catch (error) {
      console.log(`\n❌ Sample '${sampleId}' validation failed.`);
      console.log(error.stdout || error.message);
      failedCount++;
      failedSamples.push(sampleId);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Validation Summary:");
  console.log(`   ✅ Passed: ${passedCount}`);
  console.log(`   ⚠️  Warnings: ${warningCount}`);
  console.log(`   ❌ Failed: ${failedCount}`);
  
  if (failedSamples.length > 0) {
    console.log("\n❌ Failed samples:");
    failedSamples.forEach(s => console.log(`   - ${s}`));
  }
  
  console.log("=".repeat(50) + "\n");

  process.exit(failedCount > 0 ? 1 : 0);
}

main();
