---
id: 115
name: Bollinger Bands %B (BB %B)
slug: bollinger-bands-b
description: >-
  Learn how to use Bollinger Bands %B in Gainium for automated trading,
  capturing overbought/oversold conditions, and building effective bot trading
  strategies.
createdAt: '2024-10-06T07:36:52.543Z'
updatedAt: '2026-02-24T07:44:20.565Z'
publishedAt: '2024-10-06T07:36:54.333Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags: []
ingested: true
ingestedAt: '2025-06-29T10:57:29.999Z'
tldr: >-
  Bollinger Bands %B measures where the current price sits relative to the
  Bollinger Bands on a 0-to-1 scale. It can be used for mean reversion
  strategies (buy when %B < 0, sell when %B > 1) or trend following (trade when
  %B crosses 0.5).
---

Bollinger Bands %B is an indicator derived from the classic Bollinger Bands. It provides insights into how price relates to the upper and lower Bollinger Bands, making it a highly useful tool for gauging overbought and oversold conditions, trend strength, and possible reversals. In this article, we'll define the Bollinger Bands %B indicator, show how to use it in Gainium, and offer strategies for incorporating it into bot trading with detailed entry and exit rules. Finally, we will discuss practical considerations and summarize how to get the most out of this versatile indicator.

## What is Bollinger Bands %B?

Bollinger Bands %B measures the relative position of the current price within the Bollinger Bands range. It is scaled between 0 and 1, where:
- **%B = 1**: Price is at the upper Bollinger Band.- **%B = 0**: Price is at the lower Bollinger Band.- **%B &gt; 1**: Price is above the upper Bollinger Band (overbought).- **%B &lt; 0**: Price is below the lower Bollinger Band (oversold).

It helps traders quickly assess where the price is relative to the bands, signaling potential buying or selling opportunities.
![image.png](https://gainium.io/images/content/help/image_7160aed7da-0f05a8.png)
## How to Use Bollinger Bands %B in Gainium

### Step 1: Add the Indicator
- **Access the Bot Settings**:Log into Gainium and go to the bot you want to configure.
- **Navigate to the Indicators Section**:Add the **Bollinger Bands %B** indicator from the list of available options.
- **Configure Settings** (Refer to the attached settings image):**MA Type**: Set the type of Moving Average (default is SMA).- **MA Length**: Set the length of the selected Moving Average (default is 20).- **Standard Deviations**: Set the number of standard deviations for the Bollinger Bands (default is 2).- **Interval**: Choose the time interval for the indicator, such as 1 hour.- **Condition**: You can set conditions like "Crossing down" or "Crossing up" for specific %B values.- **Value**: This defines the trigger point for your trade, for example, 0.05 for a potential long entry.- **Keep True**: Specify how long the condition remains true after it triggers.

![image.png](https://gainium.io/images/content/help/image_001f9207f0-07f7d9.png)
*Bollinger Bands %B Settings*

### Step 2: Use Percentile (Optional)

Bollinger Bands %B can also be used with a percentile approach, where the indicator is applied to specific historical data ranges for more adaptability to current market conditions.

## Using Bollinger Bands %B in Bot Trading

Bollinger Bands %B can be effectively used in bot trading to capture overbought and oversold conditions, breakouts, or trend reversals. Here are two examples of strategies for using this indicator.

### Strategy 1: Mean Reversion Using Bollinger Bands %B

#### Entry Rules
- **Long Entry (Buy)**:%B crosses **below 0** (price moves below the lower Bollinger Band).- This signals an oversold condition, providing an opportunity for a potential reversal.
- **Short Entry (Sell)**:%B crosses **above 1** (price moves above the upper Bollinger Band).- This signals an overbought condition, indicating potential for a downward reversal.

#### Exit Rules
- **Long Exit**:%B crosses **above 0.5** (price moves back to the middle of the bands, confirming a partial reversal).
- **Short Exit**:%B crosses **below 0.5** (price moves back toward the middle of the bands, confirming a partial reversal).

#### Implementation in Gainium
- **Set the Indicator**:Add Bollinger Bands %B to your bot’s strategy.- Configure the conditions for %B crossing down below 0 for long entries and above 1 for short entries.
- **Manage Position Sizes**:Adjust position sizes depending on market volatility and risk tolerance.
- **Add Stop-Losses**:Set tight stop-losses just outside the bands to prevent large drawdowns if the trade doesn’t go as planned.

### Strategy 2: Trend Following with Bollinger Bands %B

#### Entry Rules
- **Long Entry (Buy)**:%B crosses **above 0.5** (price moves upwards in a confirmed trend).
- **Short Entry (Sell)**:%B crosses **below 0.5** (price moves downwards in a confirmed trend).

#### Exit Rules
- **Long Exit**:%B crosses **below 0.5**, signaling the end of the upward trend.
- **Short Exit**:%B crosses **above 0.5**, signaling the end of the downward trend.

#### Implementation in Gainium
- **Set Up Bollinger Bands %B**:Configure %B to trigger trades when crossing the 0.5 level, indicating strong momentum.
- **Configure Trend Conditions**:For a long entry, wait until %B crosses up above 0.5 and stays there for a few bars.
- **Risk Management**:Use a risk-to-reward ratio of at least 2:1 to maintain profitable trade setups.

## Practical Considerations

When using Bollinger Bands %B in your bot trading, here are some key things to consider:

### 1. Adjust the MA and Deviations
- The default settings for Bollinger Bands are **a 20-period SMA**&nbsp;and&nbsp;**2 standard deviations**. Depending on the asset you're trading, it may be beneficial to experiment with these settings to better capture volatility.

### 2. Avoid Overfitting
- Be cautious when setting overly specific conditions, such as highly tight values for %B. Overfitting can lead to poor performance in real market conditions.

### 3. Backtest Your Strategy
- Always run backtests using Gainium’s backtesting tools to ensure your strategy works across various market conditions.

### 4. Watch for Breakouts
- While %B can help with mean reversion strategies, it’s also great for detecting breakouts when the price moves strongly above or below the bands. This can signal you to either follow the trend or reverse your position.

## Conclusion

Bollinger Bands %B is a versatile and powerful indicator that provides deep insights into market conditions. It allows traders to capture overbought/oversold signals and trend strength. In Gainium, using %B in combination with bots enables automated, data-driven trades that can adapt to changing market conditions.

Whether employing a mean reversion or trend-following strategy, Bollinger Bands %B helps you stay ahead of the market with precise entries and exits. Experiment with different settings, run backtests, and fine-tune your strategy for optimal performance.
