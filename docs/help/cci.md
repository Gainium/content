---
id: 118
name: Commodity Channel Index (CCI)
slug: cci
description: >-
  Learn how to use the Commodity Channel Index (CCI) in Gainium to automate
  trading strategies, detect trends, and identify overbought/oversold
  conditions.
createdAt: '2024-10-06T09:17:03.242Z'
updatedAt: '2026-02-24T07:44:20.567Z'
publishedAt: '2024-10-06T09:17:05.240Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.000Z'
tldr: >-
  The Commodity Channel Index (CCI) is a momentum oscillator that measures how
  far the current price deviates from its historical average, typically ranging
  between +100 (overbought) and -100 (oversold). In Gainium, it can be used for
  overbought/oversold or trend-following strategies.
---

The **Commodity Channel Index (CCI)** is a versatile momentum-based indicator that helps traders identify cyclical trends and potential overbought or oversold conditions. Initially developed for commodity trading, it has become widely used across various markets, including cryptocurrencies. CCI measures the difference between the current price and its historical average, helping traders gauge price direction and identify potential trend reversals.

In this article, we’ll define the **CCI** indicator, explain how to configure it in Gainium, and explore how it can be used effectively in bot trading. We’ll also provide practical strategy examples, highlight considerations when using the indicator, and conclude with tips on integrating CCI into your trading strategy.

## What Is the Commodity Channel Index (CCI)?

The **CCI** compares the current price to its average price over a set period, calculating how far prices are from their historical average. It is a momentum oscillator, oscillating above and below zero, typically ranging between +100 and -100.
- **+100**: Indicates potential overbought conditions.
- **-100**: Indicates potential oversold conditions.

### Key Features:
- **Overbought/Oversold Indicator**: CCI values above +100 suggest overbought conditions, while values below -100 suggest oversold conditions.
- **Identifies Trend Strength**: High positive values indicate strong uptrends, and deep negative values indicate strong downtrends.

## How to Configure CCI in Gainium

Here’s how to set up the **CCI** indicator in Gainium.

### Step 1: Add the CCI Indicator
- **Navigate to the Bot Settings**:Log into Gainium, open the bot settings, and select **Commodity Channel Index (CCI)** from the available indicators.

### Step 2: Configure the CCI Settings
- **Length**: This defines the period over which the CCI is calculated (the default is **20**). A lower number makes the CCI more sensitive to recent price changes, while a higher number smooths out the indicator to reflect longer-term trends.
- **Interval**: This is the timeframe for which the indicator is applied. In your settings, the interval is set to **4 hours**, meaning the CCI will be calculated based on 4-hour price data.
- **Condition**: Choose a condition that triggers a trade. In this example, the CCI is set to **Crossing Down** below a value, indicating a sell signal when the CCI crosses below a threshold.
- **Value**: This is the trigger value for the condition (in this case, **100**). When CCI crosses below 100, a signal is generated, indicating that the price is potentially exiting an overbought condition.
- **Keep True**: This defines how long the condition remains active after it’s triggered. Setting this to **0** means the condition resets immediately after the trigger.
![image.png](https://content.gainium.io/images/content/help/image_4f3abd1064-80512a.png)
*CCI Oscillator Settings*

## Using CCI in Bot Trading

Here are two example strategies demonstrating how to use the CCI indicator in automated bot trading.

### Strategy 1: Overbought/Oversold Strategy

#### Entry Rules
- **Long Entry (Buy)**:CCI crosses **above -100** from below, signaling the price has potentially exited an oversold condition.
- **Short Entry (Sell)**:CCI crosses **below +100** from above, signaling the price has potentially exited an overbought condition.

#### Exit Rules
- **Long Exit**:Exit when the CCI crosses below 0, indicating that the upward momentum may fade.
- **Short Exit**:Exit when the CCI crosses back above 0, signaling that the downward momentum may weaken.

#### Implementation in Gainium
- **Configure CCI**: Add the CCI indicator to the bot and set the thresholds for **-100** (oversold) and **100** (overbought).
- **Automate Entries/Exits**: Program the bot to enter trades when the CCI crosses these levels and exit when the CCI crosses back toward zero.

### Strategy 2: Trend Following with CCI

#### Entry Rules
- **Long Entry (Buy)**:CCI crosses **above 0**, signaling that upward momentum is gaining strength.
- **Short Entry (Sell)**:CCI crosses **below 0**, signaling that downward momentum is increasing.

#### Exit Rules
- **Long Exit**:Exit when the CCI falls below -100, indicating a potential reversal from an uptrend to a downtrend.
- **Short Exit**:Exit when the CCI rises above +100, signaling a potential reversal from a downtrend to an uptrend.

#### Implementation in Gainium
- **Set CCI Thresholds**: Set the CCI to trigger trades when crossing **0** for trend confirmation and **±100** for trend reversals.
- **Risk Management**: Incorporate stop-losses to protect against false signals, especially during volatile markets.

## Practical Considerations

When using the CCI indicator in your trading strategy, here are some important considerations:

### 1. Length and Timeframe Adjustments
- **Shorter Lengths (e.g., 10)**: More responsive to price changes but may produce more false signals.
- **Longer Lengths (e.g., 30)**: Smoother signals but may lag behind actual market movements.

### 2. Combine with Other Indicators
- Use the CCI in conjunction with other indicators, such as moving averages or RSI, to confirm overbought/oversold conditions or trend direction.

### 3. Market Conditions
- CCI performs better in markets with clear trends or cyclical price movements. In choppy or sideways markets, it may generate less reliable signals.

### 4. Backtest Before Going Live
- Always backtest your CCI-based strategies to ensure they perform well under different market conditions. Use Gainium’s backtesting feature to refine your strategy.

## Conclusion

The **Commodity Channel Index (CCI)** is a powerful momentum indicator that can be easily integrated into Gainium for bot trading. Tracking deviations from the historical average helps traders identify overbought/oversold conditions and catch potential trend reversals. Whether using it to follow trends or detect market extremes, CCI provides the flexibility to adjust its settings and adapt to various trading styles.

Leverage Gainium’s advanced bot automation capabilities to execute these strategies efficiently and take advantage of CCI’s full potential in your trading.
