---
id: 139
name: Connect to Bitget
slug: connect-to-bitget
description: Step-by-step guide to connecting your Bitget account to Gainium via API keys.
createdAt: '2026-03-30T11:44:00.000Z'
updatedAt: '2026-03-30T11:44:00.000Z'
publishedAt: '2026-03-30T11:44:00.000Z'
locale: en
categories:
  - exchanges-apis
difficulty: intermediate
tags:
  - bitget
ingested: false
tldr: >-
  Step-by-step guide to connecting Bitget to Gainium. Create a System-generated
  API key on Bitget, set an API Passphrase, enable Read-Write and Spot trading
  permissions, whitelist Gainium's IPs, then paste your API Key, Secret Key,
  and Passphrase into Gainium.
---

Gainium uses APIs to connect to your exchange and execute trades. This guide walks you through creating a Bitget API key and linking it to your Gainium account.

## Step 1 – Log in to Bitget

Go to [bitget.com](https://www.bitget.com/) and log in to your account. If you don't have an account yet, create one and complete identity verification first.

> **Note:** Bitget requires either **2FA (Google Authenticator)** or **phone number (SMS) verification** to be enabled before you can create API keys. If you haven't set this up yet, go to **Profile → Security Settings** and enable it before continuing.

## Step 2 – Go to API Management

Click on your profile icon in the top-right corner and select **API Keys** from the dropdown menu.

## Step 3 – Create a New API Key

Click the **Create API Key** button.

When prompted to choose an API key type, select **System-generated API Key** and click the arrow to continue.

## Step 4 – Configure the API Key

Give your key a recognizable name, such as **"Gainium"**, so you can easily identify it later.

You will also be asked to create an **API Passphrase** — this is a custom password you set yourself. Write it down and store it securely. You will need it when connecting to Gainium.

**Set the following permissions:**
- **Read-Write** (enabled by default)
- **Spot** – required for spot trading bots

> If you plan to run **Futures bots**, also enable **Orders** and **Futures-Holdings** permissions.

**IP Whitelist (Recommended)**

Restrict the API key to Gainium's servers by whitelisting the following IPs:

```
78.128.60.89
78.128.43.82
78.128.8.36
78.128.43.168
217.174.152.25
```

## Step 5 – Complete Security Verification

Enter your **email verification code** and **2FA code** when prompted, then click **Verify**.

## Step 6 – Copy Your API Key and Secret Key

Once the key is created, **copy both the API Key and the Secret Key immediately**. The Secret Key is only shown once and cannot be retrieved later.

Store them securely alongside your Passphrase.

## Step 7 – Connect to Gainium

1. Log in to [app.gainium.io](https://app.gainium.io) and go to the **Exchanges** page.
2. Click **Add New** in the top-right corner.
3. In the popup, select **Bitget** from the exchange list.
4. Paste your **API Key**, **Secret Key**, and **Passphrase** into the respective fields.
5. Click **Add Exchange**.

Gainium will verify the connection. Once confirmed, your Bitget account will appear in your exchange list and your balance will be visible.

You're all set — your bots can now trade on Bitget!
