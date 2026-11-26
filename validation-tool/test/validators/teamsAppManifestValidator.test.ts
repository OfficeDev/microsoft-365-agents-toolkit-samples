// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import mock from "mock-fs";
import fs from "fs-extra";
import path from "path";

import validateTeamsAppManifest from "../../src/validators/teamsAppManifestValidator";

describe('validateTeamsAppManifest()', () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({ ok: false } as Response);
  });

  afterEach(() => {
    mock.restore();
    jest.restoreAllMocks();
  });

  test('manifest.json is valid', async () => {
    const validManifestContent = await fs.readFile(path.join(__dirname, "../data/manifest-valid.json"), "utf8");
    mock({
      "testFolder": {
        "appPackage": {
          "manifest.json": validManifestContent,
        },
      },
    });

    const result = await validateTeamsAppManifest(path.join(process.cwd(), "testFolder"));
    expect(result.name).toEqual("App Manifest");
    expect(result.failed.length).toBe(0);
    expect(result.passed.length).toBe(2);
    expect(result.passed).toContain("Manifest version is aligned with Microsoft 365 Agents Toolkit.");
  });

  test('manifest.json does not exist', async () => {
    mock({
      "testFolder": {},
    });
    const result = await validateTeamsAppManifest(path.join(process.cwd(), "testFolder"));
    expect(result.name).toEqual("App Manifest");
    expect(result.failed.length).toBe(1);
    expect(result.passed.length).toBe(0);
  });

  test('manifest.json is broken format', async () => {
    mock({
      "testFolder": {
        "appPackage": {
          "manifest.json": "{ \"broken JSON\"",
        },
      },
    });

    const result = await validateTeamsAppManifest(path.join(process.cwd(), "testFolder"));
    expect(result.name).toEqual("App Manifest");
    expect(result.failed.length).toBe(1);
    expect(result.passed.length).toBe(0);
    expect(result.failed[0]).toEqual("appPackage/manifest.json is not a valid JSON file.");
  });

  test('manifest.json has invalid id', async () => {
    const validManifestContent = await fs.readFile(path.join(__dirname, "../data/manifest-invalid-id.json"), "utf8");
    mock({
      "testFolder": {
        "appPackage": {
          "manifest.json": validManifestContent,
        },
      },
    });

    const result = await validateTeamsAppManifest(path.join(process.cwd(), "testFolder"));
    expect(result.name).toEqual("App Manifest");
    expect(result.failed.length).toBe(1);
    expect(result.passed.length).toBe(1);
    expect(result.failed[0]).toEqual("id should be equal to '\${{TEAMS_APP_ID}}'.");
  });

  test('manifest.json has invalid manifest version', async () => {
    const validManifestContent = await fs.readFile(path.join(__dirname, "../data/manifest-invalid-version.json"), "utf8");
    mock({
      "testFolder": {
        "appPackage": {
          "manifest.json": validManifestContent,
        },
      },
    });

    const result = await validateTeamsAppManifest(path.join(process.cwd(), "testFolder"));
    expect(result.name).toEqual("App Manifest");
    expect(result.failed.length).toBe(0);
    expect(result.passed.length).toBe(1);
    expect(result.warning[0]).toEqual("Manifest version(1.12) is NOT aligned with Microsoft 365 Agents Toolkit(1.31.0).");
  });

  test.each([
    ["1.30", "Manifest version(1.30) is NOT aligned with Microsoft 365 Agents Toolkit(1.31.0)."],
    ["devPreview", "Manifest version(devPreview) is using preview version."],
  ])('manifest version %s still produces a warning', async (manifestVersion, warning) => {
    const manifest = await fs.readJson(path.join(__dirname, "../data/manifest-valid.json"));
    manifest.manifestVersion = manifestVersion;
    mock({
      "testFolder": {
        "appPackage": {
          "manifest.json": JSON.stringify(manifest),
        },
      },
    });

    const result = await validateTeamsAppManifest(path.join(process.cwd(), "testFolder"));
    expect(result.failed).toEqual([]);
    expect(result.warning).toContain(warning);
    expect(result.passed).not.toContain("Manifest version is aligned with Microsoft 365 Agents Toolkit.");
  });

  test.each(["1.31", "1.30"])('validates manifest version %s against the declared 1.31 schema', async (manifestVersion) => {
    const manifest = await fs.readJson(path.join(__dirname, "../data/manifest-valid.json"));
    manifest.manifestVersion = manifestVersion;
    jest.mocked(global.fetch).mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({
        "$schema": "http://json-schema.org/draft-04/schema#",
        type: "object",
        properties: {
          manifestVersion: { type: "string", const: "1.31" },
        },
        required: ["manifestVersion"],
      }),
    } as Response);
    mock({
      "testFolder": {
        "appPackage": {
          "manifest.json": JSON.stringify(manifest),
        },
      },
    });

    const result = await validateTeamsAppManifest(path.join(process.cwd(), "testFolder"));
    expect(global.fetch).toHaveBeenCalledWith(manifest.$schema);
    if (manifestVersion === "1.31") {
      expect(result.failed).toEqual([]);
      expect(result.passed).toContain(`Manifest passes $schema validation (${manifest.$schema}).`);
    } else {
      expect(result.failed).toEqual([
        'Schema validation error: /manifestVersion must be equal to constant. {"allowedValue":"1.31"}',
      ]);
    }
  });
});
