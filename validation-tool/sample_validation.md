# Sample Validation Guide

本文档描述了 Microsoft 365 Agents Toolkit Samples 仓库的验证流程和要求。

## 目录

- [CI Pipeline 概述](#ci-pipeline-概述)
- [Sample Config 验证](#sample-config-验证)
- [Sample 项目验证](#sample-项目验证)
- [本地运行验证](#本地运行验证)
- [常见问题](#常见问题)

---

## CI Pipeline 概述

验证 workflow 位于 `.github/workflows/ci-sample-validation.yml`，在以下情况触发：

| 触发方式 | 说明 |
|---------|------|
| `workflow_dispatch` | 手动触发 |
| `pull_request` | PR 到 `dev` 或 `main` 分支 |
| `push` | 推送到 `dev` 或 `main` 分支 |

### Pipeline 步骤

1. **Validate Sample Config** - 验证 `.config/samples-config-v3.json` 配置文件
2. **Run Sample Validation Tool Based on Sample Config** - 对配置文件中的所有内部 sample 进行验证
3. **Run Sample Validation Tool on New Sample** (仅 PR) - 对 PR 中变更的文件夹进行验证

### 验证例外列表

以下 sample 被排除在验证之外：

**配置文件验证例外**:
- `incoming-webhook-notification`
- `hello-world-office-addin`

**PR 变更验证例外**:
- `.config`
- `.devcontainer`
- `assets`
- `templates`
- `validation-tool`
- `basic-blazor-tab-app`
- `incoming-webhook-notification`
- `stocks-update-notification-bot-dotnet`
- `whos-next-meeting-app`

---

## Sample Config 验证

**验证脚本**: `validation-tool/validate-config.js`

验证 `.config/samples-config-v3.json` 配置文件，确保每个 sample 条目包含以下**必填字段**：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 样本唯一标识符 |
| `onboardDate` | string | 上线日期 |
| `shortId` | string | 短标识 |
| `shortDescription` | string | 简短描述 |
| `fullDescription` | string | 完整描述 |
| `types` | array | 类型数组 |
| `tags` | array | 标签数组 |
| `time` | string | 预计完成时间 |
| `configuration` | string | 配置信息 |
| `thumbnailPath` | string | 缩略图路径 |
| `suggested` | boolean | 是否推荐 |

---

## Sample 项目验证

**验证脚本**: `validation-tool/validator.cjs`

**源码目录**: `validation-tool/src/validators/`

### 1. 文件夹结构验证

**验证器**: `folderStructureValidator.ts`

#### 必需文件夹
- `.vscode/`
- `appPackage/`
- `env/`

#### 必需文件
- `appPackage/manifest.json`
- `appPackage/color.png`
- `appPackage/outline.png`
- `env/.env.dev`
- `m365agents.yml`
- `m365agents.local.yml`
- `README.md`

### 2. Teams App YAML 验证

**验证器**: `teamsAppYamlValidator.ts`

验证 `m365agents.yml` 文件：

| 规则 | 要求 |
|------|------|
| Rule 1 | **不能有** `projectId` 字段 |
| Rule 2 | 必须有 `provision` 阶段，包含 `teamsApp/create` action |
| Rule 3 | 必须有 `deploy` 阶段 |
| Rule 4 | 必须有 `publish` 阶段，包含 `teamsApp/publishAppPackage` action |
| Rule 5 | `teamsApp/create` 必须写入 `TEAMS_APP_ID` 环境变量 |
| Rule 6 | 必须有 `sampleTag`，格式为 `repo:name`（如 `TeamsFx-Samples:sample-name`） |

### 3. App Manifest 验证

**验证器**: `teamsAppManifestValidator.ts`

验证 `appPackage/manifest.json`：

| 规则 | 要求 |
|------|------|
| Rule 1 | `id` 必须为 `${{TEAMS_APP_ID}}`（占位符引用） |
| Rule 2 | `manifestVersion` 应为 `1.22.0`（与 Microsoft 365 Agents Toolkit 对齐） |

### 4. 环境文件验证

**验证器**: `envValidator.ts`

验证 `env/.env.dev` 和 `env/.env.local`：

- **允许有值的变量**: `TEAMSFX_ENV`、`APP_NAME_SUFFIX`、`TEAMS_APP_NAME`
- **其他变量**: 不能有实际值（应为空或占位符）

### 5. 图片验证

**验证器**: `imageValidator.ts`

验证 `assets/` 下的图片：

| 文件 | 要求 |
|------|------|
| `thumbnail.png` | 分辨率比例为 **40:23**（如 1600×920 或 800×460） |
| `sampleDemo.gif` | 分辨率比例为 **40:23**（如 1600×920 或 800×460） |

### 6. Package.json 验证

**验证器**: `packageJsonValidator.ts`

| 规则 | 要求 |
|------|------|
| `engines.node` | 必须兼容 Node.js 22 |

---

## 本地运行验证

### 前置条件

```bash
cd validation-tool
npm install
```

### 验证 Sample Config

```powershell
node validate-config.js ../.config/samples-config-v3.json
```

### 验证单个 Sample

```powershell
# 验证指定 sample
node validator.cjs -p ../coffee-agent

# 或者进入 sample 目录后验证
cd ../coffee-agent
node ../validation-tool/validator.cjs
```

### 命令选项

```
-p, --path <path>    指定要验证的 sample 项目路径
-V, --version        显示版本
-h, --help           显示帮助
```

### 重新编译（可选）

如果修改了验证器源码：

```powershell
npm run build
```

---

## 常见问题

### Q1: PR 删除一个 sample，pipeline 会成功吗？

**取决于是否同时更新配置文件**：

| 操作 | 结果 |
|------|------|
| ✅ 删除 sample 文件夹 **+** 从 `samples-config-v3.json` 移除配置 | Pipeline 成功 |
| ❌ 只删除 sample 文件夹，不更新配置 | Pipeline 失败（会尝试验证不存在的路径） |

### Q2: 如何跳过某个 sample 的验证？

将 sample ID 添加到 workflow 文件中的 `exceptions` 数组：

```yaml
exceptions=("incoming-webhook-notification" "hello-world-office-addin" "your-sample-id")
```

### Q3: 外部 sample 会被验证吗？

不会。配置文件中带有 `downloadUrlInfo` 字段的 sample 被视为外部 sample，会自动跳过验证。

### Q4: 验证失败如何调试？

1. 本地运行验证脚本查看详细输出
2. 检查 GitHub Actions 日志中的具体错误信息
3. 对照本文档检查是否满足所有要求

---

## 验证清单

在提交 PR 前，确保你的 sample 满足以下要求：

- [ ] 包含必需的文件夹结构（`.vscode/`, `appPackage/`, `env/`）
- [ ] 包含必需的文件（manifest.json, 图标, 环境文件, YAML 配置, README）
- [ ] `m365agents.yml` 无 `projectId`，有正确的 `sampleTag`
- [ ] `manifest.json` 中 `id` 为 `${{TEAMS_APP_ID}}`
- [ ] 环境变量文件中无敏感信息或实际值
- [ ] `assets/thumbnail.png` 和 `sampleDemo.gif` 比例正确（40:23）
- [ ] `package.json` 中 `engines.node` 兼容 Node.js 22
- [ ] 已在 `samples-config-v3.json` 中添加/更新配置
