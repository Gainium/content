---
id: 96
name: Connect to OKX
slug: connect-to-okx
description: This guide will walk you through step by step how to connect OKX to Gainium.
createdAt: '2023-12-04T16:34:41.588Z'
updatedAt: '2026-02-24T07:44:20.568Z'
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
  enable Trade permissions, then enter the credentials in Gainium.
---

This guide will walk you through creating a new API key in OKX and inputting the details into Gainium's exchange page, enabling seamless integration for enhanced trading experiences.

## **Step 1: Create a New API Key in OKX**

### **1.1 Login to Your OKX Account**
- Visit [OKX](https://www.okx.com/join/26209845) and log in to your account. You'll need to create an account if you don’t have one.

### **1.2 Access API Management**
- Once logged in, navigate to the 'Account' section in the top right corner.
- Click on 'API' or find the API management section in the account settings.

![okx-api.jpeg](https://content.gainium.io/images/content/help/okx_api_6f1856c515-d7d880.jpeg)

### **1.3 Create a New API Key**
- Click ‘Create API’ or a similar button to start the process.
![OKX1.jpeg](https://content.gainium.io/images/content/help/OKX_1_a4f33be47d-3cb408.jpeg)
### **1.4 Set API Key Permissions**
- You’ll be asked to name your API key. Choose a name that you’ll easily recognize, like ‘Gainium’.
- Select “Linking third-party apps” and find “Gainium” on the app name dropdown.
- Choose your passphrase.
- Select the API key permissions. For trading on Gainium, ensure that ‘Trade’ permissions are enabled.
- Confirm.

![OKX2.jpeg](https://content.gainium.io/images/content/help/OKX_2_3e15e5a083-95e945.jpeg)

### **1.5 Complete Security Verification**
- You may be required to complete a series of security verifications such as 2FA (Two-Factor Authentication).

![OKX3.jpeg](https://content.gainium.io/images/content/help/OKX_3_5b97bd882f-3a75e2.jpeg)

### **1.6 Note Your API Key and Secret**
- Once created, you’ll see an API Key and a Secret Key. Note these down securely; the Secret Key will not be shown again.

## **Step 2: Input API Details into Gainium's Exchange Page**

### **2.1 Log in to Your Gainium Account**
- Access your Gainium account by logging in at [Gainium’s platform](https://app.gainium.io).

### **2.2 Access the Exchange Integration Page**
- Navigate to the ‘Exchanges’ section within your Gainium dashboard.
- Select the option to add a new exchange or find OKX in the list of exchanges.

![OKX-gainium.jpeg](https://content.gainium.io/images/content/help/OKX_gainium_7abc567835-f5cdb5.jpeg)

Note: If you are adding a SPOT or a Futures-only API key, make sure to select either "OKX SPOT" or "OKX Futures," not the option "OKX SPOT & Futures."

### **2.3 Enter API Key Details**
- In the provided fields, enter the API Key and Secret Key you obtained from OKX.
- Ensure the details are entered correctly to avoid connection issues.

### **2.4 Save and Test the Connection**
- Save your settings and test the connection to ensure that Gainium can successfully communicate with OKX.
- If there are any issues, double-check the API key details and permissions.
- Note that in order to trade futures, the account should be [unified](https://www.okx.com/learn/what-is-a-unified-account).
