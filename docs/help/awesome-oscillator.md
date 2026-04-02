---
id: 123
name: Awesome Oscillator
slug: awesome-oscillator
description: >-
  Learn how to use the Awesome Oscillator in Gainium for automated trading,
  detecting trend reversals, and capturing market momentum with detailed
  strategy examples.
createdAt: '2024-10-06T13:00:26.149Z'
updatedAt: '2026-02-24T07:44:20.564Z'
publishedAt: '2024-10-06T13:00:29.057Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.993Z'
tldr: >-
  The Awesome Oscillator (AO) is a momentum indicator that compares short-term
  (5-period) and long-term (34-period) simple moving averages, displayed as a
  histogram around zero. When above zero it signals bullish momentum, below zero
  bearish; it can be used in Gainium for trend reversal and twin peaks
  strategies.
---

The **Awesome Oscillator (AO)** is a momentum indicator that compares the current market momentum to the general momentum over a longer period. It helps traders identify the strength of a trend and possible reversals by calculating the difference between two Simple Moving Averages (SMAs) with different periods. It is useful for detecting market momentum and potential bullish or bearish transitions and confirming trends.

This article will define the **Awesome Oscillator**, configure it in Gainium, and demonstrate how to incorporate it into automated bot trading. We’ll also cover practical trading strategies, provide detailed entry and exit rules, and discuss practical considerations for using this indicator effectively.

## What Is the Awesome Oscillator?

The **Awesome Oscillator (AO)** compares the 34-period and 5-period simple moving averages (SMA) of the price’s midpoints. The result is a histogram that oscillates around the zero line, showing changes in market momentum.

### Key Features:
- **Above Zero**: When the oscillator is above zero, the short-term momentum is stronger than the long-term momentum, which is generally bullish.
- **Below Zero**: When the oscillator is below zero, it signals that the short-term momentum is weaker than the long-term momentum, which is generally bearish.

## How to Configure the Awesome Oscillator in Gainium

Here’s how to configure the **Awesome Oscillator** in Gainium using the settings from the attached image.

### Step 1: Add the Awesome Oscillator Indicator
- **Navigate to Bot Settings**:Log in to Gainium, select your bot, and find the **Awesome Oscillator** from the list of available indicators.

### Step 2: Configure the Indicator Settings
- **Use Percentile**: It allows using percentile rankings instead of raw values. For this setup, leave it disabled for typical AO readings.
- **Interval**: This setting determines the time interval for each candlestick used in the calculation. In this example, the interval is set to **1 day**, meaning the Awesome Oscillator is calculated based on daily data. You can adjust this to shorter timeframes like 1 hour for more frequent signals or use daily for more significant trends.
- **Condition**: The condition defines when a signal will be triggered. In this case, it is set to **Crossing Down**, meaning the bot will trigger an action when the AO crosses down through a specific value.
- **Value**: The value is set to **0**, which means the bot will trigger when the AO crosses down from above the zero line, signaling weakening bullish momentum and potential bearish movement.
- **Keep True**: This setting controls how long the condition remains true after being triggered. A value of **0** means the condition resets immediately after the signal is triggered.
![image.png](https://content.gainium.io/images/content/help/image_a74835783b-4ecf16.webp)
*Awesome Oscillator Settings*

## Using the Awesome Oscillator in Bot Trading

The **Awesome Oscillator** is a versatile indicator that can be used in various trading strategies, including trend-following and reversal strategies. Below are two examples of incorporating the Awesome Oscillator into automated bot trading.

### Strategy 1: Trend Reversal Strategy

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when the Awesome Oscillator crosses **above 0**, signaling that the short-term momentum is stronger than the long-term momentum and the market may be transitioning into a bullish trend.
- **Short Entry (Sell)**:Enter a short position when the Awesome Oscillator crosses **below 0**, indicating that the short-term momentum is weaker than the long-term momentum and the market may be transitioning into a bearish trend.

#### Exit Rules
- **Long Exit**:Exit the trade when the AO crosses back **below 0**, signaling a possible end to the bullish momentum.
- **Short Exit**:Exit the trade when the AO crosses back **above 0**, signaling a possible end to the bearish momentum.

#### Implementation in Gainium
- **Set Up the AO**: Configure the bot to trigger trades based on the **Crossing Up** or **Crossing Down** conditions at the zero line. The bot will automatically enter and exit trades based on momentum shifts.
- **Adjust Timeframes**: If you are looking for more frequent signals, consider using a smaller timeframe, such as **1 hour** for short-term trades or **1 day** for long-term positions.

### Strategy 2: Bullish and Bearish Twin Peaks Strategy

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when the AO forms a **bullish twin peak**, where the second peak is higher than the first, and both peaks are below the zero line. This signals an upcoming upward move.
- **Short Entry (Sell)**:Enter a short position when the AO forms a **bearish twin peak**, where the second peak is lower than the first and both peaks are above the zero line. This signals an upcoming downward move.

#### Exit Rules
- **Long Exit**:Exit the trade when the Awesome Oscillator crosses **below 0**, signaling that bullish momentum is weakening.
- **Short Exit**:Exit the trade when the Awesome Oscillator crosses **above 0**, signaling that bearish momentum is weakening.

#### Implementation in Gainium
- **Configure Twin Peaks**: Set up the bot to detect twin peak patterns. The bot should identify two consecutive AO peaks below the zero line for bullish twin peaks, with the second higher than the first. The bot should detect two consecutive peaks above the zero line for bearish twin peaks, with the second lower than the first.
- **Risk Management**: Always use stop-losses or trailing stops to protect your trades, especially in volatile markets.

## Practical Considerations

Here are a few practical tips when using the **Awesome Oscillator** in your trading strategy:

### 1. Adjusting Timeframes
- If you prefer more frequent trading opportunities, use smaller timeframes like **1 hour** or **15 minutes**. For longer-term trends, daily or weekly timeframes can help capture larger price moves.

### 2. Combining with Other Indicators
- To avoid false signals, combining the Awesome Oscillator with other technical indicators like **RSI** or **moving averages is a good idea**. This can confirm momentum and strengthen the reliability of your signals.

### 3. Avoiding False Signals
- In choppy, sideways markets, the Awesome Oscillator may generate false signals. Use filters such as trend indicators or volume to avoid trading in consolidating markets.

### 4. Backtesting Your Strategy
- Always backtest your trading strategy using Gainium's backtesting feature to ensure it works well under different market conditions. This will help you fine-tune your settings and improve overall performance.

## Conclusion

The **Awesome Oscillator** is a powerful momentum indicator that can help traders capture trend reversals and confirm market momentum. By configuring it correctly in Gainium, you can automate your trading strategies and take advantage of bullish or bearish transitions.

Whether used to detect trend reversals or apply more advanced strategies like twin peaks, the Awesome Oscillator provides a reliable method for analyzing market momentum. Combining it with other indicators and using proper risk management can significantly enhance your trading results.
