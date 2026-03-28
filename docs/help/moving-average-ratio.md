---
id: 112
name: Moving Average Ratio (MAR)
slug: moving-average-ratio
description: >-
  Learn how to use the Moving Average Ratio (MAR) in Gainium for flexible bot
  trading with advanced trend detection and customizable entry/exit rules.
createdAt: '2024-10-05T11:55:03.576Z'
updatedAt: '2026-02-24T07:44:20.576Z'
publishedAt: '2024-10-05T12:19:52.638Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:30.017Z'
tldr: >-
  The Moving Average Ratio (MAR) measures the ratio between two moving averages,
  offering more flexibility than traditional crossovers by letting you set
  specific separation thresholds. It supports trend filtering with lookback
  conditions and percentile mode.
---

The Moving Average Ratio (MAR) is a versatile indicator that provides more control and flexibility than traditional moving average crossovers. In this article, we’ll define the Moving Average Ratio indicator, explain how to use it on the Gainium platform, and demonstrate how to incorporate it into automated bot trading with detailed strategy examples. We'll also discuss practical considerations when using MAR and conclude with tips for maximizing its potential in your trading.

## What Is the Moving Average Ratio (MAR)?

The Moving Average Ratio (MAR) is an advanced indicator that measures the ratio between two moving averages over a specified period. Unlike traditional moving average crossovers, where a signal is generated based solely on the point of crossing, MAR allows traders to set a specific separation threshold between the two averages, giving more flexibility in identifying trend strength.

### Key Features of MAR:
- **Customizable Separation:** Define when the moving averages cross and how far apart they must be for the signal to trigger. For example, a crossover happens when the indicator value changes from less than 1 to more than 1 (when the ratio is 1, both indicators have the same value). You can also trigger a signal when they cross and diverge a certain amount by setting the indicator to trigger when the value is 1.05 (the moving average value is 5% bigger than the second).
- **Flexible Moving Averages:** MAR supports all types of moving averages available in Gainium, such as Simple Moving Average (SMA), Exponential Moving Average (EMA), and more.
- **Percentile Use:** MAR can be applied in percentile mode to fine-tune trend identification, taking into account recent market conditions.
- **Trend Detection with Lookback and Conditions:** For more refined trend filtering, you can specify a lookback period and set a condition (e.g., the MAR must be greater than 2% over the last 10 bars). This can help avoid entering a long trade when the fast-moving average is getting closer to the slow-moving average (price is trending down).
- **Visual Trend Detection:** When the trend filter is activated, the indicator's chart background is colored green when the conditions are met, offering a visual aid for real-time trend monitoring.

## How to Use the MAR Indicator in Gainium

### Step 1: Create a new bot
- Log in to Gainium and head to the **Trading Bots** section.
- Select the exchange and trading pair you wish to trade.

