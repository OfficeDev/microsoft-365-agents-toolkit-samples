// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import dotenv from "dotenv";
import fs from "fs-extra";
import path from "path";
import { Result } from "../resultType";
import { detectProjectType } from "../projectDetector";

/**
 * Rule 1: env files shouldn't contain actual value for the environment variables except for TEAMSFX_ENV, TEAMS_APP_NAME and A365 SDK variables
 *
 * @param projectDir root directory of the project
 * @returns validation result
 */
export default async function validateEnvFiles(
  projectDir: string
): Promise<Result> {
  const result: Result = {
    name: "Env Files",
    passed: [],
    failed: [],
    warning: [],
  };

  const projectPaths = await detectProjectType(projectDir);
  const { agentDir, displayPrefix, projectType } = projectPaths;

  const files = [".env.dev", ".env.local"];
  let foundAnyEnvFile = false;

  for (const envFile of files) {
    const filePath = path.join(agentDir, "env", envFile);
    if (!(await fs.exists(filePath))) {
      // For C# projects, env files are optional
      if (projectType === "csharp") {
        continue;
      }
      result.warning.push(`${displayPrefix}${path.join("env", envFile)} does not exist.`);
      continue;
    }
    foundAnyEnvFile = true;
    const fileContent = await fs.readFile(filePath, "utf8");
    const envData = dotenv.parse(fileContent);
    const mappings = Object.entries(envData).map(([key, value]) => ({
      name: key,
      value: value,
    }));
    let validEnv = true;
    for (const kv of mappings) {
      if (
        kv.name === "TEAMSFX_ENV" ||
        kv.name === "APP_NAME_SUFFIX" ||
        kv.name === "TEAMS_APP_NAME" ||
        kv.name.startsWith("connectionsMap__0") ||
        kv.name.startsWith("agentic_")
      ) {
        continue;
      } else if (kv.value !== "") {
        result.failed.push(`${displayPrefix}${envFile}: ${kv.name} should NOT have value.`);
        validEnv = false;
      }
    }
    if (validEnv) {
      result.passed.push(`${displayPrefix}${envFile}: All environment variables are valid.`);
    }
  }

  // For C# projects without env files, that's okay
  if (projectType === "csharp" && !foundAnyEnvFile) {
    result.passed.push(`C# project does not require env files.`);
  }

  return result;
}
