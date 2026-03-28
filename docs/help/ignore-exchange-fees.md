---
id: 137
name: Ignore Exchange Fees
slug: ignore-exchange-fees
description: >-
  Ignore exchange fees on Gainium for seamless trading. Sell full positions
  without fee deductions when using exchange tokens like BNB or KCS to pay for
  fees.
createdAt: '2024-10-25T12:24:04.857Z'
updatedAt: '2026-02-24T07:44:20.573Z'
publishedAt: '2024-10-25T12:24:07.198Z'
locale: en
categories:
  - exchanges-apis
difficulty: beginner
tags:
  - exchange
  - fees
ingested: true
ingestedAt: '2025-06-29T10:57:30.013Z'
tldr: >-
  The "Ignore Exchange Fees" toggle lets Gainium sell your full position without
  reserving a portion for fees—useful when you pay fees with exchange tokens
  like BNB or KCS. This prevents accumulation of small leftover "dust" amounts.
---

We're excited to announce a new feature on Gainium that offers our users even more control over their trading: **Ignore Exchange Fees**. This new option is a switch that can be activated on each exchange card, and it allows users to decide whether they want the fees to impact their exit strategy. Let's dive into why this feature matters and how it can be used effectively.

## What Does 'Ignore Exchange Fees' Do?

When activated, the **Ignore Exchange Fees** switch ensures that exchange fees are not considered when closing a position. Instead of selling slightly less to cover the fee, the entire position can be sold. This feature is handy for those who pay exchange fees using exchange-specific tokens like BNB on Binance or KCS on Kucoin. In these cases, users may accumulate small leftover amounts of the base token of the trading pair, often called 'dust'. This happens because, unless the **Ignore Exchange Fees** feature is activated, the system deducts the exchange fee from the position being closed. Since users paying with exchange-specific tokens don't use the base token for fees, they accumulate approximately 0.1% dust on each opening and closing trade.

In simpler terms, when you pay fees using the exchange's native token, the fee is deducted from that token's balance rather than the asset you're trading. If you aren't using an exchange token to pay fees, the fee is taken from the trading pair's base token. As a result, to fully exit a position, you must leave enough in reserve to cover the fees, meaning you sell slightly less than initially used to open the position.
![image.png](https://content.gainium.io/images/content/help/image_307209df4c-bd5f88.png)
*Ignore fees setting*

## Example: Binance BTC/USDT Trade

Let's look at a practical example of this feature in action:

Suppose you're trading **100 USDT** to buy BTC on the **BTC/USDT** pair on **Binance**. The typical spot trading fee is **0.1%** per transaction. A 0.1% fee means **0.10 USDT worth of BTC**&nbsp;is taken as a fee, leaving you with **99.90 USDT** worth of BTC. When you decide to sell, the system will sell **99.9%** of your BTC holding, leaving **0.1%** of BTC to cover the fee.

When paying trading fees using **BNB**, Binance deducts the fee from your BNB balance, not your BTC balance. With the **Ignore Exchange Fees** feature activated, Gainium will disregard this fee during the selling process, allowing you to close the full BTC position instead of adjusting for the fee.

## Important Considerations

When using the **Ignore Exchange Fees** feature, it is essential to monitor your balance of the exchange token (such as BNB or KCS) and replenish it as necessary. If there are not enough exchange tokens to pay the fee when closing a position, the trade may not be able to close successfully. This could lead to unexpected delays or partially closed positions.

It's also essential to note that activating or deactivating this feature will not affect running trades, only new ones.

## Conclusion

The **Ignore Exchange Fees** feature is ideal for traders who prefer to pay exchange fees using exchange tokens like BNB or KCS. It ensures that trades are completed smoothly without the need for manual adjustments to account for fees from the base token. It also helps those who want to ensure that their exit strategy involves completely selling a position without leftover bits due to fee deductions.

Try new feature and take control over how fees affect your positions!
