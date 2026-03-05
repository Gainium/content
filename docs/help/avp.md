---
id: 135
name: Average Position Price (AVP) Indicator
slug: avp
description: >-
  Use the Average Position Price (AVP) indicator in Gainium to optimize bot
  trading strategies with effective entry and exit conditions.
createdAt: '2024-10-11T05:07:19.359Z'
updatedAt: '2026-02-24T07:44:20.563Z'
publishedAt: '2024-10-11T05:10:52.309Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:29.993Z'
tldr: >-
  The Average Position Price (AVP) indicator shows the average cost basis across
  all open buy orders in a deal, representing the break-even point. It can only
  be used on running deals for Take Profit or Stop Loss conditions (not deal
  start), enabling dynamic exit rules combined with other indicators.
---

The Average Position Price (AVP) is the average price at which all open positions of a trading deal are bought. It considers the cost basis of each buy order, including any Dollar Cost Averaging (DCA) orders, providing a clear picture of the break-even point for a given position. Knowing your AVP is crucial in trading for making informed decisions on when to take profits or add to your position.

## How to Use AVP in Gainium

In Gainium, the AVP indicator can only be applied to running deals, meaning it cannot be used as a deal start condition indicator. Instead, AVP is available under Take Profit (TP) or Stop Loss (SL) conditions with indicator rules. You can find it by navigating to your bot's TP or SL settings, setting the type to "Technical Indicators," and selecting "Average Position Price (AVP)" from the list of available indicators.

To configure AVP in Gainium, you can set the "Unrealized Profit Higher Than" with a specific percentage. This allows you to set precise thresholds for profit-taking or stop loss based on the AVP level. For example, if the unrealized profit exceeds 2%, you could set the bot to take profit automatically. These configurations ensure that you maximize gains while effectively limiting risks.

The key difference between AVP and a normal percentage or dynamic ATR/ADR Take Profit (TP) or Stop Loss (SL) is how the orders are executed. With AVP, the order gets executed at market when the conditions are met, while with percentage or dynamic ATR/ADR TP or SL, the orders can be sent to the exchange as limit orders beforehand. The main utility of AVP over percentage or dynamic TP or SL is that it can be combined with other indicators to create more nuanced exit conditions, providing more flexibility in achieving optimal trade exits.

## Using AVP in Bot Trading

The AVP indicator plays an important role in bot trading, especially for those looking to optimize entry and exit points based on the cost of their position. Here are a few trading strategies that can utilize AVP in Gainium bots:

### 1. **Take Profit Strategy Using RSI and AVP**

Set the bot to take profit once one of the conditions is met: either the RSI on the 4-hour timeframe is greater than 70 or the unrealized profit exceeds 2% based on the AVP. This approach allows the bot to exit positions under favorable market conditions, either by capturing overbought conditions (as indicated by RSI) or by realizing sufficient profit.
- **Entry Rule:** Open a position based on other technical indicators like MACD.- **Exit Rule:** Close the position if RSI (4H) &gt; 70 OR the unrealized profit percentage (relative to AVP) is greater than 2%.

### 2. **Stop Loss Using AVP and Indicator for Dynamic Loss Management**

Another use case for AVP is to set dynamic stop loss levels combined with another indicator for enhanced exit conditions. Instead of using a fixed price stop loss, the AVP can be used in conjunction with an indicator to determine when to exit a position if the market moves against you. For instance, if the price falls below a certain percentage relative to the AVP or if another indicator such as RSI crosses below a certain level, the bot can trigger a stop loss to prevent further losses.
- **Entry Rule:** Initiate the deal based on market trends.- **Exit Rule:** Trigger a stop loss if the price drops by 5% below the AVP.

### 3. **Combining AVP with OR Rules for Flexibility**

Gainium allows for complex conditions using AND/OR rules. You can configure the bot to close a position when a profit target is reached based on AVP and/or when a particular indicator rule is true. This flexibility allows you to maximize profit without being tied to only one type of condition.

For example:
- **Entry Rule:** Open based on MACD crossover.- **Exit Rule:** Close the deal if the unrealized profit exceeds 3% OR the price reaches a pre-set target, ensuring you capitalize on favorable conditions while avoiding prolonged exposure.

## Practical Considerations
- **It Only Works on Running Deals:**&nbsp;AVP can only be applied to running deals and is unavailable as a deal start condition. Once a deal is active, it helps set profit and stop-loss targets.- **Combining with Other Indicators:**&nbsp;AVP works well alongside other indicators, such as the Relative Strength Index (RSI) or Moving Averages.&nbsp;This combination gives a more comprehensive market view, allowing for better decision-making.- **Risk Management:** Using AVP helps you better understand your break-even point, which is crucial for dynamic risk management. This ensures that every decision taken considers the cost basis, minimizing unexpected losses.

## Conclusion

The Average Position Price (AVP) indicator is a powerful tool for those looking to optimize trading performance on Gainium. By focusing on the actual cost of your positions, AVP provides a precise way to set profit-taking and stop-loss rules, enhancing flexibility and control. AVP can significantly elevate your trading strategy when used correctly, whether using it to take profits at an unrealized gain percentage or setting dynamic stop losses.

Configure it effectively and integrate it with other indicators for a comprehensive approach. Are you ready to start optimizing your trades with AVP?
