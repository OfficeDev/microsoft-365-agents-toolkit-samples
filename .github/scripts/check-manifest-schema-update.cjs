const fs = require("fs");
const path = require("path");

const { execSync } = require("child_process");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const SAMPLE_CONFIG_PATH = path.join(
  REPO_ROOT,
  ".config",
  "samples-config-v3.json",
);
const VALIDATOR_PATH = path.join(
  REPO_ROOT,
  "validation-tool",
  "src",
  "validators",
  "teamsAppManifestValidator.ts",
);

const MAX_PROBE_STEPS = 60;
const MAX_CONSECUTIVE_MISSES = 10;

function parseVersion(value) {
  if (!value || typeof value !== "string") return null;
  const match = value.trim().match(/^(\d+)\.(\d+)(?:\.(\d+))?$/);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3] || 0),
  };
}

function compareVersions(a, b) {
  if (!a && !b) return 0;
  if (!a) return -1;
  if (!b) return 1;
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}

function maxVersion(versions) {
  let max = null;
  for (const version of versions) {
    if (compareVersions(version, max) > 0) max = version;
  }
  return max;
}

function versionToString(version, includePatch = true) {
  if (!version) return "N/A";
  if (includePatch) return `${version.major}.${version.minor}.${version.patch}`;
  return `${version.major}.${version.minor}`;
}

function parseSchemaVersionFromUrl(schemaUrl) {
  if (!schemaUrl || typeof schemaUrl !== "string") return null;
  const match = schemaUrl.match(
    /\/teams\/v(\d+\.\d+)\/MicrosoftTeams\.schema\.json/i,
  );
  if (!match) return null;
  return parseVersion(match[1]);
}

function getTeamsSchemaUrl(version) {
  return `https://developer.microsoft.com/json-schemas/teams/v${version.major}.${version.minor}/MicrosoftTeams.schema.json`;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readValidatorBaseline() {
  const content = fs.readFileSync(VALIDATOR_PATH, "utf8");
  const match = content.match(/LATEST_MANIFEST_VERSION\s*=\s*"([^"]+)"/);
  if (!match) return null;
  return parseVersion(match[1]);
}

function safeReadManifest(manifestPath) {
  try {
    return readJson(manifestPath);
  } catch {
    return null;
  }
}

