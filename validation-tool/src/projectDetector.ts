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
 * Get expected sample ID. For external samples, this can be overridden via environment variable.
 */
export function getExpectedSampleId(projectDir: string): string {
  // Check for expected sample ID from environment variable (for validating external samples)
  const expectedId = process.env.SAMPLE_VALIDATOR_EXPECTED_ID;
  if (expectedId) {
    return expectedId;
  }
  
  // Default: use folder name
  return path.basename(projectDir);
}

interface SampleConfig {
  id: string;
  tags: string[];
  thumbnailPath?: string;
  gifPath?: string;
}

interface SamplesConfig {
  samples: SampleConfig[];
}

export interface SampleImagePaths {
  thumbnailPath?: string;
  gifPath?: string;
}

/**
 * Get image paths (thumbnailPath and gifPath) from samples-config-v3.json
 */
export async function getSampleImagePaths(projectDir: string): Promise<SampleImagePaths> {
  const sampleId = getExpectedSampleId(projectDir);
  
  // Try to find samples-config-v3.json
  const configPaths = getConfigPaths(projectDir);
  
  for (const configPath of configPaths) {
    if (await fs.exists(configPath)) {
      try {
        const config: SamplesConfig = await fs.readJson(configPath);
        const sample = config.samples.find(s => s.id === sampleId);
        if (sample) {
          return {
            thumbnailPath: sample.thumbnailPath,
            gifPath: sample.gifPath,
          };
        }
      } catch {
        // Ignore parse errors
      }
    }
  }
  
  return {};
}

/**
 * Check if a sample is a C# project by reading samples-config-v3.json
 */
async function isCSharpFromConfig(projectDir: string): Promise<boolean> {
  const sampleId = getExpectedSampleId(projectDir);
  
  // Try to find samples-config-v3.json
  const configPaths = getConfigPaths(projectDir);
  
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
