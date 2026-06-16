# CLAUDE.md

This file is automatically loaded by Claude Code when the repository is opened. It tells Claude how to work in this repo and points to the project skill.

## Project skill (read first)

Before doing any work in this repository, read the **proxy-agent-dev** skill:

- [.agents/skills/proxy-agent-dev/SKILL.md](.agents/skills/proxy-agent-dev/SKILL.md)

It is the authoritative guide for this codebase: architecture, the backend "seam" in `src/agent.ts`, SSO with federated credentials, streaming, Bicep infrastructure, and environment configuration. Consult it before explaining the project, onboarding, or making changes.

## Prerequisite: Microsoft Agents SDK plugin

Before editing code, confirm the Microsoft Agents SDK plugin is installed by checking for:

```
~/.vscode/agent-plugins/github.com/microsoft/agents/agent-plugins/agents-for-js/skills/
```

It must contain the skills `agents-sdk-typescript`, `agents-sdk-debugging`, and `azure-agents-sdk-provision`. If the directory is missing or incomplete, **stop and ask the user to install the plugin** via the VS Code command `GitHub Copilot: Install Copilot Agent Plugin`, using the repository URL `https://github.com/microsoft/agents`. Do not proceed with code edits until the plugin is confirmed installed.

## Non-negotiable principles

These come from the skill and must be preserved by every change:

1. **No secrets in source** — never commit API keys, passwords, or tokens.
2. **Secure secret storage** — `${{SECRET_*}}` for local dev (encrypted to `.env.local.user`), Key Vault references for production.
3. **Prefer managed identity** — use federated credentials / managed identities (zero-secret) when the backend supports Entra ID / `TokenCredential`.
4. **User identity where possible** — propagate the user's Entra ID identity from M365 Copilot through SSO to the backend; at minimum use it for audit/logging.
5. **Bot Service is control plane only** — no user messages flow through it.
6. **Backend is replaceable** — swap the SDK without changing the M365 integration shell.
7. **Streaming-first** — real-time token streaming from backend to Teams/Copilot.

## Where to make changes

The backend integration seam is `src/agent.ts` (plus backend-specific vars in `src/config.ts`, `env/`, and `infra/`). Do not modify `src/index.ts` or `src/logger.ts`. See the **Project Structure** and **Edit Boundaries** sections of the skill for details.
