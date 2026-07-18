---
id: 96
name: Connect to OKX
slug: connect-to-okx
description: This guide will walk you through step by step how to connect OKX to Gainium.
createdAt: '2023-12-04T16:34:41.588Z'
updatedAt: '2026-07-18T00:00:00.000Z'
publishedAt: '2023-12-04T16:34:45.153Z'
locale: en
categories:
  - exchanges-apis
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.003Z'
tldr: >-
  Step-by-step guide to connecting OKX to Gainium by creating an API key. Select
  "Linking third-party apps" and choose "Gainium" from the app name dropdown,
  enable Trade permissions, then enter the credentials in Gainium. Set the OKX
  Origin (Advanced Settings) to match the OKX platform your account is on —
  okx.com (global), my.okx.com (EU/EEA), or app.okx.com (regional entities such
  as OKX US / Australia) — or the connection will fail.
---

This guide will walk you through creating a new API key in OKX and inputting the details into Gainium's exchange page, enabling seamless integration for enhanced trading experiences.

## **Step 1: Create a New API Key in OKX**

### **1.1 Login to Your OKX Account**
- Visit [OKX](https://www.okx.com/join/26209845) and log in to your account. You'll need to create an account if you don’t have one.

### **1.2 Access API Management**
- Once logged in, navigate to the 'Account' section in the top right corner.
- Click on 'API' or find the API management section in the account settings.

![okx-api.jpeg](https://content.gainium.io/images/content/help/okx_api_6f1856c515-d7d880.webp)

### **1.3 Create a New API Key**
- Click ‘Create API’ or a similar button to start the process.
![OKX1.jpeg](https://content.gainium.io/images/content/help/OKX_1_a4f33be47d-3cb408.webp)
### **1.4 Set API Key Permissions**
- You’ll be asked to name your API key. Choose a name that you’ll easily recognize, like ‘Gainium’.
- Select “Linking third-party apps” and find “Gainium” on the app name dropdown.
- Choose your passphrase.
- Select the API key permissions. For trading on Gainium, ensure that ‘Trade’ permissions are enabled.
- Confirm.

![OKX2.jpeg](https://content.gainium.io/images/content/help/OKX_2_3e15e5a083-95e945.webp)

### **1.5 Complete Security Verification**
- You may be required to complete a series of security verifications such as 2FA (Two-Factor Authentication).

![OKX3.jpeg](https://content.gainium.io/images/content/help/OKX_3_5b97bd882f-3a75e2.webp)

### **1.6 Note Your API Key and Secret**
- Once created, you’ll see an API Key and a Secret Key. Note these down securely; the Secret Key will not be shown again.

## **Step 2: Input API Details into Gainium's Exchange Page**

### **2.1 Log in to Your Gainium Account**
- Access your Gainium account by logging in at [Gainium’s platform](https://app.gainium.io).

### **2.2 Access the Exchange Integration Page**
- Navigate to the ‘Exchanges’ section within your Gainium dashboard.
- Select the option to add a new exchange or find OKX in the list of exchanges.

![OKX-gainium.jpeg](https://content.gainium.io/images/content/help/OKX_gainium_7abc567835-f5cdb5.webp)

Note: If you are adding a SPOT or a Futures-only API key, make sure to select either "OKX SPOT" or "OKX Futures," not the option "OKX SPOT & Futures."

### **2.3 Choose the Correct OKX Origin**
OKX operates several separate regional platforms, each on its own domain. An API key created on one of them will **only** authenticate against that same domain — so Gainium needs to know which one your account lives on. On the connection form, expand **Advanced Settings** and set the **OKX Origin** dropdown to match the site where you created your OKX account and API key.

- **https://okx.com — Global (default).** Choose this if you signed up on the main **www.okx.com** site. This covers most users worldwide and is the correct choice if you're unsure and not in the regions below.
- **https://my.okx.com — OKX Europe (EEA).** Choose this if you're in the European Economic Area and your account was created on or migrated to **my.okx.com**. Note that OKX Europe offers a restricted product set: through Gainium you can currently trade **USDC/EUR spot** pairs only — USDT pairs are unavailable, and X-Perp futures aren't supported yet.
- **https://app.okx.com — Regional entities (e.g. OKX US, OKX Australia).** Choose this if your account was created on the **app.okx.com** platform used by these standalone regional entities.

Picking the wrong origin is the most common cause of "invalid API key" or connection errors on OKX, even when the key and secret are correct — because Gainium ends up querying a different OKX platform than the one that issued the key. When in doubt, log in to OKX and check the domain in your browser's address bar, then select the matching origin here.

### **2.4 Enter API Key Details**
- In the provided fields, enter the API Key and Secret Key you obtained from OKX.
- Ensure the details are entered correctly to avoid connection issues.

### **2.5 Save and Test the Connection**
- Save your settings and test the connection to ensure that Gainium can successfully communicate with OKX.
- If there are any issues, double-check the API key details and permissions.
- Note that in order to trade futures, the account should be [unified](https://www.okx.com/learn/what-is-a-unified-account).
