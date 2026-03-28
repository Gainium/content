---
id: 66
name: Technical Indicators Conditions Deal Close
slug: technical-indicators-conditions-deal-close
description: >-
  You can now use indicator signals that take profit when market conditions
  change. This article explains how to close trades using Gainium's technical
  indicators deal close conditions.
createdAt: '2023-04-02T03:11:20.622Z'
updatedAt: '2026-02-24T07:44:20.583Z'
publishedAt: '2023-04-02T04:10:04.916Z'
locale: en
categories:
  - trading-bots
  - trading-terminal
difficulty: intermediate
tags:
  - indicator
  - technical
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.027Z'
tldr: >-
  You can close bot or terminal deals using technical indicator conditions
  instead of or alongside percentage-based TP/SL. A "Minimum take profit" option
  ensures the deal only closes when both the indicator condition and a minimum
  profit threshold are met.
---

Mastering the art of timing the exit is vital to successful cryptocurrency trading, as it enables traders to protect their investments and capitalize on favorable market movements. While setting a % profit has been one of the most common ways to exit trades, you can now use indicator signals that take profit when market conditions change.

## Closing with indicators vs. percentage, which one is best?

There is no rule set in stone, and the best deal close strategy will depend on your overall trading strategy, the token, and the market conditions. That said, [backtesting](https://gainium.io/help/backtesting-trading-bots) your strategy with both options will give you great insight into what kind of performance you could expect using either one.

Some people prefer to close their trades using indicators because they are more responsive to changing market conditions. For example, indicators like RSI can accurately pinpoint when the asset is oversold or overbought and a change in market direction is imminent. Other traders, however, are comfortable keeping their deals open for as long as needed to meet the profit % they expect.

## Using Indicators Deal Close Conditions in Gainium

When creating a trading bot or terminal deal, you have the option to close the deal with indicators by setting “Indicators” in the Take Profit section, the Stop Loss section, or both.
![close-with-indicators-tp.png](https://content.gainium.io/images/content/help/close_with_indicators_tp_72b6080ced-18589f.png)![close-with-indicators-sl.png](https://content.gainium.io/images/content/help/close_with_indicators_sl_b91f3ee627-e50e09.png)
Multiple Deal close conditions use "AND" logic, meaning all conditions must be true to close the deal, just like with Deal start conditions.

You can edit your bot and change the deal close conditions, but new bot settings apply only to new trades; old trades keep their original settings. You can also change current open deals from closing with indicators to percentage, but switching from one closing with indicator condition to another for an open deal is not possible.

### Minimum take profit

If you are setting the indicators conditions deal close under Take Profit, you will have access to an additional configuration option, “Minimum take profit.” When the Minimum take profit option is activated, both the indicator conditions and the minimum take profit must be true simultaneously for the deal to be closed. Disabling the Minimum profit feature means the deal will close as soon as the Deal close condition is met, even if it results in a loss. Disable this feature carefully and with proper risk management in mind.

For example, let's say that your close condition is RSI 1H crossing up 80, and the Minimum take profit is 1%. On a particular candle, the RSI 1H goes from 76 to 84 (crossing up 80 is true), but the unrealized profit at that time is 0.5% (Minimum take profit is false); therefore, the deal will not be closed. On the next candle, the RSI goes from 84 to 87 (crossing up 80 is false), and the unrealized profit is 1.3% (Minimum take profit is true); the deal will also remain open.

Choosing the right combination of indicators and Minimum take profit is essential. In the previous example, the deal would have remained open until the RSI crosses up 80 again, at which point it will also need to evaluate the unrealized profit. If the trader intended to close the deal when the RSI was high and a Minimum profit achieved, it would have been better to choose RSI 1H &gt;80, which would have been evaluated as true on the second candle.
