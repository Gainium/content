---
id: 141
name: Connect to Kraken
slug: connect-to-kraken
description: Step-by-step guide to connecting your Kraken account to Gainium via API keys.
createdAt: '2026-03-30T11:44:00.000Z'
updatedAt: '2026-08-01T00:00:00.000Z'
publishedAt: '2026-03-30T11:44:00.000Z'
locale: en
categories:
  - exchanges-apis
difficulty: intermediate
tags:
  - kraken
ingested: false
tldr: >-
  Step-by-step guide to connecting Kraken to Gainium. Kraken SPOT and Kraken
  Futures use two separate platforms and two separate API keys. Spot keys are
  created on Kraken Pro (Orders & Trades plus WebSocket interface permissions,
  Gainium IPs whitelisted); futures keys are created on futures.kraken.com with
  General API = Full Access, Withdrawal API = No Access, and no IP whitelist.
---

Gainium uses APIs to connect to your exchange and execute trades. This guide walks you through creating a Kraken API key and linking it to your Gainium account.

> **Read this first:** Kraken runs **two separate platforms** — Kraken (spot) and Kraken Futures (derivatives). They have **separate API key systems**: a spot key will not work for futures, and a futures key will not work for spot. Pick the section below that matches what you want to trade. If you want to run both spot and futures bots, create **both** keys and add **two** exchange connections in Gainium.

## Kraken SPOT API key

Use this if you want to connect **Kraken SPOT** in Gainium.

### Step 1 – Sign in to Kraken Pro

Go to [pro.kraken.com](https://pro.kraken.com/) and log in to your Kraken account. Kraken API management is handled through **Kraken Pro** (not the standard Kraken app).

### Step 2 – Open API Settings

Click the **profile icon** in the top-right corner of the page to open the account menu.

Select **Settings**, then click the **API** tab.

### Step 3 – Create a New API Key

Click **Create API Key** (or **Add Key**).

### Step 4 – Name Your Key

Give your key a descriptive name, such as **"Gainium"**. The name must be unique — no two API keys on the same account can share the same name.

### Step 5 – Set API Permissions

Kraken uses granular permission settings. For Gainium to trade on your behalf, enable the following:

**Funds:**
- ✅ **Query Funds** — allows Gainium to read your account balance

**Orders & Trades:**
- ✅ **Query Open Orders & Trades** — required to monitor active positions
- ✅ **Query Closed Orders & Trades** — required for trade history
- ✅ **Modify Orders** — required to place new orders
- ✅ **Cancel/Close Orders** — required to close or cancel orders

**WebSocket:**
- ✅ **WebSocket interface** (also shown as **Access WebSockets API**) — **required**. Gainium uses Kraken's WebSocket feed to receive order fills and balance changes in real time. Without this permission the connection cannot be verified, and bots would only learn about fills with a delay.

> Do **not** enable **Withdraw Funds** unless you explicitly need it. Gainium does not require withdrawal permissions.

**Optional:**
- ✅ **Query Ledger Entries** — useful for PnL tracking

**IP Whitelist (Recommended):**

Under **IP whitelisting**, add the following Gainium server IPs to restrict API access to trusted sources only:

```
62.84.191.108
62.84.191.109
62.84.191.110
62.84.191.111
62.84.191.112
```

### Step 6 – Generate the Key

Click **Generate Key** to create the API key.

> **Important:** Your **API Key** and **Private Key** (also called Secret) are shown only once. Copy both immediately and store them in a secure location such as a password manager. If you lose the Private Key, you will need to delete this key and create a new one.

### Step 7 – Connect to Gainium

1. Log in to [app.gainium.io](https://app.gainium.io) and go to the **Exchanges** page.
2. Click **Add New** in the top-right corner.
3. In the popup, select **Kraken SPOT** from the exchange list.
4. Paste your **API Key** and **Private Key** into the respective fields.
5. Click **Add Exchange**.

Gainium will verify the connection. Once confirmed, your Kraken account will appear in your exchange list and your balance will be visible.

You're all set — your bots can now trade on Kraken!

## Kraken Futures API key

Use this if you want to connect **Kraken USDⓈ-M Futures** in Gainium. Kraken Futures (also called Kraken Derivatives) is a **different platform** with its own login and its own API keys — the key you created on Kraken Pro above will **not** work here.

### Step 1 – Sign in to Kraken Futures

Go to [futures.kraken.com](https://futures.kraken.com/) and log in. You can use the same Kraken credentials, but note that this is the derivatives platform, not Kraken Pro.

### Step 2 – Open API Settings

Click **your name** in the **top-right corner**, then select **Settings**.

In the **API** panel, select the **Create Key** tab.

### Step 3 – Set Permissions

Kraken Futures has just two permission settings:

- **General API:** select **Full Access** — this is the master permission that lets Gainium read your account and place, modify and cancel orders. It **cannot withdraw** digital assets, so it is safe to grant.
- **Withdrawal API:** leave it on **No Access**. Gainium never needs withdrawal permissions.

> Do not choose **Read Only** for General API — Gainium would be able to see your account but not trade, and your bots would fail to open positions.

### Step 4 – Create the Key

Click **Create Key**.

> **Important:** The **private key** is shown **only once** and cannot be viewed again later. Copy both the public key and the private key immediately and store them somewhere safe, such as a password manager. If you lose the private key you must delete the key and create a new one.

### Step 5 – IP whitelisting does not apply here

**Skip the IP whitelist step.** Unlike Kraken SPOT, **Kraken Futures has no per-key IP whitelist** — there is nothing to configure, and you do **not** need to add Gainium's server IPs.

If you come across Kraken's article about "IP whitelisting for direct access" on the futures platform, that is a separate **network latency / colocation** feature, not an API key restriction. It is unrelated to connecting Gainium.

### Step 6 – Connect to Gainium

1. Log in to [app.gainium.io](https://app.gainium.io) and go to the **Exchanges** page.
2. Click **Add New** in the top-right corner.
3. In the popup, select **Kraken USDⓈ-M Futures** from the exchange list.
4. Paste your **public key** into the **API Key** field and your **private key** into the **Private Key** field.
5. Click **Add Exchange**.

Gainium will verify the connection and your futures balance will appear in your exchange list.

> **Rotating your keys?** If you receive an email asking you to re-create your API keys, remember to rotate the key on **each** platform you use: the spot key on [pro.kraken.com](https://pro.kraken.com/) and the futures key on [futures.kraken.com](https://futures.kraken.com/). Updating only one leaves the other connection broken.
