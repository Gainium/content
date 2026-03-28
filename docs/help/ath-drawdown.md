---
id: 127
name: All Time High (ATH) Drawdown Indicator
slug: ath-drawdown
description: >-
  Use ATH Drawdown in Gainium to avoid long trades near all-time highs and short
  trades when the price is too low. Learn to configure it with effective
  strategies.
createdAt: '2024-10-07T03:57:14.882Z'
updatedAt: '2026-02-24T07:44:20.562Z'
publishedAt: '2024-10-07T03:57:16.632Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:29.989Z'
tldr: >-
  The ATH Drawdown indicator measures how far the current price has dropped (as
  a percentage) from the all-time high within a defined lookback period. It
  helps avoid entering long positions near the ATH or shorting when the price is
  already heavily discounted, supporting safer entry points.
---

The **All-Time High (ATH) Drawdown** indicator measures the percentage decline of the current price from the highest price (ATH) within a defined period. It is a valuable tool for traders looking to avoid entering long positions near an all-time high or going short when the price is too low relative to its peak. This indicator helps ensure that trades are entered when the market is more likely to offer favorable conditions rather than at extremes.

In this article, we will explain the **ATH Drawdown** indicator, how to configure and use it in Gainium, and provide examples of how to use it effectively in bot trading. We’ll also cover practical considerations and conclude with tips on integrating the indicator into your trading strategies.

## What Is ATH Drawdown?

The **ATH Drawdown** measures how much the current price has declined from the **All-Time High (ATH)** over a specified lookback period. It is calculated as a percentage and can signal whether the price is close to its ATH or has dropped from it.
- **Drawdown %**: The percentage by which the price has dropped from the ATH.
- **Lookback Period**: The number of periods (candlesticks) used to calculate the highest price (ATH) within that window.

### Key Features:
- **Helps Avoid Long Entries Near ATH**: Prevents buying into potential market tops.
- **Avoids Short Entries When Price is Too Low**: Stops shorting when the price is already heavily discounted, preventing potential reversals.
- **Risk Management**: Supports safer entry points by identifying whether the market is overextended.

## How to Configure ATH Drawdown in Gainium

Here’s how to configure the **ATH Drawdown** indicator using the attached settings in Gainium.

### Step 1: Add the ATH Drawdown Indicator
- **Navigate to the Bot Settings**:Log into Gainium, go to your bot, and select **ATH Drawdown** from the list of indicators.

### Step 2: Configure the Indicator Settings
- **Lookback (100)**: The lookback period determines how far back the indicator should search for the highest price (ATH). In this example, the lookback is set to **100**, meaning the ATH is calculated using the highest price from the last 100 periods.
- **Interval (1 day)**: This setting defines the time interval used for each candlestick in the lookback period. In the provided settings, it's set to **1 day**, meaning the ATH is calculated based on the daily highest prices over the past 100 days.
- **Condition (Lower than)**: The condition tells the bot when to trigger an action.

**Lower than** is selected in this case, meaning the bot will act when the drawdown percentage is below a certain threshold.
- **Value (10)**: This represents the trigger point. The bot will act when the drawdown percentage falls **below 10%**. This means the bot won't open positions within 10% of the ATH, thus preventing entering long positions near the ATH.
- **Keep True (0)**: This defines how long the condition remains active after being triggered. Setting this to **0** means the condition resets immediately after the trigger.
![image.png](https://content.gainium.io/images/content/help/image_c8c80e3610-c801bb.png)
*All Time High (ATH) Drawdown Settings*



## Using ATH Drawdown in Bot Trading

Here are two examples of how to use the **ATH Drawdown** in automated bot trading.

### Strategy 1: Avoid Long Positions Near ATH

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when the drawdown is lower than **10%**, meaning the price has dropped from the ATH and is more reasonably positioned for a potential rebound.

#### Exit Rules
- **Long Exit**:Exit the long trade when the drawdown percentage crosses above **5%**. This indicates that the price is getting close to the ATH again, which may signal a potential top.

#### Implementation in Gainium
- **Configure the Drawdown Threshold**: Set the bot to enter long trades only when the drawdown percentage is lower than 10%, signaling that the price has dropped from its ATH and is less risky.
- **Automate Entries/Exits**: The bot will automatically enter trades when the price is sufficiently discounted from its ATH and exit when it’s too close to the ATH.

### Strategy 2: Avoid Short Positions When Price is Too Low

#### Entry Rules
- **Short Entry (Sell)**:Enter a short position when the drawdown cross up **10%**, meaning the price is near its ATH and potentially overextended.

#### Exit Rules
- **Short Exit**:Exit the short trade when the drawdown is under **20%**, signaling that the price has dropped significantly from the ATH and could be oversold.

#### Implementation in Gainium
- **Set Short Thresholds**: Configure the bot to enter short trades only when the drawdown percentage crosses up 10%, indicating the price is near the ATH and may reverse downward.
- **Manage Exits**: Set the bot to exit the short trade when the drawdown exceeds 15%, signaling that the price has dropped too far and may soon reverse upward.

## Practical Considerations

Here are a few practical tips when using the **ATH Drawdown** indicator:

### 1. Adjust Lookback Periods Based on Asset Volatility
- More volatile assets may require a shorter lookback period (e.g., 50 periods) to capture more recent ATHs, while less volatile assets may benefit from a longer lookback (e.g., 200 periods).

### 2. Combine with Other Indicators
- Combine the ATH Drawdown with trend-following indicators such as **moving averages** or **Bollinger Bands** to confirm entry and exit signals for better results.

### 3. Avoid Extreme Conditions
- Use the ATH Drawdown to avoid extreme conditions (e.g., entering long near the ATH or shorting when the price has dropped significantly). This helps protect against potential reversals and unfavorable entry points.

### 4. Backtest Your Strategy
- Always backtest your strategy using Gainium’s backtesting feature to ensure that your drawdown thresholds work well under different market conditions. Adjust the lookback period and drawdown values based on the asset’s behavior.

## Conclusion

The **ATH Drawdown** is a powerful tool for avoiding risky trades near an asset's all-time high or when the price has dropped too much. By configuring it correctly in Gainium, you can ensure that your bot avoids entering trades at market extremes and instead waits for more favorable conditions.

Whether you’re using the ATH Drawdown to avoid long trades near the ATH or short trades when the price is too low, combining this indicator with other technical tools and proper risk management can help you build a more robust trading strategy.
