---
id: 140
name: Connect to Binance US
slug: connect-to-binance-us
description: Step-by-step guide to connecting your Binance.US account to Gainium via API keys.
createdAt: '2026-03-30T11:44:00.000Z'
updatedAt: '2026-03-30T11:44:00.000Z'
publishedAt: '2026-03-30T11:44:00.000Z'
locale: en
categories:
  - exchanges-apis
difficulty: intermediate
tags:
  - binance-us
ingested: false
tldr: >-
  Step-by-step guide to connecting Binance.US to Gainium. Generate an API key
  in the Binance.US API Management page, enable Spot Trading permissions,
  whitelist Gainium's server IPs, then paste your API Key and Secret into
  Gainium.
---

Gainium uses APIs to connect to your exchange and execute trades. This guide walks you through creating a Binance.US API key and linking it to your Gainium account.

> **Note:** Binance.US is a separate platform from Binance (global). If you have a Binance.US account, use this guide. For global Binance, see [Connect to Binance](/help/connect-to-binance).

## Step 1 – Log in to Binance.US

Go to [binance.us](https://www.binance.us/) and log in to your account.

> **Requirement:** You must have completed **Basic Verification** (KYC) on Binance.US to access the API Management feature.

## Step 2 – Go to API Management

Hover over your email address in the top navigation bar. In the dropdown menu, click **API Management**.

## Step 3 – Create a New API Key

Enter a descriptive label for your API key — something like **"Gainium"** — so you can identify it easily later.

Click **Create API**.

## Step 4 – Complete Two-Factor Authentication

You will be prompted to verify your identity via:
- Your chosen **2FA method** (SMS or Authenticator app)
- A **confirmation email**

Complete both verification steps to proceed.

## Step 5 – Copy Your API Key and Secret Key

Once verified, your **API Key** and **Secret Key** will be displayed. **Copy them immediately** — the Secret Key is only shown once and cannot be retrieved later.

Store both keys securely (a password manager is recommended).

## Step 6 – Configure API Permissions

After the key is created, click **Edit Restrictions** to configure it:

**Enable Spot Trading:**
Toggle on **Enable Spot & Margin Trading** to allow Gainium to place orders on your behalf.

> Do **not** enable Withdrawals. Gainium only needs trading permissions.

**IP Whitelist (Recommended):**
Enable **Restrict access to trusted IPs only** and add the following Gainium server IPs:

```
78.128.60.89
78.128.43.82
78.128.8.36
78.128.43.168
217.174.152.25
```

Save your changes.

## Step 7 – Connect to Gainium

1. Log in to [app.gainium.io](https://app.gainium.io) and go to the **Exchanges** page.
2. Click **Add New** in the top-right corner.
3. In the popup, select **Binance US** from the exchange list.
4. Paste your **API Key** and **Secret Key** into the respective fields.
5. Click **Add Exchange**.

Gainium will verify the connection. Once confirmed, your Binance.US account will appear in your exchange list and your balance will be visible.

You're all set — your bots can now trade on Binance.US!
