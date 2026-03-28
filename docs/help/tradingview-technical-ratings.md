---
id: 75
name: Combined Ratings (CR)
slug: tradingview-technical-ratings
description: >-
  In this article, we explain what is the Tradingview Technical Ratings
  indicator and how it can be used in bot trading.
createdAt: '2023-04-11T17:54:14.611Z'
updatedAt: '2026-02-24T07:44:20.584Z'
publishedAt: '2023-04-14T07:56:21.020Z'
locale: en
categories:
  - technical-indicators
difficulty: intermediate
tags:
  - trading
  - technical
optimized: true
ingested: true
ingestedAt: '2025-06-29T10:57:30.028Z'
tldr: >-
  Combined Technical Ratings aggregate multiple indicators (moving averages,
  oscillators, pivot points) into a single rating from "Strong Sell" to "Strong
  Buy." They should be used alongside other analysis tools for trend following,
  contrarian trading, and asset comparison.
---

In the fast-paced world of cryptocurrency trading, having access to the right tools and strategies can make all the difference. In this article, we'll explore the basics of the Combined Technical Ratings Indicator and example bot-trading strategies to help you maximize profits.

## Combined Technical Ratings Indicator: An Overview

Combined Technical Ratings, previously known as TradingView Analysis, are designed to help traders quickly evaluate the technical strength of a particular asset or instrument. These ratings are based on a combination of popular technical indicators, such as moving averages, oscillators, and pivot points. The ratings range from "Strong Sell" to "Strong Buy," and can provide traders with a quick visual representation of the technical health of an asset. You can find a detailed explanation of each indicator used [here](https://www.tradingview.com/support/solutions/43000614331-technical-ratings/).

It's essential to remember that Technical Ratings should not be used in isolation as a basis for trading decisions. Instead, they should be used with other technical analysis tools, such as chart patterns, support and resistance levels, and market trends, to make informed trading decisions.

## Using Tradingview Techincal Ratings in Gainium

You can select this indicator by selecting “Technical Indicators” from the drop-down menu first, then “Combined Ratings” in the “Indicator” Section.
![Screenshot 2023-04-11 at 18.51.59.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_18_51_59_09012eb084-69f064.png)
*Tradingview Analysis*

&nbsp;

## Utilizing Combined Technical Ratings in Crypto Trading

The Technical Ratings Indicator can be an invaluable tool for crypto traders, providing a quick and easy way to gauge an asset's technical health. Thanks to this indicator, traders can make more informed decisions regarding entry and exit points, risk management, and overall market analysis.

### Following the Technical Ratings

Suppose you're interested in trading ETH and already bullish on the token's fundamentals. You want to confirm the current bullish trend in the asset using technical analysis. You can check the Technical Ratings for ETH on TradingView and see that it's currently rated as "Strong Buy" or “Buy.” This confirms your bullish outlook as the Buy is also on a very high timeframe (daily in the image below) and gives you additional confidence to enter a long position on ETH.Here's how you can find them:
- Search for the asset or instrument you're interested in trading on TradingView.- Select the Technical Ratings tab on the left-hand side of the chart.- Take a look at the Technical Ratings to get an idea of the overall sentiment for the asset.- Check out the specific indicators that are being used to generate the ratings. These can be found by hovering over the rating itself.- Use the ratings as a starting point to assess the technical strength of the asset. In the example below the overall summary indicates that is an uptrend “Buy” on the 1-day timeframe- Combine the Technical Ratings with other technical analysis tools, such as support and resistance levels and chart patterns, to make informed trading decisions.&nbsp;
![Screenshot 2023-04-11 at 19.26.57.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_19_26_57_ad0ed441cf-5cbf9b.png)
*Eth Technical Ratings in Treadingview*

### Combining Technical Ratings with Key Levels

Another strategy combines the Technical Ratings Indicator with critical support and resistance levels. In this approach, traders can use the overall rating to gauge the market's direction while utilizing support and resistance levels to identify optimal entry and exit points.

For example, a trader might consider opening a long position if the Technical Ratings Indicator rates BTC/USDT as a "Buy" and the price is approaching a strong support level. On the other hand, if the rating is a "Sell" and the price is nearing a significant resistance level, a short position might be more appropriate.

### Divergence and Confluence

Incorporating the Technical Ratings Indicator into a divergence and confluence strategy can also be highly effective. Traders can monitor the indicator for signs of divergence between the overall rating and the price action, signaling a potential trend reversal.

For example, if the Technical Ratings Indicator rates BTC/USDT as a "Strong Buy" while the price is forming lower lows, this bullish divergence could indicate that a trend reversal is imminent. Conversely, if the rating is a "Strong Sell" while the price is forming higher highs, a bearish divergence may suggest an upcoming trend reversal.

### Contrarian trading

Let's say you're interested in contrarian trading, which involves taking positions opposite the prevailing market sentiment. You can use Technical Ratings to identify currently overbought or oversold assets. For example, you might see that Apecoin (APE) is rated as a "Strong Buy," but it has been in a strong uptrend for a while. You might consider taking a short position on APE, anticipating that the trend is due for a correction.

Technical Ratings are primarily based on lagging indicators, so by the time you see “Strong Buy,” it might be the right time to short, especially if you are looking at the ratings on a very small timeframe. The images below show that Tradingview ratings printed 'Strong Buy" in the 1-minute timeframe. However, zooming out, you can see that APE has been on a strong run for quite a while and it might not be a good idea to take a Long Position, even if just for a quick scalp when the RSI is about to top the 70ies again.
![Screenshot 2023-04-11 at 19.37.39.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_19_37_39_a8c0fefade-289e6d.png)
*Strong Buy on 1 minute*
![Screenshot 2023-04-11 at 19.38.06.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_19_38_06_b5b5e7c835-dbc3ea.png)
*1-hour timeframe*

### Combining other indicators&nbsp;

The examples of the previous scenario already highlight how useful it is to use other indicators before entering a trade. As a general rule relying only on TradingView analysis for bot trading is quite risky, and you might want to use other indicators to filter out bad entries. In the example above, you might want to add an RSI filter not to enter any long position when the value is above 70 on a higher timeframe.

The same principle can be applied to short bot entries. You might want not to enter any short position when “Sell” and/or “Strong Sell” occur on a low timeframe if the RSI on a 1-hour timeframe is below 30. In the example below, you would rather ignore entering a short position on the 9th of April when the indicator prints “Strong Sell” on the 5 min chart. If you zoom out and check the RSI in a 1-hour timeframe, the asset is already oversold, and it's unlikely it will continue dropping further.&nbsp;
![Screenshot 2023-04-11 at 19.55.54.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_19_55_54_44ff429dcb-88fc97.png)
*Strong Sell on 5 minute*
![Screenshot 2023-04-11 at 19.56.23.png](https://content.gainium.io/images/content/help/Screenshot_2023_04_11_at_19_56_23_79430420a3-b0161a.png)
*1-hour timeframe*

### Asset comparison&nbsp;

If you're trying to decide between two assets to invest in the long term, you can compare their Technical Ratings on TradingView. For example, let's say you're trying to choose between BTC and ETH. You can look at the Technical Ratings for each asset and see that BTC is rated as "Neutral" while ETH is rated as a "Strong Buy". This may influence your decision to invest in ETH instead of BTC.

## Conclusion

TradingView's Technical Ratings Indicator is a powerful tool that can provide crypto traders with valuable insights and help them make more informed decisions. Remember, always combine the Technical Ratings Indicator with other technical and fundamental analysis tools to gain a more comprehensive understanding of the market and ensure a well-rounded approach to your trading. As with any strategy, proper risk management and discipline are crucial for maximizing profitability and protecting your portfolio.

&nbsp;
