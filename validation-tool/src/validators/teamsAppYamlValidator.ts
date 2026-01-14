// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import YAML from "yaml";
import semver from "semver";

import { Result } from "../resultType";
import { detectProjectType, getExpectedSampleId } from "../projectDetector";

/**
 * Historical exceptions where sampleTag name differs from config id.
 * Key: sample id in samples-config-v3.json
 * Value: allowed sampleTag name in m365agents.yml
 */
const SAMPLE_ID_ADHOC_FIXES: Record<string, string> = {
  // First Party (TeamsFx-Samples) - sampleTag differs from config id
  "bot-sso-docker": "sso-bot-docker",
  "NPM-search-connector-M365": "npm-search-connector-M365", // case difference
  "sso-enabled-tab-via-apim-proxy": "sso-tab-via-apim-proxy",
  "hello-world-tab-docker": "hello-world-tab-with-backend", // completely different
  "copilot-connector-app": "graph-connector-app",
  // 3rd Party - sampleTag differs from config id
  "graph-rsc-helper": "graph-rsc-nodeJs",
};

interface SampleConfig {
  id: string;
  tags?: string[];
}

interface SamplesConfig {
  samples: SampleConfig[];
}

/**
 * Get config paths to try for finding samples-config-v3.json.
 * Supports external config path via environment variable SAMPLE_VALIDATOR_CONFIG_PATH.
 */
function getConfigPaths(projectDir: string): string[] {
  const paths: string[] = [];
  
  // Check for external config path from environment variable (for validating external samples)
  const externalConfigPath = process.env.SAMPLE_VALIDATOR_CONFIG_PATH;
  if (externalConfigPath && fs.existsSync(externalConfigPath)) {
    paths.push(externalConfigPath);
  }
  
  // Default paths relative to project
  paths.push(
    path.join(projectDir, "..", ".config", "samples-config-v3.json"),
    path.join(projectDir, ".config", "samples-config-v3.json"),
  );
  
  return paths;
}

/**
 * Get sample ID from samples-config-v3.json based on expected sample ID
 * Returns the id from config if found, or null
 */
async function getSampleIdFromConfig(projectDir: string): Promise<string | null> {
  const expectedId = getExpectedSampleId(projectDir);
  const configPaths = getConfigPaths(projectDir);
  
  for (const configPath of configPaths) {
    if (await fs.exists(configPath)) {
      try {
        const config: SamplesConfig = await fs.readJson(configPath);
        const sample = config.samples.find(s => s.id === expectedId);
        if (sample) {
          return sample.id;
        }
      } catch {
        // Ignore parse errors
      }
    }
  }
  
  return null;
}

// Required lifecycle stages
const requiredLifecycleActions = [
  {
    name: "provision",
    actions: ["teamsApp/create"],
    required: true,
  },
  {
    name: "deploy",
    actions: [],
    required: true,
  },
];

// Optional lifecycle stages (will generate warning if missing)
const optionalLifecycleActions = [
  {
    name: "publish",
    actions: ["teamsApp/publishAppPackage"],
  },
];

// Minimum version required for sampleTag support
const MIN_VERSION_FOR_SAMPLE_TAG = "1.2.0";

/**
 * Rule 1: no projectId
 * Rule 2: has provision lifecycle actions
 * Rule 3: has deploy lifecycle actions
 * Rule 4: has publish lifecycle actions (warning if missing)
 * Rule 5: provision has 'teamsApp/create' action which has TEAMS_APP_ID env variable
 * Rule 6: has sampleTag with format 'repo:name'
 * Rule 7: sampleTag name must match sample id (folder name)
 * Rule 8: version must be >= v1.2 to support sampleTag
 *
 * @param projectDir root directory of the project
 * @returns validation result
 */
