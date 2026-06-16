---
name: proxy-agent-dev
description: 'Develop, debug, and extend a proxy agent that connects any external AI agent to Microsoft 365 Copilot and Teams via direct SDK integration. Use when: understanding the project, explaining the architecture, onboarding to the codebase, building or modifying a Teams proxy agent with M365 Agents SDK, wiring a new backend SDK into agent.ts, configuring SSO, updating Bicep infrastructure, troubleshooting bot messaging, streaming responses, or managing environment config. Stop if: backend has no Node/TS SDK or cannot be called from a Node process.'
---

# Proxy Agent Skill — Connect Any External Agent to M365 Copilot (SDK Pattern)

Wire any backend AI SDK — whether a direct LLM provider or an orchestration framework — into a stable M365 Copilot/Teams integration layer. The proxy handles Teams/M365 Copilot transport, SSO, and streaming — you replace only the backend call.

---

## Use When / Stop When

**Use this skill when:**
- Backend has a TypeScript/Node SDK (LLM provider or orchestrator)
- Backend supports streaming or can map to chunked responses
- Starting from the ProxyAgent-NodeJS sample

**Stop and reassess if:**
- Backend has no Node SDK (consider an adapter service instead)
- Backend is synchronous-only with no streaming path and cannot be adapted

---

## Principles

These are non-negotiable. Every code change must preserve them:

1. **No secrets in source** — never commit API keys, passwords, or tokens to the repository
2. **Secure secret storage** — use `${{SECRET_*}}` for local dev (ATK encrypts to `.env.local.user`), Key Vault references for production
3. **Prefer managed identity** — when the backend supports Entra ID / `TokenCredential`, use federated credentials and managed identities (zero-secret). This is the ideal.
4. **User identity where possible** — the user's Entra ID identity flows from M365 Copilot through SSO. Propagate it to the backend when supported; at minimum, use it for audit/logging even when the backend uses a separate auth mechanism.
5. **Bot Service is control plane only** — discovery and auth setup; no user messages flow through it
6. **Backend is replaceable** — swap the SDK without changing the M365 integration shell
7. **Streaming-first** — real-time token streaming from backend to Teams/Copilot UI

### Backend Auth Tiers

| Tier | When | How | Example |
|------|------|-----|---------|
| **TokenCredential (ideal)** | Backend accepts Entra ID tokens | `UserAuthorizationTokenWrapper` → SDK credential; zero secrets | Azure AI Foundry, Azure OpenAI |
| **API key + user context (practical)** | Backend requires an API key but you still want per-user context | Key Vault for key; SSO token for user identity/logging | OpenAI, Anthropic with user ID pass-through |
| **API key only (acceptable)** | Backend has no user-identity concept | Key Vault for key; no per-user context | Simple LLM endpoints |
| **Hardcoded secrets (forbidden)** | Never | ❌ | — |

---

## Forbidden Patterns

- ❌ Hardcoding secrets in source — use `${{SECRET_*}}` for local dev, Key Vault for production
- ❌ Committing `.env.local.user` or any file containing plaintext secrets
- ❌ Collapsing all users into one backend identity/session when the backend supports per-user identity
- ❌ Routing user messages through Bot Service
- ❌ Storing API keys in plain-text app settings in production (use Key Vault references)

---

## Architecture

### Control Plane (setup-time only)

```
Azure Bot Service
  ├── Registers bot endpoint (DNS-like discovery: bot ID → App Service URL)
  ├── Stores OAuth connection config, caches tokens
  ├── Facilitates token exchange: access_as_user → backend scopes
  └── Supports multiple OAuth connections for scope separation
```

### Data Plane (every message)

```
User (M365 Copilot / Teams)
    │  direct connection via Teams infrastructure
    ▼
Proxy Agent (App Service)
    │  SDK call to backend (in-process)
    ▼
Backend: LLM SDK or Orchestrator (Foundry, OpenAI, Agent Framework, LangChain, CrewAI, etc.)
```

