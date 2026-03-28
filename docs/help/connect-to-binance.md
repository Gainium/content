---
id: 3
name: Connect to Binance
slug: connect-to-binance
description: Learn how to connect Gainium to Binance.
createdAt: '2022-08-04T06:56:17.511Z'
updatedAt: '2026-02-24T07:44:20.567Z'
publishedAt: '2022-08-04T06:56:46.683Z'
locale: en
categories:
  - exchanges-apis
difficulty: intermediate
tags:
  - binance
ingested: true
ingestedAt: '2025-06-29T10:57:30.002Z'
tldr: >-
  Step-by-step guide to connecting Binance to Gainium via API keys. Binance
  requires ED25519 API keys for Spot trading—generate a key pair with OpenSSL,
  upload the public key to Binance, then enter the API key and private key in
  Gainium.
---

Gainium uses APIs to connect to your exchange and make trades. In this article, we will show you how to generate an API key in Binance and connect your account to Gainium.

> **Important Update (February 2026):** Binance now requires ED25519 API keys for Spot trading. Users with existing Spot Binance connections must update their API keys to ED25519 format by February 20, 2026. This does not require creating a new exchange account in Gainium — you can simply update your existing keys.

## Step 1 - Open Binance Dashboard

Switch to the new browser tab, log in, or create a new account on [*https://binance.com/*](https://binance.com/).

## Step 2 – Find "API Management" in Binance

Move your cursor over the profile icon in the upper right corner and choose "API Management."

![API management.webp](https://content.gainium.io/images/content/help/API_management_7ed61dd841-a122f4.webp)

## Step 3 - Create API (Select Self-generated)

Click "Create API" and select **"Self-generated"** as the API type. This is required for ED25519 keys.

![Select Self-generated](https://content.gainium.io/images/content/help/step1-self-generated.png)

## Step 4 – Generate Your ED25519 Key Pair

Before proceeding in Binance, you need to generate an ED25519 key pair on your computer.

### For macOS and Linux users

Open your terminal and run the following commands:

```bash
openssl genpkey -algorithm ed25519 -out private_key.pem
openssl pkey -in private_key.pem -pubout -out public_key.pem
```

This will create two files:
- `private_key.pem` - Your private key (keep this safe and secret!)
- `public_key.pem` - Your public key (you'll paste this into Binance)

### For Windows users

1. Download and install [OpenSSL for Windows](https://slproweb.com/products/Win32OpenSSL.html)
2. Open Command Prompt or PowerShell
3. Run the same commands as above

> **Security tip:** Store your `private_key.pem` file securely. You will need the contents of this file when connecting to Gainium. Never share your private key with anyone.

## Step 5 – Label/Name Your Key and Enter Public Key

When you have several APIs, having a proper name makes it easier to manage them. Name your key (for example, "Gainium") and then paste your public key from `public_key.pem`.

![Enter public key](https://content.gainium.io/images/content/help/step3-public-key.png)

Security tip: Enable [two-factor authentication](https://academy.binance.com/en/articles/binance-2fa-guide) (2FA) on your account before creating an API.

## Step 6 - Enter 2FA Codes

After clicking the "Create" button, you will be asked to enter 2FA codes.

![Security.webp](https://content.gainium.io/images/content/help/Security_c28ef61c77-cd8799.webp)

Your API has now been created. **Copy your API Key now as you'll need it for Gainium.**

## Step 7 - Edit the API Restrictions

Click on "Edit restrictions". Then, click on "Restrict access to trusted IPs only (Recommended)" and input the following IPs:

```
78.128.60.89 78.128.43.82 78.128.8.36 78.128.43.168 217.174.152.25
```

Enable the necessary permissions for trading and click "Confirm".

![IP restrictions and permissions](https://content.gainium.io/images/content/help/step4-restrictions.png)

## Step 7.b (Optional) Enable Symbol Whitelist

If you only trade specific token pairs, you can enhance the security of your API keys even further by activating token symbol whitelist. This will prevent a hacking technique known as "Contra trading". Contra trading is a market manipulation tactic by which a hacker generates enough trading volume to move the market in their desired direction and profit from that move. Generally, it involves lower cap tokens, as they require less volume to produce price movements. Enabling Symbol Whitelist will prevent hackers from using such tactics with your API keys.

![Screenshot 2023-08-02_19-16-49.png](https://content.gainium.io/images/content/help/Screenshot_2023_08_02_19_16_49_0017709544-91d578.png)![Screenshot 2023-08-02_19-18-19.png](https://content.gainium.io/images/content/help/Screenshot_2023_08_02_19_18_19_b6fe71d6eb-a4ff1a.png)

## Step 8 – Connecting Gainium to Binance

Login to the dashboard of gainium.io and click on the Exchanges icon, then "Add new".

![gainium-add-exchange.png](https://content.gainium.io/images/content/help/gainium_add_exchange_c55c474ea1-2b91de.png)

On the pop-up window, make sure that you have selected "Real" exchange. Then select "Binance" from the dropdown menu.

For ED25519 keys, you need to enter:
- **API Key**: The API key from Binance
- **Private Key**: The entire contents of your `private_key.pem` file, including the header and footer lines

![Private key content](https://content.gainium.io/images/content/help/private-key-content.jpg)

The private key should include everything: `-----BEGIN PRIVATE KEY-----`, the key content, and `-----END PRIVATE KEY-----`.

![Enter Binance credentials in Gainium](https://content.gainium.io/images/content/help/step5-gainium-exchange.png)

Click "Add exchange" and wait a few seconds for the system to retrieve your Binance account data.

That's it! Your Gainium account is now connected to Binance with the new ED25519 keys.

## Updating Existing Binance Connections

If you already have a Binance connection in Gainium and need to update to ED25519 keys:

1. Generate a new ED25519 key pair following Step 4 above
2. Create a new API key in Binance with the Self-generated option
3. In Gainium, go to your Exchanges page
4. Click on your existing Binance exchange and select "Edit"
5. Update the API Key and Private Key with your new credentials
6. Save the changes

After saving, verify that the exchange status shows "OK":

![Exchange status OK](https://content.gainium.io/images/content/help/exchange-status-ok.jpg)

Your bots and settings will remain intact — only the API credentials will be updated.
