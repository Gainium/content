---
id: 129
name: Divergences Indicator
slug: divergences-indicator
description: >-
  Learn how to use the Divergence Indicator in Gainium for automated trading,
  detecting trend reversals, and momentum shifts with strategies and practical
  examples.
createdAt: '2024-10-07T04:35:50.955Z'
updatedAt: '2026-02-24T07:44:20.569Z'
publishedAt: '2024-10-07T04:36:49.453Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.008Z'
tldr: >-
  The Divergence Indicator detects when price action deviates from oscillators
  (AO, MACD, RSI, MFI, etc.), signaling potential trend reversals or
  continuations. Bullish divergences suggest upward reversals while bearish
  divergences warn of downward moves.
---

The **Divergence Indicator** in Gainium is a powerful tool for detecting when an asset's price action deviates from the movement of an oscillator. Divergences are significant because they often signal potential trend reversals or momentum shifts. By comparing price action with multiple oscillators, traders can anticipate changes in market direction.

In this article, we’ll explain the **Divergence Indicator**, how to configure it in Gainium, and how to use it in automated bot trading with practical examples. We’ll also cover practical considerations and conclude with tips on using it effectively in your trading strategy.

## What Is the Divergence Indicator?

The **Divergence Indicator** identifies discrepancies between an asset's price movement and oscillators like the **Awesome Oscillator (AO)**,** MACD**, **RSI**, and others. Divergences can be either **bullish** (indicating potential upward movement) or **bearish** (indicating potential downward movement). Hidden divergences can also occur, signaling the continuation of the current trend.

### Key Features:
- **Bullish Divergence**: Price makes a lower low, but the oscillator makes a higher low. This indicates weakening downward momentum and potential for a reversal upward.
- **Bearish Divergence**: Price makes a higher high, but the oscillator makes a lower high. This indicates weakening upward momentum and potential for a reversal downward.
- **Hidden Divergence**: Indicates potential trend continuation, with the opposite behavior of regular divergence.

## How to Configure the Divergence Indicator in Gainium

Here’s how to set up and configure the **Divergence Indicator** in Gainium based on the provided settings.

### Step 1: Add the Divergence Indicator
- **Navigate to the Bot Settings**:Log into Gainium, select your bot, and add the **Divergence** indicator from the list.

### Step 2: Configure the Indicator Settings
- **Min Number of Divergences (2)**: This setting specifies how many divergences must be detected before the indicator triggers an action. In this example, the minimum number is set to **2**, meaning the bot will wait for confirmation from two divergences before acting.
- **Type of Divergence**: Choose **Any Bearish**, **Bearish**, **Hidden Bearish**, **Any Bullish**, **Bullish**, and **Hidden Bullish**. This determines whether the bot looks for bearish or bullish divergences. In this case, **Any Bearish** is selected, meaning the bot will trigger on any bearish divergence.
- **Oscillators**: You can select the oscillators you want to compare with the price action. **Awesome Oscillator (AO)**,** CCI**, **MACD**, and **MFI** are used in this example. Gainium supports multiple oscillators, including **RSI**, **Momentum**, **Stochastic Oscillator**, and more. The bot will look for divergences across all selected oscillators.
- **Interval (1 day)**: This determines the timeframe for each candlestick used to calculate the divergence. In this example, the interval is set to **1 day**, meaning the bot will analyze daily price movements for divergences.
- **Keep True (0)**: This setting defines how long the condition remains valid after being triggered. Setting this to **0** means the condition resets immediately after it is met.
![image.png](https://content.gainium.io/images/content/help/image_915ac03347-293c56.webp)
*Divergence Indicator Settings*

## Using Divergence Indicator in Bot Trading

Here are two example strategies using the **Divergence Indicator** in automated bot trading.

### Strategy 1: Bearish Reversal Strategy

#### Entry Rules
- **Short Entry (Sell)**:Enter a short position when the **Any Bearish Divergence** is detected on at least **2 oscillators**, signaling a potential reversal from an uptrend to a downtrend.

#### Exit Rules
- **Short Exit**:Exit the short position when a **Bullish Divergence** is detected. This signals that the downward momentum may be weakening and that an upward reversal is possible.

#### Implementation in Gainium
- **Set the Divergence Type**: Configure the bot to detect **Any Bearish Divergence**. Ensure the minimum number of divergences is set to **2** for additional confirmation from multiple oscillators.
- **Automate Entries and Exits**: The bot will automatically enter short trades when bearish divergences are detected and exit when bullish divergences are detected.

### Strategy 2: Bullish Continuation Using Hidden Divergence

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when a **hidden bullish divergence** is detected. This signals that the current uptrend may continue despite a short-term pullback.

#### Exit Rules
- **Long Exit**:Exit the long trade when a **Bearish Divergence** is detected, signaling a potential end to the bullish momentum.

#### Implementation in Gainium
- **Set the Divergence Type**: Configure the bot to detect **Hidden Bullish Divergence** to signal trend continuation.
- **Automate Entries and Exits**: The bot will enter long trades when hidden bullish divergences are detected and exit when regular bearish divergences are spotted.

## Practical Considerations

When using the **Divergence Indicator** in your trading strategy, consider the following:

### 1. Use Multiple Oscillators for Confirmation
- Select at least two or more oscillators, such as **RSI**, **MACD**, and **MFI**, for more reliable signals. This helps reduce the chance of false signals from any single oscillator.

### 2. Adjust Timeframe for Different Market Conditions
- Shorter timeframes (e.g., **1 hour**) can generate more frequent signals but may also produce more noise. Longer timeframes (e.g., **1 day**) provide more significant signals but fewer opportunities.

### 3. Combine with Other Indicators
- Use the Divergence Indicator alongside other indicators like **moving averages** or **Bollinger Bands** to confirm trend direction and filter out weak divergence signals.

### 4. Backtest Your Strategy
- Backtest your divergence-based strategy using historical data in Gainium’s backtesting environment. Adjust your oscillator selection, divergence type, and timeframes to optimize performance.

## Conclusion

The **Divergence Indicator** is a powerful tool for detecting potential trend reversals and momentum shifts by comparing price action with oscillators. By configuring it correctly in Gainium, you can automate entries and exits based on divergence signals. Whether you’re looking for trend reversals or continuations, the Divergence Indicator can provide valuable insights into market momentum.

Combining the Divergence Indicator with other technical tools and proper risk management can further enhance your trading strategy.
