---
id: 69
name: Bollinger Bands (BB)
slug: bb
description: >-
  In this article, we explain what is the Bollinger Bands indicator and how it
  can be used in bot trading.
createdAt: '2023-04-05T14:51:39.550Z'
updatedAt: '2026-02-24T07:44:20.565Z'
publishedAt: '2023-04-12T06:03:51.322Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags: []
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:29.996Z'
tldr: >-
  Bollinger Bands (BB) consist of a Simple Moving Average with upper and lower
  bands at 2 standard deviations, helping identify overbought/oversold
  conditions and volatility. In Gainium bots, they can be used for breakout
  strategies, mean reversion (buying at lower band, selling at upper), and
  squeeze strategies.
---

The rise of cryptocurrency trading has led to a surge in the adoption of trading automation. Trading bots have become an invaluable tool for investors to minimize human error and capitalize on market opportunities more efficiently. One popular technical indicator that can significantly enhance your trading bot's performance is the Bollinger Bands (BB). In this article, we'll discuss how to effectively use the Bollinger Bands indicator in your automated trading strategy.

## Understanding the Bollinger Bands Indicator

The Bollinger Bands, developed by John Bollinger in the 1980s, is a volatility-based technical indicator that consists of three lines: a Simple Moving Average (SMA), an upper band, and a lower band. The upper and lower bands are plotted at a specified number of standard deviations (typically 2) above and below the SMA. Bollinger Bands help traders identify potential price reversals and gauge market volatility by measuring the relative width of the bands (see also the [Bollinger Bands Width](https://gainium.io/help/bbw)).

Bollinger Bands is one of the most popular indicators used for bot trading (together with [RSI](https://gainium.io/help/rsi)) because of its straightforward setup.&nbsp;

The bands expand when the price is volatile and contract when the price lacks volatility. When the price touches the upper Bollinger Band, it can indicate an overbought or sell signal, and if the price touches the lower band, it can mean an oversold or buy signal.

As mentioned in the BBW indicator, when the Upper and Lower bands are very close, the volatility decreases there is a higher chance of a substantial increase in price volatility. Traders call this trading opportunity the “Squeeze.”

## Using the Bollinger Bands Indicator in Gainium

You can select this indicator by selecting “Technical Indicators” from the drop-down menu first, then “Bollinger Bands” in the “Indicator” Section.
![Screenshot 2023-04-03 at 18.22.47.png](https://gainium.io/images/content/help/Screenshot_2023_04_03_at_18_22_47_fdabbde9ea-54154a.png)
*Bollinger Bands*

## Examples of BBW Strategies for bot trading

A. Bollinger Bands Breakout Strategy

In a breakout strategy, your trading bot will capitalize on significant price movements following periods of consolidation. When the price breaks above the upper Bollinger Band, it can signal a bullish breakout, prompting your bot to initiate a long position. Conversely, when the price breaks below the lower Bollinger Band, it can signal a bearish breakout, leading the bot to enter a short position.

For example, if the BTC/USDT pair's price breaks under the lower Bollinger Band, your bot will initiate a short position, anticipating a bearish trend. The bot will then hold the position until the price reverses or reaches a predetermined profit target.
![Screenshot 2023-04-03 at 18.55.47.png](https://gainium.io/images/content/help/Screenshot_2023_04_03_at_18_55_47_c29714995f-b656fb.png)
*Bollinger Bands buy and sell signals*

B. Bollinger Bands Mean Reversion Strategy

In a mean reversion strategy, your trading bot will take advantage of price fluctuations by buying low and selling high within the Bollinger Bands. When the price touches the lower Bollinger Band, your bot can initiate a long position, expecting the price to revert to the mean (SMA). Conversely, when the price touches the upper Bollinger Band, the bot can exit the position or initiate a short trade.

For instance, when the BTC/USDT pair's price reaches the lower Bollinger Band, the bot can initiate a long position, anticipating an upward price movement toward the SMA. The bot can exit the position or enter a short trade when the price reaches the upper Bollinger Band.&nbsp;
![Screenshot 2023-04-07 at 17.09.28.png](https://gainium.io/images/content/help/Screenshot_2023_04_07_at_17_09_28_d21fd06410-e8815a.png)
*Trend reversal*

C. Bollinger Bands Squeeze Strategy

The squeeze strategy aims to identify potential price breakouts following periods of consolidation. When the Bollinger Bands contract and the bands' width narrows, it can signal a potential breakout in either direction. Your trading bot can monitor additional technical indicators, such as a spike in trading volume or a break of a trendline, to confirm the breakout direction before initiating a trade.

Using the BTC/USDT pair as an example, if the Bollinger Bands contract and the width narrows, your bot can monitor additional confirmation signals, such as a significant increase in trading volume. If the price breaks above the upper Bollinger Band and trading volume surges, the bot can initiate a long position, anticipating a bullish breakout. The bot will then hold the position until the price reverses or reaches a predetermined profit target.&nbsp;
![Screenshot 2023-04-07 at 17.12.18.png](https://gainium.io/images/content/help/Screenshot_2023_04_07_at_17_12_18_74ef6d3bca-6085c6.png)
*The Squeeze*

## Practical considerations when using Bollinger Bands in Bot Trading

Traders can also use Bollinger Bands across multiple timeframes to confirm trends and generate trading signals. For example, if the price is above the lower Bollinger Band on the daily chart and the 1-hour chart there is a squeeze, which indicates a strong uptrend, it may be an excellent time to enter a long position. In the example below, the price finds support on the daily timeframe, indicating that the squeeze occurring in a 1-hour timeframe might lead to an upward move.&nbsp;
![Screenshot 2023-04-07 at 17.18.49.png](https://gainium.io/images/content/help/Screenshot_2023_04_07_at_17_18_49_23bf886de7-46f030.png)
*Price support on daily on the lower band*
![Screenshot 2023-04-07 at 17.19.34.png](https://gainium.io/images/content/help/Screenshot_2023_04_07_at_17_19_34_1ceabad37b-74c8e9.png)
*Squeeze in 1 hour*

## Conclusion

The Bollinger Bands indicator can provide valuable insights into market volatility and potential trading opportunities for your crypto trading bot. As with any trading strategy, testing and fine-tuning the parameters to suit your risk tolerance and market conditions is essential. Combining the Bollinger Bands with other [technical indicators](https://gainium.io/help/category/technical-indicators) and fundamental analysis can further improve the effectiveness of your trading bot and contribute to a well-rounded investment approach.
