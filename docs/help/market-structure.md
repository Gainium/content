---
id: 128
name: Market Structure Indicator
slug: market-structure
description: >-
  Learn how to use the Market Structure Indicator in Gainium for automated
  trading, detecting trend reversals, breakouts, and market shifts with event,
  market, or price triggers.
createdAt: '2024-10-07T04:22:04.612Z'
updatedAt: '2026-02-24T07:44:20.575Z'
publishedAt: '2024-10-07T04:22:07.958Z'
locale: en
categories:
  - technical-indicators
difficulty: beginner
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.015Z'
tldr: >-
  The Market Structure Indicator identifies breaks of structure (BOS), changes
  of character (CHoCH), and key pivot levels to detect trend reversals and
  shifts. It works best when combined with Fair Value Gaps for Smart Money
  Concepts trading setups.
---

The **Market Structure Indicator** is a tool used to identify critical structural patterns in the market, including price trends, reversals, and significant levels such as highs, lows, and breakouts. It offers valuable insights into how price action evolves, which can help traders make more informed decisions. In Gainium, the Market Structure Indicator comes with various trigger types and conditions that can be tailored for different trading strategies, whether event-based, market-based, or price-based.

Market Structure is a fundamental component of Smart Money Concepts (SMC) and works exceptionally well when combined with other SMC tools like [Fair Value Gaps](/help/fair-value-gap), which identify institutional price imbalances that act as precise entry zones within the broader market structure.

In this article, we will define the **Market Structure Indicator**, explain its use in Gainium, and provide examples of trading strategies using this indicator with entry and exit rules. We'll also cover practical considerations and conclude with tips on integrating them into your trading strategy.

## What Is the Market Structure Indicator?

The **Market Structure Indicator** helps traders identify price movements and shifts in market dynamics, such as **breaks of structure** and **changes of character**. It detects the formation of higher highs, lower lows, and other key price patterns that indicate bullish or bearish shifts.

### Key Features:
- **Event-Based Triggers**: Detect significant structural changes in price (e.g., break of structure, change of character).- **Market-Based Triggers**: Identify overall market trends (e.g., bullish or bearish market structure).- **Price-Based Triggers**: Identify price movements related to pivots (higher highs, lower lows, etc.) with fine-tuning options using the **multiplier** setting.

## How to Configure the Market Structure Indicator in Gainium

Here’s how to configure the **Market Structure Indicator** in Gainium based on the attached settings.

### Step 1: Add the Market Structure Indicator
- **Navigate to the Bot Settings**:Log into Gainium, select your bot, and add the **Market Structure** indicator from the list.

