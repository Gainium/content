---
id: 130
name: Average True Range (ATR)
slug: atr
description: >-
  Use the ATR indicator in Gainium for automated trading, volatility detection,
  and risk management with detailed strategies and practical examples.
createdAt: '2024-10-07T04:47:52.993Z'
updatedAt: '2026-02-24T07:44:20.563Z'
publishedAt: '2024-10-07T04:47:54.793Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.990Z'
tldr: >-
  The Average True Range (ATR) measures market volatility by calculating the
  average high-low price range over a specified period, expressed in absolute
  terms. In Gainium, it can be used for volatility breakout strategies,
  risk-based position sizing, and setting appropriate stop-loss levels.
---

The **Average True Range (ATR)** is a technical analysis indicator that measures market volatility by analyzing the range between price highs and lows over a specified period. Unlike trend-following indicators, the ATR is focused solely on measuring volatility, making it an invaluable tool for assessing risk, managing trades, and determining entry and exit points.

In this article, we’ll define the **ATR**, explain how to configure it in Gainium, and demonstrate how to incorporate it into bot trading with practical examples of strategies, including detailed entry and exit rules. We’ll also cover practical considerations and offer guidance for using the ATR effectively in your trading strategies.

## What Is the Average True Range (ATR)?

The **Average True Range (ATR)** was developed by J. Welles Wilder and is used to measure the volatility of an asset. It calculates the average range of price movement over a specific period, capturing fluctuations and helping traders assess the current market environment.

### Key Features:
- **Absolute Numbers**: The ATR is expressed in absolute terms rather than percentages. Therefore, it must be adapted to the asset in question. For example, BTC might have an ATR of 1000, while a low-value memecoin might have an ATR of only 0.1.- **Volatility Assessment**: A higher ATR indicates more significant price swings, while a lower ATR suggests more stable, less volatile price action.

## How to Configure the ATR Indicator in Gainium

Here’s how to configure the **ATR** indicator in Gainium based on the attached settings.

### Step 1: Add the ATR Indicator
- **Navigate to Bot Settings**:Log into Gainium, go to your bot, and add the **Average True Range (ATR)** from the list of available indicators.

### Step 2: Configure the Indicator Settings
- **Length (14)**: This setting determines how many periods (candlesticks) the ATR will use to calculate the average range. The example below is set to&nbsp;**14**, the standard for many trading platforms. It calculates the ATR using the high-low range over the past 14 periods.- **Interval (4 hours)**: This determines the timeframe of each candlestick used in the calculation. Here, it’s set to **4 hours**, meaning the ATR will calculate volatility based on the high-low range of 4-hour price movements. You can adjust this depending on whether your trading in based on shorter or longer timeframes.- **Condition (Crossing Down)**: The condition determines when the bot will take action. In this case, it’s set to **Crossing Down**, meaning the bot will trigger an action when the ATR crosses **down** through a specified value.- **Value (70)**: This is the value at which the bot will be triggered. Since the ATR is an absolute number, this value must be adjusted according to the asset you’re trading. For example, in this case, the bot will take action when the ATR falls below **70**.- **Keep True (0)**: This setting controls how long the condition remains true after it is met. A value of **0** means the condition resets immediately after the trigger.
![image.png](https://content.gainium.io/images/content/help/image_b46c2d8795-ce79ce.png)
*Average True Range (ATR) Settings*

## Using ATR in Bot Trading

Here are two example strategies that incorporate the **ATR** into automated bot trading.

### Strategy 1: Volatility Breakout Strategy

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when the ATR **crosses up** above a specified threshold, indicating that volatility is increasing and a potential breakout is happening.
- **Short Entry (Sell)**:Enter a short position when the ATR **crosses **above a specified threshold. This signals that the market is becoming more volatile and that a breakout to the downside may occur.

#### Exit Rules
- **Long Exit**:Exit the long position when the ATR starts to **cross down**, signaling that volatility is decreasing and the breakout momentum might be fading.
- **Short Exit**:Exit the short trade when the ATR starts to **cross down**, indicating that the volatility that caused the downward move is subsiding.

#### Implementation in Gainium
- **Set the Volatility Threshold**: Configure the bot to enter trades when the ATR crosses a certain volatility level (e.g., 70 for highly volatile assets or a lower value for less volatile ones).- **Automate Entries and Exits**: The bot will automatically enter long or short trades when the ATR crosses key volatility levels and exit when volatility decreases.

### Strategy 2: Risk-Based Position Sizing

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position, but use the ATR to determine your position size. A higher ATR means greater risk, so reduce your position size to protect against large price swings.
- **Short Entry (Sell)**:Enter a short position using the ATR to calculate position size. When the ATR is higher, reduce the position size to account for potential volatility.

#### Exit Rules
- **Long Exit**:Exit the long position based on a pre-defined take-profit or stop-loss level, calculated using the ATR to account for volatility.
- **Short Exit**:Exit the short trade based on a take-profit or stop-loss calculated using the ATR.

## Practical Considerations

When using the **ATR** in your trading strategy, keep the following in mind:

### 1. Adjust the ATR Value Based on Asset
- Since the ATR measures volatility in absolute terms, the value must be adapted to the asset being traded. For example, **BTC** might have an ATR of **1000**, while a lower-value asset like a **memecoin** might have an ATR of only **0.1**. Always adjust the value to suit the asset's typical volatility.

### 2. Combine with Trend Indicators
- The ATR doesn’t show trend direction, so combining it with other indicators like&nbsp;**moving averages**&nbsp;or&nbsp;**RSI**&nbsp;is often useful to confirm whether the market is trending up or down when volatility changes.

### 3. Use for Risk Management
- The ATR is an excellent tool for determining stop-loss levels and calculating position size. In volatile markets, use a wider stop-loss based on the ATR to avoid getting stopped out by random price fluctuations.

### 4. Backtest Thoroughly
- Always backtest your ATR-based strategies to ensure they perform well under different market conditions. Gainium’s backtesting feature allows you to optimize settings and adjust the ATR values to suit various assets.

## Conclusion

The **Average True Range (ATR)** is a versatile indicator that provides valuable insights into market volatility. By configuring it correctly in Gainium, you can use it to identify breakout opportunities, manage risk, and set appropriate position sizes based on volatility.

Whether you’re using the ATR to gauge market volatility or to manage your risk more effectively, it’s essential to tailor your settings to the asset you’re trading and combine it with other indicators for the best results.
