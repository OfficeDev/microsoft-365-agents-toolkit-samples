// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import semver from "semver";
import { Result } from "../resultType";
import { detectProjectType } from "../projectDetector";

const LATEST_MANIFEST_VERSION = "1.22.0";
const MANIFEST_PREVIEW_VERSION = "devPreview";

/**
 * Rule 1: Manifest id is referencing placeholder from env: ${{TEAMS_APP_ID}}
 * Rule 2: Manifest version should be latest to align with TTK
 *
 * @param projectDir root directory of the project
 * @returns validation result
 */
export default async function validateTeamsAppManifest(
  projectDir: string
): Promise<Result> {
  const result: Result = {
    name: "App Manifest",
    passed: [],
    failed: [],
    warning: [],
  };

  const projectPaths = await detectProjectType(projectDir);
  const { agentDir, displayPrefix } = projectPaths;

  const manifestFile = path.join(agentDir, "appPackage", "manifest.json");
  if (!(await fs.exists(manifestFile))) {
    result.failed = [`${displayPrefix}appPackage/manifest.json does not exist.`];
    return result;
  }
  const fileContent = await fs.readFile(manifestFile, "utf8");
  let jsonData: Record<string, unknown> | undefined;
  try {
    jsonData = JSON.parse(fileContent);
  } catch (e: unknown) {}
  if (!jsonData) {
    result.failed.push(`appPackage/manifest.json is not a valid JSON file.`);
    return result;
  }
  const appId = jsonData.id;
  if (!appId || appId !== "${{TEAMS_APP_ID}}") {
    result.failed.push(`id should be equal to '\${{TEAMS_APP_ID}}'.`);
  } else {
    result.passed.push(
      `id is referencing placeholder from env: \${{TEAMS_APP_ID}}.`
    );
  }
  if (jsonData.manifestVersion === MANIFEST_PREVIEW_VERSION) {
    result.warning.push(
      `Manifest version(${MANIFEST_PREVIEW_VERSION}) is using preview version.`
    );
  } else {
    const manifestVersion = semver.coerce(jsonData.manifestVersion as string);
    if (
      manifestVersion &&
      semver.eq(manifestVersion, LATEST_MANIFEST_VERSION)
    ) {
      result.passed.push(
        `Manifest version is aligned with Microsoft 365 Agents Toolkit.`
      );
    } else {
      result.warning.push(
        `Manifest version(${jsonData.manifestVersion}) is NOT aligned with Microsoft 365 Agents Toolkit(${LATEST_MANIFEST_VERSION}).`
      );
    }
  }
  return result;
}
