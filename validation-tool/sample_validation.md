# Sample Validation Guide

This document describes the validation process and requirements for the Microsoft 365 Agents Toolkit Samples repository.

## Table of Contents

- [CI Pipeline Overview](#ci-pipeline-overview)
- [Sample Config Validation](#sample-config-validation)
- [Sample Project Validation](#sample-project-validation)
- [Running Validation Locally](#running-validation-locally)
- [FAQ](#faq)

---

## CI Pipeline Overview

The validation workflow is located at `.github/workflows/ci-sample-validation.yml` and triggers on:

| Trigger | Description |
|---------|-------------|
| `workflow_dispatch` | Manual trigger |
| `pull_request` | PR to `dev` or `main` branch |
| `push` | Push to `dev` or `main` branch |

### Pipeline Steps

1. **Validate Sample Config** - Validates the `.config/samples-config-v3.json` configuration file
2. **Run Sample Validation Tool Based on Sample Config** - Validates all internal samples in the config file
3. **Run Sample Validation Tool on New Sample** (PR only) - Validates changed folders in the PR

### Validation Exceptions

The following samples are excluded from validation:

**Config file validation exceptions**:
- `incoming-webhook-notification`
- `hello-world-office-addin`

**PR change validation exceptions**:
- `.config`
- `.devcontainer`
- `assets`
- `templates`
- `validation-tool`
- `basic-blazor-tab-app`
- `incoming-webhook-notification`
- `stocks-update-notification-bot-dotnet`
- `whos-next-meeting-app`

**Note**: Deleted folders in PRs are automatically skipped (they no longer exist).

---

## Sample Config Validation

**Validation script**: `validation-tool/validate-config.js`

Validates `.config/samples-config-v3.json` to ensure each sample entry contains the following **required fields**:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique sample identifier |
| `onboardDate` | string | Onboarding date |
| `shortId` | string | Short identifier |
| `shortDescription` | string | Brief description |
| `fullDescription` | string | Full description |
| `types` | array | Type array |
| `tags` | array | Tag array |
| `time` | string | Estimated completion time |
| `configuration` | string | Configuration info |
| `thumbnailPath` | string | Thumbnail path |
| `suggested` | boolean | Whether recommended |

---

## Sample Project Validation

**Validation script**: `validation-tool/validator.cjs`

**Source directory**: `validation-tool/src/validators/`

### Project Type Detection

The validator automatically detects project type based on `samples-config-v3.json` tags:

| Project Type | Detection | Structure |
|--------------|-----------|-----------|
| TypeScript/JS | Tags contain `TS` or `JS` | Files in root directory |
| C# | Tags contain `C#` | Files in `M365Agent/` subdirectory |

### 1. Folder Structure Validation

**Validator**: `folderStructureValidator.ts`

#### TypeScript Projects

**Required folders**:
- `.vscode/`
- `appPackage/`
- `env/`

**Required files**:
- `appPackage/manifest.json`
- `appPackage/color.png`
- `appPackage/outline.png`
- `env/.env.dev`
- `m365agents.yml`
- `m365agents.local.yml`
- `README.md`

#### C# Projects

**Required folders**:
- `M365Agent/appPackage/`
- `.vscode/` (optional)
- `M365Agent/env/` (optional)

**Required files**:
- `M365Agent/appPackage/manifest.json`
- `M365Agent/appPackage/color.png`
- `M365Agent/appPackage/outline.png`
- `M365Agent/m365agents.yml`
- `M365Agent/m365agents.local.yml`
- `README.md`
- `.sln` or `.slnx` solution file
- `.csproj` project file
- `appsettings.json`

### 2. Teams App YAML Validation

**Validator**: `teamsAppYamlValidator.ts`

Validates `m365agents.yml` file:

| Rule | Requirement | Severity |
|------|-------------|----------|
| Rule 1 | Must **NOT** have `projectId` field | Error |
| Rule 2 | Must have `provision` stage with `teamsApp/create` action | Error |
| Rule 3 | Must have `deploy` stage | Error |
| Rule 4 | Should have `publish` stage with `teamsApp/publishAppPackage` action | Warning |
| Rule 5 | `teamsApp/create` must write `TEAMS_APP_ID` environment variable | Error |
| Rule 6 | Must have `sampleTag` in format `repo:name` (e.g., `TeamsFx-Samples:sample-name`) | Error |

### 3. App Manifest Validation

**Validator**: `teamsAppManifestValidator.ts`

Validates `appPackage/manifest.json`:

| Rule | Requirement | Severity |
|------|-------------|----------|
| Rule 1 | `id` must be `${{TEAMS_APP_ID}}` (placeholder reference) | Error |
| Rule 2 | `manifestVersion` should be `1.22.0` (aligned with Microsoft 365 Agents Toolkit) | Warning |

### 4. Environment File Validation

**Validator**: `envValidator.ts`

Validates `env/.env.dev` and `env/.env.local`:

- **Variables allowed to have values**: `TEAMSFX_ENV`, `APP_NAME_SUFFIX`, `TEAMS_APP_NAME`
- **Other variables**: Must not have actual values (should be empty or placeholders)

**Note**: C# projects do not require env files.

### 5. Image Validation

**Validator**: `imageValidator.ts`

Validates images based on paths specified in `samples-config-v3.json` (`thumbnailPath` and `gifPath`):

| File | Requirement | Severity |
|------|-------------|----------|
| Thumbnail (from `thumbnailPath`) | File is required to display in sample gallery | **Error** |
| Thumbnail aspect ratio | Aspect ratio **40:23** (e.g., 1600×920 or 800×460) | **Error** |
| GIF (from `gifPath`) | File should exist (optional) | Warning |
| GIF aspect ratio | Aspect ratio **40:23** (optional) | Warning |

**Note**: If `thumbnailPath` or `gifPath` is not specified in `samples-config-v3.json`, the validator falls back to checking `assets/thumbnail.png` and `assets/sampleDemo.gif`.

### 6. Package.json Validation

**Validator**: `packageJsonValidator.ts`

| Rule | Requirement | Severity |
|------|-------------|----------|
| `engines.node` | Must be compatible with Node.js 22 | Warning |

**Note**: C# projects do not require package.json.

---

## Running Validation Locally

### Prerequisites

```bash
cd validation-tool
npm install
```

### Validate Sample Config

```bash
node validate-config.js ../.config/samples-config-v3.json
```

### Validate a Single Sample

```bash
# Validate a specific sample
node validator.cjs -p ../coffee-agent

# Or validate from the sample directory
cd ../coffee-agent
node ../validation-tool/validator.cjs
```

### Command Options

```
-p, --path <path>    Specify the sample project path to validate
-V, --version        Show version
-h, --help           Show help
```

### Rebuild (Optional)

If you modified the validator source code:

```bash
npm run build
```

---

## FAQ

### Q1: Will the pipeline succeed if a PR deletes a sample?

**Yes**, as long as the folder no longer exists, it will be automatically skipped with the message:
```
Skipping deleted folder: 'sample-name'
```

You should also remove the sample from `samples-config-v3.json` to avoid confusion.

### Q2: How do I skip validation for a specific sample?

Add the sample ID to the `exceptions` array in the workflow file:

```yaml
exceptions=("incoming-webhook-notification" "hello-world-office-addin" "your-sample-id")
```

### Q3: Are external samples validated?

No. Samples with a `downloadUrlInfo` field in the config file are considered external samples and are automatically skipped.

### Q4: How do I debug validation failures?

1. Run the validation script locally to see detailed output
2. Check the GitHub Actions logs for specific error messages
3. Compare against this document to ensure all requirements are met

---

## Validation Checklist

Before submitting a PR, ensure your sample meets the following requirements:

### For TypeScript/JS Projects

- [ ] Contains required folder structure (`.vscode/`, `appPackage/`, `env/`)
- [ ] Contains required files (manifest.json, icons, env files, YAML configs, README)
- [ ] `m365agents.yml` has no `projectId` and has correct `sampleTag`
- [ ] `manifest.json` has `id` set to `${{TEAMS_APP_ID}}`
- [ ] Environment files contain no sensitive information or actual values
- [ ] `assets/thumbnail.png` has correct aspect ratio (40:23), `sampleDemo.gif` is optional
- [ ] `package.json` has `engines.node` compatible with Node.js 22
- [ ] Added/updated configuration in `samples-config-v3.json`

### For C# Projects

- [ ] Contains required folder structure (`M365Agent/appPackage/`)
- [ ] Contains required files (manifest.json, icons, YAML configs, README)
- [ ] Has `.sln` or `.slnx` solution file
- [ ] Has `.csproj` project file
- [ ] Has `appsettings.json` file
- [ ] `m365agents.yml` has no `projectId` and has correct `sampleTag`
- [ ] `manifest.json` has `id` set to `${{TEAMS_APP_ID}}`
- [ ] Added/updated configuration in `samples-config-v3.json` with `C#` tag
