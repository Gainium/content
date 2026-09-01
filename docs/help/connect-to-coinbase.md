---
id: 102
name: Connect to Coinbase
slug: connect-to-coinbase
description: >-
  In this article you will learn how to connect your Coinbase exchange account
  to Gainium.
createdAt: '2024-03-16T14:57:48.243Z'
updatedAt: '2026-09-02T00:00:00.000Z'
publishedAt: '2024-04-06T11:33:03.122Z'
locale: en
categories:
  - exchanges-apis
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.003Z'
tldr: >-
  Step-by-step guide to connecting Coinbase to Gainium via the Coinbase
  Developer Platform portal. On the Secret API Keys page, create an API key
  with the ECDSA signature algorithm (not Ed25519) and View and Trade
  permissions, add Gainium's IP addresses to the IP allowlist, then paste the
  full key name and PEM secret into Gainium.
---

1. [Log in](https://portal.cdp.coinbase.com/) to your Coinbase Developer Platform account

2. Open the **Secret API Keys** page directly: [https://portal.cdp.coinbase.com/api-keys/secret](https://portal.cdp.coinbase.com/api-keys/secret). (It is not linked from the dashboard's left navigation — use the direct URL, or find it under the **API Keys** tab.)

3. Click on **Create API key** and give your key a nickname

4. Expand **API restrictions** and enable the **View** and **Trade** permissions; don't enable Transfer permissions. Choose a portfolio if you want to restrict the key to one.

5. Expand **Advanced Settings** and set the **Signature algorithm** to **ECDSA** — not **Ed25519**. Coinbase now pre-selects Ed25519 for new keys, but Gainium only supports ECDSA-signed keys. An Ed25519 key will fail to connect (you may see an error mentioning "asymmetric key" or "ES256"). If you already created an Ed25519 key, delete it and create a new one with ECDSA selected.

6. In the same dialog, enter our IP addresses in the **IP allowlist** section. Here are the addresses you can copy and paste, make sure they are separated by commas and spaces:

```
62.84.191.108, 62.84.191.109, 62.84.191.110, 62.84.191.111, 62.84.191.112
```

7. Click **Create API key** and complete two-factor authentication if prompted

8. Copy your API key details. Coinbase no longer downloads the key file automatically — copy the key name and secret from the confirmation screen (or use the **Download API key** button). The secret is shown only once, so save it before closing the dialog.

9. In Gainium, go to the [Exchanges](https://app.gainium.io/exchanges) page. Then click on **Add New**

![Screenshot 2024-04-02 at 10.18.50.png](https://content.gainium.io/images/content/help/Screenshot_2024_04_02_at_10_18_50_706883bd70-c20bfc.webp)

10. Paste your key name and secret, exactly as Coinbase provided them:

- **API Key**: the full key *name*, in the form `organizations/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/apiKeys/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` — not just the short UUID at the end.
- **Secret**: the entire private key, including the `-----BEGIN EC PRIVATE KEY-----` and `-----END EC PRIVATE KEY-----` lines and the line breaks between them.

That's it — you are done!
