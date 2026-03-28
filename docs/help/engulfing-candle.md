---
id: 120
name: Engulfing Candle Indicator
slug: engulfing-candle
description: >-
  Learn how to use the Engulfing Candle indicator in Gainium for automated
  trading, detect bullish and bearish reversals, and configure your strategy for
  maximum effectiveness.
createdAt: '2024-10-06T11:54:40.955Z'
updatedAt: '2026-02-24T07:44:20.570Z'
publishedAt: '2024-10-06T12:03:06.893Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.008Z'
tldr: >-
  The Engulfing Candle indicator identifies bullish and bearish reversal
  candlestick patterns where one candle completely engulfs the previous one.
  Configure it in Gainium by selecting the trigger type, interval, and use it
  for reversal or trend confirmation strategies.
---

The **Engulfing Candle** pattern is a powerful reversal indicator used in technical analysis to identify potential trend reversals in the market. It is a candlestick pattern where one candle completely engulfs the previous one, signaling a possible shift in market sentiment. There are two types of engulfing patterns:
- **Bullish Engulfing**: Indicates a reversal from a downtrend to an uptrend.- **Bearish Engulfing**: Indicates a reversal from an uptrend to a downtrend.

In this article, we’ll explore the **Engulfing Candle** indicator, configure it in Gainium, and demonstrate how to use it effectively in bot trading. We will also cover examples of trading strategies, practical considerations, and conclude with tips on maximizing its effectiveness.

## What Is an Engulfing Candle?

An **Engulfing Candle** occurs when a larger candle completely engulfs the previous smaller candle’s body. This pattern indicates that the market's momentum has shifted, and it’s commonly used to predict trend reversals.

### Types of Engulfing Candles:
- **Bullish Engulfing**: This pattern forms when a small bearish candle is followed by a large bullish candle that fully engulfs the bearish candle's body. It signals a potential upward reversal in a downtrend.- **Bearish Engulfing**: This pattern forms when a small bullish candle is followed by a large bearish candle that fully engulfs the bullish candle's body. It signals a potential downward reversal in an uptrend.
![image.png](https://content.gainium.io/images/content/help/image_3371e60896-19575f.png)
*Engulfing Candle Indicator in action*

## How to Configure the Engulfing Candle Indicator in Gainium

Here’s how to configure the **Engulfing Candle** indicator using the settings provided in the attached image:

### Step 1: Add the Engulfing Candle Indicator
- **Navigate to the Bot Settings**:Log into Gainium, go to your bot, and select **Engulfing Candle** from the list of available indicators.

### Step 2: Configure the Indicator Settings
- **Interval**: Choose the time interval for the candle formation. In the example provided, the interval is set to **4 hours**, meaning the bot will look for engulfing patterns on the 4-hour chart.- **Trigger Candle**: Choose the type of engulfing pattern to trigger the bot's action. You can select either **Bullish,** **Bearish, **or **Both**.**Bullish Engulfing**: This will trigger when a bullish engulfing pattern is detected, signaling a potential upward reversal.- **Bearish Engulfing**: This will trigger when a bearish engulfing pattern is detected, signaling a potential downward reversal.
- **Keep True**: This setting defines how long the condition remains valid after it is triggered. Setting it to **0** means the condition will reset immediately after identifying the engulfing candle.
![image.png](https://content.gainium.io/images/content/help/image_b993620050-ea99fc.png)
*Engulfing candle settings*

## Using Engulfing Candle in Bot Trading

The **Engulfing Candle** indicator can be effectively used in automated bot trading to identify reversal opportunities and capture market swings. Below are two example strategies that incorporate the Engulfing Candle pattern.

### Strategy 1: Reversal Trading Strategy

#### Entry Rules
- **Long Entry (Buy)**:Detect a **Bullish Engulfing** pattern on a 4-hour interval, signaling the potential end of a downtrend and a shift toward an uptrend.
- **Short Entry (Sell)**:Detect a **Bearish Engulfing** pattern on a 4-hour interval, signaling the potential end of an uptrend and a shift toward a downtrend.

#### Exit Rules
- **Long Exit**:Exit when a **Bearish Engulfing** pattern forms after entering a long position, indicating that the uptrend may be reversing.
- **Short Exit**:Exit when a **Bullish Engulfing** pattern forms after entering a short position, signaling a potential upward reversal.

#### Implementation in Gainium
- **Configure the Engulfing Candle Indicator**:Set the **interval** to 4 hours and select the **Bullish** or **Bearish** engulfing pattern based on the trend you’re trying to capture.
- **Automate Entries and Exits**:Program the bot to enter long trades on bullish engulfing patterns and short trades on bearish engulfing patterns. Use the opposite engulfing pattern as a signal for exit.

### Strategy 2: Confirmation Strategy

#### Entry Rules
- **Long Entry (Buy)**:Use the **Bullish Engulfing** pattern as a confirmation of an existing upward trend. Enter a long position when the bullish engulfing candle confirms an existing support level.
- **Short Entry (Sell)**:Use the **Bearish Engulfing** pattern to confirm a downward trend. Enter a short position when the bearish engulfing candle confirms resistance.

#### Exit Rules
- **Long Exit**:Exit the position when the price breaks below a key support level or when a **Bearish Engulfing** pattern forms, signaling a trend reversal.
- **Short Exit**:Exit the position when the price breaks above a key resistance level or when a **Bullish Engulfing** pattern forms.

#### Implementation in Gainium
- **Combine Indicators**:Combine the Engulfing Candle pattern with support/resistance levels to confirm the signal and increase the reliability of the entry.
- **Set Conditions**:Use the **Bullish Engulfing** pattern as confirmation in a long trade and the **Bearish Engulfing** pattern for short trades. Set the bot to exit when the opposite engulfing pattern forms.

## Practical Considerations

When using the **Engulfing Candle** indicator in your trading strategy, here are some key factors to consider:

### 1. Timeframe Selection
- **Shorter Timeframes**: Using short intervals (e.g., 15 minutes or 1 hour) may produce more frequent signals but can also result in more false positives.- **Longer Timeframes**: Using longer intervals (e.g., 4 hours or daily) can help identify stronger trends but may produce fewer signals.

### 2. Combine with Other Indicators
- The Engulfing Candle pattern can generate more reliable signals when used in combination with other technical indicators, such as moving averages, RSI, or Bollinger Bands. These indicators can help confirm the trend reversal and reduce the risk of false signals.

### 3. Backtest Before Going Live
- Before deploying your bot with the Engulfing Candle indicator, always backtest your strategy using historical data to ensure it performs well under different market conditions.

### 4. Risk Management
- Incorporate risk management strategies such as stop-losses to protect your trades from unexpected market movements. Setting stop-losses at key support or resistance levels can minimize potential losses.

## Conclusion

The **Engulfing Candle** indicator is a powerful tool for identifying trend reversals and capturing profitable market swings. By configuring the indicator in Gainium and integrating it into your automated bot trading strategy, you can leverage market momentum and take advantage of both bullish and bearish reversals.

Whether used&nbsp;for reversal trading or as a confirmation of trends, the Engulfing Candle's flexibility makes it a valuable addition to any trading strategy. By combining it with other indicators and using sound risk management techniques, you can increase the effectiveness of your strategy and achieve consistent results.
