---
title: Common Backtesting Problems and Solutions
slug: common-backtesting-problems
excerpt: "Avoid common backtesting problems and mistakes with this comprehensive guide. Learn how to overcome curve fitting and survivor bias in your backtesting strategy."
publishedAt: '2023-10-25T06:15:56.604Z'
updatedAt: '2024-02-29T10:27:04.468Z'
createdAt: '2023-10-25T06:15:56.604Z'
locale: en
author: ares
categories:
  - name: Trading Education
    slug: trading-education

tldr: >-
  This guide outlines common pitfalls in backtesting crypto strategies, such as survivorship bias, look-ahead bias, curve fitting, and unrealistic fee assumptions. It provides solutions to ensure more accurate results, emphasizing the importance of realistic data, sufficient sample sizes, and out-of-sample testing.
faq:
  - title: "What is the most common backtesting mistake?"
    details: "Curve fitting (over-optimizing for past data) and look-ahead bias (using future data) are among the most frequent errors that lead to unrealistic expectations."
  - title: "How many trades do I need for a valid backtest?"
    details: "A general guideline is to aim for at least 100 trades to ensure statistical significance and reduce the impact of outliers."
  - title: "Why do backtest results differ from live trading?"
    details: "Factors like slippage, trading fees, market liquidity, and latency can cause live results to diverge from theoretical backtests."
---

## Introduction

Backtesting is an essential tool for traders in the financial markets to evaluate the historical performance of their trading strategies. However, despite its significance, there are several potential pitfalls and mistakes that traders need to be aware of to ensure accurate and reliable backtesting results.

In this article, we will discuss the most common backtesting issues and possible solutions to address those problems.

Let's get started!

## Common Backtesting Issues

### Survivorship Bias

Survivorship bias is a common problem in backtesting that can significantly impact the accuracy of results. It occurs when only successful assets are included in the analysis, while failed or delisted ones are ignored. This leads to incomplete data and overly optimistic beliefs about the effectiveness of a trading strategy.

In the context of crypto trading, survivorship bias is particularly relevant. With the volatile and rapidly changing nature of the cryptocurrency market, many coins have been delisted due to poor performance or other reasons. The results may be skewed if these delisted coins are not considered in the backtesting process. Traders may inadvertently develop strategies based on incomplete or cherry-picked data, leading to false confidence in their trading abilities.

