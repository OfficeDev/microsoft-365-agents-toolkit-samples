// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";

import { Result } from "../resultType";
import { detectProjectType, ProjectPaths } from "../projectDetector";

// Required folders relative to agentDir
const requiredAgentFolders = ["appPackage"];

// Required files relative to agentDir
const requiredAgentFiles = [
  "appPackage/manifest.json",
  "appPackage/color.png",
  "appPackage/outline.png",
  "m365agents.yml",
  "m365agents.local.yml",
];

// Required files relative to rootDir
const requiredRootFiles = ["README.md"];

// Files/folders that are required for TypeScript projects but optional for C# projects
const tsOnlyFiles = ["env/.env.dev"];
const tsOnlyFolders = ["env", ".vscode"];

async function checkFolderExists(
  dir: string,
  folder: string
): Promise<boolean> {
  const folderPath = path.join(dir, folder);
  if (!(await fs.exists(folderPath))) {
    return false;
  }
  const stat = await fs.stat(folderPath);
  return stat.isDirectory();
}

async function checkFileExists(dir: string, file: string): Promise<boolean> {
  const filePath = path.join(dir, file);
  if (!(await fs.exists(filePath))) {
    return false;
  }
  const stat = await fs.stat(filePath);
  return stat.isFile();
}

/**
 * Find files matching a glob pattern in a directory
 */
async function findFilesWithExtension(
  dir: string,
  extension: string
): Promise<string[]> {
  if (!(await fs.exists(dir))) {
    return [];
  }
  const files = await fs.readdir(dir);
  return files.filter((file) => file.endsWith(extension));
}

export default async function validateFolderStructure(
  projectDir: string
): Promise<Result> {
  const result: Result = {
    name: "Folder Structure",
    passed: [],
    failed: [],
    warning: [],
  };

  const projectPaths: ProjectPaths = await detectProjectType(projectDir);
  const { agentDir, rootDir, displayPrefix, projectType } = projectPaths;

  // Check required folders in agentDir
  for (const folder of requiredAgentFolders) {
    const displayPath = displayPrefix + folder;
    if (await checkFolderExists(agentDir, folder)) {
      result.passed.push(`Project has "${displayPath}" folder.`);
    } else {
      result.failed.push(`Project should have "${displayPath}" folder.`);
    }
  }

  // Check TypeScript-only folders (optional for C# projects)
  for (const folder of tsOnlyFolders) {
    // Check both in agentDir and rootDir
    const inAgent = await checkFolderExists(agentDir, folder);
    const inRoot = await checkFolderExists(rootDir, folder);
    if (inAgent || inRoot) {
      const location = inAgent ? displayPrefix + folder : folder;
      result.passed.push(`Project has "${location}" folder.`);
    } else if (projectType === "typescript") {
      result.failed.push(`Project should have "${folder}" folder.`);
    }
    // For C# projects, these folders are optional - no warning needed
  }

  // Check required files in agentDir
  for (const file of requiredAgentFiles) {
    const displayPath = displayPrefix + file;
    if (await checkFileExists(agentDir, file)) {
      result.passed.push(`Project has "${displayPath}" file.`);
    } else {
      result.failed.push(`Project should have "${displayPath}" file.`);
    }
  }

  // Check required files in rootDir
  for (const file of requiredRootFiles) {
    if (await checkFileExists(rootDir, file)) {
      result.passed.push(`Project has "${file}" file.`);
    } else {
      result.failed.push(`Project should have "${file}" file.`);
    }
  }

  // Check TypeScript-only files (optional for C# projects)
  for (const file of tsOnlyFiles) {
    // Check both in agentDir and rootDir
    const inAgent = await checkFileExists(agentDir, file);
    const inRoot = await checkFileExists(rootDir, file);
    if (inAgent || inRoot) {
      const location = inAgent ? displayPrefix + file : file;
      result.passed.push(`Project has "${location}" file.`);
    } else if (projectType === "typescript") {
      result.failed.push(`Project should have "${file}" file.`);
    }
    // For C# projects, these files are optional - no warning needed
  }

  // C# specific checks
  if (projectType === "csharp") {
    // Check for .sln or .slnx file in rootDir
    const slnFiles = await findFilesWithExtension(rootDir, ".sln");
    const slnxFiles = await findFilesWithExtension(rootDir, ".slnx");
    if (slnFiles.length > 0 || slnxFiles.length > 0) {
      const solutionFile = slnFiles.length > 0 ? slnFiles[0] : slnxFiles[0];
      result.passed.push(`Project has solution file "${solutionFile}".`);
    } else {
      result.failed.push(`C# project should have a .sln or .slnx solution file.`);
    }

    // Check for .csproj file (can be in various subdirectories)
    const csprojInRoot = await findFilesWithExtension(rootDir, ".csproj");
    let foundCsproj = csprojInRoot.length > 0;
    let csprojLocation = csprojInRoot.length > 0 ? csprojInRoot[0] : "";

    // Also check common C# project directories
    const csharpProjectDirs = ["M365Agent", "TravelAgent", "AzureAgentToM365ATK"];
    for (const subdir of csharpProjectDirs) {
      const subdirPath = path.join(rootDir, subdir);
      if (await fs.exists(subdirPath)) {
        const csprojFiles = await findFilesWithExtension(subdirPath, ".csproj");
        if (csprojFiles.length > 0) {
          foundCsproj = true;
          csprojLocation = `${subdir}/${csprojFiles[0]}`;
          break;
        }
      }
    }

    if (foundCsproj) {
      result.passed.push(`Project has .csproj file "${csprojLocation}".`);
    } else {
      result.failed.push(`C# project should have a .csproj project file.`);
    }

    // Check for appsettings.json (can be in various subdirectories)
    let foundAppsettings = await checkFileExists(rootDir, "appsettings.json");
    let appsettingsLocation = "appsettings.json";

    if (!foundAppsettings) {
      for (const subdir of csharpProjectDirs) {
        const subdirPath = path.join(rootDir, subdir);
        if (await checkFileExists(subdirPath, "appsettings.json")) {
          foundAppsettings = true;
          appsettingsLocation = `${subdir}/appsettings.json`;
          break;
        }
      }
    }

    if (foundAppsettings) {
      result.passed.push(`Project has "${appsettingsLocation}" file.`);
    } else {
      result.failed.push(`C# project should have an appsettings.json file.`);
    }
  }

  return result;
}
