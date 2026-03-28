---
id: 119
name: Price % Change
slug: price-change-indicator
description: >-
  Learn how to use the Price % Change indicator in Gainium for automated trading
  strategies, detecting breakouts, trends, and reversals using percentage-based
  signals.
createdAt: '2024-10-06T09:26:02.444Z'
updatedAt: '2026-02-24T07:44:20.578Z'
publishedAt: '2024-10-06T09:32:09.504Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.019Z'
tldr: >-
  The Price % Change indicator calculates the percentage price change over a set
  time interval, helping detect breakouts, trends, and reversals. Configure a
  threshold and interval in Gainium to trigger automated actions when price
  moves exceed the defined percentage.
---

The **Price % Change** indicator is a simple but highly effective tool for detecting significant price movements over a specific period. It calculates the percentage change in price over a set time interval and helps traders identify trends, breakouts, and price reversals. Tracking positive and negative price changes allows traders to act on bullish and bearish signals in real-time.

In this article, we’ll define the **Price % Change** indicator, explain how to configure and use it in Gainium, and provide examples of how it can be utilized in automated bot trading with detailed entry and exit rules. We'll also discuss practical considerations and conclude with how to optimize this indicator for your trading strategy.

## What is the Price % Change Indicator?

The **Price % Change** indicator calculates the percentage difference between the current and close prices from the previous period. A positive percentage signals an upward price movement, while a negative percentage signals a downward price movement. This simple indicator is commonly used to detect breakouts, strong trends, and price reversals.

### Key Features:
- **Positive %**: Detects upward price movements (bullish).
- **Negative %**: Detects downward price movements (bearish).
- **Configurable Interval**: Set the time interval at which the price change is measured.

## How to Configure Price % Change in Gainium

Here’s how to set up the **Price % Change** indicator in Gainium.

### Step 1: Add the Price % Change Indicator
- **Navigate to Bot Settings**:Log into Gainium, open the bot you want to configure, and select **Price % Change** from the list of indicators.

### Step 2: Configure the Indicator Settings
- **% Change**: Define the percentage change threshold that will trigger an action. In the example provided, a **3% change** is set. You can set this to any value depending on the magnitude of price movements you want to capture.
- **Interval**: Set the time interval over which the price change is measured. In this case, it is set to **4 hours**. You can choose shorter intervals (e.g., 1 hour) for more frequent signals, or longer intervals for larger price swings.
- **Keep True**: This defines how long the condition remains active after triggering the signal. Setting it to **0** means the condition is reset immediately after the signal.
![image.png](https://content.gainium.io/images/content/help/image_a2831cbde5-7e7936.png)
*Price Change % Settings*

### Step 3: Detecting Positive and Negative Price Changes
- **Positive % Change**: Detects an upward price movement. Set the threshold to a positive value (e.g., 3%) to trigger when the price rises by this percentage within the specified time interval.
- **Negative % Change**: Detects a downward price movement. Set the threshold to a negative value (e.g., -3%) to trigger when the price falls by this percentage within the specified time interval.

## Using Price % Change in Bot Trading

Here are two trading strategies that utilize the **Price % Change** indicator in automated bot trading.

### Strategy 1: Breakout Strategy

#### Entry Rules
- **Long Entry (Buy)**:Trigger a buy order when the price increases by **3%** or more in a 4-hour interval, signaling a bullish breakout.
- **Short Entry (Sell)**:Trigger a short order when the price decreases by**-3%** or more in a 4-hour interval, signaling a bearish breakdown.

#### Exit Rules
- **Long Exit**:Exit the trade when the price change percentage turns negative (e.g., -2%), indicating a potential reversal.
- **Short Exit**:Exit the trade when the price change percentage turns positive (e.g., 2%), signaling that the downtrend is losing strength.

#### Implementation in Gainium
- **Set the Price % Change**: Configure the **% Change** setting to 3% for both long and short entries. Set it to trigger for exits based on a reversal in the opposite direction (e.g., -2% for long exits).
- **Automate the Bot**: Set the bot to execute trades automatically when the price change conditions are met.

### Strategy 2: Trend-Following Strategy

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when the price increases by **5%** over a 6-hour interval, signaling strong bullish momentum.
- **Short Entry (Sell)**:Enter a short position when the price decreases by**-5%** over a 6-hour interval, signaling strong bearish momentum.

#### Exit Rules
- **Long Exit**:Exit the trade when the price declines by **-2%**, indicating that the upward trend may be reversing.
- **Short Exit**:Exit the trade when the price rises by **2%**, signaling that the downward trend is weakening.

#### Implementation in Gainium
- **Set the Price % Change Thresholds**: Set the entry thresholds to **5%** for both long and short positions and the exit thresholds to**-2%** for long and **2%** for short exits.
- **Risk Management**: Use stop-losses or trailing stops to limit losses if the trend changes unexpectedly.

## Practical Considerations

When using the **Price % Change** indicator, keep the following in mind:

### 1. Adjust the % Change Threshold Based on Volatility
- You may want to set a higher % change threshold in highly volatile markets to avoid false signals. For example, a **3-5%** threshold works well in more volatile cryptocurrencies, while **1-2%** may be appropriate for more stable ones.

### 2. Combine with Other Indicators
- While the **Price % Change** indicator is simple and effective on its own, combining it with other technical indicators (such as RSI, MACD, or Bollinger Bands) can provide additional confirmation and reduce the risk of false signals.

### 3. Backtest Before Deploying
- Always backtest your strategy using historical data to ensure it performs well across market conditions. Gainium's backtesting feature allows you to optimize your settings for better performance.

### 4. Timeframe Adjustments
- Shorter timeframes (e.g., 1 hour) may generate more frequent signals, but could also lead to more false positives. Longer timeframes (e.g., 4 hours or daily) offer more stable signals for larger price swings.

## Conclusion

The **Price % Change** indicator is a powerful tool for traders looking to detect breakouts, trends, and reversals with minimal complexity. Tracking the percentage change in price over a specified interval helps traders capitalize on both upward and downward movements. In Gainium, you can easily configure this indicator to work in automated bot trading, allowing you to execute data-driven strategies precisely.

With proper configuration and backtesting, the **Price % Change** indicator can help you catch significant price movements, enabling you to build more robust trading strategies.