All conversation traffic flows **directly** from Teams infrastructure to the App Service. Bot Service handles only auth flows.

### Network Security

The proxy agent endpoint (`/api/messages`) **must be publicly accessible**. Private Endpoints are not supported when the agent is exposed to public channels like Teams or M365 Copilot — Teams backend services need to reach the endpoint directly over the internet.

**Securing the public endpoint:**

| Layer | How | Notes |
|-------|-----|-------|
| **Channel auth (built-in)** | SDK validates JWT bearer token on every inbound request | Automatic via `startServer()` — proves request is from Microsoft Teams/Copilot |
| **IP-based ACL (recommended)** | Restrict inbound traffic to Teams backend IPs listed in [Microsoft 365 URLs and IP ranges](https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide) | App Service Access Restrictions or NSG rules |
| **API Gateway / WAF / Front Door / Azure Firewall** | Advanced filtering, rate limiting, DDoS protection | Optional — for additional defense-in-depth |

> **Note:** The `AzureBotService` service tag is **not relevant** here — messages flow from Teams infrastructure, not through Bot Service.

### SSO with Federated Credentials

> **Reference:** [Add user authorization using Federated Identity Credential](https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/azure-bot-user-authorization-federated-credentials) — covers app registration setup, redirect URIs, pre-authorized client IDs, federated credential configuration, and OAuth connection creation on the Azure Bot.

