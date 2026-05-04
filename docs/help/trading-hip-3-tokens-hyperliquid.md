---
id: 144
name: Trading HIP-3 Tokens on Hyperliquid
slug: trading-hip-3-tokens-hyperliquid
description: >-
  Learn how Gainium supports HIP-3 builder-deployed perpetuals on Hyperliquid,
  including tokenized equities, commodities, and FX. Covers fees, oracle
  considerations, and how to use bots with these markets.
createdAt: '2026-05-04T00:00:00.000Z'
updatedAt: '2026-05-04T00:00:00.000Z'
publishedAt: '2026-05-04T00:00:00.000Z'
locale: en
categories:
  - exchanges-apis
  - trading-bots
difficulty: intermediate
tags: []
ingested: false
ingestedAt: '2026-05-04T00:00:00.000Z'
tldr: >-
  Gainium now supports HIP-3 builder-deployed perpetuals on Hyperliquid —
  tokenized equities (NVDA, TSLA, XYZ100), commodities (gold, silver, oil),
  agricultural futures, and FX, all settled in USDC. You can run DCA, Grid,
  Combo, and Max Gain AI bots on HIP-3 markets exactly like native Hyperliquid
  pairs. Fees are roughly 2x standard Hyperliquid perp fees, set by the
  market's deployer, plus the usual builder fee in Free User mode.
---

# Trading HIP-3 Tokens on Hyperliquid with Gainium

Gainium now supports trading **HIP-3 builder-deployed perpetuals** on Hyperliquid. This unlocks a much wider universe of markets — tokenized US equities, indices, commodities, FX, and more — all from the same Hyperliquid connection you already use.

> **New to Hyperliquid on Gainium?** Start with [How to Connect Hyperliquid](https://gainium.io/help/connect-to-hyperliquid). HIP-3 markets work through the same connection — no extra setup needed.

---

## What Is HIP-3?

HIP-3 (Hyperliquid Improvement Proposal #3) is the upgrade that allows third-party builders to deploy their own perpetual futures markets on Hyperliquid's matching engine and settlement layer. It went live on Hyperliquid mainnet on **October 13, 2025**.

Each builder runs what is effectively their own perp DEX — independent margining, independent order books, custom oracles, custom contract specs — but settlement and matching still happen on HyperCore, Hyperliquid's high-performance backbone.

The result: Hyperliquid is no longer limited to crypto pairs. There is now a fast-growing catalog of non-crypto perps trading 24/7 on the same infrastructure, with cumulative volume already in the tens of billions of dollars.

## What Markets Are Available?

The largest deployer today is **trade.xyz** (operated by Hyperunit, Hyperliquid's tokenization arm), which dominates HIP-3 volume. Through Gainium, you can trade markets such as:

- **Equity indices** — XYZ100 (top 100 US public companies), synthetic Nasdaq, S&P-style baskets
- **Individual equities** — NVDA, TSLA, AAPL, AMZN and other liquid US names
- **Precious metals** — gold (XAU), silver (XAG)
- **Energy** — crude oil
- **Agricultural commodities** — corn, wheat
- **FX pairs** and select regional equity exposures

All HIP-3 perps on Hyperliquid are **USDC-settled**. You don't need a brokerage account or a separate wallet for stocks — the same USDC balance you use for BTC and ETH perps trades NVDA and gold.

> **24/7 markets:** Unlike traditional equities, HIP-3 equity perps trade around the clock. Pricing is driven by the deployer's chosen oracle, with fallback logic during off-hours.

## How HIP-3 Markets Work in Gainium

From your perspective as a Gainium user, **HIP-3 markets behave like any other Hyperliquid perp**:

1. They appear in the symbol list on the Hyperliquid linear/perp exchange.
2. You can run any Hyperliquid-supported bot type on them — DCA, Grid, Combo, Hedge, Max Gain AI, Terminal deals.
3. Backtesting, indicators, and risk controls work the same way as native pairs.
4. Balances, P&L, and credit usage roll up under your existing Hyperliquid connection.

Just pick the symbol when creating a bot or deal and Gainium handles the rest.

## Fee Structure

There are two fee components to be aware of:

### 1. Hyperliquid HIP-3 Fees

HIP-3 markets charge **roughly 2x the standard Hyperliquid perp fee** at the protocol level. Half of that fee goes to the market's deployer, half goes to Hyperliquid. Concrete numbers move with your fee tier and any active staking/referral discounts, but plan for taker fees in the **0.07% – 0.09%** range as a baseline.

Some deployers enable **Growth Mode**, which can cut all-in taker fees by more than 90% (to roughly 0.0045% – 0.009%) at standard tiers. Whether a market has Growth Mode active is set by the deployer, not by Gainium.

### 2. Gainium Connection Mode (Builder Fee or Credits)

This is unchanged from how Hyperliquid already works on Gainium:

- **Free User** — Gainium adds its standard builder fee on top (0.045% on futures, applied to both sides). Bots don't consume plan credits.
- **Paid User** — No Gainium builder fee. Bots consume credits from your subscription plan.

See [Unlimited Trading in Hyperliquid](https://gainium.io/help/unlimited-trading-hyperliquid) for the full breakdown and how to choose between modes.

## Things to Know Before Trading HIP-3 Markets

HIP-3 markets are powerful but they have characteristics worth understanding:

- **Oracle dependence.** Each HIP-3 market uses an oracle chosen by the deployer. Off-hours pricing for equities/commodities relies on this oracle and any fallback logic the deployer configured. Be aware of how your strategy reacts to oracle gaps or wider spreads outside primary trading hours.
- **Variable liquidity.** Volume is concentrated in a handful of flagship markets (XYZ100, silver, top equities). Smaller HIP-3 markets can be thinner — tune Grid bot ranges and DCA volumes accordingly.
- **Independent risk controls.** Each deployer sets its own max leverage, margin ratios, and OI caps. These can differ from native Hyperliquid perps.
- **Settlement authority.** A deployer can halt trading and settle a market at the current mark price under defined conditions. This is an extra event class that doesn't exist on native Hyperliquid perps — uncommon in practice, but worth knowing.

## Recommended Use Cases

A few strategy directions HIP-3 markets open up:

- **Index DCA / Grid bots.** Running a long-bias DCA on XYZ100 gives you 24/7 automated equity-index exposure with USDC collateral.
- **Commodity grids.** Gold and silver have shown sustained ranging behavior — good fits for grid bots — with HIP-3 daily volume occasionally rivaling crypto majors.
- **Diversification.** Pair crypto bots with equity or commodity bots on the same exchange and same balance, smoothing out single-asset-class drawdowns.
- **News-driven hedge or terminal trades.** Use the Terminal to take directional positions on stocks or commodities without leaving Gainium.

## Getting Started

1. Make sure your Hyperliquid account is connected to Gainium ([guide](https://gainium.io/help/connect-to-hyperliquid)).
2. Create a new bot or deal as you normally would.
3. In the symbol selector for Hyperliquid (linear), pick the HIP-3 market you want — XYZ100, NVDA, gold, etc.
4. Configure and launch. That's it.

---

## Learn More

- [How to Connect to Hyperliquid](https://gainium.io/help/connect-to-hyperliquid)
- [Unlimited Trading in Hyperliquid](https://gainium.io/help/unlimited-trading-hyperliquid)
- [Hyperliquid HIP-3 official docs](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals)
