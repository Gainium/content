---
id: 74
name: Relative Strength Index (RSI)
slug: rsi
description: >-
  In this article, we explain what is the RSI indicator and how it can be used
  in bot trading.
createdAt: '2023-04-11T17:49:23.152Z'
updatedAt: '2026-10-12T00:00:00.000Z'
publishedAt: '2023-04-14T07:29:26.368Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.024Z'
tldr: >-
  The Relative Strength Index (RSI) measures momentum strength, with readings
  below 30 indicating oversold (buy signal) and above 70 indicating overbought
  (sell signal). In Gainium, RSI can be used for classic overbought/oversold
  trading, trend confirmation, and divergence strategies. The RSI line can
  also be smoothed with a moving average, or compared with its own moving
  average to time momentum turns.
---

In the rapidly changing world of cryptocurrency trading, traders are continually seeking effective tools and strategies to gain an edge in the market. One such tool is the Relative Strength Index (RSI), a widely-used technical indicator that can help identify potential entry and exit points in a trade. In this article, we'll explore the basics of RSI, how it can be applied to the BTC/USDT trading pair, and example strategies to help you maximize your profits.

## The Relative Strength Index (RSI)

Developed by J. Welles Wilder, the Relative Strength Index or RSI, is one of the most popular indicators used by traders to measure the momentum strength of an asset price action. The RSI indicator calculates the ratio of upward price movements (trader's bids) to downward price movements over a given period, typically 14 days. (As crypto is a very volatile market, the default setting in Gainium is 7).

The RSI is typically interpreted using two key threshold levels: 30 and 70. When the RSI falls below 30, the asset is considered oversold, signaling a potential buying opportunity. Conversely, when the RSI rises above 70, the asset is considered overbought, indicating a possible selling opportunity. Additionally, the RSI can be used to identify trend reversals through bullish and bearish divergences.

## Using RSI in Gainium

To use it, set the deal start condition (or the take profit or stop loss type) to **Indicators**. An RSI is added for you: click **Edit** on it to open its settings, then set the **Length**, the **Interval**, the **Condition** and the **Value**. To add another indicator, click **+ Indicator**, then **Edit** and **Change indicator** to pick its type. For DCA orders, set the DCA type to **Indicators** and click **Add DCA Indicator**.
![The RSI settings: Use percentile, Length and Interval, Smoothing, Condition and Value, and Keep true](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_17_23_03_54b9344e4a-0f3d3e.webp)
*RSI*

### Smoothing the RSI

The RSI can be noisy, especially on short lengths and intervals. **Smoothing** applies a moving average to the RSI line before the condition is tested:

- **Smoothing**: None (default), SMA, EMA, WMA, DEMA, TEMA, HMA or RMA.
- **Smoothing length**: how many candles the moving average covers (default 14).
- **Compare**: what the condition tests once smoothing is on.

With Compare set to **Smoothed line vs value**, every condition — Crossing up, Crossing down, Greater than, Lower than and Between — tests the smoothed RSI against your Value. A one-candle spike barely moves the smoothed line, so the condition fires on sustained moves. For example, the common rule "EMA of RSI(14) over 14 candles below 80" is: Length **14**, Smoothing **EMA**, Smoothing length **14**, Compare **Smoothed line vs value**, Condition **Lower than**, Value **80**.

![RSI 14 smoothed with an EMA 14, tested with Lower than 80](https://content.gainium.io/images/content/help/rsi__smoothing-vs-value.webp)

With Compare set to **Line vs smoothed line**, the condition tests the RSI against its own moving average: **Crossing up** or **Crossing down** when the RSI crosses its average, **Greater than** or **Lower than** while it is above or below it. The Value field is hidden and **Between** is not offered. With a short average, such as an EMA of 9 to 14 candles, this is a timing signal: the RSI crossing up through its average shows momentum turning up, often before the RSI reaches a fixed level.

![RSI 14 crossing up its EMA 9: Compare set to Line vs smoothed line, with no Value field](https://content.gainium.io/images/content/help/rsi__smoothing-line-vs-smoothed.webp)

When smoothing is on, the bot chart draws the smoothed line in orange next to the purple RSI.

![The RSI pane: the RSI in purple and its EMA 14 in orange](https://content.gainium.io/images/content/help/rsi__chart-smoothed-line.webp)

If you turn on **Use percentile**, the percentile ranks the smoothed RSI and Compare is hidden. Leave Smoothing on **None** to use the RSI exactly as before. More details in [Indicator Smoothing](https://gainium.io/help/indicator-smoothing).









RSI Strategy for BTC/USDT: RSI BreakoutsAn RSI breakout strategy involves monitoring the RSI for breakouts from established support and resistance levels. For instance, if the RSI for BTC/USDT has been fluctuating between 40 and 60 for an extended period, a breakout above 60 or below 40 could signal the start of a new trend.

In this scenario, if the RSI breaks out above 60, a trader might consider opening a long position, anticipating a continuation of the upward trend. Alternatively, if the RSI breaks down below 40, a short position could be warranted, with the expectation of a downward trend.

## Using RSI in crypto bot trading

Examples of how to use RSI indicator in your bot trading strategies.

### Classic Overbought and Oversold

One of the simplest and most popular strategies using the RSI is to trade based on overbought and oversold conditions. In the case of the BTC/USDT trading pair, traders can monitor the RSI for levels above 70 or below 30.

For example, if the RSI for BTC/USDT falls below 30, this could signal that Bitcoin is oversold against Tether and may be due for a price rebound. In this case, a trader might consider opening a long position in anticipation of a price increase. Conversely, if the RSI rises above 70, this could suggest that Bitcoin is overbought and may be due for a price correction. Here, a trader might consider opening a short position to capitalize on the potential price decline.
![Screenshot 2023-04-11 at 18.19.53.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_18_19_53_44a8a1caf0-7fdb8b.webp)
*Sell when RSI above 70*
![Screenshot 2023-04-11 at 18.20.31.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_18_20_31_69136710d4-c5d62a.webp)
*Buy when RSI is below 30*

### Trend Confirmation

Traders may use the RSI indicator to confirm trends. For example, if the RSI value is rising along with an uptrend in price, it can indicate that the trend is solid and likely to continue. If the RSI value is falling along with a downtrend in price, it can mean that the trend is strong and likely to continue. In the example below, RSI is growing from the 30ies crossing up the 50ies in a very smooth organic way and not jumping immediately over the 70ies. This indicates that there is still room for the price to go higher. In fact, there is an excellent pump right after the 50 is crossed. The RIS value of 50 is often used to see if the trend will continue or if the price will be rejected.
![Screenshot 2023-04-11 at 18.25.55.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_18_25_55_adc72a10ca-a68d0f.webp)
*Continuation of a trend*

### Divergence Trading

Another effective RSI-based strategy is divergence trading. A [bullish divergence](https://gainium.io/help/divergences-indicator) occurs when the price of an asset forms lower lows, while the RSI forms higher lows, suggesting that the selling pressure is weakening and a potential trend reversal is imminent. In contrast, a bearish divergence occurs when the price forms higher highs, while the RSI forms lower highs, indicating that buying pressure is decreasing and a potential trend reversal is on the horizon.

For example, if a trader identifies a bullish divergence between the BTC/USDT price and RSI, they might consider opening a long position in anticipation of an upward price movement. Conversely, a short position may be more appropriate if a bearish divergence is observed.
![Screenshot 2023-04-11 at 18.32.54.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_18_32_54_34679fd994-8e07b7.webp)
*RSI divergence*

### RSI Breakouts

An RSI breakout strategy involves monitoring the RSI for breakouts from established support and resistance levels. For instance, if the RSI for BTC/USDT has been fluctuating between 40 and 60 for an extended period, a breakout above 60 or below 40 could signal the start of a new trend.

In this scenario, if the RSI breaks out above 60, a trader might consider opening a long position, anticipating a continuation of the upward trend. Alternatively, if the RSI breaks down below 40, a short position could be warranted, with the expectation of a downward trend.

### RSI and its moving average

Instead of waiting for the RSI to reach 30 or 70, you can trade the moment its momentum turns. Add the RSI with Smoothing **EMA**, Smoothing length **9**, Compare **Line vs smoothed line** and Condition **Crossing up**: the bot opens a deal when the RSI crosses above its own average. To avoid buying every small bounce, add a second RSI condition with the same settings but Compare **Smoothed line vs value**, Condition **Lower than** and Value **40**, so the turn only counts while the RSI is still low.

### Indicator combinations

Using RSI with another indicator for confirmation. The most popular combination is with [MACD](https://gainium.io/help/macd). To use RSI and MACD together, you could look for situations where the RSI indicates an oversold or overbought condition while the MACD gives a bullish or bearish signal. For example, Oversold with Bullish MACD: If the RSI is below 30 and the MACD line crosses above the signal line, it could be a signal to buy. Overbought with Bearish MACD: If the RSI is above 70 and the MACD line crosses below the signal line, it could be a signal to sell, as seen in the examples below.
![Screenshot 2023-04-11 at 18.47.35.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_18_47_35_8c86a73b00-fd477e.webp)
*Buy SIgnal*
![Screenshot 2023-04-11 at 18.45.50.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_18_45_50_4a96aee288-c402ff.webp)
*Sell Signal*

## Conclusion

The Relative Strength Index (RSI) is a powerful and versatile technical indicator that can provide valuable insights for cryptocurrency traders. Combining these strategies with proper risk management techniques is crucial to protect your portfolio and maximizing profitability.