Notable examples of survivorship bias in crypto trading include delisting once-prominent coins like [Bitconnect](https://thenextweb.com/news/bitconnect-delisted-last-exchange) and [OneCoin](https://www.zdnet.com/article/onecoin-leaders-sued-over-alleged-operation-of-4-billion-ponzi-scheme/). These coins were initially popular and attracted a significant following, but ultimately faced regulatory issues and collapsed. Ignoring the performance of such delisted coins in backtesting can create a distorted representation of the overall market and lead to poor investment decisions.

To mitigate survivorship bias, traders should include successful and failed assets in their backtesting data. However, this might be challenging since most backtesting programs obtain data from exchanges, which may no longer provide price data for delisted coins. Therefore, we recommend relying on established projects, as discussed below.

### Look-Ahead Bias

Look-ahead bias is a common problem in backtesting that occurs when future data or information unavailable during the trade is used in the testing process. By incorporating information that would not have been available at the time of the trade, the performance of a trading strategy can appear better than it would have been in reality. This can create false confidence in the strategy and lead traders to make uninformed decisions when trading in real-time.

Several strategies can be employed to mitigate the effects of look-ahead bias, such as testing the strategy using out-of-sample data and double-checking the strategy and software for possible bias.

In addition, it is crucial to avoid retroactive data updates. Once a backtest has been performed, it should not be altered or updated with new information unavailable at the time. This helps maintain the integrity and accuracy of the backtest results.

### Impact of Sample Periods on Results

The choice of sample period can significantly impact the performance of a trading strategy and its ability to generate consistent profits in real trading.

When selecting a sample period for backtesting, it is crucial to consider the characteristics of the time span being traded. Different periods may have unique market conditions and trends that can influence the performance of a strategy. For example, a strategy that performs well in a bull market will likely struggle in a bear market.

A more extended sample period can provide a more comprehensive view of a strategy's historical performance, capturing its ability to adapt to various market conditions. However, this may also increase the likelihood of including irrelevant or outdated data that may not accurately represent current market conditions.

Dividing the data into in-sample and out-of-sample testing time periods is recommended to address this. The in-sample testing period is used to develop and optimize the trading strategy, while the out-of-sample testing period is used to validate its performance on unseen data. This helps to evaluate the strategy's ability to generalize and perform well in new market conditions and assess its ability to generate consistent returns.

### Equity Curve Shaping and Curve Fitting

Equity curve shaping refers to molding the performance of the trading rules to create an appealing equity curve. This is often done by manipulating the parameters or rules of the strategy to achieve desirable outcomes, such as high return or a low drawdown.

However, equity curve shaping can easily lead to curve fitting, a significant backtesting problem. Curve fitting occurs when a trading system is overly tailored to historical data, resulting in excellent performance for the specific period tested but poor performance in live trading. This happens because the system becomes too specialized to past market conditions and fails to perform in new situations.

![curve fitting.webp](https://gainium.io/images/content/blog/curve_fitting_a69b4f42b0-2fa76e.webp)

To avoid curve fitting, it is essential to consider several key factors while shaping an equity curve:

1. Diversify strategies. Having different but complementary investment strategies helps reduce the risk of overfitting to a specific data set.
2. Test the strategies in different market conditions. By evaluating the performance in various scenarios, traders can ensure that the strategies are robust enough to handle changing market dynamics.
3. Avoid over-optimization. This can be achieved by setting realistic expectations and not chasing the highest returns during the backtesting process. Instead, focus on creating a system that performs well overall and is adaptable to different market scenarios.

### Data Snooping

Data snooping, also known as data mining, refers to searching through historical data to find patterns or relationships that can be used to develop trading strategies. While this can be a useful approach to generate trading hypotheses, data snooping can lead to significant problems in backtesting, mainly due to its close relationship with lookahead bias.

Data snooping can take various forms, including p-hacking and selective reporting. P-hacking involves testing numerous trading ideas on historical data until a significant result is found, even if it is just due to chance. Selective reporting occurs when only the successful trading strategies are reported, while the unsuccessful ones are ignored.

These practices can lead to false positives, where a backtest appears profitable but fails to perform well in actual trading. This happens because the strategies have been finely tuned to fit the historical data, but their effectiveness diminishes in the face of new market conditions.

To mitigate the negative impact of data snooping, it is essential to use walk forward analysis. This involves dividing the historical data into multiple subsets and testing the strategies on each subgroup separately. By doing so, traders can evaluate the robustness of their strategy and ensure they are not simply the result of data mining.

### Insufficient Sample Size

One of the most common problems traders encounter while backtesting is an insufficient sample size, leading to inaccurate results and poor decision-making.

A sufficient sample size is vital because it allows for more reliable statistical conclusions and reduces the risk of incorrect conclusions based on limited data. A smaller sample size may not represent the overall market conditions and may not capture the actual performance of a strategy.

To address this issue, traders should aim to include a significant number of trades in their backtesting process. While there is no fixed rule regarding the number of trades needed, a general guideline is to aim for at least 100 trades to obtain a reasonably reliable sample size.

The Law of Large Numbers concept is highly applicable regarding backtesting. It states that as the number of observations (trades) increases, the average performance of the strategy will converge to its expected value. Therefore, a larger sample size ensures a more accurate estimation of the strategy's performance.

Having more trades reduces the risk of overfitting. A larger sample size provides a more robust and representative dataset, increasing confidence in the strategy's performance and ability to handle various market conditions. In Gainium, we use a concept called [Confidence Grade](https://gainium.io/help/confidence-grade) to evaluate the reliability of a backtest based on the number of deals it produced.

![confidence-grade.jpeg](https://gainium.io/images/content/blog/confidence_grade_0633cfc2a4-021a4a.jpeg)

### Unreal Cost of Transactions and Fees

Unreal assumptions in backtesting can lead to significant problems in evaluating trading strategies. Neglecting actual transaction costs is a common mistake traders make when conducting backtests. These costs, such as exchange fees and slippage, can significantly impact a trading strategy's profitability and should be considered during the backtesting process.

For example, let's consider a hyper-aggressive day trading strategy that aims to make multiple trades within a single day to profit from short-term price fluctuations. While this strategy may appear profitable in a backtest that neglects transaction costs, the reality is that the frequent buying and selling of assets will result in substantial fees. These transaction costs can quickly eat into the profits and turn a seemingly profitable strategy into a losing one.

On the other hand, a position trading strategy that focuses on longer-term trends and involves fewer trades may be less affected by transaction costs. Since position traders hold their positions for an extended period, they incur fewer transaction fees and slippage, making it more viable in backtesting and actual trading.

Additionally, traders should consider using highly liquid futures contracts as an alternative to trading spot markets. Futures contracts often have lower transaction costs and provide greater flexibility for leveraging positions, thus reducing the impact of fees on profits. However, it is pivotal to consider the impact of funding fees in futures trading, especially for long-term positions. While backtesting trading strategies, exchange fees are commonly taken into account. Still, funding fees are often neglected, leading to inaccurate representations of profitability, particularly for strategies that involve holding positions over extended periods.

![setting-correct-fees.jpeg](https://gainium.io/images/content/blog/setting_correct_fees_f08092ce0f-ecff9a.jpeg)

### Illiquid Tokens Pairs

Backtesting illiquid token pairs in crypto trading can pose significant challenges and introduce inaccuracies in the results. Due to low liquidity, it can be challenging to find counterparties willing to execute trades at desired prices. This scarcity of willing buyers or sellers can lead to gaps in historical price data during the backtesting process.

Another problem arises from hidden transaction costs associated with trading illiquid tokens. These costs may include wider spreads, slippage, and higher exchange fees. Backtesting without accounting for these costs can result in inflated profits and unrealistic performance expectations.

To address these challenges, traders can employ several techniques. Firstly, they can simulate realistic trading conditions by incorporating realistic spreads and fees during the backtesting process. This can be achieved using historical data from order books or proxy data from similar tokens.

Moreover, traders should consider adjusting their strategies to focus on more liquid tokens pairs or cryptocurrencies with higher trading volumes. By doing so, they can reduce the impact of illiquidity and improve the accuracy of backtesting results.

### Using the Wrong Candle Period

The candle period refers to the time interval each candlestick represents on a price chart. Using the wrong candle period can significantly impact the accuracy and reliability of the backtest results.

When the candle period is too long, it can lead to inaccurate backtest results because the backtest assumes that the price movement is uniform within each candle. However, the price may have experienced significant fluctuations during the candle period, resulting in missed opportunities or false signals. This problem is further exacerbated when using small take profit targets, as the backtest becomes less sensitive to short-term price movements.

To select the appropriate candle period, several factors must be considered. Firstly, the trading strategy itself plays a crucial role. Different strategies may require different timeframes for analysis and decision-making. Additionally, market conditions should be taken into account. Volatile markets may benefit from shorter candle periods to capture quick price movements.

Furthermore, smaller candle periods are preferred for higher accuracy when using trailing stops or other dynamic exit strategies since they capture price changes with greater precision. Alternatively, using order book data instead of candles can provide more accurate backtest results.

## Conclusion

While backtesting is a fantastic tool for finding and optimizing crypto trading strategies, it can be prone to errors and inaccuracies. Recognizing these problems and implementing appropriate solutions is vital to mitigate these risks and improve the reliability of backtesting results.
