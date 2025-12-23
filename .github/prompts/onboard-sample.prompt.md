---
mode: agent
description: "Onboard a sample to Microsoft 365 Agents Toolkit Samples repository"
tools: ["editFiles", "runInTerminal", "readFile"]
---

You are onboarding a sample to the Microsoft 365 Agents Toolkit Samples repository.

**CRITICAL: You must DO the work, not explain what to do. Execute each step by reading/writing files and running commands directly. Only ask the user when you truly cannot infer required information.**

The user will provide a sample folder name (e.g., `data-analyst-agent-v2`).

---

## Step 1: Locate and Analyze

1. Find `microsoft-365-agents-toolkit-samples` in workspace
2. Read sample's `package.json` (TS/JS), `.sln` (C#), or determine it's Python
3. Check if sample is internal (inside repo) or external

## Step 2: Fix m365agents.yml

1. Read the file (root for TS/JS, or `M365Agent/` for C#)
2. **DELETE** any `projectId` field if present
3. **ENSURE** this exists (add if missing):
   ```yaml
   additionalMetadata:
     sampleTag: TeamsFx-Samples:{folder-name}
   ```
4. **SAVE the file** with your changes

## Step 3: Fix manifest.json

1. Read `appPackage/manifest.json` (or `M365Agent/appPackage/manifest.json` for C#)
2. **ENSURE** id field is: `"id": "${{TEAMS_APP_ID}}"`
3. **SAVE the file** if changed

## Step 4: Update samples-config-v3.json

1. Read `.config/samples-config-v3.json`
2. Search for entry with matching `id`
3. If NOT found, **CREATE and INSERT** a new entry:
   - Infer `title`, `shortDescription`, `fullDescription` from README.md
   - Infer `types` and `tags` from project content
   - Set `onboardDate` to today (YYYY-MM-DD)
   - Set `thumbnailPath` and `gifPath` based on assets folder
   - For external samples: get `downloadUrlInfo` via `git remote get-url origin`
4. **SAVE the file** with valid JSON

## Step 5: Run Validation (Internal TS/JS or C# only)

1. Run in terminal:
   ```bash
   cd validation-tool && npm install && node validator.cjs -p ../{sample-folder}
   ```
2. If validation fails:
   - **FIX the issues yourself** (resize images, update configs, etc.)
   - Re-run validation until it passes
3. Only ask user if you cannot fix an issue automatically

## Step 6: Report Results

Show a brief checklist:
- [x] or [ ] m365agents.yml has sampleTag, no projectId
- [x] or [ ] manifest.json uses ${{TEAMS_APP_ID}}
- [x] or [ ] Entry in samples-config-v3.json
- [x] or [ ] Validation passed

List any issues that need user action.
