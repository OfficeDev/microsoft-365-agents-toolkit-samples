# Teams Notifications Sample with Persistent Targeting

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=dev&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fteams-notifications%2Fdevcontainer.json&resume=1)


## Overview

This sample demonstrates how to build a **Microsoft Teams notification application**
using the **Microsoft 365 Agents Toolkit** that can send proactive notifications to
**Teams channels or individual users** with **persistent targeting**.

This sample is an **enhanced version of the `notification-codespaces` sample**.
In addition to HTTP-triggered notifications, it introduces **Azure Blob Storage**
to persist notification targets and **Microsoft Graph API** to resolve user identity,
making it suitable for real-world notification scenarios.

![Notification Message in Teams](https://user-images.githubusercontent.com/10163840/224254253-21b4dedd-1079-4cda-ac9e-cd3bce725702.png)

## Enhancements Compared to notification-codespaces

| Capability | notification-codespaces | teams-notifications |
|---------|--------------------------|---------------------|
| HTTP-triggered notifications | ✅ | ✅ |
| Adaptive Cards | ✅ | ✅ |
| Send to Teams channel | ⚠️ Static | ✅ Persisted by channel ID |
| Send to individual users | ❌ | ✅ |
| Persistent target storage | ❌ | ✅ Azure Blob Storage |
| User identity resolution | ❌ | ✅ Microsoft Graph API |
| Reusable notification targets | ❌ | ✅ |

---

## This Sample Illustrates

- How to build a Teams notification app using **Microsoft 365 Agents Toolkit**
- How to send proactive notifications to:
  - Teams **channels**
  - **specific user**
- How to persist notification targets using **Azure Blob Storage**
- How to store and index:
  - Channels using **channel ID**
  - Users using **email address**
- How to retrieve a Teams user's email using **Microsoft Graph API**
- How to send:
  - Plain text messages
  - Adaptive Cards
- How to use **GitHub Codespaces** to run and preview a Teams app

---

## How Target Resolution Works

1. When the app is installed in Teams, the **Teams user ID** is available.
2. The app uses **Microsoft Graph API** to retrieve the user's email address.
3. User references are stored in **Azure Blob Storage**, indexed by email.
4. Channel references are stored using the **Teams channel ID**.
5. When a notification request is received:
   - The target (channel ID or user email) is resolved from Blob Storage
   - A proactive message or Adaptive Card is sent to the target

---

## Prerequisite to use this sample
- A GitHub account which will be used to create a codespace with fully configured dev environments in the cloud. 
- A Microsoft 365 tenant in which you have permission to upload Teams apps. You can get a free Microsoft 365 developer tenant by joining the [Microsoft 365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program).
- An Azure subscription
- An Azure Blob Storage account
- Microsoft Graph API permissions:
  - `User.ReadBasic.All`
- Node.js (if running locally)

## Minimal path to awesome

### Run the app in Codespaces
1. Click [Open in GitHub Codespaces badge](#getting-started-with-notification-sample) to create a codespace for the sample app.

    > Note: you can customize the creation options (e.g. region, machine type) according to your needs.

2. Once your codespace is created, Select the Microsoft 365 Agents Toolkit icon on the left in the VS Code toolbar. 

3. Select `Preview your Teams app (F5)` from Microsoft 365 Agents Toolkit or simply press `F5` to run and preview your application.

4. When Teams Web Client is launched in the browser, select the `Add` button in the dialog to install your app to Teams.

   > **Note**: You may need to **allow pop-ups** so that Codespace can open a new browser to sideload the app to Teams:
   >
   > ![image](https://user-images.githubusercontent.com/10163840/225506097-18d04d70-ea4c-4a10-bde4-9d38654a2e72.png)

5. Open a terminal in your Codespaces, and send a POST request to the app with the following command:
   
   ### Request Body Parameters

| Parameter      | Type    | Required | Description |
|----------------|---------|----------|-------------|
| `email`        | string  | Optional | Target user email (used to resolve user via Microsoft Graph) |
| `channelId`    | string  | Optional | Target Teams channel ID |
| `message`      | string  | Required | Plain text message to send |
| `adaptiveCard` | boolean | Required | If true, sends the message as an Adaptive Card; if false or omitted, sends as plain text |

> **Note**: Either `email` or `channelId` must be provided.
### Example: Send a Message to a User

```bash
curl -X POST http://localhost:3978/api/notification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@contoso.com",
    "message": "Hello from Teams Notifications sample!",
    "adaptiveCard": false
  }'

  or

  curl -X POST http://localhost:3978/api/notification \
  -H "Content-Type: application/json" \
  -d '{
    "channelId": "19:abc123def456@thread.tacv2",
    "message": "Hello channel!",
    "adaptiveCard": true
  }'
```

### Deploy the app to Azure
- From VS Code: 
    1. Sign into Azure by clicking the `Sign in to Azure` under the `ACCOUNTS` section from sidebar.
    1. Click `Provision` from `LIFECYCLE` section or open the command palette and select: `Microsoft 365 Agents: Provision`.
    1. Click `Deploy` or open the command palette and select: `Microsoft 365 Agents: Deploy`.
- From Microsoft 365 Agents Toolkit CLI:
    1. Run command: `atk auth login azure`.
    1. Run command: `atk provision --env dev`.
    1. Run command: `atk deploy --env dev`.

### Preview the app in Teams
- From VS Code: 
    1. Open the `Run and Debug Activity` Panel. Select `Launch Remote (Codespaces)` from the launch configuration drop-down.
- From Microsoft 365 Agents Toolkit CLI:
    1. Run command: `atk preview --env dev`.

## Version History
|Date| Author| Comments|
|---|---|---|
|Apr 3, 2023| Dooriya Li | Add notification sample for codespaces |
|Jun 25, 2025| Ning Liu | Update dependency to Agents SDK |
|Jan 11, 2026| Obada Jabban | Add teams-notifications sample with persistent channel and user targeting

## Feedback
We really appreciate your feedback! If you encounter any issue or error, please report issues to us following the [Supporting Guide](https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/SUPPORT.md). Meanwhile you can make [recording](https://aka.ms/teamsfx-record) of your journey with our product, they really make the product better. Thank you!