async function schemaExists(version) {
  const schemaUrl = getTeamsSchemaUrl(version);
  try {
    const response = await fetch(schemaUrl, {
      method: "GET",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return false;
    const contentType = response.headers.get("content-type") || "";
    return contentType.includes("json") || response.status === 200;
  } catch {
    return false;
  }
}

async function findLatestPublishedVersion(startVersion) {
  let latest = {
    major: startVersion.major,
    minor: startVersion.minor,
    patch: 0,
  };
  let consecutiveMisses = 0;

  for (let step = 1; step <= MAX_PROBE_STEPS; step++) {
    const candidate = {
      major: startVersion.major,
      minor: startVersion.minor + step,
      patch: 0,
    };

    if (await schemaExists(candidate)) {
      latest = candidate;
      consecutiveMisses = 0;
    } else {
      consecutiveMisses += 1;
      if (consecutiveMisses >= MAX_CONSECUTIVE_MISSES) break;
    }
  }

  const nextMajorBase = { major: startVersion.major + 1, minor: 0, patch: 0 };
  if (await schemaExists(nextMajorBase)) {
    latest = nextMajorBase;
    consecutiveMisses = 0;
    for (let step = 1; step <= 20; step++) {
      const candidate = {
        major: nextMajorBase.major,
        minor: step,
        patch: 0,
      };
      if (await schemaExists(candidate)) {
        latest = candidate;
        consecutiveMisses = 0;
      } else {
        consecutiveMisses += 1;
        if (consecutiveMisses >= 5) break;
      }
    }
  }

  return latest;
}

async function fetchSchemaJson(version) {
  const schemaUrl = getTeamsSchemaUrl(version);
  try {
    const response = await fetch(schemaUrl, {
      method: "GET",
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return null;
    // Workaround for historical invalid regex in some schema versions.
    const text = (await response.text()).replace(/\\a/g, "\\x07");
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function uniqueSorted(arr) {
  return [...new Set(arr)].sort();
}

function analyzeSchemaDiff(currentSchema, latestSchema) {
  const currentProps = Object.keys(currentSchema?.properties || {});
  const latestProps = Object.keys(latestSchema?.properties || {});

  const currentRequired = Array.isArray(currentSchema?.required)
    ? currentSchema.required
    : [];
  const latestRequired = Array.isArray(latestSchema?.required)
    ? latestSchema.required
    : [];

  const addedProperties = uniqueSorted(
    latestProps.filter((name) => !currentProps.includes(name)),
  );
  const removedProperties = uniqueSorted(
    currentProps.filter((name) => !latestProps.includes(name)),
  );

  const addedRequired = uniqueSorted(
    latestRequired.filter((name) => !currentRequired.includes(name)),
  );
  const removedRequired = uniqueSorted(
    currentRequired.filter((name) => !latestRequired.includes(name)),
  );

  const commonProps = latestProps.filter((name) => currentProps.includes(name));
  const changedPropertyShape = [];
  for (const name of commonProps) {
    const currentDef = currentSchema.properties?.[name];
    const latestDef = latestSchema.properties?.[name];
    if (!currentDef || !latestDef) continue;
    const currentType = JSON.stringify(currentDef.type || null);
    const latestType = JSON.stringify(latestDef.type || null);
    if (currentType !== latestType) {
      changedPropertyShape.push({ name, currentType, latestType });
    }
  }

  const currentDefinitions = Object.keys(
    currentSchema?.definitions || {},
  ).length;
  const latestDefinitions = Object.keys(latestSchema?.definitions || {}).length;

  return {
    addedProperties,
    removedProperties,
    addedRequired,
    removedRequired,
    changedPropertyShape,
    currentDefinitions,
    latestDefinitions,
  };
}

function toListText(items, limit = 10) {
  if (!items || items.length === 0) return "none";
  const shown = items.slice(0, limit).join(", ");
  if (items.length <= limit) return shown;
  return `${shown} (+${items.length - limit} more)`;
}

function buildFallbackSchemaSummary(
  diff,
  currentVersion,
  latestVersion,
  impactedCount,
) {
  return [
    `Latest Teams schema ${versionToString(latestVersion, false)} was compared with currently used ${versionToString(currentVersion, false)}.`,
    `Potentially impacted samples: ${impactedCount}.`,
    `Added top-level properties: ${toListText(diff.addedProperties)}.`,
    `Removed top-level properties: ${toListText(diff.removedProperties)}.`,
    `Added required fields: ${toListText(diff.addedRequired)}.`,
    `Removed required fields: ${toListText(diff.removedRequired)}.`,
    `Properties with type-shape changes: ${diff.changedPropertyShape.length}.`,
    `Definitions count changed from ${diff.currentDefinitions} to ${diff.latestDefinitions}.`,
  ].join(" ");
}

function generateAISchemaSummary(
  diff,
  currentVersion,
  latestVersion,
  impactedCount,
) {
  // Check if COPILOT_TOKEN is available for CLI-based summary generation
  const copilotToken = process.env.COPILOT_TOKEN || "";

  if (!copilotToken) {
    return {
      source: "fallback",
      text: "AI summary unavailable because no token was provided. Set COPILOT_TOKEN.",
    };
  }

  const promptPayload = {
    currentVersion: versionToString(currentVersion, false),
    latestVersion: versionToString(latestVersion, false),
    impactedSampleCount: impactedCount,
    addedProperties: diff.addedProperties,
    removedProperties: diff.removedProperties,
    addedRequired: diff.addedRequired,
    removedRequired: diff.removedRequired,
    changedPropertyShapeCount: diff.changedPropertyShape.length,
    changedPropertyShapeExamples: diff.changedPropertyShape.slice(0, 15),
    definitionsCount: {
      current: diff.currentDefinitions,
      latest: diff.latestDefinitions,
    },
  };

  const prompt = `Summarize the Teams manifest schema change data below. Output 5-8 bullet points covering: what changed, likely impact on existing Teams app manifests, validation risk, and upgrade priority.\n\n${JSON.stringify(promptPayload, null, 2)}`;

  try {
    // Invoke Copilot CLI via command line following GitHub's official Actions pattern
    // https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/automate-with-actions
    const result = execSync(
      `copilot -p ${JSON.stringify(prompt)} --allow-tool=none --no-ask-user`,
      {
        encoding: "utf-8",
        timeout: 30000,
        env: { ...process.env, COPILOT_TOKEN: copilotToken },
        stdio: ["pipe", "pipe", "pipe"],
      },
    );

    if (!result || typeof result !== "string") {
      return {
        source: "fallback",
        text: "AI summary unavailable because CLI response was empty.",
      };
    }

    return {
      source: "ai",
      text: result.trim(),
    };
  } catch (error) {
    return {
      source: "fallback",
      text: `AI summary unavailable due to CLI error: ${error.message}`,
    };
  }
}

function buildIssueBody(report) {
  const impactedExamples = report.impactedSamples.slice(0, 20);
  const impactedLines = impactedExamples.length
    ? impactedExamples
        .map((sample) => `- ${sample.id}: ${sample.currentVersion}`)
        .join("\n")
    : "- None";

  const moreLine =
    report.impactedSamples.length > impactedExamples.length
      ? `\n- ...and ${report.impactedSamples.length - impactedExamples.length} more sample(s)`
      : "";

  return [
    `<!-- manifest-schema-version:${report.markerVersion} -->`,
    "## Manifest Schema Update Detected",
    "",
    "A newer Teams app manifest schema appears to be published upstream.",
    "",
    "## Change Summary",
    "",
    `- Latest published schema: ${report.latestPublishedMinor}`,
    `- Currently used max schema/manifest version in samples: ${report.repoMaxVersion}`,
    `- Validator baseline: ${report.validatorBaseline}`,
    `- Drift reason: ${report.driftReason}`,
    "",
    "## AI Summary of Teams Schema Changes",
    "",
    `Source: ${report.aiSummarySource}`,
    report.aiSummaryText,
    "",
    "## Impact",
    "",
    `- Samples potentially needing manifest/schema upgrade: ${report.impactedSamples.length}`,
    `- Samples currently on preview manifestVersion (devPreview): ${report.previewSamples.length}`,
    "",
    "Representative impacted samples:",
    impactedLines + moreLine,
    "",
    "## Recommended Upgrade Tasks",
    "",
    "- Update validation baseline in validation-tool/src/validators/teamsAppManifestValidator.ts",
    "- Update affected sample appPackage/manifest.json files to the newer schema/manifest version where applicable",
    "- Run sample validation workflow and fix any schema validation regressions",
    "- Update documentation/templates that reference older manifest versions",
    "",
    "## Notes",
    "",
    `- Checked Teams schema URL pattern: ${report.checkedPattern}`,
    `- Generated by workflow run: ${process.env.GITHUB_SERVER_URL || "https://github.com"}/${process.env.GITHUB_REPOSITORY || ""}/actions/runs/${process.env.GITHUB_RUN_ID || ""}`,
    "",
    "Please route this for Copilot-driven upgrade work.",
  ].join("\n");
}

function setOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (!outputFile) return;

  if (value.includes("\n")) {
    const delimiter = `EOF_${name}`;
    fs.appendFileSync(
      outputFile,
      `${name}<<${delimiter}\n${value}\n${delimiter}\n`,
    );
  } else {
    fs.appendFileSync(outputFile, `${name}=${value}\n`);
  }
}

async function main() {
  const sampleConfig = readJson(SAMPLE_CONFIG_PATH);
  const localSamples = (sampleConfig.samples || []).filter(
    (sample) => !sample.downloadUrlInfo,
  );

  const manifestInfos = [];
  const candidateVersions = [];

  for (const sample of localSamples) {
    const manifestPath = path.join(
      REPO_ROOT,
      sample.id,
      "appPackage",
      "manifest.json",
    );
    if (!fs.existsSync(manifestPath)) continue;

    const manifest = safeReadManifest(manifestPath);
    if (!manifest) continue;

    const manifestVersionRaw = String(manifest.manifestVersion || "");
    const manifestVersion = parseVersion(manifestVersionRaw);
    const schemaVersion = parseSchemaVersionFromUrl(manifest.$schema);

    if (manifestVersion) candidateVersions.push(manifestVersion);
    if (schemaVersion) candidateVersions.push(schemaVersion);

    manifestInfos.push({
      id: sample.id,
      path: path.relative(REPO_ROOT, manifestPath),
      manifestVersionRaw,
      manifestVersion,
      schemaVersion,
    });
  }

  const validatorBaseline = readValidatorBaseline();
  const repoMaxVersion = maxVersion(candidateVersions);
  const probeStart = maxVersion([validatorBaseline, repoMaxVersion]) || {
    major: 1,
    minor: 0,
    patch: 0,
  };
  const latestPublished = await findLatestPublishedVersion(probeStart);

  const previewSamples = manifestInfos.filter(
    (manifest) => manifest.manifestVersionRaw === "devPreview",
  );
  const impactedSamples = manifestInfos
    .filter((manifest) => {
      if (!manifest.manifestVersion) return false;
      if (manifest.manifestVersionRaw === "devPreview") return false; // devPreview does not need updates
      return compareVersions(manifest.manifestVersion, latestPublished) < 0;
    })
    .map((manifest) => ({
      id: manifest.id,
      currentVersion: manifest.manifestVersionRaw || "unknown",
      path: manifest.path,
    }));

  const hasValidatorDrift =
    compareVersions(latestPublished, validatorBaseline) > 0;
  const hasRepoDrift = compareVersions(latestPublished, repoMaxVersion) > 0;
  const driftDetected = hasValidatorDrift || hasRepoDrift;

  const driftReasonParts = [];
  if (hasValidatorDrift) driftReasonParts.push("validator baseline is behind");
  if (hasRepoDrift) driftReasonParts.push("sample manifests are behind");
  const driftReason = driftReasonParts.length
    ? driftReasonParts.join(" and ")
    : "no drift";

  let aiSummaryText =
    "No schema delta summary generated because versions are not comparable.";
  let aiSummarySource = "none";

  if (
    repoMaxVersion &&
    latestPublished &&
    compareVersions(latestPublished, repoMaxVersion) > 0
  ) {
    const [currentSchema, latestSchema] = await Promise.all([
      fetchSchemaJson(repoMaxVersion),
      fetchSchemaJson(latestPublished),
    ]);

    if (currentSchema && latestSchema) {
      const diff = analyzeSchemaDiff(currentSchema, latestSchema);
      const ai = generateAISchemaSummary(
        diff,
        repoMaxVersion,
        latestPublished,
        impactedSamples.length,
      );
      aiSummarySource = ai.source;
      aiSummaryText = ai.text;

      if (ai.source !== "ai") {
        aiSummaryText = `${ai.text}\n\nFallback summary: ${buildFallbackSchemaSummary(
          diff,
          repoMaxVersion,
          latestPublished,
          impactedSamples.length,
        )}`;
      }
    } else {
      aiSummarySource = "fallback";
      aiSummaryText =
        "AI summary unavailable because one of the schema versions could not be fetched.";
    }
  }

  const markerVersion = `teams:${versionToString(latestPublished, false)}`;

  const report = {
    markerVersion,
    latestPublishedMinor: versionToString(latestPublished, false),
    validatorBaseline: versionToString(validatorBaseline),
    repoMaxVersion: versionToString(repoMaxVersion),
    driftReason,
    impactedSamples,
    previewSamples,
    checkedPattern:
      "https://developer.microsoft.com/json-schemas/teams/v{major}.{minor}/MicrosoftTeams.schema.json",
    aiSummarySource,
    aiSummaryText,
  };

  const issueTitle = `Schema update detected: Teams v${report.latestPublishedMinor}`;
  const issueBody = buildIssueBody(report);

  const output = {
    driftDetected,
    latestPublishedMinor: report.latestPublishedMinor,
    validatorBaseline: report.validatorBaseline,
    repoMaxVersion: report.repoMaxVersion,
    impactedSampleCount: impactedSamples.length,
    previewSampleCount: previewSamples.length,
    driftReason: report.driftReason,
    aiSummarySource,
    markerVersion,
    issueTitle,
    issueBody,
  };

  console.log(JSON.stringify(output, null, 2));

  setOutput("drift_detected", String(driftDetected));
  setOutput("drift_marker_version", markerVersion);
  setOutput("latest_published_minor", report.latestPublishedMinor);
  setOutput("validator_baseline", report.validatorBaseline);
  setOutput("repo_max_version", report.repoMaxVersion);
  setOutput("impacted_sample_count", String(impactedSamples.length));
  setOutput("drift_reason", report.driftReason);
  setOutput("ai_summary_source", aiSummarySource);
  setOutput("issue_title", issueTitle);
  setOutput("issue_body", issueBody);
}

main().catch((error) => {
  console.error("Manifest schema check failed:", error);
  process.exitCode = 1;
});
