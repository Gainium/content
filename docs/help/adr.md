---
id: 131
name: Average Daily Range (ADR)
slug: adr
description: >-
  Use the ADR indicator in Gainium to track daily volatility, set realistic
  price targets, and manage risk with strategies tailored for each asset's
  volatility.
createdAt: '2024-10-07T04:55:32.532Z'
updatedAt: '2026-02-24T07:44:20.560Z'
publishedAt: '2024-10-07T04:55:34.371Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.983Z'
tldr: >-
  The Average Daily Range (ADR) indicator measures an asset''s average
  high-to-low price range per day, providing insight into daily volatility. It
  is expressed in absolute terms (not percentages), so values must be adapted
  per asset, and it can be used in Gainium bots for reversal strategies or
  setting realistic daily price targets.
---

The **Average Daily Range (ADR)** indicator measures an asset's average price range (high to low) within a single trading day. The ADR provides insights into market volatility and helps traders anticipate potential price movements. Unlike the **ATR** (Average True Range), which can be applied across various timeframes, the **ADR** focuses specifically on the daily range, making it an excellent tool for day traders or those wanting to understand daily volatility patterns.

In this article, we’ll define the **ADR**, explain how to configure it in Gainium, and demonstrate how to use it in bot trading with practical strategy examples, including detailed entry and exit rules. We’ll also cover practical considerations and tips for integrating the ADR into your trading strategies.

## What Is the Average Daily Range (ADR)?

The **Average Daily Range (ADR)** calculates the average distance between an asset's high and low prices over a specified number of days. It reflects daily volatility and helps traders set realistic price targets and stop-loss levels or identify overbought/oversold conditions within a single trading day.

### Key Features:
- **Absolute Numbers**: ADR is expressed in absolute terms, so its value must be adapted to the asset being traded. For example, **BTC** may have an ADR of **1000**, while a low-value meme coin may have an ADR of only **0.1**.
- **Daily Focus**: The ADR is specifically designed to measure daily volatility. Other periods (e.g., weekly or monthly) are not supported.

## How to Configure the ADR Indicator in Gainium

Here’s how to configure the **ADR** indicator in Gainium based on the attached settings.

### Step 1: Add the ADR Indicator
- **Navigate to the Bot Settings**:Log into Gainium, go to your bot, and add the **Average Daily Range (ADR)** from the list of available indicators.

### Step 2: Configure the Indicator Settings
- **Length (14)**: This defines the number of days used to calculate the average daily range. In the provided settings, the length is set to **14**, meaning the ADR is based on the average range of the past 14 trading days.
- **Interval (1 day)**: Since ADR only applies to daily ranges, the interval is fixed at **1 day**. It cannot be changed to other periods (e.g., 4-hour or weekly).
- **Condition (Crossing Down)**: The condition determines when the bot will take action. In this example, the condition is set to **Crossing Down**, meaning the bot will act when the ADR crosses below a certain value.
- **Value (2000)**: This threshold triggers the bot’s action. The bot will execute trades or decisions when the ADR falls **below 2000**. This value must be adapted to the specific asset being traded—higher for assets like BTC, lower for lower-value assets like altcoins or meme coins.
- **Keep True (0)**: This setting controls how long the condition remains active after being triggered. A value of **0** means the condition resets immediately after it’s met.
![image.png](https://content.gainium.io/images/content/help/image_fd027d9836-434b77.webp)
*Average Daily Range (ADR) Indicator Settings*

## Using ADR in Bot Trading

Here are two example strategies that use the **ADR** in automated bot trading.

### Strategy 1: ADR-Based Reversal Strategy

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when the ADR crosses **below** a certain level. This indicates that the asset’s daily range is contracting, signaling reduced volatility and a potential reversal upward.
- **Short Entry (Sell)**:Enter a short position when the ADR crosses **above** a high threshold, signaling high volatility and a potential market reversal downward.

#### Exit Rules
- **Long Exit**:Exit the long position when the ADR crosses back **above** a specific value, signaling that volatility is increasing again and upward momentum might wane.
- **Short Exit**:Exit the short trade when the ADR crosses **below** a lower threshold, signaling that the price is stabilizing after a high-volatility move.

#### Implementation in Gainium
- **Set ADR Thresholds**: Configure the bot to enter long trades when the ADR drops below a specific threshold (e.g., 2000 for BTC) and short trades when the ADR rises above a high threshold (e.g., 3000 for BTC).
- **Automate Entries and Exits**: The bot will automatically enter and exit trades based on ADR thresholds that indicate shifts in daily volatility.

### Strategy 2: ADR for Target Setting

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when the price reaches the lower boundary of the daily range, and the ADR suggests a relatively low level of volatility (crossing below the threshold).

#### Exit Rules
- **Long Exit**:Exit the trade when the price reaches the upper boundary of the ADR, signaling that the asset has moved significantly within its daily range.

#### Implementation in Gainium
- **Set ADR-Based Targets**: Use the ADR to set realistic daily price targets and stop-losses. For example, if the ADR for an asset is 1000, set targets at or near this level for more predictable movements.
- **Automate Price Targets**: The bot can automatically close trades when price targets (based on the ADR) are met, ensuring you capitalize on the asset’s daily range.

## Practical Considerations

Here are some tips for using the **ADR** in your trading strategies:

### 1. Adapt ADR Values to Each Asset
- Since the ADR is expressed in absolute terms, adjusting the value based on the asset’s volatility is essential. For example, **BTC** could have an ADR of **2000**, while a smaller altcoin or memecoin could have an ADR of only **0.1**. Always tailor the value to the asset’s typical range.

### 2. Combine with Trend Indicators
- While the ADR is a volatility indicator, it doesn’t provide trend direction. For better accuracy, consider combining it with trend-following indicators like **RSI** or **moving averages** to confirm whether volatility occurs within an uptrend or downtrend.

### 3. Use ADR to Set Daily Targets
- The ADR effectively sets daily price targets, take-profit, and stop-loss levels. Use the ADR to gauge the daily price range, allowing for more accurate risk management.

### 4. Backtest Thoroughly
- Always backtest your ADR-based strategies before implementing them live. Gainium’s backtesting feature lets you fine-tune your ADR values and test their performance across different assets and market conditions.

## Conclusion

The **Average Daily Range (ADR)** is an essential indicator for day traders or anyone looking to understand an asset’s daily volatility. By configuring it in Gainium, you can better assess market conditions, set realistic price targets, and manage risk based on daily range movements. Whether you’re using the ADR to identify potential reversals or to set daily targets, combining it with other indicators and adjusting it for each asset’s volatility will help you optimize your trading strategy.
