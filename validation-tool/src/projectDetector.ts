// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";

export type ProjectType = "typescript" | "csharp";

export interface ProjectPaths {
  projectType: ProjectType;
  rootDir: string;
  // The directory containing m365agents.yml, appPackage, env, etc.
  agentDir: string;
  // Relative path prefix for display (empty for TS, "M365Agent/" for C#)
  displayPrefix: string;
}

interface SampleConfig {
  id: string;
  tags: string[];
}

interface SamplesConfig {
  samples: SampleConfig[];
}

/**
 * Check if a sample is a C# project by reading samples-config-v3.json
 */
async function isCSharpFromConfig(projectDir: string): Promise<boolean> {
  const sampleId = path.basename(projectDir);
  
  // Try to find samples-config-v3.json relative to the project
  const configPaths = [
    path.join(projectDir, "..", ".config", "samples-config-v3.json"),
    path.join(projectDir, ".config", "samples-config-v3.json"),
  ];
  
  for (const configPath of configPaths) {
    if (await fs.exists(configPath)) {
      try {
        const config: SamplesConfig = await fs.readJson(configPath);
        const sample = config.samples.find(s => s.id === sampleId);
        if (sample && sample.tags) {
          return sample.tags.includes("C#");
        }
      } catch {
        // Ignore parse errors, fall back to folder detection
      }
    }
  }
  
  return false;
}

/**
 * Detects the project type and returns the correct paths for validation.
 * 
 * First checks samples-config-v3.json for "C#" tag, then falls back to folder structure.
 * 
 * TypeScript projects have files directly in the root:
 *   - m365agents.yml
 *   - appPackage/
 *   - env/
 * 
 * C# projects have an M365Agent subfolder containing these files:
 *   - M365Agent/m365agents.yml
 *   - M365Agent/appPackage/
 *   - M365Agent/env/
 */
export async function detectProjectType(projectDir: string): Promise<ProjectPaths> {
  // First, check samples-config-v3.json for C# tag
  const isCSharp = await isCSharpFromConfig(projectDir);
  
  // Check if M365Agent subfolder exists with m365agents.yml
  const m365AgentDir = path.join(projectDir, "M365Agent");
  const m365AgentYaml = path.join(m365AgentDir, "m365agents.yml");
  const hasM365AgentFolder = await fs.exists(m365AgentYaml);
  
  // If config says C# or has M365Agent folder structure
  if (isCSharp || hasM365AgentFolder) {
    return {
      projectType: "csharp",
      rootDir: projectDir,
      agentDir: hasM365AgentFolder ? m365AgentDir : projectDir,
      displayPrefix: hasM365AgentFolder ? "M365Agent/" : "",
    };
  }
  
  // Default to TypeScript project structure
  return {
    projectType: "typescript",
    rootDir: projectDir,
    agentDir: projectDir,
    displayPrefix: "",
  };
}

/**
 * Check if the project has a package.json (TypeScript/Node.js project)
 */
export async function hasPackageJson(projectDir: string): Promise<boolean> {
  return fs.exists(path.join(projectDir, "package.json"));
}
