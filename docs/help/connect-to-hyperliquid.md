---
id: 102
name: Connect to Hyperliquid
slug: connect-to-hyperliquid
description: >-
  In this article you will learn how to connect your Hyperliquid account to
  Gainium using an API (agent) wallet for trading while keeping your main wallet
  secure.
createdAt: '2025-09-26T00:00:00.000Z'
updatedAt: '2026-02-24T07:44:20.568Z'
publishedAt: '2024-04-06T11:33:03.122Z'
locale: en
categories:
  - exchanges-apis
difficulty: intermediate
tags: []
ingested: false
ingestedAt: '2025-06-29T10:57:30.003Z'
tldr: >-
  Two methods to connect Hyperliquid to Gainium: the recommended Web3 wallet
  connection (via MetaMask/WalletConnect with no API keys needed), or the
  advanced API wallet method. Both methods offer a choice between Free User mode
  (builder fees, no credit consumption) and Paid User mode (no builder fees,
  credits consumed).
---
# How to Connect Hyperliquid Exchange to Gainium

Gainium offers two methods to connect your Hyperliquid account. Choose the one that best fits your needs.

---

## Option 1: Web3 Wallet Connection (Recommended)

The easiest and most secure way to connect Hyperliquid is by using your Web3 wallet directly. This method doesn't require creating API keys or managing private keys.

### Steps:

1. In Gainium, go to the **Exchanges** page and choose **Hyperliquid**.
2. Select the **Web3 Wallet** connection option.
3. Click **Connect Wallet** and choose your preferred Web3 wallet (MetaMask, WalletConnect, etc.).
4. Approve the connection request in your wallet.
5. Choose your user mode:
   - **Free User**: Pay builder fees (0.07% spot, 0.045% futures) and don't consume bot credits
   - **Paid User**: No builder fees, but bots consume credits from your subscription plan
6. Confirm the connection.

That's it! Your Hyperliquid account is now connected and ready to trade.

> **Benefits of Web3 Wallet Connection:**
> - No need to create or manage API keys
> - More secure - your private keys never leave your wallet
> - Simpler setup process
> - Easy to switch between accounts

![Connect to hyperliquid](https://content.gainium.io/images/content/help/connect-hyperliquid.webp)
---

## Option 2: API Wallet Connection (Advanced)

For advanced users who prefer API-based connections, you can set up Hyperliquid using an API (agent) wallet. Follow these steps to set up Hyperliquid and link it to Gainium.

### 1. Connect your wallet to Hyperliquid

- Go to [https://app.hyperliquid.xyz/](https://app.hyperliquid.xyz/).
- Click **Connect** on the top-right corner.
- Hyperliquid uses **USDC on the Arbitrum network**. If your wallet is on another network, you’ll be prompted to switch.

![](https://content.gainium.io/images/content/help/20250926_102427_iShot_2025-09-26_09.07.54.webp)

![](https://content.gainium.io/images/content/help/20250926_102444_iShot_2025-09-26_09.08.02.webp)

![](https://content.gainium.io/images/content/help/20250926_102505_iShot_2025-09-26_09.08.12.webp)

---

### 2. Enable trading

- Click **Enable Trading** in the app.

  ![](https://content.gainium.io/images/content/help/20250926_102518_iShot_2025-09-26_09.08.33.webp)
- If you haven’t deposited funds yet, Hyperliquid will ask you to deposit **USDC** (make sure to have USDC in Arbitrum Network).
- You can also deposit **USDT**, which will be auto-converted to USDC (conversion fees apply).

  ![](https://content.gainium.io/images/content/help/20250926_102634_iShot_2025-09-26_08.52.56.webp)
- Make sure you have some **ETH** in your wallet to cover Arbitrum gas fees.

  ![](https://content.gainium.io/images/content/help/20250926_102740_iShot_2025-09-26_08.28.25.webp)

---

### 3. Deposit funds

- Complete the deposit and wait for **block confirmation**.

  ![](https://content.gainium.io/images/content/help/20250926_102832_iShot_2025-09-26_08.53.34.webp)
- If your balance still shows as **0** after a few minutes:
- Double-check you’re looking at the correct market.

  ![](https://content.gainium.io/images/content/help/20250926_102915_iShot_2025-09-26_08.57.42.webp)

  ![](https://content.gainium.io/images/content/help/20250926_102902_iShot_2025-09-26_08.58.13.webp)
- Deposits default to your **Perps account**, but you can transfer between **Spot** and **Perps** inside the app.

---

### 4. Create an API (Agent) Wallet on Hyperliquid

Hyperliquid lets you create API ("agent") wallets that can submit trades on behalf of your main account but **cannot withdraw funds**. You will still use your **main EVM wallet address** for balance / info queries. The API wallet only supplies a private key for trade signing.

> Important: You will pair your **main wallet address** with the **API wallet private key** inside Gainium.

**Steps:**

1. Open the API page: [https://app.hyperliquid.xyz/API](https://app.hyperliquid.xyz/API)
2. Enter an **API Name**, click **Generate Wallet Address**, then click **Authorize API Wallet**
3. Copy the **Private Key** shown and confirm / authorize the action.

![](https://content.gainium.io/images/content/help/20250926_185419_image.webp)

4. Verify the new API wallet now appears in your API wallet list.

![](https://content.gainium.io/images/content/help/20250926_183310_image.webp)

Keep the private key safe. You can create/revoke API wallets at any time from this page.

---

### 5. Connect Hyperliquid to Gainium with API Keys

Now that you have funds on Hyperliquid and an API wallet created:

1. In Gainium, go to the **Exchanges** page and choose **Hyperliquid**.
2. Select the **API Wallet** connection option.

![](https://content.gainium.io/images/content/help/20250926_183854__2025-09-26.webp)

3. Fill the fields as follows:

- **Wallet**: Enter your **main EVM wallet address** (NOT the API wallet address). This is the address that actually holds your funds.

![](https://content.gainium.io/images/content/help/20250926_183920__2025-09-26.webp)

- **Private Key**: Paste the **API (agent) wallet private key** you copied in Step 4 (NOT your main wallet's private key).

4. Choose your user mode:
   - **Free User**: Pay builder fees and don't consume bot credits
   - **Paid User**: No builder fees, but bots consume credits from your plan

5. Save / Connect.

**Why this pairing?** Hyperliquid authorizes trading via the API wallet key while attributing balances and risk to your main wallet address. This improves security because you never expose your main wallet’s private key.

**If you created multiple API wallets:** You may use any one of them with the same main wallet address. Revoke unused keys to reduce risk.

---

## Verify Your Connection

Regardless of which connection method you chose:

1. After a successful connection, Gainium will display your **USDC balance**.
2. Start a small test order to confirm everything is working.
3. You're ready to trade!

![](https://content.gainium.io/images/content/help/20250926_103235_iShot_2025-09-26_09.02.12.webp)

---

## Learn More

- [Unlimited Trading in Hyperliquid](https://gainium.io/help/unlimited-trading-hyperliquid)
- Learn about builder fees and free vs paid user modes