### Step 2: Configure the Indicator Settings
- **Interval (1 day)**: This setting determines the timeframe for the indicator’s calculations. The provided example is set to **1 day**, meaning that the indicator will analyze daily price movements to detect structural changes.- **Trigger Type**: There are three trigger types available:**Event-Based**: Detects specific market events like a **Break of Structure** or **Change of Character**. This can be used to signal reversals or new trends.- **Market-Based**: Detects overall market conditions, such as a **Bullish Market Structure** or **Bearish Market Structure**. It’s helpful in identifying the general trend direction.- **Price-Based**: Detects movements around key price levels, such as pivot highs, pivot lows, and their respective changes. The **multiplier** setting allows you to fine-tune the sensitivity of the condition.
- **Condition**:For **Event-Based Triggers**, you can choose **Swing Bullish Change of Character** or **Swing Bearish Break of Structure**. These conditions help identify significant shifts in market sentiment.- For&nbsp;**Market-Based Triggers**, you can select&nbsp;**a Bullish**&nbsp;or&nbsp;**Bearish Market Structure**&nbsp;to signal the overall market direction.- For **Price-Based Triggers**, conditions like **Price Crossing Down Any Pivot Low** allow you to detect when the price crosses significant support or resistance levels.
- **Multiplier** (For Price-Based Only): The multiplier allows you to adjust the condition's sensitivity. A larger multiplier means the trigger will require a more substantial price movement before firing.- **Keep True (0)**: This setting defines how long the condition remains true after it’s triggered. Setting it to **0** means the condition resets immediately after it’s met.
![image.png](https://content.gainium.io/images/content/help/image_e16381735e-6943e4.png)
*Market Structure Indicator Settings*

## Combining Market Structure with Fair Value Gaps

Market Structure becomes even more powerful when combined with [Fair Value Gaps (FVGs)](/help/fair-value-gap). While Market Structure identifies the overall trend direction and key reversal points, FVGs pinpoint precise entry zones where institutional orders have created price inefficiencies.

### Key Synergies:
- **Trend Confirmation**: Use Market Structure to identify the trend direction, then look for FVGs in that direction for optimal entry points.
- **Reversal Zones**: When a Change of Character (CHoCH) occurs, FVGs from the previous trend often mark exact reversal areas.
- **Break of Structure + FVG**: After a Break of Structure (BOS), waiting for price to return to an FVG in the new trend direction provides high-probability entries.
- **Confluence Setups**: The strongest trading setups occur when FVGs align with key market structure levels like swing highs, swing lows, or pivot points.

For detailed strategies on trading Fair Value Gaps, see our [Fair Value Gap Indicator](/help/fair-value-gap) guide.

## Using Market Structure in Bot Trading

Here are two trading strategies that use the **Market Structure Indicator** in automated bot trading.

### Strategy 1: Trend Reversal Strategy Using Event-Based Triggers

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when the **Swing Bullish Change of Character** is detected, signaling that the market is transitioning from a bearish trend to a bullish one.
- **Short Entry (Sell)**:Enter a short position when the **Swing Bearish Change of Character** is detected, signaling a transition from bullish to bearish.

#### Exit Rules
- **Long Exit**:Exit the long trade when a **Swing Bearish Change of Character** is detected, indicating a potential reversal back to bearish territory.
- **Short Exit**:Exit the short trade when a **Swing Bullish Change of Character** is detected, signaling a possible return to bullish territory.

#### Implementation in Gainium
- **Set the Event-Based Triggers**: Use the **Swing Bullish Change of Character** for long entries and **Swing Bearish Change of Character** for short entries.- **Automate Entries and Exits**: The bot will enter or exit trades based on key shifts in the market structure, ensuring that trades are executed at significant turning points.

### Strategy 2: Breakout Strategy Using Price-Based Triggers

#### Entry Rules
- **Long Entry (Buy)**:Enter a long position when the price **crosses up any pivot low**, signaling that the price has broken past a significant support level and may continue upward.
- **Short Entry (Sell)**:Enter a short position when the price **crosses down any pivot high**, indicating that the price has fallen below a key resistance level and may continue downward.

#### Exit Rules
- **Long Exit**:Exit the long trade when the price **crosses down any pivot low**, signaling that the bullish momentum has weakened and the price may reverse downward.
- **Short Exit**:Exit the short trade when the price **crosses up any pivot high**, signaling that the bearish momentum has faded and the price may reverse upward.

#### Implementation in Gainium
- **Set the Price-Based Triggers**: Configure the bot to enter long trades when the price crosses up any pivot low and enter short trades when the price crosses down any pivot high.- **Use the Multiplier**: Adjust the **multiplier** to control the sensitivity of the price trigger, allowing for fine-tuning based on the asset's volatility.

## Practical Considerations

Here are some practical tips when using the **Market Structure Indicator** in your trading strategy:

### 1. Adjust Trigger Types Based on Market Conditions
- **Event-Based** triggers work best in markets with strong trends or clear reversals.- **Market-Based** triggers are useful for determining the overall trend direction and staying aligned with it.- **Price-Based** triggers are best for detecting support and resistance breakouts or retests.

### 2. Use the Multiplier for Fine-Tuning
- For **Price-Based** triggers, the multiplier allows you to adjust the amount of price movement required to trigger a condition. This is helpful in volatile markets where small price fluctuations may create false signals.

### 3. Combine with Other Indicators
- To improve the accuracy of the Market Structure Indicator, combine it with other indicators like **RSI**, **moving averages**, or **volume** to confirm signals and avoid false positives.
- For Smart Money Concepts trading, combine Market Structure with [Fair Value Gaps](/help/fair-value-gap) to identify both the trend direction and precise institutional entry zones.

### 4. Backtest Thoroughly
- Backtest your strategy using Gainium’s backtesting feature to ensure the Market Structure settings work well under different market conditions. Fine-tune the lookback period, intervals, and conditions as needed.

## Conclusion

The **Market Structure Indicator** is a versatile and powerful tool that helps traders identify key price patterns, reversals, and market trends. By configuring the indicator correctly in Gainium and incorporating it into your bot trading strategies, you can take advantage of changes in market dynamics and execute trades at more opportune moments.

Whether you're using **event-based** triggers for trend reversals or **price-based** triggers for breakout strategies, combining the Market Structure Indicator with other Smart Money Concepts tools like [Fair Value Gaps](/help/fair-value-gap) and careful risk management can help enhance your trading results. Together, these tools provide a comprehensive framework for understanding institutional order flow and making more informed trading decisions.