- Entra ID App Registration with `access_as_user` scope
- Federated Credentials link App Registration to Bot's Managed Identity — no client secret
- Bot OAuth Connection uses AADv2 with Federated Credentials for token exchange
- Pre-authorized client IDs: Teams desktop, web, mobile — [full list](https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/azure-bot-user-authorization-federated-credentials#create-the-microsoft-entra-id-identity-provider)
- Redirect URI: depends on data residency and cloud — see table below

| Data Residency | Cloud | OAuth URL | OAuth Redirect URL |
|---|---|---|---|
| None | Public | `https://token.botframework.com` | `https://token.botframework.com/.auth/web/redirect` |
| Europe | Public | `https://europe.token.botframework.com` | `https://europe.token.botframework.com/.auth/web/redirect` |
| United States | Public | `https://unitedstates.token.botframework.com` | `https://unitedstates.token.botframework.com/.auth/web/redirect` |
| India | Public | `https://india.token.botframework.com` | `https://india.token.botframework.com/.auth/web/redirect` |
| None | Azure Government | `https://token.botframework.azure.us` | `https://token.botframework.azure.us/.auth/web/redirect` |
| None | Azure operated by 21Vianet | `https://token.botframework.azure.cn` | `https://token.botframework.azure.cn/.auth/web/redirect` |
- OAuth connection on Azure Bot: use **AAD v2 with Federated Credentials** service provider — [setup steps](https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/azure-bot-user-authorization-federated-credentials#create-an-oauth-connection-on-the-azure-bot)
- **Local dev**: Single Tenant + Client Secret (auto-provisioned by toolkit)
- **Production**: User Assigned Managed Identity — mutual authentication between Bot Service, Teams/Copilot services, and the App Service, ensuring all parties are who they claim to be

### Multi-OAuth

If the backend uses a non-Entra IDP, configure a second OAuth connection in Bot Service. The SDK supports multiple OAuth configs declaratively — no proxy code changes needed.

### Conversation History

M365 Copilot provides a **Conversation ID** (`context.activity.conversation.id`) each time a new conversation is created. The proxy receives this ID with every incoming message.

**Key facts:**

- **M365 Copilot shows chat history to the user** — the user sees their past messages in the Copilot UI. This history is managed by M365 Copilot itself and is **not accessible to the developer**. The proxy agent never reads or controls it.
- **The backend owns conversation memory** — the proxy should not accumulate or manage message history. If the backend is stateful (Foundry, Assistants API), use the Conversation ID to map to a backend thread/session. If the backend manages its own threads (like Foundry's `AgentThread`), store the backend thread ID in `turnState.conversation` and reuse it on subsequent messages.
- **Stateless backends create a UX mismatch** — the user sees chat history in M365 Copilot and assumes the agent remembers prior context. If the backend is stateless (e.g., a raw chat completion API with no thread management), each message is processed independently and the agent has no memory of the conversation. This **will confuse users**. If you use a stateless backend, you must either:
  1. Add a conversation memory layer in the backend (recommended), or
  2. Make it clear to the user that each message is independent (e.g., in the agent's system prompt or welcome message)

| Backend type | Who owns history | Proxy responsibility |
|---|---|---|
| **Stateful** (Foundry, Assistants API) | Backend | Map Conversation ID → backend thread ID; store thread ID in `turnState.conversation` |
| **Stateful with external session** | Backend | Pass Conversation ID as session key to the backend |
| **Stateless** (raw chat completion) | Nobody — UX gap | Consider adding a memory layer or clearly communicate the limitation |

**In the current Foundry sample**, the proxy creates a Foundry `AgentThread` on first message and stores its ID in `turnState.conversation.threadInfo`. Foundry keeps the full message history server-side — the proxy only holds the thread reference.

---

## Tech Stack

- **Runtime**: Node.js 22/24, TypeScript 5.9+

### Core Dependencies (invariant)

| Package | Purpose |
|---------|---------|
| `@microsoft/agents-hosting-express` | Express server + channel auth |
| `@microsoft/agents-hosting` | `AgentApplication`, `TurnContext`, `TurnState`, storage, SSO pipeline |
| `@microsoft/agents-activity` | Activity type definitions (`ActivityTypes.Message`) |
| `@azure/identity` | `TokenCredential` for zero-secret auth |
| `@azure/core-auth` | Shared auth interfaces |
| `jsonwebtoken` | JWT decode/verify for SSO token exchange |

### Backend-Specific (you replace these)

**LLM providers:**

| Example | Package |
|---------|---------||
| Groq | `groq-sdk` |
| OpenAI | `openai` |
| Anthropic | `@anthropic-ai/sdk` |
| Foundry | `@azure/ai-agents` |

**Orchestrators:**

| Example | Package |
|---------|---------|
| Agent Framework | `@microsoft/agents-framework` |
| LangChain / LangGraph | `langchain`, `@langchain/core` |
| CrewAI | Custom HTTP client (Python backend via REST) |

---

## Project Structure

| Path | Purpose | Modify? |
|------|---------|---------|
| `src/index.ts` | Express server entry — `startServer(agentApp)` | **No** |
| `src/agent.ts` | ProxyAgent class — backend client, message handling, streaming | **Yes — backend seam** |
| `src/config.ts` | Environment-based config | **Yes — backend vars** |
| `src/logger.ts` | Logging utility | No |
| `src/userAuthTokenWrapper.ts` | Bridges Agent SDK SSO with AI Foundry auth (`TokenCredential`). Foundry-specific — not needed for backends that use API keys or other auth. | Only if using Foundry |
| `appPackage/manifest.json` | Teams app manifest | Display strings only |
| `m365agents.yml` / `.local.yml` | ATK project config | Only env var additions |
| `infra/` | Bicep modules for Azure deployment | Backend-specific params |
| `env/` | Environment variable templates | **Yes** |

---

## Edit Boundaries in `agent.ts`

This is the critical file. The backend seam is clearly defined:

### REPLACE (the backend seam)

| What | Example |
|------|---------|
| Backend SDK import | `import MySDK from "my-backend-sdk"` |
| Client initialization | `const client = new MySDK({ /* auth from config.ts */ })` |
| Session/thread mapping | Map Conversation ID → backend thread/session (stateful) or manage history (if needed) |
| Backend invoke + stream | `client.chat.completions.create({ stream: true, ... })` |
| Response assembly | `for await (const chunk of stream) { ... }` |

### DO NOT MODIFY

| What | Why |
|------|-----|
| `AgentApplication` constructor | M365 SDK lifecycle |
| `authorization` block / SSO config | Identity flow |
| `onMessage` / `onActivity` registrations | Teams message routing |
| `_handleSignOut` handler | Token + session cleanup (`--signout` command) |
| `_handleClearCache` handler | Clears the in-memory agent model cache (`--clearcache` command) |
| Streaming response structure (`queueTextChunk`, `endStream`) | Teams streaming protocol |
| `context.streamingResponse.queueInformativeUpdate(...)` | UX: typing indicator |

### Pattern for Backend Replacement

```typescript
// ── YOUR BACKEND (replace this block) ──────────────────
import YourSDK from "your-backend-sdk";
const client = new YourSDK({ /* auth config from config.ts */ });

// In _handleMessage:
const stream = await client.chat({ messages: history, stream: true });
let reply = "";
for await (const chunk of stream) {
  const delta = /* extract text from chunk */;
  if (delta) {
    reply += delta;
    context.streamingResponse.queueTextChunk(delta);
  }
}
// ────────────────────────────────────────────────────────
```

If your backend doesn't support streaming, collect the full response, then send it as a single chunk:

```typescript
const response = await client.chat({ messages: history });
const reply = response.text;
context.streamingResponse.queueTextChunk(reply);
```

---

## Config Wiring

Every backend environment variable must appear in all relevant places:

| # | Where | Example |
|---|-------|---------|
| 1 | `src/config.ts` | `backendEndpoint: process.env.BACKEND_ENDPOINT` |
| 2 | `env/.env.local` | `BACKEND_ENDPOINT=https://...` |
| 3 | `m365agents.local.yml` | `BACKEND_ENDPOINT: ${{BACKEND_ENDPOINT}}` |
| 4 | `infra/azure.bicep` | `{ name: 'BACKEND_ENDPOINT', value: backendEndpoint }` |

**Not all vars need all 4 places.** Use this matrix:

| Variable type | config.ts | .env.local | .local.yml | azure.bicep |
|---------------|-----------|------------|------------|-------------|
| Non-secret config (endpoints, model names) | ✓ | ✓ | ✓ | ✓ |
| Secrets (API keys, tokens) | ✓ | `${{SECRET_*}}` | ✓ | Key Vault ref |
| Local-only (debug flags) | ✓ | ✓ | ✓ | — |
| Infra-only (resource IDs) | — | — | — | ✓ |
| Auto-generated (BOT_ID, SSO_APP_ID) | — | Auto | — | Auto |

### Rules

- `.localConfigs` is auto-generated by ATK — never edit by hand; re-run `npx atk deploy --env local` to regenerate
- For secrets: use `${{SECRET_MY_VAR}}` in `.env.local` → ATK encrypts to `.env.local.user`
- For production: use Key Vault references in Bicep — never store API keys as plain-text app settings
- If the backend supports `TokenCredential` / managed identity, no secret env vars are needed — prefer this path
- **Do not** add empty vars to yml — ATK throws `MissingEnvironmentVariablesError`

---

## Build Flow

### Step 1 — Clone and verify

```
git clone https://github.com/OfficeDev/microsoft-365-agents-toolkit-samples.git
```

Start from `ProxyAgent-NodeJS`. Do **not** use `atk new`.

**Done when**: `npm install && npx tsc --noEmit` succeeds.

### Step 2 — Wire your backend SDK

1. `npm install your-backend-sdk`
2. Update `src/config.ts` — add your backend's env vars
3. Update `src/agent.ts` — replace the backend seam (imports, client init, invoke, stream handling)
4. Update `env/.env.local` — set your backend values
5. Update `m365agents.local.yml` — add your vars to the envs block

**Done when**:
- `npx tsc --noEmit` passes
- `grep` confirms your var appears in config.ts, .env.local, and .local.yml
- No adapter-related env vars remain (ADAPTER_ENDPOINT, ADAPTER_API_KEY)

### Step 3 — Provision and test locally

Use **VS Code F5** (not CLI) for initial local provisioning. ATK creates the dev tunnel, Bot Service registration, SSO app, and generates `.localConfigs`.

Send a typing indicator before any async work to avoid the Teams 15-second timeout.

**Done when**: Bot responds in Teams with a reply from your backend SDK.

### Step 4 — Verify identity and architecture

- [ ] User signs in via SSO (silent, no prompt after first consent)
- [ ] `--signout` clears tokens and session
- [ ] `--clearcache` clears the in-memory agent model cache (useful after updating the backend agent config)
- [ ] New conversation = fresh backend session/thread
- [ ] Continued conversation = same backend session/thread (conversation history owned by backend, not proxy)
- [ ] Response streams in Copilot/Teams (not a single delayed message)
- [ ] Backend receives per-user identity/context (if applicable)
- [ ] Backend swap is isolated to the intended seam in agent.ts
- [ ] If backend is stateless, UX expectation mismatch is addressed (memory layer or user communication)

**Done when**: All checks pass in Teams.

### Step 5 — Deploy to Azure

```powershell
npx atk provision --env dev    # creates Azure resources
npx atk deploy --env dev       # deploys code
npx atk preview --env dev      # opens in Teams/Copilot
```

**Done when**: Bot works in Teams/Copilot pointing at the Azure-hosted App Service, with no secrets in committed files. Verify `env/.env.dev` has `BOT_ID`, `SSO_APP_ID`, `AZURE_APP_SERVICE_RESOURCE_ID` after provision — do not overwrite these.

---

## Azure Resources (provisioned via Bicep)

| Resource | Module | Purpose |
|----------|--------|---------|
| User Assigned Managed Identity | `bot-managedidentity.bicep` | Trust anchor — secures mutual authentication between Bot Service, Teams/Copilot, and App Service |
| App Service Plan (Linux, B1) | `appservice.bicep` | Compute for Node.js 22 LTS |
| Web App | `appservice.bicep` | HTTPS only, Always On, `/health` |
| Azure Bot Service | `azurebot.bicep` | Bot registration + Teams channel |
| Entra ID App Registration | `app-registration.bicep` | SSO with federated credentials |
| OAuth Connection | `bot-oauth-connection.bicep` | Token exchange (`SsoConnection`) |
| Application Insights | `appinsights.bicep` | Telemetry |

---

## When Modifying This Project

- **Swapping the AI backend**: Replace the backend seam in `src/agent.ts` — proxy pattern, SSO, and streaming remain unchanged
- **Adding message handlers**: Extend `ProxyAgent` class using `this.onMessage()` or `this.onActivity()`
- **Changing backend config**: Update `src/config.ts` and corresponding env vars (see Config Wiring)
- **Updating infrastructure**: Modify Bicep in `infra/` and parameters in `infra/azure.parameters.json`
- **Updating app manifest**: Edit `appPackage/manifest.json`; toolkit substitutes `${{VAR}}` placeholders at build
- **Adding RBAC**: Managed Identity principal ID is available as a Bicep output

---

## Reference

- [Microsoft 365 Agents SDK documentation](https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/) — root docs for the SDK
- [Add user authorization using Federated Identity Credential](https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/azure-bot-user-authorization-federated-credentials) — app registration, redirect URIs, pre-authorized clients, federated credentials, OAuth connection setup
- [ProxyAgent-NodeJS sample](https://github.com/OfficeDev/microsoft-365-agents-toolkit-samples/tree/dev/ProxyAgent-NodeJS)
- [ProxyAgent-CSharp sample](https://github.com/OfficeDev/microsoft-365-agents-toolkit-samples/tree/dev/ProxyAgent-CSharp)
- [AGENTS.md](https://agents.md/) — open format for AI coding agent instructions
