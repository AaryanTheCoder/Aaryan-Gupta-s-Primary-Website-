# Azure Deployment Plan

> **Status:** Validated

Generated: 2026-07-17

## 1. Project Overview

**Goal:** Prepare Nova to run the `qwen3.5:2b` Ollama model on an existing Linux Azure App Service B2 plan, with Ollama and its models stored persistently under `/home` and excluded from Git.

**Path:** Modernize existing Node.js application for Azure App Service.

## 2. Requirements

| Attribute | Value |
|-----------|-------|
| Classification | Personal proof of concept |
| Scale | Small; one AI request at a time |
| Budget | Cost-optimized; existing B2 plan |
| Subscription | Existing user-managed subscription; no resources will be provisioned |
| Location | Existing App Service location; no location-dependent resources will be provisioned |
| Compliance | No special requirements stated |

## 3. Components Detected

| Component | Type | Technology | Path |
|-----------|------|------------|------|
| Nova web app | Frontend and API | Node.js 18+ with built-in HTTP server | `server.mjs`, `public/` |
| Ollama integration | Local AI runtime client | Node.js and Ollama HTTP API | `lib/ollama.mjs` |
| Calculator | AI tool | Node.js | `lib/calculator.mjs` |
| Web search | Optional AI tool | Ollama web-search API | `lib/ollama.mjs` |

No Copilot SDK, Azure Functions, Dockerfile, `azure.yaml`, or infrastructure-as-code files were detected.

## 4. Recipe Selection

**Selected:** Existing Git/code deployment plus App Service SSH setup.

**Rationale:** The App Service already exists, and the user only asked to prepare the app and install its model. Creating new Azure infrastructure would add unnecessary complexity and cost.

## 5. Architecture

**Stack:** Existing Linux Azure App Service.

| Component | Azure service/runtime | Configuration |
|-----------|-----------------------|---------------|
| Nova | Existing App Service B2 | Azure-provided `PORT` |
| Ollama executable | Persistent App Service storage | `/home/ollama/bin/ollama` |
| Model data | Persistent App Service storage | `/home/ollama-models` |
| Language model | Ollama | `qwen3.5:2b` |
| Inference limits | B2 CPU/RAM | `num_ctx: 2048`, `num_thread: 2` |

The code will retain local-development fallbacks so it can still use a locally installed `ollama` command and project-local model directory outside Azure.

## 6. Provisioning Limit Checklist

| Resource type | Number to deploy | Quota check | Notes |
|---------------|------------------|-------------|-------|
| Azure resources | 0 | Not applicable | This task modifies code for an existing App Service only. |

**Status:** No Azure resources or quota-consuming capacity will be provisioned.

## 7. Execution Checklist

- [x] Analyze and scan workspace
- [x] Gather requirements from the conversation
- [x] Select deployment approach and architecture
- [x] User authorized the proposed code changes
- [x] Update Ollama paths and B2 model defaults
- [x] Limit the B2 plan to one simultaneous AI generation
- [x] Improve startup/status messages
- [x] Update documentation and SSH commands
- [x] Run automated tests
- [x] Complete Azure readiness validation
- [x] Review the final changes

## 8. Files to Change

| File | Purpose |
|------|---------|
| `server.mjs` | Select persistent Azure Ollama paths and start the correct executable |
| `lib/ollama.mjs` | Apply B2-friendly inference limits |
| `.env.example` | Keep optional overrides consistent |
| `README.md` | Explain the App Service SSH setup and restart workflow |
| Tests, if needed | Verify the new defaults without running or downloading Ollama |

## 9. Safety and Rollback

- Model files and Ollama binaries remain outside Git.
- No Azure resources will be created, changed, or deleted by Codex.
- Existing environment-variable overrides remain supported.
- Reverting the code commit restores the old local defaults; deleting `/home/ollama` and `/home/ollama-models` removes the Azure-side installation.

## 10. Next Step

Implement and test the approved changes, then give the user copy-and-paste SSH instructions.

## 11. Validation Checks

- Run the Node.js automated test suite.
- Parse-check all server-side JavaScript modules.
- Confirm model files and local secrets are excluded from Git.
- Confirm Azure defaults use `/home`, `qwen3.5:2b`, two threads, and 2,048 context tokens.
- Static RBAC review: not applicable because this task contains no infrastructure or managed identities.

## 12. Validation Proof

| Check | Command | Result | Timestamp |
|-------|---------|--------|-----------|
| Automated behavior | `npm test` | Pass: 5/5 tests | 2026-07-17 13:05 +08 |
| JavaScript syntax | `node --check` on all server and browser JavaScript files | Pass | 2026-07-17 13:05 +08 |
| Secret/model exclusions | Checked `.gitignore` for `.env` and `.ollama-models/` | Pass | 2026-07-17 13:05 +08 |
| Azure/B2 defaults | Checked model, executable path, storage path, context, and thread settings | Pass | 2026-07-17 13:05 +08 |
| RBAC | Static review | Not applicable: no infrastructure or managed identity changes | 2026-07-17 13:05 +08 |

Live Azure startup and model loading remain user-run deployment checks because the user will push the application and perform the SSH installation.
