---
id: 141
name: Connect to Kraken
slug: connect-to-kraken
description: Step-by-step guide to connecting your Kraken account to Gainium via API keys.
createdAt: '2026-03-30T11:44:00.000Z'
updatedAt: '2026-03-30T11:44:00.000Z'
publishedAt: '2026-03-30T11:44:00.000Z'
locale: en
categories:
  - exchanges-apis
difficulty: intermediate
tags:
  - kraken
ingested: false
tldr: >-
  Step-by-step guide to connecting Kraken to Gainium. Create an API key on
  Kraken Pro with Orders & Trades permissions enabled, whitelist Gainium's IPs,
  then paste your API Key and Private Key into Gainium.
---

Gainium uses APIs to connect to your exchange and execute trades. This guide walks you through creating a Kraken API key and linking it to your Gainium account.

## Step 1 – Sign in to Kraken Pro

Go to [pro.kraken.com](https://pro.kraken.com/) and log in to your Kraken account. Kraken API management is handled through **Kraken Pro** (not the standard Kraken app).

## Step 2 – Open API Settings

Click the **profile icon** in the top-right corner of the page to open the account menu.

Select **Settings**, then click the **API** tab.

## Step 3 – Create a New API Key

Click **Create API Key** (or **Add Key**).

## Step 4 – Name Your Key

Give your key a descriptive name, such as **"Gainium"**. The name must be unique — no two API keys on the same account can share the same name.

## Step 5 – Set API Permissions

Kraken uses granular permission settings. For Gainium to trade on your behalf, enable the following:

**Funds:**
- ✅ **Query Funds** — allows Gainium to read your account balance

**Orders & Trades:**
- ✅ **Query Open Orders & Trades** — required to monitor active positions
- ✅ **Query Closed Orders & Trades** — required for trade history
- ✅ **Modify Orders** — required to place new orders
- ✅ **Cancel/Close Orders** — required to close or cancel orders

> Do **not** enable **Withdraw Funds** unless you explicitly need it. Gainium does not require withdrawal permissions.

**Optional:**
- ✅ **Query Ledger Entries** — useful for PnL tracking
- ✅ **Access WebSockets API** — recommended for real-time data

**IP Whitelist (Recommended):**

Under **IP whitelisting**, add the following Gainium server IPs to restrict API access to trusted sources only:

```
78.128.60.89
78.128.43.82
78.128.8.36
78.128.43.168
217.174.152.25
```

## Step 6 – Generate the Key

Click **Generate Key** to create the API key.

> **Important:** Your **API Key** and **Private Key** (also called Secret) are shown only once. Copy both immediately and store them in a secure location such as a password manager. If you lose the Private Key, you will need to delete this key and create a new one.

## Step 7 – Connect to Gainium

1. Log in to [app.gainium.io](https://app.gainium.io) and go to the **Exchanges** page.
2. Click **Add New** in the top-right corner.
3. In the popup, select **Kraken** from the exchange list.
4. Paste your **API Key** and **Private Key** into the respective fields.
5. Click **Add Exchange**.

Gainium will verify the connection. Once confirmed, your Kraken account will appear in your exchange list and your balance will be visible.

You're all set — your bots can now trade on Kraken!