### Step 2: Add the MAR Indicator
- The MAR indicator can be used as a start condition, [DCA rule](https://gainium.io/help/dca-bot-set-up-walkthrough), and TP or SL condition. In this example, we will use it as a Start Condition.
- In the search bar, type **"MAR"**.
- Select the MAR indicator from the dropdown list, which will automatically be added to the chart.

### Step 3: Customize the Indicator
- **Moving Averages:** Choose which type of moving averages to use (e.g., SMA, EMA).
- **Separation Threshold:** Set the minimum percentage or point difference between the two moving averages for generating a signal.
- **Lookback Period:** Define how far back the indicator should look when analyzing trends.
- **Trend Condition:** To fine-tune trend detection, set a condition like "MAR must be greater than or equal to 2% over the last 10 bars."-** Trend Filter Activation:** Enable this to color the background green when the trend matches your rules.
![image.png](https://content.gainium.io/images/content/help/image_54a307f207-344a72.png)
*MAR Indicator Options*

### Step 4: Interpret the Indicator
- The indicator values range from close to 0 to infinity, typically in the 0.5 to 1.5 range. Visually, it is similar to oscillators like RSI.
- Additionally, when using the trend filter:**Green Background:** Indicates that the trend detection condition matches your rules.
- **No Background Color:** No trend condition is met, so the market may be in consolidation or ranging.

![image.png](https://content.gainium.io/images/content/help/image_6273c33904-aeea11.png)
*MAR indicator in action*

## Using MAR in Bot Trading: Strategies and Rules

Leveraging MAR in automated trading bots can help you navigate your trades with precise entry and exit rules. Here are some strategies with examples of how to set them up.

### Strategy 1: Moving Average Ratio Crossover Strategy

#### Entry Rules
- **Long Entry (Buy):**MAR crosses above 1.05 (indicating a strong bullish trend).
- Trend filter is activated with the condition that the MAR value 10 bars ago is more than 2%.
- **Short Entry (Sell):**MAR crosses below 0.95 (indicating a strong bearish trend).

#### Exit Rules
- **Long Exit:**MAR crosses below 1.00 (neutral trend).
- **Short Exit:**MAR crosses above 1.00.

### Strategy 2: Trend Following with MAR and RSI

#### Entry Rules
- **Long Entry (Buy):**MAR is above 1.00.
- RSI (14) is below 30 (indicating an oversold market).
- Trend filter to confirm a bullish trend such as higher than 2% with lookback 10.
- **Short Entry (Sell):**MAR is below 1.00.
- RSI is above 70 (indicating an overbought market).
- Trend filter to confirm a bullish trend such as lower than 2% with lookback 10.

#### Exit Rules
- **Long Exit:**RSI crosses above 50, indicating a loss of momentum.
- **Short Exit:**RSI crosses below 50, signaling bearish momentum is weakening.

### Strategy 3: Multi-Timeframe MAR with Moving Average Strategy

#### Entry Rules
- **Long Entry (Buy):**MAR is above 1.00 on both the 1-hour and 4-hour timeframes.- 50 EMA crosses above the 200 EMA (Golden Cross) on the 1-hour chart.
- **Short Entry (Sell):**MAR is below 1.00 on both timeframes.- 50 EMA crosses below 200 EMA (Death Cross) on the 1-hour chart.

#### Exit Rules
- **Long Exit:**MAR on the 1-hour chart crosses below 1.00.
- **Short Exit:**MAR on the 1-hour chart crosses above 1.00.

## Practical Considerations

When using the Moving Average Ratio in bot trading, here are some practical tips to keep in mind:

### 1. Parameter Customization
- **Fine-tuning the Threshold:** Adjust the separation threshold between moving averages based on the asset’s volatility.
- **Lookback Period:** Experiment with different lookback periods and trend conditions to find what works best for your strategy.

### 2. Combining Indicators
- **Use Confirmation Tools:** Consider adding indicators like RSI, MACD, or Bollinger Bands to confirm MAR signals further.
- **Avoid Overcomplication:** Adding too many indicators can lead to conflicting signals, so keep it simple and effective.

### 3. Backtesting
- **Test Your Strategy:** Before going live, use Gainium’s backtesting tools to validate your bot’s performance over historical data.
- **Adjust Based on Results:** If the strategy isn’t performing as expected, tweak the MAR settings or risk management parameters.

### 4. Real-Time Trend Sensitivity
- **Monitor Trend Sensitivity:** The trend filter’s real-time background coloring provides immediate feedback on market conditions, allowing you to adjust your bot’s behavior if necessary.

### 5. Risk Management
- **Set Appropriate Stop-Losses:** Avoid large drawdowns by setting stop-losses and trailing stops to protect your positions.
- **Use Position Sizing:** Allocate a small percentage of your capital per trade to avoid overexposure.

## Conclusion

The Moving Average Ratio (MAR) offers traders a highly customizable and flexible way to monitor trends and precisely enter trades. Allowing you to specify the separation between moving averages gives you more control than traditional crossovers. The ability to combine it with other indicators, use percentile modes, and implement real-time trend detection further enhances its utility.

Whether using it to identify strong trends or as part of a more complex bot trading strategy, MAR is a powerful tool to add to your trading arsenal. Use Gainium’s features like backtesting and real-time charting to perfect your MAR strategy, and don’t forget the importance of risk management and regular optimization.
