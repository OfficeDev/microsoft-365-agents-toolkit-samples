// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import semver from "semver";
import Ajv from "ajv-draft-04";
import addFormats from "ajv-formats";
import { Result } from "../resultType";
import { detectProjectType } from "../projectDetector";

const LATEST_MANIFEST_VERSION = "1.25.0";
const MANIFEST_PREVIEW_VERSION = "devPreview";

async function fetchSchema(schemaUrl: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(schemaUrl);
    if (!res.ok) return null;
    // Workaround for invalid regex in older schema files
    const text = (await res.text()).replace(/\\a/g, "\\x07");
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Rule 1: Manifest id is referencing placeholder from env: ${{TEAMS_APP_ID}}
 * Rule 2: Manifest version should be latest to align with TTK
 * Rule 3: Manifest validates against its declared $schema (AJV)
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

  // Rule 3: Validate manifest against its declared $schema using AJV
  const schemaUrl = jsonData.$schema as string | undefined;
  if (!schemaUrl) {
    result.warning.push(`appPackage/manifest.json is missing a $schema property.`);
  } else {
    const schema = await fetchSchema(schemaUrl);
    if (!schema) {
      result.warning.push(`Could not fetch schema from: ${schemaUrl}`);
    } else {
      // Replace ${{VAR_NAME}} placeholders with valid dummy values so AJV
      // can validate structure/types without failing on unresolved env vars.
      // Use "local" for APP_NAME_SUFFIX to simulate the worst-case realistic env name.
      const DUMMY_UUID = "00000000-0000-0000-0000-000000000000";
      const DUMMY_URL = "https://placeholder.example.com";
      const KNOWN_VALUES: Record<string, string> = {
        APP_NAME_SUFFIX: "local",
        TEAMSFX_ENV: "local",
      };
      // Key-aware substitution: URL fields get a URL dummy, others get UUID dummy
      function substitutePlaceholders(obj: unknown, key?: string): unknown {
        if (typeof obj === "string") {
          const isUrlField = key !== undefined && /url$/i.test(key);
          const dummyWhole = isUrlField ? DUMMY_URL : DUMMY_UUID;
          if (/^\$\{\{[^}]+\}\}$/.test(obj)) {
            // Whole value is a single placeholder — check known values first
            const varName = obj.slice(3, -2).trim();
            if (KNOWN_VALUES[varName] !== undefined) return KNOWN_VALUES[varName];
            return dummyWhole;
          }
          // Partial placeholder — substitute known values, then handle the rest
          let result = obj;
          for (const [varName, value] of Object.entries(KNOWN_VALUES)) {
            result = result.replace(new RegExp(`\\$\\{\\{\\s*${varName}\\s*\\}\\}`, "g"), value);
          }
          // For URL fields, replace leading unknown placeholder with URL base
          if (isUrlField) {
            return result
              .replace(/^\$\{\{[^}]+\}\}/, DUMMY_URL)
              .replace(/\$\{\{[^}]+\}\}/g, "");
          }
          // For non-URL fields, remove remaining unknown partial placeholders
          return result.replace(/\$\{\{[^}]+\}\}/g, "");
        }
        if (Array.isArray(obj)) return obj.map((item) => substitutePlaceholders(item, key));
        if (obj !== null && typeof obj === "object") {
          return Object.fromEntries(
            Object.entries(obj as Record<string, unknown>).map(([k, v]) => [k, substitutePlaceholders(v, k)])
          );
        }
        return obj;
      }
      const dataForValidation = substitutePlaceholders(jsonData);

      const ajv = new Ajv({ allErrors: true, strictTypes: false });
      addFormats(ajv, ["uri", "email", "regex"]);
      const validate = ajv.compile(schema);
      const valid = validate(dataForValidation);
      if (!valid && validate.errors && validate.errors.length > 0) {
        for (const error of validate.errors) {
          result.failed.push(
            `Schema validation error: ${error.instancePath || "(root)"} ${error.message}. ${
              error.params ? JSON.stringify(error.params) : ""
            }`
          );
        }
      } else {
        result.passed.push(`Manifest passes $schema validation (${schemaUrl}).`);
      }
    }
  }

  return result;
}
