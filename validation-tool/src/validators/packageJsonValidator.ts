// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { satisfies } from "compare-versions";
import fs from "fs-extra";
import path from "path";

import { Result } from "../resultType";
import { detectProjectType } from "../projectDetector";

/**
 * Rule 1: 'engines.node' field should be compatible with 22.
 * Note: C# projects don't have package.json, so this validation is skipped for them.
 *
 * @param projectDir root directory of the project
 * @returns validation result
 */
export default async function validatePackageJson(
  projectDir: string
): Promise<Result> {
  const result: Result = {
    name: "package.json",
    passed: [],
    failed: [],
    warning: [],
  };

  const projectPaths = await detectProjectType(projectDir);
  const { projectType } = projectPaths;

  const filePath = path.join(projectDir, "package.json");
  if (!(await fs.exists(filePath))) {
    // C# projects don't have package.json
    if (projectType === "csharp") {
      result.passed = [`C# project does not require package.json.`];
      return result;
    }
    result.failed = [`package.json does not exist.`];
    return result;
  }
  const fileContent = await fs.readFile(filePath, "utf8");
  try {
    const packageJson = JSON.parse(fileContent);
    if (!packageJson.engines || !packageJson.engines.node) {
      result.warning = [`package.json does not have 'engines.node' field.`];
      return result;
    }
    if (!satisfies("22.0.0", packageJson.engines.node)) {
      result.warning = [`'engines.node' field should be compatible with 22.`];
      return result;
    }
  } catch (error: unknown) {
    result.failed = [`package.json is not a valid JSON file.`];
    return result;
  }
  result.passed = [`'engines.node' field is compatible with 22.`];
  return result;
}
