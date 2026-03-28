---
id: 42
name: Enhancing security of your exchange API keys
slug: enhancing-security
description: >-
  In this article we explain the steps you can take to increase the security of
  your account and your exchange API keys.
createdAt: '2022-11-14T13:27:34.016Z'
updatedAt: '2026-02-24T07:44:20.570Z'
publishedAt: '2022-11-15T11:05:52.658Z'
locale: en
categories:
  - exchanges-apis
  - account-management
difficulty: advanced
tags:
  - api
  - exchange
  - security
ingested: true
ingestedAt: '2025-06-29T10:57:30.009Z'
tldr: >-
  Protect your exchange API keys by enabling 2FA, whitelisting Gainium''s server
  IPs on your exchange, and restricting API keys to specific token symbols.
  These measures defend against attacks where hackers manipulate low-cap token
  prices using stolen API keys.
---

When you use a crypto exchange, it is important to make sure that you take all necessary precautions to avoid being hacked.

Many trading platforms claim API keys are safe because they do not have withdrawal rights. While it's true that a potential hacker cannot directly withdraw funds to another wallet using your API keys, there is still a risk that they can be used for a technique called “contra trading.” Contra trading is a market manipulation tactic by which a hacker generates enough trading volume to move the market in their desired direction and profit from that move. Generally, it involves lower cap tokens, as they require less volume to produce price movements.&nbsp;

By following the steps below, you can dramatically lower the chances of your account potentially being controlled by a malicious actor.

These same precautions matter if you use your Gainium API keys with external tools, scripts, or AI agents. If you are connecting an MCP-compatible client, also review [Connect Gainium MCP to AI agents](https://gainium.io/help/mcp).

## Steps to protect yourself from hackers

### 2-Factor Authentication

Activating 2FA on the exchange and Gainium is the first step to safeguard access to your API keys. This is a standard security practice; however, hackers can sometimes find security holes in the platforms and access the database directly. That's why it's important to take additional security measures so that in the event that a hacker manages to obtain your API keys, they would be rendered useless anyway.

### Exchange API key IP whitelist

Exchanges usually allow extra security measures to ensure your API keys are safe. One of such measure is IP whitelisting. By allowing only certain IPs to use the API key, you can ensure that they will not work even if they were leaked. Remember that the IP to whitelist is not your computer IP, but the IP of Gainium's server, which connects to the exchange. During API creation, enable IP whitelisting and add Gainium's server IP:&nbsp;

78.128.60.89,8.128.43.82,78.128.8.36,78.128.43.168,217.174.152.25

### Exchange API key token symbol whitelist

If you only trade specific token pairs, activating the token symbol whitelist can enhance the security of your API keys even further. Remember that contra trading usually involves obscure tokens with lower market caps, as they are easier to produce price movements.&nbsp;

![API whitelist.png](https://content.gainium.io/images/content/help/API_whitelist_8aa05079fe-a99142.png)

By taking the above steps, you will ensure that your account stays protected from hackers.