export default async function validateTeamsAppYaml(
  projectDir: string
): Promise<Result> {
  const result: Result = {
    name: "teamsapp.yaml",
    passed: [],
    failed: [],
    warning: [],
  };

  const projectPaths = await detectProjectType(projectDir);
  const { agentDir, displayPrefix } = projectPaths;

  const yamlFile = path.join(agentDir, "m365agents.yml");
  if (!(await fs.exists(yamlFile))) {
    result.failed = [`${displayPrefix}m365agents.yml does not exist.`];
    return result;
  }
  const fileContent = await fs.readFile(yamlFile, "utf8");
  const yamlData = YAML.parse(fileContent);

  // Rule 1: projectId check
  const projectId = yamlData && yamlData.projectId;
  if (projectId && projectId !== "") {
    result.failed.push(`Project should NOT have projectId in m365agents.yml.`);
  } else {
    result.passed.push(`Project has no projectId in m365agents.yml.`);
  }

  // Rule 8: version check (must be >= v1.2 for sampleTag support)
  const version = yamlData?.version as string | undefined;
  if (version) {
    // Parse version like "v1.9" or "1.9" to extract the numeric part and convert to semver
    const versionMatch = version.match(/^v?(\d+)(?:\.(\d+))?/);
    if (versionMatch) {
      const major = versionMatch[1];
      const minor = versionMatch[2] || "0";
      const semverVersion = `${major}.${minor}.0`;
      const coercedVersion = semver.coerce(semverVersion);
      
      if (coercedVersion && semver.gte(coercedVersion, MIN_VERSION_FOR_SAMPLE_TAG)) {
        result.passed.push(
          `Version (${version}) supports sampleTag (>= v1.2).`
        );
      } else {
        result.failed.push(
          `Version (${version}) must be >= v1.2 to support sampleTag.`
        );
      }
    } else {
      result.failed.push(
        `Version (${version}) is not a valid version format.`
      );
    }
  } else {
    result.failed.push(`Project should have version field in m365agents.yml.`);
  }

  // Rule 2: required lifecycle check
  for (const lifecycle of requiredLifecycleActions) {
    const actions = yamlData[lifecycle.name] as any[];
    const failures: string[] = [];
    if (!actions) {
      result.failed.push(
        `Project should have '${lifecycle.name}' stage in m365agents.yml.`
      );
      continue;
    }
    for (const actionName of lifecycle.actions) {
      if (
        actions &&
        actions.findIndex(
          (action: { uses: string }) => action.uses === actionName
        ) < 0
      ) {
        failures.push(
          `Project should have '${actionName}' action in ${lifecycle.name} stage.`
        );
      }
      // Rule 5: special checks for 'teamsApp/create' action
      if (lifecycle.name === "provision" && actionName === "teamsApp/create") {
        const actionIndex = actions.findIndex(
          (action: { uses: string }) => action.uses === actionName
        );
        if (actionIndex >= 0) {
          const action = actions[actionIndex];
          if (action.writeToEnvironmentFile?.teamsAppId === "TEAMS_APP_ID") {
            result.passed.push(
              `Project has 'teamsApp/create' action which has TEAMS_APP_ID env variable.`
            );
          } else {
            result.failed.push(
              `Project should have 'teamsApp/create' action which has TEAMS_APP_ID env variable.`
            );
          }
        }
      }
    }
    if (failures.length === 0) {
      result.passed.push(
        `Project has all mandatory actions in ${lifecycle.name} stage.`
      );
    } else {
      result.failed.push(...failures);
    }
  }

  // Rule 4: optional lifecycle check (warning if missing)
  for (const lifecycle of optionalLifecycleActions) {
    const actions = yamlData[lifecycle.name] as any[];
    if (!actions) {
      result.warning.push(
        `Project does not have '${lifecycle.name}' stage in m365agents.yml.`
      );
      continue;
    }
    let hasAllActions = true;
    for (const actionName of lifecycle.actions) {
      if (
        actions.findIndex(
          (action: { uses: string }) => action.uses === actionName
        ) < 0
      ) {
        result.warning.push(
          `Project does not have '${actionName}' action in ${lifecycle.name} stage.`
        );
        hasAllActions = false;
      }
    }
    if (hasAllActions) {
      result.passed.push(
        `Project has all actions in ${lifecycle.name} stage.`
      );
    }
  }

  // Rule 6 & 7: sampleTag check
  const sampleTagRegex = /^([\w-]+):([\w-]+)$/g;
  const sampleTag = (
    yamlData?.additionalMetadata as { sampleTag: string } | undefined
  )?.sampleTag;
  const expectedSampleId = await getSampleIdFromConfig(projectDir);
  let validSampleTag = false;
  if (sampleTag && sampleTag !== "") {
    const match = sampleTagRegex.exec(sampleTag);
    if (match) {
      const repoName = match[1];
      const sampleName = match[2];
      
      result.passed.push(`Project has sampleTag with format 'repo:name'.`);
      validSampleTag = true;
      
      if (repoName !== "TeamsFx-Samples") {
        result.warning.push(`Project is an external sample.`);
      }
      
      // Rule 7: Check if sampleTag name matches sample id from config
      if (expectedSampleId !== null) {
        // Check for historical exceptions
        const allowedSampleTagName = SAMPLE_ID_ADHOC_FIXES[expectedSampleId];
        const isMatch = sampleName === expectedSampleId || sampleName === allowedSampleTagName;
        
        if (!isMatch) {
          result.failed.push(
            `sampleTag name '${sampleName}' does not match sample id '${expectedSampleId}' in samples-config-v3.json.`
          );
        } else {
          if (sampleName === allowedSampleTagName) {
            result.passed.push(
              `sampleTag name '${sampleName}' matches allowed exception for sample id '${expectedSampleId}'.`
            );
          } else {
            result.passed.push(
              `sampleTag name '${sampleName}' matches sample id in config.`
            );
          }
        }
      }
    }
  }
  if (!validSampleTag) {
    result.failed.push(
      `Project should have sampleTag with format 'repo:name'.`
    );
  }
  return result;
}
