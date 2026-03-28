---
id: 97
name: Indicator Percentiles
slug: indicator-percentiles
description: >-
  Unlock advanced crypto trading strategies with Gainium's new Percentiles
  feature, offering nuanced insights using historical indicator analysis
createdAt: '2023-12-04T17:58:26.428Z'
updatedAt: '2026-02-24T07:44:20.574Z'
publishedAt: '2023-12-04T18:27:36.919Z'
locale: en
categories:
  - technical-indicators
difficulty: advanced
tags:
  - indicator
ingested: true
ingestedAt: '2025-06-29T10:57:30.013Z'
tldr: >-
  The Percentiles feature lets you use an indicator''s percentile rank relative
  to its recent historical values instead of its raw value, providing normalized
  and context-aware signals. This enables strategies like triggering trades when
  RSI reaches its 90th percentile rather than a fixed level.
---

Gainium is committed to providing innovative tools for cryptocurrency trading. Our latest feature, Percentiles, offers traders a new dimension of strategy customization. This guide will walk you through the Percentiles feature, explaining how it can be combined with specific indicators to enhance your trading strategies on Gainium.

## **What are Percentiles?**

Percentiles are a statistical measure indicating the value below which a given percentage of observations falls in a group of observations. In the context of trading, using percentile values of indicators instead of their actual values can provide a more nuanced understanding of market trends and conditions.

For example, let's consider the Relative Strength Index (RSI) of Bitcoin over the last 50 bars; the percentile value of the RSI at bar number 1000 reflects the percentage of RSI values, from bar 950 to 1000, that are lower than the RSI at bar 1000. The percentile reaches 100% when the current bar's RSI is higher than all the RSI values of the previous 50 bars. Conversely, it is 0% when the current bar's RSI is lower than all the RSI values from the preceding 50 bars.

Consider this scenario:

Bar 10: RSI 45Bar 11: RSI 50Bar 12: RSI 55Bar 13: RSI 60Bar 14: RSI 65Bar 15: RSI 70Bar 16 (Current bar): RSI 58

In this case, applying the Percent Rank function with a lookback period of seven bars to the RSI values would return a value of 50% for bar number 16. This is because three of the bars have RSI values above 58, and three have values below 58.

The PercentRank function is adaptable and can be applied to various types of time series data. This includes price data and technical analysis indicators.

## **How Percentiles Work in Gainium**

When you enable the Percentile option for an indicator, the bot will use the indicator's percentile value rather than its actual value. This approach allows for a more relative indicator interpretation, considering its historical performance over a specified lookback period.

### **Enabling Percentiles**

**Select an Indicator:** Choose an indicator to which you want to apply the Percentile feature. Not all indicators may support this feature, so check the compatibility first.

**Enable “Use Percentile” Option:** You will find an option to enable Percentiles in the indicator settings. Turn this on to activate the feature.

**Specify Lookback Period:** Once Percentiles are enabled, specify the lookback period. This is the number of bars over which the percentile calculation will be made.

![indicator-percentile.jpeg](https://content.gainium.io/images/content/help/indicator_percentile_de891f97bd-43b997.jpeg)

As you can see from the screenshot above, setting the rule to trigger when the RSI crosses the 90th percentile will display a dotted line with the value the RSI needs to reach to be in the 90th percentile.

## **Practical Applications of Percentiles in Trading**

### **Enhanced Strategy Formulation**

Using Percentiles, traders can formulate strategies based on an indicator's performance relative to its historical values. For example, a trader might set a bot to buy when a particular indicator falls into the lower 20th percentile, indicating it is relatively low compared to its recent historical values.

### **Risk Management**

Percentiles can also be used for risk management. By understanding where the current value of an indicator lies in its historical range, traders can make more informed decisions about potential risks.

### **Market Analysis**

This feature is handy in volatile markets. Percentiles allow normalizing indicator values, making comparing current market conditions to historical patterns easier.

## **Best Practices for Using Percentiles**
- **Understand the Indicator:** Before applying Percentiles, ensure you understand the chosen indicator and how it reflects market conditions.
- **Appropriate Lookback Period:** The lookback period should align with your trading strategy. Shorter periods may be more suited for short-term trading, while more extended periods can be better for long-term strategies.
- **Continuous Monitoring and Adjustment:** Regularly review and adjust the percentile settings and lookback periods based on ongoing market conditions and the performance of your trading strategy.

## **Conclusion**

Introducing Percentiles in Gainium's trading bots is a significant step toward more sophisticated and nuanced trading strategies. By leveraging this feature, traders can gain deeper insights into market trends and tailor their strategy with a greater degree of precision. As always, continuous learning and adaptation are key to successful trading in the dynamic world of cryptocurrency.
